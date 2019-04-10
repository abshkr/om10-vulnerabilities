
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
internal class _GUI_ORDERSEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("order_ttyp_name", "order_app_no", "rn", "order_dtrm_code", "order_ship_to_num", "order_psnl_name", "order_sold_to_num", "order_strm_code", "order_carr_code", "order_styp_id", "order_dlv_time", "order_drwr_code", "order_sys_no", "order_exp_time", "order_items", "order_last_change", "order_src_name", "order_ref_code", "order_app_time", "order_total", "order_cust_code", "order_approved", "order_cust_no", "order_carr_name", "order_stat_name", "order_dtrm_name", "order_styp_name", "order_ttyp_id", "order_supp_name", "order_supp_code", "order_pay_note", "order_price_printed", "order_dloc_name", "order_src_id", "order_limit", "order_strm_name", "order_stat_id", "order_ord_time", "order_trsf_type", "order_cust_name", "order_dloc_code", "order_drwr_name", "order_schedules", "order_instructions", "order_cust_acnt", "order_inv_no", "order_expired", "order_psnl_code");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("order_ttyp_name", "order_app_no", "rn", "order_dtrm_code", "order_ship_to_num", "order_psnl_name", "order_sold_to_num", "order_strm_code", "order_carr_code", "order_styp_id", "order_dlv_time", "order_drwr_code", "order_sys_no", "order_exp_time", "order_items", "order_last_change", "order_src_name", "order_ref_code", "order_app_time", "order_total", "order_cust_code", "order_approved", "order_cust_no", "order_carr_name", "order_stat_name", "order_dtrm_name", "order_styp_name", "order_ttyp_id", "order_supp_name", "order_supp_code", "order_pay_note", "order_price_printed", "order_dloc_name", "order_src_id", "order_limit", "order_strm_name", "order_stat_id", "order_ord_time", "order_trsf_type", "order_cust_name", "order_dloc_code", "order_drwr_name", "order_schedules", "order_instructions", "order_cust_acnt", "order_inv_no", "order_expired", "order_psnl_code");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("order_ttyp_name", "order_app_no", "rn", "order_dtrm_code", "order_ship_to_num", "order_psnl_name", "order_sold_to_num", "order_strm_code", "order_carr_code", "order_styp_id", "order_dlv_time", "order_drwr_code", "order_sys_no", "order_exp_time", "order_items", "order_last_change", "order_src_name", "order_ref_code", "order_app_time", "order_total", "order_cust_code", "order_approved", "order_cust_no", "order_carr_name", "order_stat_name", "order_dtrm_name", "order_styp_name", "order_ttyp_id", "order_supp_name", "order_supp_code", "order_pay_note", "order_price_printed", "order_dloc_name", "order_src_id", "order_limit", "order_strm_name", "order_stat_id", "order_ord_time", "order_trsf_type", "order_cust_name", "order_dloc_code", "order_drwr_name", "order_schedules", "order_instructions", "order_cust_acnt", "order_inv_no", "order_expired", "order_psnl_code");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("order_ttyp_name", "order_app_no", "rn", "order_dtrm_code", "order_ship_to_num", "order_psnl_name", "order_sold_to_num", "order_strm_code", "order_carr_code", "order_styp_id", "order_dlv_time", "order_drwr_code", "order_sys_no", "order_exp_time", "order_items", "order_last_change", "order_src_name", "order_ref_code", "order_app_time", "order_total", "order_cust_code", "order_approved", "order_cust_no", "order_carr_name", "order_stat_name", "order_dtrm_name", "order_styp_name", "order_ttyp_id", "order_supp_name", "order_supp_code", "order_pay_note", "order_price_printed", "order_dloc_name", "order_src_id", "order_limit", "order_strm_name", "order_stat_id", "order_ord_time", "order_trsf_type", "order_cust_name", "order_dloc_code", "order_drwr_name", "order_schedules", "order_instructions", "order_cust_acnt", "order_inv_no", "order_expired", "order_psnl_code");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("order_ttyp_name", "order_app_no", "rn", "order_dtrm_code", "order_ship_to_num", "order_psnl_name", "order_sold_to_num", "order_strm_code", "order_carr_code", "order_styp_id", "order_dlv_time", "order_drwr_code", "order_sys_no", "order_exp_time", "order_items", "order_last_change", "order_src_name", "order_ref_code", "order_app_time", "order_total", "order_cust_code", "order_approved", "order_cust_no", "order_carr_name", "order_stat_name", "order_dtrm_name", "order_styp_name", "order_ttyp_id", "order_supp_name", "order_supp_code", "order_pay_note", "order_price_printed", "order_dloc_name", "order_src_id", "order_limit", "order_strm_name", "order_stat_id", "order_ord_time", "order_trsf_type", "order_cust_name", "order_dloc_code", "order_drwr_name", "order_schedules", "order_instructions", "order_cust_acnt", "order_inv_no", "order_expired", "order_psnl_code");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "GUI_ORDERS";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _order_ttyp_nameIsValid:Boolean;
    model_internal var _order_ttyp_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_ttyp_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _order_ttyp_nameValidationFailureMessages:Array;
    
    model_internal var _order_app_noIsValid:Boolean;
    model_internal var _order_app_noValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_app_noIsValidCacheInitialized:Boolean = false;
    model_internal var _order_app_noValidationFailureMessages:Array;
    
    model_internal var _order_dtrm_codeIsValid:Boolean;
    model_internal var _order_dtrm_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_dtrm_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _order_dtrm_codeValidationFailureMessages:Array;
    
    model_internal var _order_ship_to_numIsValid:Boolean;
    model_internal var _order_ship_to_numValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_ship_to_numIsValidCacheInitialized:Boolean = false;
    model_internal var _order_ship_to_numValidationFailureMessages:Array;
    
    model_internal var _order_psnl_nameIsValid:Boolean;
    model_internal var _order_psnl_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_psnl_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _order_psnl_nameValidationFailureMessages:Array;
    
    model_internal var _order_sold_to_numIsValid:Boolean;
    model_internal var _order_sold_to_numValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_sold_to_numIsValidCacheInitialized:Boolean = false;
    model_internal var _order_sold_to_numValidationFailureMessages:Array;
    
    model_internal var _order_strm_codeIsValid:Boolean;
    model_internal var _order_strm_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_strm_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _order_strm_codeValidationFailureMessages:Array;
    
    model_internal var _order_carr_codeIsValid:Boolean;
    model_internal var _order_carr_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_carr_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _order_carr_codeValidationFailureMessages:Array;
    
    model_internal var _order_styp_idIsValid:Boolean;
    model_internal var _order_styp_idValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_styp_idIsValidCacheInitialized:Boolean = false;
    model_internal var _order_styp_idValidationFailureMessages:Array;
    
    model_internal var _order_dlv_timeIsValid:Boolean;
    model_internal var _order_dlv_timeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_dlv_timeIsValidCacheInitialized:Boolean = false;
    model_internal var _order_dlv_timeValidationFailureMessages:Array;
    
    model_internal var _order_drwr_codeIsValid:Boolean;
    model_internal var _order_drwr_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_drwr_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _order_drwr_codeValidationFailureMessages:Array;
    
    model_internal var _order_sys_noIsValid:Boolean;
    model_internal var _order_sys_noValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_sys_noIsValidCacheInitialized:Boolean = false;
    model_internal var _order_sys_noValidationFailureMessages:Array;
    
    model_internal var _order_exp_timeIsValid:Boolean;
    model_internal var _order_exp_timeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_exp_timeIsValidCacheInitialized:Boolean = false;
    model_internal var _order_exp_timeValidationFailureMessages:Array;
    
    model_internal var _order_itemsIsValid:Boolean;
    model_internal var _order_itemsValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_itemsIsValidCacheInitialized:Boolean = false;
    model_internal var _order_itemsValidationFailureMessages:Array;
    
    model_internal var _order_last_changeIsValid:Boolean;
    model_internal var _order_last_changeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_last_changeIsValidCacheInitialized:Boolean = false;
    model_internal var _order_last_changeValidationFailureMessages:Array;
    
    model_internal var _order_src_nameIsValid:Boolean;
    model_internal var _order_src_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_src_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _order_src_nameValidationFailureMessages:Array;
    
    model_internal var _order_ref_codeIsValid:Boolean;
    model_internal var _order_ref_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_ref_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _order_ref_codeValidationFailureMessages:Array;
    
    model_internal var _order_app_timeIsValid:Boolean;
    model_internal var _order_app_timeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_app_timeIsValidCacheInitialized:Boolean = false;
    model_internal var _order_app_timeValidationFailureMessages:Array;
    
    model_internal var _order_totalIsValid:Boolean;
    model_internal var _order_totalValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_totalIsValidCacheInitialized:Boolean = false;
    model_internal var _order_totalValidationFailureMessages:Array;
    
    model_internal var _order_cust_codeIsValid:Boolean;
    model_internal var _order_cust_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_cust_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _order_cust_codeValidationFailureMessages:Array;
    
    model_internal var _order_approvedIsValid:Boolean;
    model_internal var _order_approvedValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_approvedIsValidCacheInitialized:Boolean = false;
    model_internal var _order_approvedValidationFailureMessages:Array;
    
    model_internal var _order_cust_noIsValid:Boolean;
    model_internal var _order_cust_noValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_cust_noIsValidCacheInitialized:Boolean = false;
    model_internal var _order_cust_noValidationFailureMessages:Array;
    
    model_internal var _order_carr_nameIsValid:Boolean;
    model_internal var _order_carr_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_carr_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _order_carr_nameValidationFailureMessages:Array;
    
    model_internal var _order_stat_nameIsValid:Boolean;
    model_internal var _order_stat_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_stat_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _order_stat_nameValidationFailureMessages:Array;
    
    model_internal var _order_dtrm_nameIsValid:Boolean;
    model_internal var _order_dtrm_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_dtrm_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _order_dtrm_nameValidationFailureMessages:Array;
    
    model_internal var _order_styp_nameIsValid:Boolean;
    model_internal var _order_styp_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_styp_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _order_styp_nameValidationFailureMessages:Array;
    
    model_internal var _order_ttyp_idIsValid:Boolean;
    model_internal var _order_ttyp_idValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_ttyp_idIsValidCacheInitialized:Boolean = false;
    model_internal var _order_ttyp_idValidationFailureMessages:Array;
    
    model_internal var _order_supp_nameIsValid:Boolean;
    model_internal var _order_supp_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_supp_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _order_supp_nameValidationFailureMessages:Array;
    
    model_internal var _order_supp_codeIsValid:Boolean;
    model_internal var _order_supp_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_supp_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _order_supp_codeValidationFailureMessages:Array;
    
    model_internal var _order_pay_noteIsValid:Boolean;
    model_internal var _order_pay_noteValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_pay_noteIsValidCacheInitialized:Boolean = false;
    model_internal var _order_pay_noteValidationFailureMessages:Array;
    
    model_internal var _order_price_printedIsValid:Boolean;
    model_internal var _order_price_printedValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_price_printedIsValidCacheInitialized:Boolean = false;
    model_internal var _order_price_printedValidationFailureMessages:Array;
    
    model_internal var _order_dloc_nameIsValid:Boolean;
    model_internal var _order_dloc_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_dloc_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _order_dloc_nameValidationFailureMessages:Array;
    
    model_internal var _order_src_idIsValid:Boolean;
    model_internal var _order_src_idValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_src_idIsValidCacheInitialized:Boolean = false;
    model_internal var _order_src_idValidationFailureMessages:Array;
    
    model_internal var _order_limitIsValid:Boolean;
    model_internal var _order_limitValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_limitIsValidCacheInitialized:Boolean = false;
    model_internal var _order_limitValidationFailureMessages:Array;
    
    model_internal var _order_strm_nameIsValid:Boolean;
    model_internal var _order_strm_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_strm_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _order_strm_nameValidationFailureMessages:Array;
    
    model_internal var _order_stat_idIsValid:Boolean;
    model_internal var _order_stat_idValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_stat_idIsValidCacheInitialized:Boolean = false;
    model_internal var _order_stat_idValidationFailureMessages:Array;
    
    model_internal var _order_ord_timeIsValid:Boolean;
    model_internal var _order_ord_timeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_ord_timeIsValidCacheInitialized:Boolean = false;
    model_internal var _order_ord_timeValidationFailureMessages:Array;
    
    model_internal var _order_trsf_typeIsValid:Boolean;
    model_internal var _order_trsf_typeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_trsf_typeIsValidCacheInitialized:Boolean = false;
    model_internal var _order_trsf_typeValidationFailureMessages:Array;
    
    model_internal var _order_cust_nameIsValid:Boolean;
    model_internal var _order_cust_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_cust_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _order_cust_nameValidationFailureMessages:Array;
    
    model_internal var _order_dloc_codeIsValid:Boolean;
    model_internal var _order_dloc_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_dloc_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _order_dloc_codeValidationFailureMessages:Array;
    
    model_internal var _order_drwr_nameIsValid:Boolean;
    model_internal var _order_drwr_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_drwr_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _order_drwr_nameValidationFailureMessages:Array;
    
    model_internal var _order_schedulesIsValid:Boolean;
    model_internal var _order_schedulesValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_schedulesIsValidCacheInitialized:Boolean = false;
    model_internal var _order_schedulesValidationFailureMessages:Array;
    
    model_internal var _order_instructionsIsValid:Boolean;
    model_internal var _order_instructionsValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_instructionsIsValidCacheInitialized:Boolean = false;
    model_internal var _order_instructionsValidationFailureMessages:Array;
    
    model_internal var _order_cust_acntIsValid:Boolean;
    model_internal var _order_cust_acntValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_cust_acntIsValidCacheInitialized:Boolean = false;
    model_internal var _order_cust_acntValidationFailureMessages:Array;
    
    model_internal var _order_inv_noIsValid:Boolean;
    model_internal var _order_inv_noValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_inv_noIsValidCacheInitialized:Boolean = false;
    model_internal var _order_inv_noValidationFailureMessages:Array;
    
    model_internal var _order_expiredIsValid:Boolean;
    model_internal var _order_expiredValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_expiredIsValidCacheInitialized:Boolean = false;
    model_internal var _order_expiredValidationFailureMessages:Array;
    
    model_internal var _order_psnl_codeIsValid:Boolean;
    model_internal var _order_psnl_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_psnl_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _order_psnl_codeValidationFailureMessages:Array;

    model_internal var _instance:_Super_GUI_ORDERS;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _GUI_ORDERSEntityMetadata(value : _Super_GUI_ORDERS)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["order_ttyp_name"] = new Array();
            model_internal::dependentsOnMap["order_app_no"] = new Array();
            model_internal::dependentsOnMap["rn"] = new Array();
            model_internal::dependentsOnMap["order_dtrm_code"] = new Array();
            model_internal::dependentsOnMap["order_ship_to_num"] = new Array();
            model_internal::dependentsOnMap["order_psnl_name"] = new Array();
            model_internal::dependentsOnMap["order_sold_to_num"] = new Array();
            model_internal::dependentsOnMap["order_strm_code"] = new Array();
            model_internal::dependentsOnMap["order_carr_code"] = new Array();
            model_internal::dependentsOnMap["order_styp_id"] = new Array();
            model_internal::dependentsOnMap["order_dlv_time"] = new Array();
            model_internal::dependentsOnMap["order_drwr_code"] = new Array();
            model_internal::dependentsOnMap["order_sys_no"] = new Array();
            model_internal::dependentsOnMap["order_exp_time"] = new Array();
            model_internal::dependentsOnMap["order_items"] = new Array();
            model_internal::dependentsOnMap["order_last_change"] = new Array();
            model_internal::dependentsOnMap["order_src_name"] = new Array();
            model_internal::dependentsOnMap["order_ref_code"] = new Array();
            model_internal::dependentsOnMap["order_app_time"] = new Array();
            model_internal::dependentsOnMap["order_total"] = new Array();
            model_internal::dependentsOnMap["order_cust_code"] = new Array();
            model_internal::dependentsOnMap["order_approved"] = new Array();
            model_internal::dependentsOnMap["order_cust_no"] = new Array();
            model_internal::dependentsOnMap["order_carr_name"] = new Array();
            model_internal::dependentsOnMap["order_stat_name"] = new Array();
            model_internal::dependentsOnMap["order_dtrm_name"] = new Array();
            model_internal::dependentsOnMap["order_styp_name"] = new Array();
            model_internal::dependentsOnMap["order_ttyp_id"] = new Array();
            model_internal::dependentsOnMap["order_supp_name"] = new Array();
            model_internal::dependentsOnMap["order_supp_code"] = new Array();
            model_internal::dependentsOnMap["order_pay_note"] = new Array();
            model_internal::dependentsOnMap["order_price_printed"] = new Array();
            model_internal::dependentsOnMap["order_dloc_name"] = new Array();
            model_internal::dependentsOnMap["order_src_id"] = new Array();
            model_internal::dependentsOnMap["order_limit"] = new Array();
            model_internal::dependentsOnMap["order_strm_name"] = new Array();
            model_internal::dependentsOnMap["order_stat_id"] = new Array();
            model_internal::dependentsOnMap["order_ord_time"] = new Array();
            model_internal::dependentsOnMap["order_trsf_type"] = new Array();
            model_internal::dependentsOnMap["order_cust_name"] = new Array();
            model_internal::dependentsOnMap["order_dloc_code"] = new Array();
            model_internal::dependentsOnMap["order_drwr_name"] = new Array();
            model_internal::dependentsOnMap["order_schedules"] = new Array();
            model_internal::dependentsOnMap["order_instructions"] = new Array();
            model_internal::dependentsOnMap["order_cust_acnt"] = new Array();
            model_internal::dependentsOnMap["order_inv_no"] = new Array();
            model_internal::dependentsOnMap["order_expired"] = new Array();
            model_internal::dependentsOnMap["order_psnl_code"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["order_ttyp_name"] = "String";
        model_internal::propertyTypeMap["order_app_no"] = "String";
        model_internal::propertyTypeMap["rn"] = "String";
        model_internal::propertyTypeMap["order_dtrm_code"] = "String";
        model_internal::propertyTypeMap["order_ship_to_num"] = "Object";
        model_internal::propertyTypeMap["order_psnl_name"] = "String";
        model_internal::propertyTypeMap["order_sold_to_num"] = "Object";
        model_internal::propertyTypeMap["order_strm_code"] = "String";
        model_internal::propertyTypeMap["order_carr_code"] = "String";
        model_internal::propertyTypeMap["order_styp_id"] = "String";
        model_internal::propertyTypeMap["order_dlv_time"] = "String";
        model_internal::propertyTypeMap["order_drwr_code"] = "String";
        model_internal::propertyTypeMap["order_sys_no"] = "String";
        model_internal::propertyTypeMap["order_exp_time"] = "String";
        model_internal::propertyTypeMap["order_items"] = "Object";
        model_internal::propertyTypeMap["order_last_change"] = "String";
        model_internal::propertyTypeMap["order_src_name"] = "String";
        model_internal::propertyTypeMap["order_ref_code"] = "Object";
        model_internal::propertyTypeMap["order_app_time"] = "String";
        model_internal::propertyTypeMap["order_total"] = "String";
        model_internal::propertyTypeMap["order_cust_code"] = "String";
        model_internal::propertyTypeMap["order_approved"] = "String";
        model_internal::propertyTypeMap["order_cust_no"] = "String";
        model_internal::propertyTypeMap["order_carr_name"] = "String";
        model_internal::propertyTypeMap["order_stat_name"] = "String";
        model_internal::propertyTypeMap["order_dtrm_name"] = "String";
        model_internal::propertyTypeMap["order_styp_name"] = "String";
        model_internal::propertyTypeMap["order_ttyp_id"] = "String";
        model_internal::propertyTypeMap["order_supp_name"] = "String";
        model_internal::propertyTypeMap["order_supp_code"] = "String";
        model_internal::propertyTypeMap["order_pay_note"] = "Object";
        model_internal::propertyTypeMap["order_price_printed"] = "String";
        model_internal::propertyTypeMap["order_dloc_name"] = "String";
        model_internal::propertyTypeMap["order_src_id"] = "String";
        model_internal::propertyTypeMap["order_limit"] = "String";
        model_internal::propertyTypeMap["order_strm_name"] = "String";
        model_internal::propertyTypeMap["order_stat_id"] = "String";
        model_internal::propertyTypeMap["order_ord_time"] = "String";
        model_internal::propertyTypeMap["order_trsf_type"] = "Object";
        model_internal::propertyTypeMap["order_cust_name"] = "String";
        model_internal::propertyTypeMap["order_dloc_code"] = "String";
        model_internal::propertyTypeMap["order_drwr_name"] = "String";
        model_internal::propertyTypeMap["order_schedules"] = "Object";
        model_internal::propertyTypeMap["order_instructions"] = "String";
        model_internal::propertyTypeMap["order_cust_acnt"] = "String";
        model_internal::propertyTypeMap["order_inv_no"] = "Object";
        model_internal::propertyTypeMap["order_expired"] = "Object";
        model_internal::propertyTypeMap["order_psnl_code"] = "String";

        model_internal::_instance = value;
        model_internal::_order_ttyp_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_ttyp_name);
        model_internal::_order_ttyp_nameValidator.required = true;
        model_internal::_order_ttyp_nameValidator.requiredFieldError = "order_ttyp_name is required";
        //model_internal::_order_ttyp_nameValidator.source = model_internal::_instance;
        //model_internal::_order_ttyp_nameValidator.property = "order_ttyp_name";
        model_internal::_order_app_noValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_app_no);
        model_internal::_order_app_noValidator.required = true;
        model_internal::_order_app_noValidator.requiredFieldError = "order_app_no is required";
        //model_internal::_order_app_noValidator.source = model_internal::_instance;
        //model_internal::_order_app_noValidator.property = "order_app_no";
        model_internal::_order_dtrm_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_dtrm_code);
        model_internal::_order_dtrm_codeValidator.required = true;
        model_internal::_order_dtrm_codeValidator.requiredFieldError = "order_dtrm_code is required";
        //model_internal::_order_dtrm_codeValidator.source = model_internal::_instance;
        //model_internal::_order_dtrm_codeValidator.property = "order_dtrm_code";
        model_internal::_order_ship_to_numValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_ship_to_num);
        model_internal::_order_ship_to_numValidator.required = true;
        model_internal::_order_ship_to_numValidator.requiredFieldError = "order_ship_to_num is required";
        //model_internal::_order_ship_to_numValidator.source = model_internal::_instance;
        //model_internal::_order_ship_to_numValidator.property = "order_ship_to_num";
        model_internal::_order_psnl_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_psnl_name);
        model_internal::_order_psnl_nameValidator.required = true;
        model_internal::_order_psnl_nameValidator.requiredFieldError = "order_psnl_name is required";
        //model_internal::_order_psnl_nameValidator.source = model_internal::_instance;
        //model_internal::_order_psnl_nameValidator.property = "order_psnl_name";
        model_internal::_order_sold_to_numValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_sold_to_num);
        model_internal::_order_sold_to_numValidator.required = true;
        model_internal::_order_sold_to_numValidator.requiredFieldError = "order_sold_to_num is required";
        //model_internal::_order_sold_to_numValidator.source = model_internal::_instance;
        //model_internal::_order_sold_to_numValidator.property = "order_sold_to_num";
        model_internal::_order_strm_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_strm_code);
        model_internal::_order_strm_codeValidator.required = true;
        model_internal::_order_strm_codeValidator.requiredFieldError = "order_strm_code is required";
        //model_internal::_order_strm_codeValidator.source = model_internal::_instance;
        //model_internal::_order_strm_codeValidator.property = "order_strm_code";
        model_internal::_order_carr_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_carr_code);
        model_internal::_order_carr_codeValidator.required = true;
        model_internal::_order_carr_codeValidator.requiredFieldError = "order_carr_code is required";
        //model_internal::_order_carr_codeValidator.source = model_internal::_instance;
        //model_internal::_order_carr_codeValidator.property = "order_carr_code";
        model_internal::_order_styp_idValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_styp_id);
        model_internal::_order_styp_idValidator.required = true;
        model_internal::_order_styp_idValidator.requiredFieldError = "order_styp_id is required";
        //model_internal::_order_styp_idValidator.source = model_internal::_instance;
        //model_internal::_order_styp_idValidator.property = "order_styp_id";
        model_internal::_order_dlv_timeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_dlv_time);
        model_internal::_order_dlv_timeValidator.required = true;
        model_internal::_order_dlv_timeValidator.requiredFieldError = "order_dlv_time is required";
        //model_internal::_order_dlv_timeValidator.source = model_internal::_instance;
        //model_internal::_order_dlv_timeValidator.property = "order_dlv_time";
        model_internal::_order_drwr_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_drwr_code);
        model_internal::_order_drwr_codeValidator.required = true;
        model_internal::_order_drwr_codeValidator.requiredFieldError = "order_drwr_code is required";
        //model_internal::_order_drwr_codeValidator.source = model_internal::_instance;
        //model_internal::_order_drwr_codeValidator.property = "order_drwr_code";
        model_internal::_order_sys_noValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_sys_no);
        model_internal::_order_sys_noValidator.required = true;
        model_internal::_order_sys_noValidator.requiredFieldError = "order_sys_no is required";
        //model_internal::_order_sys_noValidator.source = model_internal::_instance;
        //model_internal::_order_sys_noValidator.property = "order_sys_no";
        model_internal::_order_exp_timeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_exp_time);
        model_internal::_order_exp_timeValidator.required = true;
        model_internal::_order_exp_timeValidator.requiredFieldError = "order_exp_time is required";
        //model_internal::_order_exp_timeValidator.source = model_internal::_instance;
        //model_internal::_order_exp_timeValidator.property = "order_exp_time";
        model_internal::_order_itemsValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_items);
        model_internal::_order_itemsValidator.required = true;
        model_internal::_order_itemsValidator.requiredFieldError = "order_items is required";
        //model_internal::_order_itemsValidator.source = model_internal::_instance;
        //model_internal::_order_itemsValidator.property = "order_items";
        model_internal::_order_last_changeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_last_change);
        model_internal::_order_last_changeValidator.required = true;
        model_internal::_order_last_changeValidator.requiredFieldError = "order_last_change is required";
        //model_internal::_order_last_changeValidator.source = model_internal::_instance;
        //model_internal::_order_last_changeValidator.property = "order_last_change";
        model_internal::_order_src_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_src_name);
        model_internal::_order_src_nameValidator.required = true;
        model_internal::_order_src_nameValidator.requiredFieldError = "order_src_name is required";
        //model_internal::_order_src_nameValidator.source = model_internal::_instance;
        //model_internal::_order_src_nameValidator.property = "order_src_name";
        model_internal::_order_ref_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_ref_code);
        model_internal::_order_ref_codeValidator.required = true;
        model_internal::_order_ref_codeValidator.requiredFieldError = "order_ref_code is required";
        //model_internal::_order_ref_codeValidator.source = model_internal::_instance;
        //model_internal::_order_ref_codeValidator.property = "order_ref_code";
        model_internal::_order_app_timeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_app_time);
        model_internal::_order_app_timeValidator.required = true;
        model_internal::_order_app_timeValidator.requiredFieldError = "order_app_time is required";
        //model_internal::_order_app_timeValidator.source = model_internal::_instance;
        //model_internal::_order_app_timeValidator.property = "order_app_time";
        model_internal::_order_totalValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_total);
        model_internal::_order_totalValidator.required = true;
        model_internal::_order_totalValidator.requiredFieldError = "order_total is required";
        //model_internal::_order_totalValidator.source = model_internal::_instance;
        //model_internal::_order_totalValidator.property = "order_total";
        model_internal::_order_cust_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_cust_code);
        model_internal::_order_cust_codeValidator.required = true;
        model_internal::_order_cust_codeValidator.requiredFieldError = "order_cust_code is required";
        //model_internal::_order_cust_codeValidator.source = model_internal::_instance;
        //model_internal::_order_cust_codeValidator.property = "order_cust_code";
        model_internal::_order_approvedValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_approved);
        model_internal::_order_approvedValidator.required = true;
        model_internal::_order_approvedValidator.requiredFieldError = "order_approved is required";
        //model_internal::_order_approvedValidator.source = model_internal::_instance;
        //model_internal::_order_approvedValidator.property = "order_approved";
        model_internal::_order_cust_noValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_cust_no);
        model_internal::_order_cust_noValidator.required = true;
        model_internal::_order_cust_noValidator.requiredFieldError = "order_cust_no is required";
        //model_internal::_order_cust_noValidator.source = model_internal::_instance;
        //model_internal::_order_cust_noValidator.property = "order_cust_no";
        model_internal::_order_carr_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_carr_name);
        model_internal::_order_carr_nameValidator.required = true;
        model_internal::_order_carr_nameValidator.requiredFieldError = "order_carr_name is required";
        //model_internal::_order_carr_nameValidator.source = model_internal::_instance;
        //model_internal::_order_carr_nameValidator.property = "order_carr_name";
        model_internal::_order_stat_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_stat_name);
        model_internal::_order_stat_nameValidator.required = true;
        model_internal::_order_stat_nameValidator.requiredFieldError = "order_stat_name is required";
        //model_internal::_order_stat_nameValidator.source = model_internal::_instance;
        //model_internal::_order_stat_nameValidator.property = "order_stat_name";
        model_internal::_order_dtrm_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_dtrm_name);
        model_internal::_order_dtrm_nameValidator.required = true;
        model_internal::_order_dtrm_nameValidator.requiredFieldError = "order_dtrm_name is required";
        //model_internal::_order_dtrm_nameValidator.source = model_internal::_instance;
        //model_internal::_order_dtrm_nameValidator.property = "order_dtrm_name";
        model_internal::_order_styp_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_styp_name);
        model_internal::_order_styp_nameValidator.required = true;
        model_internal::_order_styp_nameValidator.requiredFieldError = "order_styp_name is required";
        //model_internal::_order_styp_nameValidator.source = model_internal::_instance;
        //model_internal::_order_styp_nameValidator.property = "order_styp_name";
        model_internal::_order_ttyp_idValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_ttyp_id);
        model_internal::_order_ttyp_idValidator.required = true;
        model_internal::_order_ttyp_idValidator.requiredFieldError = "order_ttyp_id is required";
        //model_internal::_order_ttyp_idValidator.source = model_internal::_instance;
        //model_internal::_order_ttyp_idValidator.property = "order_ttyp_id";
        model_internal::_order_supp_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_supp_name);
        model_internal::_order_supp_nameValidator.required = true;
        model_internal::_order_supp_nameValidator.requiredFieldError = "order_supp_name is required";
        //model_internal::_order_supp_nameValidator.source = model_internal::_instance;
        //model_internal::_order_supp_nameValidator.property = "order_supp_name";
        model_internal::_order_supp_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_supp_code);
        model_internal::_order_supp_codeValidator.required = true;
        model_internal::_order_supp_codeValidator.requiredFieldError = "order_supp_code is required";
        //model_internal::_order_supp_codeValidator.source = model_internal::_instance;
        //model_internal::_order_supp_codeValidator.property = "order_supp_code";
        model_internal::_order_pay_noteValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_pay_note);
        model_internal::_order_pay_noteValidator.required = true;
        model_internal::_order_pay_noteValidator.requiredFieldError = "order_pay_note is required";
        //model_internal::_order_pay_noteValidator.source = model_internal::_instance;
        //model_internal::_order_pay_noteValidator.property = "order_pay_note";
        model_internal::_order_price_printedValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_price_printed);
        model_internal::_order_price_printedValidator.required = true;
        model_internal::_order_price_printedValidator.requiredFieldError = "order_price_printed is required";
        //model_internal::_order_price_printedValidator.source = model_internal::_instance;
        //model_internal::_order_price_printedValidator.property = "order_price_printed";
        model_internal::_order_dloc_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_dloc_name);
        model_internal::_order_dloc_nameValidator.required = true;
        model_internal::_order_dloc_nameValidator.requiredFieldError = "order_dloc_name is required";
        //model_internal::_order_dloc_nameValidator.source = model_internal::_instance;
        //model_internal::_order_dloc_nameValidator.property = "order_dloc_name";
        model_internal::_order_src_idValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_src_id);
        model_internal::_order_src_idValidator.required = true;
        model_internal::_order_src_idValidator.requiredFieldError = "order_src_id is required";
        //model_internal::_order_src_idValidator.source = model_internal::_instance;
        //model_internal::_order_src_idValidator.property = "order_src_id";
        model_internal::_order_limitValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_limit);
        model_internal::_order_limitValidator.required = true;
        model_internal::_order_limitValidator.requiredFieldError = "order_limit is required";
        //model_internal::_order_limitValidator.source = model_internal::_instance;
        //model_internal::_order_limitValidator.property = "order_limit";
        model_internal::_order_strm_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_strm_name);
        model_internal::_order_strm_nameValidator.required = true;
        model_internal::_order_strm_nameValidator.requiredFieldError = "order_strm_name is required";
        //model_internal::_order_strm_nameValidator.source = model_internal::_instance;
        //model_internal::_order_strm_nameValidator.property = "order_strm_name";
        model_internal::_order_stat_idValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_stat_id);
        model_internal::_order_stat_idValidator.required = true;
        model_internal::_order_stat_idValidator.requiredFieldError = "order_stat_id is required";
        //model_internal::_order_stat_idValidator.source = model_internal::_instance;
        //model_internal::_order_stat_idValidator.property = "order_stat_id";
        model_internal::_order_ord_timeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_ord_time);
        model_internal::_order_ord_timeValidator.required = true;
        model_internal::_order_ord_timeValidator.requiredFieldError = "order_ord_time is required";
        //model_internal::_order_ord_timeValidator.source = model_internal::_instance;
        //model_internal::_order_ord_timeValidator.property = "order_ord_time";
        model_internal::_order_trsf_typeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_trsf_type);
        model_internal::_order_trsf_typeValidator.required = true;
        model_internal::_order_trsf_typeValidator.requiredFieldError = "order_trsf_type is required";
        //model_internal::_order_trsf_typeValidator.source = model_internal::_instance;
        //model_internal::_order_trsf_typeValidator.property = "order_trsf_type";
        model_internal::_order_cust_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_cust_name);
        model_internal::_order_cust_nameValidator.required = true;
        model_internal::_order_cust_nameValidator.requiredFieldError = "order_cust_name is required";
        //model_internal::_order_cust_nameValidator.source = model_internal::_instance;
        //model_internal::_order_cust_nameValidator.property = "order_cust_name";
        model_internal::_order_dloc_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_dloc_code);
        model_internal::_order_dloc_codeValidator.required = true;
        model_internal::_order_dloc_codeValidator.requiredFieldError = "order_dloc_code is required";
        //model_internal::_order_dloc_codeValidator.source = model_internal::_instance;
        //model_internal::_order_dloc_codeValidator.property = "order_dloc_code";
        model_internal::_order_drwr_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_drwr_name);
        model_internal::_order_drwr_nameValidator.required = true;
        model_internal::_order_drwr_nameValidator.requiredFieldError = "order_drwr_name is required";
        //model_internal::_order_drwr_nameValidator.source = model_internal::_instance;
        //model_internal::_order_drwr_nameValidator.property = "order_drwr_name";
        model_internal::_order_schedulesValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_schedules);
        model_internal::_order_schedulesValidator.required = true;
        model_internal::_order_schedulesValidator.requiredFieldError = "order_schedules is required";
        //model_internal::_order_schedulesValidator.source = model_internal::_instance;
        //model_internal::_order_schedulesValidator.property = "order_schedules";
        model_internal::_order_instructionsValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_instructions);
        model_internal::_order_instructionsValidator.required = true;
        model_internal::_order_instructionsValidator.requiredFieldError = "order_instructions is required";
        //model_internal::_order_instructionsValidator.source = model_internal::_instance;
        //model_internal::_order_instructionsValidator.property = "order_instructions";
        model_internal::_order_cust_acntValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_cust_acnt);
        model_internal::_order_cust_acntValidator.required = true;
        model_internal::_order_cust_acntValidator.requiredFieldError = "order_cust_acnt is required";
        //model_internal::_order_cust_acntValidator.source = model_internal::_instance;
        //model_internal::_order_cust_acntValidator.property = "order_cust_acnt";
        model_internal::_order_inv_noValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_inv_no);
        model_internal::_order_inv_noValidator.required = true;
        model_internal::_order_inv_noValidator.requiredFieldError = "order_inv_no is required";
        //model_internal::_order_inv_noValidator.source = model_internal::_instance;
        //model_internal::_order_inv_noValidator.property = "order_inv_no";
        model_internal::_order_expiredValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_expired);
        model_internal::_order_expiredValidator.required = true;
        model_internal::_order_expiredValidator.requiredFieldError = "order_expired is required";
        //model_internal::_order_expiredValidator.source = model_internal::_instance;
        //model_internal::_order_expiredValidator.property = "order_expired";
        model_internal::_order_psnl_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_psnl_code);
        model_internal::_order_psnl_codeValidator.required = true;
        model_internal::_order_psnl_codeValidator.requiredFieldError = "order_psnl_code is required";
        //model_internal::_order_psnl_codeValidator.source = model_internal::_instance;
        //model_internal::_order_psnl_codeValidator.property = "order_psnl_code";
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
            throw new Error(propertyName + " is not a data property of entity GUI_ORDERS");
            
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
            throw new Error(propertyName + " is not a collection property of entity GUI_ORDERS");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of GUI_ORDERS");

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
            throw new Error(propertyName + " does not exist for entity GUI_ORDERS");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity GUI_ORDERS");
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
            throw new Error(propertyName + " does not exist for entity GUI_ORDERS");
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
    public function get isOrder_ttyp_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_app_noAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isRnAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_dtrm_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_ship_to_numAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_psnl_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_sold_to_numAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_strm_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_carr_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_styp_idAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_dlv_timeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_drwr_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_sys_noAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_exp_timeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_itemsAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_last_changeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_src_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_ref_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_app_timeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_totalAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_cust_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_approvedAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_cust_noAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_carr_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_stat_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_dtrm_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_styp_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_ttyp_idAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_supp_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_supp_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_pay_noteAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_price_printedAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_dloc_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_src_idAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_limitAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_strm_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_stat_idAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_ord_timeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_trsf_typeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_cust_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_dloc_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_drwr_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_schedulesAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_instructionsAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_cust_acntAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_inv_noAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_expiredAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_psnl_codeAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnOrder_ttyp_name():void
    {
        if (model_internal::_order_ttyp_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_ttyp_name = null;
            model_internal::calculateOrder_ttyp_nameIsValid();
        }
    }
    public function invalidateDependentOnOrder_app_no():void
    {
        if (model_internal::_order_app_noIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_app_no = null;
            model_internal::calculateOrder_app_noIsValid();
        }
    }
    public function invalidateDependentOnOrder_dtrm_code():void
    {
        if (model_internal::_order_dtrm_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_dtrm_code = null;
            model_internal::calculateOrder_dtrm_codeIsValid();
        }
    }
    public function invalidateDependentOnOrder_ship_to_num():void
    {
        if (model_internal::_order_ship_to_numIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_ship_to_num = null;
            model_internal::calculateOrder_ship_to_numIsValid();
        }
    }
    public function invalidateDependentOnOrder_psnl_name():void
    {
        if (model_internal::_order_psnl_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_psnl_name = null;
            model_internal::calculateOrder_psnl_nameIsValid();
        }
    }
    public function invalidateDependentOnOrder_sold_to_num():void
    {
        if (model_internal::_order_sold_to_numIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_sold_to_num = null;
            model_internal::calculateOrder_sold_to_numIsValid();
        }
    }
    public function invalidateDependentOnOrder_strm_code():void
    {
        if (model_internal::_order_strm_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_strm_code = null;
            model_internal::calculateOrder_strm_codeIsValid();
        }
    }
    public function invalidateDependentOnOrder_carr_code():void
    {
        if (model_internal::_order_carr_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_carr_code = null;
            model_internal::calculateOrder_carr_codeIsValid();
        }
    }
    public function invalidateDependentOnOrder_styp_id():void
    {
        if (model_internal::_order_styp_idIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_styp_id = null;
            model_internal::calculateOrder_styp_idIsValid();
        }
    }
    public function invalidateDependentOnOrder_dlv_time():void
    {
        if (model_internal::_order_dlv_timeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_dlv_time = null;
            model_internal::calculateOrder_dlv_timeIsValid();
        }
    }
    public function invalidateDependentOnOrder_drwr_code():void
    {
        if (model_internal::_order_drwr_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_drwr_code = null;
            model_internal::calculateOrder_drwr_codeIsValid();
        }
    }
    public function invalidateDependentOnOrder_sys_no():void
    {
        if (model_internal::_order_sys_noIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_sys_no = null;
            model_internal::calculateOrder_sys_noIsValid();
        }
    }
    public function invalidateDependentOnOrder_exp_time():void
    {
        if (model_internal::_order_exp_timeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_exp_time = null;
            model_internal::calculateOrder_exp_timeIsValid();
        }
    }
    public function invalidateDependentOnOrder_items():void
    {
        if (model_internal::_order_itemsIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_items = null;
            model_internal::calculateOrder_itemsIsValid();
        }
    }
    public function invalidateDependentOnOrder_last_change():void
    {
        if (model_internal::_order_last_changeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_last_change = null;
            model_internal::calculateOrder_last_changeIsValid();
        }
    }
    public function invalidateDependentOnOrder_src_name():void
    {
        if (model_internal::_order_src_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_src_name = null;
            model_internal::calculateOrder_src_nameIsValid();
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
    public function invalidateDependentOnOrder_app_time():void
    {
        if (model_internal::_order_app_timeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_app_time = null;
            model_internal::calculateOrder_app_timeIsValid();
        }
    }
    public function invalidateDependentOnOrder_total():void
    {
        if (model_internal::_order_totalIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_total = null;
            model_internal::calculateOrder_totalIsValid();
        }
    }
    public function invalidateDependentOnOrder_cust_code():void
    {
        if (model_internal::_order_cust_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_cust_code = null;
            model_internal::calculateOrder_cust_codeIsValid();
        }
    }
    public function invalidateDependentOnOrder_approved():void
    {
        if (model_internal::_order_approvedIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_approved = null;
            model_internal::calculateOrder_approvedIsValid();
        }
    }
    public function invalidateDependentOnOrder_cust_no():void
    {
        if (model_internal::_order_cust_noIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_cust_no = null;
            model_internal::calculateOrder_cust_noIsValid();
        }
    }
    public function invalidateDependentOnOrder_carr_name():void
    {
        if (model_internal::_order_carr_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_carr_name = null;
            model_internal::calculateOrder_carr_nameIsValid();
        }
    }
    public function invalidateDependentOnOrder_stat_name():void
    {
        if (model_internal::_order_stat_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_stat_name = null;
            model_internal::calculateOrder_stat_nameIsValid();
        }
    }
    public function invalidateDependentOnOrder_dtrm_name():void
    {
        if (model_internal::_order_dtrm_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_dtrm_name = null;
            model_internal::calculateOrder_dtrm_nameIsValid();
        }
    }
    public function invalidateDependentOnOrder_styp_name():void
    {
        if (model_internal::_order_styp_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_styp_name = null;
            model_internal::calculateOrder_styp_nameIsValid();
        }
    }
    public function invalidateDependentOnOrder_ttyp_id():void
    {
        if (model_internal::_order_ttyp_idIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_ttyp_id = null;
            model_internal::calculateOrder_ttyp_idIsValid();
        }
    }
    public function invalidateDependentOnOrder_supp_name():void
    {
        if (model_internal::_order_supp_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_supp_name = null;
            model_internal::calculateOrder_supp_nameIsValid();
        }
    }
    public function invalidateDependentOnOrder_supp_code():void
    {
        if (model_internal::_order_supp_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_supp_code = null;
            model_internal::calculateOrder_supp_codeIsValid();
        }
    }
    public function invalidateDependentOnOrder_pay_note():void
    {
        if (model_internal::_order_pay_noteIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_pay_note = null;
            model_internal::calculateOrder_pay_noteIsValid();
        }
    }
    public function invalidateDependentOnOrder_price_printed():void
    {
        if (model_internal::_order_price_printedIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_price_printed = null;
            model_internal::calculateOrder_price_printedIsValid();
        }
    }
    public function invalidateDependentOnOrder_dloc_name():void
    {
        if (model_internal::_order_dloc_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_dloc_name = null;
            model_internal::calculateOrder_dloc_nameIsValid();
        }
    }
    public function invalidateDependentOnOrder_src_id():void
    {
        if (model_internal::_order_src_idIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_src_id = null;
            model_internal::calculateOrder_src_idIsValid();
        }
    }
    public function invalidateDependentOnOrder_limit():void
    {
        if (model_internal::_order_limitIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_limit = null;
            model_internal::calculateOrder_limitIsValid();
        }
    }
    public function invalidateDependentOnOrder_strm_name():void
    {
        if (model_internal::_order_strm_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_strm_name = null;
            model_internal::calculateOrder_strm_nameIsValid();
        }
    }
    public function invalidateDependentOnOrder_stat_id():void
    {
        if (model_internal::_order_stat_idIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_stat_id = null;
            model_internal::calculateOrder_stat_idIsValid();
        }
    }
    public function invalidateDependentOnOrder_ord_time():void
    {
        if (model_internal::_order_ord_timeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_ord_time = null;
            model_internal::calculateOrder_ord_timeIsValid();
        }
    }
    public function invalidateDependentOnOrder_trsf_type():void
    {
        if (model_internal::_order_trsf_typeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_trsf_type = null;
            model_internal::calculateOrder_trsf_typeIsValid();
        }
    }
    public function invalidateDependentOnOrder_cust_name():void
    {
        if (model_internal::_order_cust_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_cust_name = null;
            model_internal::calculateOrder_cust_nameIsValid();
        }
    }
    public function invalidateDependentOnOrder_dloc_code():void
    {
        if (model_internal::_order_dloc_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_dloc_code = null;
            model_internal::calculateOrder_dloc_codeIsValid();
        }
    }
    public function invalidateDependentOnOrder_drwr_name():void
    {
        if (model_internal::_order_drwr_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_drwr_name = null;
            model_internal::calculateOrder_drwr_nameIsValid();
        }
    }
    public function invalidateDependentOnOrder_schedules():void
    {
        if (model_internal::_order_schedulesIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_schedules = null;
            model_internal::calculateOrder_schedulesIsValid();
        }
    }
    public function invalidateDependentOnOrder_instructions():void
    {
        if (model_internal::_order_instructionsIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_instructions = null;
            model_internal::calculateOrder_instructionsIsValid();
        }
    }
    public function invalidateDependentOnOrder_cust_acnt():void
    {
        if (model_internal::_order_cust_acntIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_cust_acnt = null;
            model_internal::calculateOrder_cust_acntIsValid();
        }
    }
    public function invalidateDependentOnOrder_inv_no():void
    {
        if (model_internal::_order_inv_noIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_inv_no = null;
            model_internal::calculateOrder_inv_noIsValid();
        }
    }
    public function invalidateDependentOnOrder_expired():void
    {
        if (model_internal::_order_expiredIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_expired = null;
            model_internal::calculateOrder_expiredIsValid();
        }
    }
    public function invalidateDependentOnOrder_psnl_code():void
    {
        if (model_internal::_order_psnl_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_psnl_code = null;
            model_internal::calculateOrder_psnl_codeIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get order_ttyp_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_ttyp_nameValidator() : StyleValidator
    {
        return model_internal::_order_ttyp_nameValidator;
    }

    model_internal function set _order_ttyp_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_ttyp_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_ttyp_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_ttyp_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_ttyp_nameIsValid():Boolean
    {
        if (!model_internal::_order_ttyp_nameIsValidCacheInitialized)
        {
            model_internal::calculateOrder_ttyp_nameIsValid();
        }

        return model_internal::_order_ttyp_nameIsValid;
    }

    model_internal function calculateOrder_ttyp_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_ttyp_nameValidator.validate(model_internal::_instance.order_ttyp_name)
        model_internal::_order_ttyp_nameIsValid_der = (valRes.results == null);
        model_internal::_order_ttyp_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_ttyp_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_ttyp_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_ttyp_nameValidationFailureMessages():Array
    {
        if (model_internal::_order_ttyp_nameValidationFailureMessages == null)
            model_internal::calculateOrder_ttyp_nameIsValid();

        return _order_ttyp_nameValidationFailureMessages;
    }

    model_internal function set order_ttyp_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_ttyp_nameValidationFailureMessages;

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
            model_internal::_order_ttyp_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_ttyp_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_app_noStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_app_noValidator() : StyleValidator
    {
        return model_internal::_order_app_noValidator;
    }

    model_internal function set _order_app_noIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_app_noIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_app_noIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_app_noIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_app_noIsValid():Boolean
    {
        if (!model_internal::_order_app_noIsValidCacheInitialized)
        {
            model_internal::calculateOrder_app_noIsValid();
        }

        return model_internal::_order_app_noIsValid;
    }

    model_internal function calculateOrder_app_noIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_app_noValidator.validate(model_internal::_instance.order_app_no)
        model_internal::_order_app_noIsValid_der = (valRes.results == null);
        model_internal::_order_app_noIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_app_noValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_app_noValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_app_noValidationFailureMessages():Array
    {
        if (model_internal::_order_app_noValidationFailureMessages == null)
            model_internal::calculateOrder_app_noIsValid();

        return _order_app_noValidationFailureMessages;
    }

    model_internal function set order_app_noValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_app_noValidationFailureMessages;

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
            model_internal::_order_app_noValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_app_noValidationFailureMessages", oldValue, value));
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
    public function get order_dtrm_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_dtrm_codeValidator() : StyleValidator
    {
        return model_internal::_order_dtrm_codeValidator;
    }

    model_internal function set _order_dtrm_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_dtrm_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_dtrm_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_dtrm_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_dtrm_codeIsValid():Boolean
    {
        if (!model_internal::_order_dtrm_codeIsValidCacheInitialized)
        {
            model_internal::calculateOrder_dtrm_codeIsValid();
        }

        return model_internal::_order_dtrm_codeIsValid;
    }

    model_internal function calculateOrder_dtrm_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_dtrm_codeValidator.validate(model_internal::_instance.order_dtrm_code)
        model_internal::_order_dtrm_codeIsValid_der = (valRes.results == null);
        model_internal::_order_dtrm_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_dtrm_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_dtrm_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_dtrm_codeValidationFailureMessages():Array
    {
        if (model_internal::_order_dtrm_codeValidationFailureMessages == null)
            model_internal::calculateOrder_dtrm_codeIsValid();

        return _order_dtrm_codeValidationFailureMessages;
    }

    model_internal function set order_dtrm_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_dtrm_codeValidationFailureMessages;

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
            model_internal::_order_dtrm_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_dtrm_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_ship_to_numStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_ship_to_numValidator() : StyleValidator
    {
        return model_internal::_order_ship_to_numValidator;
    }

    model_internal function set _order_ship_to_numIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_ship_to_numIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_ship_to_numIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_ship_to_numIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_ship_to_numIsValid():Boolean
    {
        if (!model_internal::_order_ship_to_numIsValidCacheInitialized)
        {
            model_internal::calculateOrder_ship_to_numIsValid();
        }

        return model_internal::_order_ship_to_numIsValid;
    }

    model_internal function calculateOrder_ship_to_numIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_ship_to_numValidator.validate(model_internal::_instance.order_ship_to_num)
        model_internal::_order_ship_to_numIsValid_der = (valRes.results == null);
        model_internal::_order_ship_to_numIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_ship_to_numValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_ship_to_numValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_ship_to_numValidationFailureMessages():Array
    {
        if (model_internal::_order_ship_to_numValidationFailureMessages == null)
            model_internal::calculateOrder_ship_to_numIsValid();

        return _order_ship_to_numValidationFailureMessages;
    }

    model_internal function set order_ship_to_numValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_ship_to_numValidationFailureMessages;

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
            model_internal::_order_ship_to_numValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_ship_to_numValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_psnl_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_psnl_nameValidator() : StyleValidator
    {
        return model_internal::_order_psnl_nameValidator;
    }

    model_internal function set _order_psnl_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_psnl_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_psnl_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_psnl_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_psnl_nameIsValid():Boolean
    {
        if (!model_internal::_order_psnl_nameIsValidCacheInitialized)
        {
            model_internal::calculateOrder_psnl_nameIsValid();
        }

        return model_internal::_order_psnl_nameIsValid;
    }

    model_internal function calculateOrder_psnl_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_psnl_nameValidator.validate(model_internal::_instance.order_psnl_name)
        model_internal::_order_psnl_nameIsValid_der = (valRes.results == null);
        model_internal::_order_psnl_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_psnl_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_psnl_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_psnl_nameValidationFailureMessages():Array
    {
        if (model_internal::_order_psnl_nameValidationFailureMessages == null)
            model_internal::calculateOrder_psnl_nameIsValid();

        return _order_psnl_nameValidationFailureMessages;
    }

    model_internal function set order_psnl_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_psnl_nameValidationFailureMessages;

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
            model_internal::_order_psnl_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_psnl_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_sold_to_numStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_sold_to_numValidator() : StyleValidator
    {
        return model_internal::_order_sold_to_numValidator;
    }

    model_internal function set _order_sold_to_numIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_sold_to_numIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_sold_to_numIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_sold_to_numIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_sold_to_numIsValid():Boolean
    {
        if (!model_internal::_order_sold_to_numIsValidCacheInitialized)
        {
            model_internal::calculateOrder_sold_to_numIsValid();
        }

        return model_internal::_order_sold_to_numIsValid;
    }

    model_internal function calculateOrder_sold_to_numIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_sold_to_numValidator.validate(model_internal::_instance.order_sold_to_num)
        model_internal::_order_sold_to_numIsValid_der = (valRes.results == null);
        model_internal::_order_sold_to_numIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_sold_to_numValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_sold_to_numValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_sold_to_numValidationFailureMessages():Array
    {
        if (model_internal::_order_sold_to_numValidationFailureMessages == null)
            model_internal::calculateOrder_sold_to_numIsValid();

        return _order_sold_to_numValidationFailureMessages;
    }

    model_internal function set order_sold_to_numValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_sold_to_numValidationFailureMessages;

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
            model_internal::_order_sold_to_numValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_sold_to_numValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_strm_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_strm_codeValidator() : StyleValidator
    {
        return model_internal::_order_strm_codeValidator;
    }

    model_internal function set _order_strm_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_strm_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_strm_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_strm_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_strm_codeIsValid():Boolean
    {
        if (!model_internal::_order_strm_codeIsValidCacheInitialized)
        {
            model_internal::calculateOrder_strm_codeIsValid();
        }

        return model_internal::_order_strm_codeIsValid;
    }

    model_internal function calculateOrder_strm_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_strm_codeValidator.validate(model_internal::_instance.order_strm_code)
        model_internal::_order_strm_codeIsValid_der = (valRes.results == null);
        model_internal::_order_strm_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_strm_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_strm_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_strm_codeValidationFailureMessages():Array
    {
        if (model_internal::_order_strm_codeValidationFailureMessages == null)
            model_internal::calculateOrder_strm_codeIsValid();

        return _order_strm_codeValidationFailureMessages;
    }

    model_internal function set order_strm_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_strm_codeValidationFailureMessages;

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
            model_internal::_order_strm_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_strm_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_carr_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_carr_codeValidator() : StyleValidator
    {
        return model_internal::_order_carr_codeValidator;
    }

    model_internal function set _order_carr_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_carr_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_carr_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_carr_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_carr_codeIsValid():Boolean
    {
        if (!model_internal::_order_carr_codeIsValidCacheInitialized)
        {
            model_internal::calculateOrder_carr_codeIsValid();
        }

        return model_internal::_order_carr_codeIsValid;
    }

    model_internal function calculateOrder_carr_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_carr_codeValidator.validate(model_internal::_instance.order_carr_code)
        model_internal::_order_carr_codeIsValid_der = (valRes.results == null);
        model_internal::_order_carr_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_carr_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_carr_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_carr_codeValidationFailureMessages():Array
    {
        if (model_internal::_order_carr_codeValidationFailureMessages == null)
            model_internal::calculateOrder_carr_codeIsValid();

        return _order_carr_codeValidationFailureMessages;
    }

    model_internal function set order_carr_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_carr_codeValidationFailureMessages;

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
            model_internal::_order_carr_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_carr_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_styp_idStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_styp_idValidator() : StyleValidator
    {
        return model_internal::_order_styp_idValidator;
    }

    model_internal function set _order_styp_idIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_styp_idIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_styp_idIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_styp_idIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_styp_idIsValid():Boolean
    {
        if (!model_internal::_order_styp_idIsValidCacheInitialized)
        {
            model_internal::calculateOrder_styp_idIsValid();
        }

        return model_internal::_order_styp_idIsValid;
    }

    model_internal function calculateOrder_styp_idIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_styp_idValidator.validate(model_internal::_instance.order_styp_id)
        model_internal::_order_styp_idIsValid_der = (valRes.results == null);
        model_internal::_order_styp_idIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_styp_idValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_styp_idValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_styp_idValidationFailureMessages():Array
    {
        if (model_internal::_order_styp_idValidationFailureMessages == null)
            model_internal::calculateOrder_styp_idIsValid();

        return _order_styp_idValidationFailureMessages;
    }

    model_internal function set order_styp_idValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_styp_idValidationFailureMessages;

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
            model_internal::_order_styp_idValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_styp_idValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_dlv_timeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_dlv_timeValidator() : StyleValidator
    {
        return model_internal::_order_dlv_timeValidator;
    }

    model_internal function set _order_dlv_timeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_dlv_timeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_dlv_timeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_dlv_timeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_dlv_timeIsValid():Boolean
    {
        if (!model_internal::_order_dlv_timeIsValidCacheInitialized)
        {
            model_internal::calculateOrder_dlv_timeIsValid();
        }

        return model_internal::_order_dlv_timeIsValid;
    }

    model_internal function calculateOrder_dlv_timeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_dlv_timeValidator.validate(model_internal::_instance.order_dlv_time)
        model_internal::_order_dlv_timeIsValid_der = (valRes.results == null);
        model_internal::_order_dlv_timeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_dlv_timeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_dlv_timeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_dlv_timeValidationFailureMessages():Array
    {
        if (model_internal::_order_dlv_timeValidationFailureMessages == null)
            model_internal::calculateOrder_dlv_timeIsValid();

        return _order_dlv_timeValidationFailureMessages;
    }

    model_internal function set order_dlv_timeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_dlv_timeValidationFailureMessages;

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
            model_internal::_order_dlv_timeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_dlv_timeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_drwr_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_drwr_codeValidator() : StyleValidator
    {
        return model_internal::_order_drwr_codeValidator;
    }

    model_internal function set _order_drwr_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_drwr_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_drwr_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_drwr_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_drwr_codeIsValid():Boolean
    {
        if (!model_internal::_order_drwr_codeIsValidCacheInitialized)
        {
            model_internal::calculateOrder_drwr_codeIsValid();
        }

        return model_internal::_order_drwr_codeIsValid;
    }

    model_internal function calculateOrder_drwr_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_drwr_codeValidator.validate(model_internal::_instance.order_drwr_code)
        model_internal::_order_drwr_codeIsValid_der = (valRes.results == null);
        model_internal::_order_drwr_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_drwr_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_drwr_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_drwr_codeValidationFailureMessages():Array
    {
        if (model_internal::_order_drwr_codeValidationFailureMessages == null)
            model_internal::calculateOrder_drwr_codeIsValid();

        return _order_drwr_codeValidationFailureMessages;
    }

    model_internal function set order_drwr_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_drwr_codeValidationFailureMessages;

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
            model_internal::_order_drwr_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_drwr_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_sys_noStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_sys_noValidator() : StyleValidator
    {
        return model_internal::_order_sys_noValidator;
    }

    model_internal function set _order_sys_noIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_sys_noIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_sys_noIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_sys_noIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_sys_noIsValid():Boolean
    {
        if (!model_internal::_order_sys_noIsValidCacheInitialized)
        {
            model_internal::calculateOrder_sys_noIsValid();
        }

        return model_internal::_order_sys_noIsValid;
    }

    model_internal function calculateOrder_sys_noIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_sys_noValidator.validate(model_internal::_instance.order_sys_no)
        model_internal::_order_sys_noIsValid_der = (valRes.results == null);
        model_internal::_order_sys_noIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_sys_noValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_sys_noValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_sys_noValidationFailureMessages():Array
    {
        if (model_internal::_order_sys_noValidationFailureMessages == null)
            model_internal::calculateOrder_sys_noIsValid();

        return _order_sys_noValidationFailureMessages;
    }

    model_internal function set order_sys_noValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_sys_noValidationFailureMessages;

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
            model_internal::_order_sys_noValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_sys_noValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_exp_timeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_exp_timeValidator() : StyleValidator
    {
        return model_internal::_order_exp_timeValidator;
    }

    model_internal function set _order_exp_timeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_exp_timeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_exp_timeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_exp_timeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_exp_timeIsValid():Boolean
    {
        if (!model_internal::_order_exp_timeIsValidCacheInitialized)
        {
            model_internal::calculateOrder_exp_timeIsValid();
        }

        return model_internal::_order_exp_timeIsValid;
    }

    model_internal function calculateOrder_exp_timeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_exp_timeValidator.validate(model_internal::_instance.order_exp_time)
        model_internal::_order_exp_timeIsValid_der = (valRes.results == null);
        model_internal::_order_exp_timeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_exp_timeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_exp_timeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_exp_timeValidationFailureMessages():Array
    {
        if (model_internal::_order_exp_timeValidationFailureMessages == null)
            model_internal::calculateOrder_exp_timeIsValid();

        return _order_exp_timeValidationFailureMessages;
    }

    model_internal function set order_exp_timeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_exp_timeValidationFailureMessages;

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
            model_internal::_order_exp_timeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_exp_timeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_itemsStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_itemsValidator() : StyleValidator
    {
        return model_internal::_order_itemsValidator;
    }

    model_internal function set _order_itemsIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_itemsIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_itemsIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_itemsIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_itemsIsValid():Boolean
    {
        if (!model_internal::_order_itemsIsValidCacheInitialized)
        {
            model_internal::calculateOrder_itemsIsValid();
        }

        return model_internal::_order_itemsIsValid;
    }

    model_internal function calculateOrder_itemsIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_itemsValidator.validate(model_internal::_instance.order_items)
        model_internal::_order_itemsIsValid_der = (valRes.results == null);
        model_internal::_order_itemsIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_itemsValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_itemsValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_itemsValidationFailureMessages():Array
    {
        if (model_internal::_order_itemsValidationFailureMessages == null)
            model_internal::calculateOrder_itemsIsValid();

        return _order_itemsValidationFailureMessages;
    }

    model_internal function set order_itemsValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_itemsValidationFailureMessages;

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
            model_internal::_order_itemsValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_itemsValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_last_changeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_last_changeValidator() : StyleValidator
    {
        return model_internal::_order_last_changeValidator;
    }

    model_internal function set _order_last_changeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_last_changeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_last_changeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_last_changeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_last_changeIsValid():Boolean
    {
        if (!model_internal::_order_last_changeIsValidCacheInitialized)
        {
            model_internal::calculateOrder_last_changeIsValid();
        }

        return model_internal::_order_last_changeIsValid;
    }

    model_internal function calculateOrder_last_changeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_last_changeValidator.validate(model_internal::_instance.order_last_change)
        model_internal::_order_last_changeIsValid_der = (valRes.results == null);
        model_internal::_order_last_changeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_last_changeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_last_changeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_last_changeValidationFailureMessages():Array
    {
        if (model_internal::_order_last_changeValidationFailureMessages == null)
            model_internal::calculateOrder_last_changeIsValid();

        return _order_last_changeValidationFailureMessages;
    }

    model_internal function set order_last_changeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_last_changeValidationFailureMessages;

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
            model_internal::_order_last_changeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_last_changeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_src_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_src_nameValidator() : StyleValidator
    {
        return model_internal::_order_src_nameValidator;
    }

    model_internal function set _order_src_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_src_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_src_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_src_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_src_nameIsValid():Boolean
    {
        if (!model_internal::_order_src_nameIsValidCacheInitialized)
        {
            model_internal::calculateOrder_src_nameIsValid();
        }

        return model_internal::_order_src_nameIsValid;
    }

    model_internal function calculateOrder_src_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_src_nameValidator.validate(model_internal::_instance.order_src_name)
        model_internal::_order_src_nameIsValid_der = (valRes.results == null);
        model_internal::_order_src_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_src_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_src_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_src_nameValidationFailureMessages():Array
    {
        if (model_internal::_order_src_nameValidationFailureMessages == null)
            model_internal::calculateOrder_src_nameIsValid();

        return _order_src_nameValidationFailureMessages;
    }

    model_internal function set order_src_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_src_nameValidationFailureMessages;

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
            model_internal::_order_src_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_src_nameValidationFailureMessages", oldValue, value));
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
    public function get order_app_timeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_app_timeValidator() : StyleValidator
    {
        return model_internal::_order_app_timeValidator;
    }

    model_internal function set _order_app_timeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_app_timeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_app_timeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_app_timeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_app_timeIsValid():Boolean
    {
        if (!model_internal::_order_app_timeIsValidCacheInitialized)
        {
            model_internal::calculateOrder_app_timeIsValid();
        }

        return model_internal::_order_app_timeIsValid;
    }

    model_internal function calculateOrder_app_timeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_app_timeValidator.validate(model_internal::_instance.order_app_time)
        model_internal::_order_app_timeIsValid_der = (valRes.results == null);
        model_internal::_order_app_timeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_app_timeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_app_timeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_app_timeValidationFailureMessages():Array
    {
        if (model_internal::_order_app_timeValidationFailureMessages == null)
            model_internal::calculateOrder_app_timeIsValid();

        return _order_app_timeValidationFailureMessages;
    }

    model_internal function set order_app_timeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_app_timeValidationFailureMessages;

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
            model_internal::_order_app_timeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_app_timeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_totalStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_totalValidator() : StyleValidator
    {
        return model_internal::_order_totalValidator;
    }

    model_internal function set _order_totalIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_totalIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_totalIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_totalIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_totalIsValid():Boolean
    {
        if (!model_internal::_order_totalIsValidCacheInitialized)
        {
            model_internal::calculateOrder_totalIsValid();
        }

        return model_internal::_order_totalIsValid;
    }

    model_internal function calculateOrder_totalIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_totalValidator.validate(model_internal::_instance.order_total)
        model_internal::_order_totalIsValid_der = (valRes.results == null);
        model_internal::_order_totalIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_totalValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_totalValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_totalValidationFailureMessages():Array
    {
        if (model_internal::_order_totalValidationFailureMessages == null)
            model_internal::calculateOrder_totalIsValid();

        return _order_totalValidationFailureMessages;
    }

    model_internal function set order_totalValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_totalValidationFailureMessages;

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
            model_internal::_order_totalValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_totalValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_cust_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_cust_codeValidator() : StyleValidator
    {
        return model_internal::_order_cust_codeValidator;
    }

    model_internal function set _order_cust_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_cust_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_cust_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_cust_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_cust_codeIsValid():Boolean
    {
        if (!model_internal::_order_cust_codeIsValidCacheInitialized)
        {
            model_internal::calculateOrder_cust_codeIsValid();
        }

        return model_internal::_order_cust_codeIsValid;
    }

    model_internal function calculateOrder_cust_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_cust_codeValidator.validate(model_internal::_instance.order_cust_code)
        model_internal::_order_cust_codeIsValid_der = (valRes.results == null);
        model_internal::_order_cust_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_cust_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_cust_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_cust_codeValidationFailureMessages():Array
    {
        if (model_internal::_order_cust_codeValidationFailureMessages == null)
            model_internal::calculateOrder_cust_codeIsValid();

        return _order_cust_codeValidationFailureMessages;
    }

    model_internal function set order_cust_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_cust_codeValidationFailureMessages;

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
            model_internal::_order_cust_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_cust_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_approvedStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_approvedValidator() : StyleValidator
    {
        return model_internal::_order_approvedValidator;
    }

    model_internal function set _order_approvedIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_approvedIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_approvedIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_approvedIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_approvedIsValid():Boolean
    {
        if (!model_internal::_order_approvedIsValidCacheInitialized)
        {
            model_internal::calculateOrder_approvedIsValid();
        }

        return model_internal::_order_approvedIsValid;
    }

    model_internal function calculateOrder_approvedIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_approvedValidator.validate(model_internal::_instance.order_approved)
        model_internal::_order_approvedIsValid_der = (valRes.results == null);
        model_internal::_order_approvedIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_approvedValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_approvedValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_approvedValidationFailureMessages():Array
    {
        if (model_internal::_order_approvedValidationFailureMessages == null)
            model_internal::calculateOrder_approvedIsValid();

        return _order_approvedValidationFailureMessages;
    }

    model_internal function set order_approvedValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_approvedValidationFailureMessages;

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
            model_internal::_order_approvedValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_approvedValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_cust_noStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_cust_noValidator() : StyleValidator
    {
        return model_internal::_order_cust_noValidator;
    }

    model_internal function set _order_cust_noIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_cust_noIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_cust_noIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_cust_noIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_cust_noIsValid():Boolean
    {
        if (!model_internal::_order_cust_noIsValidCacheInitialized)
        {
            model_internal::calculateOrder_cust_noIsValid();
        }

        return model_internal::_order_cust_noIsValid;
    }

    model_internal function calculateOrder_cust_noIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_cust_noValidator.validate(model_internal::_instance.order_cust_no)
        model_internal::_order_cust_noIsValid_der = (valRes.results == null);
        model_internal::_order_cust_noIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_cust_noValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_cust_noValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_cust_noValidationFailureMessages():Array
    {
        if (model_internal::_order_cust_noValidationFailureMessages == null)
            model_internal::calculateOrder_cust_noIsValid();

        return _order_cust_noValidationFailureMessages;
    }

    model_internal function set order_cust_noValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_cust_noValidationFailureMessages;

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
            model_internal::_order_cust_noValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_cust_noValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_carr_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_carr_nameValidator() : StyleValidator
    {
        return model_internal::_order_carr_nameValidator;
    }

    model_internal function set _order_carr_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_carr_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_carr_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_carr_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_carr_nameIsValid():Boolean
    {
        if (!model_internal::_order_carr_nameIsValidCacheInitialized)
        {
            model_internal::calculateOrder_carr_nameIsValid();
        }

        return model_internal::_order_carr_nameIsValid;
    }

    model_internal function calculateOrder_carr_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_carr_nameValidator.validate(model_internal::_instance.order_carr_name)
        model_internal::_order_carr_nameIsValid_der = (valRes.results == null);
        model_internal::_order_carr_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_carr_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_carr_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_carr_nameValidationFailureMessages():Array
    {
        if (model_internal::_order_carr_nameValidationFailureMessages == null)
            model_internal::calculateOrder_carr_nameIsValid();

        return _order_carr_nameValidationFailureMessages;
    }

    model_internal function set order_carr_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_carr_nameValidationFailureMessages;

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
            model_internal::_order_carr_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_carr_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_stat_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_stat_nameValidator() : StyleValidator
    {
        return model_internal::_order_stat_nameValidator;
    }

    model_internal function set _order_stat_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_stat_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_stat_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_stat_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_stat_nameIsValid():Boolean
    {
        if (!model_internal::_order_stat_nameIsValidCacheInitialized)
        {
            model_internal::calculateOrder_stat_nameIsValid();
        }

        return model_internal::_order_stat_nameIsValid;
    }

    model_internal function calculateOrder_stat_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_stat_nameValidator.validate(model_internal::_instance.order_stat_name)
        model_internal::_order_stat_nameIsValid_der = (valRes.results == null);
        model_internal::_order_stat_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_stat_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_stat_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_stat_nameValidationFailureMessages():Array
    {
        if (model_internal::_order_stat_nameValidationFailureMessages == null)
            model_internal::calculateOrder_stat_nameIsValid();

        return _order_stat_nameValidationFailureMessages;
    }

    model_internal function set order_stat_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_stat_nameValidationFailureMessages;

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
            model_internal::_order_stat_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_stat_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_dtrm_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_dtrm_nameValidator() : StyleValidator
    {
        return model_internal::_order_dtrm_nameValidator;
    }

    model_internal function set _order_dtrm_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_dtrm_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_dtrm_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_dtrm_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_dtrm_nameIsValid():Boolean
    {
        if (!model_internal::_order_dtrm_nameIsValidCacheInitialized)
        {
            model_internal::calculateOrder_dtrm_nameIsValid();
        }

        return model_internal::_order_dtrm_nameIsValid;
    }

    model_internal function calculateOrder_dtrm_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_dtrm_nameValidator.validate(model_internal::_instance.order_dtrm_name)
        model_internal::_order_dtrm_nameIsValid_der = (valRes.results == null);
        model_internal::_order_dtrm_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_dtrm_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_dtrm_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_dtrm_nameValidationFailureMessages():Array
    {
        if (model_internal::_order_dtrm_nameValidationFailureMessages == null)
            model_internal::calculateOrder_dtrm_nameIsValid();

        return _order_dtrm_nameValidationFailureMessages;
    }

    model_internal function set order_dtrm_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_dtrm_nameValidationFailureMessages;

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
            model_internal::_order_dtrm_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_dtrm_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_styp_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_styp_nameValidator() : StyleValidator
    {
        return model_internal::_order_styp_nameValidator;
    }

    model_internal function set _order_styp_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_styp_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_styp_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_styp_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_styp_nameIsValid():Boolean
    {
        if (!model_internal::_order_styp_nameIsValidCacheInitialized)
        {
            model_internal::calculateOrder_styp_nameIsValid();
        }

        return model_internal::_order_styp_nameIsValid;
    }

    model_internal function calculateOrder_styp_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_styp_nameValidator.validate(model_internal::_instance.order_styp_name)
        model_internal::_order_styp_nameIsValid_der = (valRes.results == null);
        model_internal::_order_styp_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_styp_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_styp_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_styp_nameValidationFailureMessages():Array
    {
        if (model_internal::_order_styp_nameValidationFailureMessages == null)
            model_internal::calculateOrder_styp_nameIsValid();

        return _order_styp_nameValidationFailureMessages;
    }

    model_internal function set order_styp_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_styp_nameValidationFailureMessages;

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
            model_internal::_order_styp_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_styp_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_ttyp_idStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_ttyp_idValidator() : StyleValidator
    {
        return model_internal::_order_ttyp_idValidator;
    }

    model_internal function set _order_ttyp_idIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_ttyp_idIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_ttyp_idIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_ttyp_idIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_ttyp_idIsValid():Boolean
    {
        if (!model_internal::_order_ttyp_idIsValidCacheInitialized)
        {
            model_internal::calculateOrder_ttyp_idIsValid();
        }

        return model_internal::_order_ttyp_idIsValid;
    }

    model_internal function calculateOrder_ttyp_idIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_ttyp_idValidator.validate(model_internal::_instance.order_ttyp_id)
        model_internal::_order_ttyp_idIsValid_der = (valRes.results == null);
        model_internal::_order_ttyp_idIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_ttyp_idValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_ttyp_idValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_ttyp_idValidationFailureMessages():Array
    {
        if (model_internal::_order_ttyp_idValidationFailureMessages == null)
            model_internal::calculateOrder_ttyp_idIsValid();

        return _order_ttyp_idValidationFailureMessages;
    }

    model_internal function set order_ttyp_idValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_ttyp_idValidationFailureMessages;

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
            model_internal::_order_ttyp_idValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_ttyp_idValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_supp_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_supp_nameValidator() : StyleValidator
    {
        return model_internal::_order_supp_nameValidator;
    }

    model_internal function set _order_supp_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_supp_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_supp_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_supp_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_supp_nameIsValid():Boolean
    {
        if (!model_internal::_order_supp_nameIsValidCacheInitialized)
        {
            model_internal::calculateOrder_supp_nameIsValid();
        }

        return model_internal::_order_supp_nameIsValid;
    }

    model_internal function calculateOrder_supp_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_supp_nameValidator.validate(model_internal::_instance.order_supp_name)
        model_internal::_order_supp_nameIsValid_der = (valRes.results == null);
        model_internal::_order_supp_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_supp_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_supp_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_supp_nameValidationFailureMessages():Array
    {
        if (model_internal::_order_supp_nameValidationFailureMessages == null)
            model_internal::calculateOrder_supp_nameIsValid();

        return _order_supp_nameValidationFailureMessages;
    }

    model_internal function set order_supp_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_supp_nameValidationFailureMessages;

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
            model_internal::_order_supp_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_supp_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_supp_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_supp_codeValidator() : StyleValidator
    {
        return model_internal::_order_supp_codeValidator;
    }

    model_internal function set _order_supp_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_supp_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_supp_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_supp_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_supp_codeIsValid():Boolean
    {
        if (!model_internal::_order_supp_codeIsValidCacheInitialized)
        {
            model_internal::calculateOrder_supp_codeIsValid();
        }

        return model_internal::_order_supp_codeIsValid;
    }

    model_internal function calculateOrder_supp_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_supp_codeValidator.validate(model_internal::_instance.order_supp_code)
        model_internal::_order_supp_codeIsValid_der = (valRes.results == null);
        model_internal::_order_supp_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_supp_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_supp_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_supp_codeValidationFailureMessages():Array
    {
        if (model_internal::_order_supp_codeValidationFailureMessages == null)
            model_internal::calculateOrder_supp_codeIsValid();

        return _order_supp_codeValidationFailureMessages;
    }

    model_internal function set order_supp_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_supp_codeValidationFailureMessages;

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
            model_internal::_order_supp_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_supp_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_pay_noteStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_pay_noteValidator() : StyleValidator
    {
        return model_internal::_order_pay_noteValidator;
    }

    model_internal function set _order_pay_noteIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_pay_noteIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_pay_noteIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_pay_noteIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_pay_noteIsValid():Boolean
    {
        if (!model_internal::_order_pay_noteIsValidCacheInitialized)
        {
            model_internal::calculateOrder_pay_noteIsValid();
        }

        return model_internal::_order_pay_noteIsValid;
    }

    model_internal function calculateOrder_pay_noteIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_pay_noteValidator.validate(model_internal::_instance.order_pay_note)
        model_internal::_order_pay_noteIsValid_der = (valRes.results == null);
        model_internal::_order_pay_noteIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_pay_noteValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_pay_noteValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_pay_noteValidationFailureMessages():Array
    {
        if (model_internal::_order_pay_noteValidationFailureMessages == null)
            model_internal::calculateOrder_pay_noteIsValid();

        return _order_pay_noteValidationFailureMessages;
    }

    model_internal function set order_pay_noteValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_pay_noteValidationFailureMessages;

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
            model_internal::_order_pay_noteValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_pay_noteValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_price_printedStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_price_printedValidator() : StyleValidator
    {
        return model_internal::_order_price_printedValidator;
    }

    model_internal function set _order_price_printedIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_price_printedIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_price_printedIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_price_printedIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_price_printedIsValid():Boolean
    {
        if (!model_internal::_order_price_printedIsValidCacheInitialized)
        {
            model_internal::calculateOrder_price_printedIsValid();
        }

        return model_internal::_order_price_printedIsValid;
    }

    model_internal function calculateOrder_price_printedIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_price_printedValidator.validate(model_internal::_instance.order_price_printed)
        model_internal::_order_price_printedIsValid_der = (valRes.results == null);
        model_internal::_order_price_printedIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_price_printedValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_price_printedValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_price_printedValidationFailureMessages():Array
    {
        if (model_internal::_order_price_printedValidationFailureMessages == null)
            model_internal::calculateOrder_price_printedIsValid();

        return _order_price_printedValidationFailureMessages;
    }

    model_internal function set order_price_printedValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_price_printedValidationFailureMessages;

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
            model_internal::_order_price_printedValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_price_printedValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_dloc_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_dloc_nameValidator() : StyleValidator
    {
        return model_internal::_order_dloc_nameValidator;
    }

    model_internal function set _order_dloc_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_dloc_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_dloc_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_dloc_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_dloc_nameIsValid():Boolean
    {
        if (!model_internal::_order_dloc_nameIsValidCacheInitialized)
        {
            model_internal::calculateOrder_dloc_nameIsValid();
        }

        return model_internal::_order_dloc_nameIsValid;
    }

    model_internal function calculateOrder_dloc_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_dloc_nameValidator.validate(model_internal::_instance.order_dloc_name)
        model_internal::_order_dloc_nameIsValid_der = (valRes.results == null);
        model_internal::_order_dloc_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_dloc_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_dloc_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_dloc_nameValidationFailureMessages():Array
    {
        if (model_internal::_order_dloc_nameValidationFailureMessages == null)
            model_internal::calculateOrder_dloc_nameIsValid();

        return _order_dloc_nameValidationFailureMessages;
    }

    model_internal function set order_dloc_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_dloc_nameValidationFailureMessages;

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
            model_internal::_order_dloc_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_dloc_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_src_idStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_src_idValidator() : StyleValidator
    {
        return model_internal::_order_src_idValidator;
    }

    model_internal function set _order_src_idIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_src_idIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_src_idIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_src_idIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_src_idIsValid():Boolean
    {
        if (!model_internal::_order_src_idIsValidCacheInitialized)
        {
            model_internal::calculateOrder_src_idIsValid();
        }

        return model_internal::_order_src_idIsValid;
    }

    model_internal function calculateOrder_src_idIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_src_idValidator.validate(model_internal::_instance.order_src_id)
        model_internal::_order_src_idIsValid_der = (valRes.results == null);
        model_internal::_order_src_idIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_src_idValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_src_idValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_src_idValidationFailureMessages():Array
    {
        if (model_internal::_order_src_idValidationFailureMessages == null)
            model_internal::calculateOrder_src_idIsValid();

        return _order_src_idValidationFailureMessages;
    }

    model_internal function set order_src_idValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_src_idValidationFailureMessages;

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
            model_internal::_order_src_idValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_src_idValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_limitStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_limitValidator() : StyleValidator
    {
        return model_internal::_order_limitValidator;
    }

    model_internal function set _order_limitIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_limitIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_limitIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_limitIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_limitIsValid():Boolean
    {
        if (!model_internal::_order_limitIsValidCacheInitialized)
        {
            model_internal::calculateOrder_limitIsValid();
        }

        return model_internal::_order_limitIsValid;
    }

    model_internal function calculateOrder_limitIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_limitValidator.validate(model_internal::_instance.order_limit)
        model_internal::_order_limitIsValid_der = (valRes.results == null);
        model_internal::_order_limitIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_limitValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_limitValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_limitValidationFailureMessages():Array
    {
        if (model_internal::_order_limitValidationFailureMessages == null)
            model_internal::calculateOrder_limitIsValid();

        return _order_limitValidationFailureMessages;
    }

    model_internal function set order_limitValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_limitValidationFailureMessages;

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
            model_internal::_order_limitValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_limitValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_strm_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_strm_nameValidator() : StyleValidator
    {
        return model_internal::_order_strm_nameValidator;
    }

    model_internal function set _order_strm_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_strm_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_strm_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_strm_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_strm_nameIsValid():Boolean
    {
        if (!model_internal::_order_strm_nameIsValidCacheInitialized)
        {
            model_internal::calculateOrder_strm_nameIsValid();
        }

        return model_internal::_order_strm_nameIsValid;
    }

    model_internal function calculateOrder_strm_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_strm_nameValidator.validate(model_internal::_instance.order_strm_name)
        model_internal::_order_strm_nameIsValid_der = (valRes.results == null);
        model_internal::_order_strm_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_strm_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_strm_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_strm_nameValidationFailureMessages():Array
    {
        if (model_internal::_order_strm_nameValidationFailureMessages == null)
            model_internal::calculateOrder_strm_nameIsValid();

        return _order_strm_nameValidationFailureMessages;
    }

    model_internal function set order_strm_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_strm_nameValidationFailureMessages;

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
            model_internal::_order_strm_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_strm_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_stat_idStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_stat_idValidator() : StyleValidator
    {
        return model_internal::_order_stat_idValidator;
    }

    model_internal function set _order_stat_idIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_stat_idIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_stat_idIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_stat_idIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_stat_idIsValid():Boolean
    {
        if (!model_internal::_order_stat_idIsValidCacheInitialized)
        {
            model_internal::calculateOrder_stat_idIsValid();
        }

        return model_internal::_order_stat_idIsValid;
    }

    model_internal function calculateOrder_stat_idIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_stat_idValidator.validate(model_internal::_instance.order_stat_id)
        model_internal::_order_stat_idIsValid_der = (valRes.results == null);
        model_internal::_order_stat_idIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_stat_idValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_stat_idValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_stat_idValidationFailureMessages():Array
    {
        if (model_internal::_order_stat_idValidationFailureMessages == null)
            model_internal::calculateOrder_stat_idIsValid();

        return _order_stat_idValidationFailureMessages;
    }

    model_internal function set order_stat_idValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_stat_idValidationFailureMessages;

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
            model_internal::_order_stat_idValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_stat_idValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_ord_timeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_ord_timeValidator() : StyleValidator
    {
        return model_internal::_order_ord_timeValidator;
    }

    model_internal function set _order_ord_timeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_ord_timeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_ord_timeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_ord_timeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_ord_timeIsValid():Boolean
    {
        if (!model_internal::_order_ord_timeIsValidCacheInitialized)
        {
            model_internal::calculateOrder_ord_timeIsValid();
        }

        return model_internal::_order_ord_timeIsValid;
    }

    model_internal function calculateOrder_ord_timeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_ord_timeValidator.validate(model_internal::_instance.order_ord_time)
        model_internal::_order_ord_timeIsValid_der = (valRes.results == null);
        model_internal::_order_ord_timeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_ord_timeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_ord_timeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_ord_timeValidationFailureMessages():Array
    {
        if (model_internal::_order_ord_timeValidationFailureMessages == null)
            model_internal::calculateOrder_ord_timeIsValid();

        return _order_ord_timeValidationFailureMessages;
    }

    model_internal function set order_ord_timeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_ord_timeValidationFailureMessages;

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
            model_internal::_order_ord_timeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_ord_timeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_trsf_typeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_trsf_typeValidator() : StyleValidator
    {
        return model_internal::_order_trsf_typeValidator;
    }

    model_internal function set _order_trsf_typeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_trsf_typeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_trsf_typeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_trsf_typeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_trsf_typeIsValid():Boolean
    {
        if (!model_internal::_order_trsf_typeIsValidCacheInitialized)
        {
            model_internal::calculateOrder_trsf_typeIsValid();
        }

        return model_internal::_order_trsf_typeIsValid;
    }

    model_internal function calculateOrder_trsf_typeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_trsf_typeValidator.validate(model_internal::_instance.order_trsf_type)
        model_internal::_order_trsf_typeIsValid_der = (valRes.results == null);
        model_internal::_order_trsf_typeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_trsf_typeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_trsf_typeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_trsf_typeValidationFailureMessages():Array
    {
        if (model_internal::_order_trsf_typeValidationFailureMessages == null)
            model_internal::calculateOrder_trsf_typeIsValid();

        return _order_trsf_typeValidationFailureMessages;
    }

    model_internal function set order_trsf_typeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_trsf_typeValidationFailureMessages;

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
            model_internal::_order_trsf_typeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_trsf_typeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_cust_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_cust_nameValidator() : StyleValidator
    {
        return model_internal::_order_cust_nameValidator;
    }

    model_internal function set _order_cust_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_cust_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_cust_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_cust_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_cust_nameIsValid():Boolean
    {
        if (!model_internal::_order_cust_nameIsValidCacheInitialized)
        {
            model_internal::calculateOrder_cust_nameIsValid();
        }

        return model_internal::_order_cust_nameIsValid;
    }

    model_internal function calculateOrder_cust_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_cust_nameValidator.validate(model_internal::_instance.order_cust_name)
        model_internal::_order_cust_nameIsValid_der = (valRes.results == null);
        model_internal::_order_cust_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_cust_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_cust_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_cust_nameValidationFailureMessages():Array
    {
        if (model_internal::_order_cust_nameValidationFailureMessages == null)
            model_internal::calculateOrder_cust_nameIsValid();

        return _order_cust_nameValidationFailureMessages;
    }

    model_internal function set order_cust_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_cust_nameValidationFailureMessages;

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
            model_internal::_order_cust_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_cust_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_dloc_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_dloc_codeValidator() : StyleValidator
    {
        return model_internal::_order_dloc_codeValidator;
    }

    model_internal function set _order_dloc_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_dloc_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_dloc_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_dloc_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_dloc_codeIsValid():Boolean
    {
        if (!model_internal::_order_dloc_codeIsValidCacheInitialized)
        {
            model_internal::calculateOrder_dloc_codeIsValid();
        }

        return model_internal::_order_dloc_codeIsValid;
    }

    model_internal function calculateOrder_dloc_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_dloc_codeValidator.validate(model_internal::_instance.order_dloc_code)
        model_internal::_order_dloc_codeIsValid_der = (valRes.results == null);
        model_internal::_order_dloc_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_dloc_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_dloc_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_dloc_codeValidationFailureMessages():Array
    {
        if (model_internal::_order_dloc_codeValidationFailureMessages == null)
            model_internal::calculateOrder_dloc_codeIsValid();

        return _order_dloc_codeValidationFailureMessages;
    }

    model_internal function set order_dloc_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_dloc_codeValidationFailureMessages;

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
            model_internal::_order_dloc_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_dloc_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_drwr_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_drwr_nameValidator() : StyleValidator
    {
        return model_internal::_order_drwr_nameValidator;
    }

    model_internal function set _order_drwr_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_drwr_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_drwr_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_drwr_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_drwr_nameIsValid():Boolean
    {
        if (!model_internal::_order_drwr_nameIsValidCacheInitialized)
        {
            model_internal::calculateOrder_drwr_nameIsValid();
        }

        return model_internal::_order_drwr_nameIsValid;
    }

    model_internal function calculateOrder_drwr_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_drwr_nameValidator.validate(model_internal::_instance.order_drwr_name)
        model_internal::_order_drwr_nameIsValid_der = (valRes.results == null);
        model_internal::_order_drwr_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_drwr_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_drwr_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_drwr_nameValidationFailureMessages():Array
    {
        if (model_internal::_order_drwr_nameValidationFailureMessages == null)
            model_internal::calculateOrder_drwr_nameIsValid();

        return _order_drwr_nameValidationFailureMessages;
    }

    model_internal function set order_drwr_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_drwr_nameValidationFailureMessages;

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
            model_internal::_order_drwr_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_drwr_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_schedulesStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_schedulesValidator() : StyleValidator
    {
        return model_internal::_order_schedulesValidator;
    }

    model_internal function set _order_schedulesIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_schedulesIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_schedulesIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_schedulesIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_schedulesIsValid():Boolean
    {
        if (!model_internal::_order_schedulesIsValidCacheInitialized)
        {
            model_internal::calculateOrder_schedulesIsValid();
        }

        return model_internal::_order_schedulesIsValid;
    }

    model_internal function calculateOrder_schedulesIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_schedulesValidator.validate(model_internal::_instance.order_schedules)
        model_internal::_order_schedulesIsValid_der = (valRes.results == null);
        model_internal::_order_schedulesIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_schedulesValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_schedulesValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_schedulesValidationFailureMessages():Array
    {
        if (model_internal::_order_schedulesValidationFailureMessages == null)
            model_internal::calculateOrder_schedulesIsValid();

        return _order_schedulesValidationFailureMessages;
    }

    model_internal function set order_schedulesValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_schedulesValidationFailureMessages;

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
            model_internal::_order_schedulesValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_schedulesValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_instructionsStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_instructionsValidator() : StyleValidator
    {
        return model_internal::_order_instructionsValidator;
    }

    model_internal function set _order_instructionsIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_instructionsIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_instructionsIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_instructionsIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_instructionsIsValid():Boolean
    {
        if (!model_internal::_order_instructionsIsValidCacheInitialized)
        {
            model_internal::calculateOrder_instructionsIsValid();
        }

        return model_internal::_order_instructionsIsValid;
    }

    model_internal function calculateOrder_instructionsIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_instructionsValidator.validate(model_internal::_instance.order_instructions)
        model_internal::_order_instructionsIsValid_der = (valRes.results == null);
        model_internal::_order_instructionsIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_instructionsValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_instructionsValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_instructionsValidationFailureMessages():Array
    {
        if (model_internal::_order_instructionsValidationFailureMessages == null)
            model_internal::calculateOrder_instructionsIsValid();

        return _order_instructionsValidationFailureMessages;
    }

    model_internal function set order_instructionsValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_instructionsValidationFailureMessages;

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
            model_internal::_order_instructionsValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_instructionsValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_cust_acntStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_cust_acntValidator() : StyleValidator
    {
        return model_internal::_order_cust_acntValidator;
    }

    model_internal function set _order_cust_acntIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_cust_acntIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_cust_acntIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_cust_acntIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_cust_acntIsValid():Boolean
    {
        if (!model_internal::_order_cust_acntIsValidCacheInitialized)
        {
            model_internal::calculateOrder_cust_acntIsValid();
        }

        return model_internal::_order_cust_acntIsValid;
    }

    model_internal function calculateOrder_cust_acntIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_cust_acntValidator.validate(model_internal::_instance.order_cust_acnt)
        model_internal::_order_cust_acntIsValid_der = (valRes.results == null);
        model_internal::_order_cust_acntIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_cust_acntValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_cust_acntValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_cust_acntValidationFailureMessages():Array
    {
        if (model_internal::_order_cust_acntValidationFailureMessages == null)
            model_internal::calculateOrder_cust_acntIsValid();

        return _order_cust_acntValidationFailureMessages;
    }

    model_internal function set order_cust_acntValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_cust_acntValidationFailureMessages;

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
            model_internal::_order_cust_acntValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_cust_acntValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_inv_noStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_inv_noValidator() : StyleValidator
    {
        return model_internal::_order_inv_noValidator;
    }

    model_internal function set _order_inv_noIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_inv_noIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_inv_noIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_inv_noIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_inv_noIsValid():Boolean
    {
        if (!model_internal::_order_inv_noIsValidCacheInitialized)
        {
            model_internal::calculateOrder_inv_noIsValid();
        }

        return model_internal::_order_inv_noIsValid;
    }

    model_internal function calculateOrder_inv_noIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_inv_noValidator.validate(model_internal::_instance.order_inv_no)
        model_internal::_order_inv_noIsValid_der = (valRes.results == null);
        model_internal::_order_inv_noIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_inv_noValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_inv_noValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_inv_noValidationFailureMessages():Array
    {
        if (model_internal::_order_inv_noValidationFailureMessages == null)
            model_internal::calculateOrder_inv_noIsValid();

        return _order_inv_noValidationFailureMessages;
    }

    model_internal function set order_inv_noValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_inv_noValidationFailureMessages;

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
            model_internal::_order_inv_noValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_inv_noValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_expiredStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_expiredValidator() : StyleValidator
    {
        return model_internal::_order_expiredValidator;
    }

    model_internal function set _order_expiredIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_expiredIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_expiredIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_expiredIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_expiredIsValid():Boolean
    {
        if (!model_internal::_order_expiredIsValidCacheInitialized)
        {
            model_internal::calculateOrder_expiredIsValid();
        }

        return model_internal::_order_expiredIsValid;
    }

    model_internal function calculateOrder_expiredIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_expiredValidator.validate(model_internal::_instance.order_expired)
        model_internal::_order_expiredIsValid_der = (valRes.results == null);
        model_internal::_order_expiredIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_expiredValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_expiredValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_expiredValidationFailureMessages():Array
    {
        if (model_internal::_order_expiredValidationFailureMessages == null)
            model_internal::calculateOrder_expiredIsValid();

        return _order_expiredValidationFailureMessages;
    }

    model_internal function set order_expiredValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_expiredValidationFailureMessages;

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
            model_internal::_order_expiredValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_expiredValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_psnl_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_psnl_codeValidator() : StyleValidator
    {
        return model_internal::_order_psnl_codeValidator;
    }

    model_internal function set _order_psnl_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_psnl_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_psnl_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_psnl_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_psnl_codeIsValid():Boolean
    {
        if (!model_internal::_order_psnl_codeIsValidCacheInitialized)
        {
            model_internal::calculateOrder_psnl_codeIsValid();
        }

        return model_internal::_order_psnl_codeIsValid;
    }

    model_internal function calculateOrder_psnl_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_psnl_codeValidator.validate(model_internal::_instance.order_psnl_code)
        model_internal::_order_psnl_codeIsValid_der = (valRes.results == null);
        model_internal::_order_psnl_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_psnl_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_psnl_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_psnl_codeValidationFailureMessages():Array
    {
        if (model_internal::_order_psnl_codeValidationFailureMessages == null)
            model_internal::calculateOrder_psnl_codeIsValid();

        return _order_psnl_codeValidationFailureMessages;
    }

    model_internal function set order_psnl_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_psnl_codeValidationFailureMessages;

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
            model_internal::_order_psnl_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_psnl_codeValidationFailureMessages", oldValue, value));
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
            case("order_ttyp_name"):
            {
                return order_ttyp_nameValidationFailureMessages;
            }
            case("order_app_no"):
            {
                return order_app_noValidationFailureMessages;
            }
            case("order_dtrm_code"):
            {
                return order_dtrm_codeValidationFailureMessages;
            }
            case("order_ship_to_num"):
            {
                return order_ship_to_numValidationFailureMessages;
            }
            case("order_psnl_name"):
            {
                return order_psnl_nameValidationFailureMessages;
            }
            case("order_sold_to_num"):
            {
                return order_sold_to_numValidationFailureMessages;
            }
            case("order_strm_code"):
            {
                return order_strm_codeValidationFailureMessages;
            }
            case("order_carr_code"):
            {
                return order_carr_codeValidationFailureMessages;
            }
            case("order_styp_id"):
            {
                return order_styp_idValidationFailureMessages;
            }
            case("order_dlv_time"):
            {
                return order_dlv_timeValidationFailureMessages;
            }
            case("order_drwr_code"):
            {
                return order_drwr_codeValidationFailureMessages;
            }
            case("order_sys_no"):
            {
                return order_sys_noValidationFailureMessages;
            }
            case("order_exp_time"):
            {
                return order_exp_timeValidationFailureMessages;
            }
            case("order_items"):
            {
                return order_itemsValidationFailureMessages;
            }
            case("order_last_change"):
            {
                return order_last_changeValidationFailureMessages;
            }
            case("order_src_name"):
            {
                return order_src_nameValidationFailureMessages;
            }
            case("order_ref_code"):
            {
                return order_ref_codeValidationFailureMessages;
            }
            case("order_app_time"):
            {
                return order_app_timeValidationFailureMessages;
            }
            case("order_total"):
            {
                return order_totalValidationFailureMessages;
            }
            case("order_cust_code"):
            {
                return order_cust_codeValidationFailureMessages;
            }
            case("order_approved"):
            {
                return order_approvedValidationFailureMessages;
            }
            case("order_cust_no"):
            {
                return order_cust_noValidationFailureMessages;
            }
            case("order_carr_name"):
            {
                return order_carr_nameValidationFailureMessages;
            }
            case("order_stat_name"):
            {
                return order_stat_nameValidationFailureMessages;
            }
            case("order_dtrm_name"):
            {
                return order_dtrm_nameValidationFailureMessages;
            }
            case("order_styp_name"):
            {
                return order_styp_nameValidationFailureMessages;
            }
            case("order_ttyp_id"):
            {
                return order_ttyp_idValidationFailureMessages;
            }
            case("order_supp_name"):
            {
                return order_supp_nameValidationFailureMessages;
            }
            case("order_supp_code"):
            {
                return order_supp_codeValidationFailureMessages;
            }
            case("order_pay_note"):
            {
                return order_pay_noteValidationFailureMessages;
            }
            case("order_price_printed"):
            {
                return order_price_printedValidationFailureMessages;
            }
            case("order_dloc_name"):
            {
                return order_dloc_nameValidationFailureMessages;
            }
            case("order_src_id"):
            {
                return order_src_idValidationFailureMessages;
            }
            case("order_limit"):
            {
                return order_limitValidationFailureMessages;
            }
            case("order_strm_name"):
            {
                return order_strm_nameValidationFailureMessages;
            }
            case("order_stat_id"):
            {
                return order_stat_idValidationFailureMessages;
            }
            case("order_ord_time"):
            {
                return order_ord_timeValidationFailureMessages;
            }
            case("order_trsf_type"):
            {
                return order_trsf_typeValidationFailureMessages;
            }
            case("order_cust_name"):
            {
                return order_cust_nameValidationFailureMessages;
            }
            case("order_dloc_code"):
            {
                return order_dloc_codeValidationFailureMessages;
            }
            case("order_drwr_name"):
            {
                return order_drwr_nameValidationFailureMessages;
            }
            case("order_schedules"):
            {
                return order_schedulesValidationFailureMessages;
            }
            case("order_instructions"):
            {
                return order_instructionsValidationFailureMessages;
            }
            case("order_cust_acnt"):
            {
                return order_cust_acntValidationFailureMessages;
            }
            case("order_inv_no"):
            {
                return order_inv_noValidationFailureMessages;
            }
            case("order_expired"):
            {
                return order_expiredValidationFailureMessages;
            }
            case("order_psnl_code"):
            {
                return order_psnl_codeValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
