
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
internal class _CompositionEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("etyp_isrigid", "etyp_schedul", "equip_isleaf", "eqc_count", "eqc_sub_item_path", "sub_item_etyp_isrigid", "sub_item_sched_type", "etyp_category", "eqc_count_rt", "etyp_title_path", "ecnct_etyp", "eqc_sub_item_title", "etyp_is_drumfill", "etyp_n_items", "eqc_sub_item", "idx", "etyp_id_path", "eqc_sub_item_rt", "etyp_title", "etyp_class", "etyp_title_rt", "etyp_id", "cmpt_units", "etyp_id_rt", "lvl", "eqc_path", "cmptnu", "compartments", "etyp_max_gross");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("etyp_isrigid", "etyp_schedul", "equip_isleaf", "eqc_count", "eqc_sub_item_path", "sub_item_etyp_isrigid", "sub_item_sched_type", "etyp_category", "eqc_count_rt", "etyp_title_path", "ecnct_etyp", "eqc_sub_item_title", "etyp_is_drumfill", "etyp_n_items", "eqc_sub_item", "idx", "etyp_id_path", "eqc_sub_item_rt", "etyp_title", "etyp_class", "etyp_title_rt", "etyp_id", "cmpt_units", "etyp_id_rt", "lvl", "eqc_path", "cmptnu", "compartments", "etyp_max_gross");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("etyp_isrigid", "etyp_schedul", "equip_isleaf", "eqc_count", "eqc_sub_item_path", "sub_item_etyp_isrigid", "sub_item_sched_type", "etyp_category", "eqc_count_rt", "etyp_title_path", "ecnct_etyp", "eqc_sub_item_title", "etyp_is_drumfill", "etyp_n_items", "eqc_sub_item", "idx", "etyp_id_path", "eqc_sub_item_rt", "etyp_title", "etyp_class", "etyp_title_rt", "etyp_id", "cmpt_units", "etyp_id_rt", "lvl", "eqc_path", "cmptnu", "compartments", "etyp_max_gross");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("etyp_isrigid", "etyp_schedul", "equip_isleaf", "eqc_count", "eqc_sub_item_path", "sub_item_etyp_isrigid", "sub_item_sched_type", "etyp_category", "eqc_count_rt", "etyp_title_path", "ecnct_etyp", "eqc_sub_item_title", "etyp_is_drumfill", "etyp_n_items", "eqc_sub_item", "idx", "etyp_id_path", "eqc_sub_item_rt", "etyp_title", "etyp_class", "etyp_title_rt", "etyp_id", "cmpt_units", "etyp_id_rt", "lvl", "eqc_path", "cmptnu", "compartments", "etyp_max_gross");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("etyp_isrigid", "etyp_schedul", "equip_isleaf", "eqc_count", "eqc_sub_item_path", "sub_item_etyp_isrigid", "sub_item_sched_type", "etyp_category", "eqc_count_rt", "etyp_title_path", "ecnct_etyp", "eqc_sub_item_title", "etyp_is_drumfill", "etyp_n_items", "eqc_sub_item", "idx", "etyp_id_path", "eqc_sub_item_rt", "etyp_title", "etyp_class", "etyp_title_rt", "etyp_id", "cmpt_units", "etyp_id_rt", "lvl", "eqc_path", "cmptnu", "compartments", "etyp_max_gross");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "Composition";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _etyp_isrigidIsValid:Boolean;
    model_internal var _etyp_isrigidValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _etyp_isrigidIsValidCacheInitialized:Boolean = false;
    model_internal var _etyp_isrigidValidationFailureMessages:Array;
    
    model_internal var _etyp_schedulIsValid:Boolean;
    model_internal var _etyp_schedulValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _etyp_schedulIsValidCacheInitialized:Boolean = false;
    model_internal var _etyp_schedulValidationFailureMessages:Array;
    
    model_internal var _equip_isleafIsValid:Boolean;
    model_internal var _equip_isleafValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _equip_isleafIsValidCacheInitialized:Boolean = false;
    model_internal var _equip_isleafValidationFailureMessages:Array;
    
    model_internal var _eqc_sub_item_pathIsValid:Boolean;
    model_internal var _eqc_sub_item_pathValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _eqc_sub_item_pathIsValidCacheInitialized:Boolean = false;
    model_internal var _eqc_sub_item_pathValidationFailureMessages:Array;
    
    model_internal var _sub_item_etyp_isrigidIsValid:Boolean;
    model_internal var _sub_item_etyp_isrigidValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _sub_item_etyp_isrigidIsValidCacheInitialized:Boolean = false;
    model_internal var _sub_item_etyp_isrigidValidationFailureMessages:Array;
    
    model_internal var _sub_item_sched_typeIsValid:Boolean;
    model_internal var _sub_item_sched_typeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _sub_item_sched_typeIsValidCacheInitialized:Boolean = false;
    model_internal var _sub_item_sched_typeValidationFailureMessages:Array;
    
    model_internal var _etyp_categoryIsValid:Boolean;
    model_internal var _etyp_categoryValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _etyp_categoryIsValidCacheInitialized:Boolean = false;
    model_internal var _etyp_categoryValidationFailureMessages:Array;
    
    model_internal var _etyp_title_pathIsValid:Boolean;
    model_internal var _etyp_title_pathValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _etyp_title_pathIsValidCacheInitialized:Boolean = false;
    model_internal var _etyp_title_pathValidationFailureMessages:Array;
    
    model_internal var _ecnct_etypIsValid:Boolean;
    model_internal var _ecnct_etypValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _ecnct_etypIsValidCacheInitialized:Boolean = false;
    model_internal var _ecnct_etypValidationFailureMessages:Array;
    
    model_internal var _eqc_sub_item_titleIsValid:Boolean;
    model_internal var _eqc_sub_item_titleValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _eqc_sub_item_titleIsValidCacheInitialized:Boolean = false;
    model_internal var _eqc_sub_item_titleValidationFailureMessages:Array;
    
    model_internal var _etyp_is_drumfillIsValid:Boolean;
    model_internal var _etyp_is_drumfillValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _etyp_is_drumfillIsValidCacheInitialized:Boolean = false;
    model_internal var _etyp_is_drumfillValidationFailureMessages:Array;
    
    model_internal var _etyp_n_itemsIsValid:Boolean;
    model_internal var _etyp_n_itemsValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _etyp_n_itemsIsValidCacheInitialized:Boolean = false;
    model_internal var _etyp_n_itemsValidationFailureMessages:Array;
    
    model_internal var _eqc_sub_itemIsValid:Boolean;
    model_internal var _eqc_sub_itemValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _eqc_sub_itemIsValidCacheInitialized:Boolean = false;
    model_internal var _eqc_sub_itemValidationFailureMessages:Array;
    
    model_internal var _idxIsValid:Boolean;
    model_internal var _idxValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _idxIsValidCacheInitialized:Boolean = false;
    model_internal var _idxValidationFailureMessages:Array;
    
    model_internal var _etyp_id_pathIsValid:Boolean;
    model_internal var _etyp_id_pathValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _etyp_id_pathIsValidCacheInitialized:Boolean = false;
    model_internal var _etyp_id_pathValidationFailureMessages:Array;
    
    model_internal var _eqc_sub_item_rtIsValid:Boolean;
    model_internal var _eqc_sub_item_rtValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _eqc_sub_item_rtIsValidCacheInitialized:Boolean = false;
    model_internal var _eqc_sub_item_rtValidationFailureMessages:Array;
    
    model_internal var _etyp_titleIsValid:Boolean;
    model_internal var _etyp_titleValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _etyp_titleIsValidCacheInitialized:Boolean = false;
    model_internal var _etyp_titleValidationFailureMessages:Array;
    
    model_internal var _etyp_classIsValid:Boolean;
    model_internal var _etyp_classValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _etyp_classIsValidCacheInitialized:Boolean = false;
    model_internal var _etyp_classValidationFailureMessages:Array;
    
    model_internal var _etyp_title_rtIsValid:Boolean;
    model_internal var _etyp_title_rtValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _etyp_title_rtIsValidCacheInitialized:Boolean = false;
    model_internal var _etyp_title_rtValidationFailureMessages:Array;
    
    model_internal var _etyp_idIsValid:Boolean;
    model_internal var _etyp_idValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _etyp_idIsValidCacheInitialized:Boolean = false;
    model_internal var _etyp_idValidationFailureMessages:Array;
    
    model_internal var _cmpt_unitsIsValid:Boolean;
    model_internal var _cmpt_unitsValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpt_unitsIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpt_unitsValidationFailureMessages:Array;
    
    model_internal var _etyp_id_rtIsValid:Boolean;
    model_internal var _etyp_id_rtValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _etyp_id_rtIsValidCacheInitialized:Boolean = false;
    model_internal var _etyp_id_rtValidationFailureMessages:Array;
    
    model_internal var _lvlIsValid:Boolean;
    model_internal var _lvlValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _lvlIsValidCacheInitialized:Boolean = false;
    model_internal var _lvlValidationFailureMessages:Array;
    
    model_internal var _eqc_pathIsValid:Boolean;
    model_internal var _eqc_pathValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _eqc_pathIsValidCacheInitialized:Boolean = false;
    model_internal var _eqc_pathValidationFailureMessages:Array;
    
    model_internal var _cmptnuIsValid:Boolean;
    model_internal var _cmptnuValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmptnuIsValidCacheInitialized:Boolean = false;
    model_internal var _cmptnuValidationFailureMessages:Array;
    
    model_internal var _compartmentsIsValid:Boolean;
    model_internal var _compartmentsValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _compartmentsIsValidCacheInitialized:Boolean = false;
    model_internal var _compartmentsValidationFailureMessages:Array;
    
    model_internal var _etyp_max_grossIsValid:Boolean;
    model_internal var _etyp_max_grossValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _etyp_max_grossIsValidCacheInitialized:Boolean = false;
    model_internal var _etyp_max_grossValidationFailureMessages:Array;

    model_internal var _instance:_Super_Composition;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _CompositionEntityMetadata(value : _Super_Composition)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["etyp_isrigid"] = new Array();
            model_internal::dependentsOnMap["etyp_schedul"] = new Array();
            model_internal::dependentsOnMap["equip_isleaf"] = new Array();
            model_internal::dependentsOnMap["eqc_count"] = new Array();
            model_internal::dependentsOnMap["eqc_sub_item_path"] = new Array();
            model_internal::dependentsOnMap["sub_item_etyp_isrigid"] = new Array();
            model_internal::dependentsOnMap["sub_item_sched_type"] = new Array();
            model_internal::dependentsOnMap["etyp_category"] = new Array();
            model_internal::dependentsOnMap["eqc_count_rt"] = new Array();
            model_internal::dependentsOnMap["etyp_title_path"] = new Array();
            model_internal::dependentsOnMap["ecnct_etyp"] = new Array();
            model_internal::dependentsOnMap["eqc_sub_item_title"] = new Array();
            model_internal::dependentsOnMap["etyp_is_drumfill"] = new Array();
            model_internal::dependentsOnMap["etyp_n_items"] = new Array();
            model_internal::dependentsOnMap["eqc_sub_item"] = new Array();
            model_internal::dependentsOnMap["idx"] = new Array();
            model_internal::dependentsOnMap["etyp_id_path"] = new Array();
            model_internal::dependentsOnMap["eqc_sub_item_rt"] = new Array();
            model_internal::dependentsOnMap["etyp_title"] = new Array();
            model_internal::dependentsOnMap["etyp_class"] = new Array();
            model_internal::dependentsOnMap["etyp_title_rt"] = new Array();
            model_internal::dependentsOnMap["etyp_id"] = new Array();
            model_internal::dependentsOnMap["cmpt_units"] = new Array();
            model_internal::dependentsOnMap["etyp_id_rt"] = new Array();
            model_internal::dependentsOnMap["lvl"] = new Array();
            model_internal::dependentsOnMap["eqc_path"] = new Array();
            model_internal::dependentsOnMap["cmptnu"] = new Array();
            model_internal::dependentsOnMap["compartments"] = new Array();
            model_internal::dependentsOnMap["etyp_max_gross"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["etyp_isrigid"] = "String";
        model_internal::propertyTypeMap["etyp_schedul"] = "String";
        model_internal::propertyTypeMap["equip_isleaf"] = "String";
        model_internal::propertyTypeMap["eqc_count"] = "int";
        model_internal::propertyTypeMap["eqc_sub_item_path"] = "String";
        model_internal::propertyTypeMap["sub_item_etyp_isrigid"] = "String";
        model_internal::propertyTypeMap["sub_item_sched_type"] = "String";
        model_internal::propertyTypeMap["etyp_category"] = "String";
        model_internal::propertyTypeMap["eqc_count_rt"] = "int";
        model_internal::propertyTypeMap["etyp_title_path"] = "String";
        model_internal::propertyTypeMap["ecnct_etyp"] = "String";
        model_internal::propertyTypeMap["eqc_sub_item_title"] = "Object";
        model_internal::propertyTypeMap["etyp_is_drumfill"] = "String";
        model_internal::propertyTypeMap["etyp_n_items"] = "String";
        model_internal::propertyTypeMap["eqc_sub_item"] = "Object";
        model_internal::propertyTypeMap["idx"] = "String";
        model_internal::propertyTypeMap["etyp_id_path"] = "String";
        model_internal::propertyTypeMap["eqc_sub_item_rt"] = "Object";
        model_internal::propertyTypeMap["etyp_title"] = "String";
        model_internal::propertyTypeMap["etyp_class"] = "String";
        model_internal::propertyTypeMap["etyp_title_rt"] = "String";
        model_internal::propertyTypeMap["etyp_id"] = "String";
        model_internal::propertyTypeMap["cmpt_units"] = "Object";
        model_internal::propertyTypeMap["etyp_id_rt"] = "String";
        model_internal::propertyTypeMap["lvl"] = "String";
        model_internal::propertyTypeMap["eqc_path"] = "String";
        model_internal::propertyTypeMap["cmptnu"] = "String";
        model_internal::propertyTypeMap["compartments"] = "Object";
        model_internal::propertyTypeMap["etyp_max_gross"] = "String";

        model_internal::_instance = value;
        model_internal::_etyp_isrigidValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEtyp_isrigid);
        model_internal::_etyp_isrigidValidator.required = true;
        model_internal::_etyp_isrigidValidator.requiredFieldError = "etyp_isrigid is required";
        //model_internal::_etyp_isrigidValidator.source = model_internal::_instance;
        //model_internal::_etyp_isrigidValidator.property = "etyp_isrigid";
        model_internal::_etyp_schedulValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEtyp_schedul);
        model_internal::_etyp_schedulValidator.required = true;
        model_internal::_etyp_schedulValidator.requiredFieldError = "etyp_schedul is required";
        //model_internal::_etyp_schedulValidator.source = model_internal::_instance;
        //model_internal::_etyp_schedulValidator.property = "etyp_schedul";
        model_internal::_equip_isleafValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEquip_isleaf);
        model_internal::_equip_isleafValidator.required = true;
        model_internal::_equip_isleafValidator.requiredFieldError = "equip_isleaf is required";
        //model_internal::_equip_isleafValidator.source = model_internal::_instance;
        //model_internal::_equip_isleafValidator.property = "equip_isleaf";
        model_internal::_eqc_sub_item_pathValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEqc_sub_item_path);
        model_internal::_eqc_sub_item_pathValidator.required = true;
        model_internal::_eqc_sub_item_pathValidator.requiredFieldError = "eqc_sub_item_path is required";
        //model_internal::_eqc_sub_item_pathValidator.source = model_internal::_instance;
        //model_internal::_eqc_sub_item_pathValidator.property = "eqc_sub_item_path";
        model_internal::_sub_item_etyp_isrigidValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSub_item_etyp_isrigid);
        model_internal::_sub_item_etyp_isrigidValidator.required = true;
        model_internal::_sub_item_etyp_isrigidValidator.requiredFieldError = "sub_item_etyp_isrigid is required";
        //model_internal::_sub_item_etyp_isrigidValidator.source = model_internal::_instance;
        //model_internal::_sub_item_etyp_isrigidValidator.property = "sub_item_etyp_isrigid";
        model_internal::_sub_item_sched_typeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSub_item_sched_type);
        model_internal::_sub_item_sched_typeValidator.required = true;
        model_internal::_sub_item_sched_typeValidator.requiredFieldError = "sub_item_sched_type is required";
        //model_internal::_sub_item_sched_typeValidator.source = model_internal::_instance;
        //model_internal::_sub_item_sched_typeValidator.property = "sub_item_sched_type";
        model_internal::_etyp_categoryValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEtyp_category);
        model_internal::_etyp_categoryValidator.required = true;
        model_internal::_etyp_categoryValidator.requiredFieldError = "etyp_category is required";
        //model_internal::_etyp_categoryValidator.source = model_internal::_instance;
        //model_internal::_etyp_categoryValidator.property = "etyp_category";
        model_internal::_etyp_title_pathValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEtyp_title_path);
        model_internal::_etyp_title_pathValidator.required = true;
        model_internal::_etyp_title_pathValidator.requiredFieldError = "etyp_title_path is required";
        //model_internal::_etyp_title_pathValidator.source = model_internal::_instance;
        //model_internal::_etyp_title_pathValidator.property = "etyp_title_path";
        model_internal::_ecnct_etypValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEcnct_etyp);
        model_internal::_ecnct_etypValidator.required = true;
        model_internal::_ecnct_etypValidator.requiredFieldError = "ecnct_etyp is required";
        //model_internal::_ecnct_etypValidator.source = model_internal::_instance;
        //model_internal::_ecnct_etypValidator.property = "ecnct_etyp";
        model_internal::_eqc_sub_item_titleValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEqc_sub_item_title);
        model_internal::_eqc_sub_item_titleValidator.required = true;
        model_internal::_eqc_sub_item_titleValidator.requiredFieldError = "eqc_sub_item_title is required";
        //model_internal::_eqc_sub_item_titleValidator.source = model_internal::_instance;
        //model_internal::_eqc_sub_item_titleValidator.property = "eqc_sub_item_title";
        model_internal::_etyp_is_drumfillValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEtyp_is_drumfill);
        model_internal::_etyp_is_drumfillValidator.required = true;
        model_internal::_etyp_is_drumfillValidator.requiredFieldError = "etyp_is_drumfill is required";
        //model_internal::_etyp_is_drumfillValidator.source = model_internal::_instance;
        //model_internal::_etyp_is_drumfillValidator.property = "etyp_is_drumfill";
        model_internal::_etyp_n_itemsValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEtyp_n_items);
        model_internal::_etyp_n_itemsValidator.required = true;
        model_internal::_etyp_n_itemsValidator.requiredFieldError = "etyp_n_items is required";
        //model_internal::_etyp_n_itemsValidator.source = model_internal::_instance;
        //model_internal::_etyp_n_itemsValidator.property = "etyp_n_items";
        model_internal::_eqc_sub_itemValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEqc_sub_item);
        model_internal::_eqc_sub_itemValidator.required = true;
        model_internal::_eqc_sub_itemValidator.requiredFieldError = "eqc_sub_item is required";
        //model_internal::_eqc_sub_itemValidator.source = model_internal::_instance;
        //model_internal::_eqc_sub_itemValidator.property = "eqc_sub_item";
        model_internal::_idxValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForIdx);
        model_internal::_idxValidator.required = true;
        model_internal::_idxValidator.requiredFieldError = "idx is required";
        //model_internal::_idxValidator.source = model_internal::_instance;
        //model_internal::_idxValidator.property = "idx";
        model_internal::_etyp_id_pathValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEtyp_id_path);
        model_internal::_etyp_id_pathValidator.required = true;
        model_internal::_etyp_id_pathValidator.requiredFieldError = "etyp_id_path is required";
        //model_internal::_etyp_id_pathValidator.source = model_internal::_instance;
        //model_internal::_etyp_id_pathValidator.property = "etyp_id_path";
        model_internal::_eqc_sub_item_rtValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEqc_sub_item_rt);
        model_internal::_eqc_sub_item_rtValidator.required = true;
        model_internal::_eqc_sub_item_rtValidator.requiredFieldError = "eqc_sub_item_rt is required";
        //model_internal::_eqc_sub_item_rtValidator.source = model_internal::_instance;
        //model_internal::_eqc_sub_item_rtValidator.property = "eqc_sub_item_rt";
        model_internal::_etyp_titleValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEtyp_title);
        model_internal::_etyp_titleValidator.required = true;
        model_internal::_etyp_titleValidator.requiredFieldError = "etyp_title is required";
        //model_internal::_etyp_titleValidator.source = model_internal::_instance;
        //model_internal::_etyp_titleValidator.property = "etyp_title";
        model_internal::_etyp_classValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEtyp_class);
        model_internal::_etyp_classValidator.required = true;
        model_internal::_etyp_classValidator.requiredFieldError = "etyp_class is required";
        //model_internal::_etyp_classValidator.source = model_internal::_instance;
        //model_internal::_etyp_classValidator.property = "etyp_class";
        model_internal::_etyp_title_rtValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEtyp_title_rt);
        model_internal::_etyp_title_rtValidator.required = true;
        model_internal::_etyp_title_rtValidator.requiredFieldError = "etyp_title_rt is required";
        //model_internal::_etyp_title_rtValidator.source = model_internal::_instance;
        //model_internal::_etyp_title_rtValidator.property = "etyp_title_rt";
        model_internal::_etyp_idValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEtyp_id);
        model_internal::_etyp_idValidator.required = true;
        model_internal::_etyp_idValidator.requiredFieldError = "etyp_id is required";
        //model_internal::_etyp_idValidator.source = model_internal::_instance;
        //model_internal::_etyp_idValidator.property = "etyp_id";
        model_internal::_cmpt_unitsValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpt_units);
        model_internal::_cmpt_unitsValidator.required = true;
        model_internal::_cmpt_unitsValidator.requiredFieldError = "cmpt_units is required";
        //model_internal::_cmpt_unitsValidator.source = model_internal::_instance;
        //model_internal::_cmpt_unitsValidator.property = "cmpt_units";
        model_internal::_etyp_id_rtValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEtyp_id_rt);
        model_internal::_etyp_id_rtValidator.required = true;
        model_internal::_etyp_id_rtValidator.requiredFieldError = "etyp_id_rt is required";
        //model_internal::_etyp_id_rtValidator.source = model_internal::_instance;
        //model_internal::_etyp_id_rtValidator.property = "etyp_id_rt";
        model_internal::_lvlValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForLvl);
        model_internal::_lvlValidator.required = true;
        model_internal::_lvlValidator.requiredFieldError = "lvl is required";
        //model_internal::_lvlValidator.source = model_internal::_instance;
        //model_internal::_lvlValidator.property = "lvl";
        model_internal::_eqc_pathValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEqc_path);
        model_internal::_eqc_pathValidator.required = true;
        model_internal::_eqc_pathValidator.requiredFieldError = "eqc_path is required";
        //model_internal::_eqc_pathValidator.source = model_internal::_instance;
        //model_internal::_eqc_pathValidator.property = "eqc_path";
        model_internal::_cmptnuValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmptnu);
        model_internal::_cmptnuValidator.required = true;
        model_internal::_cmptnuValidator.requiredFieldError = "cmptnu is required";
        //model_internal::_cmptnuValidator.source = model_internal::_instance;
        //model_internal::_cmptnuValidator.property = "cmptnu";
        model_internal::_compartmentsValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCompartments);
        model_internal::_compartmentsValidator.required = true;
        model_internal::_compartmentsValidator.requiredFieldError = "compartments is required";
        //model_internal::_compartmentsValidator.source = model_internal::_instance;
        //model_internal::_compartmentsValidator.property = "compartments";
        model_internal::_etyp_max_grossValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEtyp_max_gross);
        model_internal::_etyp_max_grossValidator.required = true;
        model_internal::_etyp_max_grossValidator.requiredFieldError = "etyp_max_gross is required";
        //model_internal::_etyp_max_grossValidator.source = model_internal::_instance;
        //model_internal::_etyp_max_grossValidator.property = "etyp_max_gross";
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
            throw new Error(propertyName + " is not a data property of entity Composition");
            
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
            throw new Error(propertyName + " is not a collection property of entity Composition");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of Composition");

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
            throw new Error(propertyName + " does not exist for entity Composition");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity Composition");
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
            throw new Error(propertyName + " does not exist for entity Composition");
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
    public function get isEtyp_isrigidAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEtyp_schedulAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEquip_isleafAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEqc_countAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEqc_sub_item_pathAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSub_item_etyp_isrigidAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSub_item_sched_typeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEtyp_categoryAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEqc_count_rtAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEtyp_title_pathAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEcnct_etypAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEqc_sub_item_titleAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEtyp_is_drumfillAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEtyp_n_itemsAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEqc_sub_itemAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isIdxAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEtyp_id_pathAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEqc_sub_item_rtAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEtyp_titleAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEtyp_classAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEtyp_title_rtAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEtyp_idAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpt_unitsAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEtyp_id_rtAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isLvlAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEqc_pathAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmptnuAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCompartmentsAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEtyp_max_grossAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnEtyp_isrigid():void
    {
        if (model_internal::_etyp_isrigidIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEtyp_isrigid = null;
            model_internal::calculateEtyp_isrigidIsValid();
        }
    }
    public function invalidateDependentOnEtyp_schedul():void
    {
        if (model_internal::_etyp_schedulIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEtyp_schedul = null;
            model_internal::calculateEtyp_schedulIsValid();
        }
    }
    public function invalidateDependentOnEquip_isleaf():void
    {
        if (model_internal::_equip_isleafIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEquip_isleaf = null;
            model_internal::calculateEquip_isleafIsValid();
        }
    }
    public function invalidateDependentOnEqc_sub_item_path():void
    {
        if (model_internal::_eqc_sub_item_pathIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEqc_sub_item_path = null;
            model_internal::calculateEqc_sub_item_pathIsValid();
        }
    }
    public function invalidateDependentOnSub_item_etyp_isrigid():void
    {
        if (model_internal::_sub_item_etyp_isrigidIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSub_item_etyp_isrigid = null;
            model_internal::calculateSub_item_etyp_isrigidIsValid();
        }
    }
    public function invalidateDependentOnSub_item_sched_type():void
    {
        if (model_internal::_sub_item_sched_typeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSub_item_sched_type = null;
            model_internal::calculateSub_item_sched_typeIsValid();
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
    public function invalidateDependentOnEtyp_title_path():void
    {
        if (model_internal::_etyp_title_pathIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEtyp_title_path = null;
            model_internal::calculateEtyp_title_pathIsValid();
        }
    }
    public function invalidateDependentOnEcnct_etyp():void
    {
        if (model_internal::_ecnct_etypIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEcnct_etyp = null;
            model_internal::calculateEcnct_etypIsValid();
        }
    }
    public function invalidateDependentOnEqc_sub_item_title():void
    {
        if (model_internal::_eqc_sub_item_titleIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEqc_sub_item_title = null;
            model_internal::calculateEqc_sub_item_titleIsValid();
        }
    }
    public function invalidateDependentOnEtyp_is_drumfill():void
    {
        if (model_internal::_etyp_is_drumfillIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEtyp_is_drumfill = null;
            model_internal::calculateEtyp_is_drumfillIsValid();
        }
    }
    public function invalidateDependentOnEtyp_n_items():void
    {
        if (model_internal::_etyp_n_itemsIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEtyp_n_items = null;
            model_internal::calculateEtyp_n_itemsIsValid();
        }
    }
    public function invalidateDependentOnEqc_sub_item():void
    {
        if (model_internal::_eqc_sub_itemIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEqc_sub_item = null;
            model_internal::calculateEqc_sub_itemIsValid();
        }
    }
    public function invalidateDependentOnIdx():void
    {
        if (model_internal::_idxIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfIdx = null;
            model_internal::calculateIdxIsValid();
        }
    }
    public function invalidateDependentOnEtyp_id_path():void
    {
        if (model_internal::_etyp_id_pathIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEtyp_id_path = null;
            model_internal::calculateEtyp_id_pathIsValid();
        }
    }
    public function invalidateDependentOnEqc_sub_item_rt():void
    {
        if (model_internal::_eqc_sub_item_rtIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEqc_sub_item_rt = null;
            model_internal::calculateEqc_sub_item_rtIsValid();
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
    public function invalidateDependentOnEtyp_class():void
    {
        if (model_internal::_etyp_classIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEtyp_class = null;
            model_internal::calculateEtyp_classIsValid();
        }
    }
    public function invalidateDependentOnEtyp_title_rt():void
    {
        if (model_internal::_etyp_title_rtIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEtyp_title_rt = null;
            model_internal::calculateEtyp_title_rtIsValid();
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
    public function invalidateDependentOnCmpt_units():void
    {
        if (model_internal::_cmpt_unitsIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpt_units = null;
            model_internal::calculateCmpt_unitsIsValid();
        }
    }
    public function invalidateDependentOnEtyp_id_rt():void
    {
        if (model_internal::_etyp_id_rtIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEtyp_id_rt = null;
            model_internal::calculateEtyp_id_rtIsValid();
        }
    }
    public function invalidateDependentOnLvl():void
    {
        if (model_internal::_lvlIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfLvl = null;
            model_internal::calculateLvlIsValid();
        }
    }
    public function invalidateDependentOnEqc_path():void
    {
        if (model_internal::_eqc_pathIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEqc_path = null;
            model_internal::calculateEqc_pathIsValid();
        }
    }
    public function invalidateDependentOnCmptnu():void
    {
        if (model_internal::_cmptnuIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmptnu = null;
            model_internal::calculateCmptnuIsValid();
        }
    }
    public function invalidateDependentOnCompartments():void
    {
        if (model_internal::_compartmentsIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCompartments = null;
            model_internal::calculateCompartmentsIsValid();
        }
    }
    public function invalidateDependentOnEtyp_max_gross():void
    {
        if (model_internal::_etyp_max_grossIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEtyp_max_gross = null;
            model_internal::calculateEtyp_max_grossIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get etyp_isrigidStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get etyp_isrigidValidator() : StyleValidator
    {
        return model_internal::_etyp_isrigidValidator;
    }

    model_internal function set _etyp_isrigidIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_etyp_isrigidIsValid;         
        if (oldValue !== value)
        {
            model_internal::_etyp_isrigidIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_isrigidIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get etyp_isrigidIsValid():Boolean
    {
        if (!model_internal::_etyp_isrigidIsValidCacheInitialized)
        {
            model_internal::calculateEtyp_isrigidIsValid();
        }

        return model_internal::_etyp_isrigidIsValid;
    }

    model_internal function calculateEtyp_isrigidIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_etyp_isrigidValidator.validate(model_internal::_instance.etyp_isrigid)
        model_internal::_etyp_isrigidIsValid_der = (valRes.results == null);
        model_internal::_etyp_isrigidIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::etyp_isrigidValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::etyp_isrigidValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get etyp_isrigidValidationFailureMessages():Array
    {
        if (model_internal::_etyp_isrigidValidationFailureMessages == null)
            model_internal::calculateEtyp_isrigidIsValid();

        return _etyp_isrigidValidationFailureMessages;
    }

    model_internal function set etyp_isrigidValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_etyp_isrigidValidationFailureMessages;

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
            model_internal::_etyp_isrigidValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_isrigidValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get etyp_schedulStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get etyp_schedulValidator() : StyleValidator
    {
        return model_internal::_etyp_schedulValidator;
    }

    model_internal function set _etyp_schedulIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_etyp_schedulIsValid;         
        if (oldValue !== value)
        {
            model_internal::_etyp_schedulIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_schedulIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get etyp_schedulIsValid():Boolean
    {
        if (!model_internal::_etyp_schedulIsValidCacheInitialized)
        {
            model_internal::calculateEtyp_schedulIsValid();
        }

        return model_internal::_etyp_schedulIsValid;
    }

    model_internal function calculateEtyp_schedulIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_etyp_schedulValidator.validate(model_internal::_instance.etyp_schedul)
        model_internal::_etyp_schedulIsValid_der = (valRes.results == null);
        model_internal::_etyp_schedulIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::etyp_schedulValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::etyp_schedulValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get etyp_schedulValidationFailureMessages():Array
    {
        if (model_internal::_etyp_schedulValidationFailureMessages == null)
            model_internal::calculateEtyp_schedulIsValid();

        return _etyp_schedulValidationFailureMessages;
    }

    model_internal function set etyp_schedulValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_etyp_schedulValidationFailureMessages;

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
            model_internal::_etyp_schedulValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_schedulValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get equip_isleafStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get equip_isleafValidator() : StyleValidator
    {
        return model_internal::_equip_isleafValidator;
    }

    model_internal function set _equip_isleafIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_equip_isleafIsValid;         
        if (oldValue !== value)
        {
            model_internal::_equip_isleafIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "equip_isleafIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get equip_isleafIsValid():Boolean
    {
        if (!model_internal::_equip_isleafIsValidCacheInitialized)
        {
            model_internal::calculateEquip_isleafIsValid();
        }

        return model_internal::_equip_isleafIsValid;
    }

    model_internal function calculateEquip_isleafIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_equip_isleafValidator.validate(model_internal::_instance.equip_isleaf)
        model_internal::_equip_isleafIsValid_der = (valRes.results == null);
        model_internal::_equip_isleafIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::equip_isleafValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::equip_isleafValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get equip_isleafValidationFailureMessages():Array
    {
        if (model_internal::_equip_isleafValidationFailureMessages == null)
            model_internal::calculateEquip_isleafIsValid();

        return _equip_isleafValidationFailureMessages;
    }

    model_internal function set equip_isleafValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_equip_isleafValidationFailureMessages;

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
            model_internal::_equip_isleafValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "equip_isleafValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get eqc_countStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    [Bindable(event="propertyChange")]   
    public function get eqc_sub_item_pathStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get eqc_sub_item_pathValidator() : StyleValidator
    {
        return model_internal::_eqc_sub_item_pathValidator;
    }

    model_internal function set _eqc_sub_item_pathIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_eqc_sub_item_pathIsValid;         
        if (oldValue !== value)
        {
            model_internal::_eqc_sub_item_pathIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqc_sub_item_pathIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get eqc_sub_item_pathIsValid():Boolean
    {
        if (!model_internal::_eqc_sub_item_pathIsValidCacheInitialized)
        {
            model_internal::calculateEqc_sub_item_pathIsValid();
        }

        return model_internal::_eqc_sub_item_pathIsValid;
    }

    model_internal function calculateEqc_sub_item_pathIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_eqc_sub_item_pathValidator.validate(model_internal::_instance.eqc_sub_item_path)
        model_internal::_eqc_sub_item_pathIsValid_der = (valRes.results == null);
        model_internal::_eqc_sub_item_pathIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::eqc_sub_item_pathValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::eqc_sub_item_pathValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get eqc_sub_item_pathValidationFailureMessages():Array
    {
        if (model_internal::_eqc_sub_item_pathValidationFailureMessages == null)
            model_internal::calculateEqc_sub_item_pathIsValid();

        return _eqc_sub_item_pathValidationFailureMessages;
    }

    model_internal function set eqc_sub_item_pathValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_eqc_sub_item_pathValidationFailureMessages;

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
            model_internal::_eqc_sub_item_pathValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqc_sub_item_pathValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get sub_item_etyp_isrigidStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get sub_item_etyp_isrigidValidator() : StyleValidator
    {
        return model_internal::_sub_item_etyp_isrigidValidator;
    }

    model_internal function set _sub_item_etyp_isrigidIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_sub_item_etyp_isrigidIsValid;         
        if (oldValue !== value)
        {
            model_internal::_sub_item_etyp_isrigidIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "sub_item_etyp_isrigidIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get sub_item_etyp_isrigidIsValid():Boolean
    {
        if (!model_internal::_sub_item_etyp_isrigidIsValidCacheInitialized)
        {
            model_internal::calculateSub_item_etyp_isrigidIsValid();
        }

        return model_internal::_sub_item_etyp_isrigidIsValid;
    }

    model_internal function calculateSub_item_etyp_isrigidIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_sub_item_etyp_isrigidValidator.validate(model_internal::_instance.sub_item_etyp_isrigid)
        model_internal::_sub_item_etyp_isrigidIsValid_der = (valRes.results == null);
        model_internal::_sub_item_etyp_isrigidIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::sub_item_etyp_isrigidValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::sub_item_etyp_isrigidValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get sub_item_etyp_isrigidValidationFailureMessages():Array
    {
        if (model_internal::_sub_item_etyp_isrigidValidationFailureMessages == null)
            model_internal::calculateSub_item_etyp_isrigidIsValid();

        return _sub_item_etyp_isrigidValidationFailureMessages;
    }

    model_internal function set sub_item_etyp_isrigidValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_sub_item_etyp_isrigidValidationFailureMessages;

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
            model_internal::_sub_item_etyp_isrigidValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "sub_item_etyp_isrigidValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get sub_item_sched_typeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get sub_item_sched_typeValidator() : StyleValidator
    {
        return model_internal::_sub_item_sched_typeValidator;
    }

    model_internal function set _sub_item_sched_typeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_sub_item_sched_typeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_sub_item_sched_typeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "sub_item_sched_typeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get sub_item_sched_typeIsValid():Boolean
    {
        if (!model_internal::_sub_item_sched_typeIsValidCacheInitialized)
        {
            model_internal::calculateSub_item_sched_typeIsValid();
        }

        return model_internal::_sub_item_sched_typeIsValid;
    }

    model_internal function calculateSub_item_sched_typeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_sub_item_sched_typeValidator.validate(model_internal::_instance.sub_item_sched_type)
        model_internal::_sub_item_sched_typeIsValid_der = (valRes.results == null);
        model_internal::_sub_item_sched_typeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::sub_item_sched_typeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::sub_item_sched_typeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get sub_item_sched_typeValidationFailureMessages():Array
    {
        if (model_internal::_sub_item_sched_typeValidationFailureMessages == null)
            model_internal::calculateSub_item_sched_typeIsValid();

        return _sub_item_sched_typeValidationFailureMessages;
    }

    model_internal function set sub_item_sched_typeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_sub_item_sched_typeValidationFailureMessages;

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
            model_internal::_sub_item_sched_typeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "sub_item_sched_typeValidationFailureMessages", oldValue, value));
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
    public function get eqc_count_rtStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    [Bindable(event="propertyChange")]   
    public function get etyp_title_pathStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get etyp_title_pathValidator() : StyleValidator
    {
        return model_internal::_etyp_title_pathValidator;
    }

    model_internal function set _etyp_title_pathIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_etyp_title_pathIsValid;         
        if (oldValue !== value)
        {
            model_internal::_etyp_title_pathIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_title_pathIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get etyp_title_pathIsValid():Boolean
    {
        if (!model_internal::_etyp_title_pathIsValidCacheInitialized)
        {
            model_internal::calculateEtyp_title_pathIsValid();
        }

        return model_internal::_etyp_title_pathIsValid;
    }

    model_internal function calculateEtyp_title_pathIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_etyp_title_pathValidator.validate(model_internal::_instance.etyp_title_path)
        model_internal::_etyp_title_pathIsValid_der = (valRes.results == null);
        model_internal::_etyp_title_pathIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::etyp_title_pathValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::etyp_title_pathValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get etyp_title_pathValidationFailureMessages():Array
    {
        if (model_internal::_etyp_title_pathValidationFailureMessages == null)
            model_internal::calculateEtyp_title_pathIsValid();

        return _etyp_title_pathValidationFailureMessages;
    }

    model_internal function set etyp_title_pathValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_etyp_title_pathValidationFailureMessages;

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
            model_internal::_etyp_title_pathValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_title_pathValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get ecnct_etypStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get ecnct_etypValidator() : StyleValidator
    {
        return model_internal::_ecnct_etypValidator;
    }

    model_internal function set _ecnct_etypIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_ecnct_etypIsValid;         
        if (oldValue !== value)
        {
            model_internal::_ecnct_etypIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "ecnct_etypIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get ecnct_etypIsValid():Boolean
    {
        if (!model_internal::_ecnct_etypIsValidCacheInitialized)
        {
            model_internal::calculateEcnct_etypIsValid();
        }

        return model_internal::_ecnct_etypIsValid;
    }

    model_internal function calculateEcnct_etypIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_ecnct_etypValidator.validate(model_internal::_instance.ecnct_etyp)
        model_internal::_ecnct_etypIsValid_der = (valRes.results == null);
        model_internal::_ecnct_etypIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::ecnct_etypValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::ecnct_etypValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get ecnct_etypValidationFailureMessages():Array
    {
        if (model_internal::_ecnct_etypValidationFailureMessages == null)
            model_internal::calculateEcnct_etypIsValid();

        return _ecnct_etypValidationFailureMessages;
    }

    model_internal function set ecnct_etypValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_ecnct_etypValidationFailureMessages;

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
            model_internal::_ecnct_etypValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "ecnct_etypValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get eqc_sub_item_titleStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get eqc_sub_item_titleValidator() : StyleValidator
    {
        return model_internal::_eqc_sub_item_titleValidator;
    }

    model_internal function set _eqc_sub_item_titleIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_eqc_sub_item_titleIsValid;         
        if (oldValue !== value)
        {
            model_internal::_eqc_sub_item_titleIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqc_sub_item_titleIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get eqc_sub_item_titleIsValid():Boolean
    {
        if (!model_internal::_eqc_sub_item_titleIsValidCacheInitialized)
        {
            model_internal::calculateEqc_sub_item_titleIsValid();
        }

        return model_internal::_eqc_sub_item_titleIsValid;
    }

    model_internal function calculateEqc_sub_item_titleIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_eqc_sub_item_titleValidator.validate(model_internal::_instance.eqc_sub_item_title)
        model_internal::_eqc_sub_item_titleIsValid_der = (valRes.results == null);
        model_internal::_eqc_sub_item_titleIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::eqc_sub_item_titleValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::eqc_sub_item_titleValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get eqc_sub_item_titleValidationFailureMessages():Array
    {
        if (model_internal::_eqc_sub_item_titleValidationFailureMessages == null)
            model_internal::calculateEqc_sub_item_titleIsValid();

        return _eqc_sub_item_titleValidationFailureMessages;
    }

    model_internal function set eqc_sub_item_titleValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_eqc_sub_item_titleValidationFailureMessages;

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
            model_internal::_eqc_sub_item_titleValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqc_sub_item_titleValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get etyp_is_drumfillStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get etyp_is_drumfillValidator() : StyleValidator
    {
        return model_internal::_etyp_is_drumfillValidator;
    }

    model_internal function set _etyp_is_drumfillIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_etyp_is_drumfillIsValid;         
        if (oldValue !== value)
        {
            model_internal::_etyp_is_drumfillIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_is_drumfillIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get etyp_is_drumfillIsValid():Boolean
    {
        if (!model_internal::_etyp_is_drumfillIsValidCacheInitialized)
        {
            model_internal::calculateEtyp_is_drumfillIsValid();
        }

        return model_internal::_etyp_is_drumfillIsValid;
    }

    model_internal function calculateEtyp_is_drumfillIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_etyp_is_drumfillValidator.validate(model_internal::_instance.etyp_is_drumfill)
        model_internal::_etyp_is_drumfillIsValid_der = (valRes.results == null);
        model_internal::_etyp_is_drumfillIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::etyp_is_drumfillValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::etyp_is_drumfillValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get etyp_is_drumfillValidationFailureMessages():Array
    {
        if (model_internal::_etyp_is_drumfillValidationFailureMessages == null)
            model_internal::calculateEtyp_is_drumfillIsValid();

        return _etyp_is_drumfillValidationFailureMessages;
    }

    model_internal function set etyp_is_drumfillValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_etyp_is_drumfillValidationFailureMessages;

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
            model_internal::_etyp_is_drumfillValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_is_drumfillValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get etyp_n_itemsStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get etyp_n_itemsValidator() : StyleValidator
    {
        return model_internal::_etyp_n_itemsValidator;
    }

    model_internal function set _etyp_n_itemsIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_etyp_n_itemsIsValid;         
        if (oldValue !== value)
        {
            model_internal::_etyp_n_itemsIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_n_itemsIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get etyp_n_itemsIsValid():Boolean
    {
        if (!model_internal::_etyp_n_itemsIsValidCacheInitialized)
        {
            model_internal::calculateEtyp_n_itemsIsValid();
        }

        return model_internal::_etyp_n_itemsIsValid;
    }

    model_internal function calculateEtyp_n_itemsIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_etyp_n_itemsValidator.validate(model_internal::_instance.etyp_n_items)
        model_internal::_etyp_n_itemsIsValid_der = (valRes.results == null);
        model_internal::_etyp_n_itemsIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::etyp_n_itemsValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::etyp_n_itemsValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get etyp_n_itemsValidationFailureMessages():Array
    {
        if (model_internal::_etyp_n_itemsValidationFailureMessages == null)
            model_internal::calculateEtyp_n_itemsIsValid();

        return _etyp_n_itemsValidationFailureMessages;
    }

    model_internal function set etyp_n_itemsValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_etyp_n_itemsValidationFailureMessages;

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
            model_internal::_etyp_n_itemsValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_n_itemsValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get eqc_sub_itemStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get eqc_sub_itemValidator() : StyleValidator
    {
        return model_internal::_eqc_sub_itemValidator;
    }

    model_internal function set _eqc_sub_itemIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_eqc_sub_itemIsValid;         
        if (oldValue !== value)
        {
            model_internal::_eqc_sub_itemIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqc_sub_itemIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get eqc_sub_itemIsValid():Boolean
    {
        if (!model_internal::_eqc_sub_itemIsValidCacheInitialized)
        {
            model_internal::calculateEqc_sub_itemIsValid();
        }

        return model_internal::_eqc_sub_itemIsValid;
    }

    model_internal function calculateEqc_sub_itemIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_eqc_sub_itemValidator.validate(model_internal::_instance.eqc_sub_item)
        model_internal::_eqc_sub_itemIsValid_der = (valRes.results == null);
        model_internal::_eqc_sub_itemIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::eqc_sub_itemValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::eqc_sub_itemValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get eqc_sub_itemValidationFailureMessages():Array
    {
        if (model_internal::_eqc_sub_itemValidationFailureMessages == null)
            model_internal::calculateEqc_sub_itemIsValid();

        return _eqc_sub_itemValidationFailureMessages;
    }

    model_internal function set eqc_sub_itemValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_eqc_sub_itemValidationFailureMessages;

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
            model_internal::_eqc_sub_itemValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqc_sub_itemValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get idxStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get idxValidator() : StyleValidator
    {
        return model_internal::_idxValidator;
    }

    model_internal function set _idxIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_idxIsValid;         
        if (oldValue !== value)
        {
            model_internal::_idxIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "idxIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get idxIsValid():Boolean
    {
        if (!model_internal::_idxIsValidCacheInitialized)
        {
            model_internal::calculateIdxIsValid();
        }

        return model_internal::_idxIsValid;
    }

    model_internal function calculateIdxIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_idxValidator.validate(model_internal::_instance.idx)
        model_internal::_idxIsValid_der = (valRes.results == null);
        model_internal::_idxIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::idxValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::idxValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get idxValidationFailureMessages():Array
    {
        if (model_internal::_idxValidationFailureMessages == null)
            model_internal::calculateIdxIsValid();

        return _idxValidationFailureMessages;
    }

    model_internal function set idxValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_idxValidationFailureMessages;

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
            model_internal::_idxValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "idxValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get etyp_id_pathStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get etyp_id_pathValidator() : StyleValidator
    {
        return model_internal::_etyp_id_pathValidator;
    }

    model_internal function set _etyp_id_pathIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_etyp_id_pathIsValid;         
        if (oldValue !== value)
        {
            model_internal::_etyp_id_pathIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_id_pathIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get etyp_id_pathIsValid():Boolean
    {
        if (!model_internal::_etyp_id_pathIsValidCacheInitialized)
        {
            model_internal::calculateEtyp_id_pathIsValid();
        }

        return model_internal::_etyp_id_pathIsValid;
    }

    model_internal function calculateEtyp_id_pathIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_etyp_id_pathValidator.validate(model_internal::_instance.etyp_id_path)
        model_internal::_etyp_id_pathIsValid_der = (valRes.results == null);
        model_internal::_etyp_id_pathIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::etyp_id_pathValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::etyp_id_pathValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get etyp_id_pathValidationFailureMessages():Array
    {
        if (model_internal::_etyp_id_pathValidationFailureMessages == null)
            model_internal::calculateEtyp_id_pathIsValid();

        return _etyp_id_pathValidationFailureMessages;
    }

    model_internal function set etyp_id_pathValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_etyp_id_pathValidationFailureMessages;

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
            model_internal::_etyp_id_pathValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_id_pathValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get eqc_sub_item_rtStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get eqc_sub_item_rtValidator() : StyleValidator
    {
        return model_internal::_eqc_sub_item_rtValidator;
    }

    model_internal function set _eqc_sub_item_rtIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_eqc_sub_item_rtIsValid;         
        if (oldValue !== value)
        {
            model_internal::_eqc_sub_item_rtIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqc_sub_item_rtIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get eqc_sub_item_rtIsValid():Boolean
    {
        if (!model_internal::_eqc_sub_item_rtIsValidCacheInitialized)
        {
            model_internal::calculateEqc_sub_item_rtIsValid();
        }

        return model_internal::_eqc_sub_item_rtIsValid;
    }

    model_internal function calculateEqc_sub_item_rtIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_eqc_sub_item_rtValidator.validate(model_internal::_instance.eqc_sub_item_rt)
        model_internal::_eqc_sub_item_rtIsValid_der = (valRes.results == null);
        model_internal::_eqc_sub_item_rtIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::eqc_sub_item_rtValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::eqc_sub_item_rtValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get eqc_sub_item_rtValidationFailureMessages():Array
    {
        if (model_internal::_eqc_sub_item_rtValidationFailureMessages == null)
            model_internal::calculateEqc_sub_item_rtIsValid();

        return _eqc_sub_item_rtValidationFailureMessages;
    }

    model_internal function set eqc_sub_item_rtValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_eqc_sub_item_rtValidationFailureMessages;

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
            model_internal::_eqc_sub_item_rtValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqc_sub_item_rtValidationFailureMessages", oldValue, value));
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
    public function get etyp_classStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get etyp_classValidator() : StyleValidator
    {
        return model_internal::_etyp_classValidator;
    }

    model_internal function set _etyp_classIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_etyp_classIsValid;         
        if (oldValue !== value)
        {
            model_internal::_etyp_classIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_classIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get etyp_classIsValid():Boolean
    {
        if (!model_internal::_etyp_classIsValidCacheInitialized)
        {
            model_internal::calculateEtyp_classIsValid();
        }

        return model_internal::_etyp_classIsValid;
    }

    model_internal function calculateEtyp_classIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_etyp_classValidator.validate(model_internal::_instance.etyp_class)
        model_internal::_etyp_classIsValid_der = (valRes.results == null);
        model_internal::_etyp_classIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::etyp_classValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::etyp_classValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get etyp_classValidationFailureMessages():Array
    {
        if (model_internal::_etyp_classValidationFailureMessages == null)
            model_internal::calculateEtyp_classIsValid();

        return _etyp_classValidationFailureMessages;
    }

    model_internal function set etyp_classValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_etyp_classValidationFailureMessages;

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
            model_internal::_etyp_classValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_classValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get etyp_title_rtStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get etyp_title_rtValidator() : StyleValidator
    {
        return model_internal::_etyp_title_rtValidator;
    }

    model_internal function set _etyp_title_rtIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_etyp_title_rtIsValid;         
        if (oldValue !== value)
        {
            model_internal::_etyp_title_rtIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_title_rtIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get etyp_title_rtIsValid():Boolean
    {
        if (!model_internal::_etyp_title_rtIsValidCacheInitialized)
        {
            model_internal::calculateEtyp_title_rtIsValid();
        }

        return model_internal::_etyp_title_rtIsValid;
    }

    model_internal function calculateEtyp_title_rtIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_etyp_title_rtValidator.validate(model_internal::_instance.etyp_title_rt)
        model_internal::_etyp_title_rtIsValid_der = (valRes.results == null);
        model_internal::_etyp_title_rtIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::etyp_title_rtValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::etyp_title_rtValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get etyp_title_rtValidationFailureMessages():Array
    {
        if (model_internal::_etyp_title_rtValidationFailureMessages == null)
            model_internal::calculateEtyp_title_rtIsValid();

        return _etyp_title_rtValidationFailureMessages;
    }

    model_internal function set etyp_title_rtValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_etyp_title_rtValidationFailureMessages;

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
            model_internal::_etyp_title_rtValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_title_rtValidationFailureMessages", oldValue, value));
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
    public function get etyp_id_rtStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get etyp_id_rtValidator() : StyleValidator
    {
        return model_internal::_etyp_id_rtValidator;
    }

    model_internal function set _etyp_id_rtIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_etyp_id_rtIsValid;         
        if (oldValue !== value)
        {
            model_internal::_etyp_id_rtIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_id_rtIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get etyp_id_rtIsValid():Boolean
    {
        if (!model_internal::_etyp_id_rtIsValidCacheInitialized)
        {
            model_internal::calculateEtyp_id_rtIsValid();
        }

        return model_internal::_etyp_id_rtIsValid;
    }

    model_internal function calculateEtyp_id_rtIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_etyp_id_rtValidator.validate(model_internal::_instance.etyp_id_rt)
        model_internal::_etyp_id_rtIsValid_der = (valRes.results == null);
        model_internal::_etyp_id_rtIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::etyp_id_rtValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::etyp_id_rtValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get etyp_id_rtValidationFailureMessages():Array
    {
        if (model_internal::_etyp_id_rtValidationFailureMessages == null)
            model_internal::calculateEtyp_id_rtIsValid();

        return _etyp_id_rtValidationFailureMessages;
    }

    model_internal function set etyp_id_rtValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_etyp_id_rtValidationFailureMessages;

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
            model_internal::_etyp_id_rtValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_id_rtValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get lvlStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get lvlValidator() : StyleValidator
    {
        return model_internal::_lvlValidator;
    }

    model_internal function set _lvlIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_lvlIsValid;         
        if (oldValue !== value)
        {
            model_internal::_lvlIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "lvlIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get lvlIsValid():Boolean
    {
        if (!model_internal::_lvlIsValidCacheInitialized)
        {
            model_internal::calculateLvlIsValid();
        }

        return model_internal::_lvlIsValid;
    }

    model_internal function calculateLvlIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_lvlValidator.validate(model_internal::_instance.lvl)
        model_internal::_lvlIsValid_der = (valRes.results == null);
        model_internal::_lvlIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::lvlValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::lvlValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get lvlValidationFailureMessages():Array
    {
        if (model_internal::_lvlValidationFailureMessages == null)
            model_internal::calculateLvlIsValid();

        return _lvlValidationFailureMessages;
    }

    model_internal function set lvlValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_lvlValidationFailureMessages;

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
            model_internal::_lvlValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "lvlValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get eqc_pathStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get eqc_pathValidator() : StyleValidator
    {
        return model_internal::_eqc_pathValidator;
    }

    model_internal function set _eqc_pathIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_eqc_pathIsValid;         
        if (oldValue !== value)
        {
            model_internal::_eqc_pathIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqc_pathIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get eqc_pathIsValid():Boolean
    {
        if (!model_internal::_eqc_pathIsValidCacheInitialized)
        {
            model_internal::calculateEqc_pathIsValid();
        }

        return model_internal::_eqc_pathIsValid;
    }

    model_internal function calculateEqc_pathIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_eqc_pathValidator.validate(model_internal::_instance.eqc_path)
        model_internal::_eqc_pathIsValid_der = (valRes.results == null);
        model_internal::_eqc_pathIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::eqc_pathValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::eqc_pathValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get eqc_pathValidationFailureMessages():Array
    {
        if (model_internal::_eqc_pathValidationFailureMessages == null)
            model_internal::calculateEqc_pathIsValid();

        return _eqc_pathValidationFailureMessages;
    }

    model_internal function set eqc_pathValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_eqc_pathValidationFailureMessages;

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
            model_internal::_eqc_pathValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqc_pathValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmptnuStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmptnuValidator() : StyleValidator
    {
        return model_internal::_cmptnuValidator;
    }

    model_internal function set _cmptnuIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmptnuIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmptnuIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmptnuIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmptnuIsValid():Boolean
    {
        if (!model_internal::_cmptnuIsValidCacheInitialized)
        {
            model_internal::calculateCmptnuIsValid();
        }

        return model_internal::_cmptnuIsValid;
    }

    model_internal function calculateCmptnuIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmptnuValidator.validate(model_internal::_instance.cmptnu)
        model_internal::_cmptnuIsValid_der = (valRes.results == null);
        model_internal::_cmptnuIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmptnuValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmptnuValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmptnuValidationFailureMessages():Array
    {
        if (model_internal::_cmptnuValidationFailureMessages == null)
            model_internal::calculateCmptnuIsValid();

        return _cmptnuValidationFailureMessages;
    }

    model_internal function set cmptnuValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmptnuValidationFailureMessages;

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
            model_internal::_cmptnuValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmptnuValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get compartmentsStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get compartmentsValidator() : StyleValidator
    {
        return model_internal::_compartmentsValidator;
    }

    model_internal function set _compartmentsIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_compartmentsIsValid;         
        if (oldValue !== value)
        {
            model_internal::_compartmentsIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "compartmentsIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get compartmentsIsValid():Boolean
    {
        if (!model_internal::_compartmentsIsValidCacheInitialized)
        {
            model_internal::calculateCompartmentsIsValid();
        }

        return model_internal::_compartmentsIsValid;
    }

    model_internal function calculateCompartmentsIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_compartmentsValidator.validate(model_internal::_instance.compartments)
        model_internal::_compartmentsIsValid_der = (valRes.results == null);
        model_internal::_compartmentsIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::compartmentsValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::compartmentsValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get compartmentsValidationFailureMessages():Array
    {
        if (model_internal::_compartmentsValidationFailureMessages == null)
            model_internal::calculateCompartmentsIsValid();

        return _compartmentsValidationFailureMessages;
    }

    model_internal function set compartmentsValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_compartmentsValidationFailureMessages;

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
            model_internal::_compartmentsValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "compartmentsValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get etyp_max_grossStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get etyp_max_grossValidator() : StyleValidator
    {
        return model_internal::_etyp_max_grossValidator;
    }

    model_internal function set _etyp_max_grossIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_etyp_max_grossIsValid;         
        if (oldValue !== value)
        {
            model_internal::_etyp_max_grossIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_max_grossIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get etyp_max_grossIsValid():Boolean
    {
        if (!model_internal::_etyp_max_grossIsValidCacheInitialized)
        {
            model_internal::calculateEtyp_max_grossIsValid();
        }

        return model_internal::_etyp_max_grossIsValid;
    }

    model_internal function calculateEtyp_max_grossIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_etyp_max_grossValidator.validate(model_internal::_instance.etyp_max_gross)
        model_internal::_etyp_max_grossIsValid_der = (valRes.results == null);
        model_internal::_etyp_max_grossIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::etyp_max_grossValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::etyp_max_grossValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get etyp_max_grossValidationFailureMessages():Array
    {
        if (model_internal::_etyp_max_grossValidationFailureMessages == null)
            model_internal::calculateEtyp_max_grossIsValid();

        return _etyp_max_grossValidationFailureMessages;
    }

    model_internal function set etyp_max_grossValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_etyp_max_grossValidationFailureMessages;

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
            model_internal::_etyp_max_grossValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_max_grossValidationFailureMessages", oldValue, value));
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
            case("etyp_isrigid"):
            {
                return etyp_isrigidValidationFailureMessages;
            }
            case("etyp_schedul"):
            {
                return etyp_schedulValidationFailureMessages;
            }
            case("equip_isleaf"):
            {
                return equip_isleafValidationFailureMessages;
            }
            case("eqc_sub_item_path"):
            {
                return eqc_sub_item_pathValidationFailureMessages;
            }
            case("sub_item_etyp_isrigid"):
            {
                return sub_item_etyp_isrigidValidationFailureMessages;
            }
            case("sub_item_sched_type"):
            {
                return sub_item_sched_typeValidationFailureMessages;
            }
            case("etyp_category"):
            {
                return etyp_categoryValidationFailureMessages;
            }
            case("etyp_title_path"):
            {
                return etyp_title_pathValidationFailureMessages;
            }
            case("ecnct_etyp"):
            {
                return ecnct_etypValidationFailureMessages;
            }
            case("eqc_sub_item_title"):
            {
                return eqc_sub_item_titleValidationFailureMessages;
            }
            case("etyp_is_drumfill"):
            {
                return etyp_is_drumfillValidationFailureMessages;
            }
            case("etyp_n_items"):
            {
                return etyp_n_itemsValidationFailureMessages;
            }
            case("eqc_sub_item"):
            {
                return eqc_sub_itemValidationFailureMessages;
            }
            case("idx"):
            {
                return idxValidationFailureMessages;
            }
            case("etyp_id_path"):
            {
                return etyp_id_pathValidationFailureMessages;
            }
            case("eqc_sub_item_rt"):
            {
                return eqc_sub_item_rtValidationFailureMessages;
            }
            case("etyp_title"):
            {
                return etyp_titleValidationFailureMessages;
            }
            case("etyp_class"):
            {
                return etyp_classValidationFailureMessages;
            }
            case("etyp_title_rt"):
            {
                return etyp_title_rtValidationFailureMessages;
            }
            case("etyp_id"):
            {
                return etyp_idValidationFailureMessages;
            }
            case("cmpt_units"):
            {
                return cmpt_unitsValidationFailureMessages;
            }
            case("etyp_id_rt"):
            {
                return etyp_id_rtValidationFailureMessages;
            }
            case("lvl"):
            {
                return lvlValidationFailureMessages;
            }
            case("eqc_path"):
            {
                return eqc_pathValidationFailureMessages;
            }
            case("cmptnu"):
            {
                return cmptnuValidationFailureMessages;
            }
            case("compartments"):
            {
                return compartmentsValidationFailureMessages;
            }
            case("etyp_max_gross"):
            {
                return etyp_max_grossValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
