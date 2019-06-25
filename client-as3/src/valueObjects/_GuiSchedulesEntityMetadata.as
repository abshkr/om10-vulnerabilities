
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
internal class _GuiSchedulesEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("shls_ld_start", "supplier_code", "rn", "drawer_code", "shls_supp_org", "shlsload_load_id", "shls_ship_to_num", "shls_ld_type", "order_no", "shls_sold_to_num", "shls_terminal", "shls_exp2", "shls_trip_no_org", "shls_trip_no", "order_cust_ordno", "carrier", "driver", "ld_type", "supplier", "order_ref_code", "shls_caldate", "tnkr_name", "shls_status", "status", "last_chg_time", "order_cust_cmpy_name", "shl_ret_loc", "order_cust", "operator", "shls_shift", "order_cust_cmpy_code", "load_reverse_flag", "carrier_code", "drawer_name", "tnkr_code", "cmpy_schd_archive", "shedule_profile", "cmpy_schd_rev_repost", "shls_ld_end", "shls_priority");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("shls_ld_start", "supplier_code", "rn", "drawer_code", "shls_supp_org", "shlsload_load_id", "shls_ship_to_num", "shls_ld_type", "order_no", "shls_sold_to_num", "shls_terminal", "shls_exp2", "shls_trip_no_org", "shls_trip_no", "order_cust_ordno", "carrier", "driver", "ld_type", "supplier", "order_ref_code", "shls_caldate", "tnkr_name", "shls_status", "status", "last_chg_time", "order_cust_cmpy_name", "shl_ret_loc", "order_cust", "operator", "shls_shift", "order_cust_cmpy_code", "load_reverse_flag", "carrier_code", "drawer_name", "tnkr_code", "cmpy_schd_archive", "shedule_profile", "cmpy_schd_rev_repost", "shls_ld_end", "shls_priority");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("shls_ld_start", "supplier_code", "rn", "drawer_code", "shls_supp_org", "shlsload_load_id", "shls_ship_to_num", "shls_ld_type", "order_no", "shls_sold_to_num", "shls_terminal", "shls_exp2", "shls_trip_no_org", "shls_trip_no", "order_cust_ordno", "carrier", "driver", "ld_type", "supplier", "order_ref_code", "shls_caldate", "tnkr_name", "shls_status", "status", "last_chg_time", "order_cust_cmpy_name", "shl_ret_loc", "order_cust", "operator", "shls_shift", "order_cust_cmpy_code", "load_reverse_flag", "carrier_code", "drawer_name", "tnkr_code", "cmpy_schd_archive", "shedule_profile", "cmpy_schd_rev_repost", "shls_ld_end", "shls_priority");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("shls_ld_start", "supplier_code", "rn", "drawer_code", "shls_supp_org", "shlsload_load_id", "shls_ship_to_num", "shls_ld_type", "order_no", "shls_sold_to_num", "shls_terminal", "shls_exp2", "shls_trip_no_org", "shls_trip_no", "order_cust_ordno", "carrier", "driver", "ld_type", "supplier", "order_ref_code", "shls_caldate", "tnkr_name", "shls_status", "status", "last_chg_time", "order_cust_cmpy_name", "shl_ret_loc", "order_cust", "operator", "shls_shift", "order_cust_cmpy_code", "load_reverse_flag", "carrier_code", "drawer_name", "tnkr_code", "cmpy_schd_archive", "shedule_profile", "cmpy_schd_rev_repost", "shls_ld_end", "shls_priority");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("shls_ld_start", "supplier_code", "rn", "drawer_code", "shls_supp_org", "shlsload_load_id", "shls_ship_to_num", "shls_ld_type", "order_no", "shls_sold_to_num", "shls_terminal", "shls_exp2", "shls_trip_no_org", "shls_trip_no", "order_cust_ordno", "carrier", "driver", "ld_type", "supplier", "order_ref_code", "shls_caldate", "tnkr_name", "shls_status", "status", "last_chg_time", "order_cust_cmpy_name", "shl_ret_loc", "order_cust", "operator", "shls_shift", "order_cust_cmpy_code", "load_reverse_flag", "carrier_code", "drawer_name", "tnkr_code", "cmpy_schd_archive", "shedule_profile", "cmpy_schd_rev_repost", "shls_ld_end", "shls_priority");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "GuiSchedules";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _shls_ld_startIsValid:Boolean;
    model_internal var _shls_ld_startValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _shls_ld_startIsValidCacheInitialized:Boolean = false;
    model_internal var _shls_ld_startValidationFailureMessages:Array;
    
    model_internal var _supplier_codeIsValid:Boolean;
    model_internal var _supplier_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _supplier_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _supplier_codeValidationFailureMessages:Array;
    
    model_internal var _drawer_codeIsValid:Boolean;
    model_internal var _drawer_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _drawer_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _drawer_codeValidationFailureMessages:Array;
    
    model_internal var _shls_supp_orgIsValid:Boolean;
    model_internal var _shls_supp_orgValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _shls_supp_orgIsValidCacheInitialized:Boolean = false;
    model_internal var _shls_supp_orgValidationFailureMessages:Array;
    
    model_internal var _shlsload_load_idIsValid:Boolean;
    model_internal var _shlsload_load_idValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _shlsload_load_idIsValidCacheInitialized:Boolean = false;
    model_internal var _shlsload_load_idValidationFailureMessages:Array;
    
    model_internal var _shls_ship_to_numIsValid:Boolean;
    model_internal var _shls_ship_to_numValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _shls_ship_to_numIsValidCacheInitialized:Boolean = false;
    model_internal var _shls_ship_to_numValidationFailureMessages:Array;
    
    model_internal var _shls_ld_typeIsValid:Boolean;
    model_internal var _shls_ld_typeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _shls_ld_typeIsValidCacheInitialized:Boolean = false;
    model_internal var _shls_ld_typeValidationFailureMessages:Array;
    
    model_internal var _order_noIsValid:Boolean;
    model_internal var _order_noValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_noIsValidCacheInitialized:Boolean = false;
    model_internal var _order_noValidationFailureMessages:Array;
    
    model_internal var _shls_sold_to_numIsValid:Boolean;
    model_internal var _shls_sold_to_numValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _shls_sold_to_numIsValidCacheInitialized:Boolean = false;
    model_internal var _shls_sold_to_numValidationFailureMessages:Array;
    
    model_internal var _shls_terminalIsValid:Boolean;
    model_internal var _shls_terminalValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _shls_terminalIsValidCacheInitialized:Boolean = false;
    model_internal var _shls_terminalValidationFailureMessages:Array;
    
    model_internal var _shls_exp2IsValid:Boolean;
    model_internal var _shls_exp2Validator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _shls_exp2IsValidCacheInitialized:Boolean = false;
    model_internal var _shls_exp2ValidationFailureMessages:Array;
    
    model_internal var _shls_trip_no_orgIsValid:Boolean;
    model_internal var _shls_trip_no_orgValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _shls_trip_no_orgIsValidCacheInitialized:Boolean = false;
    model_internal var _shls_trip_no_orgValidationFailureMessages:Array;
    
    model_internal var _shls_trip_noIsValid:Boolean;
    model_internal var _shls_trip_noValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _shls_trip_noIsValidCacheInitialized:Boolean = false;
    model_internal var _shls_trip_noValidationFailureMessages:Array;
    
    model_internal var _order_cust_ordnoIsValid:Boolean;
    model_internal var _order_cust_ordnoValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_cust_ordnoIsValidCacheInitialized:Boolean = false;
    model_internal var _order_cust_ordnoValidationFailureMessages:Array;
    
    model_internal var _carrierIsValid:Boolean;
    model_internal var _carrierValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _carrierIsValidCacheInitialized:Boolean = false;
    model_internal var _carrierValidationFailureMessages:Array;
    
    model_internal var _driverIsValid:Boolean;
    model_internal var _driverValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _driverIsValidCacheInitialized:Boolean = false;
    model_internal var _driverValidationFailureMessages:Array;
    
    model_internal var _ld_typeIsValid:Boolean;
    model_internal var _ld_typeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _ld_typeIsValidCacheInitialized:Boolean = false;
    model_internal var _ld_typeValidationFailureMessages:Array;
    
    model_internal var _supplierIsValid:Boolean;
    model_internal var _supplierValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _supplierIsValidCacheInitialized:Boolean = false;
    model_internal var _supplierValidationFailureMessages:Array;
    
    model_internal var _order_ref_codeIsValid:Boolean;
    model_internal var _order_ref_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_ref_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _order_ref_codeValidationFailureMessages:Array;
    
    model_internal var _shls_caldateIsValid:Boolean;
    model_internal var _shls_caldateValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _shls_caldateIsValidCacheInitialized:Boolean = false;
    model_internal var _shls_caldateValidationFailureMessages:Array;
    
    model_internal var _tnkr_nameIsValid:Boolean;
    model_internal var _tnkr_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tnkr_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _tnkr_nameValidationFailureMessages:Array;
    
    model_internal var _shls_statusIsValid:Boolean;
    model_internal var _shls_statusValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _shls_statusIsValidCacheInitialized:Boolean = false;
    model_internal var _shls_statusValidationFailureMessages:Array;
    
    model_internal var _statusIsValid:Boolean;
    model_internal var _statusValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _statusIsValidCacheInitialized:Boolean = false;
    model_internal var _statusValidationFailureMessages:Array;
    
    model_internal var _last_chg_timeIsValid:Boolean;
    model_internal var _last_chg_timeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _last_chg_timeIsValidCacheInitialized:Boolean = false;
    model_internal var _last_chg_timeValidationFailureMessages:Array;
    
    model_internal var _order_cust_cmpy_nameIsValid:Boolean;
    model_internal var _order_cust_cmpy_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_cust_cmpy_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _order_cust_cmpy_nameValidationFailureMessages:Array;
    
    model_internal var _shl_ret_locIsValid:Boolean;
    model_internal var _shl_ret_locValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _shl_ret_locIsValidCacheInitialized:Boolean = false;
    model_internal var _shl_ret_locValidationFailureMessages:Array;
    
    model_internal var _order_custIsValid:Boolean;
    model_internal var _order_custValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_custIsValidCacheInitialized:Boolean = false;
    model_internal var _order_custValidationFailureMessages:Array;
    
    model_internal var _operatorIsValid:Boolean;
    model_internal var _operatorValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _operatorIsValidCacheInitialized:Boolean = false;
    model_internal var _operatorValidationFailureMessages:Array;
    
    model_internal var _shls_shiftIsValid:Boolean;
    model_internal var _shls_shiftValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _shls_shiftIsValidCacheInitialized:Boolean = false;
    model_internal var _shls_shiftValidationFailureMessages:Array;
    
    model_internal var _order_cust_cmpy_codeIsValid:Boolean;
    model_internal var _order_cust_cmpy_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_cust_cmpy_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _order_cust_cmpy_codeValidationFailureMessages:Array;
    
    model_internal var _load_reverse_flagIsValid:Boolean;
    model_internal var _load_reverse_flagValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _load_reverse_flagIsValidCacheInitialized:Boolean = false;
    model_internal var _load_reverse_flagValidationFailureMessages:Array;
    
    model_internal var _carrier_codeIsValid:Boolean;
    model_internal var _carrier_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _carrier_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _carrier_codeValidationFailureMessages:Array;
    
    model_internal var _drawer_nameIsValid:Boolean;
    model_internal var _drawer_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _drawer_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _drawer_nameValidationFailureMessages:Array;
    
    model_internal var _tnkr_codeIsValid:Boolean;
    model_internal var _tnkr_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tnkr_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _tnkr_codeValidationFailureMessages:Array;
    
    model_internal var _cmpy_schd_archiveIsValid:Boolean;
    model_internal var _cmpy_schd_archiveValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_schd_archiveIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_schd_archiveValidationFailureMessages:Array;
    
    model_internal var _shedule_profileIsValid:Boolean;
    model_internal var _shedule_profileValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _shedule_profileIsValidCacheInitialized:Boolean = false;
    model_internal var _shedule_profileValidationFailureMessages:Array;
    
    model_internal var _cmpy_schd_rev_repostIsValid:Boolean;
    model_internal var _cmpy_schd_rev_repostValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_schd_rev_repostIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_schd_rev_repostValidationFailureMessages:Array;
    
    model_internal var _shls_ld_endIsValid:Boolean;
    model_internal var _shls_ld_endValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _shls_ld_endIsValidCacheInitialized:Boolean = false;
    model_internal var _shls_ld_endValidationFailureMessages:Array;
    
    model_internal var _shls_priorityIsValid:Boolean;
    model_internal var _shls_priorityValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _shls_priorityIsValidCacheInitialized:Boolean = false;
    model_internal var _shls_priorityValidationFailureMessages:Array;

    model_internal var _instance:_Super_GuiSchedules;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _GuiSchedulesEntityMetadata(value : _Super_GuiSchedules)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["shls_ld_start"] = new Array();
            model_internal::dependentsOnMap["supplier_code"] = new Array();
            model_internal::dependentsOnMap["rn"] = new Array();
            model_internal::dependentsOnMap["drawer_code"] = new Array();
            model_internal::dependentsOnMap["shls_supp_org"] = new Array();
            model_internal::dependentsOnMap["shlsload_load_id"] = new Array();
            model_internal::dependentsOnMap["shls_ship_to_num"] = new Array();
            model_internal::dependentsOnMap["shls_ld_type"] = new Array();
            model_internal::dependentsOnMap["order_no"] = new Array();
            model_internal::dependentsOnMap["shls_sold_to_num"] = new Array();
            model_internal::dependentsOnMap["shls_terminal"] = new Array();
            model_internal::dependentsOnMap["shls_exp2"] = new Array();
            model_internal::dependentsOnMap["shls_trip_no_org"] = new Array();
            model_internal::dependentsOnMap["shls_trip_no"] = new Array();
            model_internal::dependentsOnMap["order_cust_ordno"] = new Array();
            model_internal::dependentsOnMap["carrier"] = new Array();
            model_internal::dependentsOnMap["driver"] = new Array();
            model_internal::dependentsOnMap["ld_type"] = new Array();
            model_internal::dependentsOnMap["supplier"] = new Array();
            model_internal::dependentsOnMap["order_ref_code"] = new Array();
            model_internal::dependentsOnMap["shls_caldate"] = new Array();
            model_internal::dependentsOnMap["tnkr_name"] = new Array();
            model_internal::dependentsOnMap["shls_status"] = new Array();
            model_internal::dependentsOnMap["status"] = new Array();
            model_internal::dependentsOnMap["last_chg_time"] = new Array();
            model_internal::dependentsOnMap["order_cust_cmpy_name"] = new Array();
            model_internal::dependentsOnMap["shl_ret_loc"] = new Array();
            model_internal::dependentsOnMap["order_cust"] = new Array();
            model_internal::dependentsOnMap["operator"] = new Array();
            model_internal::dependentsOnMap["shls_shift"] = new Array();
            model_internal::dependentsOnMap["order_cust_cmpy_code"] = new Array();
            model_internal::dependentsOnMap["load_reverse_flag"] = new Array();
            model_internal::dependentsOnMap["carrier_code"] = new Array();
            model_internal::dependentsOnMap["drawer_name"] = new Array();
            model_internal::dependentsOnMap["tnkr_code"] = new Array();
            model_internal::dependentsOnMap["cmpy_schd_archive"] = new Array();
            model_internal::dependentsOnMap["shedule_profile"] = new Array();
            model_internal::dependentsOnMap["cmpy_schd_rev_repost"] = new Array();
            model_internal::dependentsOnMap["shls_ld_end"] = new Array();
            model_internal::dependentsOnMap["shls_priority"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["shls_ld_start"] = "Object";
        model_internal::propertyTypeMap["supplier_code"] = "String";
        model_internal::propertyTypeMap["rn"] = "String";
        model_internal::propertyTypeMap["drawer_code"] = "String";
        model_internal::propertyTypeMap["shls_supp_org"] = "Object";
        model_internal::propertyTypeMap["shlsload_load_id"] = "String";
        model_internal::propertyTypeMap["shls_ship_to_num"] = "String";
        model_internal::propertyTypeMap["shls_ld_type"] = "String";
        model_internal::propertyTypeMap["order_no"] = "Object";
        model_internal::propertyTypeMap["shls_sold_to_num"] = "String";
        model_internal::propertyTypeMap["shls_terminal"] = "String";
        model_internal::propertyTypeMap["shls_exp2"] = "String";
        model_internal::propertyTypeMap["shls_trip_no_org"] = "Object";
        model_internal::propertyTypeMap["shls_trip_no"] = "String";
        model_internal::propertyTypeMap["order_cust_ordno"] = "Object";
        model_internal::propertyTypeMap["carrier"] = "String";
        model_internal::propertyTypeMap["driver"] = "Object";
        model_internal::propertyTypeMap["ld_type"] = "String";
        model_internal::propertyTypeMap["supplier"] = "String";
        model_internal::propertyTypeMap["order_ref_code"] = "Object";
        model_internal::propertyTypeMap["shls_caldate"] = "String";
        model_internal::propertyTypeMap["tnkr_name"] = "String";
        model_internal::propertyTypeMap["shls_status"] = "String";
        model_internal::propertyTypeMap["status"] = "String";
        model_internal::propertyTypeMap["last_chg_time"] = "String";
        model_internal::propertyTypeMap["order_cust_cmpy_name"] = "Object";
        model_internal::propertyTypeMap["shl_ret_loc"] = "String";
        model_internal::propertyTypeMap["order_cust"] = "Object";
        model_internal::propertyTypeMap["operator"] = "String";
        model_internal::propertyTypeMap["shls_shift"] = "String";
        model_internal::propertyTypeMap["order_cust_cmpy_code"] = "Object";
        model_internal::propertyTypeMap["load_reverse_flag"] = "Object";
        model_internal::propertyTypeMap["carrier_code"] = "String";
        model_internal::propertyTypeMap["drawer_name"] = "String";
        model_internal::propertyTypeMap["tnkr_code"] = "String";
        model_internal::propertyTypeMap["cmpy_schd_archive"] = "String";
        model_internal::propertyTypeMap["shedule_profile"] = "String";
        model_internal::propertyTypeMap["cmpy_schd_rev_repost"] = "String";
        model_internal::propertyTypeMap["shls_ld_end"] = "Object";
        model_internal::propertyTypeMap["shls_priority"] = "Object";

        model_internal::_instance = value;
        model_internal::_shls_ld_startValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForShls_ld_start);
        model_internal::_shls_ld_startValidator.required = true;
        model_internal::_shls_ld_startValidator.requiredFieldError = "shls_ld_start is required";
        //model_internal::_shls_ld_startValidator.source = model_internal::_instance;
        //model_internal::_shls_ld_startValidator.property = "shls_ld_start";
        model_internal::_supplier_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSupplier_code);
        model_internal::_supplier_codeValidator.required = true;
        model_internal::_supplier_codeValidator.requiredFieldError = "supplier_code is required";
        //model_internal::_supplier_codeValidator.source = model_internal::_instance;
        //model_internal::_supplier_codeValidator.property = "supplier_code";
        model_internal::_drawer_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForDrawer_code);
        model_internal::_drawer_codeValidator.required = true;
        model_internal::_drawer_codeValidator.requiredFieldError = "drawer_code is required";
        //model_internal::_drawer_codeValidator.source = model_internal::_instance;
        //model_internal::_drawer_codeValidator.property = "drawer_code";
        model_internal::_shls_supp_orgValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForShls_supp_org);
        model_internal::_shls_supp_orgValidator.required = true;
        model_internal::_shls_supp_orgValidator.requiredFieldError = "shls_supp_org is required";
        //model_internal::_shls_supp_orgValidator.source = model_internal::_instance;
        //model_internal::_shls_supp_orgValidator.property = "shls_supp_org";
        model_internal::_shlsload_load_idValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForShlsload_load_id);
        model_internal::_shlsload_load_idValidator.required = true;
        model_internal::_shlsload_load_idValidator.requiredFieldError = "shlsload_load_id is required";
        //model_internal::_shlsload_load_idValidator.source = model_internal::_instance;
        //model_internal::_shlsload_load_idValidator.property = "shlsload_load_id";
        model_internal::_shls_ship_to_numValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForShls_ship_to_num);
        model_internal::_shls_ship_to_numValidator.required = true;
        model_internal::_shls_ship_to_numValidator.requiredFieldError = "shls_ship_to_num is required";
        //model_internal::_shls_ship_to_numValidator.source = model_internal::_instance;
        //model_internal::_shls_ship_to_numValidator.property = "shls_ship_to_num";
        model_internal::_shls_ld_typeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForShls_ld_type);
        model_internal::_shls_ld_typeValidator.required = true;
        model_internal::_shls_ld_typeValidator.requiredFieldError = "shls_ld_type is required";
        //model_internal::_shls_ld_typeValidator.source = model_internal::_instance;
        //model_internal::_shls_ld_typeValidator.property = "shls_ld_type";
        model_internal::_order_noValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_no);
        model_internal::_order_noValidator.required = true;
        model_internal::_order_noValidator.requiredFieldError = "order_no is required";
        //model_internal::_order_noValidator.source = model_internal::_instance;
        //model_internal::_order_noValidator.property = "order_no";
        model_internal::_shls_sold_to_numValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForShls_sold_to_num);
        model_internal::_shls_sold_to_numValidator.required = true;
        model_internal::_shls_sold_to_numValidator.requiredFieldError = "shls_sold_to_num is required";
        //model_internal::_shls_sold_to_numValidator.source = model_internal::_instance;
        //model_internal::_shls_sold_to_numValidator.property = "shls_sold_to_num";
        model_internal::_shls_terminalValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForShls_terminal);
        model_internal::_shls_terminalValidator.required = true;
        model_internal::_shls_terminalValidator.requiredFieldError = "shls_terminal is required";
        //model_internal::_shls_terminalValidator.source = model_internal::_instance;
        //model_internal::_shls_terminalValidator.property = "shls_terminal";
        model_internal::_shls_exp2Validator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForShls_exp2);
        model_internal::_shls_exp2Validator.required = true;
        model_internal::_shls_exp2Validator.requiredFieldError = "shls_exp2 is required";
        //model_internal::_shls_exp2Validator.source = model_internal::_instance;
        //model_internal::_shls_exp2Validator.property = "shls_exp2";
        model_internal::_shls_trip_no_orgValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForShls_trip_no_org);
        model_internal::_shls_trip_no_orgValidator.required = true;
        model_internal::_shls_trip_no_orgValidator.requiredFieldError = "shls_trip_no_org is required";
        //model_internal::_shls_trip_no_orgValidator.source = model_internal::_instance;
        //model_internal::_shls_trip_no_orgValidator.property = "shls_trip_no_org";
        model_internal::_shls_trip_noValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForShls_trip_no);
        model_internal::_shls_trip_noValidator.required = true;
        model_internal::_shls_trip_noValidator.requiredFieldError = "shls_trip_no is required";
        //model_internal::_shls_trip_noValidator.source = model_internal::_instance;
        //model_internal::_shls_trip_noValidator.property = "shls_trip_no";
        model_internal::_order_cust_ordnoValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_cust_ordno);
        model_internal::_order_cust_ordnoValidator.required = true;
        model_internal::_order_cust_ordnoValidator.requiredFieldError = "order_cust_ordno is required";
        //model_internal::_order_cust_ordnoValidator.source = model_internal::_instance;
        //model_internal::_order_cust_ordnoValidator.property = "order_cust_ordno";
        model_internal::_carrierValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCarrier);
        model_internal::_carrierValidator.required = true;
        model_internal::_carrierValidator.requiredFieldError = "carrier is required";
        //model_internal::_carrierValidator.source = model_internal::_instance;
        //model_internal::_carrierValidator.property = "carrier";
        model_internal::_driverValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForDriver);
        model_internal::_driverValidator.required = true;
        model_internal::_driverValidator.requiredFieldError = "driver is required";
        //model_internal::_driverValidator.source = model_internal::_instance;
        //model_internal::_driverValidator.property = "driver";
        model_internal::_ld_typeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForLd_type);
        model_internal::_ld_typeValidator.required = true;
        model_internal::_ld_typeValidator.requiredFieldError = "ld_type is required";
        //model_internal::_ld_typeValidator.source = model_internal::_instance;
        //model_internal::_ld_typeValidator.property = "ld_type";
        model_internal::_supplierValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSupplier);
        model_internal::_supplierValidator.required = true;
        model_internal::_supplierValidator.requiredFieldError = "supplier is required";
        //model_internal::_supplierValidator.source = model_internal::_instance;
        //model_internal::_supplierValidator.property = "supplier";
        model_internal::_order_ref_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_ref_code);
        model_internal::_order_ref_codeValidator.required = true;
        model_internal::_order_ref_codeValidator.requiredFieldError = "order_ref_code is required";
        //model_internal::_order_ref_codeValidator.source = model_internal::_instance;
        //model_internal::_order_ref_codeValidator.property = "order_ref_code";
        model_internal::_shls_caldateValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForShls_caldate);
        model_internal::_shls_caldateValidator.required = true;
        model_internal::_shls_caldateValidator.requiredFieldError = "shls_caldate is required";
        //model_internal::_shls_caldateValidator.source = model_internal::_instance;
        //model_internal::_shls_caldateValidator.property = "shls_caldate";
        model_internal::_tnkr_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTnkr_name);
        model_internal::_tnkr_nameValidator.required = true;
        model_internal::_tnkr_nameValidator.requiredFieldError = "tnkr_name is required";
        //model_internal::_tnkr_nameValidator.source = model_internal::_instance;
        //model_internal::_tnkr_nameValidator.property = "tnkr_name";
        model_internal::_shls_statusValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForShls_status);
        model_internal::_shls_statusValidator.required = true;
        model_internal::_shls_statusValidator.requiredFieldError = "shls_status is required";
        //model_internal::_shls_statusValidator.source = model_internal::_instance;
        //model_internal::_shls_statusValidator.property = "shls_status";
        model_internal::_statusValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForStatus);
        model_internal::_statusValidator.required = true;
        model_internal::_statusValidator.requiredFieldError = "status is required";
        //model_internal::_statusValidator.source = model_internal::_instance;
        //model_internal::_statusValidator.property = "status";
        model_internal::_last_chg_timeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForLast_chg_time);
        model_internal::_last_chg_timeValidator.required = true;
        model_internal::_last_chg_timeValidator.requiredFieldError = "last_chg_time is required";
        //model_internal::_last_chg_timeValidator.source = model_internal::_instance;
        //model_internal::_last_chg_timeValidator.property = "last_chg_time";
        model_internal::_order_cust_cmpy_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_cust_cmpy_name);
        model_internal::_order_cust_cmpy_nameValidator.required = true;
        model_internal::_order_cust_cmpy_nameValidator.requiredFieldError = "order_cust_cmpy_name is required";
        //model_internal::_order_cust_cmpy_nameValidator.source = model_internal::_instance;
        //model_internal::_order_cust_cmpy_nameValidator.property = "order_cust_cmpy_name";
        model_internal::_shl_ret_locValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForShl_ret_loc);
        model_internal::_shl_ret_locValidator.required = true;
        model_internal::_shl_ret_locValidator.requiredFieldError = "shl_ret_loc is required";
        //model_internal::_shl_ret_locValidator.source = model_internal::_instance;
        //model_internal::_shl_ret_locValidator.property = "shl_ret_loc";
        model_internal::_order_custValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_cust);
        model_internal::_order_custValidator.required = true;
        model_internal::_order_custValidator.requiredFieldError = "order_cust is required";
        //model_internal::_order_custValidator.source = model_internal::_instance;
        //model_internal::_order_custValidator.property = "order_cust";
        model_internal::_operatorValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOperator);
        model_internal::_operatorValidator.required = true;
        model_internal::_operatorValidator.requiredFieldError = "operator is required";
        //model_internal::_operatorValidator.source = model_internal::_instance;
        //model_internal::_operatorValidator.property = "operator";
        model_internal::_shls_shiftValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForShls_shift);
        model_internal::_shls_shiftValidator.required = true;
        model_internal::_shls_shiftValidator.requiredFieldError = "shls_shift is required";
        //model_internal::_shls_shiftValidator.source = model_internal::_instance;
        //model_internal::_shls_shiftValidator.property = "shls_shift";
        model_internal::_order_cust_cmpy_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_cust_cmpy_code);
        model_internal::_order_cust_cmpy_codeValidator.required = true;
        model_internal::_order_cust_cmpy_codeValidator.requiredFieldError = "order_cust_cmpy_code is required";
        //model_internal::_order_cust_cmpy_codeValidator.source = model_internal::_instance;
        //model_internal::_order_cust_cmpy_codeValidator.property = "order_cust_cmpy_code";
        model_internal::_load_reverse_flagValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForLoad_reverse_flag);
        model_internal::_load_reverse_flagValidator.required = true;
        model_internal::_load_reverse_flagValidator.requiredFieldError = "load_reverse_flag is required";
        //model_internal::_load_reverse_flagValidator.source = model_internal::_instance;
        //model_internal::_load_reverse_flagValidator.property = "load_reverse_flag";
        model_internal::_carrier_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCarrier_code);
        model_internal::_carrier_codeValidator.required = true;
        model_internal::_carrier_codeValidator.requiredFieldError = "carrier_code is required";
        //model_internal::_carrier_codeValidator.source = model_internal::_instance;
        //model_internal::_carrier_codeValidator.property = "carrier_code";
        model_internal::_drawer_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForDrawer_name);
        model_internal::_drawer_nameValidator.required = true;
        model_internal::_drawer_nameValidator.requiredFieldError = "drawer_name is required";
        //model_internal::_drawer_nameValidator.source = model_internal::_instance;
        //model_internal::_drawer_nameValidator.property = "drawer_name";
        model_internal::_tnkr_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTnkr_code);
        model_internal::_tnkr_codeValidator.required = true;
        model_internal::_tnkr_codeValidator.requiredFieldError = "tnkr_code is required";
        //model_internal::_tnkr_codeValidator.source = model_internal::_instance;
        //model_internal::_tnkr_codeValidator.property = "tnkr_code";
        model_internal::_cmpy_schd_archiveValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_schd_archive);
        model_internal::_cmpy_schd_archiveValidator.required = true;
        model_internal::_cmpy_schd_archiveValidator.requiredFieldError = "cmpy_schd_archive is required";
        //model_internal::_cmpy_schd_archiveValidator.source = model_internal::_instance;
        //model_internal::_cmpy_schd_archiveValidator.property = "cmpy_schd_archive";
        model_internal::_shedule_profileValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForShedule_profile);
        model_internal::_shedule_profileValidator.required = true;
        model_internal::_shedule_profileValidator.requiredFieldError = "shedule_profile is required";
        //model_internal::_shedule_profileValidator.source = model_internal::_instance;
        //model_internal::_shedule_profileValidator.property = "shedule_profile";
        model_internal::_cmpy_schd_rev_repostValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_schd_rev_repost);
        model_internal::_cmpy_schd_rev_repostValidator.required = true;
        model_internal::_cmpy_schd_rev_repostValidator.requiredFieldError = "cmpy_schd_rev_repost is required";
        //model_internal::_cmpy_schd_rev_repostValidator.source = model_internal::_instance;
        //model_internal::_cmpy_schd_rev_repostValidator.property = "cmpy_schd_rev_repost";
        model_internal::_shls_ld_endValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForShls_ld_end);
        model_internal::_shls_ld_endValidator.required = true;
        model_internal::_shls_ld_endValidator.requiredFieldError = "shls_ld_end is required";
        //model_internal::_shls_ld_endValidator.source = model_internal::_instance;
        //model_internal::_shls_ld_endValidator.property = "shls_ld_end";
        model_internal::_shls_priorityValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForShls_priority);
        model_internal::_shls_priorityValidator.required = true;
        model_internal::_shls_priorityValidator.requiredFieldError = "shls_priority is required";
        //model_internal::_shls_priorityValidator.source = model_internal::_instance;
        //model_internal::_shls_priorityValidator.property = "shls_priority";
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
            throw new Error(propertyName + " is not a data property of entity GuiSchedules");
            
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
            throw new Error(propertyName + " is not a collection property of entity GuiSchedules");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of GuiSchedules");

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
            throw new Error(propertyName + " does not exist for entity GuiSchedules");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity GuiSchedules");
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
            throw new Error(propertyName + " does not exist for entity GuiSchedules");
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
    public function get isShls_ld_startAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSupplier_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isRnAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isDrawer_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isShls_supp_orgAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isShlsload_load_idAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isShls_ship_to_numAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isShls_ld_typeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_noAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isShls_sold_to_numAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isShls_terminalAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isShls_exp2Available():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isShls_trip_no_orgAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isShls_trip_noAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_cust_ordnoAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCarrierAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isDriverAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isLd_typeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSupplierAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_ref_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isShls_caldateAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTnkr_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isShls_statusAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isStatusAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isLast_chg_timeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_cust_cmpy_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isShl_ret_locAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_custAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOperatorAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isShls_shiftAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_cust_cmpy_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isLoad_reverse_flagAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCarrier_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isDrawer_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTnkr_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_schd_archiveAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isShedule_profileAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_schd_rev_repostAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isShls_ld_endAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isShls_priorityAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnShls_ld_start():void
    {
        if (model_internal::_shls_ld_startIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfShls_ld_start = null;
            model_internal::calculateShls_ld_startIsValid();
        }
    }
    public function invalidateDependentOnSupplier_code():void
    {
        if (model_internal::_supplier_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSupplier_code = null;
            model_internal::calculateSupplier_codeIsValid();
        }
    }
    public function invalidateDependentOnDrawer_code():void
    {
        if (model_internal::_drawer_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfDrawer_code = null;
            model_internal::calculateDrawer_codeIsValid();
        }
    }
    public function invalidateDependentOnShls_supp_org():void
    {
        if (model_internal::_shls_supp_orgIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfShls_supp_org = null;
            model_internal::calculateShls_supp_orgIsValid();
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
    public function invalidateDependentOnShls_ship_to_num():void
    {
        if (model_internal::_shls_ship_to_numIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfShls_ship_to_num = null;
            model_internal::calculateShls_ship_to_numIsValid();
        }
    }
    public function invalidateDependentOnShls_ld_type():void
    {
        if (model_internal::_shls_ld_typeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfShls_ld_type = null;
            model_internal::calculateShls_ld_typeIsValid();
        }
    }
    public function invalidateDependentOnOrder_no():void
    {
        if (model_internal::_order_noIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_no = null;
            model_internal::calculateOrder_noIsValid();
        }
    }
    public function invalidateDependentOnShls_sold_to_num():void
    {
        if (model_internal::_shls_sold_to_numIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfShls_sold_to_num = null;
            model_internal::calculateShls_sold_to_numIsValid();
        }
    }
    public function invalidateDependentOnShls_terminal():void
    {
        if (model_internal::_shls_terminalIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfShls_terminal = null;
            model_internal::calculateShls_terminalIsValid();
        }
    }
    public function invalidateDependentOnShls_exp2():void
    {
        if (model_internal::_shls_exp2IsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfShls_exp2 = null;
            model_internal::calculateShls_exp2IsValid();
        }
    }
    public function invalidateDependentOnShls_trip_no_org():void
    {
        if (model_internal::_shls_trip_no_orgIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfShls_trip_no_org = null;
            model_internal::calculateShls_trip_no_orgIsValid();
        }
    }
    public function invalidateDependentOnShls_trip_no():void
    {
        if (model_internal::_shls_trip_noIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfShls_trip_no = null;
            model_internal::calculateShls_trip_noIsValid();
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
    public function invalidateDependentOnCarrier():void
    {
        if (model_internal::_carrierIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCarrier = null;
            model_internal::calculateCarrierIsValid();
        }
    }
    public function invalidateDependentOnDriver():void
    {
        if (model_internal::_driverIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfDriver = null;
            model_internal::calculateDriverIsValid();
        }
    }
    public function invalidateDependentOnLd_type():void
    {
        if (model_internal::_ld_typeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfLd_type = null;
            model_internal::calculateLd_typeIsValid();
        }
    }
    public function invalidateDependentOnSupplier():void
    {
        if (model_internal::_supplierIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSupplier = null;
            model_internal::calculateSupplierIsValid();
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
    public function invalidateDependentOnShls_caldate():void
    {
        if (model_internal::_shls_caldateIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfShls_caldate = null;
            model_internal::calculateShls_caldateIsValid();
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
    public function invalidateDependentOnShls_status():void
    {
        if (model_internal::_shls_statusIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfShls_status = null;
            model_internal::calculateShls_statusIsValid();
        }
    }
    public function invalidateDependentOnStatus():void
    {
        if (model_internal::_statusIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfStatus = null;
            model_internal::calculateStatusIsValid();
        }
    }
    public function invalidateDependentOnLast_chg_time():void
    {
        if (model_internal::_last_chg_timeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfLast_chg_time = null;
            model_internal::calculateLast_chg_timeIsValid();
        }
    }
    public function invalidateDependentOnOrder_cust_cmpy_name():void
    {
        if (model_internal::_order_cust_cmpy_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_cust_cmpy_name = null;
            model_internal::calculateOrder_cust_cmpy_nameIsValid();
        }
    }
    public function invalidateDependentOnShl_ret_loc():void
    {
        if (model_internal::_shl_ret_locIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfShl_ret_loc = null;
            model_internal::calculateShl_ret_locIsValid();
        }
    }
    public function invalidateDependentOnOrder_cust():void
    {
        if (model_internal::_order_custIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_cust = null;
            model_internal::calculateOrder_custIsValid();
        }
    }
    public function invalidateDependentOnOperator():void
    {
        if (model_internal::_operatorIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOperator = null;
            model_internal::calculateOperatorIsValid();
        }
    }
    public function invalidateDependentOnShls_shift():void
    {
        if (model_internal::_shls_shiftIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfShls_shift = null;
            model_internal::calculateShls_shiftIsValid();
        }
    }
    public function invalidateDependentOnOrder_cust_cmpy_code():void
    {
        if (model_internal::_order_cust_cmpy_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_cust_cmpy_code = null;
            model_internal::calculateOrder_cust_cmpy_codeIsValid();
        }
    }
    public function invalidateDependentOnLoad_reverse_flag():void
    {
        if (model_internal::_load_reverse_flagIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfLoad_reverse_flag = null;
            model_internal::calculateLoad_reverse_flagIsValid();
        }
    }
    public function invalidateDependentOnCarrier_code():void
    {
        if (model_internal::_carrier_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCarrier_code = null;
            model_internal::calculateCarrier_codeIsValid();
        }
    }
    public function invalidateDependentOnDrawer_name():void
    {
        if (model_internal::_drawer_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfDrawer_name = null;
            model_internal::calculateDrawer_nameIsValid();
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
    public function invalidateDependentOnCmpy_schd_archive():void
    {
        if (model_internal::_cmpy_schd_archiveIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_schd_archive = null;
            model_internal::calculateCmpy_schd_archiveIsValid();
        }
    }
    public function invalidateDependentOnShedule_profile():void
    {
        if (model_internal::_shedule_profileIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfShedule_profile = null;
            model_internal::calculateShedule_profileIsValid();
        }
    }
    public function invalidateDependentOnCmpy_schd_rev_repost():void
    {
        if (model_internal::_cmpy_schd_rev_repostIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_schd_rev_repost = null;
            model_internal::calculateCmpy_schd_rev_repostIsValid();
        }
    }
    public function invalidateDependentOnShls_ld_end():void
    {
        if (model_internal::_shls_ld_endIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfShls_ld_end = null;
            model_internal::calculateShls_ld_endIsValid();
        }
    }
    public function invalidateDependentOnShls_priority():void
    {
        if (model_internal::_shls_priorityIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfShls_priority = null;
            model_internal::calculateShls_priorityIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get shls_ld_startStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get shls_ld_startValidator() : StyleValidator
    {
        return model_internal::_shls_ld_startValidator;
    }

    model_internal function set _shls_ld_startIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_shls_ld_startIsValid;         
        if (oldValue !== value)
        {
            model_internal::_shls_ld_startIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "shls_ld_startIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get shls_ld_startIsValid():Boolean
    {
        if (!model_internal::_shls_ld_startIsValidCacheInitialized)
        {
            model_internal::calculateShls_ld_startIsValid();
        }

        return model_internal::_shls_ld_startIsValid;
    }

    model_internal function calculateShls_ld_startIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_shls_ld_startValidator.validate(model_internal::_instance.shls_ld_start)
        model_internal::_shls_ld_startIsValid_der = (valRes.results == null);
        model_internal::_shls_ld_startIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::shls_ld_startValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::shls_ld_startValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get shls_ld_startValidationFailureMessages():Array
    {
        if (model_internal::_shls_ld_startValidationFailureMessages == null)
            model_internal::calculateShls_ld_startIsValid();

        return _shls_ld_startValidationFailureMessages;
    }

    model_internal function set shls_ld_startValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_shls_ld_startValidationFailureMessages;

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
            model_internal::_shls_ld_startValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "shls_ld_startValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get supplier_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get supplier_codeValidator() : StyleValidator
    {
        return model_internal::_supplier_codeValidator;
    }

    model_internal function set _supplier_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_supplier_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_supplier_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "supplier_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get supplier_codeIsValid():Boolean
    {
        if (!model_internal::_supplier_codeIsValidCacheInitialized)
        {
            model_internal::calculateSupplier_codeIsValid();
        }

        return model_internal::_supplier_codeIsValid;
    }

    model_internal function calculateSupplier_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_supplier_codeValidator.validate(model_internal::_instance.supplier_code)
        model_internal::_supplier_codeIsValid_der = (valRes.results == null);
        model_internal::_supplier_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::supplier_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::supplier_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get supplier_codeValidationFailureMessages():Array
    {
        if (model_internal::_supplier_codeValidationFailureMessages == null)
            model_internal::calculateSupplier_codeIsValid();

        return _supplier_codeValidationFailureMessages;
    }

    model_internal function set supplier_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_supplier_codeValidationFailureMessages;

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
            model_internal::_supplier_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "supplier_codeValidationFailureMessages", oldValue, value));
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
    public function get drawer_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get drawer_codeValidator() : StyleValidator
    {
        return model_internal::_drawer_codeValidator;
    }

    model_internal function set _drawer_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_drawer_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_drawer_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "drawer_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get drawer_codeIsValid():Boolean
    {
        if (!model_internal::_drawer_codeIsValidCacheInitialized)
        {
            model_internal::calculateDrawer_codeIsValid();
        }

        return model_internal::_drawer_codeIsValid;
    }

    model_internal function calculateDrawer_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_drawer_codeValidator.validate(model_internal::_instance.drawer_code)
        model_internal::_drawer_codeIsValid_der = (valRes.results == null);
        model_internal::_drawer_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::drawer_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::drawer_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get drawer_codeValidationFailureMessages():Array
    {
        if (model_internal::_drawer_codeValidationFailureMessages == null)
            model_internal::calculateDrawer_codeIsValid();

        return _drawer_codeValidationFailureMessages;
    }

    model_internal function set drawer_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_drawer_codeValidationFailureMessages;

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
            model_internal::_drawer_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "drawer_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get shls_supp_orgStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get shls_supp_orgValidator() : StyleValidator
    {
        return model_internal::_shls_supp_orgValidator;
    }

    model_internal function set _shls_supp_orgIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_shls_supp_orgIsValid;         
        if (oldValue !== value)
        {
            model_internal::_shls_supp_orgIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "shls_supp_orgIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get shls_supp_orgIsValid():Boolean
    {
        if (!model_internal::_shls_supp_orgIsValidCacheInitialized)
        {
            model_internal::calculateShls_supp_orgIsValid();
        }

        return model_internal::_shls_supp_orgIsValid;
    }

    model_internal function calculateShls_supp_orgIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_shls_supp_orgValidator.validate(model_internal::_instance.shls_supp_org)
        model_internal::_shls_supp_orgIsValid_der = (valRes.results == null);
        model_internal::_shls_supp_orgIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::shls_supp_orgValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::shls_supp_orgValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get shls_supp_orgValidationFailureMessages():Array
    {
        if (model_internal::_shls_supp_orgValidationFailureMessages == null)
            model_internal::calculateShls_supp_orgIsValid();

        return _shls_supp_orgValidationFailureMessages;
    }

    model_internal function set shls_supp_orgValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_shls_supp_orgValidationFailureMessages;

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
            model_internal::_shls_supp_orgValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "shls_supp_orgValidationFailureMessages", oldValue, value));
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
    public function get shls_ship_to_numStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get shls_ship_to_numValidator() : StyleValidator
    {
        return model_internal::_shls_ship_to_numValidator;
    }

    model_internal function set _shls_ship_to_numIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_shls_ship_to_numIsValid;         
        if (oldValue !== value)
        {
            model_internal::_shls_ship_to_numIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "shls_ship_to_numIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get shls_ship_to_numIsValid():Boolean
    {
        if (!model_internal::_shls_ship_to_numIsValidCacheInitialized)
        {
            model_internal::calculateShls_ship_to_numIsValid();
        }

        return model_internal::_shls_ship_to_numIsValid;
    }

    model_internal function calculateShls_ship_to_numIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_shls_ship_to_numValidator.validate(model_internal::_instance.shls_ship_to_num)
        model_internal::_shls_ship_to_numIsValid_der = (valRes.results == null);
        model_internal::_shls_ship_to_numIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::shls_ship_to_numValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::shls_ship_to_numValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get shls_ship_to_numValidationFailureMessages():Array
    {
        if (model_internal::_shls_ship_to_numValidationFailureMessages == null)
            model_internal::calculateShls_ship_to_numIsValid();

        return _shls_ship_to_numValidationFailureMessages;
    }

    model_internal function set shls_ship_to_numValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_shls_ship_to_numValidationFailureMessages;

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
            model_internal::_shls_ship_to_numValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "shls_ship_to_numValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get shls_ld_typeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get shls_ld_typeValidator() : StyleValidator
    {
        return model_internal::_shls_ld_typeValidator;
    }

    model_internal function set _shls_ld_typeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_shls_ld_typeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_shls_ld_typeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "shls_ld_typeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get shls_ld_typeIsValid():Boolean
    {
        if (!model_internal::_shls_ld_typeIsValidCacheInitialized)
        {
            model_internal::calculateShls_ld_typeIsValid();
        }

        return model_internal::_shls_ld_typeIsValid;
    }

    model_internal function calculateShls_ld_typeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_shls_ld_typeValidator.validate(model_internal::_instance.shls_ld_type)
        model_internal::_shls_ld_typeIsValid_der = (valRes.results == null);
        model_internal::_shls_ld_typeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::shls_ld_typeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::shls_ld_typeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get shls_ld_typeValidationFailureMessages():Array
    {
        if (model_internal::_shls_ld_typeValidationFailureMessages == null)
            model_internal::calculateShls_ld_typeIsValid();

        return _shls_ld_typeValidationFailureMessages;
    }

    model_internal function set shls_ld_typeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_shls_ld_typeValidationFailureMessages;

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
            model_internal::_shls_ld_typeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "shls_ld_typeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_noStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_noValidator() : StyleValidator
    {
        return model_internal::_order_noValidator;
    }

    model_internal function set _order_noIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_noIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_noIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_noIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_noIsValid():Boolean
    {
        if (!model_internal::_order_noIsValidCacheInitialized)
        {
            model_internal::calculateOrder_noIsValid();
        }

        return model_internal::_order_noIsValid;
    }

    model_internal function calculateOrder_noIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_noValidator.validate(model_internal::_instance.order_no)
        model_internal::_order_noIsValid_der = (valRes.results == null);
        model_internal::_order_noIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_noValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_noValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_noValidationFailureMessages():Array
    {
        if (model_internal::_order_noValidationFailureMessages == null)
            model_internal::calculateOrder_noIsValid();

        return _order_noValidationFailureMessages;
    }

    model_internal function set order_noValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_noValidationFailureMessages;

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
            model_internal::_order_noValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_noValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get shls_sold_to_numStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get shls_sold_to_numValidator() : StyleValidator
    {
        return model_internal::_shls_sold_to_numValidator;
    }

    model_internal function set _shls_sold_to_numIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_shls_sold_to_numIsValid;         
        if (oldValue !== value)
        {
            model_internal::_shls_sold_to_numIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "shls_sold_to_numIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get shls_sold_to_numIsValid():Boolean
    {
        if (!model_internal::_shls_sold_to_numIsValidCacheInitialized)
        {
            model_internal::calculateShls_sold_to_numIsValid();
        }

        return model_internal::_shls_sold_to_numIsValid;
    }

    model_internal function calculateShls_sold_to_numIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_shls_sold_to_numValidator.validate(model_internal::_instance.shls_sold_to_num)
        model_internal::_shls_sold_to_numIsValid_der = (valRes.results == null);
        model_internal::_shls_sold_to_numIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::shls_sold_to_numValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::shls_sold_to_numValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get shls_sold_to_numValidationFailureMessages():Array
    {
        if (model_internal::_shls_sold_to_numValidationFailureMessages == null)
            model_internal::calculateShls_sold_to_numIsValid();

        return _shls_sold_to_numValidationFailureMessages;
    }

    model_internal function set shls_sold_to_numValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_shls_sold_to_numValidationFailureMessages;

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
            model_internal::_shls_sold_to_numValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "shls_sold_to_numValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get shls_terminalStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get shls_terminalValidator() : StyleValidator
    {
        return model_internal::_shls_terminalValidator;
    }

    model_internal function set _shls_terminalIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_shls_terminalIsValid;         
        if (oldValue !== value)
        {
            model_internal::_shls_terminalIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "shls_terminalIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get shls_terminalIsValid():Boolean
    {
        if (!model_internal::_shls_terminalIsValidCacheInitialized)
        {
            model_internal::calculateShls_terminalIsValid();
        }

        return model_internal::_shls_terminalIsValid;
    }

    model_internal function calculateShls_terminalIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_shls_terminalValidator.validate(model_internal::_instance.shls_terminal)
        model_internal::_shls_terminalIsValid_der = (valRes.results == null);
        model_internal::_shls_terminalIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::shls_terminalValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::shls_terminalValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get shls_terminalValidationFailureMessages():Array
    {
        if (model_internal::_shls_terminalValidationFailureMessages == null)
            model_internal::calculateShls_terminalIsValid();

        return _shls_terminalValidationFailureMessages;
    }

    model_internal function set shls_terminalValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_shls_terminalValidationFailureMessages;

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
            model_internal::_shls_terminalValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "shls_terminalValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get shls_exp2Style():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get shls_exp2Validator() : StyleValidator
    {
        return model_internal::_shls_exp2Validator;
    }

    model_internal function set _shls_exp2IsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_shls_exp2IsValid;         
        if (oldValue !== value)
        {
            model_internal::_shls_exp2IsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "shls_exp2IsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get shls_exp2IsValid():Boolean
    {
        if (!model_internal::_shls_exp2IsValidCacheInitialized)
        {
            model_internal::calculateShls_exp2IsValid();
        }

        return model_internal::_shls_exp2IsValid;
    }

    model_internal function calculateShls_exp2IsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_shls_exp2Validator.validate(model_internal::_instance.shls_exp2)
        model_internal::_shls_exp2IsValid_der = (valRes.results == null);
        model_internal::_shls_exp2IsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::shls_exp2ValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::shls_exp2ValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get shls_exp2ValidationFailureMessages():Array
    {
        if (model_internal::_shls_exp2ValidationFailureMessages == null)
            model_internal::calculateShls_exp2IsValid();

        return _shls_exp2ValidationFailureMessages;
    }

    model_internal function set shls_exp2ValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_shls_exp2ValidationFailureMessages;

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
            model_internal::_shls_exp2ValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "shls_exp2ValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get shls_trip_no_orgStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get shls_trip_no_orgValidator() : StyleValidator
    {
        return model_internal::_shls_trip_no_orgValidator;
    }

    model_internal function set _shls_trip_no_orgIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_shls_trip_no_orgIsValid;         
        if (oldValue !== value)
        {
            model_internal::_shls_trip_no_orgIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "shls_trip_no_orgIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get shls_trip_no_orgIsValid():Boolean
    {
        if (!model_internal::_shls_trip_no_orgIsValidCacheInitialized)
        {
            model_internal::calculateShls_trip_no_orgIsValid();
        }

        return model_internal::_shls_trip_no_orgIsValid;
    }

    model_internal function calculateShls_trip_no_orgIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_shls_trip_no_orgValidator.validate(model_internal::_instance.shls_trip_no_org)
        model_internal::_shls_trip_no_orgIsValid_der = (valRes.results == null);
        model_internal::_shls_trip_no_orgIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::shls_trip_no_orgValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::shls_trip_no_orgValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get shls_trip_no_orgValidationFailureMessages():Array
    {
        if (model_internal::_shls_trip_no_orgValidationFailureMessages == null)
            model_internal::calculateShls_trip_no_orgIsValid();

        return _shls_trip_no_orgValidationFailureMessages;
    }

    model_internal function set shls_trip_no_orgValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_shls_trip_no_orgValidationFailureMessages;

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
            model_internal::_shls_trip_no_orgValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "shls_trip_no_orgValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get shls_trip_noStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get shls_trip_noValidator() : StyleValidator
    {
        return model_internal::_shls_trip_noValidator;
    }

    model_internal function set _shls_trip_noIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_shls_trip_noIsValid;         
        if (oldValue !== value)
        {
            model_internal::_shls_trip_noIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "shls_trip_noIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get shls_trip_noIsValid():Boolean
    {
        if (!model_internal::_shls_trip_noIsValidCacheInitialized)
        {
            model_internal::calculateShls_trip_noIsValid();
        }

        return model_internal::_shls_trip_noIsValid;
    }

    model_internal function calculateShls_trip_noIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_shls_trip_noValidator.validate(model_internal::_instance.shls_trip_no)
        model_internal::_shls_trip_noIsValid_der = (valRes.results == null);
        model_internal::_shls_trip_noIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::shls_trip_noValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::shls_trip_noValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get shls_trip_noValidationFailureMessages():Array
    {
        if (model_internal::_shls_trip_noValidationFailureMessages == null)
            model_internal::calculateShls_trip_noIsValid();

        return _shls_trip_noValidationFailureMessages;
    }

    model_internal function set shls_trip_noValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_shls_trip_noValidationFailureMessages;

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
            model_internal::_shls_trip_noValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "shls_trip_noValidationFailureMessages", oldValue, value));
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
    public function get carrierStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get carrierValidator() : StyleValidator
    {
        return model_internal::_carrierValidator;
    }

    model_internal function set _carrierIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_carrierIsValid;         
        if (oldValue !== value)
        {
            model_internal::_carrierIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "carrierIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get carrierIsValid():Boolean
    {
        if (!model_internal::_carrierIsValidCacheInitialized)
        {
            model_internal::calculateCarrierIsValid();
        }

        return model_internal::_carrierIsValid;
    }

    model_internal function calculateCarrierIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_carrierValidator.validate(model_internal::_instance.carrier)
        model_internal::_carrierIsValid_der = (valRes.results == null);
        model_internal::_carrierIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::carrierValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::carrierValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get carrierValidationFailureMessages():Array
    {
        if (model_internal::_carrierValidationFailureMessages == null)
            model_internal::calculateCarrierIsValid();

        return _carrierValidationFailureMessages;
    }

    model_internal function set carrierValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_carrierValidationFailureMessages;

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
            model_internal::_carrierValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "carrierValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get driverStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get driverValidator() : StyleValidator
    {
        return model_internal::_driverValidator;
    }

    model_internal function set _driverIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_driverIsValid;         
        if (oldValue !== value)
        {
            model_internal::_driverIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "driverIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get driverIsValid():Boolean
    {
        if (!model_internal::_driverIsValidCacheInitialized)
        {
            model_internal::calculateDriverIsValid();
        }

        return model_internal::_driverIsValid;
    }

    model_internal function calculateDriverIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_driverValidator.validate(model_internal::_instance.driver)
        model_internal::_driverIsValid_der = (valRes.results == null);
        model_internal::_driverIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::driverValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::driverValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get driverValidationFailureMessages():Array
    {
        if (model_internal::_driverValidationFailureMessages == null)
            model_internal::calculateDriverIsValid();

        return _driverValidationFailureMessages;
    }

    model_internal function set driverValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_driverValidationFailureMessages;

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
            model_internal::_driverValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "driverValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get ld_typeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get ld_typeValidator() : StyleValidator
    {
        return model_internal::_ld_typeValidator;
    }

    model_internal function set _ld_typeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_ld_typeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_ld_typeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "ld_typeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get ld_typeIsValid():Boolean
    {
        if (!model_internal::_ld_typeIsValidCacheInitialized)
        {
            model_internal::calculateLd_typeIsValid();
        }

        return model_internal::_ld_typeIsValid;
    }

    model_internal function calculateLd_typeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_ld_typeValidator.validate(model_internal::_instance.ld_type)
        model_internal::_ld_typeIsValid_der = (valRes.results == null);
        model_internal::_ld_typeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::ld_typeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::ld_typeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get ld_typeValidationFailureMessages():Array
    {
        if (model_internal::_ld_typeValidationFailureMessages == null)
            model_internal::calculateLd_typeIsValid();

        return _ld_typeValidationFailureMessages;
    }

    model_internal function set ld_typeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_ld_typeValidationFailureMessages;

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
            model_internal::_ld_typeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "ld_typeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get supplierStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get supplierValidator() : StyleValidator
    {
        return model_internal::_supplierValidator;
    }

    model_internal function set _supplierIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_supplierIsValid;         
        if (oldValue !== value)
        {
            model_internal::_supplierIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "supplierIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get supplierIsValid():Boolean
    {
        if (!model_internal::_supplierIsValidCacheInitialized)
        {
            model_internal::calculateSupplierIsValid();
        }

        return model_internal::_supplierIsValid;
    }

    model_internal function calculateSupplierIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_supplierValidator.validate(model_internal::_instance.supplier)
        model_internal::_supplierIsValid_der = (valRes.results == null);
        model_internal::_supplierIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::supplierValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::supplierValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get supplierValidationFailureMessages():Array
    {
        if (model_internal::_supplierValidationFailureMessages == null)
            model_internal::calculateSupplierIsValid();

        return _supplierValidationFailureMessages;
    }

    model_internal function set supplierValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_supplierValidationFailureMessages;

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
            model_internal::_supplierValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "supplierValidationFailureMessages", oldValue, value));
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
    public function get shls_caldateStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get shls_caldateValidator() : StyleValidator
    {
        return model_internal::_shls_caldateValidator;
    }

    model_internal function set _shls_caldateIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_shls_caldateIsValid;         
        if (oldValue !== value)
        {
            model_internal::_shls_caldateIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "shls_caldateIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get shls_caldateIsValid():Boolean
    {
        if (!model_internal::_shls_caldateIsValidCacheInitialized)
        {
            model_internal::calculateShls_caldateIsValid();
        }

        return model_internal::_shls_caldateIsValid;
    }

    model_internal function calculateShls_caldateIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_shls_caldateValidator.validate(model_internal::_instance.shls_caldate)
        model_internal::_shls_caldateIsValid_der = (valRes.results == null);
        model_internal::_shls_caldateIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::shls_caldateValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::shls_caldateValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get shls_caldateValidationFailureMessages():Array
    {
        if (model_internal::_shls_caldateValidationFailureMessages == null)
            model_internal::calculateShls_caldateIsValid();

        return _shls_caldateValidationFailureMessages;
    }

    model_internal function set shls_caldateValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_shls_caldateValidationFailureMessages;

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
            model_internal::_shls_caldateValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "shls_caldateValidationFailureMessages", oldValue, value));
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
    public function get shls_statusStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get shls_statusValidator() : StyleValidator
    {
        return model_internal::_shls_statusValidator;
    }

    model_internal function set _shls_statusIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_shls_statusIsValid;         
        if (oldValue !== value)
        {
            model_internal::_shls_statusIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "shls_statusIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get shls_statusIsValid():Boolean
    {
        if (!model_internal::_shls_statusIsValidCacheInitialized)
        {
            model_internal::calculateShls_statusIsValid();
        }

        return model_internal::_shls_statusIsValid;
    }

    model_internal function calculateShls_statusIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_shls_statusValidator.validate(model_internal::_instance.shls_status)
        model_internal::_shls_statusIsValid_der = (valRes.results == null);
        model_internal::_shls_statusIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::shls_statusValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::shls_statusValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get shls_statusValidationFailureMessages():Array
    {
        if (model_internal::_shls_statusValidationFailureMessages == null)
            model_internal::calculateShls_statusIsValid();

        return _shls_statusValidationFailureMessages;
    }

    model_internal function set shls_statusValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_shls_statusValidationFailureMessages;

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
            model_internal::_shls_statusValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "shls_statusValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get statusStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get statusValidator() : StyleValidator
    {
        return model_internal::_statusValidator;
    }

    model_internal function set _statusIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_statusIsValid;         
        if (oldValue !== value)
        {
            model_internal::_statusIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "statusIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get statusIsValid():Boolean
    {
        if (!model_internal::_statusIsValidCacheInitialized)
        {
            model_internal::calculateStatusIsValid();
        }

        return model_internal::_statusIsValid;
    }

    model_internal function calculateStatusIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_statusValidator.validate(model_internal::_instance.status)
        model_internal::_statusIsValid_der = (valRes.results == null);
        model_internal::_statusIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::statusValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::statusValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get statusValidationFailureMessages():Array
    {
        if (model_internal::_statusValidationFailureMessages == null)
            model_internal::calculateStatusIsValid();

        return _statusValidationFailureMessages;
    }

    model_internal function set statusValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_statusValidationFailureMessages;

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
            model_internal::_statusValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "statusValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get last_chg_timeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get last_chg_timeValidator() : StyleValidator
    {
        return model_internal::_last_chg_timeValidator;
    }

    model_internal function set _last_chg_timeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_last_chg_timeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_last_chg_timeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "last_chg_timeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get last_chg_timeIsValid():Boolean
    {
        if (!model_internal::_last_chg_timeIsValidCacheInitialized)
        {
            model_internal::calculateLast_chg_timeIsValid();
        }

        return model_internal::_last_chg_timeIsValid;
    }

    model_internal function calculateLast_chg_timeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_last_chg_timeValidator.validate(model_internal::_instance.last_chg_time)
        model_internal::_last_chg_timeIsValid_der = (valRes.results == null);
        model_internal::_last_chg_timeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::last_chg_timeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::last_chg_timeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get last_chg_timeValidationFailureMessages():Array
    {
        if (model_internal::_last_chg_timeValidationFailureMessages == null)
            model_internal::calculateLast_chg_timeIsValid();

        return _last_chg_timeValidationFailureMessages;
    }

    model_internal function set last_chg_timeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_last_chg_timeValidationFailureMessages;

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
            model_internal::_last_chg_timeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "last_chg_timeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_cust_cmpy_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_cust_cmpy_nameValidator() : StyleValidator
    {
        return model_internal::_order_cust_cmpy_nameValidator;
    }

    model_internal function set _order_cust_cmpy_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_cust_cmpy_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_cust_cmpy_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_cust_cmpy_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_cust_cmpy_nameIsValid():Boolean
    {
        if (!model_internal::_order_cust_cmpy_nameIsValidCacheInitialized)
        {
            model_internal::calculateOrder_cust_cmpy_nameIsValid();
        }

        return model_internal::_order_cust_cmpy_nameIsValid;
    }

    model_internal function calculateOrder_cust_cmpy_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_cust_cmpy_nameValidator.validate(model_internal::_instance.order_cust_cmpy_name)
        model_internal::_order_cust_cmpy_nameIsValid_der = (valRes.results == null);
        model_internal::_order_cust_cmpy_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_cust_cmpy_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_cust_cmpy_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_cust_cmpy_nameValidationFailureMessages():Array
    {
        if (model_internal::_order_cust_cmpy_nameValidationFailureMessages == null)
            model_internal::calculateOrder_cust_cmpy_nameIsValid();

        return _order_cust_cmpy_nameValidationFailureMessages;
    }

    model_internal function set order_cust_cmpy_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_cust_cmpy_nameValidationFailureMessages;

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
            model_internal::_order_cust_cmpy_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_cust_cmpy_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get shl_ret_locStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get shl_ret_locValidator() : StyleValidator
    {
        return model_internal::_shl_ret_locValidator;
    }

    model_internal function set _shl_ret_locIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_shl_ret_locIsValid;         
        if (oldValue !== value)
        {
            model_internal::_shl_ret_locIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "shl_ret_locIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get shl_ret_locIsValid():Boolean
    {
        if (!model_internal::_shl_ret_locIsValidCacheInitialized)
        {
            model_internal::calculateShl_ret_locIsValid();
        }

        return model_internal::_shl_ret_locIsValid;
    }

    model_internal function calculateShl_ret_locIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_shl_ret_locValidator.validate(model_internal::_instance.shl_ret_loc)
        model_internal::_shl_ret_locIsValid_der = (valRes.results == null);
        model_internal::_shl_ret_locIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::shl_ret_locValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::shl_ret_locValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get shl_ret_locValidationFailureMessages():Array
    {
        if (model_internal::_shl_ret_locValidationFailureMessages == null)
            model_internal::calculateShl_ret_locIsValid();

        return _shl_ret_locValidationFailureMessages;
    }

    model_internal function set shl_ret_locValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_shl_ret_locValidationFailureMessages;

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
            model_internal::_shl_ret_locValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "shl_ret_locValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_custStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_custValidator() : StyleValidator
    {
        return model_internal::_order_custValidator;
    }

    model_internal function set _order_custIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_custIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_custIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_custIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_custIsValid():Boolean
    {
        if (!model_internal::_order_custIsValidCacheInitialized)
        {
            model_internal::calculateOrder_custIsValid();
        }

        return model_internal::_order_custIsValid;
    }

    model_internal function calculateOrder_custIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_custValidator.validate(model_internal::_instance.order_cust)
        model_internal::_order_custIsValid_der = (valRes.results == null);
        model_internal::_order_custIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_custValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_custValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_custValidationFailureMessages():Array
    {
        if (model_internal::_order_custValidationFailureMessages == null)
            model_internal::calculateOrder_custIsValid();

        return _order_custValidationFailureMessages;
    }

    model_internal function set order_custValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_custValidationFailureMessages;

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
            model_internal::_order_custValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_custValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get operatorStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get operatorValidator() : StyleValidator
    {
        return model_internal::_operatorValidator;
    }

    model_internal function set _operatorIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_operatorIsValid;         
        if (oldValue !== value)
        {
            model_internal::_operatorIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "operatorIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get operatorIsValid():Boolean
    {
        if (!model_internal::_operatorIsValidCacheInitialized)
        {
            model_internal::calculateOperatorIsValid();
        }

        return model_internal::_operatorIsValid;
    }

    model_internal function calculateOperatorIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_operatorValidator.validate(model_internal::_instance.operator)
        model_internal::_operatorIsValid_der = (valRes.results == null);
        model_internal::_operatorIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::operatorValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::operatorValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get operatorValidationFailureMessages():Array
    {
        if (model_internal::_operatorValidationFailureMessages == null)
            model_internal::calculateOperatorIsValid();

        return _operatorValidationFailureMessages;
    }

    model_internal function set operatorValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_operatorValidationFailureMessages;

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
            model_internal::_operatorValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "operatorValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get shls_shiftStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get shls_shiftValidator() : StyleValidator
    {
        return model_internal::_shls_shiftValidator;
    }

    model_internal function set _shls_shiftIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_shls_shiftIsValid;         
        if (oldValue !== value)
        {
            model_internal::_shls_shiftIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "shls_shiftIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get shls_shiftIsValid():Boolean
    {
        if (!model_internal::_shls_shiftIsValidCacheInitialized)
        {
            model_internal::calculateShls_shiftIsValid();
        }

        return model_internal::_shls_shiftIsValid;
    }

    model_internal function calculateShls_shiftIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_shls_shiftValidator.validate(model_internal::_instance.shls_shift)
        model_internal::_shls_shiftIsValid_der = (valRes.results == null);
        model_internal::_shls_shiftIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::shls_shiftValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::shls_shiftValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get shls_shiftValidationFailureMessages():Array
    {
        if (model_internal::_shls_shiftValidationFailureMessages == null)
            model_internal::calculateShls_shiftIsValid();

        return _shls_shiftValidationFailureMessages;
    }

    model_internal function set shls_shiftValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_shls_shiftValidationFailureMessages;

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
            model_internal::_shls_shiftValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "shls_shiftValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_cust_cmpy_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_cust_cmpy_codeValidator() : StyleValidator
    {
        return model_internal::_order_cust_cmpy_codeValidator;
    }

    model_internal function set _order_cust_cmpy_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_cust_cmpy_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_cust_cmpy_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_cust_cmpy_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_cust_cmpy_codeIsValid():Boolean
    {
        if (!model_internal::_order_cust_cmpy_codeIsValidCacheInitialized)
        {
            model_internal::calculateOrder_cust_cmpy_codeIsValid();
        }

        return model_internal::_order_cust_cmpy_codeIsValid;
    }

    model_internal function calculateOrder_cust_cmpy_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_cust_cmpy_codeValidator.validate(model_internal::_instance.order_cust_cmpy_code)
        model_internal::_order_cust_cmpy_codeIsValid_der = (valRes.results == null);
        model_internal::_order_cust_cmpy_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_cust_cmpy_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_cust_cmpy_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_cust_cmpy_codeValidationFailureMessages():Array
    {
        if (model_internal::_order_cust_cmpy_codeValidationFailureMessages == null)
            model_internal::calculateOrder_cust_cmpy_codeIsValid();

        return _order_cust_cmpy_codeValidationFailureMessages;
    }

    model_internal function set order_cust_cmpy_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_cust_cmpy_codeValidationFailureMessages;

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
            model_internal::_order_cust_cmpy_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_cust_cmpy_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get load_reverse_flagStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get load_reverse_flagValidator() : StyleValidator
    {
        return model_internal::_load_reverse_flagValidator;
    }

    model_internal function set _load_reverse_flagIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_load_reverse_flagIsValid;         
        if (oldValue !== value)
        {
            model_internal::_load_reverse_flagIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "load_reverse_flagIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get load_reverse_flagIsValid():Boolean
    {
        if (!model_internal::_load_reverse_flagIsValidCacheInitialized)
        {
            model_internal::calculateLoad_reverse_flagIsValid();
        }

        return model_internal::_load_reverse_flagIsValid;
    }

    model_internal function calculateLoad_reverse_flagIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_load_reverse_flagValidator.validate(model_internal::_instance.load_reverse_flag)
        model_internal::_load_reverse_flagIsValid_der = (valRes.results == null);
        model_internal::_load_reverse_flagIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::load_reverse_flagValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::load_reverse_flagValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get load_reverse_flagValidationFailureMessages():Array
    {
        if (model_internal::_load_reverse_flagValidationFailureMessages == null)
            model_internal::calculateLoad_reverse_flagIsValid();

        return _load_reverse_flagValidationFailureMessages;
    }

    model_internal function set load_reverse_flagValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_load_reverse_flagValidationFailureMessages;

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
            model_internal::_load_reverse_flagValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "load_reverse_flagValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get carrier_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get carrier_codeValidator() : StyleValidator
    {
        return model_internal::_carrier_codeValidator;
    }

    model_internal function set _carrier_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_carrier_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_carrier_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "carrier_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get carrier_codeIsValid():Boolean
    {
        if (!model_internal::_carrier_codeIsValidCacheInitialized)
        {
            model_internal::calculateCarrier_codeIsValid();
        }

        return model_internal::_carrier_codeIsValid;
    }

    model_internal function calculateCarrier_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_carrier_codeValidator.validate(model_internal::_instance.carrier_code)
        model_internal::_carrier_codeIsValid_der = (valRes.results == null);
        model_internal::_carrier_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::carrier_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::carrier_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get carrier_codeValidationFailureMessages():Array
    {
        if (model_internal::_carrier_codeValidationFailureMessages == null)
            model_internal::calculateCarrier_codeIsValid();

        return _carrier_codeValidationFailureMessages;
    }

    model_internal function set carrier_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_carrier_codeValidationFailureMessages;

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
            model_internal::_carrier_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "carrier_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get drawer_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get drawer_nameValidator() : StyleValidator
    {
        return model_internal::_drawer_nameValidator;
    }

    model_internal function set _drawer_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_drawer_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_drawer_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "drawer_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get drawer_nameIsValid():Boolean
    {
        if (!model_internal::_drawer_nameIsValidCacheInitialized)
        {
            model_internal::calculateDrawer_nameIsValid();
        }

        return model_internal::_drawer_nameIsValid;
    }

    model_internal function calculateDrawer_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_drawer_nameValidator.validate(model_internal::_instance.drawer_name)
        model_internal::_drawer_nameIsValid_der = (valRes.results == null);
        model_internal::_drawer_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::drawer_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::drawer_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get drawer_nameValidationFailureMessages():Array
    {
        if (model_internal::_drawer_nameValidationFailureMessages == null)
            model_internal::calculateDrawer_nameIsValid();

        return _drawer_nameValidationFailureMessages;
    }

    model_internal function set drawer_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_drawer_nameValidationFailureMessages;

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
            model_internal::_drawer_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "drawer_nameValidationFailureMessages", oldValue, value));
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
    public function get cmpy_schd_archiveStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_schd_archiveValidator() : StyleValidator
    {
        return model_internal::_cmpy_schd_archiveValidator;
    }

    model_internal function set _cmpy_schd_archiveIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_schd_archiveIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_schd_archiveIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_schd_archiveIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_schd_archiveIsValid():Boolean
    {
        if (!model_internal::_cmpy_schd_archiveIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_schd_archiveIsValid();
        }

        return model_internal::_cmpy_schd_archiveIsValid;
    }

    model_internal function calculateCmpy_schd_archiveIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_schd_archiveValidator.validate(model_internal::_instance.cmpy_schd_archive)
        model_internal::_cmpy_schd_archiveIsValid_der = (valRes.results == null);
        model_internal::_cmpy_schd_archiveIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_schd_archiveValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_schd_archiveValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_schd_archiveValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_schd_archiveValidationFailureMessages == null)
            model_internal::calculateCmpy_schd_archiveIsValid();

        return _cmpy_schd_archiveValidationFailureMessages;
    }

    model_internal function set cmpy_schd_archiveValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_schd_archiveValidationFailureMessages;

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
            model_internal::_cmpy_schd_archiveValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_schd_archiveValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get shedule_profileStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get shedule_profileValidator() : StyleValidator
    {
        return model_internal::_shedule_profileValidator;
    }

    model_internal function set _shedule_profileIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_shedule_profileIsValid;         
        if (oldValue !== value)
        {
            model_internal::_shedule_profileIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "shedule_profileIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get shedule_profileIsValid():Boolean
    {
        if (!model_internal::_shedule_profileIsValidCacheInitialized)
        {
            model_internal::calculateShedule_profileIsValid();
        }

        return model_internal::_shedule_profileIsValid;
    }

    model_internal function calculateShedule_profileIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_shedule_profileValidator.validate(model_internal::_instance.shedule_profile)
        model_internal::_shedule_profileIsValid_der = (valRes.results == null);
        model_internal::_shedule_profileIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::shedule_profileValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::shedule_profileValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get shedule_profileValidationFailureMessages():Array
    {
        if (model_internal::_shedule_profileValidationFailureMessages == null)
            model_internal::calculateShedule_profileIsValid();

        return _shedule_profileValidationFailureMessages;
    }

    model_internal function set shedule_profileValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_shedule_profileValidationFailureMessages;

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
            model_internal::_shedule_profileValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "shedule_profileValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_schd_rev_repostStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_schd_rev_repostValidator() : StyleValidator
    {
        return model_internal::_cmpy_schd_rev_repostValidator;
    }

    model_internal function set _cmpy_schd_rev_repostIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_schd_rev_repostIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_schd_rev_repostIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_schd_rev_repostIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_schd_rev_repostIsValid():Boolean
    {
        if (!model_internal::_cmpy_schd_rev_repostIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_schd_rev_repostIsValid();
        }

        return model_internal::_cmpy_schd_rev_repostIsValid;
    }

    model_internal function calculateCmpy_schd_rev_repostIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_schd_rev_repostValidator.validate(model_internal::_instance.cmpy_schd_rev_repost)
        model_internal::_cmpy_schd_rev_repostIsValid_der = (valRes.results == null);
        model_internal::_cmpy_schd_rev_repostIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_schd_rev_repostValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_schd_rev_repostValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_schd_rev_repostValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_schd_rev_repostValidationFailureMessages == null)
            model_internal::calculateCmpy_schd_rev_repostIsValid();

        return _cmpy_schd_rev_repostValidationFailureMessages;
    }

    model_internal function set cmpy_schd_rev_repostValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_schd_rev_repostValidationFailureMessages;

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
            model_internal::_cmpy_schd_rev_repostValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_schd_rev_repostValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get shls_ld_endStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get shls_ld_endValidator() : StyleValidator
    {
        return model_internal::_shls_ld_endValidator;
    }

    model_internal function set _shls_ld_endIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_shls_ld_endIsValid;         
        if (oldValue !== value)
        {
            model_internal::_shls_ld_endIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "shls_ld_endIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get shls_ld_endIsValid():Boolean
    {
        if (!model_internal::_shls_ld_endIsValidCacheInitialized)
        {
            model_internal::calculateShls_ld_endIsValid();
        }

        return model_internal::_shls_ld_endIsValid;
    }

    model_internal function calculateShls_ld_endIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_shls_ld_endValidator.validate(model_internal::_instance.shls_ld_end)
        model_internal::_shls_ld_endIsValid_der = (valRes.results == null);
        model_internal::_shls_ld_endIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::shls_ld_endValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::shls_ld_endValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get shls_ld_endValidationFailureMessages():Array
    {
        if (model_internal::_shls_ld_endValidationFailureMessages == null)
            model_internal::calculateShls_ld_endIsValid();

        return _shls_ld_endValidationFailureMessages;
    }

    model_internal function set shls_ld_endValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_shls_ld_endValidationFailureMessages;

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
            model_internal::_shls_ld_endValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "shls_ld_endValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get shls_priorityStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get shls_priorityValidator() : StyleValidator
    {
        return model_internal::_shls_priorityValidator;
    }

    model_internal function set _shls_priorityIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_shls_priorityIsValid;         
        if (oldValue !== value)
        {
            model_internal::_shls_priorityIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "shls_priorityIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get shls_priorityIsValid():Boolean
    {
        if (!model_internal::_shls_priorityIsValidCacheInitialized)
        {
            model_internal::calculateShls_priorityIsValid();
        }

        return model_internal::_shls_priorityIsValid;
    }

    model_internal function calculateShls_priorityIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_shls_priorityValidator.validate(model_internal::_instance.shls_priority)
        model_internal::_shls_priorityIsValid_der = (valRes.results == null);
        model_internal::_shls_priorityIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::shls_priorityValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::shls_priorityValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get shls_priorityValidationFailureMessages():Array
    {
        if (model_internal::_shls_priorityValidationFailureMessages == null)
            model_internal::calculateShls_priorityIsValid();

        return _shls_priorityValidationFailureMessages;
    }

    model_internal function set shls_priorityValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_shls_priorityValidationFailureMessages;

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
            model_internal::_shls_priorityValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "shls_priorityValidationFailureMessages", oldValue, value));
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
            case("shls_ld_start"):
            {
                return shls_ld_startValidationFailureMessages;
            }
            case("supplier_code"):
            {
                return supplier_codeValidationFailureMessages;
            }
            case("drawer_code"):
            {
                return drawer_codeValidationFailureMessages;
            }
            case("shls_supp_org"):
            {
                return shls_supp_orgValidationFailureMessages;
            }
            case("shlsload_load_id"):
            {
                return shlsload_load_idValidationFailureMessages;
            }
            case("shls_ship_to_num"):
            {
                return shls_ship_to_numValidationFailureMessages;
            }
            case("shls_ld_type"):
            {
                return shls_ld_typeValidationFailureMessages;
            }
            case("order_no"):
            {
                return order_noValidationFailureMessages;
            }
            case("shls_sold_to_num"):
            {
                return shls_sold_to_numValidationFailureMessages;
            }
            case("shls_terminal"):
            {
                return shls_terminalValidationFailureMessages;
            }
            case("shls_exp2"):
            {
                return shls_exp2ValidationFailureMessages;
            }
            case("shls_trip_no_org"):
            {
                return shls_trip_no_orgValidationFailureMessages;
            }
            case("shls_trip_no"):
            {
                return shls_trip_noValidationFailureMessages;
            }
            case("order_cust_ordno"):
            {
                return order_cust_ordnoValidationFailureMessages;
            }
            case("carrier"):
            {
                return carrierValidationFailureMessages;
            }
            case("driver"):
            {
                return driverValidationFailureMessages;
            }
            case("ld_type"):
            {
                return ld_typeValidationFailureMessages;
            }
            case("supplier"):
            {
                return supplierValidationFailureMessages;
            }
            case("order_ref_code"):
            {
                return order_ref_codeValidationFailureMessages;
            }
            case("shls_caldate"):
            {
                return shls_caldateValidationFailureMessages;
            }
            case("tnkr_name"):
            {
                return tnkr_nameValidationFailureMessages;
            }
            case("shls_status"):
            {
                return shls_statusValidationFailureMessages;
            }
            case("status"):
            {
                return statusValidationFailureMessages;
            }
            case("last_chg_time"):
            {
                return last_chg_timeValidationFailureMessages;
            }
            case("order_cust_cmpy_name"):
            {
                return order_cust_cmpy_nameValidationFailureMessages;
            }
            case("shl_ret_loc"):
            {
                return shl_ret_locValidationFailureMessages;
            }
            case("order_cust"):
            {
                return order_custValidationFailureMessages;
            }
            case("operator"):
            {
                return operatorValidationFailureMessages;
            }
            case("shls_shift"):
            {
                return shls_shiftValidationFailureMessages;
            }
            case("order_cust_cmpy_code"):
            {
                return order_cust_cmpy_codeValidationFailureMessages;
            }
            case("load_reverse_flag"):
            {
                return load_reverse_flagValidationFailureMessages;
            }
            case("carrier_code"):
            {
                return carrier_codeValidationFailureMessages;
            }
            case("drawer_name"):
            {
                return drawer_nameValidationFailureMessages;
            }
            case("tnkr_code"):
            {
                return tnkr_codeValidationFailureMessages;
            }
            case("cmpy_schd_archive"):
            {
                return cmpy_schd_archiveValidationFailureMessages;
            }
            case("shedule_profile"):
            {
                return shedule_profileValidationFailureMessages;
            }
            case("cmpy_schd_rev_repost"):
            {
                return cmpy_schd_rev_repostValidationFailureMessages;
            }
            case("shls_ld_end"):
            {
                return shls_ld_endValidationFailureMessages;
            }
            case("shls_priority"):
            {
                return shls_priorityValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
