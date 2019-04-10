
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
internal class _GUI_AccessKeysEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("kya_equipment", "kya_key_issuer", "rn", "kya_type_name", "kya_personnel", "kya_psnl_name", "kya_role", "kya_tnkr_name", "kya_alloc_type_name", "kya_tanker", "kya_cust_ordno", "kya_tnkr_cmpy", "kya_role_name", "kya_drawer", "kya_issuer_name", "kya_key_created", "kya_pin_changed", "kya_eqpt_cmpy", "kya_adhoc", "kya_alloc_type", "kya_etyp_name", "kya_eqpt_cmpy_name", "kya_draw_name", "kya_cust_name", "kya_alloc_cmpy", "kya_eqpt_name", "kya_phys_name", "kya_order_no", "kya_txt", "kya_trip_no", "kya_timecode", "kya_psnl_cmpy", "kya_load_id", "kya_order_desc", "kya_supp_name", "kya_alloc_cmpy_name", "kya_pin", "kya_phys_type", "kya_eqpt_desc", "kya_tnkr_desc", "kya_type", "kya_psnl_cmpy_name", "kya_lock", "kya_key_no", "kya_supplier", "kya_site_name", "kya_load_site", "kya_tnkr_cmpy_name");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("kya_equipment", "kya_key_issuer", "rn", "kya_type_name", "kya_personnel", "kya_psnl_name", "kya_role", "kya_tnkr_name", "kya_alloc_type_name", "kya_tanker", "kya_cust_ordno", "kya_tnkr_cmpy", "kya_role_name", "kya_drawer", "kya_issuer_name", "kya_key_created", "kya_pin_changed", "kya_eqpt_cmpy", "kya_adhoc", "kya_alloc_type", "kya_etyp_name", "kya_eqpt_cmpy_name", "kya_draw_name", "kya_cust_name", "kya_alloc_cmpy", "kya_eqpt_name", "kya_phys_name", "kya_order_no", "kya_txt", "kya_trip_no", "kya_timecode", "kya_psnl_cmpy", "kya_load_id", "kya_order_desc", "kya_supp_name", "kya_alloc_cmpy_name", "kya_pin", "kya_phys_type", "kya_eqpt_desc", "kya_tnkr_desc", "kya_type", "kya_psnl_cmpy_name", "kya_lock", "kya_key_no", "kya_supplier", "kya_site_name", "kya_load_site", "kya_tnkr_cmpy_name");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("kya_equipment", "kya_key_issuer", "rn", "kya_type_name", "kya_personnel", "kya_psnl_name", "kya_role", "kya_tnkr_name", "kya_alloc_type_name", "kya_tanker", "kya_cust_ordno", "kya_tnkr_cmpy", "kya_role_name", "kya_drawer", "kya_issuer_name", "kya_key_created", "kya_pin_changed", "kya_eqpt_cmpy", "kya_adhoc", "kya_alloc_type", "kya_etyp_name", "kya_eqpt_cmpy_name", "kya_draw_name", "kya_cust_name", "kya_alloc_cmpy", "kya_eqpt_name", "kya_phys_name", "kya_order_no", "kya_txt", "kya_trip_no", "kya_timecode", "kya_psnl_cmpy", "kya_load_id", "kya_order_desc", "kya_supp_name", "kya_alloc_cmpy_name", "kya_pin", "kya_phys_type", "kya_eqpt_desc", "kya_tnkr_desc", "kya_type", "kya_psnl_cmpy_name", "kya_lock", "kya_key_no", "kya_supplier", "kya_site_name", "kya_load_site", "kya_tnkr_cmpy_name");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("kya_equipment", "kya_key_issuer", "rn", "kya_type_name", "kya_personnel", "kya_psnl_name", "kya_role", "kya_tnkr_name", "kya_alloc_type_name", "kya_tanker", "kya_cust_ordno", "kya_tnkr_cmpy", "kya_role_name", "kya_drawer", "kya_issuer_name", "kya_key_created", "kya_pin_changed", "kya_eqpt_cmpy", "kya_adhoc", "kya_alloc_type", "kya_etyp_name", "kya_eqpt_cmpy_name", "kya_draw_name", "kya_cust_name", "kya_alloc_cmpy", "kya_eqpt_name", "kya_phys_name", "kya_order_no", "kya_txt", "kya_trip_no", "kya_timecode", "kya_psnl_cmpy", "kya_load_id", "kya_order_desc", "kya_supp_name", "kya_alloc_cmpy_name", "kya_pin", "kya_phys_type", "kya_eqpt_desc", "kya_tnkr_desc", "kya_type", "kya_psnl_cmpy_name", "kya_lock", "kya_key_no", "kya_supplier", "kya_site_name", "kya_load_site", "kya_tnkr_cmpy_name");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("kya_equipment", "kya_key_issuer", "rn", "kya_type_name", "kya_personnel", "kya_psnl_name", "kya_role", "kya_tnkr_name", "kya_alloc_type_name", "kya_tanker", "kya_cust_ordno", "kya_tnkr_cmpy", "kya_role_name", "kya_drawer", "kya_issuer_name", "kya_key_created", "kya_pin_changed", "kya_eqpt_cmpy", "kya_adhoc", "kya_alloc_type", "kya_etyp_name", "kya_eqpt_cmpy_name", "kya_draw_name", "kya_cust_name", "kya_alloc_cmpy", "kya_eqpt_name", "kya_phys_name", "kya_order_no", "kya_txt", "kya_trip_no", "kya_timecode", "kya_psnl_cmpy", "kya_load_id", "kya_order_desc", "kya_supp_name", "kya_alloc_cmpy_name", "kya_pin", "kya_phys_type", "kya_eqpt_desc", "kya_tnkr_desc", "kya_type", "kya_psnl_cmpy_name", "kya_lock", "kya_key_no", "kya_supplier", "kya_site_name", "kya_load_site", "kya_tnkr_cmpy_name");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "GUI_AccessKeys";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _kya_equipmentIsValid:Boolean;
    model_internal var _kya_equipmentValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _kya_equipmentIsValidCacheInitialized:Boolean = false;
    model_internal var _kya_equipmentValidationFailureMessages:Array;
    
    model_internal var _kya_key_issuerIsValid:Boolean;
    model_internal var _kya_key_issuerValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _kya_key_issuerIsValidCacheInitialized:Boolean = false;
    model_internal var _kya_key_issuerValidationFailureMessages:Array;
    
    model_internal var _kya_type_nameIsValid:Boolean;
    model_internal var _kya_type_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _kya_type_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _kya_type_nameValidationFailureMessages:Array;
    
    model_internal var _kya_personnelIsValid:Boolean;
    model_internal var _kya_personnelValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _kya_personnelIsValidCacheInitialized:Boolean = false;
    model_internal var _kya_personnelValidationFailureMessages:Array;
    
    model_internal var _kya_psnl_nameIsValid:Boolean;
    model_internal var _kya_psnl_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _kya_psnl_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _kya_psnl_nameValidationFailureMessages:Array;
    
    model_internal var _kya_roleIsValid:Boolean;
    model_internal var _kya_roleValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _kya_roleIsValidCacheInitialized:Boolean = false;
    model_internal var _kya_roleValidationFailureMessages:Array;
    
    model_internal var _kya_tnkr_nameIsValid:Boolean;
    model_internal var _kya_tnkr_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _kya_tnkr_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _kya_tnkr_nameValidationFailureMessages:Array;
    
    model_internal var _kya_alloc_type_nameIsValid:Boolean;
    model_internal var _kya_alloc_type_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _kya_alloc_type_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _kya_alloc_type_nameValidationFailureMessages:Array;
    
    model_internal var _kya_tankerIsValid:Boolean;
    model_internal var _kya_tankerValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _kya_tankerIsValidCacheInitialized:Boolean = false;
    model_internal var _kya_tankerValidationFailureMessages:Array;
    
    model_internal var _kya_cust_ordnoIsValid:Boolean;
    model_internal var _kya_cust_ordnoValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _kya_cust_ordnoIsValidCacheInitialized:Boolean = false;
    model_internal var _kya_cust_ordnoValidationFailureMessages:Array;
    
    model_internal var _kya_tnkr_cmpyIsValid:Boolean;
    model_internal var _kya_tnkr_cmpyValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _kya_tnkr_cmpyIsValidCacheInitialized:Boolean = false;
    model_internal var _kya_tnkr_cmpyValidationFailureMessages:Array;
    
    model_internal var _kya_role_nameIsValid:Boolean;
    model_internal var _kya_role_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _kya_role_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _kya_role_nameValidationFailureMessages:Array;
    
    model_internal var _kya_drawerIsValid:Boolean;
    model_internal var _kya_drawerValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _kya_drawerIsValidCacheInitialized:Boolean = false;
    model_internal var _kya_drawerValidationFailureMessages:Array;
    
    model_internal var _kya_issuer_nameIsValid:Boolean;
    model_internal var _kya_issuer_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _kya_issuer_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _kya_issuer_nameValidationFailureMessages:Array;
    
    model_internal var _kya_key_createdIsValid:Boolean;
    model_internal var _kya_key_createdValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _kya_key_createdIsValidCacheInitialized:Boolean = false;
    model_internal var _kya_key_createdValidationFailureMessages:Array;
    
    model_internal var _kya_pin_changedIsValid:Boolean;
    model_internal var _kya_pin_changedValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _kya_pin_changedIsValidCacheInitialized:Boolean = false;
    model_internal var _kya_pin_changedValidationFailureMessages:Array;
    
    model_internal var _kya_eqpt_cmpyIsValid:Boolean;
    model_internal var _kya_eqpt_cmpyValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _kya_eqpt_cmpyIsValidCacheInitialized:Boolean = false;
    model_internal var _kya_eqpt_cmpyValidationFailureMessages:Array;
    
    model_internal var _kya_adhocIsValid:Boolean;
    model_internal var _kya_adhocValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _kya_adhocIsValidCacheInitialized:Boolean = false;
    model_internal var _kya_adhocValidationFailureMessages:Array;
    
    model_internal var _kya_alloc_typeIsValid:Boolean;
    model_internal var _kya_alloc_typeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _kya_alloc_typeIsValidCacheInitialized:Boolean = false;
    model_internal var _kya_alloc_typeValidationFailureMessages:Array;
    
    model_internal var _kya_etyp_nameIsValid:Boolean;
    model_internal var _kya_etyp_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _kya_etyp_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _kya_etyp_nameValidationFailureMessages:Array;
    
    model_internal var _kya_eqpt_cmpy_nameIsValid:Boolean;
    model_internal var _kya_eqpt_cmpy_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _kya_eqpt_cmpy_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _kya_eqpt_cmpy_nameValidationFailureMessages:Array;
    
    model_internal var _kya_draw_nameIsValid:Boolean;
    model_internal var _kya_draw_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _kya_draw_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _kya_draw_nameValidationFailureMessages:Array;
    
    model_internal var _kya_cust_nameIsValid:Boolean;
    model_internal var _kya_cust_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _kya_cust_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _kya_cust_nameValidationFailureMessages:Array;
    
    model_internal var _kya_alloc_cmpyIsValid:Boolean;
    model_internal var _kya_alloc_cmpyValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _kya_alloc_cmpyIsValidCacheInitialized:Boolean = false;
    model_internal var _kya_alloc_cmpyValidationFailureMessages:Array;
    
    model_internal var _kya_eqpt_nameIsValid:Boolean;
    model_internal var _kya_eqpt_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _kya_eqpt_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _kya_eqpt_nameValidationFailureMessages:Array;
    
    model_internal var _kya_phys_nameIsValid:Boolean;
    model_internal var _kya_phys_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _kya_phys_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _kya_phys_nameValidationFailureMessages:Array;
    
    model_internal var _kya_order_noIsValid:Boolean;
    model_internal var _kya_order_noValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _kya_order_noIsValidCacheInitialized:Boolean = false;
    model_internal var _kya_order_noValidationFailureMessages:Array;
    
    model_internal var _kya_txtIsValid:Boolean;
    model_internal var _kya_txtValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _kya_txtIsValidCacheInitialized:Boolean = false;
    model_internal var _kya_txtValidationFailureMessages:Array;
    
    model_internal var _kya_trip_noIsValid:Boolean;
    model_internal var _kya_trip_noValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _kya_trip_noIsValidCacheInitialized:Boolean = false;
    model_internal var _kya_trip_noValidationFailureMessages:Array;
    
    model_internal var _kya_timecodeIsValid:Boolean;
    model_internal var _kya_timecodeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _kya_timecodeIsValidCacheInitialized:Boolean = false;
    model_internal var _kya_timecodeValidationFailureMessages:Array;
    
    model_internal var _kya_psnl_cmpyIsValid:Boolean;
    model_internal var _kya_psnl_cmpyValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _kya_psnl_cmpyIsValidCacheInitialized:Boolean = false;
    model_internal var _kya_psnl_cmpyValidationFailureMessages:Array;
    
    model_internal var _kya_load_idIsValid:Boolean;
    model_internal var _kya_load_idValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _kya_load_idIsValidCacheInitialized:Boolean = false;
    model_internal var _kya_load_idValidationFailureMessages:Array;
    
    model_internal var _kya_order_descIsValid:Boolean;
    model_internal var _kya_order_descValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _kya_order_descIsValidCacheInitialized:Boolean = false;
    model_internal var _kya_order_descValidationFailureMessages:Array;
    
    model_internal var _kya_supp_nameIsValid:Boolean;
    model_internal var _kya_supp_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _kya_supp_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _kya_supp_nameValidationFailureMessages:Array;
    
    model_internal var _kya_alloc_cmpy_nameIsValid:Boolean;
    model_internal var _kya_alloc_cmpy_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _kya_alloc_cmpy_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _kya_alloc_cmpy_nameValidationFailureMessages:Array;
    
    model_internal var _kya_pinIsValid:Boolean;
    model_internal var _kya_pinValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _kya_pinIsValidCacheInitialized:Boolean = false;
    model_internal var _kya_pinValidationFailureMessages:Array;
    
    model_internal var _kya_phys_typeIsValid:Boolean;
    model_internal var _kya_phys_typeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _kya_phys_typeIsValidCacheInitialized:Boolean = false;
    model_internal var _kya_phys_typeValidationFailureMessages:Array;
    
    model_internal var _kya_eqpt_descIsValid:Boolean;
    model_internal var _kya_eqpt_descValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _kya_eqpt_descIsValidCacheInitialized:Boolean = false;
    model_internal var _kya_eqpt_descValidationFailureMessages:Array;
    
    model_internal var _kya_tnkr_descIsValid:Boolean;
    model_internal var _kya_tnkr_descValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _kya_tnkr_descIsValidCacheInitialized:Boolean = false;
    model_internal var _kya_tnkr_descValidationFailureMessages:Array;
    
    model_internal var _kya_typeIsValid:Boolean;
    model_internal var _kya_typeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _kya_typeIsValidCacheInitialized:Boolean = false;
    model_internal var _kya_typeValidationFailureMessages:Array;
    
    model_internal var _kya_psnl_cmpy_nameIsValid:Boolean;
    model_internal var _kya_psnl_cmpy_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _kya_psnl_cmpy_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _kya_psnl_cmpy_nameValidationFailureMessages:Array;
    
    model_internal var _kya_lockIsValid:Boolean;
    model_internal var _kya_lockValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _kya_lockIsValidCacheInitialized:Boolean = false;
    model_internal var _kya_lockValidationFailureMessages:Array;
    
    model_internal var _kya_key_noIsValid:Boolean;
    model_internal var _kya_key_noValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _kya_key_noIsValidCacheInitialized:Boolean = false;
    model_internal var _kya_key_noValidationFailureMessages:Array;
    
    model_internal var _kya_supplierIsValid:Boolean;
    model_internal var _kya_supplierValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _kya_supplierIsValidCacheInitialized:Boolean = false;
    model_internal var _kya_supplierValidationFailureMessages:Array;
    
    model_internal var _kya_site_nameIsValid:Boolean;
    model_internal var _kya_site_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _kya_site_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _kya_site_nameValidationFailureMessages:Array;
    
    model_internal var _kya_load_siteIsValid:Boolean;
    model_internal var _kya_load_siteValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _kya_load_siteIsValidCacheInitialized:Boolean = false;
    model_internal var _kya_load_siteValidationFailureMessages:Array;
    
    model_internal var _kya_tnkr_cmpy_nameIsValid:Boolean;
    model_internal var _kya_tnkr_cmpy_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _kya_tnkr_cmpy_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _kya_tnkr_cmpy_nameValidationFailureMessages:Array;

    model_internal var _instance:_Super_GUI_AccessKeys;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _GUI_AccessKeysEntityMetadata(value : _Super_GUI_AccessKeys)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["kya_equipment"] = new Array();
            model_internal::dependentsOnMap["kya_key_issuer"] = new Array();
            model_internal::dependentsOnMap["rn"] = new Array();
            model_internal::dependentsOnMap["kya_type_name"] = new Array();
            model_internal::dependentsOnMap["kya_personnel"] = new Array();
            model_internal::dependentsOnMap["kya_psnl_name"] = new Array();
            model_internal::dependentsOnMap["kya_role"] = new Array();
            model_internal::dependentsOnMap["kya_tnkr_name"] = new Array();
            model_internal::dependentsOnMap["kya_alloc_type_name"] = new Array();
            model_internal::dependentsOnMap["kya_tanker"] = new Array();
            model_internal::dependentsOnMap["kya_cust_ordno"] = new Array();
            model_internal::dependentsOnMap["kya_tnkr_cmpy"] = new Array();
            model_internal::dependentsOnMap["kya_role_name"] = new Array();
            model_internal::dependentsOnMap["kya_drawer"] = new Array();
            model_internal::dependentsOnMap["kya_issuer_name"] = new Array();
            model_internal::dependentsOnMap["kya_key_created"] = new Array();
            model_internal::dependentsOnMap["kya_pin_changed"] = new Array();
            model_internal::dependentsOnMap["kya_eqpt_cmpy"] = new Array();
            model_internal::dependentsOnMap["kya_adhoc"] = new Array();
            model_internal::dependentsOnMap["kya_alloc_type"] = new Array();
            model_internal::dependentsOnMap["kya_etyp_name"] = new Array();
            model_internal::dependentsOnMap["kya_eqpt_cmpy_name"] = new Array();
            model_internal::dependentsOnMap["kya_draw_name"] = new Array();
            model_internal::dependentsOnMap["kya_cust_name"] = new Array();
            model_internal::dependentsOnMap["kya_alloc_cmpy"] = new Array();
            model_internal::dependentsOnMap["kya_eqpt_name"] = new Array();
            model_internal::dependentsOnMap["kya_phys_name"] = new Array();
            model_internal::dependentsOnMap["kya_order_no"] = new Array();
            model_internal::dependentsOnMap["kya_txt"] = new Array();
            model_internal::dependentsOnMap["kya_trip_no"] = new Array();
            model_internal::dependentsOnMap["kya_timecode"] = new Array();
            model_internal::dependentsOnMap["kya_psnl_cmpy"] = new Array();
            model_internal::dependentsOnMap["kya_load_id"] = new Array();
            model_internal::dependentsOnMap["kya_order_desc"] = new Array();
            model_internal::dependentsOnMap["kya_supp_name"] = new Array();
            model_internal::dependentsOnMap["kya_alloc_cmpy_name"] = new Array();
            model_internal::dependentsOnMap["kya_pin"] = new Array();
            model_internal::dependentsOnMap["kya_phys_type"] = new Array();
            model_internal::dependentsOnMap["kya_eqpt_desc"] = new Array();
            model_internal::dependentsOnMap["kya_tnkr_desc"] = new Array();
            model_internal::dependentsOnMap["kya_type"] = new Array();
            model_internal::dependentsOnMap["kya_psnl_cmpy_name"] = new Array();
            model_internal::dependentsOnMap["kya_lock"] = new Array();
            model_internal::dependentsOnMap["kya_key_no"] = new Array();
            model_internal::dependentsOnMap["kya_supplier"] = new Array();
            model_internal::dependentsOnMap["kya_site_name"] = new Array();
            model_internal::dependentsOnMap["kya_load_site"] = new Array();
            model_internal::dependentsOnMap["kya_tnkr_cmpy_name"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["kya_equipment"] = "Object";
        model_internal::propertyTypeMap["kya_key_issuer"] = "String";
        model_internal::propertyTypeMap["rn"] = "String";
        model_internal::propertyTypeMap["kya_type_name"] = "String";
        model_internal::propertyTypeMap["kya_personnel"] = "String";
        model_internal::propertyTypeMap["kya_psnl_name"] = "String";
        model_internal::propertyTypeMap["kya_role"] = "String";
        model_internal::propertyTypeMap["kya_tnkr_name"] = "Object";
        model_internal::propertyTypeMap["kya_alloc_type_name"] = "Object";
        model_internal::propertyTypeMap["kya_tanker"] = "String";
        model_internal::propertyTypeMap["kya_cust_ordno"] = "Object";
        model_internal::propertyTypeMap["kya_tnkr_cmpy"] = "String";
        model_internal::propertyTypeMap["kya_role_name"] = "String";
        model_internal::propertyTypeMap["kya_drawer"] = "String";
        model_internal::propertyTypeMap["kya_issuer_name"] = "String";
        model_internal::propertyTypeMap["kya_key_created"] = "String";
        model_internal::propertyTypeMap["kya_pin_changed"] = "Object";
        model_internal::propertyTypeMap["kya_eqpt_cmpy"] = "Object";
        model_internal::propertyTypeMap["kya_adhoc"] = "String";
        model_internal::propertyTypeMap["kya_alloc_type"] = "Object";
        model_internal::propertyTypeMap["kya_etyp_name"] = "Object";
        model_internal::propertyTypeMap["kya_eqpt_cmpy_name"] = "Object";
        model_internal::propertyTypeMap["kya_draw_name"] = "String";
        model_internal::propertyTypeMap["kya_cust_name"] = "Object";
        model_internal::propertyTypeMap["kya_alloc_cmpy"] = "Object";
        model_internal::propertyTypeMap["kya_eqpt_name"] = "Object";
        model_internal::propertyTypeMap["kya_phys_name"] = "String";
        model_internal::propertyTypeMap["kya_order_no"] = "Object";
        model_internal::propertyTypeMap["kya_txt"] = "String";
        model_internal::propertyTypeMap["kya_trip_no"] = "Object";
        model_internal::propertyTypeMap["kya_timecode"] = "String";
        model_internal::propertyTypeMap["kya_psnl_cmpy"] = "String";
        model_internal::propertyTypeMap["kya_load_id"] = "Object";
        model_internal::propertyTypeMap["kya_order_desc"] = "String";
        model_internal::propertyTypeMap["kya_supp_name"] = "String";
        model_internal::propertyTypeMap["kya_alloc_cmpy_name"] = "Object";
        model_internal::propertyTypeMap["kya_pin"] = "Object";
        model_internal::propertyTypeMap["kya_phys_type"] = "String";
        model_internal::propertyTypeMap["kya_eqpt_desc"] = "Object";
        model_internal::propertyTypeMap["kya_tnkr_desc"] = "String";
        model_internal::propertyTypeMap["kya_type"] = "String";
        model_internal::propertyTypeMap["kya_psnl_cmpy_name"] = "String";
        model_internal::propertyTypeMap["kya_lock"] = "String";
        model_internal::propertyTypeMap["kya_key_no"] = "String";
        model_internal::propertyTypeMap["kya_supplier"] = "String";
        model_internal::propertyTypeMap["kya_site_name"] = "Object";
        model_internal::propertyTypeMap["kya_load_site"] = "Object";
        model_internal::propertyTypeMap["kya_tnkr_cmpy_name"] = "String";

        model_internal::_instance = value;
        model_internal::_kya_equipmentValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKya_equipment);
        model_internal::_kya_equipmentValidator.required = true;
        model_internal::_kya_equipmentValidator.requiredFieldError = "kya_equipment is required";
        //model_internal::_kya_equipmentValidator.source = model_internal::_instance;
        //model_internal::_kya_equipmentValidator.property = "kya_equipment";
        model_internal::_kya_key_issuerValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKya_key_issuer);
        model_internal::_kya_key_issuerValidator.required = true;
        model_internal::_kya_key_issuerValidator.requiredFieldError = "kya_key_issuer is required";
        //model_internal::_kya_key_issuerValidator.source = model_internal::_instance;
        //model_internal::_kya_key_issuerValidator.property = "kya_key_issuer";
        model_internal::_kya_type_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKya_type_name);
        model_internal::_kya_type_nameValidator.required = true;
        model_internal::_kya_type_nameValidator.requiredFieldError = "kya_type_name is required";
        //model_internal::_kya_type_nameValidator.source = model_internal::_instance;
        //model_internal::_kya_type_nameValidator.property = "kya_type_name";
        model_internal::_kya_personnelValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKya_personnel);
        model_internal::_kya_personnelValidator.required = true;
        model_internal::_kya_personnelValidator.requiredFieldError = "kya_personnel is required";
        //model_internal::_kya_personnelValidator.source = model_internal::_instance;
        //model_internal::_kya_personnelValidator.property = "kya_personnel";
        model_internal::_kya_psnl_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKya_psnl_name);
        model_internal::_kya_psnl_nameValidator.required = true;
        model_internal::_kya_psnl_nameValidator.requiredFieldError = "kya_psnl_name is required";
        //model_internal::_kya_psnl_nameValidator.source = model_internal::_instance;
        //model_internal::_kya_psnl_nameValidator.property = "kya_psnl_name";
        model_internal::_kya_roleValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKya_role);
        model_internal::_kya_roleValidator.required = true;
        model_internal::_kya_roleValidator.requiredFieldError = "kya_role is required";
        //model_internal::_kya_roleValidator.source = model_internal::_instance;
        //model_internal::_kya_roleValidator.property = "kya_role";
        model_internal::_kya_tnkr_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKya_tnkr_name);
        model_internal::_kya_tnkr_nameValidator.required = true;
        model_internal::_kya_tnkr_nameValidator.requiredFieldError = "kya_tnkr_name is required";
        //model_internal::_kya_tnkr_nameValidator.source = model_internal::_instance;
        //model_internal::_kya_tnkr_nameValidator.property = "kya_tnkr_name";
        model_internal::_kya_alloc_type_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKya_alloc_type_name);
        model_internal::_kya_alloc_type_nameValidator.required = true;
        model_internal::_kya_alloc_type_nameValidator.requiredFieldError = "kya_alloc_type_name is required";
        //model_internal::_kya_alloc_type_nameValidator.source = model_internal::_instance;
        //model_internal::_kya_alloc_type_nameValidator.property = "kya_alloc_type_name";
        model_internal::_kya_tankerValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKya_tanker);
        model_internal::_kya_tankerValidator.required = true;
        model_internal::_kya_tankerValidator.requiredFieldError = "kya_tanker is required";
        //model_internal::_kya_tankerValidator.source = model_internal::_instance;
        //model_internal::_kya_tankerValidator.property = "kya_tanker";
        model_internal::_kya_cust_ordnoValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKya_cust_ordno);
        model_internal::_kya_cust_ordnoValidator.required = true;
        model_internal::_kya_cust_ordnoValidator.requiredFieldError = "kya_cust_ordno is required";
        //model_internal::_kya_cust_ordnoValidator.source = model_internal::_instance;
        //model_internal::_kya_cust_ordnoValidator.property = "kya_cust_ordno";
        model_internal::_kya_tnkr_cmpyValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKya_tnkr_cmpy);
        model_internal::_kya_tnkr_cmpyValidator.required = true;
        model_internal::_kya_tnkr_cmpyValidator.requiredFieldError = "kya_tnkr_cmpy is required";
        //model_internal::_kya_tnkr_cmpyValidator.source = model_internal::_instance;
        //model_internal::_kya_tnkr_cmpyValidator.property = "kya_tnkr_cmpy";
        model_internal::_kya_role_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKya_role_name);
        model_internal::_kya_role_nameValidator.required = true;
        model_internal::_kya_role_nameValidator.requiredFieldError = "kya_role_name is required";
        //model_internal::_kya_role_nameValidator.source = model_internal::_instance;
        //model_internal::_kya_role_nameValidator.property = "kya_role_name";
        model_internal::_kya_drawerValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKya_drawer);
        model_internal::_kya_drawerValidator.required = true;
        model_internal::_kya_drawerValidator.requiredFieldError = "kya_drawer is required";
        //model_internal::_kya_drawerValidator.source = model_internal::_instance;
        //model_internal::_kya_drawerValidator.property = "kya_drawer";
        model_internal::_kya_issuer_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKya_issuer_name);
        model_internal::_kya_issuer_nameValidator.required = true;
        model_internal::_kya_issuer_nameValidator.requiredFieldError = "kya_issuer_name is required";
        //model_internal::_kya_issuer_nameValidator.source = model_internal::_instance;
        //model_internal::_kya_issuer_nameValidator.property = "kya_issuer_name";
        model_internal::_kya_key_createdValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKya_key_created);
        model_internal::_kya_key_createdValidator.required = true;
        model_internal::_kya_key_createdValidator.requiredFieldError = "kya_key_created is required";
        //model_internal::_kya_key_createdValidator.source = model_internal::_instance;
        //model_internal::_kya_key_createdValidator.property = "kya_key_created";
        model_internal::_kya_pin_changedValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKya_pin_changed);
        model_internal::_kya_pin_changedValidator.required = true;
        model_internal::_kya_pin_changedValidator.requiredFieldError = "kya_pin_changed is required";
        //model_internal::_kya_pin_changedValidator.source = model_internal::_instance;
        //model_internal::_kya_pin_changedValidator.property = "kya_pin_changed";
        model_internal::_kya_eqpt_cmpyValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKya_eqpt_cmpy);
        model_internal::_kya_eqpt_cmpyValidator.required = true;
        model_internal::_kya_eqpt_cmpyValidator.requiredFieldError = "kya_eqpt_cmpy is required";
        //model_internal::_kya_eqpt_cmpyValidator.source = model_internal::_instance;
        //model_internal::_kya_eqpt_cmpyValidator.property = "kya_eqpt_cmpy";
        model_internal::_kya_adhocValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKya_adhoc);
        model_internal::_kya_adhocValidator.required = true;
        model_internal::_kya_adhocValidator.requiredFieldError = "kya_adhoc is required";
        //model_internal::_kya_adhocValidator.source = model_internal::_instance;
        //model_internal::_kya_adhocValidator.property = "kya_adhoc";
        model_internal::_kya_alloc_typeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKya_alloc_type);
        model_internal::_kya_alloc_typeValidator.required = true;
        model_internal::_kya_alloc_typeValidator.requiredFieldError = "kya_alloc_type is required";
        //model_internal::_kya_alloc_typeValidator.source = model_internal::_instance;
        //model_internal::_kya_alloc_typeValidator.property = "kya_alloc_type";
        model_internal::_kya_etyp_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKya_etyp_name);
        model_internal::_kya_etyp_nameValidator.required = true;
        model_internal::_kya_etyp_nameValidator.requiredFieldError = "kya_etyp_name is required";
        //model_internal::_kya_etyp_nameValidator.source = model_internal::_instance;
        //model_internal::_kya_etyp_nameValidator.property = "kya_etyp_name";
        model_internal::_kya_eqpt_cmpy_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKya_eqpt_cmpy_name);
        model_internal::_kya_eqpt_cmpy_nameValidator.required = true;
        model_internal::_kya_eqpt_cmpy_nameValidator.requiredFieldError = "kya_eqpt_cmpy_name is required";
        //model_internal::_kya_eqpt_cmpy_nameValidator.source = model_internal::_instance;
        //model_internal::_kya_eqpt_cmpy_nameValidator.property = "kya_eqpt_cmpy_name";
        model_internal::_kya_draw_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKya_draw_name);
        model_internal::_kya_draw_nameValidator.required = true;
        model_internal::_kya_draw_nameValidator.requiredFieldError = "kya_draw_name is required";
        //model_internal::_kya_draw_nameValidator.source = model_internal::_instance;
        //model_internal::_kya_draw_nameValidator.property = "kya_draw_name";
        model_internal::_kya_cust_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKya_cust_name);
        model_internal::_kya_cust_nameValidator.required = true;
        model_internal::_kya_cust_nameValidator.requiredFieldError = "kya_cust_name is required";
        //model_internal::_kya_cust_nameValidator.source = model_internal::_instance;
        //model_internal::_kya_cust_nameValidator.property = "kya_cust_name";
        model_internal::_kya_alloc_cmpyValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKya_alloc_cmpy);
        model_internal::_kya_alloc_cmpyValidator.required = true;
        model_internal::_kya_alloc_cmpyValidator.requiredFieldError = "kya_alloc_cmpy is required";
        //model_internal::_kya_alloc_cmpyValidator.source = model_internal::_instance;
        //model_internal::_kya_alloc_cmpyValidator.property = "kya_alloc_cmpy";
        model_internal::_kya_eqpt_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKya_eqpt_name);
        model_internal::_kya_eqpt_nameValidator.required = true;
        model_internal::_kya_eqpt_nameValidator.requiredFieldError = "kya_eqpt_name is required";
        //model_internal::_kya_eqpt_nameValidator.source = model_internal::_instance;
        //model_internal::_kya_eqpt_nameValidator.property = "kya_eqpt_name";
        model_internal::_kya_phys_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKya_phys_name);
        model_internal::_kya_phys_nameValidator.required = true;
        model_internal::_kya_phys_nameValidator.requiredFieldError = "kya_phys_name is required";
        //model_internal::_kya_phys_nameValidator.source = model_internal::_instance;
        //model_internal::_kya_phys_nameValidator.property = "kya_phys_name";
        model_internal::_kya_order_noValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKya_order_no);
        model_internal::_kya_order_noValidator.required = true;
        model_internal::_kya_order_noValidator.requiredFieldError = "kya_order_no is required";
        //model_internal::_kya_order_noValidator.source = model_internal::_instance;
        //model_internal::_kya_order_noValidator.property = "kya_order_no";
        model_internal::_kya_txtValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKya_txt);
        model_internal::_kya_txtValidator.required = true;
        model_internal::_kya_txtValidator.requiredFieldError = "kya_txt is required";
        //model_internal::_kya_txtValidator.source = model_internal::_instance;
        //model_internal::_kya_txtValidator.property = "kya_txt";
        model_internal::_kya_trip_noValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKya_trip_no);
        model_internal::_kya_trip_noValidator.required = true;
        model_internal::_kya_trip_noValidator.requiredFieldError = "kya_trip_no is required";
        //model_internal::_kya_trip_noValidator.source = model_internal::_instance;
        //model_internal::_kya_trip_noValidator.property = "kya_trip_no";
        model_internal::_kya_timecodeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKya_timecode);
        model_internal::_kya_timecodeValidator.required = true;
        model_internal::_kya_timecodeValidator.requiredFieldError = "kya_timecode is required";
        //model_internal::_kya_timecodeValidator.source = model_internal::_instance;
        //model_internal::_kya_timecodeValidator.property = "kya_timecode";
        model_internal::_kya_psnl_cmpyValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKya_psnl_cmpy);
        model_internal::_kya_psnl_cmpyValidator.required = true;
        model_internal::_kya_psnl_cmpyValidator.requiredFieldError = "kya_psnl_cmpy is required";
        //model_internal::_kya_psnl_cmpyValidator.source = model_internal::_instance;
        //model_internal::_kya_psnl_cmpyValidator.property = "kya_psnl_cmpy";
        model_internal::_kya_load_idValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKya_load_id);
        model_internal::_kya_load_idValidator.required = true;
        model_internal::_kya_load_idValidator.requiredFieldError = "kya_load_id is required";
        //model_internal::_kya_load_idValidator.source = model_internal::_instance;
        //model_internal::_kya_load_idValidator.property = "kya_load_id";
        model_internal::_kya_order_descValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKya_order_desc);
        model_internal::_kya_order_descValidator.required = true;
        model_internal::_kya_order_descValidator.requiredFieldError = "kya_order_desc is required";
        //model_internal::_kya_order_descValidator.source = model_internal::_instance;
        //model_internal::_kya_order_descValidator.property = "kya_order_desc";
        model_internal::_kya_supp_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKya_supp_name);
        model_internal::_kya_supp_nameValidator.required = true;
        model_internal::_kya_supp_nameValidator.requiredFieldError = "kya_supp_name is required";
        //model_internal::_kya_supp_nameValidator.source = model_internal::_instance;
        //model_internal::_kya_supp_nameValidator.property = "kya_supp_name";
        model_internal::_kya_alloc_cmpy_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKya_alloc_cmpy_name);
        model_internal::_kya_alloc_cmpy_nameValidator.required = true;
        model_internal::_kya_alloc_cmpy_nameValidator.requiredFieldError = "kya_alloc_cmpy_name is required";
        //model_internal::_kya_alloc_cmpy_nameValidator.source = model_internal::_instance;
        //model_internal::_kya_alloc_cmpy_nameValidator.property = "kya_alloc_cmpy_name";
        model_internal::_kya_pinValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKya_pin);
        model_internal::_kya_pinValidator.required = true;
        model_internal::_kya_pinValidator.requiredFieldError = "kya_pin is required";
        //model_internal::_kya_pinValidator.source = model_internal::_instance;
        //model_internal::_kya_pinValidator.property = "kya_pin";
        model_internal::_kya_phys_typeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKya_phys_type);
        model_internal::_kya_phys_typeValidator.required = true;
        model_internal::_kya_phys_typeValidator.requiredFieldError = "kya_phys_type is required";
        //model_internal::_kya_phys_typeValidator.source = model_internal::_instance;
        //model_internal::_kya_phys_typeValidator.property = "kya_phys_type";
        model_internal::_kya_eqpt_descValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKya_eqpt_desc);
        model_internal::_kya_eqpt_descValidator.required = true;
        model_internal::_kya_eqpt_descValidator.requiredFieldError = "kya_eqpt_desc is required";
        //model_internal::_kya_eqpt_descValidator.source = model_internal::_instance;
        //model_internal::_kya_eqpt_descValidator.property = "kya_eqpt_desc";
        model_internal::_kya_tnkr_descValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKya_tnkr_desc);
        model_internal::_kya_tnkr_descValidator.required = true;
        model_internal::_kya_tnkr_descValidator.requiredFieldError = "kya_tnkr_desc is required";
        //model_internal::_kya_tnkr_descValidator.source = model_internal::_instance;
        //model_internal::_kya_tnkr_descValidator.property = "kya_tnkr_desc";
        model_internal::_kya_typeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKya_type);
        model_internal::_kya_typeValidator.required = true;
        model_internal::_kya_typeValidator.requiredFieldError = "kya_type is required";
        //model_internal::_kya_typeValidator.source = model_internal::_instance;
        //model_internal::_kya_typeValidator.property = "kya_type";
        model_internal::_kya_psnl_cmpy_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKya_psnl_cmpy_name);
        model_internal::_kya_psnl_cmpy_nameValidator.required = true;
        model_internal::_kya_psnl_cmpy_nameValidator.requiredFieldError = "kya_psnl_cmpy_name is required";
        //model_internal::_kya_psnl_cmpy_nameValidator.source = model_internal::_instance;
        //model_internal::_kya_psnl_cmpy_nameValidator.property = "kya_psnl_cmpy_name";
        model_internal::_kya_lockValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKya_lock);
        model_internal::_kya_lockValidator.required = true;
        model_internal::_kya_lockValidator.requiredFieldError = "kya_lock is required";
        //model_internal::_kya_lockValidator.source = model_internal::_instance;
        //model_internal::_kya_lockValidator.property = "kya_lock";
        model_internal::_kya_key_noValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKya_key_no);
        model_internal::_kya_key_noValidator.required = true;
        model_internal::_kya_key_noValidator.requiredFieldError = "kya_key_no is required";
        //model_internal::_kya_key_noValidator.source = model_internal::_instance;
        //model_internal::_kya_key_noValidator.property = "kya_key_no";
        model_internal::_kya_supplierValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKya_supplier);
        model_internal::_kya_supplierValidator.required = true;
        model_internal::_kya_supplierValidator.requiredFieldError = "kya_supplier is required";
        //model_internal::_kya_supplierValidator.source = model_internal::_instance;
        //model_internal::_kya_supplierValidator.property = "kya_supplier";
        model_internal::_kya_site_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKya_site_name);
        model_internal::_kya_site_nameValidator.required = true;
        model_internal::_kya_site_nameValidator.requiredFieldError = "kya_site_name is required";
        //model_internal::_kya_site_nameValidator.source = model_internal::_instance;
        //model_internal::_kya_site_nameValidator.property = "kya_site_name";
        model_internal::_kya_load_siteValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKya_load_site);
        model_internal::_kya_load_siteValidator.required = true;
        model_internal::_kya_load_siteValidator.requiredFieldError = "kya_load_site is required";
        //model_internal::_kya_load_siteValidator.source = model_internal::_instance;
        //model_internal::_kya_load_siteValidator.property = "kya_load_site";
        model_internal::_kya_tnkr_cmpy_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKya_tnkr_cmpy_name);
        model_internal::_kya_tnkr_cmpy_nameValidator.required = true;
        model_internal::_kya_tnkr_cmpy_nameValidator.requiredFieldError = "kya_tnkr_cmpy_name is required";
        //model_internal::_kya_tnkr_cmpy_nameValidator.source = model_internal::_instance;
        //model_internal::_kya_tnkr_cmpy_nameValidator.property = "kya_tnkr_cmpy_name";
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
            throw new Error(propertyName + " is not a data property of entity GUI_AccessKeys");
            
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
            throw new Error(propertyName + " is not a collection property of entity GUI_AccessKeys");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of GUI_AccessKeys");

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
            throw new Error(propertyName + " does not exist for entity GUI_AccessKeys");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity GUI_AccessKeys");
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
            throw new Error(propertyName + " does not exist for entity GUI_AccessKeys");
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
        returnMap["rn"] = model_internal::_instance.rn;

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
    public function get isKya_equipmentAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isKya_key_issuerAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isRnAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isKya_type_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isKya_personnelAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isKya_psnl_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isKya_roleAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isKya_tnkr_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isKya_alloc_type_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isKya_tankerAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isKya_cust_ordnoAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isKya_tnkr_cmpyAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isKya_role_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isKya_drawerAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isKya_issuer_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isKya_key_createdAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isKya_pin_changedAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isKya_eqpt_cmpyAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isKya_adhocAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isKya_alloc_typeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isKya_etyp_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isKya_eqpt_cmpy_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isKya_draw_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isKya_cust_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isKya_alloc_cmpyAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isKya_eqpt_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isKya_phys_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isKya_order_noAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isKya_txtAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isKya_trip_noAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isKya_timecodeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isKya_psnl_cmpyAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isKya_load_idAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isKya_order_descAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isKya_supp_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isKya_alloc_cmpy_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isKya_pinAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isKya_phys_typeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isKya_eqpt_descAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isKya_tnkr_descAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isKya_typeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isKya_psnl_cmpy_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isKya_lockAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isKya_key_noAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isKya_supplierAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isKya_site_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isKya_load_siteAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isKya_tnkr_cmpy_nameAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnKya_equipment():void
    {
        if (model_internal::_kya_equipmentIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKya_equipment = null;
            model_internal::calculateKya_equipmentIsValid();
        }
    }
    public function invalidateDependentOnKya_key_issuer():void
    {
        if (model_internal::_kya_key_issuerIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKya_key_issuer = null;
            model_internal::calculateKya_key_issuerIsValid();
        }
    }
    public function invalidateDependentOnKya_type_name():void
    {
        if (model_internal::_kya_type_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKya_type_name = null;
            model_internal::calculateKya_type_nameIsValid();
        }
    }
    public function invalidateDependentOnKya_personnel():void
    {
        if (model_internal::_kya_personnelIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKya_personnel = null;
            model_internal::calculateKya_personnelIsValid();
        }
    }
    public function invalidateDependentOnKya_psnl_name():void
    {
        if (model_internal::_kya_psnl_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKya_psnl_name = null;
            model_internal::calculateKya_psnl_nameIsValid();
        }
    }
    public function invalidateDependentOnKya_role():void
    {
        if (model_internal::_kya_roleIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKya_role = null;
            model_internal::calculateKya_roleIsValid();
        }
    }
    public function invalidateDependentOnKya_tnkr_name():void
    {
        if (model_internal::_kya_tnkr_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKya_tnkr_name = null;
            model_internal::calculateKya_tnkr_nameIsValid();
        }
    }
    public function invalidateDependentOnKya_alloc_type_name():void
    {
        if (model_internal::_kya_alloc_type_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKya_alloc_type_name = null;
            model_internal::calculateKya_alloc_type_nameIsValid();
        }
    }
    public function invalidateDependentOnKya_tanker():void
    {
        if (model_internal::_kya_tankerIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKya_tanker = null;
            model_internal::calculateKya_tankerIsValid();
        }
    }
    public function invalidateDependentOnKya_cust_ordno():void
    {
        if (model_internal::_kya_cust_ordnoIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKya_cust_ordno = null;
            model_internal::calculateKya_cust_ordnoIsValid();
        }
    }
    public function invalidateDependentOnKya_tnkr_cmpy():void
    {
        if (model_internal::_kya_tnkr_cmpyIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKya_tnkr_cmpy = null;
            model_internal::calculateKya_tnkr_cmpyIsValid();
        }
    }
    public function invalidateDependentOnKya_role_name():void
    {
        if (model_internal::_kya_role_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKya_role_name = null;
            model_internal::calculateKya_role_nameIsValid();
        }
    }
    public function invalidateDependentOnKya_drawer():void
    {
        if (model_internal::_kya_drawerIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKya_drawer = null;
            model_internal::calculateKya_drawerIsValid();
        }
    }
    public function invalidateDependentOnKya_issuer_name():void
    {
        if (model_internal::_kya_issuer_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKya_issuer_name = null;
            model_internal::calculateKya_issuer_nameIsValid();
        }
    }
    public function invalidateDependentOnKya_key_created():void
    {
        if (model_internal::_kya_key_createdIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKya_key_created = null;
            model_internal::calculateKya_key_createdIsValid();
        }
    }
    public function invalidateDependentOnKya_pin_changed():void
    {
        if (model_internal::_kya_pin_changedIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKya_pin_changed = null;
            model_internal::calculateKya_pin_changedIsValid();
        }
    }
    public function invalidateDependentOnKya_eqpt_cmpy():void
    {
        if (model_internal::_kya_eqpt_cmpyIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKya_eqpt_cmpy = null;
            model_internal::calculateKya_eqpt_cmpyIsValid();
        }
    }
    public function invalidateDependentOnKya_adhoc():void
    {
        if (model_internal::_kya_adhocIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKya_adhoc = null;
            model_internal::calculateKya_adhocIsValid();
        }
    }
    public function invalidateDependentOnKya_alloc_type():void
    {
        if (model_internal::_kya_alloc_typeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKya_alloc_type = null;
            model_internal::calculateKya_alloc_typeIsValid();
        }
    }
    public function invalidateDependentOnKya_etyp_name():void
    {
        if (model_internal::_kya_etyp_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKya_etyp_name = null;
            model_internal::calculateKya_etyp_nameIsValid();
        }
    }
    public function invalidateDependentOnKya_eqpt_cmpy_name():void
    {
        if (model_internal::_kya_eqpt_cmpy_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKya_eqpt_cmpy_name = null;
            model_internal::calculateKya_eqpt_cmpy_nameIsValid();
        }
    }
    public function invalidateDependentOnKya_draw_name():void
    {
        if (model_internal::_kya_draw_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKya_draw_name = null;
            model_internal::calculateKya_draw_nameIsValid();
        }
    }
    public function invalidateDependentOnKya_cust_name():void
    {
        if (model_internal::_kya_cust_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKya_cust_name = null;
            model_internal::calculateKya_cust_nameIsValid();
        }
    }
    public function invalidateDependentOnKya_alloc_cmpy():void
    {
        if (model_internal::_kya_alloc_cmpyIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKya_alloc_cmpy = null;
            model_internal::calculateKya_alloc_cmpyIsValid();
        }
    }
    public function invalidateDependentOnKya_eqpt_name():void
    {
        if (model_internal::_kya_eqpt_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKya_eqpt_name = null;
            model_internal::calculateKya_eqpt_nameIsValid();
        }
    }
    public function invalidateDependentOnKya_phys_name():void
    {
        if (model_internal::_kya_phys_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKya_phys_name = null;
            model_internal::calculateKya_phys_nameIsValid();
        }
    }
    public function invalidateDependentOnKya_order_no():void
    {
        if (model_internal::_kya_order_noIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKya_order_no = null;
            model_internal::calculateKya_order_noIsValid();
        }
    }
    public function invalidateDependentOnKya_txt():void
    {
        if (model_internal::_kya_txtIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKya_txt = null;
            model_internal::calculateKya_txtIsValid();
        }
    }
    public function invalidateDependentOnKya_trip_no():void
    {
        if (model_internal::_kya_trip_noIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKya_trip_no = null;
            model_internal::calculateKya_trip_noIsValid();
        }
    }
    public function invalidateDependentOnKya_timecode():void
    {
        if (model_internal::_kya_timecodeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKya_timecode = null;
            model_internal::calculateKya_timecodeIsValid();
        }
    }
    public function invalidateDependentOnKya_psnl_cmpy():void
    {
        if (model_internal::_kya_psnl_cmpyIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKya_psnl_cmpy = null;
            model_internal::calculateKya_psnl_cmpyIsValid();
        }
    }
    public function invalidateDependentOnKya_load_id():void
    {
        if (model_internal::_kya_load_idIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKya_load_id = null;
            model_internal::calculateKya_load_idIsValid();
        }
    }
    public function invalidateDependentOnKya_order_desc():void
    {
        if (model_internal::_kya_order_descIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKya_order_desc = null;
            model_internal::calculateKya_order_descIsValid();
        }
    }
    public function invalidateDependentOnKya_supp_name():void
    {
        if (model_internal::_kya_supp_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKya_supp_name = null;
            model_internal::calculateKya_supp_nameIsValid();
        }
    }
    public function invalidateDependentOnKya_alloc_cmpy_name():void
    {
        if (model_internal::_kya_alloc_cmpy_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKya_alloc_cmpy_name = null;
            model_internal::calculateKya_alloc_cmpy_nameIsValid();
        }
    }
    public function invalidateDependentOnKya_pin():void
    {
        if (model_internal::_kya_pinIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKya_pin = null;
            model_internal::calculateKya_pinIsValid();
        }
    }
    public function invalidateDependentOnKya_phys_type():void
    {
        if (model_internal::_kya_phys_typeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKya_phys_type = null;
            model_internal::calculateKya_phys_typeIsValid();
        }
    }
    public function invalidateDependentOnKya_eqpt_desc():void
    {
        if (model_internal::_kya_eqpt_descIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKya_eqpt_desc = null;
            model_internal::calculateKya_eqpt_descIsValid();
        }
    }
    public function invalidateDependentOnKya_tnkr_desc():void
    {
        if (model_internal::_kya_tnkr_descIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKya_tnkr_desc = null;
            model_internal::calculateKya_tnkr_descIsValid();
        }
    }
    public function invalidateDependentOnKya_type():void
    {
        if (model_internal::_kya_typeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKya_type = null;
            model_internal::calculateKya_typeIsValid();
        }
    }
    public function invalidateDependentOnKya_psnl_cmpy_name():void
    {
        if (model_internal::_kya_psnl_cmpy_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKya_psnl_cmpy_name = null;
            model_internal::calculateKya_psnl_cmpy_nameIsValid();
        }
    }
    public function invalidateDependentOnKya_lock():void
    {
        if (model_internal::_kya_lockIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKya_lock = null;
            model_internal::calculateKya_lockIsValid();
        }
    }
    public function invalidateDependentOnKya_key_no():void
    {
        if (model_internal::_kya_key_noIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKya_key_no = null;
            model_internal::calculateKya_key_noIsValid();
        }
    }
    public function invalidateDependentOnKya_supplier():void
    {
        if (model_internal::_kya_supplierIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKya_supplier = null;
            model_internal::calculateKya_supplierIsValid();
        }
    }
    public function invalidateDependentOnKya_site_name():void
    {
        if (model_internal::_kya_site_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKya_site_name = null;
            model_internal::calculateKya_site_nameIsValid();
        }
    }
    public function invalidateDependentOnKya_load_site():void
    {
        if (model_internal::_kya_load_siteIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKya_load_site = null;
            model_internal::calculateKya_load_siteIsValid();
        }
    }
    public function invalidateDependentOnKya_tnkr_cmpy_name():void
    {
        if (model_internal::_kya_tnkr_cmpy_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKya_tnkr_cmpy_name = null;
            model_internal::calculateKya_tnkr_cmpy_nameIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get kya_equipmentStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get kya_equipmentValidator() : StyleValidator
    {
        return model_internal::_kya_equipmentValidator;
    }

    model_internal function set _kya_equipmentIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_kya_equipmentIsValid;         
        if (oldValue !== value)
        {
            model_internal::_kya_equipmentIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_equipmentIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get kya_equipmentIsValid():Boolean
    {
        if (!model_internal::_kya_equipmentIsValidCacheInitialized)
        {
            model_internal::calculateKya_equipmentIsValid();
        }

        return model_internal::_kya_equipmentIsValid;
    }

    model_internal function calculateKya_equipmentIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_kya_equipmentValidator.validate(model_internal::_instance.kya_equipment)
        model_internal::_kya_equipmentIsValid_der = (valRes.results == null);
        model_internal::_kya_equipmentIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::kya_equipmentValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::kya_equipmentValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get kya_equipmentValidationFailureMessages():Array
    {
        if (model_internal::_kya_equipmentValidationFailureMessages == null)
            model_internal::calculateKya_equipmentIsValid();

        return _kya_equipmentValidationFailureMessages;
    }

    model_internal function set kya_equipmentValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_kya_equipmentValidationFailureMessages;

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
            model_internal::_kya_equipmentValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_equipmentValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get kya_key_issuerStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get kya_key_issuerValidator() : StyleValidator
    {
        return model_internal::_kya_key_issuerValidator;
    }

    model_internal function set _kya_key_issuerIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_kya_key_issuerIsValid;         
        if (oldValue !== value)
        {
            model_internal::_kya_key_issuerIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_key_issuerIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get kya_key_issuerIsValid():Boolean
    {
        if (!model_internal::_kya_key_issuerIsValidCacheInitialized)
        {
            model_internal::calculateKya_key_issuerIsValid();
        }

        return model_internal::_kya_key_issuerIsValid;
    }

    model_internal function calculateKya_key_issuerIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_kya_key_issuerValidator.validate(model_internal::_instance.kya_key_issuer)
        model_internal::_kya_key_issuerIsValid_der = (valRes.results == null);
        model_internal::_kya_key_issuerIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::kya_key_issuerValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::kya_key_issuerValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get kya_key_issuerValidationFailureMessages():Array
    {
        if (model_internal::_kya_key_issuerValidationFailureMessages == null)
            model_internal::calculateKya_key_issuerIsValid();

        return _kya_key_issuerValidationFailureMessages;
    }

    model_internal function set kya_key_issuerValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_kya_key_issuerValidationFailureMessages;

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
            model_internal::_kya_key_issuerValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_key_issuerValidationFailureMessages", oldValue, value));
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

    [Bindable(event="propertyChange")]   
    public function get kya_type_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get kya_type_nameValidator() : StyleValidator
    {
        return model_internal::_kya_type_nameValidator;
    }

    model_internal function set _kya_type_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_kya_type_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_kya_type_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_type_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get kya_type_nameIsValid():Boolean
    {
        if (!model_internal::_kya_type_nameIsValidCacheInitialized)
        {
            model_internal::calculateKya_type_nameIsValid();
        }

        return model_internal::_kya_type_nameIsValid;
    }

    model_internal function calculateKya_type_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_kya_type_nameValidator.validate(model_internal::_instance.kya_type_name)
        model_internal::_kya_type_nameIsValid_der = (valRes.results == null);
        model_internal::_kya_type_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::kya_type_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::kya_type_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get kya_type_nameValidationFailureMessages():Array
    {
        if (model_internal::_kya_type_nameValidationFailureMessages == null)
            model_internal::calculateKya_type_nameIsValid();

        return _kya_type_nameValidationFailureMessages;
    }

    model_internal function set kya_type_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_kya_type_nameValidationFailureMessages;

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
            model_internal::_kya_type_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_type_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get kya_personnelStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get kya_personnelValidator() : StyleValidator
    {
        return model_internal::_kya_personnelValidator;
    }

    model_internal function set _kya_personnelIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_kya_personnelIsValid;         
        if (oldValue !== value)
        {
            model_internal::_kya_personnelIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_personnelIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get kya_personnelIsValid():Boolean
    {
        if (!model_internal::_kya_personnelIsValidCacheInitialized)
        {
            model_internal::calculateKya_personnelIsValid();
        }

        return model_internal::_kya_personnelIsValid;
    }

    model_internal function calculateKya_personnelIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_kya_personnelValidator.validate(model_internal::_instance.kya_personnel)
        model_internal::_kya_personnelIsValid_der = (valRes.results == null);
        model_internal::_kya_personnelIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::kya_personnelValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::kya_personnelValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get kya_personnelValidationFailureMessages():Array
    {
        if (model_internal::_kya_personnelValidationFailureMessages == null)
            model_internal::calculateKya_personnelIsValid();

        return _kya_personnelValidationFailureMessages;
    }

    model_internal function set kya_personnelValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_kya_personnelValidationFailureMessages;

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
            model_internal::_kya_personnelValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_personnelValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get kya_psnl_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get kya_psnl_nameValidator() : StyleValidator
    {
        return model_internal::_kya_psnl_nameValidator;
    }

    model_internal function set _kya_psnl_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_kya_psnl_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_kya_psnl_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_psnl_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get kya_psnl_nameIsValid():Boolean
    {
        if (!model_internal::_kya_psnl_nameIsValidCacheInitialized)
        {
            model_internal::calculateKya_psnl_nameIsValid();
        }

        return model_internal::_kya_psnl_nameIsValid;
    }

    model_internal function calculateKya_psnl_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_kya_psnl_nameValidator.validate(model_internal::_instance.kya_psnl_name)
        model_internal::_kya_psnl_nameIsValid_der = (valRes.results == null);
        model_internal::_kya_psnl_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::kya_psnl_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::kya_psnl_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get kya_psnl_nameValidationFailureMessages():Array
    {
        if (model_internal::_kya_psnl_nameValidationFailureMessages == null)
            model_internal::calculateKya_psnl_nameIsValid();

        return _kya_psnl_nameValidationFailureMessages;
    }

    model_internal function set kya_psnl_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_kya_psnl_nameValidationFailureMessages;

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
            model_internal::_kya_psnl_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_psnl_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get kya_roleStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get kya_roleValidator() : StyleValidator
    {
        return model_internal::_kya_roleValidator;
    }

    model_internal function set _kya_roleIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_kya_roleIsValid;         
        if (oldValue !== value)
        {
            model_internal::_kya_roleIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_roleIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get kya_roleIsValid():Boolean
    {
        if (!model_internal::_kya_roleIsValidCacheInitialized)
        {
            model_internal::calculateKya_roleIsValid();
        }

        return model_internal::_kya_roleIsValid;
    }

    model_internal function calculateKya_roleIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_kya_roleValidator.validate(model_internal::_instance.kya_role)
        model_internal::_kya_roleIsValid_der = (valRes.results == null);
        model_internal::_kya_roleIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::kya_roleValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::kya_roleValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get kya_roleValidationFailureMessages():Array
    {
        if (model_internal::_kya_roleValidationFailureMessages == null)
            model_internal::calculateKya_roleIsValid();

        return _kya_roleValidationFailureMessages;
    }

    model_internal function set kya_roleValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_kya_roleValidationFailureMessages;

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
            model_internal::_kya_roleValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_roleValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get kya_tnkr_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get kya_tnkr_nameValidator() : StyleValidator
    {
        return model_internal::_kya_tnkr_nameValidator;
    }

    model_internal function set _kya_tnkr_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_kya_tnkr_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_kya_tnkr_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_tnkr_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get kya_tnkr_nameIsValid():Boolean
    {
        if (!model_internal::_kya_tnkr_nameIsValidCacheInitialized)
        {
            model_internal::calculateKya_tnkr_nameIsValid();
        }

        return model_internal::_kya_tnkr_nameIsValid;
    }

    model_internal function calculateKya_tnkr_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_kya_tnkr_nameValidator.validate(model_internal::_instance.kya_tnkr_name)
        model_internal::_kya_tnkr_nameIsValid_der = (valRes.results == null);
        model_internal::_kya_tnkr_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::kya_tnkr_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::kya_tnkr_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get kya_tnkr_nameValidationFailureMessages():Array
    {
        if (model_internal::_kya_tnkr_nameValidationFailureMessages == null)
            model_internal::calculateKya_tnkr_nameIsValid();

        return _kya_tnkr_nameValidationFailureMessages;
    }

    model_internal function set kya_tnkr_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_kya_tnkr_nameValidationFailureMessages;

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
            model_internal::_kya_tnkr_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_tnkr_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get kya_alloc_type_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get kya_alloc_type_nameValidator() : StyleValidator
    {
        return model_internal::_kya_alloc_type_nameValidator;
    }

    model_internal function set _kya_alloc_type_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_kya_alloc_type_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_kya_alloc_type_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_alloc_type_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get kya_alloc_type_nameIsValid():Boolean
    {
        if (!model_internal::_kya_alloc_type_nameIsValidCacheInitialized)
        {
            model_internal::calculateKya_alloc_type_nameIsValid();
        }

        return model_internal::_kya_alloc_type_nameIsValid;
    }

    model_internal function calculateKya_alloc_type_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_kya_alloc_type_nameValidator.validate(model_internal::_instance.kya_alloc_type_name)
        model_internal::_kya_alloc_type_nameIsValid_der = (valRes.results == null);
        model_internal::_kya_alloc_type_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::kya_alloc_type_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::kya_alloc_type_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get kya_alloc_type_nameValidationFailureMessages():Array
    {
        if (model_internal::_kya_alloc_type_nameValidationFailureMessages == null)
            model_internal::calculateKya_alloc_type_nameIsValid();

        return _kya_alloc_type_nameValidationFailureMessages;
    }

    model_internal function set kya_alloc_type_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_kya_alloc_type_nameValidationFailureMessages;

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
            model_internal::_kya_alloc_type_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_alloc_type_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get kya_tankerStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get kya_tankerValidator() : StyleValidator
    {
        return model_internal::_kya_tankerValidator;
    }

    model_internal function set _kya_tankerIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_kya_tankerIsValid;         
        if (oldValue !== value)
        {
            model_internal::_kya_tankerIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_tankerIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get kya_tankerIsValid():Boolean
    {
        if (!model_internal::_kya_tankerIsValidCacheInitialized)
        {
            model_internal::calculateKya_tankerIsValid();
        }

        return model_internal::_kya_tankerIsValid;
    }

    model_internal function calculateKya_tankerIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_kya_tankerValidator.validate(model_internal::_instance.kya_tanker)
        model_internal::_kya_tankerIsValid_der = (valRes.results == null);
        model_internal::_kya_tankerIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::kya_tankerValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::kya_tankerValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get kya_tankerValidationFailureMessages():Array
    {
        if (model_internal::_kya_tankerValidationFailureMessages == null)
            model_internal::calculateKya_tankerIsValid();

        return _kya_tankerValidationFailureMessages;
    }

    model_internal function set kya_tankerValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_kya_tankerValidationFailureMessages;

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
            model_internal::_kya_tankerValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_tankerValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get kya_cust_ordnoStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get kya_cust_ordnoValidator() : StyleValidator
    {
        return model_internal::_kya_cust_ordnoValidator;
    }

    model_internal function set _kya_cust_ordnoIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_kya_cust_ordnoIsValid;         
        if (oldValue !== value)
        {
            model_internal::_kya_cust_ordnoIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_cust_ordnoIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get kya_cust_ordnoIsValid():Boolean
    {
        if (!model_internal::_kya_cust_ordnoIsValidCacheInitialized)
        {
            model_internal::calculateKya_cust_ordnoIsValid();
        }

        return model_internal::_kya_cust_ordnoIsValid;
    }

    model_internal function calculateKya_cust_ordnoIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_kya_cust_ordnoValidator.validate(model_internal::_instance.kya_cust_ordno)
        model_internal::_kya_cust_ordnoIsValid_der = (valRes.results == null);
        model_internal::_kya_cust_ordnoIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::kya_cust_ordnoValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::kya_cust_ordnoValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get kya_cust_ordnoValidationFailureMessages():Array
    {
        if (model_internal::_kya_cust_ordnoValidationFailureMessages == null)
            model_internal::calculateKya_cust_ordnoIsValid();

        return _kya_cust_ordnoValidationFailureMessages;
    }

    model_internal function set kya_cust_ordnoValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_kya_cust_ordnoValidationFailureMessages;

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
            model_internal::_kya_cust_ordnoValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_cust_ordnoValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get kya_tnkr_cmpyStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get kya_tnkr_cmpyValidator() : StyleValidator
    {
        return model_internal::_kya_tnkr_cmpyValidator;
    }

    model_internal function set _kya_tnkr_cmpyIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_kya_tnkr_cmpyIsValid;         
        if (oldValue !== value)
        {
            model_internal::_kya_tnkr_cmpyIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_tnkr_cmpyIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get kya_tnkr_cmpyIsValid():Boolean
    {
        if (!model_internal::_kya_tnkr_cmpyIsValidCacheInitialized)
        {
            model_internal::calculateKya_tnkr_cmpyIsValid();
        }

        return model_internal::_kya_tnkr_cmpyIsValid;
    }

    model_internal function calculateKya_tnkr_cmpyIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_kya_tnkr_cmpyValidator.validate(model_internal::_instance.kya_tnkr_cmpy)
        model_internal::_kya_tnkr_cmpyIsValid_der = (valRes.results == null);
        model_internal::_kya_tnkr_cmpyIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::kya_tnkr_cmpyValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::kya_tnkr_cmpyValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get kya_tnkr_cmpyValidationFailureMessages():Array
    {
        if (model_internal::_kya_tnkr_cmpyValidationFailureMessages == null)
            model_internal::calculateKya_tnkr_cmpyIsValid();

        return _kya_tnkr_cmpyValidationFailureMessages;
    }

    model_internal function set kya_tnkr_cmpyValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_kya_tnkr_cmpyValidationFailureMessages;

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
            model_internal::_kya_tnkr_cmpyValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_tnkr_cmpyValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get kya_role_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get kya_role_nameValidator() : StyleValidator
    {
        return model_internal::_kya_role_nameValidator;
    }

    model_internal function set _kya_role_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_kya_role_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_kya_role_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_role_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get kya_role_nameIsValid():Boolean
    {
        if (!model_internal::_kya_role_nameIsValidCacheInitialized)
        {
            model_internal::calculateKya_role_nameIsValid();
        }

        return model_internal::_kya_role_nameIsValid;
    }

    model_internal function calculateKya_role_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_kya_role_nameValidator.validate(model_internal::_instance.kya_role_name)
        model_internal::_kya_role_nameIsValid_der = (valRes.results == null);
        model_internal::_kya_role_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::kya_role_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::kya_role_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get kya_role_nameValidationFailureMessages():Array
    {
        if (model_internal::_kya_role_nameValidationFailureMessages == null)
            model_internal::calculateKya_role_nameIsValid();

        return _kya_role_nameValidationFailureMessages;
    }

    model_internal function set kya_role_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_kya_role_nameValidationFailureMessages;

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
            model_internal::_kya_role_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_role_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get kya_drawerStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get kya_drawerValidator() : StyleValidator
    {
        return model_internal::_kya_drawerValidator;
    }

    model_internal function set _kya_drawerIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_kya_drawerIsValid;         
        if (oldValue !== value)
        {
            model_internal::_kya_drawerIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_drawerIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get kya_drawerIsValid():Boolean
    {
        if (!model_internal::_kya_drawerIsValidCacheInitialized)
        {
            model_internal::calculateKya_drawerIsValid();
        }

        return model_internal::_kya_drawerIsValid;
    }

    model_internal function calculateKya_drawerIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_kya_drawerValidator.validate(model_internal::_instance.kya_drawer)
        model_internal::_kya_drawerIsValid_der = (valRes.results == null);
        model_internal::_kya_drawerIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::kya_drawerValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::kya_drawerValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get kya_drawerValidationFailureMessages():Array
    {
        if (model_internal::_kya_drawerValidationFailureMessages == null)
            model_internal::calculateKya_drawerIsValid();

        return _kya_drawerValidationFailureMessages;
    }

    model_internal function set kya_drawerValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_kya_drawerValidationFailureMessages;

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
            model_internal::_kya_drawerValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_drawerValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get kya_issuer_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get kya_issuer_nameValidator() : StyleValidator
    {
        return model_internal::_kya_issuer_nameValidator;
    }

    model_internal function set _kya_issuer_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_kya_issuer_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_kya_issuer_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_issuer_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get kya_issuer_nameIsValid():Boolean
    {
        if (!model_internal::_kya_issuer_nameIsValidCacheInitialized)
        {
            model_internal::calculateKya_issuer_nameIsValid();
        }

        return model_internal::_kya_issuer_nameIsValid;
    }

    model_internal function calculateKya_issuer_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_kya_issuer_nameValidator.validate(model_internal::_instance.kya_issuer_name)
        model_internal::_kya_issuer_nameIsValid_der = (valRes.results == null);
        model_internal::_kya_issuer_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::kya_issuer_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::kya_issuer_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get kya_issuer_nameValidationFailureMessages():Array
    {
        if (model_internal::_kya_issuer_nameValidationFailureMessages == null)
            model_internal::calculateKya_issuer_nameIsValid();

        return _kya_issuer_nameValidationFailureMessages;
    }

    model_internal function set kya_issuer_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_kya_issuer_nameValidationFailureMessages;

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
            model_internal::_kya_issuer_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_issuer_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get kya_key_createdStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get kya_key_createdValidator() : StyleValidator
    {
        return model_internal::_kya_key_createdValidator;
    }

    model_internal function set _kya_key_createdIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_kya_key_createdIsValid;         
        if (oldValue !== value)
        {
            model_internal::_kya_key_createdIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_key_createdIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get kya_key_createdIsValid():Boolean
    {
        if (!model_internal::_kya_key_createdIsValidCacheInitialized)
        {
            model_internal::calculateKya_key_createdIsValid();
        }

        return model_internal::_kya_key_createdIsValid;
    }

    model_internal function calculateKya_key_createdIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_kya_key_createdValidator.validate(model_internal::_instance.kya_key_created)
        model_internal::_kya_key_createdIsValid_der = (valRes.results == null);
        model_internal::_kya_key_createdIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::kya_key_createdValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::kya_key_createdValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get kya_key_createdValidationFailureMessages():Array
    {
        if (model_internal::_kya_key_createdValidationFailureMessages == null)
            model_internal::calculateKya_key_createdIsValid();

        return _kya_key_createdValidationFailureMessages;
    }

    model_internal function set kya_key_createdValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_kya_key_createdValidationFailureMessages;

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
            model_internal::_kya_key_createdValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_key_createdValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get kya_pin_changedStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get kya_pin_changedValidator() : StyleValidator
    {
        return model_internal::_kya_pin_changedValidator;
    }

    model_internal function set _kya_pin_changedIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_kya_pin_changedIsValid;         
        if (oldValue !== value)
        {
            model_internal::_kya_pin_changedIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_pin_changedIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get kya_pin_changedIsValid():Boolean
    {
        if (!model_internal::_kya_pin_changedIsValidCacheInitialized)
        {
            model_internal::calculateKya_pin_changedIsValid();
        }

        return model_internal::_kya_pin_changedIsValid;
    }

    model_internal function calculateKya_pin_changedIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_kya_pin_changedValidator.validate(model_internal::_instance.kya_pin_changed)
        model_internal::_kya_pin_changedIsValid_der = (valRes.results == null);
        model_internal::_kya_pin_changedIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::kya_pin_changedValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::kya_pin_changedValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get kya_pin_changedValidationFailureMessages():Array
    {
        if (model_internal::_kya_pin_changedValidationFailureMessages == null)
            model_internal::calculateKya_pin_changedIsValid();

        return _kya_pin_changedValidationFailureMessages;
    }

    model_internal function set kya_pin_changedValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_kya_pin_changedValidationFailureMessages;

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
            model_internal::_kya_pin_changedValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_pin_changedValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get kya_eqpt_cmpyStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get kya_eqpt_cmpyValidator() : StyleValidator
    {
        return model_internal::_kya_eqpt_cmpyValidator;
    }

    model_internal function set _kya_eqpt_cmpyIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_kya_eqpt_cmpyIsValid;         
        if (oldValue !== value)
        {
            model_internal::_kya_eqpt_cmpyIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_eqpt_cmpyIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get kya_eqpt_cmpyIsValid():Boolean
    {
        if (!model_internal::_kya_eqpt_cmpyIsValidCacheInitialized)
        {
            model_internal::calculateKya_eqpt_cmpyIsValid();
        }

        return model_internal::_kya_eqpt_cmpyIsValid;
    }

    model_internal function calculateKya_eqpt_cmpyIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_kya_eqpt_cmpyValidator.validate(model_internal::_instance.kya_eqpt_cmpy)
        model_internal::_kya_eqpt_cmpyIsValid_der = (valRes.results == null);
        model_internal::_kya_eqpt_cmpyIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::kya_eqpt_cmpyValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::kya_eqpt_cmpyValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get kya_eqpt_cmpyValidationFailureMessages():Array
    {
        if (model_internal::_kya_eqpt_cmpyValidationFailureMessages == null)
            model_internal::calculateKya_eqpt_cmpyIsValid();

        return _kya_eqpt_cmpyValidationFailureMessages;
    }

    model_internal function set kya_eqpt_cmpyValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_kya_eqpt_cmpyValidationFailureMessages;

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
            model_internal::_kya_eqpt_cmpyValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_eqpt_cmpyValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get kya_adhocStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get kya_adhocValidator() : StyleValidator
    {
        return model_internal::_kya_adhocValidator;
    }

    model_internal function set _kya_adhocIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_kya_adhocIsValid;         
        if (oldValue !== value)
        {
            model_internal::_kya_adhocIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_adhocIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get kya_adhocIsValid():Boolean
    {
        if (!model_internal::_kya_adhocIsValidCacheInitialized)
        {
            model_internal::calculateKya_adhocIsValid();
        }

        return model_internal::_kya_adhocIsValid;
    }

    model_internal function calculateKya_adhocIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_kya_adhocValidator.validate(model_internal::_instance.kya_adhoc)
        model_internal::_kya_adhocIsValid_der = (valRes.results == null);
        model_internal::_kya_adhocIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::kya_adhocValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::kya_adhocValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get kya_adhocValidationFailureMessages():Array
    {
        if (model_internal::_kya_adhocValidationFailureMessages == null)
            model_internal::calculateKya_adhocIsValid();

        return _kya_adhocValidationFailureMessages;
    }

    model_internal function set kya_adhocValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_kya_adhocValidationFailureMessages;

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
            model_internal::_kya_adhocValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_adhocValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get kya_alloc_typeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get kya_alloc_typeValidator() : StyleValidator
    {
        return model_internal::_kya_alloc_typeValidator;
    }

    model_internal function set _kya_alloc_typeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_kya_alloc_typeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_kya_alloc_typeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_alloc_typeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get kya_alloc_typeIsValid():Boolean
    {
        if (!model_internal::_kya_alloc_typeIsValidCacheInitialized)
        {
            model_internal::calculateKya_alloc_typeIsValid();
        }

        return model_internal::_kya_alloc_typeIsValid;
    }

    model_internal function calculateKya_alloc_typeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_kya_alloc_typeValidator.validate(model_internal::_instance.kya_alloc_type)
        model_internal::_kya_alloc_typeIsValid_der = (valRes.results == null);
        model_internal::_kya_alloc_typeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::kya_alloc_typeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::kya_alloc_typeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get kya_alloc_typeValidationFailureMessages():Array
    {
        if (model_internal::_kya_alloc_typeValidationFailureMessages == null)
            model_internal::calculateKya_alloc_typeIsValid();

        return _kya_alloc_typeValidationFailureMessages;
    }

    model_internal function set kya_alloc_typeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_kya_alloc_typeValidationFailureMessages;

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
            model_internal::_kya_alloc_typeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_alloc_typeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get kya_etyp_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get kya_etyp_nameValidator() : StyleValidator
    {
        return model_internal::_kya_etyp_nameValidator;
    }

    model_internal function set _kya_etyp_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_kya_etyp_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_kya_etyp_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_etyp_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get kya_etyp_nameIsValid():Boolean
    {
        if (!model_internal::_kya_etyp_nameIsValidCacheInitialized)
        {
            model_internal::calculateKya_etyp_nameIsValid();
        }

        return model_internal::_kya_etyp_nameIsValid;
    }

    model_internal function calculateKya_etyp_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_kya_etyp_nameValidator.validate(model_internal::_instance.kya_etyp_name)
        model_internal::_kya_etyp_nameIsValid_der = (valRes.results == null);
        model_internal::_kya_etyp_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::kya_etyp_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::kya_etyp_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get kya_etyp_nameValidationFailureMessages():Array
    {
        if (model_internal::_kya_etyp_nameValidationFailureMessages == null)
            model_internal::calculateKya_etyp_nameIsValid();

        return _kya_etyp_nameValidationFailureMessages;
    }

    model_internal function set kya_etyp_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_kya_etyp_nameValidationFailureMessages;

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
            model_internal::_kya_etyp_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_etyp_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get kya_eqpt_cmpy_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get kya_eqpt_cmpy_nameValidator() : StyleValidator
    {
        return model_internal::_kya_eqpt_cmpy_nameValidator;
    }

    model_internal function set _kya_eqpt_cmpy_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_kya_eqpt_cmpy_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_kya_eqpt_cmpy_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_eqpt_cmpy_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get kya_eqpt_cmpy_nameIsValid():Boolean
    {
        if (!model_internal::_kya_eqpt_cmpy_nameIsValidCacheInitialized)
        {
            model_internal::calculateKya_eqpt_cmpy_nameIsValid();
        }

        return model_internal::_kya_eqpt_cmpy_nameIsValid;
    }

    model_internal function calculateKya_eqpt_cmpy_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_kya_eqpt_cmpy_nameValidator.validate(model_internal::_instance.kya_eqpt_cmpy_name)
        model_internal::_kya_eqpt_cmpy_nameIsValid_der = (valRes.results == null);
        model_internal::_kya_eqpt_cmpy_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::kya_eqpt_cmpy_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::kya_eqpt_cmpy_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get kya_eqpt_cmpy_nameValidationFailureMessages():Array
    {
        if (model_internal::_kya_eqpt_cmpy_nameValidationFailureMessages == null)
            model_internal::calculateKya_eqpt_cmpy_nameIsValid();

        return _kya_eqpt_cmpy_nameValidationFailureMessages;
    }

    model_internal function set kya_eqpt_cmpy_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_kya_eqpt_cmpy_nameValidationFailureMessages;

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
            model_internal::_kya_eqpt_cmpy_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_eqpt_cmpy_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get kya_draw_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get kya_draw_nameValidator() : StyleValidator
    {
        return model_internal::_kya_draw_nameValidator;
    }

    model_internal function set _kya_draw_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_kya_draw_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_kya_draw_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_draw_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get kya_draw_nameIsValid():Boolean
    {
        if (!model_internal::_kya_draw_nameIsValidCacheInitialized)
        {
            model_internal::calculateKya_draw_nameIsValid();
        }

        return model_internal::_kya_draw_nameIsValid;
    }

    model_internal function calculateKya_draw_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_kya_draw_nameValidator.validate(model_internal::_instance.kya_draw_name)
        model_internal::_kya_draw_nameIsValid_der = (valRes.results == null);
        model_internal::_kya_draw_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::kya_draw_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::kya_draw_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get kya_draw_nameValidationFailureMessages():Array
    {
        if (model_internal::_kya_draw_nameValidationFailureMessages == null)
            model_internal::calculateKya_draw_nameIsValid();

        return _kya_draw_nameValidationFailureMessages;
    }

    model_internal function set kya_draw_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_kya_draw_nameValidationFailureMessages;

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
            model_internal::_kya_draw_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_draw_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get kya_cust_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get kya_cust_nameValidator() : StyleValidator
    {
        return model_internal::_kya_cust_nameValidator;
    }

    model_internal function set _kya_cust_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_kya_cust_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_kya_cust_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_cust_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get kya_cust_nameIsValid():Boolean
    {
        if (!model_internal::_kya_cust_nameIsValidCacheInitialized)
        {
            model_internal::calculateKya_cust_nameIsValid();
        }

        return model_internal::_kya_cust_nameIsValid;
    }

    model_internal function calculateKya_cust_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_kya_cust_nameValidator.validate(model_internal::_instance.kya_cust_name)
        model_internal::_kya_cust_nameIsValid_der = (valRes.results == null);
        model_internal::_kya_cust_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::kya_cust_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::kya_cust_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get kya_cust_nameValidationFailureMessages():Array
    {
        if (model_internal::_kya_cust_nameValidationFailureMessages == null)
            model_internal::calculateKya_cust_nameIsValid();

        return _kya_cust_nameValidationFailureMessages;
    }

    model_internal function set kya_cust_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_kya_cust_nameValidationFailureMessages;

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
            model_internal::_kya_cust_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_cust_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get kya_alloc_cmpyStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get kya_alloc_cmpyValidator() : StyleValidator
    {
        return model_internal::_kya_alloc_cmpyValidator;
    }

    model_internal function set _kya_alloc_cmpyIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_kya_alloc_cmpyIsValid;         
        if (oldValue !== value)
        {
            model_internal::_kya_alloc_cmpyIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_alloc_cmpyIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get kya_alloc_cmpyIsValid():Boolean
    {
        if (!model_internal::_kya_alloc_cmpyIsValidCacheInitialized)
        {
            model_internal::calculateKya_alloc_cmpyIsValid();
        }

        return model_internal::_kya_alloc_cmpyIsValid;
    }

    model_internal function calculateKya_alloc_cmpyIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_kya_alloc_cmpyValidator.validate(model_internal::_instance.kya_alloc_cmpy)
        model_internal::_kya_alloc_cmpyIsValid_der = (valRes.results == null);
        model_internal::_kya_alloc_cmpyIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::kya_alloc_cmpyValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::kya_alloc_cmpyValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get kya_alloc_cmpyValidationFailureMessages():Array
    {
        if (model_internal::_kya_alloc_cmpyValidationFailureMessages == null)
            model_internal::calculateKya_alloc_cmpyIsValid();

        return _kya_alloc_cmpyValidationFailureMessages;
    }

    model_internal function set kya_alloc_cmpyValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_kya_alloc_cmpyValidationFailureMessages;

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
            model_internal::_kya_alloc_cmpyValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_alloc_cmpyValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get kya_eqpt_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get kya_eqpt_nameValidator() : StyleValidator
    {
        return model_internal::_kya_eqpt_nameValidator;
    }

    model_internal function set _kya_eqpt_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_kya_eqpt_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_kya_eqpt_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_eqpt_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get kya_eqpt_nameIsValid():Boolean
    {
        if (!model_internal::_kya_eqpt_nameIsValidCacheInitialized)
        {
            model_internal::calculateKya_eqpt_nameIsValid();
        }

        return model_internal::_kya_eqpt_nameIsValid;
    }

    model_internal function calculateKya_eqpt_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_kya_eqpt_nameValidator.validate(model_internal::_instance.kya_eqpt_name)
        model_internal::_kya_eqpt_nameIsValid_der = (valRes.results == null);
        model_internal::_kya_eqpt_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::kya_eqpt_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::kya_eqpt_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get kya_eqpt_nameValidationFailureMessages():Array
    {
        if (model_internal::_kya_eqpt_nameValidationFailureMessages == null)
            model_internal::calculateKya_eqpt_nameIsValid();

        return _kya_eqpt_nameValidationFailureMessages;
    }

    model_internal function set kya_eqpt_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_kya_eqpt_nameValidationFailureMessages;

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
            model_internal::_kya_eqpt_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_eqpt_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get kya_phys_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get kya_phys_nameValidator() : StyleValidator
    {
        return model_internal::_kya_phys_nameValidator;
    }

    model_internal function set _kya_phys_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_kya_phys_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_kya_phys_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_phys_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get kya_phys_nameIsValid():Boolean
    {
        if (!model_internal::_kya_phys_nameIsValidCacheInitialized)
        {
            model_internal::calculateKya_phys_nameIsValid();
        }

        return model_internal::_kya_phys_nameIsValid;
    }

    model_internal function calculateKya_phys_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_kya_phys_nameValidator.validate(model_internal::_instance.kya_phys_name)
        model_internal::_kya_phys_nameIsValid_der = (valRes.results == null);
        model_internal::_kya_phys_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::kya_phys_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::kya_phys_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get kya_phys_nameValidationFailureMessages():Array
    {
        if (model_internal::_kya_phys_nameValidationFailureMessages == null)
            model_internal::calculateKya_phys_nameIsValid();

        return _kya_phys_nameValidationFailureMessages;
    }

    model_internal function set kya_phys_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_kya_phys_nameValidationFailureMessages;

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
            model_internal::_kya_phys_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_phys_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get kya_order_noStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get kya_order_noValidator() : StyleValidator
    {
        return model_internal::_kya_order_noValidator;
    }

    model_internal function set _kya_order_noIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_kya_order_noIsValid;         
        if (oldValue !== value)
        {
            model_internal::_kya_order_noIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_order_noIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get kya_order_noIsValid():Boolean
    {
        if (!model_internal::_kya_order_noIsValidCacheInitialized)
        {
            model_internal::calculateKya_order_noIsValid();
        }

        return model_internal::_kya_order_noIsValid;
    }

    model_internal function calculateKya_order_noIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_kya_order_noValidator.validate(model_internal::_instance.kya_order_no)
        model_internal::_kya_order_noIsValid_der = (valRes.results == null);
        model_internal::_kya_order_noIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::kya_order_noValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::kya_order_noValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get kya_order_noValidationFailureMessages():Array
    {
        if (model_internal::_kya_order_noValidationFailureMessages == null)
            model_internal::calculateKya_order_noIsValid();

        return _kya_order_noValidationFailureMessages;
    }

    model_internal function set kya_order_noValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_kya_order_noValidationFailureMessages;

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
            model_internal::_kya_order_noValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_order_noValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get kya_txtStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get kya_txtValidator() : StyleValidator
    {
        return model_internal::_kya_txtValidator;
    }

    model_internal function set _kya_txtIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_kya_txtIsValid;         
        if (oldValue !== value)
        {
            model_internal::_kya_txtIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_txtIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get kya_txtIsValid():Boolean
    {
        if (!model_internal::_kya_txtIsValidCacheInitialized)
        {
            model_internal::calculateKya_txtIsValid();
        }

        return model_internal::_kya_txtIsValid;
    }

    model_internal function calculateKya_txtIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_kya_txtValidator.validate(model_internal::_instance.kya_txt)
        model_internal::_kya_txtIsValid_der = (valRes.results == null);
        model_internal::_kya_txtIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::kya_txtValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::kya_txtValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get kya_txtValidationFailureMessages():Array
    {
        if (model_internal::_kya_txtValidationFailureMessages == null)
            model_internal::calculateKya_txtIsValid();

        return _kya_txtValidationFailureMessages;
    }

    model_internal function set kya_txtValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_kya_txtValidationFailureMessages;

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
            model_internal::_kya_txtValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_txtValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get kya_trip_noStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get kya_trip_noValidator() : StyleValidator
    {
        return model_internal::_kya_trip_noValidator;
    }

    model_internal function set _kya_trip_noIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_kya_trip_noIsValid;         
        if (oldValue !== value)
        {
            model_internal::_kya_trip_noIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_trip_noIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get kya_trip_noIsValid():Boolean
    {
        if (!model_internal::_kya_trip_noIsValidCacheInitialized)
        {
            model_internal::calculateKya_trip_noIsValid();
        }

        return model_internal::_kya_trip_noIsValid;
    }

    model_internal function calculateKya_trip_noIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_kya_trip_noValidator.validate(model_internal::_instance.kya_trip_no)
        model_internal::_kya_trip_noIsValid_der = (valRes.results == null);
        model_internal::_kya_trip_noIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::kya_trip_noValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::kya_trip_noValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get kya_trip_noValidationFailureMessages():Array
    {
        if (model_internal::_kya_trip_noValidationFailureMessages == null)
            model_internal::calculateKya_trip_noIsValid();

        return _kya_trip_noValidationFailureMessages;
    }

    model_internal function set kya_trip_noValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_kya_trip_noValidationFailureMessages;

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
            model_internal::_kya_trip_noValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_trip_noValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get kya_timecodeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get kya_timecodeValidator() : StyleValidator
    {
        return model_internal::_kya_timecodeValidator;
    }

    model_internal function set _kya_timecodeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_kya_timecodeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_kya_timecodeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_timecodeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get kya_timecodeIsValid():Boolean
    {
        if (!model_internal::_kya_timecodeIsValidCacheInitialized)
        {
            model_internal::calculateKya_timecodeIsValid();
        }

        return model_internal::_kya_timecodeIsValid;
    }

    model_internal function calculateKya_timecodeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_kya_timecodeValidator.validate(model_internal::_instance.kya_timecode)
        model_internal::_kya_timecodeIsValid_der = (valRes.results == null);
        model_internal::_kya_timecodeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::kya_timecodeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::kya_timecodeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get kya_timecodeValidationFailureMessages():Array
    {
        if (model_internal::_kya_timecodeValidationFailureMessages == null)
            model_internal::calculateKya_timecodeIsValid();

        return _kya_timecodeValidationFailureMessages;
    }

    model_internal function set kya_timecodeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_kya_timecodeValidationFailureMessages;

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
            model_internal::_kya_timecodeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_timecodeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get kya_psnl_cmpyStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get kya_psnl_cmpyValidator() : StyleValidator
    {
        return model_internal::_kya_psnl_cmpyValidator;
    }

    model_internal function set _kya_psnl_cmpyIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_kya_psnl_cmpyIsValid;         
        if (oldValue !== value)
        {
            model_internal::_kya_psnl_cmpyIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_psnl_cmpyIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get kya_psnl_cmpyIsValid():Boolean
    {
        if (!model_internal::_kya_psnl_cmpyIsValidCacheInitialized)
        {
            model_internal::calculateKya_psnl_cmpyIsValid();
        }

        return model_internal::_kya_psnl_cmpyIsValid;
    }

    model_internal function calculateKya_psnl_cmpyIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_kya_psnl_cmpyValidator.validate(model_internal::_instance.kya_psnl_cmpy)
        model_internal::_kya_psnl_cmpyIsValid_der = (valRes.results == null);
        model_internal::_kya_psnl_cmpyIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::kya_psnl_cmpyValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::kya_psnl_cmpyValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get kya_psnl_cmpyValidationFailureMessages():Array
    {
        if (model_internal::_kya_psnl_cmpyValidationFailureMessages == null)
            model_internal::calculateKya_psnl_cmpyIsValid();

        return _kya_psnl_cmpyValidationFailureMessages;
    }

    model_internal function set kya_psnl_cmpyValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_kya_psnl_cmpyValidationFailureMessages;

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
            model_internal::_kya_psnl_cmpyValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_psnl_cmpyValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get kya_load_idStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get kya_load_idValidator() : StyleValidator
    {
        return model_internal::_kya_load_idValidator;
    }

    model_internal function set _kya_load_idIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_kya_load_idIsValid;         
        if (oldValue !== value)
        {
            model_internal::_kya_load_idIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_load_idIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get kya_load_idIsValid():Boolean
    {
        if (!model_internal::_kya_load_idIsValidCacheInitialized)
        {
            model_internal::calculateKya_load_idIsValid();
        }

        return model_internal::_kya_load_idIsValid;
    }

    model_internal function calculateKya_load_idIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_kya_load_idValidator.validate(model_internal::_instance.kya_load_id)
        model_internal::_kya_load_idIsValid_der = (valRes.results == null);
        model_internal::_kya_load_idIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::kya_load_idValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::kya_load_idValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get kya_load_idValidationFailureMessages():Array
    {
        if (model_internal::_kya_load_idValidationFailureMessages == null)
            model_internal::calculateKya_load_idIsValid();

        return _kya_load_idValidationFailureMessages;
    }

    model_internal function set kya_load_idValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_kya_load_idValidationFailureMessages;

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
            model_internal::_kya_load_idValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_load_idValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get kya_order_descStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get kya_order_descValidator() : StyleValidator
    {
        return model_internal::_kya_order_descValidator;
    }

    model_internal function set _kya_order_descIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_kya_order_descIsValid;         
        if (oldValue !== value)
        {
            model_internal::_kya_order_descIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_order_descIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get kya_order_descIsValid():Boolean
    {
        if (!model_internal::_kya_order_descIsValidCacheInitialized)
        {
            model_internal::calculateKya_order_descIsValid();
        }

        return model_internal::_kya_order_descIsValid;
    }

    model_internal function calculateKya_order_descIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_kya_order_descValidator.validate(model_internal::_instance.kya_order_desc)
        model_internal::_kya_order_descIsValid_der = (valRes.results == null);
        model_internal::_kya_order_descIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::kya_order_descValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::kya_order_descValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get kya_order_descValidationFailureMessages():Array
    {
        if (model_internal::_kya_order_descValidationFailureMessages == null)
            model_internal::calculateKya_order_descIsValid();

        return _kya_order_descValidationFailureMessages;
    }

    model_internal function set kya_order_descValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_kya_order_descValidationFailureMessages;

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
            model_internal::_kya_order_descValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_order_descValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get kya_supp_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get kya_supp_nameValidator() : StyleValidator
    {
        return model_internal::_kya_supp_nameValidator;
    }

    model_internal function set _kya_supp_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_kya_supp_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_kya_supp_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_supp_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get kya_supp_nameIsValid():Boolean
    {
        if (!model_internal::_kya_supp_nameIsValidCacheInitialized)
        {
            model_internal::calculateKya_supp_nameIsValid();
        }

        return model_internal::_kya_supp_nameIsValid;
    }

    model_internal function calculateKya_supp_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_kya_supp_nameValidator.validate(model_internal::_instance.kya_supp_name)
        model_internal::_kya_supp_nameIsValid_der = (valRes.results == null);
        model_internal::_kya_supp_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::kya_supp_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::kya_supp_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get kya_supp_nameValidationFailureMessages():Array
    {
        if (model_internal::_kya_supp_nameValidationFailureMessages == null)
            model_internal::calculateKya_supp_nameIsValid();

        return _kya_supp_nameValidationFailureMessages;
    }

    model_internal function set kya_supp_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_kya_supp_nameValidationFailureMessages;

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
            model_internal::_kya_supp_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_supp_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get kya_alloc_cmpy_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get kya_alloc_cmpy_nameValidator() : StyleValidator
    {
        return model_internal::_kya_alloc_cmpy_nameValidator;
    }

    model_internal function set _kya_alloc_cmpy_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_kya_alloc_cmpy_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_kya_alloc_cmpy_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_alloc_cmpy_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get kya_alloc_cmpy_nameIsValid():Boolean
    {
        if (!model_internal::_kya_alloc_cmpy_nameIsValidCacheInitialized)
        {
            model_internal::calculateKya_alloc_cmpy_nameIsValid();
        }

        return model_internal::_kya_alloc_cmpy_nameIsValid;
    }

    model_internal function calculateKya_alloc_cmpy_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_kya_alloc_cmpy_nameValidator.validate(model_internal::_instance.kya_alloc_cmpy_name)
        model_internal::_kya_alloc_cmpy_nameIsValid_der = (valRes.results == null);
        model_internal::_kya_alloc_cmpy_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::kya_alloc_cmpy_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::kya_alloc_cmpy_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get kya_alloc_cmpy_nameValidationFailureMessages():Array
    {
        if (model_internal::_kya_alloc_cmpy_nameValidationFailureMessages == null)
            model_internal::calculateKya_alloc_cmpy_nameIsValid();

        return _kya_alloc_cmpy_nameValidationFailureMessages;
    }

    model_internal function set kya_alloc_cmpy_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_kya_alloc_cmpy_nameValidationFailureMessages;

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
            model_internal::_kya_alloc_cmpy_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_alloc_cmpy_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get kya_pinStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get kya_pinValidator() : StyleValidator
    {
        return model_internal::_kya_pinValidator;
    }

    model_internal function set _kya_pinIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_kya_pinIsValid;         
        if (oldValue !== value)
        {
            model_internal::_kya_pinIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_pinIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get kya_pinIsValid():Boolean
    {
        if (!model_internal::_kya_pinIsValidCacheInitialized)
        {
            model_internal::calculateKya_pinIsValid();
        }

        return model_internal::_kya_pinIsValid;
    }

    model_internal function calculateKya_pinIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_kya_pinValidator.validate(model_internal::_instance.kya_pin)
        model_internal::_kya_pinIsValid_der = (valRes.results == null);
        model_internal::_kya_pinIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::kya_pinValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::kya_pinValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get kya_pinValidationFailureMessages():Array
    {
        if (model_internal::_kya_pinValidationFailureMessages == null)
            model_internal::calculateKya_pinIsValid();

        return _kya_pinValidationFailureMessages;
    }

    model_internal function set kya_pinValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_kya_pinValidationFailureMessages;

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
            model_internal::_kya_pinValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_pinValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get kya_phys_typeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get kya_phys_typeValidator() : StyleValidator
    {
        return model_internal::_kya_phys_typeValidator;
    }

    model_internal function set _kya_phys_typeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_kya_phys_typeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_kya_phys_typeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_phys_typeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get kya_phys_typeIsValid():Boolean
    {
        if (!model_internal::_kya_phys_typeIsValidCacheInitialized)
        {
            model_internal::calculateKya_phys_typeIsValid();
        }

        return model_internal::_kya_phys_typeIsValid;
    }

    model_internal function calculateKya_phys_typeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_kya_phys_typeValidator.validate(model_internal::_instance.kya_phys_type)
        model_internal::_kya_phys_typeIsValid_der = (valRes.results == null);
        model_internal::_kya_phys_typeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::kya_phys_typeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::kya_phys_typeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get kya_phys_typeValidationFailureMessages():Array
    {
        if (model_internal::_kya_phys_typeValidationFailureMessages == null)
            model_internal::calculateKya_phys_typeIsValid();

        return _kya_phys_typeValidationFailureMessages;
    }

    model_internal function set kya_phys_typeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_kya_phys_typeValidationFailureMessages;

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
            model_internal::_kya_phys_typeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_phys_typeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get kya_eqpt_descStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get kya_eqpt_descValidator() : StyleValidator
    {
        return model_internal::_kya_eqpt_descValidator;
    }

    model_internal function set _kya_eqpt_descIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_kya_eqpt_descIsValid;         
        if (oldValue !== value)
        {
            model_internal::_kya_eqpt_descIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_eqpt_descIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get kya_eqpt_descIsValid():Boolean
    {
        if (!model_internal::_kya_eqpt_descIsValidCacheInitialized)
        {
            model_internal::calculateKya_eqpt_descIsValid();
        }

        return model_internal::_kya_eqpt_descIsValid;
    }

    model_internal function calculateKya_eqpt_descIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_kya_eqpt_descValidator.validate(model_internal::_instance.kya_eqpt_desc)
        model_internal::_kya_eqpt_descIsValid_der = (valRes.results == null);
        model_internal::_kya_eqpt_descIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::kya_eqpt_descValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::kya_eqpt_descValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get kya_eqpt_descValidationFailureMessages():Array
    {
        if (model_internal::_kya_eqpt_descValidationFailureMessages == null)
            model_internal::calculateKya_eqpt_descIsValid();

        return _kya_eqpt_descValidationFailureMessages;
    }

    model_internal function set kya_eqpt_descValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_kya_eqpt_descValidationFailureMessages;

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
            model_internal::_kya_eqpt_descValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_eqpt_descValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get kya_tnkr_descStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get kya_tnkr_descValidator() : StyleValidator
    {
        return model_internal::_kya_tnkr_descValidator;
    }

    model_internal function set _kya_tnkr_descIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_kya_tnkr_descIsValid;         
        if (oldValue !== value)
        {
            model_internal::_kya_tnkr_descIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_tnkr_descIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get kya_tnkr_descIsValid():Boolean
    {
        if (!model_internal::_kya_tnkr_descIsValidCacheInitialized)
        {
            model_internal::calculateKya_tnkr_descIsValid();
        }

        return model_internal::_kya_tnkr_descIsValid;
    }

    model_internal function calculateKya_tnkr_descIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_kya_tnkr_descValidator.validate(model_internal::_instance.kya_tnkr_desc)
        model_internal::_kya_tnkr_descIsValid_der = (valRes.results == null);
        model_internal::_kya_tnkr_descIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::kya_tnkr_descValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::kya_tnkr_descValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get kya_tnkr_descValidationFailureMessages():Array
    {
        if (model_internal::_kya_tnkr_descValidationFailureMessages == null)
            model_internal::calculateKya_tnkr_descIsValid();

        return _kya_tnkr_descValidationFailureMessages;
    }

    model_internal function set kya_tnkr_descValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_kya_tnkr_descValidationFailureMessages;

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
            model_internal::_kya_tnkr_descValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_tnkr_descValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get kya_typeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get kya_typeValidator() : StyleValidator
    {
        return model_internal::_kya_typeValidator;
    }

    model_internal function set _kya_typeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_kya_typeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_kya_typeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_typeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get kya_typeIsValid():Boolean
    {
        if (!model_internal::_kya_typeIsValidCacheInitialized)
        {
            model_internal::calculateKya_typeIsValid();
        }

        return model_internal::_kya_typeIsValid;
    }

    model_internal function calculateKya_typeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_kya_typeValidator.validate(model_internal::_instance.kya_type)
        model_internal::_kya_typeIsValid_der = (valRes.results == null);
        model_internal::_kya_typeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::kya_typeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::kya_typeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get kya_typeValidationFailureMessages():Array
    {
        if (model_internal::_kya_typeValidationFailureMessages == null)
            model_internal::calculateKya_typeIsValid();

        return _kya_typeValidationFailureMessages;
    }

    model_internal function set kya_typeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_kya_typeValidationFailureMessages;

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
            model_internal::_kya_typeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_typeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get kya_psnl_cmpy_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get kya_psnl_cmpy_nameValidator() : StyleValidator
    {
        return model_internal::_kya_psnl_cmpy_nameValidator;
    }

    model_internal function set _kya_psnl_cmpy_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_kya_psnl_cmpy_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_kya_psnl_cmpy_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_psnl_cmpy_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get kya_psnl_cmpy_nameIsValid():Boolean
    {
        if (!model_internal::_kya_psnl_cmpy_nameIsValidCacheInitialized)
        {
            model_internal::calculateKya_psnl_cmpy_nameIsValid();
        }

        return model_internal::_kya_psnl_cmpy_nameIsValid;
    }

    model_internal function calculateKya_psnl_cmpy_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_kya_psnl_cmpy_nameValidator.validate(model_internal::_instance.kya_psnl_cmpy_name)
        model_internal::_kya_psnl_cmpy_nameIsValid_der = (valRes.results == null);
        model_internal::_kya_psnl_cmpy_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::kya_psnl_cmpy_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::kya_psnl_cmpy_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get kya_psnl_cmpy_nameValidationFailureMessages():Array
    {
        if (model_internal::_kya_psnl_cmpy_nameValidationFailureMessages == null)
            model_internal::calculateKya_psnl_cmpy_nameIsValid();

        return _kya_psnl_cmpy_nameValidationFailureMessages;
    }

    model_internal function set kya_psnl_cmpy_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_kya_psnl_cmpy_nameValidationFailureMessages;

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
            model_internal::_kya_psnl_cmpy_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_psnl_cmpy_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get kya_lockStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get kya_lockValidator() : StyleValidator
    {
        return model_internal::_kya_lockValidator;
    }

    model_internal function set _kya_lockIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_kya_lockIsValid;         
        if (oldValue !== value)
        {
            model_internal::_kya_lockIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_lockIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get kya_lockIsValid():Boolean
    {
        if (!model_internal::_kya_lockIsValidCacheInitialized)
        {
            model_internal::calculateKya_lockIsValid();
        }

        return model_internal::_kya_lockIsValid;
    }

    model_internal function calculateKya_lockIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_kya_lockValidator.validate(model_internal::_instance.kya_lock)
        model_internal::_kya_lockIsValid_der = (valRes.results == null);
        model_internal::_kya_lockIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::kya_lockValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::kya_lockValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get kya_lockValidationFailureMessages():Array
    {
        if (model_internal::_kya_lockValidationFailureMessages == null)
            model_internal::calculateKya_lockIsValid();

        return _kya_lockValidationFailureMessages;
    }

    model_internal function set kya_lockValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_kya_lockValidationFailureMessages;

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
            model_internal::_kya_lockValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_lockValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get kya_key_noStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get kya_key_noValidator() : StyleValidator
    {
        return model_internal::_kya_key_noValidator;
    }

    model_internal function set _kya_key_noIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_kya_key_noIsValid;         
        if (oldValue !== value)
        {
            model_internal::_kya_key_noIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_key_noIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get kya_key_noIsValid():Boolean
    {
        if (!model_internal::_kya_key_noIsValidCacheInitialized)
        {
            model_internal::calculateKya_key_noIsValid();
        }

        return model_internal::_kya_key_noIsValid;
    }

    model_internal function calculateKya_key_noIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_kya_key_noValidator.validate(model_internal::_instance.kya_key_no)
        model_internal::_kya_key_noIsValid_der = (valRes.results == null);
        model_internal::_kya_key_noIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::kya_key_noValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::kya_key_noValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get kya_key_noValidationFailureMessages():Array
    {
        if (model_internal::_kya_key_noValidationFailureMessages == null)
            model_internal::calculateKya_key_noIsValid();

        return _kya_key_noValidationFailureMessages;
    }

    model_internal function set kya_key_noValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_kya_key_noValidationFailureMessages;

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
            model_internal::_kya_key_noValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_key_noValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get kya_supplierStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get kya_supplierValidator() : StyleValidator
    {
        return model_internal::_kya_supplierValidator;
    }

    model_internal function set _kya_supplierIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_kya_supplierIsValid;         
        if (oldValue !== value)
        {
            model_internal::_kya_supplierIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_supplierIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get kya_supplierIsValid():Boolean
    {
        if (!model_internal::_kya_supplierIsValidCacheInitialized)
        {
            model_internal::calculateKya_supplierIsValid();
        }

        return model_internal::_kya_supplierIsValid;
    }

    model_internal function calculateKya_supplierIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_kya_supplierValidator.validate(model_internal::_instance.kya_supplier)
        model_internal::_kya_supplierIsValid_der = (valRes.results == null);
        model_internal::_kya_supplierIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::kya_supplierValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::kya_supplierValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get kya_supplierValidationFailureMessages():Array
    {
        if (model_internal::_kya_supplierValidationFailureMessages == null)
            model_internal::calculateKya_supplierIsValid();

        return _kya_supplierValidationFailureMessages;
    }

    model_internal function set kya_supplierValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_kya_supplierValidationFailureMessages;

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
            model_internal::_kya_supplierValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_supplierValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get kya_site_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get kya_site_nameValidator() : StyleValidator
    {
        return model_internal::_kya_site_nameValidator;
    }

    model_internal function set _kya_site_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_kya_site_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_kya_site_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_site_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get kya_site_nameIsValid():Boolean
    {
        if (!model_internal::_kya_site_nameIsValidCacheInitialized)
        {
            model_internal::calculateKya_site_nameIsValid();
        }

        return model_internal::_kya_site_nameIsValid;
    }

    model_internal function calculateKya_site_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_kya_site_nameValidator.validate(model_internal::_instance.kya_site_name)
        model_internal::_kya_site_nameIsValid_der = (valRes.results == null);
        model_internal::_kya_site_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::kya_site_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::kya_site_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get kya_site_nameValidationFailureMessages():Array
    {
        if (model_internal::_kya_site_nameValidationFailureMessages == null)
            model_internal::calculateKya_site_nameIsValid();

        return _kya_site_nameValidationFailureMessages;
    }

    model_internal function set kya_site_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_kya_site_nameValidationFailureMessages;

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
            model_internal::_kya_site_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_site_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get kya_load_siteStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get kya_load_siteValidator() : StyleValidator
    {
        return model_internal::_kya_load_siteValidator;
    }

    model_internal function set _kya_load_siteIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_kya_load_siteIsValid;         
        if (oldValue !== value)
        {
            model_internal::_kya_load_siteIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_load_siteIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get kya_load_siteIsValid():Boolean
    {
        if (!model_internal::_kya_load_siteIsValidCacheInitialized)
        {
            model_internal::calculateKya_load_siteIsValid();
        }

        return model_internal::_kya_load_siteIsValid;
    }

    model_internal function calculateKya_load_siteIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_kya_load_siteValidator.validate(model_internal::_instance.kya_load_site)
        model_internal::_kya_load_siteIsValid_der = (valRes.results == null);
        model_internal::_kya_load_siteIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::kya_load_siteValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::kya_load_siteValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get kya_load_siteValidationFailureMessages():Array
    {
        if (model_internal::_kya_load_siteValidationFailureMessages == null)
            model_internal::calculateKya_load_siteIsValid();

        return _kya_load_siteValidationFailureMessages;
    }

    model_internal function set kya_load_siteValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_kya_load_siteValidationFailureMessages;

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
            model_internal::_kya_load_siteValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_load_siteValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get kya_tnkr_cmpy_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get kya_tnkr_cmpy_nameValidator() : StyleValidator
    {
        return model_internal::_kya_tnkr_cmpy_nameValidator;
    }

    model_internal function set _kya_tnkr_cmpy_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_kya_tnkr_cmpy_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_kya_tnkr_cmpy_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_tnkr_cmpy_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get kya_tnkr_cmpy_nameIsValid():Boolean
    {
        if (!model_internal::_kya_tnkr_cmpy_nameIsValidCacheInitialized)
        {
            model_internal::calculateKya_tnkr_cmpy_nameIsValid();
        }

        return model_internal::_kya_tnkr_cmpy_nameIsValid;
    }

    model_internal function calculateKya_tnkr_cmpy_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_kya_tnkr_cmpy_nameValidator.validate(model_internal::_instance.kya_tnkr_cmpy_name)
        model_internal::_kya_tnkr_cmpy_nameIsValid_der = (valRes.results == null);
        model_internal::_kya_tnkr_cmpy_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::kya_tnkr_cmpy_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::kya_tnkr_cmpy_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get kya_tnkr_cmpy_nameValidationFailureMessages():Array
    {
        if (model_internal::_kya_tnkr_cmpy_nameValidationFailureMessages == null)
            model_internal::calculateKya_tnkr_cmpy_nameIsValid();

        return _kya_tnkr_cmpy_nameValidationFailureMessages;
    }

    model_internal function set kya_tnkr_cmpy_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_kya_tnkr_cmpy_nameValidationFailureMessages;

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
            model_internal::_kya_tnkr_cmpy_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "kya_tnkr_cmpy_nameValidationFailureMessages", oldValue, value));
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
            case("kya_equipment"):
            {
                return kya_equipmentValidationFailureMessages;
            }
            case("kya_key_issuer"):
            {
                return kya_key_issuerValidationFailureMessages;
            }
            case("kya_type_name"):
            {
                return kya_type_nameValidationFailureMessages;
            }
            case("kya_personnel"):
            {
                return kya_personnelValidationFailureMessages;
            }
            case("kya_psnl_name"):
            {
                return kya_psnl_nameValidationFailureMessages;
            }
            case("kya_role"):
            {
                return kya_roleValidationFailureMessages;
            }
            case("kya_tnkr_name"):
            {
                return kya_tnkr_nameValidationFailureMessages;
            }
            case("kya_alloc_type_name"):
            {
                return kya_alloc_type_nameValidationFailureMessages;
            }
            case("kya_tanker"):
            {
                return kya_tankerValidationFailureMessages;
            }
            case("kya_cust_ordno"):
            {
                return kya_cust_ordnoValidationFailureMessages;
            }
            case("kya_tnkr_cmpy"):
            {
                return kya_tnkr_cmpyValidationFailureMessages;
            }
            case("kya_role_name"):
            {
                return kya_role_nameValidationFailureMessages;
            }
            case("kya_drawer"):
            {
                return kya_drawerValidationFailureMessages;
            }
            case("kya_issuer_name"):
            {
                return kya_issuer_nameValidationFailureMessages;
            }
            case("kya_key_created"):
            {
                return kya_key_createdValidationFailureMessages;
            }
            case("kya_pin_changed"):
            {
                return kya_pin_changedValidationFailureMessages;
            }
            case("kya_eqpt_cmpy"):
            {
                return kya_eqpt_cmpyValidationFailureMessages;
            }
            case("kya_adhoc"):
            {
                return kya_adhocValidationFailureMessages;
            }
            case("kya_alloc_type"):
            {
                return kya_alloc_typeValidationFailureMessages;
            }
            case("kya_etyp_name"):
            {
                return kya_etyp_nameValidationFailureMessages;
            }
            case("kya_eqpt_cmpy_name"):
            {
                return kya_eqpt_cmpy_nameValidationFailureMessages;
            }
            case("kya_draw_name"):
            {
                return kya_draw_nameValidationFailureMessages;
            }
            case("kya_cust_name"):
            {
                return kya_cust_nameValidationFailureMessages;
            }
            case("kya_alloc_cmpy"):
            {
                return kya_alloc_cmpyValidationFailureMessages;
            }
            case("kya_eqpt_name"):
            {
                return kya_eqpt_nameValidationFailureMessages;
            }
            case("kya_phys_name"):
            {
                return kya_phys_nameValidationFailureMessages;
            }
            case("kya_order_no"):
            {
                return kya_order_noValidationFailureMessages;
            }
            case("kya_txt"):
            {
                return kya_txtValidationFailureMessages;
            }
            case("kya_trip_no"):
            {
                return kya_trip_noValidationFailureMessages;
            }
            case("kya_timecode"):
            {
                return kya_timecodeValidationFailureMessages;
            }
            case("kya_psnl_cmpy"):
            {
                return kya_psnl_cmpyValidationFailureMessages;
            }
            case("kya_load_id"):
            {
                return kya_load_idValidationFailureMessages;
            }
            case("kya_order_desc"):
            {
                return kya_order_descValidationFailureMessages;
            }
            case("kya_supp_name"):
            {
                return kya_supp_nameValidationFailureMessages;
            }
            case("kya_alloc_cmpy_name"):
            {
                return kya_alloc_cmpy_nameValidationFailureMessages;
            }
            case("kya_pin"):
            {
                return kya_pinValidationFailureMessages;
            }
            case("kya_phys_type"):
            {
                return kya_phys_typeValidationFailureMessages;
            }
            case("kya_eqpt_desc"):
            {
                return kya_eqpt_descValidationFailureMessages;
            }
            case("kya_tnkr_desc"):
            {
                return kya_tnkr_descValidationFailureMessages;
            }
            case("kya_type"):
            {
                return kya_typeValidationFailureMessages;
            }
            case("kya_psnl_cmpy_name"):
            {
                return kya_psnl_cmpy_nameValidationFailureMessages;
            }
            case("kya_lock"):
            {
                return kya_lockValidationFailureMessages;
            }
            case("kya_key_no"):
            {
                return kya_key_noValidationFailureMessages;
            }
            case("kya_supplier"):
            {
                return kya_supplierValidationFailureMessages;
            }
            case("kya_site_name"):
            {
                return kya_site_nameValidationFailureMessages;
            }
            case("kya_load_site"):
            {
                return kya_load_siteValidationFailureMessages;
            }
            case("kya_tnkr_cmpy_name"):
            {
                return kya_tnkr_cmpy_nameValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
