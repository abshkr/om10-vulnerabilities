
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
import mx.collections.ArrayCollection;
import mx.events.ValidationResultEvent;
import valueObjects.GUI_ORDER_PERIODS;
import valueObjects.OrderItemScheduleLookup;
import com.adobe.fiber.core.model_internal;
import com.adobe.fiber.valueobjects.IModelType;
import mx.events.PropertyChangeEvent;

use namespace model_internal;

[ExcludeClass]
internal class _GUI_ORDER_ITEMSEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("oitem_unit_name", "oitem_prod_price", "oitem_prod_unit", "oitem_by_packs", "oitem_prod_name", "oitem_line_no", "oitem_schd_qty", "oitem_price_name", "oitem_prod_qty", "oitem_period_no", "oitem_prod_code", "oitem_periods", "oitem_padj_code", "oitem_order_id", "oitem_drwr_name", "oitem_pack_size", "oitem_price_type", "oitem_delv_qty", "oitem_padj_name", "oitem_schedules", "oitem_load_qty", "oitem_exempt_no", "oitem_prod_cmpy");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("oitem_unit_name", "oitem_prod_price", "oitem_prod_unit", "oitem_by_packs", "oitem_prod_name", "oitem_line_no", "oitem_schd_qty", "oitem_price_name", "oitem_prod_qty", "oitem_period_no", "oitem_prod_code", "oitem_periods", "oitem_padj_code", "oitem_order_id", "oitem_drwr_name", "oitem_pack_size", "oitem_price_type", "oitem_delv_qty", "oitem_padj_name", "oitem_schedules", "oitem_load_qty", "oitem_exempt_no", "oitem_prod_cmpy");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("oitem_unit_name", "oitem_prod_price", "oitem_prod_unit", "oitem_by_packs", "oitem_prod_name", "oitem_line_no", "oitem_schd_qty", "oitem_price_name", "oitem_prod_qty", "oitem_period_no", "oitem_prod_code", "oitem_periods", "oitem_padj_code", "oitem_order_id", "oitem_drwr_name", "oitem_pack_size", "oitem_price_type", "oitem_delv_qty", "oitem_padj_name", "oitem_schedules", "oitem_load_qty", "oitem_exempt_no", "oitem_prod_cmpy");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("oitem_unit_name", "oitem_prod_price", "oitem_prod_unit", "oitem_by_packs", "oitem_prod_name", "oitem_line_no", "oitem_schd_qty", "oitem_price_name", "oitem_prod_qty", "oitem_period_no", "oitem_prod_code", "oitem_periods", "oitem_padj_code", "oitem_order_id", "oitem_drwr_name", "oitem_pack_size", "oitem_price_type", "oitem_delv_qty", "oitem_padj_name", "oitem_schedules", "oitem_load_qty", "oitem_exempt_no", "oitem_prod_cmpy");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("oitem_unit_name", "oitem_prod_price", "oitem_prod_unit", "oitem_by_packs", "oitem_prod_name", "oitem_line_no", "oitem_schd_qty", "oitem_price_name", "oitem_prod_qty", "oitem_period_no", "oitem_prod_code", "oitem_periods", "oitem_padj_code", "oitem_order_id", "oitem_drwr_name", "oitem_pack_size", "oitem_price_type", "oitem_delv_qty", "oitem_padj_name", "oitem_schedules", "oitem_load_qty", "oitem_exempt_no", "oitem_prod_cmpy");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array("oitem_periods", "oitem_schedules");
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "GUI_ORDER_ITEMS";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _oitem_unit_nameIsValid:Boolean;
    model_internal var _oitem_unit_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _oitem_unit_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _oitem_unit_nameValidationFailureMessages:Array;
    
    model_internal var _oitem_prod_priceIsValid:Boolean;
    model_internal var _oitem_prod_priceValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _oitem_prod_priceIsValidCacheInitialized:Boolean = false;
    model_internal var _oitem_prod_priceValidationFailureMessages:Array;
    
    model_internal var _oitem_prod_unitIsValid:Boolean;
    model_internal var _oitem_prod_unitValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _oitem_prod_unitIsValidCacheInitialized:Boolean = false;
    model_internal var _oitem_prod_unitValidationFailureMessages:Array;
    
    model_internal var _oitem_by_packsIsValid:Boolean;
    model_internal var _oitem_by_packsValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _oitem_by_packsIsValidCacheInitialized:Boolean = false;
    model_internal var _oitem_by_packsValidationFailureMessages:Array;
    
    model_internal var _oitem_prod_nameIsValid:Boolean;
    model_internal var _oitem_prod_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _oitem_prod_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _oitem_prod_nameValidationFailureMessages:Array;
    
    model_internal var _oitem_line_noIsValid:Boolean;
    model_internal var _oitem_line_noValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _oitem_line_noIsValidCacheInitialized:Boolean = false;
    model_internal var _oitem_line_noValidationFailureMessages:Array;
    
    model_internal var _oitem_schd_qtyIsValid:Boolean;
    model_internal var _oitem_schd_qtyValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _oitem_schd_qtyIsValidCacheInitialized:Boolean = false;
    model_internal var _oitem_schd_qtyValidationFailureMessages:Array;
    
    model_internal var _oitem_price_nameIsValid:Boolean;
    model_internal var _oitem_price_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _oitem_price_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _oitem_price_nameValidationFailureMessages:Array;
    
    model_internal var _oitem_prod_qtyIsValid:Boolean;
    model_internal var _oitem_prod_qtyValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _oitem_prod_qtyIsValidCacheInitialized:Boolean = false;
    model_internal var _oitem_prod_qtyValidationFailureMessages:Array;
    
    model_internal var _oitem_period_noIsValid:Boolean;
    model_internal var _oitem_period_noValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _oitem_period_noIsValidCacheInitialized:Boolean = false;
    model_internal var _oitem_period_noValidationFailureMessages:Array;
    
    model_internal var _oitem_prod_codeIsValid:Boolean;
    model_internal var _oitem_prod_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _oitem_prod_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _oitem_prod_codeValidationFailureMessages:Array;
    
    model_internal var _oitem_periodsIsValid:Boolean;
    model_internal var _oitem_periodsValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _oitem_periodsIsValidCacheInitialized:Boolean = false;
    model_internal var _oitem_periodsValidationFailureMessages:Array;
    
    model_internal var _oitem_padj_codeIsValid:Boolean;
    model_internal var _oitem_padj_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _oitem_padj_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _oitem_padj_codeValidationFailureMessages:Array;
    
    model_internal var _oitem_order_idIsValid:Boolean;
    model_internal var _oitem_order_idValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _oitem_order_idIsValidCacheInitialized:Boolean = false;
    model_internal var _oitem_order_idValidationFailureMessages:Array;
    
    model_internal var _oitem_drwr_nameIsValid:Boolean;
    model_internal var _oitem_drwr_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _oitem_drwr_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _oitem_drwr_nameValidationFailureMessages:Array;
    
    model_internal var _oitem_pack_sizeIsValid:Boolean;
    model_internal var _oitem_pack_sizeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _oitem_pack_sizeIsValidCacheInitialized:Boolean = false;
    model_internal var _oitem_pack_sizeValidationFailureMessages:Array;
    
    model_internal var _oitem_price_typeIsValid:Boolean;
    model_internal var _oitem_price_typeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _oitem_price_typeIsValidCacheInitialized:Boolean = false;
    model_internal var _oitem_price_typeValidationFailureMessages:Array;
    
    model_internal var _oitem_delv_qtyIsValid:Boolean;
    model_internal var _oitem_delv_qtyValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _oitem_delv_qtyIsValidCacheInitialized:Boolean = false;
    model_internal var _oitem_delv_qtyValidationFailureMessages:Array;
    
    model_internal var _oitem_padj_nameIsValid:Boolean;
    model_internal var _oitem_padj_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _oitem_padj_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _oitem_padj_nameValidationFailureMessages:Array;
    
    model_internal var _oitem_schedulesIsValid:Boolean;
    model_internal var _oitem_schedulesValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _oitem_schedulesIsValidCacheInitialized:Boolean = false;
    model_internal var _oitem_schedulesValidationFailureMessages:Array;
    
    model_internal var _oitem_load_qtyIsValid:Boolean;
    model_internal var _oitem_load_qtyValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _oitem_load_qtyIsValidCacheInitialized:Boolean = false;
    model_internal var _oitem_load_qtyValidationFailureMessages:Array;
    
    model_internal var _oitem_exempt_noIsValid:Boolean;
    model_internal var _oitem_exempt_noValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _oitem_exempt_noIsValidCacheInitialized:Boolean = false;
    model_internal var _oitem_exempt_noValidationFailureMessages:Array;
    
    model_internal var _oitem_prod_cmpyIsValid:Boolean;
    model_internal var _oitem_prod_cmpyValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _oitem_prod_cmpyIsValidCacheInitialized:Boolean = false;
    model_internal var _oitem_prod_cmpyValidationFailureMessages:Array;

    model_internal var _instance:_Super_GUI_ORDER_ITEMS;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _GUI_ORDER_ITEMSEntityMetadata(value : _Super_GUI_ORDER_ITEMS)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["oitem_unit_name"] = new Array();
            model_internal::dependentsOnMap["oitem_prod_price"] = new Array();
            model_internal::dependentsOnMap["oitem_prod_unit"] = new Array();
            model_internal::dependentsOnMap["oitem_by_packs"] = new Array();
            model_internal::dependentsOnMap["oitem_prod_name"] = new Array();
            model_internal::dependentsOnMap["oitem_line_no"] = new Array();
            model_internal::dependentsOnMap["oitem_schd_qty"] = new Array();
            model_internal::dependentsOnMap["oitem_price_name"] = new Array();
            model_internal::dependentsOnMap["oitem_prod_qty"] = new Array();
            model_internal::dependentsOnMap["oitem_period_no"] = new Array();
            model_internal::dependentsOnMap["oitem_prod_code"] = new Array();
            model_internal::dependentsOnMap["oitem_periods"] = new Array();
            model_internal::dependentsOnMap["oitem_padj_code"] = new Array();
            model_internal::dependentsOnMap["oitem_order_id"] = new Array();
            model_internal::dependentsOnMap["oitem_drwr_name"] = new Array();
            model_internal::dependentsOnMap["oitem_pack_size"] = new Array();
            model_internal::dependentsOnMap["oitem_price_type"] = new Array();
            model_internal::dependentsOnMap["oitem_delv_qty"] = new Array();
            model_internal::dependentsOnMap["oitem_padj_name"] = new Array();
            model_internal::dependentsOnMap["oitem_schedules"] = new Array();
            model_internal::dependentsOnMap["oitem_load_qty"] = new Array();
            model_internal::dependentsOnMap["oitem_exempt_no"] = new Array();
            model_internal::dependentsOnMap["oitem_prod_cmpy"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
            model_internal::collectionBaseMap["oitem_periods"] = "valueObjects.GUI_ORDER_PERIODS";
            model_internal::collectionBaseMap["oitem_schedules"] = "valueObjects.OrderItemScheduleLookup";
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["oitem_unit_name"] = "String";
        model_internal::propertyTypeMap["oitem_prod_price"] = "String";
        model_internal::propertyTypeMap["oitem_prod_unit"] = "String";
        model_internal::propertyTypeMap["oitem_by_packs"] = "String";
        model_internal::propertyTypeMap["oitem_prod_name"] = "String";
        model_internal::propertyTypeMap["oitem_line_no"] = "String";
        model_internal::propertyTypeMap["oitem_schd_qty"] = "String";
        model_internal::propertyTypeMap["oitem_price_name"] = "String";
        model_internal::propertyTypeMap["oitem_prod_qty"] = "String";
        model_internal::propertyTypeMap["oitem_period_no"] = "String";
        model_internal::propertyTypeMap["oitem_prod_code"] = "String";
        model_internal::propertyTypeMap["oitem_periods"] = "ArrayCollection";
        model_internal::propertyTypeMap["oitem_padj_code"] = "Object";
        model_internal::propertyTypeMap["oitem_order_id"] = "String";
        model_internal::propertyTypeMap["oitem_drwr_name"] = "String";
        model_internal::propertyTypeMap["oitem_pack_size"] = "String";
        model_internal::propertyTypeMap["oitem_price_type"] = "String";
        model_internal::propertyTypeMap["oitem_delv_qty"] = "String";
        model_internal::propertyTypeMap["oitem_padj_name"] = "Object";
        model_internal::propertyTypeMap["oitem_schedules"] = "ArrayCollection";
        model_internal::propertyTypeMap["oitem_load_qty"] = "String";
        model_internal::propertyTypeMap["oitem_exempt_no"] = "Object";
        model_internal::propertyTypeMap["oitem_prod_cmpy"] = "String";

        model_internal::_instance = value;
        model_internal::_oitem_unit_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOitem_unit_name);
        model_internal::_oitem_unit_nameValidator.required = true;
        model_internal::_oitem_unit_nameValidator.requiredFieldError = "oitem_unit_name is required";
        //model_internal::_oitem_unit_nameValidator.source = model_internal::_instance;
        //model_internal::_oitem_unit_nameValidator.property = "oitem_unit_name";
        model_internal::_oitem_prod_priceValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOitem_prod_price);
        model_internal::_oitem_prod_priceValidator.required = true;
        model_internal::_oitem_prod_priceValidator.requiredFieldError = "oitem_prod_price is required";
        //model_internal::_oitem_prod_priceValidator.source = model_internal::_instance;
        //model_internal::_oitem_prod_priceValidator.property = "oitem_prod_price";
        model_internal::_oitem_prod_unitValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOitem_prod_unit);
        model_internal::_oitem_prod_unitValidator.required = true;
        model_internal::_oitem_prod_unitValidator.requiredFieldError = "oitem_prod_unit is required";
        //model_internal::_oitem_prod_unitValidator.source = model_internal::_instance;
        //model_internal::_oitem_prod_unitValidator.property = "oitem_prod_unit";
        model_internal::_oitem_by_packsValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOitem_by_packs);
        model_internal::_oitem_by_packsValidator.required = true;
        model_internal::_oitem_by_packsValidator.requiredFieldError = "oitem_by_packs is required";
        //model_internal::_oitem_by_packsValidator.source = model_internal::_instance;
        //model_internal::_oitem_by_packsValidator.property = "oitem_by_packs";
        model_internal::_oitem_prod_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOitem_prod_name);
        model_internal::_oitem_prod_nameValidator.required = true;
        model_internal::_oitem_prod_nameValidator.requiredFieldError = "oitem_prod_name is required";
        //model_internal::_oitem_prod_nameValidator.source = model_internal::_instance;
        //model_internal::_oitem_prod_nameValidator.property = "oitem_prod_name";
        model_internal::_oitem_line_noValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOitem_line_no);
        model_internal::_oitem_line_noValidator.required = true;
        model_internal::_oitem_line_noValidator.requiredFieldError = "oitem_line_no is required";
        //model_internal::_oitem_line_noValidator.source = model_internal::_instance;
        //model_internal::_oitem_line_noValidator.property = "oitem_line_no";
        model_internal::_oitem_schd_qtyValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOitem_schd_qty);
        model_internal::_oitem_schd_qtyValidator.required = true;
        model_internal::_oitem_schd_qtyValidator.requiredFieldError = "oitem_schd_qty is required";
        //model_internal::_oitem_schd_qtyValidator.source = model_internal::_instance;
        //model_internal::_oitem_schd_qtyValidator.property = "oitem_schd_qty";
        model_internal::_oitem_price_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOitem_price_name);
        model_internal::_oitem_price_nameValidator.required = true;
        model_internal::_oitem_price_nameValidator.requiredFieldError = "oitem_price_name is required";
        //model_internal::_oitem_price_nameValidator.source = model_internal::_instance;
        //model_internal::_oitem_price_nameValidator.property = "oitem_price_name";
        model_internal::_oitem_prod_qtyValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOitem_prod_qty);
        model_internal::_oitem_prod_qtyValidator.required = true;
        model_internal::_oitem_prod_qtyValidator.requiredFieldError = "oitem_prod_qty is required";
        //model_internal::_oitem_prod_qtyValidator.source = model_internal::_instance;
        //model_internal::_oitem_prod_qtyValidator.property = "oitem_prod_qty";
        model_internal::_oitem_period_noValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOitem_period_no);
        model_internal::_oitem_period_noValidator.required = true;
        model_internal::_oitem_period_noValidator.requiredFieldError = "oitem_period_no is required";
        //model_internal::_oitem_period_noValidator.source = model_internal::_instance;
        //model_internal::_oitem_period_noValidator.property = "oitem_period_no";
        model_internal::_oitem_prod_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOitem_prod_code);
        model_internal::_oitem_prod_codeValidator.required = true;
        model_internal::_oitem_prod_codeValidator.requiredFieldError = "oitem_prod_code is required";
        //model_internal::_oitem_prod_codeValidator.source = model_internal::_instance;
        //model_internal::_oitem_prod_codeValidator.property = "oitem_prod_code";
        model_internal::_oitem_periodsValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOitem_periods);
        model_internal::_oitem_periodsValidator.required = true;
        model_internal::_oitem_periodsValidator.requiredFieldError = "oitem_periods is required";
        //model_internal::_oitem_periodsValidator.source = model_internal::_instance;
        //model_internal::_oitem_periodsValidator.property = "oitem_periods";
        model_internal::_oitem_padj_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOitem_padj_code);
        model_internal::_oitem_padj_codeValidator.required = true;
        model_internal::_oitem_padj_codeValidator.requiredFieldError = "oitem_padj_code is required";
        //model_internal::_oitem_padj_codeValidator.source = model_internal::_instance;
        //model_internal::_oitem_padj_codeValidator.property = "oitem_padj_code";
        model_internal::_oitem_order_idValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOitem_order_id);
        model_internal::_oitem_order_idValidator.required = true;
        model_internal::_oitem_order_idValidator.requiredFieldError = "oitem_order_id is required";
        //model_internal::_oitem_order_idValidator.source = model_internal::_instance;
        //model_internal::_oitem_order_idValidator.property = "oitem_order_id";
        model_internal::_oitem_drwr_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOitem_drwr_name);
        model_internal::_oitem_drwr_nameValidator.required = true;
        model_internal::_oitem_drwr_nameValidator.requiredFieldError = "oitem_drwr_name is required";
        //model_internal::_oitem_drwr_nameValidator.source = model_internal::_instance;
        //model_internal::_oitem_drwr_nameValidator.property = "oitem_drwr_name";
        model_internal::_oitem_pack_sizeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOitem_pack_size);
        model_internal::_oitem_pack_sizeValidator.required = true;
        model_internal::_oitem_pack_sizeValidator.requiredFieldError = "oitem_pack_size is required";
        //model_internal::_oitem_pack_sizeValidator.source = model_internal::_instance;
        //model_internal::_oitem_pack_sizeValidator.property = "oitem_pack_size";
        model_internal::_oitem_price_typeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOitem_price_type);
        model_internal::_oitem_price_typeValidator.required = true;
        model_internal::_oitem_price_typeValidator.requiredFieldError = "oitem_price_type is required";
        //model_internal::_oitem_price_typeValidator.source = model_internal::_instance;
        //model_internal::_oitem_price_typeValidator.property = "oitem_price_type";
        model_internal::_oitem_delv_qtyValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOitem_delv_qty);
        model_internal::_oitem_delv_qtyValidator.required = true;
        model_internal::_oitem_delv_qtyValidator.requiredFieldError = "oitem_delv_qty is required";
        //model_internal::_oitem_delv_qtyValidator.source = model_internal::_instance;
        //model_internal::_oitem_delv_qtyValidator.property = "oitem_delv_qty";
        model_internal::_oitem_padj_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOitem_padj_name);
        model_internal::_oitem_padj_nameValidator.required = true;
        model_internal::_oitem_padj_nameValidator.requiredFieldError = "oitem_padj_name is required";
        //model_internal::_oitem_padj_nameValidator.source = model_internal::_instance;
        //model_internal::_oitem_padj_nameValidator.property = "oitem_padj_name";
        model_internal::_oitem_schedulesValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOitem_schedules);
        model_internal::_oitem_schedulesValidator.required = true;
        model_internal::_oitem_schedulesValidator.requiredFieldError = "oitem_schedules is required";
        //model_internal::_oitem_schedulesValidator.source = model_internal::_instance;
        //model_internal::_oitem_schedulesValidator.property = "oitem_schedules";
        model_internal::_oitem_load_qtyValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOitem_load_qty);
        model_internal::_oitem_load_qtyValidator.required = true;
        model_internal::_oitem_load_qtyValidator.requiredFieldError = "oitem_load_qty is required";
        //model_internal::_oitem_load_qtyValidator.source = model_internal::_instance;
        //model_internal::_oitem_load_qtyValidator.property = "oitem_load_qty";
        model_internal::_oitem_exempt_noValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOitem_exempt_no);
        model_internal::_oitem_exempt_noValidator.required = true;
        model_internal::_oitem_exempt_noValidator.requiredFieldError = "oitem_exempt_no is required";
        //model_internal::_oitem_exempt_noValidator.source = model_internal::_instance;
        //model_internal::_oitem_exempt_noValidator.property = "oitem_exempt_no";
        model_internal::_oitem_prod_cmpyValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOitem_prod_cmpy);
        model_internal::_oitem_prod_cmpyValidator.required = true;
        model_internal::_oitem_prod_cmpyValidator.requiredFieldError = "oitem_prod_cmpy is required";
        //model_internal::_oitem_prod_cmpyValidator.source = model_internal::_instance;
        //model_internal::_oitem_prod_cmpyValidator.property = "oitem_prod_cmpy";
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
            throw new Error(propertyName + " is not a data property of entity GUI_ORDER_ITEMS");
            
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
            throw new Error(propertyName + " is not a collection property of entity GUI_ORDER_ITEMS");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of GUI_ORDER_ITEMS");

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
            throw new Error(propertyName + " does not exist for entity GUI_ORDER_ITEMS");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity GUI_ORDER_ITEMS");
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
            throw new Error(propertyName + " does not exist for entity GUI_ORDER_ITEMS");
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
    public function get isOitem_unit_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOitem_prod_priceAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOitem_prod_unitAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOitem_by_packsAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOitem_prod_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOitem_line_noAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOitem_schd_qtyAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOitem_price_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOitem_prod_qtyAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOitem_period_noAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOitem_prod_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOitem_periodsAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOitem_padj_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOitem_order_idAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOitem_drwr_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOitem_pack_sizeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOitem_price_typeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOitem_delv_qtyAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOitem_padj_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOitem_schedulesAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOitem_load_qtyAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOitem_exempt_noAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOitem_prod_cmpyAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnOitem_unit_name():void
    {
        if (model_internal::_oitem_unit_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOitem_unit_name = null;
            model_internal::calculateOitem_unit_nameIsValid();
        }
    }
    public function invalidateDependentOnOitem_prod_price():void
    {
        if (model_internal::_oitem_prod_priceIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOitem_prod_price = null;
            model_internal::calculateOitem_prod_priceIsValid();
        }
    }
    public function invalidateDependentOnOitem_prod_unit():void
    {
        if (model_internal::_oitem_prod_unitIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOitem_prod_unit = null;
            model_internal::calculateOitem_prod_unitIsValid();
        }
    }
    public function invalidateDependentOnOitem_by_packs():void
    {
        if (model_internal::_oitem_by_packsIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOitem_by_packs = null;
            model_internal::calculateOitem_by_packsIsValid();
        }
    }
    public function invalidateDependentOnOitem_prod_name():void
    {
        if (model_internal::_oitem_prod_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOitem_prod_name = null;
            model_internal::calculateOitem_prod_nameIsValid();
        }
    }
    public function invalidateDependentOnOitem_line_no():void
    {
        if (model_internal::_oitem_line_noIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOitem_line_no = null;
            model_internal::calculateOitem_line_noIsValid();
        }
    }
    public function invalidateDependentOnOitem_schd_qty():void
    {
        if (model_internal::_oitem_schd_qtyIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOitem_schd_qty = null;
            model_internal::calculateOitem_schd_qtyIsValid();
        }
    }
    public function invalidateDependentOnOitem_price_name():void
    {
        if (model_internal::_oitem_price_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOitem_price_name = null;
            model_internal::calculateOitem_price_nameIsValid();
        }
    }
    public function invalidateDependentOnOitem_prod_qty():void
    {
        if (model_internal::_oitem_prod_qtyIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOitem_prod_qty = null;
            model_internal::calculateOitem_prod_qtyIsValid();
        }
    }
    public function invalidateDependentOnOitem_period_no():void
    {
        if (model_internal::_oitem_period_noIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOitem_period_no = null;
            model_internal::calculateOitem_period_noIsValid();
        }
    }
    public function invalidateDependentOnOitem_prod_code():void
    {
        if (model_internal::_oitem_prod_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOitem_prod_code = null;
            model_internal::calculateOitem_prod_codeIsValid();
        }
    }
    public function invalidateDependentOnOitem_periods():void
    {
        if (model_internal::_oitem_periodsIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOitem_periods = null;
            model_internal::calculateOitem_periodsIsValid();
        }
    }
    public function invalidateDependentOnOitem_padj_code():void
    {
        if (model_internal::_oitem_padj_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOitem_padj_code = null;
            model_internal::calculateOitem_padj_codeIsValid();
        }
    }
    public function invalidateDependentOnOitem_order_id():void
    {
        if (model_internal::_oitem_order_idIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOitem_order_id = null;
            model_internal::calculateOitem_order_idIsValid();
        }
    }
    public function invalidateDependentOnOitem_drwr_name():void
    {
        if (model_internal::_oitem_drwr_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOitem_drwr_name = null;
            model_internal::calculateOitem_drwr_nameIsValid();
        }
    }
    public function invalidateDependentOnOitem_pack_size():void
    {
        if (model_internal::_oitem_pack_sizeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOitem_pack_size = null;
            model_internal::calculateOitem_pack_sizeIsValid();
        }
    }
    public function invalidateDependentOnOitem_price_type():void
    {
        if (model_internal::_oitem_price_typeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOitem_price_type = null;
            model_internal::calculateOitem_price_typeIsValid();
        }
    }
    public function invalidateDependentOnOitem_delv_qty():void
    {
        if (model_internal::_oitem_delv_qtyIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOitem_delv_qty = null;
            model_internal::calculateOitem_delv_qtyIsValid();
        }
    }
    public function invalidateDependentOnOitem_padj_name():void
    {
        if (model_internal::_oitem_padj_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOitem_padj_name = null;
            model_internal::calculateOitem_padj_nameIsValid();
        }
    }
    public function invalidateDependentOnOitem_schedules():void
    {
        if (model_internal::_oitem_schedulesIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOitem_schedules = null;
            model_internal::calculateOitem_schedulesIsValid();
        }
    }
    public function invalidateDependentOnOitem_load_qty():void
    {
        if (model_internal::_oitem_load_qtyIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOitem_load_qty = null;
            model_internal::calculateOitem_load_qtyIsValid();
        }
    }
    public function invalidateDependentOnOitem_exempt_no():void
    {
        if (model_internal::_oitem_exempt_noIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOitem_exempt_no = null;
            model_internal::calculateOitem_exempt_noIsValid();
        }
    }
    public function invalidateDependentOnOitem_prod_cmpy():void
    {
        if (model_internal::_oitem_prod_cmpyIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOitem_prod_cmpy = null;
            model_internal::calculateOitem_prod_cmpyIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get oitem_unit_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get oitem_unit_nameValidator() : StyleValidator
    {
        return model_internal::_oitem_unit_nameValidator;
    }

    model_internal function set _oitem_unit_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_oitem_unit_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_oitem_unit_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_unit_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get oitem_unit_nameIsValid():Boolean
    {
        if (!model_internal::_oitem_unit_nameIsValidCacheInitialized)
        {
            model_internal::calculateOitem_unit_nameIsValid();
        }

        return model_internal::_oitem_unit_nameIsValid;
    }

    model_internal function calculateOitem_unit_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_oitem_unit_nameValidator.validate(model_internal::_instance.oitem_unit_name)
        model_internal::_oitem_unit_nameIsValid_der = (valRes.results == null);
        model_internal::_oitem_unit_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::oitem_unit_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::oitem_unit_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get oitem_unit_nameValidationFailureMessages():Array
    {
        if (model_internal::_oitem_unit_nameValidationFailureMessages == null)
            model_internal::calculateOitem_unit_nameIsValid();

        return _oitem_unit_nameValidationFailureMessages;
    }

    model_internal function set oitem_unit_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_oitem_unit_nameValidationFailureMessages;

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
            model_internal::_oitem_unit_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_unit_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get oitem_prod_priceStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get oitem_prod_priceValidator() : StyleValidator
    {
        return model_internal::_oitem_prod_priceValidator;
    }

    model_internal function set _oitem_prod_priceIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_oitem_prod_priceIsValid;         
        if (oldValue !== value)
        {
            model_internal::_oitem_prod_priceIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_prod_priceIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get oitem_prod_priceIsValid():Boolean
    {
        if (!model_internal::_oitem_prod_priceIsValidCacheInitialized)
        {
            model_internal::calculateOitem_prod_priceIsValid();
        }

        return model_internal::_oitem_prod_priceIsValid;
    }

    model_internal function calculateOitem_prod_priceIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_oitem_prod_priceValidator.validate(model_internal::_instance.oitem_prod_price)
        model_internal::_oitem_prod_priceIsValid_der = (valRes.results == null);
        model_internal::_oitem_prod_priceIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::oitem_prod_priceValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::oitem_prod_priceValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get oitem_prod_priceValidationFailureMessages():Array
    {
        if (model_internal::_oitem_prod_priceValidationFailureMessages == null)
            model_internal::calculateOitem_prod_priceIsValid();

        return _oitem_prod_priceValidationFailureMessages;
    }

    model_internal function set oitem_prod_priceValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_oitem_prod_priceValidationFailureMessages;

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
            model_internal::_oitem_prod_priceValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_prod_priceValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get oitem_prod_unitStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get oitem_prod_unitValidator() : StyleValidator
    {
        return model_internal::_oitem_prod_unitValidator;
    }

    model_internal function set _oitem_prod_unitIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_oitem_prod_unitIsValid;         
        if (oldValue !== value)
        {
            model_internal::_oitem_prod_unitIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_prod_unitIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get oitem_prod_unitIsValid():Boolean
    {
        if (!model_internal::_oitem_prod_unitIsValidCacheInitialized)
        {
            model_internal::calculateOitem_prod_unitIsValid();
        }

        return model_internal::_oitem_prod_unitIsValid;
    }

    model_internal function calculateOitem_prod_unitIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_oitem_prod_unitValidator.validate(model_internal::_instance.oitem_prod_unit)
        model_internal::_oitem_prod_unitIsValid_der = (valRes.results == null);
        model_internal::_oitem_prod_unitIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::oitem_prod_unitValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::oitem_prod_unitValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get oitem_prod_unitValidationFailureMessages():Array
    {
        if (model_internal::_oitem_prod_unitValidationFailureMessages == null)
            model_internal::calculateOitem_prod_unitIsValid();

        return _oitem_prod_unitValidationFailureMessages;
    }

    model_internal function set oitem_prod_unitValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_oitem_prod_unitValidationFailureMessages;

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
            model_internal::_oitem_prod_unitValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_prod_unitValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get oitem_by_packsStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get oitem_by_packsValidator() : StyleValidator
    {
        return model_internal::_oitem_by_packsValidator;
    }

    model_internal function set _oitem_by_packsIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_oitem_by_packsIsValid;         
        if (oldValue !== value)
        {
            model_internal::_oitem_by_packsIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_by_packsIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get oitem_by_packsIsValid():Boolean
    {
        if (!model_internal::_oitem_by_packsIsValidCacheInitialized)
        {
            model_internal::calculateOitem_by_packsIsValid();
        }

        return model_internal::_oitem_by_packsIsValid;
    }

    model_internal function calculateOitem_by_packsIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_oitem_by_packsValidator.validate(model_internal::_instance.oitem_by_packs)
        model_internal::_oitem_by_packsIsValid_der = (valRes.results == null);
        model_internal::_oitem_by_packsIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::oitem_by_packsValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::oitem_by_packsValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get oitem_by_packsValidationFailureMessages():Array
    {
        if (model_internal::_oitem_by_packsValidationFailureMessages == null)
            model_internal::calculateOitem_by_packsIsValid();

        return _oitem_by_packsValidationFailureMessages;
    }

    model_internal function set oitem_by_packsValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_oitem_by_packsValidationFailureMessages;

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
            model_internal::_oitem_by_packsValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_by_packsValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get oitem_prod_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get oitem_prod_nameValidator() : StyleValidator
    {
        return model_internal::_oitem_prod_nameValidator;
    }

    model_internal function set _oitem_prod_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_oitem_prod_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_oitem_prod_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_prod_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get oitem_prod_nameIsValid():Boolean
    {
        if (!model_internal::_oitem_prod_nameIsValidCacheInitialized)
        {
            model_internal::calculateOitem_prod_nameIsValid();
        }

        return model_internal::_oitem_prod_nameIsValid;
    }

    model_internal function calculateOitem_prod_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_oitem_prod_nameValidator.validate(model_internal::_instance.oitem_prod_name)
        model_internal::_oitem_prod_nameIsValid_der = (valRes.results == null);
        model_internal::_oitem_prod_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::oitem_prod_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::oitem_prod_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get oitem_prod_nameValidationFailureMessages():Array
    {
        if (model_internal::_oitem_prod_nameValidationFailureMessages == null)
            model_internal::calculateOitem_prod_nameIsValid();

        return _oitem_prod_nameValidationFailureMessages;
    }

    model_internal function set oitem_prod_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_oitem_prod_nameValidationFailureMessages;

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
            model_internal::_oitem_prod_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_prod_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get oitem_line_noStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get oitem_line_noValidator() : StyleValidator
    {
        return model_internal::_oitem_line_noValidator;
    }

    model_internal function set _oitem_line_noIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_oitem_line_noIsValid;         
        if (oldValue !== value)
        {
            model_internal::_oitem_line_noIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_line_noIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get oitem_line_noIsValid():Boolean
    {
        if (!model_internal::_oitem_line_noIsValidCacheInitialized)
        {
            model_internal::calculateOitem_line_noIsValid();
        }

        return model_internal::_oitem_line_noIsValid;
    }

    model_internal function calculateOitem_line_noIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_oitem_line_noValidator.validate(model_internal::_instance.oitem_line_no)
        model_internal::_oitem_line_noIsValid_der = (valRes.results == null);
        model_internal::_oitem_line_noIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::oitem_line_noValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::oitem_line_noValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get oitem_line_noValidationFailureMessages():Array
    {
        if (model_internal::_oitem_line_noValidationFailureMessages == null)
            model_internal::calculateOitem_line_noIsValid();

        return _oitem_line_noValidationFailureMessages;
    }

    model_internal function set oitem_line_noValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_oitem_line_noValidationFailureMessages;

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
            model_internal::_oitem_line_noValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_line_noValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get oitem_schd_qtyStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get oitem_schd_qtyValidator() : StyleValidator
    {
        return model_internal::_oitem_schd_qtyValidator;
    }

    model_internal function set _oitem_schd_qtyIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_oitem_schd_qtyIsValid;         
        if (oldValue !== value)
        {
            model_internal::_oitem_schd_qtyIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_schd_qtyIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get oitem_schd_qtyIsValid():Boolean
    {
        if (!model_internal::_oitem_schd_qtyIsValidCacheInitialized)
        {
            model_internal::calculateOitem_schd_qtyIsValid();
        }

        return model_internal::_oitem_schd_qtyIsValid;
    }

    model_internal function calculateOitem_schd_qtyIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_oitem_schd_qtyValidator.validate(model_internal::_instance.oitem_schd_qty)
        model_internal::_oitem_schd_qtyIsValid_der = (valRes.results == null);
        model_internal::_oitem_schd_qtyIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::oitem_schd_qtyValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::oitem_schd_qtyValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get oitem_schd_qtyValidationFailureMessages():Array
    {
        if (model_internal::_oitem_schd_qtyValidationFailureMessages == null)
            model_internal::calculateOitem_schd_qtyIsValid();

        return _oitem_schd_qtyValidationFailureMessages;
    }

    model_internal function set oitem_schd_qtyValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_oitem_schd_qtyValidationFailureMessages;

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
            model_internal::_oitem_schd_qtyValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_schd_qtyValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get oitem_price_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get oitem_price_nameValidator() : StyleValidator
    {
        return model_internal::_oitem_price_nameValidator;
    }

    model_internal function set _oitem_price_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_oitem_price_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_oitem_price_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_price_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get oitem_price_nameIsValid():Boolean
    {
        if (!model_internal::_oitem_price_nameIsValidCacheInitialized)
        {
            model_internal::calculateOitem_price_nameIsValid();
        }

        return model_internal::_oitem_price_nameIsValid;
    }

    model_internal function calculateOitem_price_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_oitem_price_nameValidator.validate(model_internal::_instance.oitem_price_name)
        model_internal::_oitem_price_nameIsValid_der = (valRes.results == null);
        model_internal::_oitem_price_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::oitem_price_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::oitem_price_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get oitem_price_nameValidationFailureMessages():Array
    {
        if (model_internal::_oitem_price_nameValidationFailureMessages == null)
            model_internal::calculateOitem_price_nameIsValid();

        return _oitem_price_nameValidationFailureMessages;
    }

    model_internal function set oitem_price_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_oitem_price_nameValidationFailureMessages;

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
            model_internal::_oitem_price_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_price_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get oitem_prod_qtyStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get oitem_prod_qtyValidator() : StyleValidator
    {
        return model_internal::_oitem_prod_qtyValidator;
    }

    model_internal function set _oitem_prod_qtyIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_oitem_prod_qtyIsValid;         
        if (oldValue !== value)
        {
            model_internal::_oitem_prod_qtyIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_prod_qtyIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get oitem_prod_qtyIsValid():Boolean
    {
        if (!model_internal::_oitem_prod_qtyIsValidCacheInitialized)
        {
            model_internal::calculateOitem_prod_qtyIsValid();
        }

        return model_internal::_oitem_prod_qtyIsValid;
    }

    model_internal function calculateOitem_prod_qtyIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_oitem_prod_qtyValidator.validate(model_internal::_instance.oitem_prod_qty)
        model_internal::_oitem_prod_qtyIsValid_der = (valRes.results == null);
        model_internal::_oitem_prod_qtyIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::oitem_prod_qtyValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::oitem_prod_qtyValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get oitem_prod_qtyValidationFailureMessages():Array
    {
        if (model_internal::_oitem_prod_qtyValidationFailureMessages == null)
            model_internal::calculateOitem_prod_qtyIsValid();

        return _oitem_prod_qtyValidationFailureMessages;
    }

    model_internal function set oitem_prod_qtyValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_oitem_prod_qtyValidationFailureMessages;

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
            model_internal::_oitem_prod_qtyValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_prod_qtyValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get oitem_period_noStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get oitem_period_noValidator() : StyleValidator
    {
        return model_internal::_oitem_period_noValidator;
    }

    model_internal function set _oitem_period_noIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_oitem_period_noIsValid;         
        if (oldValue !== value)
        {
            model_internal::_oitem_period_noIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_period_noIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get oitem_period_noIsValid():Boolean
    {
        if (!model_internal::_oitem_period_noIsValidCacheInitialized)
        {
            model_internal::calculateOitem_period_noIsValid();
        }

        return model_internal::_oitem_period_noIsValid;
    }

    model_internal function calculateOitem_period_noIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_oitem_period_noValidator.validate(model_internal::_instance.oitem_period_no)
        model_internal::_oitem_period_noIsValid_der = (valRes.results == null);
        model_internal::_oitem_period_noIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::oitem_period_noValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::oitem_period_noValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get oitem_period_noValidationFailureMessages():Array
    {
        if (model_internal::_oitem_period_noValidationFailureMessages == null)
            model_internal::calculateOitem_period_noIsValid();

        return _oitem_period_noValidationFailureMessages;
    }

    model_internal function set oitem_period_noValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_oitem_period_noValidationFailureMessages;

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
            model_internal::_oitem_period_noValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_period_noValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get oitem_prod_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get oitem_prod_codeValidator() : StyleValidator
    {
        return model_internal::_oitem_prod_codeValidator;
    }

    model_internal function set _oitem_prod_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_oitem_prod_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_oitem_prod_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_prod_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get oitem_prod_codeIsValid():Boolean
    {
        if (!model_internal::_oitem_prod_codeIsValidCacheInitialized)
        {
            model_internal::calculateOitem_prod_codeIsValid();
        }

        return model_internal::_oitem_prod_codeIsValid;
    }

    model_internal function calculateOitem_prod_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_oitem_prod_codeValidator.validate(model_internal::_instance.oitem_prod_code)
        model_internal::_oitem_prod_codeIsValid_der = (valRes.results == null);
        model_internal::_oitem_prod_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::oitem_prod_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::oitem_prod_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get oitem_prod_codeValidationFailureMessages():Array
    {
        if (model_internal::_oitem_prod_codeValidationFailureMessages == null)
            model_internal::calculateOitem_prod_codeIsValid();

        return _oitem_prod_codeValidationFailureMessages;
    }

    model_internal function set oitem_prod_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_oitem_prod_codeValidationFailureMessages;

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
            model_internal::_oitem_prod_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_prod_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get oitem_periodsStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get oitem_periodsValidator() : StyleValidator
    {
        return model_internal::_oitem_periodsValidator;
    }

    model_internal function set _oitem_periodsIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_oitem_periodsIsValid;         
        if (oldValue !== value)
        {
            model_internal::_oitem_periodsIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_periodsIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get oitem_periodsIsValid():Boolean
    {
        if (!model_internal::_oitem_periodsIsValidCacheInitialized)
        {
            model_internal::calculateOitem_periodsIsValid();
        }

        return model_internal::_oitem_periodsIsValid;
    }

    model_internal function calculateOitem_periodsIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_oitem_periodsValidator.validate(model_internal::_instance.oitem_periods)
        model_internal::_oitem_periodsIsValid_der = (valRes.results == null);
        model_internal::_oitem_periodsIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::oitem_periodsValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::oitem_periodsValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get oitem_periodsValidationFailureMessages():Array
    {
        if (model_internal::_oitem_periodsValidationFailureMessages == null)
            model_internal::calculateOitem_periodsIsValid();

        return _oitem_periodsValidationFailureMessages;
    }

    model_internal function set oitem_periodsValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_oitem_periodsValidationFailureMessages;

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
            model_internal::_oitem_periodsValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_periodsValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get oitem_padj_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get oitem_padj_codeValidator() : StyleValidator
    {
        return model_internal::_oitem_padj_codeValidator;
    }

    model_internal function set _oitem_padj_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_oitem_padj_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_oitem_padj_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_padj_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get oitem_padj_codeIsValid():Boolean
    {
        if (!model_internal::_oitem_padj_codeIsValidCacheInitialized)
        {
            model_internal::calculateOitem_padj_codeIsValid();
        }

        return model_internal::_oitem_padj_codeIsValid;
    }

    model_internal function calculateOitem_padj_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_oitem_padj_codeValidator.validate(model_internal::_instance.oitem_padj_code)
        model_internal::_oitem_padj_codeIsValid_der = (valRes.results == null);
        model_internal::_oitem_padj_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::oitem_padj_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::oitem_padj_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get oitem_padj_codeValidationFailureMessages():Array
    {
        if (model_internal::_oitem_padj_codeValidationFailureMessages == null)
            model_internal::calculateOitem_padj_codeIsValid();

        return _oitem_padj_codeValidationFailureMessages;
    }

    model_internal function set oitem_padj_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_oitem_padj_codeValidationFailureMessages;

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
            model_internal::_oitem_padj_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_padj_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get oitem_order_idStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get oitem_order_idValidator() : StyleValidator
    {
        return model_internal::_oitem_order_idValidator;
    }

    model_internal function set _oitem_order_idIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_oitem_order_idIsValid;         
        if (oldValue !== value)
        {
            model_internal::_oitem_order_idIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_order_idIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get oitem_order_idIsValid():Boolean
    {
        if (!model_internal::_oitem_order_idIsValidCacheInitialized)
        {
            model_internal::calculateOitem_order_idIsValid();
        }

        return model_internal::_oitem_order_idIsValid;
    }

    model_internal function calculateOitem_order_idIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_oitem_order_idValidator.validate(model_internal::_instance.oitem_order_id)
        model_internal::_oitem_order_idIsValid_der = (valRes.results == null);
        model_internal::_oitem_order_idIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::oitem_order_idValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::oitem_order_idValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get oitem_order_idValidationFailureMessages():Array
    {
        if (model_internal::_oitem_order_idValidationFailureMessages == null)
            model_internal::calculateOitem_order_idIsValid();

        return _oitem_order_idValidationFailureMessages;
    }

    model_internal function set oitem_order_idValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_oitem_order_idValidationFailureMessages;

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
            model_internal::_oitem_order_idValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_order_idValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get oitem_drwr_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get oitem_drwr_nameValidator() : StyleValidator
    {
        return model_internal::_oitem_drwr_nameValidator;
    }

    model_internal function set _oitem_drwr_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_oitem_drwr_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_oitem_drwr_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_drwr_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get oitem_drwr_nameIsValid():Boolean
    {
        if (!model_internal::_oitem_drwr_nameIsValidCacheInitialized)
        {
            model_internal::calculateOitem_drwr_nameIsValid();
        }

        return model_internal::_oitem_drwr_nameIsValid;
    }

    model_internal function calculateOitem_drwr_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_oitem_drwr_nameValidator.validate(model_internal::_instance.oitem_drwr_name)
        model_internal::_oitem_drwr_nameIsValid_der = (valRes.results == null);
        model_internal::_oitem_drwr_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::oitem_drwr_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::oitem_drwr_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get oitem_drwr_nameValidationFailureMessages():Array
    {
        if (model_internal::_oitem_drwr_nameValidationFailureMessages == null)
            model_internal::calculateOitem_drwr_nameIsValid();

        return _oitem_drwr_nameValidationFailureMessages;
    }

    model_internal function set oitem_drwr_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_oitem_drwr_nameValidationFailureMessages;

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
            model_internal::_oitem_drwr_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_drwr_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get oitem_pack_sizeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get oitem_pack_sizeValidator() : StyleValidator
    {
        return model_internal::_oitem_pack_sizeValidator;
    }

    model_internal function set _oitem_pack_sizeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_oitem_pack_sizeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_oitem_pack_sizeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_pack_sizeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get oitem_pack_sizeIsValid():Boolean
    {
        if (!model_internal::_oitem_pack_sizeIsValidCacheInitialized)
        {
            model_internal::calculateOitem_pack_sizeIsValid();
        }

        return model_internal::_oitem_pack_sizeIsValid;
    }

    model_internal function calculateOitem_pack_sizeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_oitem_pack_sizeValidator.validate(model_internal::_instance.oitem_pack_size)
        model_internal::_oitem_pack_sizeIsValid_der = (valRes.results == null);
        model_internal::_oitem_pack_sizeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::oitem_pack_sizeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::oitem_pack_sizeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get oitem_pack_sizeValidationFailureMessages():Array
    {
        if (model_internal::_oitem_pack_sizeValidationFailureMessages == null)
            model_internal::calculateOitem_pack_sizeIsValid();

        return _oitem_pack_sizeValidationFailureMessages;
    }

    model_internal function set oitem_pack_sizeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_oitem_pack_sizeValidationFailureMessages;

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
            model_internal::_oitem_pack_sizeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_pack_sizeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get oitem_price_typeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get oitem_price_typeValidator() : StyleValidator
    {
        return model_internal::_oitem_price_typeValidator;
    }

    model_internal function set _oitem_price_typeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_oitem_price_typeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_oitem_price_typeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_price_typeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get oitem_price_typeIsValid():Boolean
    {
        if (!model_internal::_oitem_price_typeIsValidCacheInitialized)
        {
            model_internal::calculateOitem_price_typeIsValid();
        }

        return model_internal::_oitem_price_typeIsValid;
    }

    model_internal function calculateOitem_price_typeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_oitem_price_typeValidator.validate(model_internal::_instance.oitem_price_type)
        model_internal::_oitem_price_typeIsValid_der = (valRes.results == null);
        model_internal::_oitem_price_typeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::oitem_price_typeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::oitem_price_typeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get oitem_price_typeValidationFailureMessages():Array
    {
        if (model_internal::_oitem_price_typeValidationFailureMessages == null)
            model_internal::calculateOitem_price_typeIsValid();

        return _oitem_price_typeValidationFailureMessages;
    }

    model_internal function set oitem_price_typeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_oitem_price_typeValidationFailureMessages;

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
            model_internal::_oitem_price_typeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_price_typeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get oitem_delv_qtyStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get oitem_delv_qtyValidator() : StyleValidator
    {
        return model_internal::_oitem_delv_qtyValidator;
    }

    model_internal function set _oitem_delv_qtyIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_oitem_delv_qtyIsValid;         
        if (oldValue !== value)
        {
            model_internal::_oitem_delv_qtyIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_delv_qtyIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get oitem_delv_qtyIsValid():Boolean
    {
        if (!model_internal::_oitem_delv_qtyIsValidCacheInitialized)
        {
            model_internal::calculateOitem_delv_qtyIsValid();
        }

        return model_internal::_oitem_delv_qtyIsValid;
    }

    model_internal function calculateOitem_delv_qtyIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_oitem_delv_qtyValidator.validate(model_internal::_instance.oitem_delv_qty)
        model_internal::_oitem_delv_qtyIsValid_der = (valRes.results == null);
        model_internal::_oitem_delv_qtyIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::oitem_delv_qtyValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::oitem_delv_qtyValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get oitem_delv_qtyValidationFailureMessages():Array
    {
        if (model_internal::_oitem_delv_qtyValidationFailureMessages == null)
            model_internal::calculateOitem_delv_qtyIsValid();

        return _oitem_delv_qtyValidationFailureMessages;
    }

    model_internal function set oitem_delv_qtyValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_oitem_delv_qtyValidationFailureMessages;

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
            model_internal::_oitem_delv_qtyValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_delv_qtyValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get oitem_padj_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get oitem_padj_nameValidator() : StyleValidator
    {
        return model_internal::_oitem_padj_nameValidator;
    }

    model_internal function set _oitem_padj_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_oitem_padj_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_oitem_padj_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_padj_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get oitem_padj_nameIsValid():Boolean
    {
        if (!model_internal::_oitem_padj_nameIsValidCacheInitialized)
        {
            model_internal::calculateOitem_padj_nameIsValid();
        }

        return model_internal::_oitem_padj_nameIsValid;
    }

    model_internal function calculateOitem_padj_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_oitem_padj_nameValidator.validate(model_internal::_instance.oitem_padj_name)
        model_internal::_oitem_padj_nameIsValid_der = (valRes.results == null);
        model_internal::_oitem_padj_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::oitem_padj_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::oitem_padj_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get oitem_padj_nameValidationFailureMessages():Array
    {
        if (model_internal::_oitem_padj_nameValidationFailureMessages == null)
            model_internal::calculateOitem_padj_nameIsValid();

        return _oitem_padj_nameValidationFailureMessages;
    }

    model_internal function set oitem_padj_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_oitem_padj_nameValidationFailureMessages;

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
            model_internal::_oitem_padj_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_padj_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get oitem_schedulesStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get oitem_schedulesValidator() : StyleValidator
    {
        return model_internal::_oitem_schedulesValidator;
    }

    model_internal function set _oitem_schedulesIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_oitem_schedulesIsValid;         
        if (oldValue !== value)
        {
            model_internal::_oitem_schedulesIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_schedulesIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get oitem_schedulesIsValid():Boolean
    {
        if (!model_internal::_oitem_schedulesIsValidCacheInitialized)
        {
            model_internal::calculateOitem_schedulesIsValid();
        }

        return model_internal::_oitem_schedulesIsValid;
    }

    model_internal function calculateOitem_schedulesIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_oitem_schedulesValidator.validate(model_internal::_instance.oitem_schedules)
        model_internal::_oitem_schedulesIsValid_der = (valRes.results == null);
        model_internal::_oitem_schedulesIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::oitem_schedulesValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::oitem_schedulesValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get oitem_schedulesValidationFailureMessages():Array
    {
        if (model_internal::_oitem_schedulesValidationFailureMessages == null)
            model_internal::calculateOitem_schedulesIsValid();

        return _oitem_schedulesValidationFailureMessages;
    }

    model_internal function set oitem_schedulesValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_oitem_schedulesValidationFailureMessages;

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
            model_internal::_oitem_schedulesValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_schedulesValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get oitem_load_qtyStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get oitem_load_qtyValidator() : StyleValidator
    {
        return model_internal::_oitem_load_qtyValidator;
    }

    model_internal function set _oitem_load_qtyIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_oitem_load_qtyIsValid;         
        if (oldValue !== value)
        {
            model_internal::_oitem_load_qtyIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_load_qtyIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get oitem_load_qtyIsValid():Boolean
    {
        if (!model_internal::_oitem_load_qtyIsValidCacheInitialized)
        {
            model_internal::calculateOitem_load_qtyIsValid();
        }

        return model_internal::_oitem_load_qtyIsValid;
    }

    model_internal function calculateOitem_load_qtyIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_oitem_load_qtyValidator.validate(model_internal::_instance.oitem_load_qty)
        model_internal::_oitem_load_qtyIsValid_der = (valRes.results == null);
        model_internal::_oitem_load_qtyIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::oitem_load_qtyValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::oitem_load_qtyValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get oitem_load_qtyValidationFailureMessages():Array
    {
        if (model_internal::_oitem_load_qtyValidationFailureMessages == null)
            model_internal::calculateOitem_load_qtyIsValid();

        return _oitem_load_qtyValidationFailureMessages;
    }

    model_internal function set oitem_load_qtyValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_oitem_load_qtyValidationFailureMessages;

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
            model_internal::_oitem_load_qtyValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_load_qtyValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get oitem_exempt_noStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get oitem_exempt_noValidator() : StyleValidator
    {
        return model_internal::_oitem_exempt_noValidator;
    }

    model_internal function set _oitem_exempt_noIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_oitem_exempt_noIsValid;         
        if (oldValue !== value)
        {
            model_internal::_oitem_exempt_noIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_exempt_noIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get oitem_exempt_noIsValid():Boolean
    {
        if (!model_internal::_oitem_exempt_noIsValidCacheInitialized)
        {
            model_internal::calculateOitem_exempt_noIsValid();
        }

        return model_internal::_oitem_exempt_noIsValid;
    }

    model_internal function calculateOitem_exempt_noIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_oitem_exempt_noValidator.validate(model_internal::_instance.oitem_exempt_no)
        model_internal::_oitem_exempt_noIsValid_der = (valRes.results == null);
        model_internal::_oitem_exempt_noIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::oitem_exempt_noValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::oitem_exempt_noValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get oitem_exempt_noValidationFailureMessages():Array
    {
        if (model_internal::_oitem_exempt_noValidationFailureMessages == null)
            model_internal::calculateOitem_exempt_noIsValid();

        return _oitem_exempt_noValidationFailureMessages;
    }

    model_internal function set oitem_exempt_noValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_oitem_exempt_noValidationFailureMessages;

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
            model_internal::_oitem_exempt_noValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_exempt_noValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get oitem_prod_cmpyStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get oitem_prod_cmpyValidator() : StyleValidator
    {
        return model_internal::_oitem_prod_cmpyValidator;
    }

    model_internal function set _oitem_prod_cmpyIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_oitem_prod_cmpyIsValid;         
        if (oldValue !== value)
        {
            model_internal::_oitem_prod_cmpyIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_prod_cmpyIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get oitem_prod_cmpyIsValid():Boolean
    {
        if (!model_internal::_oitem_prod_cmpyIsValidCacheInitialized)
        {
            model_internal::calculateOitem_prod_cmpyIsValid();
        }

        return model_internal::_oitem_prod_cmpyIsValid;
    }

    model_internal function calculateOitem_prod_cmpyIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_oitem_prod_cmpyValidator.validate(model_internal::_instance.oitem_prod_cmpy)
        model_internal::_oitem_prod_cmpyIsValid_der = (valRes.results == null);
        model_internal::_oitem_prod_cmpyIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::oitem_prod_cmpyValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::oitem_prod_cmpyValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get oitem_prod_cmpyValidationFailureMessages():Array
    {
        if (model_internal::_oitem_prod_cmpyValidationFailureMessages == null)
            model_internal::calculateOitem_prod_cmpyIsValid();

        return _oitem_prod_cmpyValidationFailureMessages;
    }

    model_internal function set oitem_prod_cmpyValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_oitem_prod_cmpyValidationFailureMessages;

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
            model_internal::_oitem_prod_cmpyValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_prod_cmpyValidationFailureMessages", oldValue, value));
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
            case("oitem_unit_name"):
            {
                return oitem_unit_nameValidationFailureMessages;
            }
            case("oitem_prod_price"):
            {
                return oitem_prod_priceValidationFailureMessages;
            }
            case("oitem_prod_unit"):
            {
                return oitem_prod_unitValidationFailureMessages;
            }
            case("oitem_by_packs"):
            {
                return oitem_by_packsValidationFailureMessages;
            }
            case("oitem_prod_name"):
            {
                return oitem_prod_nameValidationFailureMessages;
            }
            case("oitem_line_no"):
            {
                return oitem_line_noValidationFailureMessages;
            }
            case("oitem_schd_qty"):
            {
                return oitem_schd_qtyValidationFailureMessages;
            }
            case("oitem_price_name"):
            {
                return oitem_price_nameValidationFailureMessages;
            }
            case("oitem_prod_qty"):
            {
                return oitem_prod_qtyValidationFailureMessages;
            }
            case("oitem_period_no"):
            {
                return oitem_period_noValidationFailureMessages;
            }
            case("oitem_prod_code"):
            {
                return oitem_prod_codeValidationFailureMessages;
            }
            case("oitem_periods"):
            {
                return oitem_periodsValidationFailureMessages;
            }
            case("oitem_padj_code"):
            {
                return oitem_padj_codeValidationFailureMessages;
            }
            case("oitem_order_id"):
            {
                return oitem_order_idValidationFailureMessages;
            }
            case("oitem_drwr_name"):
            {
                return oitem_drwr_nameValidationFailureMessages;
            }
            case("oitem_pack_size"):
            {
                return oitem_pack_sizeValidationFailureMessages;
            }
            case("oitem_price_type"):
            {
                return oitem_price_typeValidationFailureMessages;
            }
            case("oitem_delv_qty"):
            {
                return oitem_delv_qtyValidationFailureMessages;
            }
            case("oitem_padj_name"):
            {
                return oitem_padj_nameValidationFailureMessages;
            }
            case("oitem_schedules"):
            {
                return oitem_schedulesValidationFailureMessages;
            }
            case("oitem_load_qty"):
            {
                return oitem_load_qtyValidationFailureMessages;
            }
            case("oitem_exempt_no"):
            {
                return oitem_exempt_noValidationFailureMessages;
            }
            case("oitem_prod_cmpy"):
            {
                return oitem_prod_cmpyValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
