
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
internal class _GUI_TankersEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("etyp_category", "tnkr_base_site_name", "tnkr_stats", "tnkr_cur_depot_name", "rn", "tnkr_eqpt_name", "tnkr_owner", "tnkr_last_trip", "tnkr_base_site", "tnkr_dglic_exp", "remarks", "tnkr_pin", "tnkr_ntrips", "tnkr_max_kg", "tnkr_carrier_name", "tnkr_ins_exp", "tnkr_dest_depot", "tnkr_cur_depot", "tnkr_last_depot", "composition", "tnkr_archive", "tnkr_name", "tnkr_etp", "tnkr_last_depot_name", "tnkr_lic_exp", "tnkr_lock", "tnkr_code", "tnkr_bay_loop_ch", "tnkr_own_txt", "tnkr_dest_depot_name", "tnkr_owner_name", "tnkr_carrier", "tnkr_active");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("etyp_category", "tnkr_base_site_name", "tnkr_stats", "tnkr_cur_depot_name", "rn", "tnkr_eqpt_name", "tnkr_owner", "tnkr_last_trip", "tnkr_base_site", "tnkr_dglic_exp", "remarks", "tnkr_pin", "tnkr_ntrips", "tnkr_max_kg", "tnkr_carrier_name", "tnkr_ins_exp", "tnkr_dest_depot", "tnkr_cur_depot", "tnkr_last_depot", "composition", "tnkr_archive", "tnkr_name", "tnkr_etp", "tnkr_last_depot_name", "tnkr_lic_exp", "tnkr_lock", "tnkr_code", "tnkr_bay_loop_ch", "tnkr_own_txt", "tnkr_dest_depot_name", "tnkr_owner_name", "tnkr_carrier", "tnkr_active");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("etyp_category", "tnkr_base_site_name", "tnkr_stats", "tnkr_cur_depot_name", "rn", "tnkr_eqpt_name", "tnkr_owner", "tnkr_last_trip", "tnkr_base_site", "tnkr_dglic_exp", "remarks", "tnkr_pin", "tnkr_ntrips", "tnkr_max_kg", "tnkr_carrier_name", "tnkr_ins_exp", "tnkr_dest_depot", "tnkr_cur_depot", "tnkr_last_depot", "composition", "tnkr_archive", "tnkr_name", "tnkr_etp", "tnkr_last_depot_name", "tnkr_lic_exp", "tnkr_lock", "tnkr_code", "tnkr_bay_loop_ch", "tnkr_own_txt", "tnkr_dest_depot_name", "tnkr_owner_name", "tnkr_carrier", "tnkr_active");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("etyp_category", "tnkr_base_site_name", "tnkr_stats", "tnkr_cur_depot_name", "rn", "tnkr_eqpt_name", "tnkr_owner", "tnkr_last_trip", "tnkr_base_site", "tnkr_dglic_exp", "remarks", "tnkr_pin", "tnkr_ntrips", "tnkr_max_kg", "tnkr_carrier_name", "tnkr_ins_exp", "tnkr_dest_depot", "tnkr_cur_depot", "tnkr_last_depot", "composition", "tnkr_archive", "tnkr_name", "tnkr_etp", "tnkr_last_depot_name", "tnkr_lic_exp", "tnkr_lock", "tnkr_code", "tnkr_bay_loop_ch", "tnkr_own_txt", "tnkr_dest_depot_name", "tnkr_owner_name", "tnkr_carrier", "tnkr_active");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("etyp_category", "tnkr_base_site_name", "tnkr_stats", "tnkr_cur_depot_name", "rn", "tnkr_eqpt_name", "tnkr_owner", "tnkr_last_trip", "tnkr_base_site", "tnkr_dglic_exp", "remarks", "tnkr_pin", "tnkr_ntrips", "tnkr_max_kg", "tnkr_carrier_name", "tnkr_ins_exp", "tnkr_dest_depot", "tnkr_cur_depot", "tnkr_last_depot", "composition", "tnkr_archive", "tnkr_name", "tnkr_etp", "tnkr_last_depot_name", "tnkr_lic_exp", "tnkr_lock", "tnkr_code", "tnkr_bay_loop_ch", "tnkr_own_txt", "tnkr_dest_depot_name", "tnkr_owner_name", "tnkr_carrier", "tnkr_active");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "GUI_Tankers";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _etyp_categoryIsValid:Boolean;
    model_internal var _etyp_categoryValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _etyp_categoryIsValidCacheInitialized:Boolean = false;
    model_internal var _etyp_categoryValidationFailureMessages:Array;
    
    model_internal var _tnkr_base_site_nameIsValid:Boolean;
    model_internal var _tnkr_base_site_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tnkr_base_site_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _tnkr_base_site_nameValidationFailureMessages:Array;
    
    model_internal var _tnkr_statsIsValid:Boolean;
    model_internal var _tnkr_statsValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tnkr_statsIsValidCacheInitialized:Boolean = false;
    model_internal var _tnkr_statsValidationFailureMessages:Array;
    
    model_internal var _tnkr_cur_depot_nameIsValid:Boolean;
    model_internal var _tnkr_cur_depot_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tnkr_cur_depot_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _tnkr_cur_depot_nameValidationFailureMessages:Array;
    
    model_internal var _rnIsValid:Boolean;
    model_internal var _rnValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _rnIsValidCacheInitialized:Boolean = false;
    model_internal var _rnValidationFailureMessages:Array;
    
    model_internal var _tnkr_eqpt_nameIsValid:Boolean;
    model_internal var _tnkr_eqpt_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tnkr_eqpt_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _tnkr_eqpt_nameValidationFailureMessages:Array;
    
    model_internal var _tnkr_ownerIsValid:Boolean;
    model_internal var _tnkr_ownerValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tnkr_ownerIsValidCacheInitialized:Boolean = false;
    model_internal var _tnkr_ownerValidationFailureMessages:Array;
    
    model_internal var _tnkr_last_tripIsValid:Boolean;
    model_internal var _tnkr_last_tripValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tnkr_last_tripIsValidCacheInitialized:Boolean = false;
    model_internal var _tnkr_last_tripValidationFailureMessages:Array;
    
    model_internal var _tnkr_base_siteIsValid:Boolean;
    model_internal var _tnkr_base_siteValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tnkr_base_siteIsValidCacheInitialized:Boolean = false;
    model_internal var _tnkr_base_siteValidationFailureMessages:Array;
    
    model_internal var _tnkr_dglic_expIsValid:Boolean;
    model_internal var _tnkr_dglic_expValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tnkr_dglic_expIsValidCacheInitialized:Boolean = false;
    model_internal var _tnkr_dglic_expValidationFailureMessages:Array;
    
    model_internal var _remarksIsValid:Boolean;
    model_internal var _remarksValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _remarksIsValidCacheInitialized:Boolean = false;
    model_internal var _remarksValidationFailureMessages:Array;
    
    model_internal var _tnkr_pinIsValid:Boolean;
    model_internal var _tnkr_pinValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tnkr_pinIsValidCacheInitialized:Boolean = false;
    model_internal var _tnkr_pinValidationFailureMessages:Array;
    
    model_internal var _tnkr_ntripsIsValid:Boolean;
    model_internal var _tnkr_ntripsValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tnkr_ntripsIsValidCacheInitialized:Boolean = false;
    model_internal var _tnkr_ntripsValidationFailureMessages:Array;
    
    model_internal var _tnkr_max_kgIsValid:Boolean;
    model_internal var _tnkr_max_kgValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tnkr_max_kgIsValidCacheInitialized:Boolean = false;
    model_internal var _tnkr_max_kgValidationFailureMessages:Array;
    
    model_internal var _tnkr_carrier_nameIsValid:Boolean;
    model_internal var _tnkr_carrier_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tnkr_carrier_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _tnkr_carrier_nameValidationFailureMessages:Array;
    
    model_internal var _tnkr_ins_expIsValid:Boolean;
    model_internal var _tnkr_ins_expValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tnkr_ins_expIsValidCacheInitialized:Boolean = false;
    model_internal var _tnkr_ins_expValidationFailureMessages:Array;
    
    model_internal var _tnkr_dest_depotIsValid:Boolean;
    model_internal var _tnkr_dest_depotValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tnkr_dest_depotIsValidCacheInitialized:Boolean = false;
    model_internal var _tnkr_dest_depotValidationFailureMessages:Array;
    
    model_internal var _tnkr_cur_depotIsValid:Boolean;
    model_internal var _tnkr_cur_depotValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tnkr_cur_depotIsValidCacheInitialized:Boolean = false;
    model_internal var _tnkr_cur_depotValidationFailureMessages:Array;
    
    model_internal var _tnkr_last_depotIsValid:Boolean;
    model_internal var _tnkr_last_depotValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tnkr_last_depotIsValidCacheInitialized:Boolean = false;
    model_internal var _tnkr_last_depotValidationFailureMessages:Array;
    
    model_internal var _compositionIsValid:Boolean;
    model_internal var _compositionValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _compositionIsValidCacheInitialized:Boolean = false;
    model_internal var _compositionValidationFailureMessages:Array;
    
    model_internal var _tnkr_archiveIsValid:Boolean;
    model_internal var _tnkr_archiveValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tnkr_archiveIsValidCacheInitialized:Boolean = false;
    model_internal var _tnkr_archiveValidationFailureMessages:Array;
    
    model_internal var _tnkr_nameIsValid:Boolean;
    model_internal var _tnkr_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tnkr_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _tnkr_nameValidationFailureMessages:Array;
    
    model_internal var _tnkr_etpIsValid:Boolean;
    model_internal var _tnkr_etpValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tnkr_etpIsValidCacheInitialized:Boolean = false;
    model_internal var _tnkr_etpValidationFailureMessages:Array;
    
    model_internal var _tnkr_last_depot_nameIsValid:Boolean;
    model_internal var _tnkr_last_depot_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tnkr_last_depot_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _tnkr_last_depot_nameValidationFailureMessages:Array;
    
    model_internal var _tnkr_lic_expIsValid:Boolean;
    model_internal var _tnkr_lic_expValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tnkr_lic_expIsValidCacheInitialized:Boolean = false;
    model_internal var _tnkr_lic_expValidationFailureMessages:Array;
    
    model_internal var _tnkr_lockIsValid:Boolean;
    model_internal var _tnkr_lockValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tnkr_lockIsValidCacheInitialized:Boolean = false;
    model_internal var _tnkr_lockValidationFailureMessages:Array;
    
    model_internal var _tnkr_codeIsValid:Boolean;
    model_internal var _tnkr_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tnkr_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _tnkr_codeValidationFailureMessages:Array;
    
    model_internal var _tnkr_bay_loop_chIsValid:Boolean;
    model_internal var _tnkr_bay_loop_chValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tnkr_bay_loop_chIsValidCacheInitialized:Boolean = false;
    model_internal var _tnkr_bay_loop_chValidationFailureMessages:Array;
    
    model_internal var _tnkr_own_txtIsValid:Boolean;
    model_internal var _tnkr_own_txtValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tnkr_own_txtIsValidCacheInitialized:Boolean = false;
    model_internal var _tnkr_own_txtValidationFailureMessages:Array;
    
    model_internal var _tnkr_dest_depot_nameIsValid:Boolean;
    model_internal var _tnkr_dest_depot_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tnkr_dest_depot_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _tnkr_dest_depot_nameValidationFailureMessages:Array;
    
    model_internal var _tnkr_owner_nameIsValid:Boolean;
    model_internal var _tnkr_owner_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tnkr_owner_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _tnkr_owner_nameValidationFailureMessages:Array;
    
    model_internal var _tnkr_carrierIsValid:Boolean;
    model_internal var _tnkr_carrierValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tnkr_carrierIsValidCacheInitialized:Boolean = false;
    model_internal var _tnkr_carrierValidationFailureMessages:Array;
    
    model_internal var _tnkr_activeIsValid:Boolean;
    model_internal var _tnkr_activeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tnkr_activeIsValidCacheInitialized:Boolean = false;
    model_internal var _tnkr_activeValidationFailureMessages:Array;

    model_internal var _instance:_Super_GUI_Tankers;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _GUI_TankersEntityMetadata(value : _Super_GUI_Tankers)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["etyp_category"] = new Array();
            model_internal::dependentsOnMap["tnkr_base_site_name"] = new Array();
            model_internal::dependentsOnMap["tnkr_stats"] = new Array();
            model_internal::dependentsOnMap["tnkr_cur_depot_name"] = new Array();
            model_internal::dependentsOnMap["rn"] = new Array();
            model_internal::dependentsOnMap["tnkr_eqpt_name"] = new Array();
            model_internal::dependentsOnMap["tnkr_owner"] = new Array();
            model_internal::dependentsOnMap["tnkr_last_trip"] = new Array();
            model_internal::dependentsOnMap["tnkr_base_site"] = new Array();
            model_internal::dependentsOnMap["tnkr_dglic_exp"] = new Array();
            model_internal::dependentsOnMap["remarks"] = new Array();
            model_internal::dependentsOnMap["tnkr_pin"] = new Array();
            model_internal::dependentsOnMap["tnkr_ntrips"] = new Array();
            model_internal::dependentsOnMap["tnkr_max_kg"] = new Array();
            model_internal::dependentsOnMap["tnkr_carrier_name"] = new Array();
            model_internal::dependentsOnMap["tnkr_ins_exp"] = new Array();
            model_internal::dependentsOnMap["tnkr_dest_depot"] = new Array();
            model_internal::dependentsOnMap["tnkr_cur_depot"] = new Array();
            model_internal::dependentsOnMap["tnkr_last_depot"] = new Array();
            model_internal::dependentsOnMap["composition"] = new Array();
            model_internal::dependentsOnMap["tnkr_archive"] = new Array();
            model_internal::dependentsOnMap["tnkr_name"] = new Array();
            model_internal::dependentsOnMap["tnkr_etp"] = new Array();
            model_internal::dependentsOnMap["tnkr_last_depot_name"] = new Array();
            model_internal::dependentsOnMap["tnkr_lic_exp"] = new Array();
            model_internal::dependentsOnMap["tnkr_lock"] = new Array();
            model_internal::dependentsOnMap["tnkr_code"] = new Array();
            model_internal::dependentsOnMap["tnkr_bay_loop_ch"] = new Array();
            model_internal::dependentsOnMap["tnkr_own_txt"] = new Array();
            model_internal::dependentsOnMap["tnkr_dest_depot_name"] = new Array();
            model_internal::dependentsOnMap["tnkr_owner_name"] = new Array();
            model_internal::dependentsOnMap["tnkr_carrier"] = new Array();
            model_internal::dependentsOnMap["tnkr_active"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["etyp_category"] = "Object";
        model_internal::propertyTypeMap["tnkr_base_site_name"] = "String";
        model_internal::propertyTypeMap["tnkr_stats"] = "String";
        model_internal::propertyTypeMap["tnkr_cur_depot_name"] = "String";
        model_internal::propertyTypeMap["rn"] = "String";
        model_internal::propertyTypeMap["tnkr_eqpt_name"] = "String";
        model_internal::propertyTypeMap["tnkr_owner"] = "String";
        model_internal::propertyTypeMap["tnkr_last_trip"] = "String";
        model_internal::propertyTypeMap["tnkr_base_site"] = "String";
        model_internal::propertyTypeMap["tnkr_dglic_exp"] = "Object";
        model_internal::propertyTypeMap["remarks"] = "Object";
        model_internal::propertyTypeMap["tnkr_pin"] = "Object";
        model_internal::propertyTypeMap["tnkr_ntrips"] = "String";
        model_internal::propertyTypeMap["tnkr_max_kg"] = "Object";
        model_internal::propertyTypeMap["tnkr_carrier_name"] = "String";
        model_internal::propertyTypeMap["tnkr_ins_exp"] = "Object";
        model_internal::propertyTypeMap["tnkr_dest_depot"] = "Object";
        model_internal::propertyTypeMap["tnkr_cur_depot"] = "String";
        model_internal::propertyTypeMap["tnkr_last_depot"] = "String";
        model_internal::propertyTypeMap["composition"] = "Object";
        model_internal::propertyTypeMap["tnkr_archive"] = "String";
        model_internal::propertyTypeMap["tnkr_name"] = "Object";
        model_internal::propertyTypeMap["tnkr_etp"] = "String";
        model_internal::propertyTypeMap["tnkr_last_depot_name"] = "String";
        model_internal::propertyTypeMap["tnkr_lic_exp"] = "Object";
        model_internal::propertyTypeMap["tnkr_lock"] = "String";
        model_internal::propertyTypeMap["tnkr_code"] = "String";
        model_internal::propertyTypeMap["tnkr_bay_loop_ch"] = "String";
        model_internal::propertyTypeMap["tnkr_own_txt"] = "String";
        model_internal::propertyTypeMap["tnkr_dest_depot_name"] = "Object";
        model_internal::propertyTypeMap["tnkr_owner_name"] = "String";
        model_internal::propertyTypeMap["tnkr_carrier"] = "String";
        model_internal::propertyTypeMap["tnkr_active"] = "String";

        model_internal::_instance = value;
        model_internal::_etyp_categoryValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEtyp_category);
        model_internal::_etyp_categoryValidator.required = true;
        model_internal::_etyp_categoryValidator.requiredFieldError = "etyp_category is required";
        //model_internal::_etyp_categoryValidator.source = model_internal::_instance;
        //model_internal::_etyp_categoryValidator.property = "etyp_category";
        model_internal::_tnkr_base_site_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTnkr_base_site_name);
        model_internal::_tnkr_base_site_nameValidator.required = true;
        model_internal::_tnkr_base_site_nameValidator.requiredFieldError = "tnkr_base_site_name is required";
        //model_internal::_tnkr_base_site_nameValidator.source = model_internal::_instance;
        //model_internal::_tnkr_base_site_nameValidator.property = "tnkr_base_site_name";
        model_internal::_tnkr_statsValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTnkr_stats);
        model_internal::_tnkr_statsValidator.required = true;
        model_internal::_tnkr_statsValidator.requiredFieldError = "tnkr_stats is required";
        //model_internal::_tnkr_statsValidator.source = model_internal::_instance;
        //model_internal::_tnkr_statsValidator.property = "tnkr_stats";
        model_internal::_tnkr_cur_depot_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTnkr_cur_depot_name);
        model_internal::_tnkr_cur_depot_nameValidator.required = true;
        model_internal::_tnkr_cur_depot_nameValidator.requiredFieldError = "tnkr_cur_depot_name is required";
        //model_internal::_tnkr_cur_depot_nameValidator.source = model_internal::_instance;
        //model_internal::_tnkr_cur_depot_nameValidator.property = "tnkr_cur_depot_name";
        model_internal::_rnValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForRn);
        model_internal::_rnValidator.required = true;
        model_internal::_rnValidator.requiredFieldError = "rn is required";
        //model_internal::_rnValidator.source = model_internal::_instance;
        //model_internal::_rnValidator.property = "rn";
        model_internal::_tnkr_eqpt_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTnkr_eqpt_name);
        model_internal::_tnkr_eqpt_nameValidator.required = true;
        model_internal::_tnkr_eqpt_nameValidator.requiredFieldError = "tnkr_eqpt_name is required";
        //model_internal::_tnkr_eqpt_nameValidator.source = model_internal::_instance;
        //model_internal::_tnkr_eqpt_nameValidator.property = "tnkr_eqpt_name";
        model_internal::_tnkr_ownerValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTnkr_owner);
        model_internal::_tnkr_ownerValidator.required = true;
        model_internal::_tnkr_ownerValidator.requiredFieldError = "tnkr_owner is required";
        //model_internal::_tnkr_ownerValidator.source = model_internal::_instance;
        //model_internal::_tnkr_ownerValidator.property = "tnkr_owner";
        model_internal::_tnkr_last_tripValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTnkr_last_trip);
        model_internal::_tnkr_last_tripValidator.required = true;
        model_internal::_tnkr_last_tripValidator.requiredFieldError = "tnkr_last_trip is required";
        //model_internal::_tnkr_last_tripValidator.source = model_internal::_instance;
        //model_internal::_tnkr_last_tripValidator.property = "tnkr_last_trip";
        model_internal::_tnkr_base_siteValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTnkr_base_site);
        model_internal::_tnkr_base_siteValidator.required = true;
        model_internal::_tnkr_base_siteValidator.requiredFieldError = "tnkr_base_site is required";
        //model_internal::_tnkr_base_siteValidator.source = model_internal::_instance;
        //model_internal::_tnkr_base_siteValidator.property = "tnkr_base_site";
        model_internal::_tnkr_dglic_expValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTnkr_dglic_exp);
        model_internal::_tnkr_dglic_expValidator.required = true;
        model_internal::_tnkr_dglic_expValidator.requiredFieldError = "tnkr_dglic_exp is required";
        //model_internal::_tnkr_dglic_expValidator.source = model_internal::_instance;
        //model_internal::_tnkr_dglic_expValidator.property = "tnkr_dglic_exp";
        model_internal::_remarksValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForRemarks);
        model_internal::_remarksValidator.required = true;
        model_internal::_remarksValidator.requiredFieldError = "remarks is required";
        //model_internal::_remarksValidator.source = model_internal::_instance;
        //model_internal::_remarksValidator.property = "remarks";
        model_internal::_tnkr_pinValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTnkr_pin);
        model_internal::_tnkr_pinValidator.required = true;
        model_internal::_tnkr_pinValidator.requiredFieldError = "tnkr_pin is required";
        //model_internal::_tnkr_pinValidator.source = model_internal::_instance;
        //model_internal::_tnkr_pinValidator.property = "tnkr_pin";
        model_internal::_tnkr_ntripsValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTnkr_ntrips);
        model_internal::_tnkr_ntripsValidator.required = true;
        model_internal::_tnkr_ntripsValidator.requiredFieldError = "tnkr_ntrips is required";
        //model_internal::_tnkr_ntripsValidator.source = model_internal::_instance;
        //model_internal::_tnkr_ntripsValidator.property = "tnkr_ntrips";
        model_internal::_tnkr_max_kgValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTnkr_max_kg);
        model_internal::_tnkr_max_kgValidator.required = true;
        model_internal::_tnkr_max_kgValidator.requiredFieldError = "tnkr_max_kg is required";
        //model_internal::_tnkr_max_kgValidator.source = model_internal::_instance;
        //model_internal::_tnkr_max_kgValidator.property = "tnkr_max_kg";
        model_internal::_tnkr_carrier_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTnkr_carrier_name);
        model_internal::_tnkr_carrier_nameValidator.required = true;
        model_internal::_tnkr_carrier_nameValidator.requiredFieldError = "tnkr_carrier_name is required";
        //model_internal::_tnkr_carrier_nameValidator.source = model_internal::_instance;
        //model_internal::_tnkr_carrier_nameValidator.property = "tnkr_carrier_name";
        model_internal::_tnkr_ins_expValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTnkr_ins_exp);
        model_internal::_tnkr_ins_expValidator.required = true;
        model_internal::_tnkr_ins_expValidator.requiredFieldError = "tnkr_ins_exp is required";
        //model_internal::_tnkr_ins_expValidator.source = model_internal::_instance;
        //model_internal::_tnkr_ins_expValidator.property = "tnkr_ins_exp";
        model_internal::_tnkr_dest_depotValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTnkr_dest_depot);
        model_internal::_tnkr_dest_depotValidator.required = true;
        model_internal::_tnkr_dest_depotValidator.requiredFieldError = "tnkr_dest_depot is required";
        //model_internal::_tnkr_dest_depotValidator.source = model_internal::_instance;
        //model_internal::_tnkr_dest_depotValidator.property = "tnkr_dest_depot";
        model_internal::_tnkr_cur_depotValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTnkr_cur_depot);
        model_internal::_tnkr_cur_depotValidator.required = true;
        model_internal::_tnkr_cur_depotValidator.requiredFieldError = "tnkr_cur_depot is required";
        //model_internal::_tnkr_cur_depotValidator.source = model_internal::_instance;
        //model_internal::_tnkr_cur_depotValidator.property = "tnkr_cur_depot";
        model_internal::_tnkr_last_depotValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTnkr_last_depot);
        model_internal::_tnkr_last_depotValidator.required = true;
        model_internal::_tnkr_last_depotValidator.requiredFieldError = "tnkr_last_depot is required";
        //model_internal::_tnkr_last_depotValidator.source = model_internal::_instance;
        //model_internal::_tnkr_last_depotValidator.property = "tnkr_last_depot";
        model_internal::_compositionValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForComposition);
        model_internal::_compositionValidator.required = true;
        model_internal::_compositionValidator.requiredFieldError = "composition is required";
        //model_internal::_compositionValidator.source = model_internal::_instance;
        //model_internal::_compositionValidator.property = "composition";
        model_internal::_tnkr_archiveValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTnkr_archive);
        model_internal::_tnkr_archiveValidator.required = true;
        model_internal::_tnkr_archiveValidator.requiredFieldError = "tnkr_archive is required";
        //model_internal::_tnkr_archiveValidator.source = model_internal::_instance;
        //model_internal::_tnkr_archiveValidator.property = "tnkr_archive";
        model_internal::_tnkr_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTnkr_name);
        model_internal::_tnkr_nameValidator.required = true;
        model_internal::_tnkr_nameValidator.requiredFieldError = "tnkr_name is required";
        //model_internal::_tnkr_nameValidator.source = model_internal::_instance;
        //model_internal::_tnkr_nameValidator.property = "tnkr_name";
        model_internal::_tnkr_etpValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTnkr_etp);
        model_internal::_tnkr_etpValidator.required = true;
        model_internal::_tnkr_etpValidator.requiredFieldError = "tnkr_etp is required";
        //model_internal::_tnkr_etpValidator.source = model_internal::_instance;
        //model_internal::_tnkr_etpValidator.property = "tnkr_etp";
        model_internal::_tnkr_last_depot_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTnkr_last_depot_name);
        model_internal::_tnkr_last_depot_nameValidator.required = true;
        model_internal::_tnkr_last_depot_nameValidator.requiredFieldError = "tnkr_last_depot_name is required";
        //model_internal::_tnkr_last_depot_nameValidator.source = model_internal::_instance;
        //model_internal::_tnkr_last_depot_nameValidator.property = "tnkr_last_depot_name";
        model_internal::_tnkr_lic_expValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTnkr_lic_exp);
        model_internal::_tnkr_lic_expValidator.required = true;
        model_internal::_tnkr_lic_expValidator.requiredFieldError = "tnkr_lic_exp is required";
        //model_internal::_tnkr_lic_expValidator.source = model_internal::_instance;
        //model_internal::_tnkr_lic_expValidator.property = "tnkr_lic_exp";
        model_internal::_tnkr_lockValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTnkr_lock);
        model_internal::_tnkr_lockValidator.required = true;
        model_internal::_tnkr_lockValidator.requiredFieldError = "tnkr_lock is required";
        //model_internal::_tnkr_lockValidator.source = model_internal::_instance;
        //model_internal::_tnkr_lockValidator.property = "tnkr_lock";
        model_internal::_tnkr_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTnkr_code);
        model_internal::_tnkr_codeValidator.required = true;
        model_internal::_tnkr_codeValidator.requiredFieldError = "tnkr_code is required";
        //model_internal::_tnkr_codeValidator.source = model_internal::_instance;
        //model_internal::_tnkr_codeValidator.property = "tnkr_code";
        model_internal::_tnkr_bay_loop_chValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTnkr_bay_loop_ch);
        model_internal::_tnkr_bay_loop_chValidator.required = true;
        model_internal::_tnkr_bay_loop_chValidator.requiredFieldError = "tnkr_bay_loop_ch is required";
        //model_internal::_tnkr_bay_loop_chValidator.source = model_internal::_instance;
        //model_internal::_tnkr_bay_loop_chValidator.property = "tnkr_bay_loop_ch";
        model_internal::_tnkr_own_txtValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTnkr_own_txt);
        model_internal::_tnkr_own_txtValidator.required = true;
        model_internal::_tnkr_own_txtValidator.requiredFieldError = "tnkr_own_txt is required";
        //model_internal::_tnkr_own_txtValidator.source = model_internal::_instance;
        //model_internal::_tnkr_own_txtValidator.property = "tnkr_own_txt";
        model_internal::_tnkr_dest_depot_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTnkr_dest_depot_name);
        model_internal::_tnkr_dest_depot_nameValidator.required = true;
        model_internal::_tnkr_dest_depot_nameValidator.requiredFieldError = "tnkr_dest_depot_name is required";
        //model_internal::_tnkr_dest_depot_nameValidator.source = model_internal::_instance;
        //model_internal::_tnkr_dest_depot_nameValidator.property = "tnkr_dest_depot_name";
        model_internal::_tnkr_owner_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTnkr_owner_name);
        model_internal::_tnkr_owner_nameValidator.required = true;
        model_internal::_tnkr_owner_nameValidator.requiredFieldError = "tnkr_owner_name is required";
        //model_internal::_tnkr_owner_nameValidator.source = model_internal::_instance;
        //model_internal::_tnkr_owner_nameValidator.property = "tnkr_owner_name";
        model_internal::_tnkr_carrierValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTnkr_carrier);
        model_internal::_tnkr_carrierValidator.required = true;
        model_internal::_tnkr_carrierValidator.requiredFieldError = "tnkr_carrier is required";
        //model_internal::_tnkr_carrierValidator.source = model_internal::_instance;
        //model_internal::_tnkr_carrierValidator.property = "tnkr_carrier";
        model_internal::_tnkr_activeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTnkr_active);
        model_internal::_tnkr_activeValidator.required = true;
        model_internal::_tnkr_activeValidator.requiredFieldError = "tnkr_active is required";
        //model_internal::_tnkr_activeValidator.source = model_internal::_instance;
        //model_internal::_tnkr_activeValidator.property = "tnkr_active";
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
            throw new Error(propertyName + " is not a data property of entity GUI_Tankers");
            
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
            throw new Error(propertyName + " is not a collection property of entity GUI_Tankers");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of GUI_Tankers");

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
            throw new Error(propertyName + " does not exist for entity GUI_Tankers");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity GUI_Tankers");
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
            throw new Error(propertyName + " does not exist for entity GUI_Tankers");
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
    public function get isEtyp_categoryAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTnkr_base_site_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTnkr_statsAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTnkr_cur_depot_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isRnAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTnkr_eqpt_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTnkr_ownerAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTnkr_last_tripAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTnkr_base_siteAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTnkr_dglic_expAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isRemarksAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTnkr_pinAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTnkr_ntripsAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTnkr_max_kgAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTnkr_carrier_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTnkr_ins_expAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTnkr_dest_depotAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTnkr_cur_depotAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTnkr_last_depotAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCompositionAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTnkr_archiveAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTnkr_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTnkr_etpAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTnkr_last_depot_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTnkr_lic_expAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTnkr_lockAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTnkr_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTnkr_bay_loop_chAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTnkr_own_txtAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTnkr_dest_depot_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTnkr_owner_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTnkr_carrierAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTnkr_activeAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnEtyp_category():void
    {
        if (model_internal::_etyp_categoryIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEtyp_category = null;
            model_internal::calculateEtyp_categoryIsValid();
        }
    }
    public function invalidateDependentOnTnkr_base_site_name():void
    {
        if (model_internal::_tnkr_base_site_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTnkr_base_site_name = null;
            model_internal::calculateTnkr_base_site_nameIsValid();
        }
    }
    public function invalidateDependentOnTnkr_stats():void
    {
        if (model_internal::_tnkr_statsIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTnkr_stats = null;
            model_internal::calculateTnkr_statsIsValid();
        }
    }
    public function invalidateDependentOnTnkr_cur_depot_name():void
    {
        if (model_internal::_tnkr_cur_depot_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTnkr_cur_depot_name = null;
            model_internal::calculateTnkr_cur_depot_nameIsValid();
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
    public function invalidateDependentOnTnkr_eqpt_name():void
    {
        if (model_internal::_tnkr_eqpt_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTnkr_eqpt_name = null;
            model_internal::calculateTnkr_eqpt_nameIsValid();
        }
    }
    public function invalidateDependentOnTnkr_owner():void
    {
        if (model_internal::_tnkr_ownerIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTnkr_owner = null;
            model_internal::calculateTnkr_ownerIsValid();
        }
    }
    public function invalidateDependentOnTnkr_last_trip():void
    {
        if (model_internal::_tnkr_last_tripIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTnkr_last_trip = null;
            model_internal::calculateTnkr_last_tripIsValid();
        }
    }
    public function invalidateDependentOnTnkr_base_site():void
    {
        if (model_internal::_tnkr_base_siteIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTnkr_base_site = null;
            model_internal::calculateTnkr_base_siteIsValid();
        }
    }
    public function invalidateDependentOnTnkr_dglic_exp():void
    {
        if (model_internal::_tnkr_dglic_expIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTnkr_dglic_exp = null;
            model_internal::calculateTnkr_dglic_expIsValid();
        }
    }
    public function invalidateDependentOnRemarks():void
    {
        if (model_internal::_remarksIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfRemarks = null;
            model_internal::calculateRemarksIsValid();
        }
    }
    public function invalidateDependentOnTnkr_pin():void
    {
        if (model_internal::_tnkr_pinIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTnkr_pin = null;
            model_internal::calculateTnkr_pinIsValid();
        }
    }
    public function invalidateDependentOnTnkr_ntrips():void
    {
        if (model_internal::_tnkr_ntripsIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTnkr_ntrips = null;
            model_internal::calculateTnkr_ntripsIsValid();
        }
    }
    public function invalidateDependentOnTnkr_max_kg():void
    {
        if (model_internal::_tnkr_max_kgIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTnkr_max_kg = null;
            model_internal::calculateTnkr_max_kgIsValid();
        }
    }
    public function invalidateDependentOnTnkr_carrier_name():void
    {
        if (model_internal::_tnkr_carrier_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTnkr_carrier_name = null;
            model_internal::calculateTnkr_carrier_nameIsValid();
        }
    }
    public function invalidateDependentOnTnkr_ins_exp():void
    {
        if (model_internal::_tnkr_ins_expIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTnkr_ins_exp = null;
            model_internal::calculateTnkr_ins_expIsValid();
        }
    }
    public function invalidateDependentOnTnkr_dest_depot():void
    {
        if (model_internal::_tnkr_dest_depotIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTnkr_dest_depot = null;
            model_internal::calculateTnkr_dest_depotIsValid();
        }
    }
    public function invalidateDependentOnTnkr_cur_depot():void
    {
        if (model_internal::_tnkr_cur_depotIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTnkr_cur_depot = null;
            model_internal::calculateTnkr_cur_depotIsValid();
        }
    }
    public function invalidateDependentOnTnkr_last_depot():void
    {
        if (model_internal::_tnkr_last_depotIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTnkr_last_depot = null;
            model_internal::calculateTnkr_last_depotIsValid();
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
    public function invalidateDependentOnTnkr_archive():void
    {
        if (model_internal::_tnkr_archiveIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTnkr_archive = null;
            model_internal::calculateTnkr_archiveIsValid();
        }
    }
    public function invalidateDependentOnTnkr_name():void
    {
        if (model_internal::_tnkr_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTnkr_name = null;
            model_internal::calculateTnkr_nameIsValid();
        }
    }
    public function invalidateDependentOnTnkr_etp():void
    {
        if (model_internal::_tnkr_etpIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTnkr_etp = null;
            model_internal::calculateTnkr_etpIsValid();
        }
    }
    public function invalidateDependentOnTnkr_last_depot_name():void
    {
        if (model_internal::_tnkr_last_depot_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTnkr_last_depot_name = null;
            model_internal::calculateTnkr_last_depot_nameIsValid();
        }
    }
    public function invalidateDependentOnTnkr_lic_exp():void
    {
        if (model_internal::_tnkr_lic_expIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTnkr_lic_exp = null;
            model_internal::calculateTnkr_lic_expIsValid();
        }
    }
    public function invalidateDependentOnTnkr_lock():void
    {
        if (model_internal::_tnkr_lockIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTnkr_lock = null;
            model_internal::calculateTnkr_lockIsValid();
        }
    }
    public function invalidateDependentOnTnkr_code():void
    {
        if (model_internal::_tnkr_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTnkr_code = null;
            model_internal::calculateTnkr_codeIsValid();
        }
    }
    public function invalidateDependentOnTnkr_bay_loop_ch():void
    {
        if (model_internal::_tnkr_bay_loop_chIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTnkr_bay_loop_ch = null;
            model_internal::calculateTnkr_bay_loop_chIsValid();
        }
    }
    public function invalidateDependentOnTnkr_own_txt():void
    {
        if (model_internal::_tnkr_own_txtIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTnkr_own_txt = null;
            model_internal::calculateTnkr_own_txtIsValid();
        }
    }
    public function invalidateDependentOnTnkr_dest_depot_name():void
    {
        if (model_internal::_tnkr_dest_depot_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTnkr_dest_depot_name = null;
            model_internal::calculateTnkr_dest_depot_nameIsValid();
        }
    }
    public function invalidateDependentOnTnkr_owner_name():void
    {
        if (model_internal::_tnkr_owner_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTnkr_owner_name = null;
            model_internal::calculateTnkr_owner_nameIsValid();
        }
    }
    public function invalidateDependentOnTnkr_carrier():void
    {
        if (model_internal::_tnkr_carrierIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTnkr_carrier = null;
            model_internal::calculateTnkr_carrierIsValid();
        }
    }
    public function invalidateDependentOnTnkr_active():void
    {
        if (model_internal::_tnkr_activeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTnkr_active = null;
            model_internal::calculateTnkr_activeIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
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
    public function get tnkr_base_site_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tnkr_base_site_nameValidator() : StyleValidator
    {
        return model_internal::_tnkr_base_site_nameValidator;
    }

    model_internal function set _tnkr_base_site_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tnkr_base_site_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tnkr_base_site_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_base_site_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_base_site_nameIsValid():Boolean
    {
        if (!model_internal::_tnkr_base_site_nameIsValidCacheInitialized)
        {
            model_internal::calculateTnkr_base_site_nameIsValid();
        }

        return model_internal::_tnkr_base_site_nameIsValid;
    }

    model_internal function calculateTnkr_base_site_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tnkr_base_site_nameValidator.validate(model_internal::_instance.tnkr_base_site_name)
        model_internal::_tnkr_base_site_nameIsValid_der = (valRes.results == null);
        model_internal::_tnkr_base_site_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tnkr_base_site_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tnkr_base_site_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_base_site_nameValidationFailureMessages():Array
    {
        if (model_internal::_tnkr_base_site_nameValidationFailureMessages == null)
            model_internal::calculateTnkr_base_site_nameIsValid();

        return _tnkr_base_site_nameValidationFailureMessages;
    }

    model_internal function set tnkr_base_site_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tnkr_base_site_nameValidationFailureMessages;

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
            model_internal::_tnkr_base_site_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_base_site_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get tnkr_statsStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tnkr_statsValidator() : StyleValidator
    {
        return model_internal::_tnkr_statsValidator;
    }

    model_internal function set _tnkr_statsIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tnkr_statsIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tnkr_statsIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_statsIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_statsIsValid():Boolean
    {
        if (!model_internal::_tnkr_statsIsValidCacheInitialized)
        {
            model_internal::calculateTnkr_statsIsValid();
        }

        return model_internal::_tnkr_statsIsValid;
    }

    model_internal function calculateTnkr_statsIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tnkr_statsValidator.validate(model_internal::_instance.tnkr_stats)
        model_internal::_tnkr_statsIsValid_der = (valRes.results == null);
        model_internal::_tnkr_statsIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tnkr_statsValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tnkr_statsValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_statsValidationFailureMessages():Array
    {
        if (model_internal::_tnkr_statsValidationFailureMessages == null)
            model_internal::calculateTnkr_statsIsValid();

        return _tnkr_statsValidationFailureMessages;
    }

    model_internal function set tnkr_statsValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tnkr_statsValidationFailureMessages;

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
            model_internal::_tnkr_statsValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_statsValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get tnkr_cur_depot_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tnkr_cur_depot_nameValidator() : StyleValidator
    {
        return model_internal::_tnkr_cur_depot_nameValidator;
    }

    model_internal function set _tnkr_cur_depot_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tnkr_cur_depot_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tnkr_cur_depot_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_cur_depot_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_cur_depot_nameIsValid():Boolean
    {
        if (!model_internal::_tnkr_cur_depot_nameIsValidCacheInitialized)
        {
            model_internal::calculateTnkr_cur_depot_nameIsValid();
        }

        return model_internal::_tnkr_cur_depot_nameIsValid;
    }

    model_internal function calculateTnkr_cur_depot_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tnkr_cur_depot_nameValidator.validate(model_internal::_instance.tnkr_cur_depot_name)
        model_internal::_tnkr_cur_depot_nameIsValid_der = (valRes.results == null);
        model_internal::_tnkr_cur_depot_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tnkr_cur_depot_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tnkr_cur_depot_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_cur_depot_nameValidationFailureMessages():Array
    {
        if (model_internal::_tnkr_cur_depot_nameValidationFailureMessages == null)
            model_internal::calculateTnkr_cur_depot_nameIsValid();

        return _tnkr_cur_depot_nameValidationFailureMessages;
    }

    model_internal function set tnkr_cur_depot_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tnkr_cur_depot_nameValidationFailureMessages;

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
            model_internal::_tnkr_cur_depot_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_cur_depot_nameValidationFailureMessages", oldValue, value));
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
    public function get tnkr_eqpt_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tnkr_eqpt_nameValidator() : StyleValidator
    {
        return model_internal::_tnkr_eqpt_nameValidator;
    }

    model_internal function set _tnkr_eqpt_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tnkr_eqpt_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tnkr_eqpt_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_eqpt_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_eqpt_nameIsValid():Boolean
    {
        if (!model_internal::_tnkr_eqpt_nameIsValidCacheInitialized)
        {
            model_internal::calculateTnkr_eqpt_nameIsValid();
        }

        return model_internal::_tnkr_eqpt_nameIsValid;
    }

    model_internal function calculateTnkr_eqpt_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tnkr_eqpt_nameValidator.validate(model_internal::_instance.tnkr_eqpt_name)
        model_internal::_tnkr_eqpt_nameIsValid_der = (valRes.results == null);
        model_internal::_tnkr_eqpt_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tnkr_eqpt_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tnkr_eqpt_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_eqpt_nameValidationFailureMessages():Array
    {
        if (model_internal::_tnkr_eqpt_nameValidationFailureMessages == null)
            model_internal::calculateTnkr_eqpt_nameIsValid();

        return _tnkr_eqpt_nameValidationFailureMessages;
    }

    model_internal function set tnkr_eqpt_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tnkr_eqpt_nameValidationFailureMessages;

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
            model_internal::_tnkr_eqpt_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_eqpt_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get tnkr_ownerStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tnkr_ownerValidator() : StyleValidator
    {
        return model_internal::_tnkr_ownerValidator;
    }

    model_internal function set _tnkr_ownerIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tnkr_ownerIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tnkr_ownerIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_ownerIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_ownerIsValid():Boolean
    {
        if (!model_internal::_tnkr_ownerIsValidCacheInitialized)
        {
            model_internal::calculateTnkr_ownerIsValid();
        }

        return model_internal::_tnkr_ownerIsValid;
    }

    model_internal function calculateTnkr_ownerIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tnkr_ownerValidator.validate(model_internal::_instance.tnkr_owner)
        model_internal::_tnkr_ownerIsValid_der = (valRes.results == null);
        model_internal::_tnkr_ownerIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tnkr_ownerValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tnkr_ownerValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_ownerValidationFailureMessages():Array
    {
        if (model_internal::_tnkr_ownerValidationFailureMessages == null)
            model_internal::calculateTnkr_ownerIsValid();

        return _tnkr_ownerValidationFailureMessages;
    }

    model_internal function set tnkr_ownerValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tnkr_ownerValidationFailureMessages;

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
            model_internal::_tnkr_ownerValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_ownerValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get tnkr_last_tripStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tnkr_last_tripValidator() : StyleValidator
    {
        return model_internal::_tnkr_last_tripValidator;
    }

    model_internal function set _tnkr_last_tripIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tnkr_last_tripIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tnkr_last_tripIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_last_tripIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_last_tripIsValid():Boolean
    {
        if (!model_internal::_tnkr_last_tripIsValidCacheInitialized)
        {
            model_internal::calculateTnkr_last_tripIsValid();
        }

        return model_internal::_tnkr_last_tripIsValid;
    }

    model_internal function calculateTnkr_last_tripIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tnkr_last_tripValidator.validate(model_internal::_instance.tnkr_last_trip)
        model_internal::_tnkr_last_tripIsValid_der = (valRes.results == null);
        model_internal::_tnkr_last_tripIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tnkr_last_tripValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tnkr_last_tripValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_last_tripValidationFailureMessages():Array
    {
        if (model_internal::_tnkr_last_tripValidationFailureMessages == null)
            model_internal::calculateTnkr_last_tripIsValid();

        return _tnkr_last_tripValidationFailureMessages;
    }

    model_internal function set tnkr_last_tripValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tnkr_last_tripValidationFailureMessages;

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
            model_internal::_tnkr_last_tripValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_last_tripValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get tnkr_base_siteStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tnkr_base_siteValidator() : StyleValidator
    {
        return model_internal::_tnkr_base_siteValidator;
    }

    model_internal function set _tnkr_base_siteIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tnkr_base_siteIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tnkr_base_siteIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_base_siteIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_base_siteIsValid():Boolean
    {
        if (!model_internal::_tnkr_base_siteIsValidCacheInitialized)
        {
            model_internal::calculateTnkr_base_siteIsValid();
        }

        return model_internal::_tnkr_base_siteIsValid;
    }

    model_internal function calculateTnkr_base_siteIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tnkr_base_siteValidator.validate(model_internal::_instance.tnkr_base_site)
        model_internal::_tnkr_base_siteIsValid_der = (valRes.results == null);
        model_internal::_tnkr_base_siteIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tnkr_base_siteValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tnkr_base_siteValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_base_siteValidationFailureMessages():Array
    {
        if (model_internal::_tnkr_base_siteValidationFailureMessages == null)
            model_internal::calculateTnkr_base_siteIsValid();

        return _tnkr_base_siteValidationFailureMessages;
    }

    model_internal function set tnkr_base_siteValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tnkr_base_siteValidationFailureMessages;

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
            model_internal::_tnkr_base_siteValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_base_siteValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get tnkr_dglic_expStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tnkr_dglic_expValidator() : StyleValidator
    {
        return model_internal::_tnkr_dglic_expValidator;
    }

    model_internal function set _tnkr_dglic_expIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tnkr_dglic_expIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tnkr_dglic_expIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_dglic_expIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_dglic_expIsValid():Boolean
    {
        if (!model_internal::_tnkr_dglic_expIsValidCacheInitialized)
        {
            model_internal::calculateTnkr_dglic_expIsValid();
        }

        return model_internal::_tnkr_dglic_expIsValid;
    }

    model_internal function calculateTnkr_dglic_expIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tnkr_dglic_expValidator.validate(model_internal::_instance.tnkr_dglic_exp)
        model_internal::_tnkr_dglic_expIsValid_der = (valRes.results == null);
        model_internal::_tnkr_dglic_expIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tnkr_dglic_expValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tnkr_dglic_expValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_dglic_expValidationFailureMessages():Array
    {
        if (model_internal::_tnkr_dglic_expValidationFailureMessages == null)
            model_internal::calculateTnkr_dglic_expIsValid();

        return _tnkr_dglic_expValidationFailureMessages;
    }

    model_internal function set tnkr_dglic_expValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tnkr_dglic_expValidationFailureMessages;

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
            model_internal::_tnkr_dglic_expValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_dglic_expValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get remarksStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get remarksValidator() : StyleValidator
    {
        return model_internal::_remarksValidator;
    }

    model_internal function set _remarksIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_remarksIsValid;         
        if (oldValue !== value)
        {
            model_internal::_remarksIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "remarksIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get remarksIsValid():Boolean
    {
        if (!model_internal::_remarksIsValidCacheInitialized)
        {
            model_internal::calculateRemarksIsValid();
        }

        return model_internal::_remarksIsValid;
    }

    model_internal function calculateRemarksIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_remarksValidator.validate(model_internal::_instance.remarks)
        model_internal::_remarksIsValid_der = (valRes.results == null);
        model_internal::_remarksIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::remarksValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::remarksValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get remarksValidationFailureMessages():Array
    {
        if (model_internal::_remarksValidationFailureMessages == null)
            model_internal::calculateRemarksIsValid();

        return _remarksValidationFailureMessages;
    }

    model_internal function set remarksValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_remarksValidationFailureMessages;

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
            model_internal::_remarksValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "remarksValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get tnkr_pinStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tnkr_pinValidator() : StyleValidator
    {
        return model_internal::_tnkr_pinValidator;
    }

    model_internal function set _tnkr_pinIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tnkr_pinIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tnkr_pinIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_pinIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_pinIsValid():Boolean
    {
        if (!model_internal::_tnkr_pinIsValidCacheInitialized)
        {
            model_internal::calculateTnkr_pinIsValid();
        }

        return model_internal::_tnkr_pinIsValid;
    }

    model_internal function calculateTnkr_pinIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tnkr_pinValidator.validate(model_internal::_instance.tnkr_pin)
        model_internal::_tnkr_pinIsValid_der = (valRes.results == null);
        model_internal::_tnkr_pinIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tnkr_pinValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tnkr_pinValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_pinValidationFailureMessages():Array
    {
        if (model_internal::_tnkr_pinValidationFailureMessages == null)
            model_internal::calculateTnkr_pinIsValid();

        return _tnkr_pinValidationFailureMessages;
    }

    model_internal function set tnkr_pinValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tnkr_pinValidationFailureMessages;

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
            model_internal::_tnkr_pinValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_pinValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get tnkr_ntripsStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tnkr_ntripsValidator() : StyleValidator
    {
        return model_internal::_tnkr_ntripsValidator;
    }

    model_internal function set _tnkr_ntripsIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tnkr_ntripsIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tnkr_ntripsIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_ntripsIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_ntripsIsValid():Boolean
    {
        if (!model_internal::_tnkr_ntripsIsValidCacheInitialized)
        {
            model_internal::calculateTnkr_ntripsIsValid();
        }

        return model_internal::_tnkr_ntripsIsValid;
    }

    model_internal function calculateTnkr_ntripsIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tnkr_ntripsValidator.validate(model_internal::_instance.tnkr_ntrips)
        model_internal::_tnkr_ntripsIsValid_der = (valRes.results == null);
        model_internal::_tnkr_ntripsIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tnkr_ntripsValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tnkr_ntripsValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_ntripsValidationFailureMessages():Array
    {
        if (model_internal::_tnkr_ntripsValidationFailureMessages == null)
            model_internal::calculateTnkr_ntripsIsValid();

        return _tnkr_ntripsValidationFailureMessages;
    }

    model_internal function set tnkr_ntripsValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tnkr_ntripsValidationFailureMessages;

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
            model_internal::_tnkr_ntripsValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_ntripsValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get tnkr_max_kgStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tnkr_max_kgValidator() : StyleValidator
    {
        return model_internal::_tnkr_max_kgValidator;
    }

    model_internal function set _tnkr_max_kgIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tnkr_max_kgIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tnkr_max_kgIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_max_kgIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_max_kgIsValid():Boolean
    {
        if (!model_internal::_tnkr_max_kgIsValidCacheInitialized)
        {
            model_internal::calculateTnkr_max_kgIsValid();
        }

        return model_internal::_tnkr_max_kgIsValid;
    }

    model_internal function calculateTnkr_max_kgIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tnkr_max_kgValidator.validate(model_internal::_instance.tnkr_max_kg)
        model_internal::_tnkr_max_kgIsValid_der = (valRes.results == null);
        model_internal::_tnkr_max_kgIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tnkr_max_kgValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tnkr_max_kgValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_max_kgValidationFailureMessages():Array
    {
        if (model_internal::_tnkr_max_kgValidationFailureMessages == null)
            model_internal::calculateTnkr_max_kgIsValid();

        return _tnkr_max_kgValidationFailureMessages;
    }

    model_internal function set tnkr_max_kgValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tnkr_max_kgValidationFailureMessages;

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
            model_internal::_tnkr_max_kgValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_max_kgValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get tnkr_carrier_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tnkr_carrier_nameValidator() : StyleValidator
    {
        return model_internal::_tnkr_carrier_nameValidator;
    }

    model_internal function set _tnkr_carrier_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tnkr_carrier_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tnkr_carrier_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_carrier_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_carrier_nameIsValid():Boolean
    {
        if (!model_internal::_tnkr_carrier_nameIsValidCacheInitialized)
        {
            model_internal::calculateTnkr_carrier_nameIsValid();
        }

        return model_internal::_tnkr_carrier_nameIsValid;
    }

    model_internal function calculateTnkr_carrier_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tnkr_carrier_nameValidator.validate(model_internal::_instance.tnkr_carrier_name)
        model_internal::_tnkr_carrier_nameIsValid_der = (valRes.results == null);
        model_internal::_tnkr_carrier_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tnkr_carrier_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tnkr_carrier_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_carrier_nameValidationFailureMessages():Array
    {
        if (model_internal::_tnkr_carrier_nameValidationFailureMessages == null)
            model_internal::calculateTnkr_carrier_nameIsValid();

        return _tnkr_carrier_nameValidationFailureMessages;
    }

    model_internal function set tnkr_carrier_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tnkr_carrier_nameValidationFailureMessages;

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
            model_internal::_tnkr_carrier_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_carrier_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get tnkr_ins_expStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tnkr_ins_expValidator() : StyleValidator
    {
        return model_internal::_tnkr_ins_expValidator;
    }

    model_internal function set _tnkr_ins_expIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tnkr_ins_expIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tnkr_ins_expIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_ins_expIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_ins_expIsValid():Boolean
    {
        if (!model_internal::_tnkr_ins_expIsValidCacheInitialized)
        {
            model_internal::calculateTnkr_ins_expIsValid();
        }

        return model_internal::_tnkr_ins_expIsValid;
    }

    model_internal function calculateTnkr_ins_expIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tnkr_ins_expValidator.validate(model_internal::_instance.tnkr_ins_exp)
        model_internal::_tnkr_ins_expIsValid_der = (valRes.results == null);
        model_internal::_tnkr_ins_expIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tnkr_ins_expValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tnkr_ins_expValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_ins_expValidationFailureMessages():Array
    {
        if (model_internal::_tnkr_ins_expValidationFailureMessages == null)
            model_internal::calculateTnkr_ins_expIsValid();

        return _tnkr_ins_expValidationFailureMessages;
    }

    model_internal function set tnkr_ins_expValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tnkr_ins_expValidationFailureMessages;

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
            model_internal::_tnkr_ins_expValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_ins_expValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get tnkr_dest_depotStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tnkr_dest_depotValidator() : StyleValidator
    {
        return model_internal::_tnkr_dest_depotValidator;
    }

    model_internal function set _tnkr_dest_depotIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tnkr_dest_depotIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tnkr_dest_depotIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_dest_depotIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_dest_depotIsValid():Boolean
    {
        if (!model_internal::_tnkr_dest_depotIsValidCacheInitialized)
        {
            model_internal::calculateTnkr_dest_depotIsValid();
        }

        return model_internal::_tnkr_dest_depotIsValid;
    }

    model_internal function calculateTnkr_dest_depotIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tnkr_dest_depotValidator.validate(model_internal::_instance.tnkr_dest_depot)
        model_internal::_tnkr_dest_depotIsValid_der = (valRes.results == null);
        model_internal::_tnkr_dest_depotIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tnkr_dest_depotValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tnkr_dest_depotValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_dest_depotValidationFailureMessages():Array
    {
        if (model_internal::_tnkr_dest_depotValidationFailureMessages == null)
            model_internal::calculateTnkr_dest_depotIsValid();

        return _tnkr_dest_depotValidationFailureMessages;
    }

    model_internal function set tnkr_dest_depotValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tnkr_dest_depotValidationFailureMessages;

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
            model_internal::_tnkr_dest_depotValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_dest_depotValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get tnkr_cur_depotStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tnkr_cur_depotValidator() : StyleValidator
    {
        return model_internal::_tnkr_cur_depotValidator;
    }

    model_internal function set _tnkr_cur_depotIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tnkr_cur_depotIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tnkr_cur_depotIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_cur_depotIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_cur_depotIsValid():Boolean
    {
        if (!model_internal::_tnkr_cur_depotIsValidCacheInitialized)
        {
            model_internal::calculateTnkr_cur_depotIsValid();
        }

        return model_internal::_tnkr_cur_depotIsValid;
    }

    model_internal function calculateTnkr_cur_depotIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tnkr_cur_depotValidator.validate(model_internal::_instance.tnkr_cur_depot)
        model_internal::_tnkr_cur_depotIsValid_der = (valRes.results == null);
        model_internal::_tnkr_cur_depotIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tnkr_cur_depotValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tnkr_cur_depotValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_cur_depotValidationFailureMessages():Array
    {
        if (model_internal::_tnkr_cur_depotValidationFailureMessages == null)
            model_internal::calculateTnkr_cur_depotIsValid();

        return _tnkr_cur_depotValidationFailureMessages;
    }

    model_internal function set tnkr_cur_depotValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tnkr_cur_depotValidationFailureMessages;

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
            model_internal::_tnkr_cur_depotValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_cur_depotValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get tnkr_last_depotStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tnkr_last_depotValidator() : StyleValidator
    {
        return model_internal::_tnkr_last_depotValidator;
    }

    model_internal function set _tnkr_last_depotIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tnkr_last_depotIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tnkr_last_depotIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_last_depotIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_last_depotIsValid():Boolean
    {
        if (!model_internal::_tnkr_last_depotIsValidCacheInitialized)
        {
            model_internal::calculateTnkr_last_depotIsValid();
        }

        return model_internal::_tnkr_last_depotIsValid;
    }

    model_internal function calculateTnkr_last_depotIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tnkr_last_depotValidator.validate(model_internal::_instance.tnkr_last_depot)
        model_internal::_tnkr_last_depotIsValid_der = (valRes.results == null);
        model_internal::_tnkr_last_depotIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tnkr_last_depotValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tnkr_last_depotValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_last_depotValidationFailureMessages():Array
    {
        if (model_internal::_tnkr_last_depotValidationFailureMessages == null)
            model_internal::calculateTnkr_last_depotIsValid();

        return _tnkr_last_depotValidationFailureMessages;
    }

    model_internal function set tnkr_last_depotValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tnkr_last_depotValidationFailureMessages;

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
            model_internal::_tnkr_last_depotValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_last_depotValidationFailureMessages", oldValue, value));
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
    public function get tnkr_archiveStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tnkr_archiveValidator() : StyleValidator
    {
        return model_internal::_tnkr_archiveValidator;
    }

    model_internal function set _tnkr_archiveIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tnkr_archiveIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tnkr_archiveIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_archiveIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_archiveIsValid():Boolean
    {
        if (!model_internal::_tnkr_archiveIsValidCacheInitialized)
        {
            model_internal::calculateTnkr_archiveIsValid();
        }

        return model_internal::_tnkr_archiveIsValid;
    }

    model_internal function calculateTnkr_archiveIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tnkr_archiveValidator.validate(model_internal::_instance.tnkr_archive)
        model_internal::_tnkr_archiveIsValid_der = (valRes.results == null);
        model_internal::_tnkr_archiveIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tnkr_archiveValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tnkr_archiveValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_archiveValidationFailureMessages():Array
    {
        if (model_internal::_tnkr_archiveValidationFailureMessages == null)
            model_internal::calculateTnkr_archiveIsValid();

        return _tnkr_archiveValidationFailureMessages;
    }

    model_internal function set tnkr_archiveValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tnkr_archiveValidationFailureMessages;

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
            model_internal::_tnkr_archiveValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_archiveValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get tnkr_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tnkr_nameValidator() : StyleValidator
    {
        return model_internal::_tnkr_nameValidator;
    }

    model_internal function set _tnkr_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tnkr_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tnkr_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_nameIsValid():Boolean
    {
        if (!model_internal::_tnkr_nameIsValidCacheInitialized)
        {
            model_internal::calculateTnkr_nameIsValid();
        }

        return model_internal::_tnkr_nameIsValid;
    }

    model_internal function calculateTnkr_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tnkr_nameValidator.validate(model_internal::_instance.tnkr_name)
        model_internal::_tnkr_nameIsValid_der = (valRes.results == null);
        model_internal::_tnkr_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tnkr_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tnkr_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_nameValidationFailureMessages():Array
    {
        if (model_internal::_tnkr_nameValidationFailureMessages == null)
            model_internal::calculateTnkr_nameIsValid();

        return _tnkr_nameValidationFailureMessages;
    }

    model_internal function set tnkr_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tnkr_nameValidationFailureMessages;

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
            model_internal::_tnkr_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get tnkr_etpStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tnkr_etpValidator() : StyleValidator
    {
        return model_internal::_tnkr_etpValidator;
    }

    model_internal function set _tnkr_etpIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tnkr_etpIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tnkr_etpIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_etpIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_etpIsValid():Boolean
    {
        if (!model_internal::_tnkr_etpIsValidCacheInitialized)
        {
            model_internal::calculateTnkr_etpIsValid();
        }

        return model_internal::_tnkr_etpIsValid;
    }

    model_internal function calculateTnkr_etpIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tnkr_etpValidator.validate(model_internal::_instance.tnkr_etp)
        model_internal::_tnkr_etpIsValid_der = (valRes.results == null);
        model_internal::_tnkr_etpIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tnkr_etpValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tnkr_etpValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_etpValidationFailureMessages():Array
    {
        if (model_internal::_tnkr_etpValidationFailureMessages == null)
            model_internal::calculateTnkr_etpIsValid();

        return _tnkr_etpValidationFailureMessages;
    }

    model_internal function set tnkr_etpValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tnkr_etpValidationFailureMessages;

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
            model_internal::_tnkr_etpValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_etpValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get tnkr_last_depot_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tnkr_last_depot_nameValidator() : StyleValidator
    {
        return model_internal::_tnkr_last_depot_nameValidator;
    }

    model_internal function set _tnkr_last_depot_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tnkr_last_depot_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tnkr_last_depot_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_last_depot_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_last_depot_nameIsValid():Boolean
    {
        if (!model_internal::_tnkr_last_depot_nameIsValidCacheInitialized)
        {
            model_internal::calculateTnkr_last_depot_nameIsValid();
        }

        return model_internal::_tnkr_last_depot_nameIsValid;
    }

    model_internal function calculateTnkr_last_depot_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tnkr_last_depot_nameValidator.validate(model_internal::_instance.tnkr_last_depot_name)
        model_internal::_tnkr_last_depot_nameIsValid_der = (valRes.results == null);
        model_internal::_tnkr_last_depot_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tnkr_last_depot_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tnkr_last_depot_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_last_depot_nameValidationFailureMessages():Array
    {
        if (model_internal::_tnkr_last_depot_nameValidationFailureMessages == null)
            model_internal::calculateTnkr_last_depot_nameIsValid();

        return _tnkr_last_depot_nameValidationFailureMessages;
    }

    model_internal function set tnkr_last_depot_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tnkr_last_depot_nameValidationFailureMessages;

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
            model_internal::_tnkr_last_depot_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_last_depot_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get tnkr_lic_expStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tnkr_lic_expValidator() : StyleValidator
    {
        return model_internal::_tnkr_lic_expValidator;
    }

    model_internal function set _tnkr_lic_expIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tnkr_lic_expIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tnkr_lic_expIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_lic_expIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_lic_expIsValid():Boolean
    {
        if (!model_internal::_tnkr_lic_expIsValidCacheInitialized)
        {
            model_internal::calculateTnkr_lic_expIsValid();
        }

        return model_internal::_tnkr_lic_expIsValid;
    }

    model_internal function calculateTnkr_lic_expIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tnkr_lic_expValidator.validate(model_internal::_instance.tnkr_lic_exp)
        model_internal::_tnkr_lic_expIsValid_der = (valRes.results == null);
        model_internal::_tnkr_lic_expIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tnkr_lic_expValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tnkr_lic_expValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_lic_expValidationFailureMessages():Array
    {
        if (model_internal::_tnkr_lic_expValidationFailureMessages == null)
            model_internal::calculateTnkr_lic_expIsValid();

        return _tnkr_lic_expValidationFailureMessages;
    }

    model_internal function set tnkr_lic_expValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tnkr_lic_expValidationFailureMessages;

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
            model_internal::_tnkr_lic_expValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_lic_expValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get tnkr_lockStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tnkr_lockValidator() : StyleValidator
    {
        return model_internal::_tnkr_lockValidator;
    }

    model_internal function set _tnkr_lockIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tnkr_lockIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tnkr_lockIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_lockIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_lockIsValid():Boolean
    {
        if (!model_internal::_tnkr_lockIsValidCacheInitialized)
        {
            model_internal::calculateTnkr_lockIsValid();
        }

        return model_internal::_tnkr_lockIsValid;
    }

    model_internal function calculateTnkr_lockIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tnkr_lockValidator.validate(model_internal::_instance.tnkr_lock)
        model_internal::_tnkr_lockIsValid_der = (valRes.results == null);
        model_internal::_tnkr_lockIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tnkr_lockValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tnkr_lockValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_lockValidationFailureMessages():Array
    {
        if (model_internal::_tnkr_lockValidationFailureMessages == null)
            model_internal::calculateTnkr_lockIsValid();

        return _tnkr_lockValidationFailureMessages;
    }

    model_internal function set tnkr_lockValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tnkr_lockValidationFailureMessages;

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
            model_internal::_tnkr_lockValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_lockValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get tnkr_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tnkr_codeValidator() : StyleValidator
    {
        return model_internal::_tnkr_codeValidator;
    }

    model_internal function set _tnkr_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tnkr_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tnkr_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_codeIsValid():Boolean
    {
        if (!model_internal::_tnkr_codeIsValidCacheInitialized)
        {
            model_internal::calculateTnkr_codeIsValid();
        }

        return model_internal::_tnkr_codeIsValid;
    }

    model_internal function calculateTnkr_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tnkr_codeValidator.validate(model_internal::_instance.tnkr_code)
        model_internal::_tnkr_codeIsValid_der = (valRes.results == null);
        model_internal::_tnkr_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tnkr_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tnkr_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_codeValidationFailureMessages():Array
    {
        if (model_internal::_tnkr_codeValidationFailureMessages == null)
            model_internal::calculateTnkr_codeIsValid();

        return _tnkr_codeValidationFailureMessages;
    }

    model_internal function set tnkr_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tnkr_codeValidationFailureMessages;

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
            model_internal::_tnkr_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get tnkr_bay_loop_chStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tnkr_bay_loop_chValidator() : StyleValidator
    {
        return model_internal::_tnkr_bay_loop_chValidator;
    }

    model_internal function set _tnkr_bay_loop_chIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tnkr_bay_loop_chIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tnkr_bay_loop_chIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_bay_loop_chIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_bay_loop_chIsValid():Boolean
    {
        if (!model_internal::_tnkr_bay_loop_chIsValidCacheInitialized)
        {
            model_internal::calculateTnkr_bay_loop_chIsValid();
        }

        return model_internal::_tnkr_bay_loop_chIsValid;
    }

    model_internal function calculateTnkr_bay_loop_chIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tnkr_bay_loop_chValidator.validate(model_internal::_instance.tnkr_bay_loop_ch)
        model_internal::_tnkr_bay_loop_chIsValid_der = (valRes.results == null);
        model_internal::_tnkr_bay_loop_chIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tnkr_bay_loop_chValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tnkr_bay_loop_chValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_bay_loop_chValidationFailureMessages():Array
    {
        if (model_internal::_tnkr_bay_loop_chValidationFailureMessages == null)
            model_internal::calculateTnkr_bay_loop_chIsValid();

        return _tnkr_bay_loop_chValidationFailureMessages;
    }

    model_internal function set tnkr_bay_loop_chValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tnkr_bay_loop_chValidationFailureMessages;

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
            model_internal::_tnkr_bay_loop_chValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_bay_loop_chValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get tnkr_own_txtStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tnkr_own_txtValidator() : StyleValidator
    {
        return model_internal::_tnkr_own_txtValidator;
    }

    model_internal function set _tnkr_own_txtIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tnkr_own_txtIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tnkr_own_txtIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_own_txtIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_own_txtIsValid():Boolean
    {
        if (!model_internal::_tnkr_own_txtIsValidCacheInitialized)
        {
            model_internal::calculateTnkr_own_txtIsValid();
        }

        return model_internal::_tnkr_own_txtIsValid;
    }

    model_internal function calculateTnkr_own_txtIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tnkr_own_txtValidator.validate(model_internal::_instance.tnkr_own_txt)
        model_internal::_tnkr_own_txtIsValid_der = (valRes.results == null);
        model_internal::_tnkr_own_txtIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tnkr_own_txtValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tnkr_own_txtValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_own_txtValidationFailureMessages():Array
    {
        if (model_internal::_tnkr_own_txtValidationFailureMessages == null)
            model_internal::calculateTnkr_own_txtIsValid();

        return _tnkr_own_txtValidationFailureMessages;
    }

    model_internal function set tnkr_own_txtValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tnkr_own_txtValidationFailureMessages;

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
            model_internal::_tnkr_own_txtValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_own_txtValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get tnkr_dest_depot_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tnkr_dest_depot_nameValidator() : StyleValidator
    {
        return model_internal::_tnkr_dest_depot_nameValidator;
    }

    model_internal function set _tnkr_dest_depot_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tnkr_dest_depot_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tnkr_dest_depot_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_dest_depot_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_dest_depot_nameIsValid():Boolean
    {
        if (!model_internal::_tnkr_dest_depot_nameIsValidCacheInitialized)
        {
            model_internal::calculateTnkr_dest_depot_nameIsValid();
        }

        return model_internal::_tnkr_dest_depot_nameIsValid;
    }

    model_internal function calculateTnkr_dest_depot_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tnkr_dest_depot_nameValidator.validate(model_internal::_instance.tnkr_dest_depot_name)
        model_internal::_tnkr_dest_depot_nameIsValid_der = (valRes.results == null);
        model_internal::_tnkr_dest_depot_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tnkr_dest_depot_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tnkr_dest_depot_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_dest_depot_nameValidationFailureMessages():Array
    {
        if (model_internal::_tnkr_dest_depot_nameValidationFailureMessages == null)
            model_internal::calculateTnkr_dest_depot_nameIsValid();

        return _tnkr_dest_depot_nameValidationFailureMessages;
    }

    model_internal function set tnkr_dest_depot_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tnkr_dest_depot_nameValidationFailureMessages;

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
            model_internal::_tnkr_dest_depot_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_dest_depot_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get tnkr_owner_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tnkr_owner_nameValidator() : StyleValidator
    {
        return model_internal::_tnkr_owner_nameValidator;
    }

    model_internal function set _tnkr_owner_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tnkr_owner_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tnkr_owner_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_owner_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_owner_nameIsValid():Boolean
    {
        if (!model_internal::_tnkr_owner_nameIsValidCacheInitialized)
        {
            model_internal::calculateTnkr_owner_nameIsValid();
        }

        return model_internal::_tnkr_owner_nameIsValid;
    }

    model_internal function calculateTnkr_owner_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tnkr_owner_nameValidator.validate(model_internal::_instance.tnkr_owner_name)
        model_internal::_tnkr_owner_nameIsValid_der = (valRes.results == null);
        model_internal::_tnkr_owner_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tnkr_owner_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tnkr_owner_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_owner_nameValidationFailureMessages():Array
    {
        if (model_internal::_tnkr_owner_nameValidationFailureMessages == null)
            model_internal::calculateTnkr_owner_nameIsValid();

        return _tnkr_owner_nameValidationFailureMessages;
    }

    model_internal function set tnkr_owner_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tnkr_owner_nameValidationFailureMessages;

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
            model_internal::_tnkr_owner_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_owner_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get tnkr_carrierStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tnkr_carrierValidator() : StyleValidator
    {
        return model_internal::_tnkr_carrierValidator;
    }

    model_internal function set _tnkr_carrierIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tnkr_carrierIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tnkr_carrierIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_carrierIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_carrierIsValid():Boolean
    {
        if (!model_internal::_tnkr_carrierIsValidCacheInitialized)
        {
            model_internal::calculateTnkr_carrierIsValid();
        }

        return model_internal::_tnkr_carrierIsValid;
    }

    model_internal function calculateTnkr_carrierIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tnkr_carrierValidator.validate(model_internal::_instance.tnkr_carrier)
        model_internal::_tnkr_carrierIsValid_der = (valRes.results == null);
        model_internal::_tnkr_carrierIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tnkr_carrierValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tnkr_carrierValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_carrierValidationFailureMessages():Array
    {
        if (model_internal::_tnkr_carrierValidationFailureMessages == null)
            model_internal::calculateTnkr_carrierIsValid();

        return _tnkr_carrierValidationFailureMessages;
    }

    model_internal function set tnkr_carrierValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tnkr_carrierValidationFailureMessages;

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
            model_internal::_tnkr_carrierValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_carrierValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get tnkr_activeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tnkr_activeValidator() : StyleValidator
    {
        return model_internal::_tnkr_activeValidator;
    }

    model_internal function set _tnkr_activeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tnkr_activeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tnkr_activeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_activeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_activeIsValid():Boolean
    {
        if (!model_internal::_tnkr_activeIsValidCacheInitialized)
        {
            model_internal::calculateTnkr_activeIsValid();
        }

        return model_internal::_tnkr_activeIsValid;
    }

    model_internal function calculateTnkr_activeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tnkr_activeValidator.validate(model_internal::_instance.tnkr_active)
        model_internal::_tnkr_activeIsValid_der = (valRes.results == null);
        model_internal::_tnkr_activeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tnkr_activeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tnkr_activeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_activeValidationFailureMessages():Array
    {
        if (model_internal::_tnkr_activeValidationFailureMessages == null)
            model_internal::calculateTnkr_activeIsValid();

        return _tnkr_activeValidationFailureMessages;
    }

    model_internal function set tnkr_activeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tnkr_activeValidationFailureMessages;

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
            model_internal::_tnkr_activeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_activeValidationFailureMessages", oldValue, value));
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
            case("etyp_category"):
            {
                return etyp_categoryValidationFailureMessages;
            }
            case("tnkr_base_site_name"):
            {
                return tnkr_base_site_nameValidationFailureMessages;
            }
            case("tnkr_stats"):
            {
                return tnkr_statsValidationFailureMessages;
            }
            case("tnkr_cur_depot_name"):
            {
                return tnkr_cur_depot_nameValidationFailureMessages;
            }
            case("rn"):
            {
                return rnValidationFailureMessages;
            }
            case("tnkr_eqpt_name"):
            {
                return tnkr_eqpt_nameValidationFailureMessages;
            }
            case("tnkr_owner"):
            {
                return tnkr_ownerValidationFailureMessages;
            }
            case("tnkr_last_trip"):
            {
                return tnkr_last_tripValidationFailureMessages;
            }
            case("tnkr_base_site"):
            {
                return tnkr_base_siteValidationFailureMessages;
            }
            case("tnkr_dglic_exp"):
            {
                return tnkr_dglic_expValidationFailureMessages;
            }
            case("remarks"):
            {
                return remarksValidationFailureMessages;
            }
            case("tnkr_pin"):
            {
                return tnkr_pinValidationFailureMessages;
            }
            case("tnkr_ntrips"):
            {
                return tnkr_ntripsValidationFailureMessages;
            }
            case("tnkr_max_kg"):
            {
                return tnkr_max_kgValidationFailureMessages;
            }
            case("tnkr_carrier_name"):
            {
                return tnkr_carrier_nameValidationFailureMessages;
            }
            case("tnkr_ins_exp"):
            {
                return tnkr_ins_expValidationFailureMessages;
            }
            case("tnkr_dest_depot"):
            {
                return tnkr_dest_depotValidationFailureMessages;
            }
            case("tnkr_cur_depot"):
            {
                return tnkr_cur_depotValidationFailureMessages;
            }
            case("tnkr_last_depot"):
            {
                return tnkr_last_depotValidationFailureMessages;
            }
            case("composition"):
            {
                return compositionValidationFailureMessages;
            }
            case("tnkr_archive"):
            {
                return tnkr_archiveValidationFailureMessages;
            }
            case("tnkr_name"):
            {
                return tnkr_nameValidationFailureMessages;
            }
            case("tnkr_etp"):
            {
                return tnkr_etpValidationFailureMessages;
            }
            case("tnkr_last_depot_name"):
            {
                return tnkr_last_depot_nameValidationFailureMessages;
            }
            case("tnkr_lic_exp"):
            {
                return tnkr_lic_expValidationFailureMessages;
            }
            case("tnkr_lock"):
            {
                return tnkr_lockValidationFailureMessages;
            }
            case("tnkr_code"):
            {
                return tnkr_codeValidationFailureMessages;
            }
            case("tnkr_bay_loop_ch"):
            {
                return tnkr_bay_loop_chValidationFailureMessages;
            }
            case("tnkr_own_txt"):
            {
                return tnkr_own_txtValidationFailureMessages;
            }
            case("tnkr_dest_depot_name"):
            {
                return tnkr_dest_depot_nameValidationFailureMessages;
            }
            case("tnkr_owner_name"):
            {
                return tnkr_owner_nameValidationFailureMessages;
            }
            case("tnkr_carrier"):
            {
                return tnkr_carrierValidationFailureMessages;
            }
            case("tnkr_active"):
            {
                return tnkr_activeValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
