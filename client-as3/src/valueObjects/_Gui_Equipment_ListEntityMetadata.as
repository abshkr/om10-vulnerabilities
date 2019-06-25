
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
internal class _Gui_Equipment_ListEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("eqpt_owner", "eqpt_etp", "rn", "eqpt_tanker", "eqpt_lock", "eqpt_code", "eqpt_empty_kg", "eqpt_area_name", "eqpt_load_type", "eqpt_owner_name", "eqpt_exp_d1_dmy", "eqpt_exp_d3_dmy", "eqpt_comments", "eqpt_exp_d2_dmy", "eqp_must_tare_in", "eqpt_id", "eqpt_load_type_name", "etyp_category", "eqpt_title", "composition", "eqpt_etp_title", "eqpt_area", "eqpt_max_gross");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("eqpt_owner", "eqpt_etp", "rn", "eqpt_tanker", "eqpt_lock", "eqpt_code", "eqpt_empty_kg", "eqpt_area_name", "eqpt_load_type", "eqpt_owner_name", "eqpt_exp_d1_dmy", "eqpt_exp_d3_dmy", "eqpt_comments", "eqpt_exp_d2_dmy", "eqp_must_tare_in", "eqpt_id", "eqpt_load_type_name", "etyp_category", "eqpt_title", "composition", "eqpt_etp_title", "eqpt_area", "eqpt_max_gross");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("eqpt_owner", "eqpt_etp", "rn", "eqpt_tanker", "eqpt_lock", "eqpt_code", "eqpt_empty_kg", "eqpt_area_name", "eqpt_load_type", "eqpt_owner_name", "eqpt_exp_d1_dmy", "eqpt_exp_d3_dmy", "eqpt_comments", "eqpt_exp_d2_dmy", "eqp_must_tare_in", "eqpt_id", "eqpt_load_type_name", "etyp_category", "eqpt_title", "composition", "eqpt_etp_title", "eqpt_area", "eqpt_max_gross");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("eqpt_owner", "eqpt_etp", "rn", "eqpt_tanker", "eqpt_lock", "eqpt_code", "eqpt_empty_kg", "eqpt_area_name", "eqpt_load_type", "eqpt_owner_name", "eqpt_exp_d1_dmy", "eqpt_exp_d3_dmy", "eqpt_comments", "eqpt_exp_d2_dmy", "eqp_must_tare_in", "eqpt_id", "eqpt_load_type_name", "etyp_category", "eqpt_title", "composition", "eqpt_etp_title", "eqpt_area", "eqpt_max_gross");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("eqpt_owner", "eqpt_etp", "rn", "eqpt_tanker", "eqpt_lock", "eqpt_code", "eqpt_empty_kg", "eqpt_area_name", "eqpt_load_type", "eqpt_owner_name", "eqpt_exp_d1_dmy", "eqpt_exp_d3_dmy", "eqpt_comments", "eqpt_exp_d2_dmy", "eqp_must_tare_in", "eqpt_id", "eqpt_load_type_name", "etyp_category", "eqpt_title", "composition", "eqpt_etp_title", "eqpt_area", "eqpt_max_gross");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "Gui_Equipment_List";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _eqpt_ownerIsValid:Boolean;
    model_internal var _eqpt_ownerValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _eqpt_ownerIsValidCacheInitialized:Boolean = false;
    model_internal var _eqpt_ownerValidationFailureMessages:Array;
    
    model_internal var _eqpt_etpIsValid:Boolean;
    model_internal var _eqpt_etpValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _eqpt_etpIsValidCacheInitialized:Boolean = false;
    model_internal var _eqpt_etpValidationFailureMessages:Array;
    
    model_internal var _rnIsValid:Boolean;
    model_internal var _rnValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _rnIsValidCacheInitialized:Boolean = false;
    model_internal var _rnValidationFailureMessages:Array;
    
    model_internal var _eqpt_tankerIsValid:Boolean;
    model_internal var _eqpt_tankerValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _eqpt_tankerIsValidCacheInitialized:Boolean = false;
    model_internal var _eqpt_tankerValidationFailureMessages:Array;
    
    model_internal var _eqpt_lockIsValid:Boolean;
    model_internal var _eqpt_lockValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _eqpt_lockIsValidCacheInitialized:Boolean = false;
    model_internal var _eqpt_lockValidationFailureMessages:Array;
    
    model_internal var _eqpt_codeIsValid:Boolean;
    model_internal var _eqpt_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _eqpt_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _eqpt_codeValidationFailureMessages:Array;
    
    model_internal var _eqpt_empty_kgIsValid:Boolean;
    model_internal var _eqpt_empty_kgValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _eqpt_empty_kgIsValidCacheInitialized:Boolean = false;
    model_internal var _eqpt_empty_kgValidationFailureMessages:Array;
    
    model_internal var _eqpt_area_nameIsValid:Boolean;
    model_internal var _eqpt_area_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _eqpt_area_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _eqpt_area_nameValidationFailureMessages:Array;
    
    model_internal var _eqpt_load_typeIsValid:Boolean;
    model_internal var _eqpt_load_typeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _eqpt_load_typeIsValidCacheInitialized:Boolean = false;
    model_internal var _eqpt_load_typeValidationFailureMessages:Array;
    
    model_internal var _eqpt_owner_nameIsValid:Boolean;
    model_internal var _eqpt_owner_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _eqpt_owner_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _eqpt_owner_nameValidationFailureMessages:Array;
    
    model_internal var _eqpt_exp_d1_dmyIsValid:Boolean;
    model_internal var _eqpt_exp_d1_dmyValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _eqpt_exp_d1_dmyIsValidCacheInitialized:Boolean = false;
    model_internal var _eqpt_exp_d1_dmyValidationFailureMessages:Array;
    
    model_internal var _eqpt_exp_d3_dmyIsValid:Boolean;
    model_internal var _eqpt_exp_d3_dmyValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _eqpt_exp_d3_dmyIsValidCacheInitialized:Boolean = false;
    model_internal var _eqpt_exp_d3_dmyValidationFailureMessages:Array;
    
    model_internal var _eqpt_commentsIsValid:Boolean;
    model_internal var _eqpt_commentsValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _eqpt_commentsIsValidCacheInitialized:Boolean = false;
    model_internal var _eqpt_commentsValidationFailureMessages:Array;
    
    model_internal var _eqpt_exp_d2_dmyIsValid:Boolean;
    model_internal var _eqpt_exp_d2_dmyValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _eqpt_exp_d2_dmyIsValidCacheInitialized:Boolean = false;
    model_internal var _eqpt_exp_d2_dmyValidationFailureMessages:Array;
    
    model_internal var _eqp_must_tare_inIsValid:Boolean;
    model_internal var _eqp_must_tare_inValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _eqp_must_tare_inIsValidCacheInitialized:Boolean = false;
    model_internal var _eqp_must_tare_inValidationFailureMessages:Array;
    
    model_internal var _eqpt_idIsValid:Boolean;
    model_internal var _eqpt_idValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _eqpt_idIsValidCacheInitialized:Boolean = false;
    model_internal var _eqpt_idValidationFailureMessages:Array;
    
    model_internal var _eqpt_load_type_nameIsValid:Boolean;
    model_internal var _eqpt_load_type_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _eqpt_load_type_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _eqpt_load_type_nameValidationFailureMessages:Array;
    
    model_internal var _etyp_categoryIsValid:Boolean;
    model_internal var _etyp_categoryValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _etyp_categoryIsValidCacheInitialized:Boolean = false;
    model_internal var _etyp_categoryValidationFailureMessages:Array;
    
    model_internal var _eqpt_titleIsValid:Boolean;
    model_internal var _eqpt_titleValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _eqpt_titleIsValidCacheInitialized:Boolean = false;
    model_internal var _eqpt_titleValidationFailureMessages:Array;
    
    model_internal var _compositionIsValid:Boolean;
    model_internal var _compositionValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _compositionIsValidCacheInitialized:Boolean = false;
    model_internal var _compositionValidationFailureMessages:Array;
    
    model_internal var _eqpt_etp_titleIsValid:Boolean;
    model_internal var _eqpt_etp_titleValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _eqpt_etp_titleIsValidCacheInitialized:Boolean = false;
    model_internal var _eqpt_etp_titleValidationFailureMessages:Array;
    
    model_internal var _eqpt_areaIsValid:Boolean;
    model_internal var _eqpt_areaValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _eqpt_areaIsValidCacheInitialized:Boolean = false;
    model_internal var _eqpt_areaValidationFailureMessages:Array;
    
    model_internal var _eqpt_max_grossIsValid:Boolean;
    model_internal var _eqpt_max_grossValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _eqpt_max_grossIsValidCacheInitialized:Boolean = false;
    model_internal var _eqpt_max_grossValidationFailureMessages:Array;

    model_internal var _instance:_Super_Gui_Equipment_List;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _Gui_Equipment_ListEntityMetadata(value : _Super_Gui_Equipment_List)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["eqpt_owner"] = new Array();
            model_internal::dependentsOnMap["eqpt_etp"] = new Array();
            model_internal::dependentsOnMap["rn"] = new Array();
            model_internal::dependentsOnMap["eqpt_tanker"] = new Array();
            model_internal::dependentsOnMap["eqpt_lock"] = new Array();
            model_internal::dependentsOnMap["eqpt_code"] = new Array();
            model_internal::dependentsOnMap["eqpt_empty_kg"] = new Array();
            model_internal::dependentsOnMap["eqpt_area_name"] = new Array();
            model_internal::dependentsOnMap["eqpt_load_type"] = new Array();
            model_internal::dependentsOnMap["eqpt_owner_name"] = new Array();
            model_internal::dependentsOnMap["eqpt_exp_d1_dmy"] = new Array();
            model_internal::dependentsOnMap["eqpt_exp_d3_dmy"] = new Array();
            model_internal::dependentsOnMap["eqpt_comments"] = new Array();
            model_internal::dependentsOnMap["eqpt_exp_d2_dmy"] = new Array();
            model_internal::dependentsOnMap["eqp_must_tare_in"] = new Array();
            model_internal::dependentsOnMap["eqpt_id"] = new Array();
            model_internal::dependentsOnMap["eqpt_load_type_name"] = new Array();
            model_internal::dependentsOnMap["etyp_category"] = new Array();
            model_internal::dependentsOnMap["eqpt_title"] = new Array();
            model_internal::dependentsOnMap["composition"] = new Array();
            model_internal::dependentsOnMap["eqpt_etp_title"] = new Array();
            model_internal::dependentsOnMap["eqpt_area"] = new Array();
            model_internal::dependentsOnMap["eqpt_max_gross"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["eqpt_owner"] = "String";
        model_internal::propertyTypeMap["eqpt_etp"] = "String";
        model_internal::propertyTypeMap["rn"] = "String";
        model_internal::propertyTypeMap["eqpt_tanker"] = "Object";
        model_internal::propertyTypeMap["eqpt_lock"] = "String";
        model_internal::propertyTypeMap["eqpt_code"] = "String";
        model_internal::propertyTypeMap["eqpt_empty_kg"] = "String";
        model_internal::propertyTypeMap["eqpt_area_name"] = "String";
        model_internal::propertyTypeMap["eqpt_load_type"] = "String";
        model_internal::propertyTypeMap["eqpt_owner_name"] = "String";
        model_internal::propertyTypeMap["eqpt_exp_d1_dmy"] = "String";
        model_internal::propertyTypeMap["eqpt_exp_d3_dmy"] = "String";
        model_internal::propertyTypeMap["eqpt_comments"] = "String";
        model_internal::propertyTypeMap["eqpt_exp_d2_dmy"] = "String";
        model_internal::propertyTypeMap["eqp_must_tare_in"] = "String";
        model_internal::propertyTypeMap["eqpt_id"] = "String";
        model_internal::propertyTypeMap["eqpt_load_type_name"] = "String";
        model_internal::propertyTypeMap["etyp_category"] = "Object";
        model_internal::propertyTypeMap["eqpt_title"] = "String";
        model_internal::propertyTypeMap["composition"] = "Object";
        model_internal::propertyTypeMap["eqpt_etp_title"] = "String";
        model_internal::propertyTypeMap["eqpt_area"] = "String";
        model_internal::propertyTypeMap["eqpt_max_gross"] = "String";

        model_internal::_instance = value;
        model_internal::_eqpt_ownerValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEqpt_owner);
        model_internal::_eqpt_ownerValidator.required = true;
        model_internal::_eqpt_ownerValidator.requiredFieldError = "eqpt_owner is required";
        //model_internal::_eqpt_ownerValidator.source = model_internal::_instance;
        //model_internal::_eqpt_ownerValidator.property = "eqpt_owner";
        model_internal::_eqpt_etpValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEqpt_etp);
        model_internal::_eqpt_etpValidator.required = true;
        model_internal::_eqpt_etpValidator.requiredFieldError = "eqpt_etp is required";
        //model_internal::_eqpt_etpValidator.source = model_internal::_instance;
        //model_internal::_eqpt_etpValidator.property = "eqpt_etp";
        model_internal::_rnValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForRn);
        model_internal::_rnValidator.required = true;
        model_internal::_rnValidator.requiredFieldError = "rn is required";
        //model_internal::_rnValidator.source = model_internal::_instance;
        //model_internal::_rnValidator.property = "rn";
        model_internal::_eqpt_tankerValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEqpt_tanker);
        model_internal::_eqpt_tankerValidator.required = true;
        model_internal::_eqpt_tankerValidator.requiredFieldError = "eqpt_tanker is required";
        //model_internal::_eqpt_tankerValidator.source = model_internal::_instance;
        //model_internal::_eqpt_tankerValidator.property = "eqpt_tanker";
        model_internal::_eqpt_lockValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEqpt_lock);
        model_internal::_eqpt_lockValidator.required = true;
        model_internal::_eqpt_lockValidator.requiredFieldError = "eqpt_lock is required";
        //model_internal::_eqpt_lockValidator.source = model_internal::_instance;
        //model_internal::_eqpt_lockValidator.property = "eqpt_lock";
        model_internal::_eqpt_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEqpt_code);
        model_internal::_eqpt_codeValidator.required = true;
        model_internal::_eqpt_codeValidator.requiredFieldError = "eqpt_code is required";
        //model_internal::_eqpt_codeValidator.source = model_internal::_instance;
        //model_internal::_eqpt_codeValidator.property = "eqpt_code";
        model_internal::_eqpt_empty_kgValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEqpt_empty_kg);
        model_internal::_eqpt_empty_kgValidator.required = true;
        model_internal::_eqpt_empty_kgValidator.requiredFieldError = "eqpt_empty_kg is required";
        //model_internal::_eqpt_empty_kgValidator.source = model_internal::_instance;
        //model_internal::_eqpt_empty_kgValidator.property = "eqpt_empty_kg";
        model_internal::_eqpt_area_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEqpt_area_name);
        model_internal::_eqpt_area_nameValidator.required = true;
        model_internal::_eqpt_area_nameValidator.requiredFieldError = "eqpt_area_name is required";
        //model_internal::_eqpt_area_nameValidator.source = model_internal::_instance;
        //model_internal::_eqpt_area_nameValidator.property = "eqpt_area_name";
        model_internal::_eqpt_load_typeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEqpt_load_type);
        model_internal::_eqpt_load_typeValidator.required = true;
        model_internal::_eqpt_load_typeValidator.requiredFieldError = "eqpt_load_type is required";
        //model_internal::_eqpt_load_typeValidator.source = model_internal::_instance;
        //model_internal::_eqpt_load_typeValidator.property = "eqpt_load_type";
        model_internal::_eqpt_owner_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEqpt_owner_name);
        model_internal::_eqpt_owner_nameValidator.required = true;
        model_internal::_eqpt_owner_nameValidator.requiredFieldError = "eqpt_owner_name is required";
        //model_internal::_eqpt_owner_nameValidator.source = model_internal::_instance;
        //model_internal::_eqpt_owner_nameValidator.property = "eqpt_owner_name";
        model_internal::_eqpt_exp_d1_dmyValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEqpt_exp_d1_dmy);
        model_internal::_eqpt_exp_d1_dmyValidator.required = true;
        model_internal::_eqpt_exp_d1_dmyValidator.requiredFieldError = "eqpt_exp_d1_dmy is required";
        //model_internal::_eqpt_exp_d1_dmyValidator.source = model_internal::_instance;
        //model_internal::_eqpt_exp_d1_dmyValidator.property = "eqpt_exp_d1_dmy";
        model_internal::_eqpt_exp_d3_dmyValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEqpt_exp_d3_dmy);
        model_internal::_eqpt_exp_d3_dmyValidator.required = true;
        model_internal::_eqpt_exp_d3_dmyValidator.requiredFieldError = "eqpt_exp_d3_dmy is required";
        //model_internal::_eqpt_exp_d3_dmyValidator.source = model_internal::_instance;
        //model_internal::_eqpt_exp_d3_dmyValidator.property = "eqpt_exp_d3_dmy";
        model_internal::_eqpt_commentsValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEqpt_comments);
        model_internal::_eqpt_commentsValidator.required = true;
        model_internal::_eqpt_commentsValidator.requiredFieldError = "eqpt_comments is required";
        //model_internal::_eqpt_commentsValidator.source = model_internal::_instance;
        //model_internal::_eqpt_commentsValidator.property = "eqpt_comments";
        model_internal::_eqpt_exp_d2_dmyValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEqpt_exp_d2_dmy);
        model_internal::_eqpt_exp_d2_dmyValidator.required = true;
        model_internal::_eqpt_exp_d2_dmyValidator.requiredFieldError = "eqpt_exp_d2_dmy is required";
        //model_internal::_eqpt_exp_d2_dmyValidator.source = model_internal::_instance;
        //model_internal::_eqpt_exp_d2_dmyValidator.property = "eqpt_exp_d2_dmy";
        model_internal::_eqp_must_tare_inValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEqp_must_tare_in);
        model_internal::_eqp_must_tare_inValidator.required = true;
        model_internal::_eqp_must_tare_inValidator.requiredFieldError = "eqp_must_tare_in is required";
        //model_internal::_eqp_must_tare_inValidator.source = model_internal::_instance;
        //model_internal::_eqp_must_tare_inValidator.property = "eqp_must_tare_in";
        model_internal::_eqpt_idValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEqpt_id);
        model_internal::_eqpt_idValidator.required = true;
        model_internal::_eqpt_idValidator.requiredFieldError = "eqpt_id is required";
        //model_internal::_eqpt_idValidator.source = model_internal::_instance;
        //model_internal::_eqpt_idValidator.property = "eqpt_id";
        model_internal::_eqpt_load_type_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEqpt_load_type_name);
        model_internal::_eqpt_load_type_nameValidator.required = true;
        model_internal::_eqpt_load_type_nameValidator.requiredFieldError = "eqpt_load_type_name is required";
        //model_internal::_eqpt_load_type_nameValidator.source = model_internal::_instance;
        //model_internal::_eqpt_load_type_nameValidator.property = "eqpt_load_type_name";
        model_internal::_etyp_categoryValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEtyp_category);
        model_internal::_etyp_categoryValidator.required = true;
        model_internal::_etyp_categoryValidator.requiredFieldError = "etyp_category is required";
        //model_internal::_etyp_categoryValidator.source = model_internal::_instance;
        //model_internal::_etyp_categoryValidator.property = "etyp_category";
        model_internal::_eqpt_titleValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEqpt_title);
        model_internal::_eqpt_titleValidator.required = true;
        model_internal::_eqpt_titleValidator.requiredFieldError = "eqpt_title is required";
        //model_internal::_eqpt_titleValidator.source = model_internal::_instance;
        //model_internal::_eqpt_titleValidator.property = "eqpt_title";
        model_internal::_compositionValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForComposition);
        model_internal::_compositionValidator.required = true;
        model_internal::_compositionValidator.requiredFieldError = "composition is required";
        //model_internal::_compositionValidator.source = model_internal::_instance;
        //model_internal::_compositionValidator.property = "composition";
        model_internal::_eqpt_etp_titleValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEqpt_etp_title);
        model_internal::_eqpt_etp_titleValidator.required = true;
        model_internal::_eqpt_etp_titleValidator.requiredFieldError = "eqpt_etp_title is required";
        //model_internal::_eqpt_etp_titleValidator.source = model_internal::_instance;
        //model_internal::_eqpt_etp_titleValidator.property = "eqpt_etp_title";
        model_internal::_eqpt_areaValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEqpt_area);
        model_internal::_eqpt_areaValidator.required = true;
        model_internal::_eqpt_areaValidator.requiredFieldError = "eqpt_area is required";
        //model_internal::_eqpt_areaValidator.source = model_internal::_instance;
        //model_internal::_eqpt_areaValidator.property = "eqpt_area";
        model_internal::_eqpt_max_grossValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEqpt_max_gross);
        model_internal::_eqpt_max_grossValidator.required = true;
        model_internal::_eqpt_max_grossValidator.requiredFieldError = "eqpt_max_gross is required";
        //model_internal::_eqpt_max_grossValidator.source = model_internal::_instance;
        //model_internal::_eqpt_max_grossValidator.property = "eqpt_max_gross";
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
            throw new Error(propertyName + " is not a data property of entity Gui_Equipment_List");
            
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
            throw new Error(propertyName + " is not a collection property of entity Gui_Equipment_List");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of Gui_Equipment_List");

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
            throw new Error(propertyName + " does not exist for entity Gui_Equipment_List");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity Gui_Equipment_List");
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
            throw new Error(propertyName + " does not exist for entity Gui_Equipment_List");
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
    public function get isEqpt_ownerAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEqpt_etpAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isRnAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEqpt_tankerAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEqpt_lockAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEqpt_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEqpt_empty_kgAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEqpt_area_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEqpt_load_typeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEqpt_owner_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEqpt_exp_d1_dmyAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEqpt_exp_d3_dmyAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEqpt_commentsAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEqpt_exp_d2_dmyAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEqp_must_tare_inAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEqpt_idAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEqpt_load_type_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEtyp_categoryAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEqpt_titleAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCompositionAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEqpt_etp_titleAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEqpt_areaAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEqpt_max_grossAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnEqpt_owner():void
    {
        if (model_internal::_eqpt_ownerIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEqpt_owner = null;
            model_internal::calculateEqpt_ownerIsValid();
        }
    }
    public function invalidateDependentOnEqpt_etp():void
    {
        if (model_internal::_eqpt_etpIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEqpt_etp = null;
            model_internal::calculateEqpt_etpIsValid();
        }
    }
    public function invalidateDependentOnRn():void
    {
        if (model_internal::_rnIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfRn = null;
            model_internal::calculateRnIsValid();
        }
    }
    public function invalidateDependentOnEqpt_tanker():void
    {
        if (model_internal::_eqpt_tankerIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEqpt_tanker = null;
            model_internal::calculateEqpt_tankerIsValid();
        }
    }
    public function invalidateDependentOnEqpt_lock():void
    {
        if (model_internal::_eqpt_lockIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEqpt_lock = null;
            model_internal::calculateEqpt_lockIsValid();
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
    public function invalidateDependentOnEqpt_empty_kg():void
    {
        if (model_internal::_eqpt_empty_kgIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEqpt_empty_kg = null;
            model_internal::calculateEqpt_empty_kgIsValid();
        }
    }
    public function invalidateDependentOnEqpt_area_name():void
    {
        if (model_internal::_eqpt_area_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEqpt_area_name = null;
            model_internal::calculateEqpt_area_nameIsValid();
        }
    }
    public function invalidateDependentOnEqpt_load_type():void
    {
        if (model_internal::_eqpt_load_typeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEqpt_load_type = null;
            model_internal::calculateEqpt_load_typeIsValid();
        }
    }
    public function invalidateDependentOnEqpt_owner_name():void
    {
        if (model_internal::_eqpt_owner_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEqpt_owner_name = null;
            model_internal::calculateEqpt_owner_nameIsValid();
        }
    }
    public function invalidateDependentOnEqpt_exp_d1_dmy():void
    {
        if (model_internal::_eqpt_exp_d1_dmyIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEqpt_exp_d1_dmy = null;
            model_internal::calculateEqpt_exp_d1_dmyIsValid();
        }
    }
    public function invalidateDependentOnEqpt_exp_d3_dmy():void
    {
        if (model_internal::_eqpt_exp_d3_dmyIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEqpt_exp_d3_dmy = null;
            model_internal::calculateEqpt_exp_d3_dmyIsValid();
        }
    }
    public function invalidateDependentOnEqpt_comments():void
    {
        if (model_internal::_eqpt_commentsIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEqpt_comments = null;
            model_internal::calculateEqpt_commentsIsValid();
        }
    }
    public function invalidateDependentOnEqpt_exp_d2_dmy():void
    {
        if (model_internal::_eqpt_exp_d2_dmyIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEqpt_exp_d2_dmy = null;
            model_internal::calculateEqpt_exp_d2_dmyIsValid();
        }
    }
    public function invalidateDependentOnEqp_must_tare_in():void
    {
        if (model_internal::_eqp_must_tare_inIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEqp_must_tare_in = null;
            model_internal::calculateEqp_must_tare_inIsValid();
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
    public function invalidateDependentOnEqpt_load_type_name():void
    {
        if (model_internal::_eqpt_load_type_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEqpt_load_type_name = null;
            model_internal::calculateEqpt_load_type_nameIsValid();
        }
    }
    public function invalidateDependentOnEtyp_category():void
    {
        if (model_internal::_etyp_categoryIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEtyp_category = null;
            model_internal::calculateEtyp_categoryIsValid();
        }
    }
    public function invalidateDependentOnEqpt_title():void
    {
        if (model_internal::_eqpt_titleIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEqpt_title = null;
            model_internal::calculateEqpt_titleIsValid();
        }
    }
    public function invalidateDependentOnComposition():void
    {
        if (model_internal::_compositionIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfComposition = null;
            model_internal::calculateCompositionIsValid();
        }
    }
    public function invalidateDependentOnEqpt_etp_title():void
    {
        if (model_internal::_eqpt_etp_titleIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEqpt_etp_title = null;
            model_internal::calculateEqpt_etp_titleIsValid();
        }
    }
    public function invalidateDependentOnEqpt_area():void
    {
        if (model_internal::_eqpt_areaIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEqpt_area = null;
            model_internal::calculateEqpt_areaIsValid();
        }
    }
    public function invalidateDependentOnEqpt_max_gross():void
    {
        if (model_internal::_eqpt_max_grossIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEqpt_max_gross = null;
            model_internal::calculateEqpt_max_grossIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get eqpt_ownerStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get eqpt_ownerValidator() : StyleValidator
    {
        return model_internal::_eqpt_ownerValidator;
    }

    model_internal function set _eqpt_ownerIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_eqpt_ownerIsValid;         
        if (oldValue !== value)
        {
            model_internal::_eqpt_ownerIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_ownerIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_ownerIsValid():Boolean
    {
        if (!model_internal::_eqpt_ownerIsValidCacheInitialized)
        {
            model_internal::calculateEqpt_ownerIsValid();
        }

        return model_internal::_eqpt_ownerIsValid;
    }

    model_internal function calculateEqpt_ownerIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_eqpt_ownerValidator.validate(model_internal::_instance.eqpt_owner)
        model_internal::_eqpt_ownerIsValid_der = (valRes.results == null);
        model_internal::_eqpt_ownerIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::eqpt_ownerValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::eqpt_ownerValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_ownerValidationFailureMessages():Array
    {
        if (model_internal::_eqpt_ownerValidationFailureMessages == null)
            model_internal::calculateEqpt_ownerIsValid();

        return _eqpt_ownerValidationFailureMessages;
    }

    model_internal function set eqpt_ownerValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_eqpt_ownerValidationFailureMessages;

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
            model_internal::_eqpt_ownerValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_ownerValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get eqpt_etpStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get eqpt_etpValidator() : StyleValidator
    {
        return model_internal::_eqpt_etpValidator;
    }

    model_internal function set _eqpt_etpIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_eqpt_etpIsValid;         
        if (oldValue !== value)
        {
            model_internal::_eqpt_etpIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_etpIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_etpIsValid():Boolean
    {
        if (!model_internal::_eqpt_etpIsValidCacheInitialized)
        {
            model_internal::calculateEqpt_etpIsValid();
        }

        return model_internal::_eqpt_etpIsValid;
    }

    model_internal function calculateEqpt_etpIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_eqpt_etpValidator.validate(model_internal::_instance.eqpt_etp)
        model_internal::_eqpt_etpIsValid_der = (valRes.results == null);
        model_internal::_eqpt_etpIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::eqpt_etpValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::eqpt_etpValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_etpValidationFailureMessages():Array
    {
        if (model_internal::_eqpt_etpValidationFailureMessages == null)
            model_internal::calculateEqpt_etpIsValid();

        return _eqpt_etpValidationFailureMessages;
    }

    model_internal function set eqpt_etpValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_eqpt_etpValidationFailureMessages;

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
            model_internal::_eqpt_etpValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_etpValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get rnStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get rnValidator() : StyleValidator
    {
        return model_internal::_rnValidator;
    }

    model_internal function set _rnIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_rnIsValid;         
        if (oldValue !== value)
        {
            model_internal::_rnIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "rnIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get rnIsValid():Boolean
    {
        if (!model_internal::_rnIsValidCacheInitialized)
        {
            model_internal::calculateRnIsValid();
        }

        return model_internal::_rnIsValid;
    }

    model_internal function calculateRnIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_rnValidator.validate(model_internal::_instance.rn)
        model_internal::_rnIsValid_der = (valRes.results == null);
        model_internal::_rnIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::rnValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::rnValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get rnValidationFailureMessages():Array
    {
        if (model_internal::_rnValidationFailureMessages == null)
            model_internal::calculateRnIsValid();

        return _rnValidationFailureMessages;
    }

    model_internal function set rnValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_rnValidationFailureMessages;

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
            model_internal::_rnValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "rnValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get eqpt_tankerStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get eqpt_tankerValidator() : StyleValidator
    {
        return model_internal::_eqpt_tankerValidator;
    }

    model_internal function set _eqpt_tankerIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_eqpt_tankerIsValid;         
        if (oldValue !== value)
        {
            model_internal::_eqpt_tankerIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_tankerIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_tankerIsValid():Boolean
    {
        if (!model_internal::_eqpt_tankerIsValidCacheInitialized)
        {
            model_internal::calculateEqpt_tankerIsValid();
        }

        return model_internal::_eqpt_tankerIsValid;
    }

    model_internal function calculateEqpt_tankerIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_eqpt_tankerValidator.validate(model_internal::_instance.eqpt_tanker)
        model_internal::_eqpt_tankerIsValid_der = (valRes.results == null);
        model_internal::_eqpt_tankerIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::eqpt_tankerValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::eqpt_tankerValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_tankerValidationFailureMessages():Array
    {
        if (model_internal::_eqpt_tankerValidationFailureMessages == null)
            model_internal::calculateEqpt_tankerIsValid();

        return _eqpt_tankerValidationFailureMessages;
    }

    model_internal function set eqpt_tankerValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_eqpt_tankerValidationFailureMessages;

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
            model_internal::_eqpt_tankerValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_tankerValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get eqpt_lockStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get eqpt_lockValidator() : StyleValidator
    {
        return model_internal::_eqpt_lockValidator;
    }

    model_internal function set _eqpt_lockIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_eqpt_lockIsValid;         
        if (oldValue !== value)
        {
            model_internal::_eqpt_lockIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_lockIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_lockIsValid():Boolean
    {
        if (!model_internal::_eqpt_lockIsValidCacheInitialized)
        {
            model_internal::calculateEqpt_lockIsValid();
        }

        return model_internal::_eqpt_lockIsValid;
    }

    model_internal function calculateEqpt_lockIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_eqpt_lockValidator.validate(model_internal::_instance.eqpt_lock)
        model_internal::_eqpt_lockIsValid_der = (valRes.results == null);
        model_internal::_eqpt_lockIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::eqpt_lockValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::eqpt_lockValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_lockValidationFailureMessages():Array
    {
        if (model_internal::_eqpt_lockValidationFailureMessages == null)
            model_internal::calculateEqpt_lockIsValid();

        return _eqpt_lockValidationFailureMessages;
    }

    model_internal function set eqpt_lockValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_eqpt_lockValidationFailureMessages;

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
            model_internal::_eqpt_lockValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_lockValidationFailureMessages", oldValue, value));
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
    public function get eqpt_empty_kgStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get eqpt_empty_kgValidator() : StyleValidator
    {
        return model_internal::_eqpt_empty_kgValidator;
    }

    model_internal function set _eqpt_empty_kgIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_eqpt_empty_kgIsValid;         
        if (oldValue !== value)
        {
            model_internal::_eqpt_empty_kgIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_empty_kgIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_empty_kgIsValid():Boolean
    {
        if (!model_internal::_eqpt_empty_kgIsValidCacheInitialized)
        {
            model_internal::calculateEqpt_empty_kgIsValid();
        }

        return model_internal::_eqpt_empty_kgIsValid;
    }

    model_internal function calculateEqpt_empty_kgIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_eqpt_empty_kgValidator.validate(model_internal::_instance.eqpt_empty_kg)
        model_internal::_eqpt_empty_kgIsValid_der = (valRes.results == null);
        model_internal::_eqpt_empty_kgIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::eqpt_empty_kgValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::eqpt_empty_kgValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_empty_kgValidationFailureMessages():Array
    {
        if (model_internal::_eqpt_empty_kgValidationFailureMessages == null)
            model_internal::calculateEqpt_empty_kgIsValid();

        return _eqpt_empty_kgValidationFailureMessages;
    }

    model_internal function set eqpt_empty_kgValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_eqpt_empty_kgValidationFailureMessages;

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
            model_internal::_eqpt_empty_kgValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_empty_kgValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get eqpt_area_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get eqpt_area_nameValidator() : StyleValidator
    {
        return model_internal::_eqpt_area_nameValidator;
    }

    model_internal function set _eqpt_area_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_eqpt_area_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_eqpt_area_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_area_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_area_nameIsValid():Boolean
    {
        if (!model_internal::_eqpt_area_nameIsValidCacheInitialized)
        {
            model_internal::calculateEqpt_area_nameIsValid();
        }

        return model_internal::_eqpt_area_nameIsValid;
    }

    model_internal function calculateEqpt_area_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_eqpt_area_nameValidator.validate(model_internal::_instance.eqpt_area_name)
        model_internal::_eqpt_area_nameIsValid_der = (valRes.results == null);
        model_internal::_eqpt_area_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::eqpt_area_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::eqpt_area_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_area_nameValidationFailureMessages():Array
    {
        if (model_internal::_eqpt_area_nameValidationFailureMessages == null)
            model_internal::calculateEqpt_area_nameIsValid();

        return _eqpt_area_nameValidationFailureMessages;
    }

    model_internal function set eqpt_area_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_eqpt_area_nameValidationFailureMessages;

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
            model_internal::_eqpt_area_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_area_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get eqpt_load_typeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get eqpt_load_typeValidator() : StyleValidator
    {
        return model_internal::_eqpt_load_typeValidator;
    }

    model_internal function set _eqpt_load_typeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_eqpt_load_typeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_eqpt_load_typeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_load_typeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_load_typeIsValid():Boolean
    {
        if (!model_internal::_eqpt_load_typeIsValidCacheInitialized)
        {
            model_internal::calculateEqpt_load_typeIsValid();
        }

        return model_internal::_eqpt_load_typeIsValid;
    }

    model_internal function calculateEqpt_load_typeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_eqpt_load_typeValidator.validate(model_internal::_instance.eqpt_load_type)
        model_internal::_eqpt_load_typeIsValid_der = (valRes.results == null);
        model_internal::_eqpt_load_typeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::eqpt_load_typeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::eqpt_load_typeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_load_typeValidationFailureMessages():Array
    {
        if (model_internal::_eqpt_load_typeValidationFailureMessages == null)
            model_internal::calculateEqpt_load_typeIsValid();

        return _eqpt_load_typeValidationFailureMessages;
    }

    model_internal function set eqpt_load_typeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_eqpt_load_typeValidationFailureMessages;

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
            model_internal::_eqpt_load_typeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_load_typeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get eqpt_owner_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get eqpt_owner_nameValidator() : StyleValidator
    {
        return model_internal::_eqpt_owner_nameValidator;
    }

    model_internal function set _eqpt_owner_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_eqpt_owner_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_eqpt_owner_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_owner_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_owner_nameIsValid():Boolean
    {
        if (!model_internal::_eqpt_owner_nameIsValidCacheInitialized)
        {
            model_internal::calculateEqpt_owner_nameIsValid();
        }

        return model_internal::_eqpt_owner_nameIsValid;
    }

    model_internal function calculateEqpt_owner_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_eqpt_owner_nameValidator.validate(model_internal::_instance.eqpt_owner_name)
        model_internal::_eqpt_owner_nameIsValid_der = (valRes.results == null);
        model_internal::_eqpt_owner_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::eqpt_owner_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::eqpt_owner_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_owner_nameValidationFailureMessages():Array
    {
        if (model_internal::_eqpt_owner_nameValidationFailureMessages == null)
            model_internal::calculateEqpt_owner_nameIsValid();

        return _eqpt_owner_nameValidationFailureMessages;
    }

    model_internal function set eqpt_owner_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_eqpt_owner_nameValidationFailureMessages;

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
            model_internal::_eqpt_owner_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_owner_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get eqpt_exp_d1_dmyStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get eqpt_exp_d1_dmyValidator() : StyleValidator
    {
        return model_internal::_eqpt_exp_d1_dmyValidator;
    }

    model_internal function set _eqpt_exp_d1_dmyIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_eqpt_exp_d1_dmyIsValid;         
        if (oldValue !== value)
        {
            model_internal::_eqpt_exp_d1_dmyIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_exp_d1_dmyIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_exp_d1_dmyIsValid():Boolean
    {
        if (!model_internal::_eqpt_exp_d1_dmyIsValidCacheInitialized)
        {
            model_internal::calculateEqpt_exp_d1_dmyIsValid();
        }

        return model_internal::_eqpt_exp_d1_dmyIsValid;
    }

    model_internal function calculateEqpt_exp_d1_dmyIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_eqpt_exp_d1_dmyValidator.validate(model_internal::_instance.eqpt_exp_d1_dmy)
        model_internal::_eqpt_exp_d1_dmyIsValid_der = (valRes.results == null);
        model_internal::_eqpt_exp_d1_dmyIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::eqpt_exp_d1_dmyValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::eqpt_exp_d1_dmyValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_exp_d1_dmyValidationFailureMessages():Array
    {
        if (model_internal::_eqpt_exp_d1_dmyValidationFailureMessages == null)
            model_internal::calculateEqpt_exp_d1_dmyIsValid();

        return _eqpt_exp_d1_dmyValidationFailureMessages;
    }

    model_internal function set eqpt_exp_d1_dmyValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_eqpt_exp_d1_dmyValidationFailureMessages;

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
            model_internal::_eqpt_exp_d1_dmyValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_exp_d1_dmyValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get eqpt_exp_d3_dmyStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get eqpt_exp_d3_dmyValidator() : StyleValidator
    {
        return model_internal::_eqpt_exp_d3_dmyValidator;
    }

    model_internal function set _eqpt_exp_d3_dmyIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_eqpt_exp_d3_dmyIsValid;         
        if (oldValue !== value)
        {
            model_internal::_eqpt_exp_d3_dmyIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_exp_d3_dmyIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_exp_d3_dmyIsValid():Boolean
    {
        if (!model_internal::_eqpt_exp_d3_dmyIsValidCacheInitialized)
        {
            model_internal::calculateEqpt_exp_d3_dmyIsValid();
        }

        return model_internal::_eqpt_exp_d3_dmyIsValid;
    }

    model_internal function calculateEqpt_exp_d3_dmyIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_eqpt_exp_d3_dmyValidator.validate(model_internal::_instance.eqpt_exp_d3_dmy)
        model_internal::_eqpt_exp_d3_dmyIsValid_der = (valRes.results == null);
        model_internal::_eqpt_exp_d3_dmyIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::eqpt_exp_d3_dmyValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::eqpt_exp_d3_dmyValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_exp_d3_dmyValidationFailureMessages():Array
    {
        if (model_internal::_eqpt_exp_d3_dmyValidationFailureMessages == null)
            model_internal::calculateEqpt_exp_d3_dmyIsValid();

        return _eqpt_exp_d3_dmyValidationFailureMessages;
    }

    model_internal function set eqpt_exp_d3_dmyValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_eqpt_exp_d3_dmyValidationFailureMessages;

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
            model_internal::_eqpt_exp_d3_dmyValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_exp_d3_dmyValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get eqpt_commentsStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get eqpt_commentsValidator() : StyleValidator
    {
        return model_internal::_eqpt_commentsValidator;
    }

    model_internal function set _eqpt_commentsIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_eqpt_commentsIsValid;         
        if (oldValue !== value)
        {
            model_internal::_eqpt_commentsIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_commentsIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_commentsIsValid():Boolean
    {
        if (!model_internal::_eqpt_commentsIsValidCacheInitialized)
        {
            model_internal::calculateEqpt_commentsIsValid();
        }

        return model_internal::_eqpt_commentsIsValid;
    }

    model_internal function calculateEqpt_commentsIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_eqpt_commentsValidator.validate(model_internal::_instance.eqpt_comments)
        model_internal::_eqpt_commentsIsValid_der = (valRes.results == null);
        model_internal::_eqpt_commentsIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::eqpt_commentsValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::eqpt_commentsValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_commentsValidationFailureMessages():Array
    {
        if (model_internal::_eqpt_commentsValidationFailureMessages == null)
            model_internal::calculateEqpt_commentsIsValid();

        return _eqpt_commentsValidationFailureMessages;
    }

    model_internal function set eqpt_commentsValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_eqpt_commentsValidationFailureMessages;

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
            model_internal::_eqpt_commentsValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_commentsValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get eqpt_exp_d2_dmyStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get eqpt_exp_d2_dmyValidator() : StyleValidator
    {
        return model_internal::_eqpt_exp_d2_dmyValidator;
    }

    model_internal function set _eqpt_exp_d2_dmyIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_eqpt_exp_d2_dmyIsValid;         
        if (oldValue !== value)
        {
            model_internal::_eqpt_exp_d2_dmyIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_exp_d2_dmyIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_exp_d2_dmyIsValid():Boolean
    {
        if (!model_internal::_eqpt_exp_d2_dmyIsValidCacheInitialized)
        {
            model_internal::calculateEqpt_exp_d2_dmyIsValid();
        }

        return model_internal::_eqpt_exp_d2_dmyIsValid;
    }

    model_internal function calculateEqpt_exp_d2_dmyIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_eqpt_exp_d2_dmyValidator.validate(model_internal::_instance.eqpt_exp_d2_dmy)
        model_internal::_eqpt_exp_d2_dmyIsValid_der = (valRes.results == null);
        model_internal::_eqpt_exp_d2_dmyIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::eqpt_exp_d2_dmyValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::eqpt_exp_d2_dmyValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_exp_d2_dmyValidationFailureMessages():Array
    {
        if (model_internal::_eqpt_exp_d2_dmyValidationFailureMessages == null)
            model_internal::calculateEqpt_exp_d2_dmyIsValid();

        return _eqpt_exp_d2_dmyValidationFailureMessages;
    }

    model_internal function set eqpt_exp_d2_dmyValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_eqpt_exp_d2_dmyValidationFailureMessages;

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
            model_internal::_eqpt_exp_d2_dmyValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_exp_d2_dmyValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get eqp_must_tare_inStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get eqp_must_tare_inValidator() : StyleValidator
    {
        return model_internal::_eqp_must_tare_inValidator;
    }

    model_internal function set _eqp_must_tare_inIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_eqp_must_tare_inIsValid;         
        if (oldValue !== value)
        {
            model_internal::_eqp_must_tare_inIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqp_must_tare_inIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get eqp_must_tare_inIsValid():Boolean
    {
        if (!model_internal::_eqp_must_tare_inIsValidCacheInitialized)
        {
            model_internal::calculateEqp_must_tare_inIsValid();
        }

        return model_internal::_eqp_must_tare_inIsValid;
    }

    model_internal function calculateEqp_must_tare_inIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_eqp_must_tare_inValidator.validate(model_internal::_instance.eqp_must_tare_in)
        model_internal::_eqp_must_tare_inIsValid_der = (valRes.results == null);
        model_internal::_eqp_must_tare_inIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::eqp_must_tare_inValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::eqp_must_tare_inValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get eqp_must_tare_inValidationFailureMessages():Array
    {
        if (model_internal::_eqp_must_tare_inValidationFailureMessages == null)
            model_internal::calculateEqp_must_tare_inIsValid();

        return _eqp_must_tare_inValidationFailureMessages;
    }

    model_internal function set eqp_must_tare_inValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_eqp_must_tare_inValidationFailureMessages;

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
            model_internal::_eqp_must_tare_inValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqp_must_tare_inValidationFailureMessages", oldValue, value));
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

    [Bindable(event="propertyChange")]   
    public function get eqpt_load_type_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get eqpt_load_type_nameValidator() : StyleValidator
    {
        return model_internal::_eqpt_load_type_nameValidator;
    }

    model_internal function set _eqpt_load_type_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_eqpt_load_type_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_eqpt_load_type_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_load_type_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_load_type_nameIsValid():Boolean
    {
        if (!model_internal::_eqpt_load_type_nameIsValidCacheInitialized)
        {
            model_internal::calculateEqpt_load_type_nameIsValid();
        }

        return model_internal::_eqpt_load_type_nameIsValid;
    }

    model_internal function calculateEqpt_load_type_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_eqpt_load_type_nameValidator.validate(model_internal::_instance.eqpt_load_type_name)
        model_internal::_eqpt_load_type_nameIsValid_der = (valRes.results == null);
        model_internal::_eqpt_load_type_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::eqpt_load_type_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::eqpt_load_type_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_load_type_nameValidationFailureMessages():Array
    {
        if (model_internal::_eqpt_load_type_nameValidationFailureMessages == null)
            model_internal::calculateEqpt_load_type_nameIsValid();

        return _eqpt_load_type_nameValidationFailureMessages;
    }

    model_internal function set eqpt_load_type_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_eqpt_load_type_nameValidationFailureMessages;

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
            model_internal::_eqpt_load_type_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_load_type_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get etyp_categoryStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get etyp_categoryValidator() : StyleValidator
    {
        return model_internal::_etyp_categoryValidator;
    }

    model_internal function set _etyp_categoryIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_etyp_categoryIsValid;         
        if (oldValue !== value)
        {
            model_internal::_etyp_categoryIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_categoryIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get etyp_categoryIsValid():Boolean
    {
        if (!model_internal::_etyp_categoryIsValidCacheInitialized)
        {
            model_internal::calculateEtyp_categoryIsValid();
        }

        return model_internal::_etyp_categoryIsValid;
    }

    model_internal function calculateEtyp_categoryIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_etyp_categoryValidator.validate(model_internal::_instance.etyp_category)
        model_internal::_etyp_categoryIsValid_der = (valRes.results == null);
        model_internal::_etyp_categoryIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::etyp_categoryValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::etyp_categoryValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get etyp_categoryValidationFailureMessages():Array
    {
        if (model_internal::_etyp_categoryValidationFailureMessages == null)
            model_internal::calculateEtyp_categoryIsValid();

        return _etyp_categoryValidationFailureMessages;
    }

    model_internal function set etyp_categoryValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_etyp_categoryValidationFailureMessages;

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
            model_internal::_etyp_categoryValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_categoryValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get eqpt_titleStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get eqpt_titleValidator() : StyleValidator
    {
        return model_internal::_eqpt_titleValidator;
    }

    model_internal function set _eqpt_titleIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_eqpt_titleIsValid;         
        if (oldValue !== value)
        {
            model_internal::_eqpt_titleIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_titleIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_titleIsValid():Boolean
    {
        if (!model_internal::_eqpt_titleIsValidCacheInitialized)
        {
            model_internal::calculateEqpt_titleIsValid();
        }

        return model_internal::_eqpt_titleIsValid;
    }

    model_internal function calculateEqpt_titleIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_eqpt_titleValidator.validate(model_internal::_instance.eqpt_title)
        model_internal::_eqpt_titleIsValid_der = (valRes.results == null);
        model_internal::_eqpt_titleIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::eqpt_titleValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::eqpt_titleValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_titleValidationFailureMessages():Array
    {
        if (model_internal::_eqpt_titleValidationFailureMessages == null)
            model_internal::calculateEqpt_titleIsValid();

        return _eqpt_titleValidationFailureMessages;
    }

    model_internal function set eqpt_titleValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_eqpt_titleValidationFailureMessages;

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
            model_internal::_eqpt_titleValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_titleValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get compositionStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get compositionValidator() : StyleValidator
    {
        return model_internal::_compositionValidator;
    }

    model_internal function set _compositionIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_compositionIsValid;         
        if (oldValue !== value)
        {
            model_internal::_compositionIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "compositionIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get compositionIsValid():Boolean
    {
        if (!model_internal::_compositionIsValidCacheInitialized)
        {
            model_internal::calculateCompositionIsValid();
        }

        return model_internal::_compositionIsValid;
    }

    model_internal function calculateCompositionIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_compositionValidator.validate(model_internal::_instance.composition)
        model_internal::_compositionIsValid_der = (valRes.results == null);
        model_internal::_compositionIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::compositionValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::compositionValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get compositionValidationFailureMessages():Array
    {
        if (model_internal::_compositionValidationFailureMessages == null)
            model_internal::calculateCompositionIsValid();

        return _compositionValidationFailureMessages;
    }

    model_internal function set compositionValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_compositionValidationFailureMessages;

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
            model_internal::_compositionValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "compositionValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get eqpt_etp_titleStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get eqpt_etp_titleValidator() : StyleValidator
    {
        return model_internal::_eqpt_etp_titleValidator;
    }

    model_internal function set _eqpt_etp_titleIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_eqpt_etp_titleIsValid;         
        if (oldValue !== value)
        {
            model_internal::_eqpt_etp_titleIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_etp_titleIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_etp_titleIsValid():Boolean
    {
        if (!model_internal::_eqpt_etp_titleIsValidCacheInitialized)
        {
            model_internal::calculateEqpt_etp_titleIsValid();
        }

        return model_internal::_eqpt_etp_titleIsValid;
    }

    model_internal function calculateEqpt_etp_titleIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_eqpt_etp_titleValidator.validate(model_internal::_instance.eqpt_etp_title)
        model_internal::_eqpt_etp_titleIsValid_der = (valRes.results == null);
        model_internal::_eqpt_etp_titleIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::eqpt_etp_titleValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::eqpt_etp_titleValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_etp_titleValidationFailureMessages():Array
    {
        if (model_internal::_eqpt_etp_titleValidationFailureMessages == null)
            model_internal::calculateEqpt_etp_titleIsValid();

        return _eqpt_etp_titleValidationFailureMessages;
    }

    model_internal function set eqpt_etp_titleValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_eqpt_etp_titleValidationFailureMessages;

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
            model_internal::_eqpt_etp_titleValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_etp_titleValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get eqpt_areaStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get eqpt_areaValidator() : StyleValidator
    {
        return model_internal::_eqpt_areaValidator;
    }

    model_internal function set _eqpt_areaIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_eqpt_areaIsValid;         
        if (oldValue !== value)
        {
            model_internal::_eqpt_areaIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_areaIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_areaIsValid():Boolean
    {
        if (!model_internal::_eqpt_areaIsValidCacheInitialized)
        {
            model_internal::calculateEqpt_areaIsValid();
        }

        return model_internal::_eqpt_areaIsValid;
    }

    model_internal function calculateEqpt_areaIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_eqpt_areaValidator.validate(model_internal::_instance.eqpt_area)
        model_internal::_eqpt_areaIsValid_der = (valRes.results == null);
        model_internal::_eqpt_areaIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::eqpt_areaValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::eqpt_areaValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_areaValidationFailureMessages():Array
    {
        if (model_internal::_eqpt_areaValidationFailureMessages == null)
            model_internal::calculateEqpt_areaIsValid();

        return _eqpt_areaValidationFailureMessages;
    }

    model_internal function set eqpt_areaValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_eqpt_areaValidationFailureMessages;

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
            model_internal::_eqpt_areaValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_areaValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get eqpt_max_grossStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get eqpt_max_grossValidator() : StyleValidator
    {
        return model_internal::_eqpt_max_grossValidator;
    }

    model_internal function set _eqpt_max_grossIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_eqpt_max_grossIsValid;         
        if (oldValue !== value)
        {
            model_internal::_eqpt_max_grossIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_max_grossIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_max_grossIsValid():Boolean
    {
        if (!model_internal::_eqpt_max_grossIsValidCacheInitialized)
        {
            model_internal::calculateEqpt_max_grossIsValid();
        }

        return model_internal::_eqpt_max_grossIsValid;
    }

    model_internal function calculateEqpt_max_grossIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_eqpt_max_grossValidator.validate(model_internal::_instance.eqpt_max_gross)
        model_internal::_eqpt_max_grossIsValid_der = (valRes.results == null);
        model_internal::_eqpt_max_grossIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::eqpt_max_grossValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::eqpt_max_grossValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_max_grossValidationFailureMessages():Array
    {
        if (model_internal::_eqpt_max_grossValidationFailureMessages == null)
            model_internal::calculateEqpt_max_grossIsValid();

        return _eqpt_max_grossValidationFailureMessages;
    }

    model_internal function set eqpt_max_grossValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_eqpt_max_grossValidationFailureMessages;

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
            model_internal::_eqpt_max_grossValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_max_grossValidationFailureMessages", oldValue, value));
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
            case("eqpt_owner"):
            {
                return eqpt_ownerValidationFailureMessages;
            }
            case("eqpt_etp"):
            {
                return eqpt_etpValidationFailureMessages;
            }
            case("rn"):
            {
                return rnValidationFailureMessages;
            }
            case("eqpt_tanker"):
            {
                return eqpt_tankerValidationFailureMessages;
            }
            case("eqpt_lock"):
            {
                return eqpt_lockValidationFailureMessages;
            }
            case("eqpt_code"):
            {
                return eqpt_codeValidationFailureMessages;
            }
            case("eqpt_empty_kg"):
            {
                return eqpt_empty_kgValidationFailureMessages;
            }
            case("eqpt_area_name"):
            {
                return eqpt_area_nameValidationFailureMessages;
            }
            case("eqpt_load_type"):
            {
                return eqpt_load_typeValidationFailureMessages;
            }
            case("eqpt_owner_name"):
            {
                return eqpt_owner_nameValidationFailureMessages;
            }
            case("eqpt_exp_d1_dmy"):
            {
                return eqpt_exp_d1_dmyValidationFailureMessages;
            }
            case("eqpt_exp_d3_dmy"):
            {
                return eqpt_exp_d3_dmyValidationFailureMessages;
            }
            case("eqpt_comments"):
            {
                return eqpt_commentsValidationFailureMessages;
            }
            case("eqpt_exp_d2_dmy"):
            {
                return eqpt_exp_d2_dmyValidationFailureMessages;
            }
            case("eqp_must_tare_in"):
            {
                return eqp_must_tare_inValidationFailureMessages;
            }
            case("eqpt_id"):
            {
                return eqpt_idValidationFailureMessages;
            }
            case("eqpt_load_type_name"):
            {
                return eqpt_load_type_nameValidationFailureMessages;
            }
            case("etyp_category"):
            {
                return etyp_categoryValidationFailureMessages;
            }
            case("eqpt_title"):
            {
                return eqpt_titleValidationFailureMessages;
            }
            case("composition"):
            {
                return compositionValidationFailureMessages;
            }
            case("eqpt_etp_title"):
            {
                return eqpt_etp_titleValidationFailureMessages;
            }
            case("eqpt_area"):
            {
                return eqpt_areaValidationFailureMessages;
            }
            case("eqpt_max_gross"):
            {
                return eqpt_max_grossValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
