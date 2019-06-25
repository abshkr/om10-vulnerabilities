
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
internal class _CompanysEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("cmpy_ord_carrier", "cmpy_ldtol_flag", "cmpy_drv_inst_vp", "customer", "drawer", "cmpy_movements_rev", "cmpy_aoi", "cmpy_ldgo_delta", "cmpy_rpt_t_unit", "carrier", "cmpy_msg", "supplier", "cmpy_host", "host", "cmpy_ord_end", "cmpy_tkr_cfg", "cmpy_exp_cpde", "cmpy_code", "cmpy_ord_strt", "cmpy_exp_code", "cmpy_name", "cmpy_ld_rep_vp", "cmpy_vet", "issuer", "cmpy_rtn_prompt", "cmpy_schd_archive", "cmpy_bol_vp_name", "cmpy_trip_last", "cmpy_schd_rev_repost", "cmpy_add_prompt", "cmpy_log_ld_del", "cmpy_auto_ld", "cmpy_type", "employer", "cmpy_tkr_activat", "cmpy_rpt_temp", "cmpy_wipe_ordets", "cmpy_mod_drawer", "cmpy_flag_3", "cmpy_flag_1", "cmpy_bay_loop_ch", "cmpy_flag_2", "cmpy_enable_expd", "cmpy_trip_end", "cmpy_comms_ok", "cmpy_issu", "cmpy_wgh_complet", "cmpy_compress_bl", "cmpy_plant", "cmpy_auto_reconc", "cmpy_bltol_flag", "cmpy_must_sealno", "cmpy_ord_last", "cmpy_seal_number", "cmpy_host_docs", "cmpy_trip_strt", "cmpy_isse", "site_manager", "cmpy_wgh_auto_fl", "cmpy_req_pin_flag", "cmpy_check_licen");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("cmpy_ord_carrier", "cmpy_ldtol_flag", "cmpy_drv_inst_vp", "customer", "drawer", "cmpy_movements_rev", "cmpy_aoi", "cmpy_ldgo_delta", "cmpy_rpt_t_unit", "carrier", "cmpy_msg", "supplier", "cmpy_host", "host", "cmpy_ord_end", "cmpy_tkr_cfg", "cmpy_exp_cpde", "cmpy_code", "cmpy_ord_strt", "cmpy_exp_code", "cmpy_name", "cmpy_ld_rep_vp", "cmpy_vet", "issuer", "cmpy_rtn_prompt", "cmpy_schd_archive", "cmpy_bol_vp_name", "cmpy_trip_last", "cmpy_schd_rev_repost", "cmpy_add_prompt", "cmpy_log_ld_del", "cmpy_auto_ld", "cmpy_type", "employer", "cmpy_tkr_activat", "cmpy_rpt_temp", "cmpy_wipe_ordets", "cmpy_mod_drawer", "cmpy_flag_3", "cmpy_flag_1", "cmpy_bay_loop_ch", "cmpy_flag_2", "cmpy_enable_expd", "cmpy_trip_end", "cmpy_comms_ok", "cmpy_issu", "cmpy_wgh_complet", "cmpy_compress_bl", "cmpy_plant", "cmpy_auto_reconc", "cmpy_bltol_flag", "cmpy_must_sealno", "cmpy_ord_last", "cmpy_seal_number", "cmpy_host_docs", "cmpy_trip_strt", "cmpy_isse", "site_manager", "cmpy_wgh_auto_fl", "cmpy_req_pin_flag", "cmpy_check_licen");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("cmpy_ord_carrier", "cmpy_ldtol_flag", "cmpy_drv_inst_vp", "customer", "drawer", "cmpy_movements_rev", "cmpy_aoi", "cmpy_ldgo_delta", "cmpy_rpt_t_unit", "carrier", "cmpy_msg", "supplier", "cmpy_host", "host", "cmpy_ord_end", "cmpy_tkr_cfg", "cmpy_exp_cpde", "cmpy_code", "cmpy_ord_strt", "cmpy_exp_code", "cmpy_name", "cmpy_ld_rep_vp", "cmpy_vet", "issuer", "cmpy_rtn_prompt", "cmpy_schd_archive", "cmpy_bol_vp_name", "cmpy_trip_last", "cmpy_schd_rev_repost", "cmpy_add_prompt", "cmpy_log_ld_del", "cmpy_auto_ld", "cmpy_type", "employer", "cmpy_tkr_activat", "cmpy_rpt_temp", "cmpy_wipe_ordets", "cmpy_mod_drawer", "cmpy_flag_3", "cmpy_flag_1", "cmpy_bay_loop_ch", "cmpy_flag_2", "cmpy_enable_expd", "cmpy_trip_end", "cmpy_comms_ok", "cmpy_issu", "cmpy_wgh_complet", "cmpy_compress_bl", "cmpy_plant", "cmpy_auto_reconc", "cmpy_bltol_flag", "cmpy_must_sealno", "cmpy_ord_last", "cmpy_seal_number", "cmpy_host_docs", "cmpy_trip_strt", "cmpy_isse", "site_manager", "cmpy_wgh_auto_fl", "cmpy_req_pin_flag", "cmpy_check_licen");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("cmpy_ord_carrier", "cmpy_ldtol_flag", "cmpy_drv_inst_vp", "customer", "drawer", "cmpy_movements_rev", "cmpy_aoi", "cmpy_ldgo_delta", "cmpy_rpt_t_unit", "carrier", "cmpy_msg", "supplier", "cmpy_host", "host", "cmpy_ord_end", "cmpy_tkr_cfg", "cmpy_exp_cpde", "cmpy_code", "cmpy_ord_strt", "cmpy_exp_code", "cmpy_name", "cmpy_ld_rep_vp", "cmpy_vet", "issuer", "cmpy_rtn_prompt", "cmpy_schd_archive", "cmpy_bol_vp_name", "cmpy_trip_last", "cmpy_schd_rev_repost", "cmpy_add_prompt", "cmpy_log_ld_del", "cmpy_auto_ld", "cmpy_type", "employer", "cmpy_tkr_activat", "cmpy_rpt_temp", "cmpy_wipe_ordets", "cmpy_mod_drawer", "cmpy_flag_3", "cmpy_flag_1", "cmpy_bay_loop_ch", "cmpy_flag_2", "cmpy_enable_expd", "cmpy_trip_end", "cmpy_comms_ok", "cmpy_issu", "cmpy_wgh_complet", "cmpy_compress_bl", "cmpy_plant", "cmpy_auto_reconc", "cmpy_bltol_flag", "cmpy_must_sealno", "cmpy_ord_last", "cmpy_seal_number", "cmpy_host_docs", "cmpy_trip_strt", "cmpy_isse", "site_manager", "cmpy_wgh_auto_fl", "cmpy_req_pin_flag", "cmpy_check_licen");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("cmpy_ord_carrier", "cmpy_ldtol_flag", "cmpy_drv_inst_vp", "customer", "drawer", "cmpy_movements_rev", "cmpy_aoi", "cmpy_ldgo_delta", "cmpy_rpt_t_unit", "carrier", "cmpy_msg", "supplier", "cmpy_host", "host", "cmpy_ord_end", "cmpy_tkr_cfg", "cmpy_exp_cpde", "cmpy_code", "cmpy_ord_strt", "cmpy_exp_code", "cmpy_name", "cmpy_ld_rep_vp", "cmpy_vet", "issuer", "cmpy_rtn_prompt", "cmpy_schd_archive", "cmpy_bol_vp_name", "cmpy_trip_last", "cmpy_schd_rev_repost", "cmpy_add_prompt", "cmpy_log_ld_del", "cmpy_auto_ld", "cmpy_type", "employer", "cmpy_tkr_activat", "cmpy_rpt_temp", "cmpy_wipe_ordets", "cmpy_mod_drawer", "cmpy_flag_3", "cmpy_flag_1", "cmpy_bay_loop_ch", "cmpy_flag_2", "cmpy_enable_expd", "cmpy_trip_end", "cmpy_comms_ok", "cmpy_issu", "cmpy_wgh_complet", "cmpy_compress_bl", "cmpy_plant", "cmpy_auto_reconc", "cmpy_bltol_flag", "cmpy_must_sealno", "cmpy_ord_last", "cmpy_seal_number", "cmpy_host_docs", "cmpy_trip_strt", "cmpy_isse", "site_manager", "cmpy_wgh_auto_fl", "cmpy_req_pin_flag", "cmpy_check_licen");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "Companys";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _cmpy_ord_carrierIsValid:Boolean;
    model_internal var _cmpy_ord_carrierValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_ord_carrierIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_ord_carrierValidationFailureMessages:Array;
    
    model_internal var _cmpy_ldtol_flagIsValid:Boolean;
    model_internal var _cmpy_ldtol_flagValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_ldtol_flagIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_ldtol_flagValidationFailureMessages:Array;
    
    model_internal var _cmpy_drv_inst_vpIsValid:Boolean;
    model_internal var _cmpy_drv_inst_vpValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_drv_inst_vpIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_drv_inst_vpValidationFailureMessages:Array;
    
    model_internal var _customerIsValid:Boolean;
    model_internal var _customerValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _customerIsValidCacheInitialized:Boolean = false;
    model_internal var _customerValidationFailureMessages:Array;
    
    model_internal var _drawerIsValid:Boolean;
    model_internal var _drawerValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _drawerIsValidCacheInitialized:Boolean = false;
    model_internal var _drawerValidationFailureMessages:Array;
    
    model_internal var _cmpy_movements_revIsValid:Boolean;
    model_internal var _cmpy_movements_revValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_movements_revIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_movements_revValidationFailureMessages:Array;
    
    model_internal var _cmpy_aoiIsValid:Boolean;
    model_internal var _cmpy_aoiValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_aoiIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_aoiValidationFailureMessages:Array;
    
    model_internal var _cmpy_ldgo_deltaIsValid:Boolean;
    model_internal var _cmpy_ldgo_deltaValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_ldgo_deltaIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_ldgo_deltaValidationFailureMessages:Array;
    
    model_internal var _cmpy_rpt_t_unitIsValid:Boolean;
    model_internal var _cmpy_rpt_t_unitValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_rpt_t_unitIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_rpt_t_unitValidationFailureMessages:Array;
    
    model_internal var _carrierIsValid:Boolean;
    model_internal var _carrierValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _carrierIsValidCacheInitialized:Boolean = false;
    model_internal var _carrierValidationFailureMessages:Array;
    
    model_internal var _cmpy_msgIsValid:Boolean;
    model_internal var _cmpy_msgValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_msgIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_msgValidationFailureMessages:Array;
    
    model_internal var _supplierIsValid:Boolean;
    model_internal var _supplierValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _supplierIsValidCacheInitialized:Boolean = false;
    model_internal var _supplierValidationFailureMessages:Array;
    
    model_internal var _cmpy_hostIsValid:Boolean;
    model_internal var _cmpy_hostValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_hostIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_hostValidationFailureMessages:Array;
    
    model_internal var _hostIsValid:Boolean;
    model_internal var _hostValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _hostIsValidCacheInitialized:Boolean = false;
    model_internal var _hostValidationFailureMessages:Array;
    
    model_internal var _cmpy_ord_endIsValid:Boolean;
    model_internal var _cmpy_ord_endValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_ord_endIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_ord_endValidationFailureMessages:Array;
    
    model_internal var _cmpy_tkr_cfgIsValid:Boolean;
    model_internal var _cmpy_tkr_cfgValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_tkr_cfgIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_tkr_cfgValidationFailureMessages:Array;
    
    model_internal var _cmpy_exp_cpdeIsValid:Boolean;
    model_internal var _cmpy_exp_cpdeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_exp_cpdeIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_exp_cpdeValidationFailureMessages:Array;
    
    model_internal var _cmpy_codeIsValid:Boolean;
    model_internal var _cmpy_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_codeValidationFailureMessages:Array;
    
    model_internal var _cmpy_ord_strtIsValid:Boolean;
    model_internal var _cmpy_ord_strtValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_ord_strtIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_ord_strtValidationFailureMessages:Array;
    
    model_internal var _cmpy_exp_codeIsValid:Boolean;
    model_internal var _cmpy_exp_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_exp_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_exp_codeValidationFailureMessages:Array;
    
    model_internal var _cmpy_nameIsValid:Boolean;
    model_internal var _cmpy_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_nameValidationFailureMessages:Array;
    
    model_internal var _cmpy_ld_rep_vpIsValid:Boolean;
    model_internal var _cmpy_ld_rep_vpValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_ld_rep_vpIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_ld_rep_vpValidationFailureMessages:Array;
    
    model_internal var _cmpy_vetIsValid:Boolean;
    model_internal var _cmpy_vetValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_vetIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_vetValidationFailureMessages:Array;
    
    model_internal var _issuerIsValid:Boolean;
    model_internal var _issuerValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _issuerIsValidCacheInitialized:Boolean = false;
    model_internal var _issuerValidationFailureMessages:Array;
    
    model_internal var _cmpy_rtn_promptIsValid:Boolean;
    model_internal var _cmpy_rtn_promptValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_rtn_promptIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_rtn_promptValidationFailureMessages:Array;
    
    model_internal var _cmpy_schd_archiveIsValid:Boolean;
    model_internal var _cmpy_schd_archiveValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_schd_archiveIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_schd_archiveValidationFailureMessages:Array;
    
    model_internal var _cmpy_bol_vp_nameIsValid:Boolean;
    model_internal var _cmpy_bol_vp_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_bol_vp_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_bol_vp_nameValidationFailureMessages:Array;
    
    model_internal var _cmpy_trip_lastIsValid:Boolean;
    model_internal var _cmpy_trip_lastValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_trip_lastIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_trip_lastValidationFailureMessages:Array;
    
    model_internal var _cmpy_schd_rev_repostIsValid:Boolean;
    model_internal var _cmpy_schd_rev_repostValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_schd_rev_repostIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_schd_rev_repostValidationFailureMessages:Array;
    
    model_internal var _cmpy_add_promptIsValid:Boolean;
    model_internal var _cmpy_add_promptValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_add_promptIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_add_promptValidationFailureMessages:Array;
    
    model_internal var _cmpy_log_ld_delIsValid:Boolean;
    model_internal var _cmpy_log_ld_delValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_log_ld_delIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_log_ld_delValidationFailureMessages:Array;
    
    model_internal var _cmpy_auto_ldIsValid:Boolean;
    model_internal var _cmpy_auto_ldValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_auto_ldIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_auto_ldValidationFailureMessages:Array;
    
    model_internal var _cmpy_typeIsValid:Boolean;
    model_internal var _cmpy_typeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_typeIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_typeValidationFailureMessages:Array;
    
    model_internal var _employerIsValid:Boolean;
    model_internal var _employerValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _employerIsValidCacheInitialized:Boolean = false;
    model_internal var _employerValidationFailureMessages:Array;
    
    model_internal var _cmpy_tkr_activatIsValid:Boolean;
    model_internal var _cmpy_tkr_activatValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_tkr_activatIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_tkr_activatValidationFailureMessages:Array;
    
    model_internal var _cmpy_rpt_tempIsValid:Boolean;
    model_internal var _cmpy_rpt_tempValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_rpt_tempIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_rpt_tempValidationFailureMessages:Array;
    
    model_internal var _cmpy_wipe_ordetsIsValid:Boolean;
    model_internal var _cmpy_wipe_ordetsValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_wipe_ordetsIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_wipe_ordetsValidationFailureMessages:Array;
    
    model_internal var _cmpy_mod_drawerIsValid:Boolean;
    model_internal var _cmpy_mod_drawerValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_mod_drawerIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_mod_drawerValidationFailureMessages:Array;
    
    model_internal var _cmpy_flag_3IsValid:Boolean;
    model_internal var _cmpy_flag_3Validator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_flag_3IsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_flag_3ValidationFailureMessages:Array;
    
    model_internal var _cmpy_flag_1IsValid:Boolean;
    model_internal var _cmpy_flag_1Validator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_flag_1IsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_flag_1ValidationFailureMessages:Array;
    
    model_internal var _cmpy_bay_loop_chIsValid:Boolean;
    model_internal var _cmpy_bay_loop_chValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_bay_loop_chIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_bay_loop_chValidationFailureMessages:Array;
    
    model_internal var _cmpy_flag_2IsValid:Boolean;
    model_internal var _cmpy_flag_2Validator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_flag_2IsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_flag_2ValidationFailureMessages:Array;
    
    model_internal var _cmpy_enable_expdIsValid:Boolean;
    model_internal var _cmpy_enable_expdValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_enable_expdIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_enable_expdValidationFailureMessages:Array;
    
    model_internal var _cmpy_trip_endIsValid:Boolean;
    model_internal var _cmpy_trip_endValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_trip_endIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_trip_endValidationFailureMessages:Array;
    
    model_internal var _cmpy_comms_okIsValid:Boolean;
    model_internal var _cmpy_comms_okValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_comms_okIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_comms_okValidationFailureMessages:Array;
    
    model_internal var _cmpy_issuIsValid:Boolean;
    model_internal var _cmpy_issuValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_issuIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_issuValidationFailureMessages:Array;
    
    model_internal var _cmpy_wgh_completIsValid:Boolean;
    model_internal var _cmpy_wgh_completValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_wgh_completIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_wgh_completValidationFailureMessages:Array;
    
    model_internal var _cmpy_compress_blIsValid:Boolean;
    model_internal var _cmpy_compress_blValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_compress_blIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_compress_blValidationFailureMessages:Array;
    
    model_internal var _cmpy_plantIsValid:Boolean;
    model_internal var _cmpy_plantValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_plantIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_plantValidationFailureMessages:Array;
    
    model_internal var _cmpy_auto_reconcIsValid:Boolean;
    model_internal var _cmpy_auto_reconcValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_auto_reconcIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_auto_reconcValidationFailureMessages:Array;
    
    model_internal var _cmpy_bltol_flagIsValid:Boolean;
    model_internal var _cmpy_bltol_flagValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_bltol_flagIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_bltol_flagValidationFailureMessages:Array;
    
    model_internal var _cmpy_must_sealnoIsValid:Boolean;
    model_internal var _cmpy_must_sealnoValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_must_sealnoIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_must_sealnoValidationFailureMessages:Array;
    
    model_internal var _cmpy_ord_lastIsValid:Boolean;
    model_internal var _cmpy_ord_lastValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_ord_lastIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_ord_lastValidationFailureMessages:Array;
    
    model_internal var _cmpy_seal_numberIsValid:Boolean;
    model_internal var _cmpy_seal_numberValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_seal_numberIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_seal_numberValidationFailureMessages:Array;
    
    model_internal var _cmpy_host_docsIsValid:Boolean;
    model_internal var _cmpy_host_docsValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_host_docsIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_host_docsValidationFailureMessages:Array;
    
    model_internal var _cmpy_trip_strtIsValid:Boolean;
    model_internal var _cmpy_trip_strtValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_trip_strtIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_trip_strtValidationFailureMessages:Array;
    
    model_internal var _cmpy_isseIsValid:Boolean;
    model_internal var _cmpy_isseValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_isseIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_isseValidationFailureMessages:Array;
    
    model_internal var _site_managerIsValid:Boolean;
    model_internal var _site_managerValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _site_managerIsValidCacheInitialized:Boolean = false;
    model_internal var _site_managerValidationFailureMessages:Array;
    
    model_internal var _cmpy_wgh_auto_flIsValid:Boolean;
    model_internal var _cmpy_wgh_auto_flValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_wgh_auto_flIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_wgh_auto_flValidationFailureMessages:Array;
    
    model_internal var _cmpy_req_pin_flagIsValid:Boolean;
    model_internal var _cmpy_req_pin_flagValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_req_pin_flagIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_req_pin_flagValidationFailureMessages:Array;
    
    model_internal var _cmpy_check_licenIsValid:Boolean;
    model_internal var _cmpy_check_licenValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_check_licenIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_check_licenValidationFailureMessages:Array;

    model_internal var _instance:_Super_Companys;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _CompanysEntityMetadata(value : _Super_Companys)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["cmpy_ord_carrier"] = new Array();
            model_internal::dependentsOnMap["cmpy_ldtol_flag"] = new Array();
            model_internal::dependentsOnMap["cmpy_drv_inst_vp"] = new Array();
            model_internal::dependentsOnMap["customer"] = new Array();
            model_internal::dependentsOnMap["drawer"] = new Array();
            model_internal::dependentsOnMap["cmpy_movements_rev"] = new Array();
            model_internal::dependentsOnMap["cmpy_aoi"] = new Array();
            model_internal::dependentsOnMap["cmpy_ldgo_delta"] = new Array();
            model_internal::dependentsOnMap["cmpy_rpt_t_unit"] = new Array();
            model_internal::dependentsOnMap["carrier"] = new Array();
            model_internal::dependentsOnMap["cmpy_msg"] = new Array();
            model_internal::dependentsOnMap["supplier"] = new Array();
            model_internal::dependentsOnMap["cmpy_host"] = new Array();
            model_internal::dependentsOnMap["host"] = new Array();
            model_internal::dependentsOnMap["cmpy_ord_end"] = new Array();
            model_internal::dependentsOnMap["cmpy_tkr_cfg"] = new Array();
            model_internal::dependentsOnMap["cmpy_exp_cpde"] = new Array();
            model_internal::dependentsOnMap["cmpy_code"] = new Array();
            model_internal::dependentsOnMap["cmpy_ord_strt"] = new Array();
            model_internal::dependentsOnMap["cmpy_exp_code"] = new Array();
            model_internal::dependentsOnMap["cmpy_name"] = new Array();
            model_internal::dependentsOnMap["cmpy_ld_rep_vp"] = new Array();
            model_internal::dependentsOnMap["cmpy_vet"] = new Array();
            model_internal::dependentsOnMap["issuer"] = new Array();
            model_internal::dependentsOnMap["cmpy_rtn_prompt"] = new Array();
            model_internal::dependentsOnMap["cmpy_schd_archive"] = new Array();
            model_internal::dependentsOnMap["cmpy_bol_vp_name"] = new Array();
            model_internal::dependentsOnMap["cmpy_trip_last"] = new Array();
            model_internal::dependentsOnMap["cmpy_schd_rev_repost"] = new Array();
            model_internal::dependentsOnMap["cmpy_add_prompt"] = new Array();
            model_internal::dependentsOnMap["cmpy_log_ld_del"] = new Array();
            model_internal::dependentsOnMap["cmpy_auto_ld"] = new Array();
            model_internal::dependentsOnMap["cmpy_type"] = new Array();
            model_internal::dependentsOnMap["employer"] = new Array();
            model_internal::dependentsOnMap["cmpy_tkr_activat"] = new Array();
            model_internal::dependentsOnMap["cmpy_rpt_temp"] = new Array();
            model_internal::dependentsOnMap["cmpy_wipe_ordets"] = new Array();
            model_internal::dependentsOnMap["cmpy_mod_drawer"] = new Array();
            model_internal::dependentsOnMap["cmpy_flag_3"] = new Array();
            model_internal::dependentsOnMap["cmpy_flag_1"] = new Array();
            model_internal::dependentsOnMap["cmpy_bay_loop_ch"] = new Array();
            model_internal::dependentsOnMap["cmpy_flag_2"] = new Array();
            model_internal::dependentsOnMap["cmpy_enable_expd"] = new Array();
            model_internal::dependentsOnMap["cmpy_trip_end"] = new Array();
            model_internal::dependentsOnMap["cmpy_comms_ok"] = new Array();
            model_internal::dependentsOnMap["cmpy_issu"] = new Array();
            model_internal::dependentsOnMap["cmpy_wgh_complet"] = new Array();
            model_internal::dependentsOnMap["cmpy_compress_bl"] = new Array();
            model_internal::dependentsOnMap["cmpy_plant"] = new Array();
            model_internal::dependentsOnMap["cmpy_auto_reconc"] = new Array();
            model_internal::dependentsOnMap["cmpy_bltol_flag"] = new Array();
            model_internal::dependentsOnMap["cmpy_must_sealno"] = new Array();
            model_internal::dependentsOnMap["cmpy_ord_last"] = new Array();
            model_internal::dependentsOnMap["cmpy_seal_number"] = new Array();
            model_internal::dependentsOnMap["cmpy_host_docs"] = new Array();
            model_internal::dependentsOnMap["cmpy_trip_strt"] = new Array();
            model_internal::dependentsOnMap["cmpy_isse"] = new Array();
            model_internal::dependentsOnMap["site_manager"] = new Array();
            model_internal::dependentsOnMap["cmpy_wgh_auto_fl"] = new Array();
            model_internal::dependentsOnMap["cmpy_req_pin_flag"] = new Array();
            model_internal::dependentsOnMap["cmpy_check_licen"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["cmpy_ord_carrier"] = "Object";
        model_internal::propertyTypeMap["cmpy_ldtol_flag"] = "String";
        model_internal::propertyTypeMap["cmpy_drv_inst_vp"] = "Object";
        model_internal::propertyTypeMap["customer"] = "Object";
        model_internal::propertyTypeMap["drawer"] = "Object";
        model_internal::propertyTypeMap["cmpy_movements_rev"] = "String";
        model_internal::propertyTypeMap["cmpy_aoi"] = "Object";
        model_internal::propertyTypeMap["cmpy_ldgo_delta"] = "Object";
        model_internal::propertyTypeMap["cmpy_rpt_t_unit"] = "Object";
        model_internal::propertyTypeMap["carrier"] = "Object";
        model_internal::propertyTypeMap["cmpy_msg"] = "Object";
        model_internal::propertyTypeMap["supplier"] = "Object";
        model_internal::propertyTypeMap["cmpy_host"] = "Object";
        model_internal::propertyTypeMap["host"] = "Object";
        model_internal::propertyTypeMap["cmpy_ord_end"] = "Object";
        model_internal::propertyTypeMap["cmpy_tkr_cfg"] = "Object";
        model_internal::propertyTypeMap["cmpy_exp_cpde"] = "Object";
        model_internal::propertyTypeMap["cmpy_code"] = "String";
        model_internal::propertyTypeMap["cmpy_ord_strt"] = "Object";
        model_internal::propertyTypeMap["cmpy_exp_code"] = "Object";
        model_internal::propertyTypeMap["cmpy_name"] = "String";
        model_internal::propertyTypeMap["cmpy_ld_rep_vp"] = "Object";
        model_internal::propertyTypeMap["cmpy_vet"] = "Object";
        model_internal::propertyTypeMap["issuer"] = "Object";
        model_internal::propertyTypeMap["cmpy_rtn_prompt"] = "Object";
        model_internal::propertyTypeMap["cmpy_schd_archive"] = "String";
        model_internal::propertyTypeMap["cmpy_bol_vp_name"] = "Object";
        model_internal::propertyTypeMap["cmpy_trip_last"] = "Object";
        model_internal::propertyTypeMap["cmpy_schd_rev_repost"] = "String";
        model_internal::propertyTypeMap["cmpy_add_prompt"] = "Object";
        model_internal::propertyTypeMap["cmpy_log_ld_del"] = "Object";
        model_internal::propertyTypeMap["cmpy_auto_ld"] = "Object";
        model_internal::propertyTypeMap["cmpy_type"] = "String";
        model_internal::propertyTypeMap["employer"] = "Object";
        model_internal::propertyTypeMap["cmpy_tkr_activat"] = "Object";
        model_internal::propertyTypeMap["cmpy_rpt_temp"] = "Object";
        model_internal::propertyTypeMap["cmpy_wipe_ordets"] = "Object";
        model_internal::propertyTypeMap["cmpy_mod_drawer"] = "Object";
        model_internal::propertyTypeMap["cmpy_flag_3"] = "Object";
        model_internal::propertyTypeMap["cmpy_flag_1"] = "Object";
        model_internal::propertyTypeMap["cmpy_bay_loop_ch"] = "Object";
        model_internal::propertyTypeMap["cmpy_flag_2"] = "Object";
        model_internal::propertyTypeMap["cmpy_enable_expd"] = "Object";
        model_internal::propertyTypeMap["cmpy_trip_end"] = "Object";
        model_internal::propertyTypeMap["cmpy_comms_ok"] = "Object";
        model_internal::propertyTypeMap["cmpy_issu"] = "Object";
        model_internal::propertyTypeMap["cmpy_wgh_complet"] = "Object";
        model_internal::propertyTypeMap["cmpy_compress_bl"] = "Object";
        model_internal::propertyTypeMap["cmpy_plant"] = "Object";
        model_internal::propertyTypeMap["cmpy_auto_reconc"] = "Object";
        model_internal::propertyTypeMap["cmpy_bltol_flag"] = "String";
        model_internal::propertyTypeMap["cmpy_must_sealno"] = "Object";
        model_internal::propertyTypeMap["cmpy_ord_last"] = "Object";
        model_internal::propertyTypeMap["cmpy_seal_number"] = "Object";
        model_internal::propertyTypeMap["cmpy_host_docs"] = "Object";
        model_internal::propertyTypeMap["cmpy_trip_strt"] = "Object";
        model_internal::propertyTypeMap["cmpy_isse"] = "Object";
        model_internal::propertyTypeMap["site_manager"] = "Object";
        model_internal::propertyTypeMap["cmpy_wgh_auto_fl"] = "Object";
        model_internal::propertyTypeMap["cmpy_req_pin_flag"] = "String";
        model_internal::propertyTypeMap["cmpy_check_licen"] = "Object";

        model_internal::_instance = value;
        model_internal::_cmpy_ord_carrierValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_ord_carrier);
        model_internal::_cmpy_ord_carrierValidator.required = true;
        model_internal::_cmpy_ord_carrierValidator.requiredFieldError = "cmpy_ord_carrier is required";
        //model_internal::_cmpy_ord_carrierValidator.source = model_internal::_instance;
        //model_internal::_cmpy_ord_carrierValidator.property = "cmpy_ord_carrier";
        model_internal::_cmpy_ldtol_flagValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_ldtol_flag);
        model_internal::_cmpy_ldtol_flagValidator.required = true;
        model_internal::_cmpy_ldtol_flagValidator.requiredFieldError = "cmpy_ldtol_flag is required";
        //model_internal::_cmpy_ldtol_flagValidator.source = model_internal::_instance;
        //model_internal::_cmpy_ldtol_flagValidator.property = "cmpy_ldtol_flag";
        model_internal::_cmpy_drv_inst_vpValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_drv_inst_vp);
        model_internal::_cmpy_drv_inst_vpValidator.required = true;
        model_internal::_cmpy_drv_inst_vpValidator.requiredFieldError = "cmpy_drv_inst_vp is required";
        //model_internal::_cmpy_drv_inst_vpValidator.source = model_internal::_instance;
        //model_internal::_cmpy_drv_inst_vpValidator.property = "cmpy_drv_inst_vp";
        model_internal::_customerValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCustomer);
        model_internal::_customerValidator.required = true;
        model_internal::_customerValidator.requiredFieldError = "customer is required";
        //model_internal::_customerValidator.source = model_internal::_instance;
        //model_internal::_customerValidator.property = "customer";
        model_internal::_drawerValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForDrawer);
        model_internal::_drawerValidator.required = true;
        model_internal::_drawerValidator.requiredFieldError = "drawer is required";
        //model_internal::_drawerValidator.source = model_internal::_instance;
        //model_internal::_drawerValidator.property = "drawer";
        model_internal::_cmpy_movements_revValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_movements_rev);
        model_internal::_cmpy_movements_revValidator.required = true;
        model_internal::_cmpy_movements_revValidator.requiredFieldError = "cmpy_movements_rev is required";
        //model_internal::_cmpy_movements_revValidator.source = model_internal::_instance;
        //model_internal::_cmpy_movements_revValidator.property = "cmpy_movements_rev";
        model_internal::_cmpy_aoiValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_aoi);
        model_internal::_cmpy_aoiValidator.required = true;
        model_internal::_cmpy_aoiValidator.requiredFieldError = "cmpy_aoi is required";
        //model_internal::_cmpy_aoiValidator.source = model_internal::_instance;
        //model_internal::_cmpy_aoiValidator.property = "cmpy_aoi";
        model_internal::_cmpy_ldgo_deltaValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_ldgo_delta);
        model_internal::_cmpy_ldgo_deltaValidator.required = true;
        model_internal::_cmpy_ldgo_deltaValidator.requiredFieldError = "cmpy_ldgo_delta is required";
        //model_internal::_cmpy_ldgo_deltaValidator.source = model_internal::_instance;
        //model_internal::_cmpy_ldgo_deltaValidator.property = "cmpy_ldgo_delta";
        model_internal::_cmpy_rpt_t_unitValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_rpt_t_unit);
        model_internal::_cmpy_rpt_t_unitValidator.required = true;
        model_internal::_cmpy_rpt_t_unitValidator.requiredFieldError = "cmpy_rpt_t_unit is required";
        //model_internal::_cmpy_rpt_t_unitValidator.source = model_internal::_instance;
        //model_internal::_cmpy_rpt_t_unitValidator.property = "cmpy_rpt_t_unit";
        model_internal::_carrierValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCarrier);
        model_internal::_carrierValidator.required = true;
        model_internal::_carrierValidator.requiredFieldError = "carrier is required";
        //model_internal::_carrierValidator.source = model_internal::_instance;
        //model_internal::_carrierValidator.property = "carrier";
        model_internal::_cmpy_msgValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_msg);
        model_internal::_cmpy_msgValidator.required = true;
        model_internal::_cmpy_msgValidator.requiredFieldError = "cmpy_msg is required";
        //model_internal::_cmpy_msgValidator.source = model_internal::_instance;
        //model_internal::_cmpy_msgValidator.property = "cmpy_msg";
        model_internal::_supplierValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSupplier);
        model_internal::_supplierValidator.required = true;
        model_internal::_supplierValidator.requiredFieldError = "supplier is required";
        //model_internal::_supplierValidator.source = model_internal::_instance;
        //model_internal::_supplierValidator.property = "supplier";
        model_internal::_cmpy_hostValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_host);
        model_internal::_cmpy_hostValidator.required = true;
        model_internal::_cmpy_hostValidator.requiredFieldError = "cmpy_host is required";
        //model_internal::_cmpy_hostValidator.source = model_internal::_instance;
        //model_internal::_cmpy_hostValidator.property = "cmpy_host";
        model_internal::_hostValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForHost);
        model_internal::_hostValidator.required = true;
        model_internal::_hostValidator.requiredFieldError = "host is required";
        //model_internal::_hostValidator.source = model_internal::_instance;
        //model_internal::_hostValidator.property = "host";
        model_internal::_cmpy_ord_endValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_ord_end);
        model_internal::_cmpy_ord_endValidator.required = true;
        model_internal::_cmpy_ord_endValidator.requiredFieldError = "cmpy_ord_end is required";
        //model_internal::_cmpy_ord_endValidator.source = model_internal::_instance;
        //model_internal::_cmpy_ord_endValidator.property = "cmpy_ord_end";
        model_internal::_cmpy_tkr_cfgValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_tkr_cfg);
        model_internal::_cmpy_tkr_cfgValidator.required = true;
        model_internal::_cmpy_tkr_cfgValidator.requiredFieldError = "cmpy_tkr_cfg is required";
        //model_internal::_cmpy_tkr_cfgValidator.source = model_internal::_instance;
        //model_internal::_cmpy_tkr_cfgValidator.property = "cmpy_tkr_cfg";
        model_internal::_cmpy_exp_cpdeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_exp_cpde);
        model_internal::_cmpy_exp_cpdeValidator.required = true;
        model_internal::_cmpy_exp_cpdeValidator.requiredFieldError = "cmpy_exp_cpde is required";
        //model_internal::_cmpy_exp_cpdeValidator.source = model_internal::_instance;
        //model_internal::_cmpy_exp_cpdeValidator.property = "cmpy_exp_cpde";
        model_internal::_cmpy_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_code);
        model_internal::_cmpy_codeValidator.required = true;
        model_internal::_cmpy_codeValidator.requiredFieldError = "cmpy_code is required";
        //model_internal::_cmpy_codeValidator.source = model_internal::_instance;
        //model_internal::_cmpy_codeValidator.property = "cmpy_code";
        model_internal::_cmpy_ord_strtValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_ord_strt);
        model_internal::_cmpy_ord_strtValidator.required = true;
        model_internal::_cmpy_ord_strtValidator.requiredFieldError = "cmpy_ord_strt is required";
        //model_internal::_cmpy_ord_strtValidator.source = model_internal::_instance;
        //model_internal::_cmpy_ord_strtValidator.property = "cmpy_ord_strt";
        model_internal::_cmpy_exp_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_exp_code);
        model_internal::_cmpy_exp_codeValidator.required = true;
        model_internal::_cmpy_exp_codeValidator.requiredFieldError = "cmpy_exp_code is required";
        //model_internal::_cmpy_exp_codeValidator.source = model_internal::_instance;
        //model_internal::_cmpy_exp_codeValidator.property = "cmpy_exp_code";
        model_internal::_cmpy_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_name);
        model_internal::_cmpy_nameValidator.required = true;
        model_internal::_cmpy_nameValidator.requiredFieldError = "cmpy_name is required";
        //model_internal::_cmpy_nameValidator.source = model_internal::_instance;
        //model_internal::_cmpy_nameValidator.property = "cmpy_name";
        model_internal::_cmpy_ld_rep_vpValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_ld_rep_vp);
        model_internal::_cmpy_ld_rep_vpValidator.required = true;
        model_internal::_cmpy_ld_rep_vpValidator.requiredFieldError = "cmpy_ld_rep_vp is required";
        //model_internal::_cmpy_ld_rep_vpValidator.source = model_internal::_instance;
        //model_internal::_cmpy_ld_rep_vpValidator.property = "cmpy_ld_rep_vp";
        model_internal::_cmpy_vetValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_vet);
        model_internal::_cmpy_vetValidator.required = true;
        model_internal::_cmpy_vetValidator.requiredFieldError = "cmpy_vet is required";
        //model_internal::_cmpy_vetValidator.source = model_internal::_instance;
        //model_internal::_cmpy_vetValidator.property = "cmpy_vet";
        model_internal::_issuerValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForIssuer);
        model_internal::_issuerValidator.required = true;
        model_internal::_issuerValidator.requiredFieldError = "issuer is required";
        //model_internal::_issuerValidator.source = model_internal::_instance;
        //model_internal::_issuerValidator.property = "issuer";
        model_internal::_cmpy_rtn_promptValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_rtn_prompt);
        model_internal::_cmpy_rtn_promptValidator.required = true;
        model_internal::_cmpy_rtn_promptValidator.requiredFieldError = "cmpy_rtn_prompt is required";
        //model_internal::_cmpy_rtn_promptValidator.source = model_internal::_instance;
        //model_internal::_cmpy_rtn_promptValidator.property = "cmpy_rtn_prompt";
        model_internal::_cmpy_schd_archiveValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_schd_archive);
        model_internal::_cmpy_schd_archiveValidator.required = true;
        model_internal::_cmpy_schd_archiveValidator.requiredFieldError = "cmpy_schd_archive is required";
        //model_internal::_cmpy_schd_archiveValidator.source = model_internal::_instance;
        //model_internal::_cmpy_schd_archiveValidator.property = "cmpy_schd_archive";
        model_internal::_cmpy_bol_vp_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_bol_vp_name);
        model_internal::_cmpy_bol_vp_nameValidator.required = true;
        model_internal::_cmpy_bol_vp_nameValidator.requiredFieldError = "cmpy_bol_vp_name is required";
        //model_internal::_cmpy_bol_vp_nameValidator.source = model_internal::_instance;
        //model_internal::_cmpy_bol_vp_nameValidator.property = "cmpy_bol_vp_name";
        model_internal::_cmpy_trip_lastValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_trip_last);
        model_internal::_cmpy_trip_lastValidator.required = true;
        model_internal::_cmpy_trip_lastValidator.requiredFieldError = "cmpy_trip_last is required";
        //model_internal::_cmpy_trip_lastValidator.source = model_internal::_instance;
        //model_internal::_cmpy_trip_lastValidator.property = "cmpy_trip_last";
        model_internal::_cmpy_schd_rev_repostValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_schd_rev_repost);
        model_internal::_cmpy_schd_rev_repostValidator.required = true;
        model_internal::_cmpy_schd_rev_repostValidator.requiredFieldError = "cmpy_schd_rev_repost is required";
        //model_internal::_cmpy_schd_rev_repostValidator.source = model_internal::_instance;
        //model_internal::_cmpy_schd_rev_repostValidator.property = "cmpy_schd_rev_repost";
        model_internal::_cmpy_add_promptValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_add_prompt);
        model_internal::_cmpy_add_promptValidator.required = true;
        model_internal::_cmpy_add_promptValidator.requiredFieldError = "cmpy_add_prompt is required";
        //model_internal::_cmpy_add_promptValidator.source = model_internal::_instance;
        //model_internal::_cmpy_add_promptValidator.property = "cmpy_add_prompt";
        model_internal::_cmpy_log_ld_delValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_log_ld_del);
        model_internal::_cmpy_log_ld_delValidator.required = true;
        model_internal::_cmpy_log_ld_delValidator.requiredFieldError = "cmpy_log_ld_del is required";
        //model_internal::_cmpy_log_ld_delValidator.source = model_internal::_instance;
        //model_internal::_cmpy_log_ld_delValidator.property = "cmpy_log_ld_del";
        model_internal::_cmpy_auto_ldValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_auto_ld);
        model_internal::_cmpy_auto_ldValidator.required = true;
        model_internal::_cmpy_auto_ldValidator.requiredFieldError = "cmpy_auto_ld is required";
        //model_internal::_cmpy_auto_ldValidator.source = model_internal::_instance;
        //model_internal::_cmpy_auto_ldValidator.property = "cmpy_auto_ld";
        model_internal::_cmpy_typeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_type);
        model_internal::_cmpy_typeValidator.required = true;
        model_internal::_cmpy_typeValidator.requiredFieldError = "cmpy_type is required";
        //model_internal::_cmpy_typeValidator.source = model_internal::_instance;
        //model_internal::_cmpy_typeValidator.property = "cmpy_type";
        model_internal::_employerValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEmployer);
        model_internal::_employerValidator.required = true;
        model_internal::_employerValidator.requiredFieldError = "employer is required";
        //model_internal::_employerValidator.source = model_internal::_instance;
        //model_internal::_employerValidator.property = "employer";
        model_internal::_cmpy_tkr_activatValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_tkr_activat);
        model_internal::_cmpy_tkr_activatValidator.required = true;
        model_internal::_cmpy_tkr_activatValidator.requiredFieldError = "cmpy_tkr_activat is required";
        //model_internal::_cmpy_tkr_activatValidator.source = model_internal::_instance;
        //model_internal::_cmpy_tkr_activatValidator.property = "cmpy_tkr_activat";
        model_internal::_cmpy_rpt_tempValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_rpt_temp);
        model_internal::_cmpy_rpt_tempValidator.required = true;
        model_internal::_cmpy_rpt_tempValidator.requiredFieldError = "cmpy_rpt_temp is required";
        //model_internal::_cmpy_rpt_tempValidator.source = model_internal::_instance;
        //model_internal::_cmpy_rpt_tempValidator.property = "cmpy_rpt_temp";
        model_internal::_cmpy_wipe_ordetsValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_wipe_ordets);
        model_internal::_cmpy_wipe_ordetsValidator.required = true;
        model_internal::_cmpy_wipe_ordetsValidator.requiredFieldError = "cmpy_wipe_ordets is required";
        //model_internal::_cmpy_wipe_ordetsValidator.source = model_internal::_instance;
        //model_internal::_cmpy_wipe_ordetsValidator.property = "cmpy_wipe_ordets";
        model_internal::_cmpy_mod_drawerValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_mod_drawer);
        model_internal::_cmpy_mod_drawerValidator.required = true;
        model_internal::_cmpy_mod_drawerValidator.requiredFieldError = "cmpy_mod_drawer is required";
        //model_internal::_cmpy_mod_drawerValidator.source = model_internal::_instance;
        //model_internal::_cmpy_mod_drawerValidator.property = "cmpy_mod_drawer";
        model_internal::_cmpy_flag_3Validator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_flag_3);
        model_internal::_cmpy_flag_3Validator.required = true;
        model_internal::_cmpy_flag_3Validator.requiredFieldError = "cmpy_flag_3 is required";
        //model_internal::_cmpy_flag_3Validator.source = model_internal::_instance;
        //model_internal::_cmpy_flag_3Validator.property = "cmpy_flag_3";
        model_internal::_cmpy_flag_1Validator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_flag_1);
        model_internal::_cmpy_flag_1Validator.required = true;
        model_internal::_cmpy_flag_1Validator.requiredFieldError = "cmpy_flag_1 is required";
        //model_internal::_cmpy_flag_1Validator.source = model_internal::_instance;
        //model_internal::_cmpy_flag_1Validator.property = "cmpy_flag_1";
        model_internal::_cmpy_bay_loop_chValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_bay_loop_ch);
        model_internal::_cmpy_bay_loop_chValidator.required = true;
        model_internal::_cmpy_bay_loop_chValidator.requiredFieldError = "cmpy_bay_loop_ch is required";
        //model_internal::_cmpy_bay_loop_chValidator.source = model_internal::_instance;
        //model_internal::_cmpy_bay_loop_chValidator.property = "cmpy_bay_loop_ch";
        model_internal::_cmpy_flag_2Validator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_flag_2);
        model_internal::_cmpy_flag_2Validator.required = true;
        model_internal::_cmpy_flag_2Validator.requiredFieldError = "cmpy_flag_2 is required";
        //model_internal::_cmpy_flag_2Validator.source = model_internal::_instance;
        //model_internal::_cmpy_flag_2Validator.property = "cmpy_flag_2";
        model_internal::_cmpy_enable_expdValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_enable_expd);
        model_internal::_cmpy_enable_expdValidator.required = true;
        model_internal::_cmpy_enable_expdValidator.requiredFieldError = "cmpy_enable_expd is required";
        //model_internal::_cmpy_enable_expdValidator.source = model_internal::_instance;
        //model_internal::_cmpy_enable_expdValidator.property = "cmpy_enable_expd";
        model_internal::_cmpy_trip_endValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_trip_end);
        model_internal::_cmpy_trip_endValidator.required = true;
        model_internal::_cmpy_trip_endValidator.requiredFieldError = "cmpy_trip_end is required";
        //model_internal::_cmpy_trip_endValidator.source = model_internal::_instance;
        //model_internal::_cmpy_trip_endValidator.property = "cmpy_trip_end";
        model_internal::_cmpy_comms_okValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_comms_ok);
        model_internal::_cmpy_comms_okValidator.required = true;
        model_internal::_cmpy_comms_okValidator.requiredFieldError = "cmpy_comms_ok is required";
        //model_internal::_cmpy_comms_okValidator.source = model_internal::_instance;
        //model_internal::_cmpy_comms_okValidator.property = "cmpy_comms_ok";
        model_internal::_cmpy_issuValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_issu);
        model_internal::_cmpy_issuValidator.required = true;
        model_internal::_cmpy_issuValidator.requiredFieldError = "cmpy_issu is required";
        //model_internal::_cmpy_issuValidator.source = model_internal::_instance;
        //model_internal::_cmpy_issuValidator.property = "cmpy_issu";
        model_internal::_cmpy_wgh_completValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_wgh_complet);
        model_internal::_cmpy_wgh_completValidator.required = true;
        model_internal::_cmpy_wgh_completValidator.requiredFieldError = "cmpy_wgh_complet is required";
        //model_internal::_cmpy_wgh_completValidator.source = model_internal::_instance;
        //model_internal::_cmpy_wgh_completValidator.property = "cmpy_wgh_complet";
        model_internal::_cmpy_compress_blValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_compress_bl);
        model_internal::_cmpy_compress_blValidator.required = true;
        model_internal::_cmpy_compress_blValidator.requiredFieldError = "cmpy_compress_bl is required";
        //model_internal::_cmpy_compress_blValidator.source = model_internal::_instance;
        //model_internal::_cmpy_compress_blValidator.property = "cmpy_compress_bl";
        model_internal::_cmpy_plantValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_plant);
        model_internal::_cmpy_plantValidator.required = true;
        model_internal::_cmpy_plantValidator.requiredFieldError = "cmpy_plant is required";
        //model_internal::_cmpy_plantValidator.source = model_internal::_instance;
        //model_internal::_cmpy_plantValidator.property = "cmpy_plant";
        model_internal::_cmpy_auto_reconcValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_auto_reconc);
        model_internal::_cmpy_auto_reconcValidator.required = true;
        model_internal::_cmpy_auto_reconcValidator.requiredFieldError = "cmpy_auto_reconc is required";
        //model_internal::_cmpy_auto_reconcValidator.source = model_internal::_instance;
        //model_internal::_cmpy_auto_reconcValidator.property = "cmpy_auto_reconc";
        model_internal::_cmpy_bltol_flagValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_bltol_flag);
        model_internal::_cmpy_bltol_flagValidator.required = true;
        model_internal::_cmpy_bltol_flagValidator.requiredFieldError = "cmpy_bltol_flag is required";
        //model_internal::_cmpy_bltol_flagValidator.source = model_internal::_instance;
        //model_internal::_cmpy_bltol_flagValidator.property = "cmpy_bltol_flag";
        model_internal::_cmpy_must_sealnoValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_must_sealno);
        model_internal::_cmpy_must_sealnoValidator.required = true;
        model_internal::_cmpy_must_sealnoValidator.requiredFieldError = "cmpy_must_sealno is required";
        //model_internal::_cmpy_must_sealnoValidator.source = model_internal::_instance;
        //model_internal::_cmpy_must_sealnoValidator.property = "cmpy_must_sealno";
        model_internal::_cmpy_ord_lastValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_ord_last);
        model_internal::_cmpy_ord_lastValidator.required = true;
        model_internal::_cmpy_ord_lastValidator.requiredFieldError = "cmpy_ord_last is required";
        //model_internal::_cmpy_ord_lastValidator.source = model_internal::_instance;
        //model_internal::_cmpy_ord_lastValidator.property = "cmpy_ord_last";
        model_internal::_cmpy_seal_numberValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_seal_number);
        model_internal::_cmpy_seal_numberValidator.required = true;
        model_internal::_cmpy_seal_numberValidator.requiredFieldError = "cmpy_seal_number is required";
        //model_internal::_cmpy_seal_numberValidator.source = model_internal::_instance;
        //model_internal::_cmpy_seal_numberValidator.property = "cmpy_seal_number";
        model_internal::_cmpy_host_docsValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_host_docs);
        model_internal::_cmpy_host_docsValidator.required = true;
        model_internal::_cmpy_host_docsValidator.requiredFieldError = "cmpy_host_docs is required";
        //model_internal::_cmpy_host_docsValidator.source = model_internal::_instance;
        //model_internal::_cmpy_host_docsValidator.property = "cmpy_host_docs";
        model_internal::_cmpy_trip_strtValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_trip_strt);
        model_internal::_cmpy_trip_strtValidator.required = true;
        model_internal::_cmpy_trip_strtValidator.requiredFieldError = "cmpy_trip_strt is required";
        //model_internal::_cmpy_trip_strtValidator.source = model_internal::_instance;
        //model_internal::_cmpy_trip_strtValidator.property = "cmpy_trip_strt";
        model_internal::_cmpy_isseValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_isse);
        model_internal::_cmpy_isseValidator.required = true;
        model_internal::_cmpy_isseValidator.requiredFieldError = "cmpy_isse is required";
        //model_internal::_cmpy_isseValidator.source = model_internal::_instance;
        //model_internal::_cmpy_isseValidator.property = "cmpy_isse";
        model_internal::_site_managerValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSite_manager);
        model_internal::_site_managerValidator.required = true;
        model_internal::_site_managerValidator.requiredFieldError = "site_manager is required";
        //model_internal::_site_managerValidator.source = model_internal::_instance;
        //model_internal::_site_managerValidator.property = "site_manager";
        model_internal::_cmpy_wgh_auto_flValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_wgh_auto_fl);
        model_internal::_cmpy_wgh_auto_flValidator.required = true;
        model_internal::_cmpy_wgh_auto_flValidator.requiredFieldError = "cmpy_wgh_auto_fl is required";
        //model_internal::_cmpy_wgh_auto_flValidator.source = model_internal::_instance;
        //model_internal::_cmpy_wgh_auto_flValidator.property = "cmpy_wgh_auto_fl";
        model_internal::_cmpy_req_pin_flagValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_req_pin_flag);
        model_internal::_cmpy_req_pin_flagValidator.required = true;
        model_internal::_cmpy_req_pin_flagValidator.requiredFieldError = "cmpy_req_pin_flag is required";
        //model_internal::_cmpy_req_pin_flagValidator.source = model_internal::_instance;
        //model_internal::_cmpy_req_pin_flagValidator.property = "cmpy_req_pin_flag";
        model_internal::_cmpy_check_licenValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_check_licen);
        model_internal::_cmpy_check_licenValidator.required = true;
        model_internal::_cmpy_check_licenValidator.requiredFieldError = "cmpy_check_licen is required";
        //model_internal::_cmpy_check_licenValidator.source = model_internal::_instance;
        //model_internal::_cmpy_check_licenValidator.property = "cmpy_check_licen";
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
            throw new Error(propertyName + " is not a data property of entity Companys");
            
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
            throw new Error(propertyName + " is not a collection property of entity Companys");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of Companys");

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
            throw new Error(propertyName + " does not exist for entity Companys");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity Companys");
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
            throw new Error(propertyName + " does not exist for entity Companys");
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
    public function get isCmpy_ord_carrierAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_ldtol_flagAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_drv_inst_vpAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCustomerAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isDrawerAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_movements_revAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_aoiAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_ldgo_deltaAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_rpt_t_unitAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCarrierAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_msgAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSupplierAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_hostAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isHostAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_ord_endAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_tkr_cfgAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_exp_cpdeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_ord_strtAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_exp_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_ld_rep_vpAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_vetAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isIssuerAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_rtn_promptAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_schd_archiveAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_bol_vp_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_trip_lastAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_schd_rev_repostAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_add_promptAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_log_ld_delAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_auto_ldAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_typeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEmployerAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_tkr_activatAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_rpt_tempAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_wipe_ordetsAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_mod_drawerAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_flag_3Available():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_flag_1Available():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_bay_loop_chAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_flag_2Available():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_enable_expdAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_trip_endAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_comms_okAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_issuAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_wgh_completAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_compress_blAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_plantAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_auto_reconcAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_bltol_flagAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_must_sealnoAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_ord_lastAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_seal_numberAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_host_docsAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_trip_strtAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_isseAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSite_managerAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_wgh_auto_flAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_req_pin_flagAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_check_licenAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnCmpy_ord_carrier():void
    {
        if (model_internal::_cmpy_ord_carrierIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_ord_carrier = null;
            model_internal::calculateCmpy_ord_carrierIsValid();
        }
    }
    public function invalidateDependentOnCmpy_ldtol_flag():void
    {
        if (model_internal::_cmpy_ldtol_flagIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_ldtol_flag = null;
            model_internal::calculateCmpy_ldtol_flagIsValid();
        }
    }
    public function invalidateDependentOnCmpy_drv_inst_vp():void
    {
        if (model_internal::_cmpy_drv_inst_vpIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_drv_inst_vp = null;
            model_internal::calculateCmpy_drv_inst_vpIsValid();
        }
    }
    public function invalidateDependentOnCustomer():void
    {
        if (model_internal::_customerIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCustomer = null;
            model_internal::calculateCustomerIsValid();
        }
    }
    public function invalidateDependentOnDrawer():void
    {
        if (model_internal::_drawerIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfDrawer = null;
            model_internal::calculateDrawerIsValid();
        }
    }
    public function invalidateDependentOnCmpy_movements_rev():void
    {
        if (model_internal::_cmpy_movements_revIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_movements_rev = null;
            model_internal::calculateCmpy_movements_revIsValid();
        }
    }
    public function invalidateDependentOnCmpy_aoi():void
    {
        if (model_internal::_cmpy_aoiIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_aoi = null;
            model_internal::calculateCmpy_aoiIsValid();
        }
    }
    public function invalidateDependentOnCmpy_ldgo_delta():void
    {
        if (model_internal::_cmpy_ldgo_deltaIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_ldgo_delta = null;
            model_internal::calculateCmpy_ldgo_deltaIsValid();
        }
    }
    public function invalidateDependentOnCmpy_rpt_t_unit():void
    {
        if (model_internal::_cmpy_rpt_t_unitIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_rpt_t_unit = null;
            model_internal::calculateCmpy_rpt_t_unitIsValid();
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
    public function invalidateDependentOnCmpy_msg():void
    {
        if (model_internal::_cmpy_msgIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_msg = null;
            model_internal::calculateCmpy_msgIsValid();
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
    public function invalidateDependentOnCmpy_host():void
    {
        if (model_internal::_cmpy_hostIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_host = null;
            model_internal::calculateCmpy_hostIsValid();
        }
    }
    public function invalidateDependentOnHost():void
    {
        if (model_internal::_hostIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfHost = null;
            model_internal::calculateHostIsValid();
        }
    }
    public function invalidateDependentOnCmpy_ord_end():void
    {
        if (model_internal::_cmpy_ord_endIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_ord_end = null;
            model_internal::calculateCmpy_ord_endIsValid();
        }
    }
    public function invalidateDependentOnCmpy_tkr_cfg():void
    {
        if (model_internal::_cmpy_tkr_cfgIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_tkr_cfg = null;
            model_internal::calculateCmpy_tkr_cfgIsValid();
        }
    }
    public function invalidateDependentOnCmpy_exp_cpde():void
    {
        if (model_internal::_cmpy_exp_cpdeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_exp_cpde = null;
            model_internal::calculateCmpy_exp_cpdeIsValid();
        }
    }
    public function invalidateDependentOnCmpy_code():void
    {
        if (model_internal::_cmpy_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_code = null;
            model_internal::calculateCmpy_codeIsValid();
        }
    }
    public function invalidateDependentOnCmpy_ord_strt():void
    {
        if (model_internal::_cmpy_ord_strtIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_ord_strt = null;
            model_internal::calculateCmpy_ord_strtIsValid();
        }
    }
    public function invalidateDependentOnCmpy_exp_code():void
    {
        if (model_internal::_cmpy_exp_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_exp_code = null;
            model_internal::calculateCmpy_exp_codeIsValid();
        }
    }
    public function invalidateDependentOnCmpy_name():void
    {
        if (model_internal::_cmpy_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_name = null;
            model_internal::calculateCmpy_nameIsValid();
        }
    }
    public function invalidateDependentOnCmpy_ld_rep_vp():void
    {
        if (model_internal::_cmpy_ld_rep_vpIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_ld_rep_vp = null;
            model_internal::calculateCmpy_ld_rep_vpIsValid();
        }
    }
    public function invalidateDependentOnCmpy_vet():void
    {
        if (model_internal::_cmpy_vetIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_vet = null;
            model_internal::calculateCmpy_vetIsValid();
        }
    }
    public function invalidateDependentOnIssuer():void
    {
        if (model_internal::_issuerIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfIssuer = null;
            model_internal::calculateIssuerIsValid();
        }
    }
    public function invalidateDependentOnCmpy_rtn_prompt():void
    {
        if (model_internal::_cmpy_rtn_promptIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_rtn_prompt = null;
            model_internal::calculateCmpy_rtn_promptIsValid();
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
    public function invalidateDependentOnCmpy_bol_vp_name():void
    {
        if (model_internal::_cmpy_bol_vp_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_bol_vp_name = null;
            model_internal::calculateCmpy_bol_vp_nameIsValid();
        }
    }
    public function invalidateDependentOnCmpy_trip_last():void
    {
        if (model_internal::_cmpy_trip_lastIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_trip_last = null;
            model_internal::calculateCmpy_trip_lastIsValid();
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
    public function invalidateDependentOnCmpy_add_prompt():void
    {
        if (model_internal::_cmpy_add_promptIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_add_prompt = null;
            model_internal::calculateCmpy_add_promptIsValid();
        }
    }
    public function invalidateDependentOnCmpy_log_ld_del():void
    {
        if (model_internal::_cmpy_log_ld_delIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_log_ld_del = null;
            model_internal::calculateCmpy_log_ld_delIsValid();
        }
    }
    public function invalidateDependentOnCmpy_auto_ld():void
    {
        if (model_internal::_cmpy_auto_ldIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_auto_ld = null;
            model_internal::calculateCmpy_auto_ldIsValid();
        }
    }
    public function invalidateDependentOnCmpy_type():void
    {
        if (model_internal::_cmpy_typeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_type = null;
            model_internal::calculateCmpy_typeIsValid();
        }
    }
    public function invalidateDependentOnEmployer():void
    {
        if (model_internal::_employerIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEmployer = null;
            model_internal::calculateEmployerIsValid();
        }
    }
    public function invalidateDependentOnCmpy_tkr_activat():void
    {
        if (model_internal::_cmpy_tkr_activatIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_tkr_activat = null;
            model_internal::calculateCmpy_tkr_activatIsValid();
        }
    }
    public function invalidateDependentOnCmpy_rpt_temp():void
    {
        if (model_internal::_cmpy_rpt_tempIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_rpt_temp = null;
            model_internal::calculateCmpy_rpt_tempIsValid();
        }
    }
    public function invalidateDependentOnCmpy_wipe_ordets():void
    {
        if (model_internal::_cmpy_wipe_ordetsIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_wipe_ordets = null;
            model_internal::calculateCmpy_wipe_ordetsIsValid();
        }
    }
    public function invalidateDependentOnCmpy_mod_drawer():void
    {
        if (model_internal::_cmpy_mod_drawerIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_mod_drawer = null;
            model_internal::calculateCmpy_mod_drawerIsValid();
        }
    }
    public function invalidateDependentOnCmpy_flag_3():void
    {
        if (model_internal::_cmpy_flag_3IsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_flag_3 = null;
            model_internal::calculateCmpy_flag_3IsValid();
        }
    }
    public function invalidateDependentOnCmpy_flag_1():void
    {
        if (model_internal::_cmpy_flag_1IsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_flag_1 = null;
            model_internal::calculateCmpy_flag_1IsValid();
        }
    }
    public function invalidateDependentOnCmpy_bay_loop_ch():void
    {
        if (model_internal::_cmpy_bay_loop_chIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_bay_loop_ch = null;
            model_internal::calculateCmpy_bay_loop_chIsValid();
        }
    }
    public function invalidateDependentOnCmpy_flag_2():void
    {
        if (model_internal::_cmpy_flag_2IsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_flag_2 = null;
            model_internal::calculateCmpy_flag_2IsValid();
        }
    }
    public function invalidateDependentOnCmpy_enable_expd():void
    {
        if (model_internal::_cmpy_enable_expdIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_enable_expd = null;
            model_internal::calculateCmpy_enable_expdIsValid();
        }
    }
    public function invalidateDependentOnCmpy_trip_end():void
    {
        if (model_internal::_cmpy_trip_endIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_trip_end = null;
            model_internal::calculateCmpy_trip_endIsValid();
        }
    }
    public function invalidateDependentOnCmpy_comms_ok():void
    {
        if (model_internal::_cmpy_comms_okIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_comms_ok = null;
            model_internal::calculateCmpy_comms_okIsValid();
        }
    }
    public function invalidateDependentOnCmpy_issu():void
    {
        if (model_internal::_cmpy_issuIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_issu = null;
            model_internal::calculateCmpy_issuIsValid();
        }
    }
    public function invalidateDependentOnCmpy_wgh_complet():void
    {
        if (model_internal::_cmpy_wgh_completIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_wgh_complet = null;
            model_internal::calculateCmpy_wgh_completIsValid();
        }
    }
    public function invalidateDependentOnCmpy_compress_bl():void
    {
        if (model_internal::_cmpy_compress_blIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_compress_bl = null;
            model_internal::calculateCmpy_compress_blIsValid();
        }
    }
    public function invalidateDependentOnCmpy_plant():void
    {
        if (model_internal::_cmpy_plantIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_plant = null;
            model_internal::calculateCmpy_plantIsValid();
        }
    }
    public function invalidateDependentOnCmpy_auto_reconc():void
    {
        if (model_internal::_cmpy_auto_reconcIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_auto_reconc = null;
            model_internal::calculateCmpy_auto_reconcIsValid();
        }
    }
    public function invalidateDependentOnCmpy_bltol_flag():void
    {
        if (model_internal::_cmpy_bltol_flagIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_bltol_flag = null;
            model_internal::calculateCmpy_bltol_flagIsValid();
        }
    }
    public function invalidateDependentOnCmpy_must_sealno():void
    {
        if (model_internal::_cmpy_must_sealnoIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_must_sealno = null;
            model_internal::calculateCmpy_must_sealnoIsValid();
        }
    }
    public function invalidateDependentOnCmpy_ord_last():void
    {
        if (model_internal::_cmpy_ord_lastIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_ord_last = null;
            model_internal::calculateCmpy_ord_lastIsValid();
        }
    }
    public function invalidateDependentOnCmpy_seal_number():void
    {
        if (model_internal::_cmpy_seal_numberIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_seal_number = null;
            model_internal::calculateCmpy_seal_numberIsValid();
        }
    }
    public function invalidateDependentOnCmpy_host_docs():void
    {
        if (model_internal::_cmpy_host_docsIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_host_docs = null;
            model_internal::calculateCmpy_host_docsIsValid();
        }
    }
    public function invalidateDependentOnCmpy_trip_strt():void
    {
        if (model_internal::_cmpy_trip_strtIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_trip_strt = null;
            model_internal::calculateCmpy_trip_strtIsValid();
        }
    }
    public function invalidateDependentOnCmpy_isse():void
    {
        if (model_internal::_cmpy_isseIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_isse = null;
            model_internal::calculateCmpy_isseIsValid();
        }
    }
    public function invalidateDependentOnSite_manager():void
    {
        if (model_internal::_site_managerIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSite_manager = null;
            model_internal::calculateSite_managerIsValid();
        }
    }
    public function invalidateDependentOnCmpy_wgh_auto_fl():void
    {
        if (model_internal::_cmpy_wgh_auto_flIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_wgh_auto_fl = null;
            model_internal::calculateCmpy_wgh_auto_flIsValid();
        }
    }
    public function invalidateDependentOnCmpy_req_pin_flag():void
    {
        if (model_internal::_cmpy_req_pin_flagIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_req_pin_flag = null;
            model_internal::calculateCmpy_req_pin_flagIsValid();
        }
    }
    public function invalidateDependentOnCmpy_check_licen():void
    {
        if (model_internal::_cmpy_check_licenIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_check_licen = null;
            model_internal::calculateCmpy_check_licenIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_ord_carrierStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_ord_carrierValidator() : StyleValidator
    {
        return model_internal::_cmpy_ord_carrierValidator;
    }

    model_internal function set _cmpy_ord_carrierIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_ord_carrierIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_ord_carrierIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_ord_carrierIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_ord_carrierIsValid():Boolean
    {
        if (!model_internal::_cmpy_ord_carrierIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_ord_carrierIsValid();
        }

        return model_internal::_cmpy_ord_carrierIsValid;
    }

    model_internal function calculateCmpy_ord_carrierIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_ord_carrierValidator.validate(model_internal::_instance.cmpy_ord_carrier)
        model_internal::_cmpy_ord_carrierIsValid_der = (valRes.results == null);
        model_internal::_cmpy_ord_carrierIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_ord_carrierValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_ord_carrierValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_ord_carrierValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_ord_carrierValidationFailureMessages == null)
            model_internal::calculateCmpy_ord_carrierIsValid();

        return _cmpy_ord_carrierValidationFailureMessages;
    }

    model_internal function set cmpy_ord_carrierValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_ord_carrierValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_ord_carrierValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_ord_carrierValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_ldtol_flagStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_ldtol_flagValidator() : StyleValidator
    {
        return model_internal::_cmpy_ldtol_flagValidator;
    }

    model_internal function set _cmpy_ldtol_flagIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_ldtol_flagIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_ldtol_flagIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_ldtol_flagIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_ldtol_flagIsValid():Boolean
    {
        if (!model_internal::_cmpy_ldtol_flagIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_ldtol_flagIsValid();
        }

        return model_internal::_cmpy_ldtol_flagIsValid;
    }

    model_internal function calculateCmpy_ldtol_flagIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_ldtol_flagValidator.validate(model_internal::_instance.cmpy_ldtol_flag)
        model_internal::_cmpy_ldtol_flagIsValid_der = (valRes.results == null);
        model_internal::_cmpy_ldtol_flagIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_ldtol_flagValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_ldtol_flagValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_ldtol_flagValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_ldtol_flagValidationFailureMessages == null)
            model_internal::calculateCmpy_ldtol_flagIsValid();

        return _cmpy_ldtol_flagValidationFailureMessages;
    }

    model_internal function set cmpy_ldtol_flagValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_ldtol_flagValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_ldtol_flagValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_ldtol_flagValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_drv_inst_vpStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_drv_inst_vpValidator() : StyleValidator
    {
        return model_internal::_cmpy_drv_inst_vpValidator;
    }

    model_internal function set _cmpy_drv_inst_vpIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_drv_inst_vpIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_drv_inst_vpIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_drv_inst_vpIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_drv_inst_vpIsValid():Boolean
    {
        if (!model_internal::_cmpy_drv_inst_vpIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_drv_inst_vpIsValid();
        }

        return model_internal::_cmpy_drv_inst_vpIsValid;
    }

    model_internal function calculateCmpy_drv_inst_vpIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_drv_inst_vpValidator.validate(model_internal::_instance.cmpy_drv_inst_vp)
        model_internal::_cmpy_drv_inst_vpIsValid_der = (valRes.results == null);
        model_internal::_cmpy_drv_inst_vpIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_drv_inst_vpValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_drv_inst_vpValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_drv_inst_vpValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_drv_inst_vpValidationFailureMessages == null)
            model_internal::calculateCmpy_drv_inst_vpIsValid();

        return _cmpy_drv_inst_vpValidationFailureMessages;
    }

    model_internal function set cmpy_drv_inst_vpValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_drv_inst_vpValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_drv_inst_vpValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_drv_inst_vpValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get customerStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get customerValidator() : StyleValidator
    {
        return model_internal::_customerValidator;
    }

    model_internal function set _customerIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_customerIsValid;         
        if (oldValue !== value)
        {
            model_internal::_customerIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "customerIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get customerIsValid():Boolean
    {
        if (!model_internal::_customerIsValidCacheInitialized)
        {
            model_internal::calculateCustomerIsValid();
        }

        return model_internal::_customerIsValid;
    }

    model_internal function calculateCustomerIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_customerValidator.validate(model_internal::_instance.customer)
        model_internal::_customerIsValid_der = (valRes.results == null);
        model_internal::_customerIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::customerValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::customerValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get customerValidationFailureMessages():Array
    {
        if (model_internal::_customerValidationFailureMessages == null)
            model_internal::calculateCustomerIsValid();

        return _customerValidationFailureMessages;
    }

    model_internal function set customerValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_customerValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_customerValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "customerValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get drawerStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get drawerValidator() : StyleValidator
    {
        return model_internal::_drawerValidator;
    }

    model_internal function set _drawerIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_drawerIsValid;         
        if (oldValue !== value)
        {
            model_internal::_drawerIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "drawerIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get drawerIsValid():Boolean
    {
        if (!model_internal::_drawerIsValidCacheInitialized)
        {
            model_internal::calculateDrawerIsValid();
        }

        return model_internal::_drawerIsValid;
    }

    model_internal function calculateDrawerIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_drawerValidator.validate(model_internal::_instance.drawer)
        model_internal::_drawerIsValid_der = (valRes.results == null);
        model_internal::_drawerIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::drawerValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::drawerValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get drawerValidationFailureMessages():Array
    {
        if (model_internal::_drawerValidationFailureMessages == null)
            model_internal::calculateDrawerIsValid();

        return _drawerValidationFailureMessages;
    }

    model_internal function set drawerValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_drawerValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_drawerValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "drawerValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_movements_revStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_movements_revValidator() : StyleValidator
    {
        return model_internal::_cmpy_movements_revValidator;
    }

    model_internal function set _cmpy_movements_revIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_movements_revIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_movements_revIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_movements_revIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_movements_revIsValid():Boolean
    {
        if (!model_internal::_cmpy_movements_revIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_movements_revIsValid();
        }

        return model_internal::_cmpy_movements_revIsValid;
    }

    model_internal function calculateCmpy_movements_revIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_movements_revValidator.validate(model_internal::_instance.cmpy_movements_rev)
        model_internal::_cmpy_movements_revIsValid_der = (valRes.results == null);
        model_internal::_cmpy_movements_revIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_movements_revValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_movements_revValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_movements_revValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_movements_revValidationFailureMessages == null)
            model_internal::calculateCmpy_movements_revIsValid();

        return _cmpy_movements_revValidationFailureMessages;
    }

    model_internal function set cmpy_movements_revValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_movements_revValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_movements_revValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_movements_revValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_aoiStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_aoiValidator() : StyleValidator
    {
        return model_internal::_cmpy_aoiValidator;
    }

    model_internal function set _cmpy_aoiIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_aoiIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_aoiIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_aoiIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_aoiIsValid():Boolean
    {
        if (!model_internal::_cmpy_aoiIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_aoiIsValid();
        }

        return model_internal::_cmpy_aoiIsValid;
    }

    model_internal function calculateCmpy_aoiIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_aoiValidator.validate(model_internal::_instance.cmpy_aoi)
        model_internal::_cmpy_aoiIsValid_der = (valRes.results == null);
        model_internal::_cmpy_aoiIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_aoiValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_aoiValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_aoiValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_aoiValidationFailureMessages == null)
            model_internal::calculateCmpy_aoiIsValid();

        return _cmpy_aoiValidationFailureMessages;
    }

    model_internal function set cmpy_aoiValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_aoiValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_aoiValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_aoiValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_ldgo_deltaStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_ldgo_deltaValidator() : StyleValidator
    {
        return model_internal::_cmpy_ldgo_deltaValidator;
    }

    model_internal function set _cmpy_ldgo_deltaIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_ldgo_deltaIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_ldgo_deltaIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_ldgo_deltaIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_ldgo_deltaIsValid():Boolean
    {
        if (!model_internal::_cmpy_ldgo_deltaIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_ldgo_deltaIsValid();
        }

        return model_internal::_cmpy_ldgo_deltaIsValid;
    }

    model_internal function calculateCmpy_ldgo_deltaIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_ldgo_deltaValidator.validate(model_internal::_instance.cmpy_ldgo_delta)
        model_internal::_cmpy_ldgo_deltaIsValid_der = (valRes.results == null);
        model_internal::_cmpy_ldgo_deltaIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_ldgo_deltaValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_ldgo_deltaValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_ldgo_deltaValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_ldgo_deltaValidationFailureMessages == null)
            model_internal::calculateCmpy_ldgo_deltaIsValid();

        return _cmpy_ldgo_deltaValidationFailureMessages;
    }

    model_internal function set cmpy_ldgo_deltaValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_ldgo_deltaValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_ldgo_deltaValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_ldgo_deltaValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_rpt_t_unitStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_rpt_t_unitValidator() : StyleValidator
    {
        return model_internal::_cmpy_rpt_t_unitValidator;
    }

    model_internal function set _cmpy_rpt_t_unitIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_rpt_t_unitIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_rpt_t_unitIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_rpt_t_unitIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_rpt_t_unitIsValid():Boolean
    {
        if (!model_internal::_cmpy_rpt_t_unitIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_rpt_t_unitIsValid();
        }

        return model_internal::_cmpy_rpt_t_unitIsValid;
    }

    model_internal function calculateCmpy_rpt_t_unitIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_rpt_t_unitValidator.validate(model_internal::_instance.cmpy_rpt_t_unit)
        model_internal::_cmpy_rpt_t_unitIsValid_der = (valRes.results == null);
        model_internal::_cmpy_rpt_t_unitIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_rpt_t_unitValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_rpt_t_unitValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_rpt_t_unitValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_rpt_t_unitValidationFailureMessages == null)
            model_internal::calculateCmpy_rpt_t_unitIsValid();

        return _cmpy_rpt_t_unitValidationFailureMessages;
    }

    model_internal function set cmpy_rpt_t_unitValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_rpt_t_unitValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_rpt_t_unitValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_rpt_t_unitValidationFailureMessages", oldValue, value));
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
    public function get cmpy_msgStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_msgValidator() : StyleValidator
    {
        return model_internal::_cmpy_msgValidator;
    }

    model_internal function set _cmpy_msgIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_msgIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_msgIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_msgIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_msgIsValid():Boolean
    {
        if (!model_internal::_cmpy_msgIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_msgIsValid();
        }

        return model_internal::_cmpy_msgIsValid;
    }

    model_internal function calculateCmpy_msgIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_msgValidator.validate(model_internal::_instance.cmpy_msg)
        model_internal::_cmpy_msgIsValid_der = (valRes.results == null);
        model_internal::_cmpy_msgIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_msgValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_msgValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_msgValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_msgValidationFailureMessages == null)
            model_internal::calculateCmpy_msgIsValid();

        return _cmpy_msgValidationFailureMessages;
    }

    model_internal function set cmpy_msgValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_msgValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_msgValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_msgValidationFailureMessages", oldValue, value));
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
    public function get cmpy_hostStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_hostValidator() : StyleValidator
    {
        return model_internal::_cmpy_hostValidator;
    }

    model_internal function set _cmpy_hostIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_hostIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_hostIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_hostIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_hostIsValid():Boolean
    {
        if (!model_internal::_cmpy_hostIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_hostIsValid();
        }

        return model_internal::_cmpy_hostIsValid;
    }

    model_internal function calculateCmpy_hostIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_hostValidator.validate(model_internal::_instance.cmpy_host)
        model_internal::_cmpy_hostIsValid_der = (valRes.results == null);
        model_internal::_cmpy_hostIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_hostValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_hostValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_hostValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_hostValidationFailureMessages == null)
            model_internal::calculateCmpy_hostIsValid();

        return _cmpy_hostValidationFailureMessages;
    }

    model_internal function set cmpy_hostValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_hostValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_hostValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_hostValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get hostStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get hostValidator() : StyleValidator
    {
        return model_internal::_hostValidator;
    }

    model_internal function set _hostIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_hostIsValid;         
        if (oldValue !== value)
        {
            model_internal::_hostIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "hostIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get hostIsValid():Boolean
    {
        if (!model_internal::_hostIsValidCacheInitialized)
        {
            model_internal::calculateHostIsValid();
        }

        return model_internal::_hostIsValid;
    }

    model_internal function calculateHostIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_hostValidator.validate(model_internal::_instance.host)
        model_internal::_hostIsValid_der = (valRes.results == null);
        model_internal::_hostIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::hostValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::hostValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get hostValidationFailureMessages():Array
    {
        if (model_internal::_hostValidationFailureMessages == null)
            model_internal::calculateHostIsValid();

        return _hostValidationFailureMessages;
    }

    model_internal function set hostValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_hostValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_hostValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "hostValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_ord_endStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_ord_endValidator() : StyleValidator
    {
        return model_internal::_cmpy_ord_endValidator;
    }

    model_internal function set _cmpy_ord_endIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_ord_endIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_ord_endIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_ord_endIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_ord_endIsValid():Boolean
    {
        if (!model_internal::_cmpy_ord_endIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_ord_endIsValid();
        }

        return model_internal::_cmpy_ord_endIsValid;
    }

    model_internal function calculateCmpy_ord_endIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_ord_endValidator.validate(model_internal::_instance.cmpy_ord_end)
        model_internal::_cmpy_ord_endIsValid_der = (valRes.results == null);
        model_internal::_cmpy_ord_endIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_ord_endValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_ord_endValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_ord_endValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_ord_endValidationFailureMessages == null)
            model_internal::calculateCmpy_ord_endIsValid();

        return _cmpy_ord_endValidationFailureMessages;
    }

    model_internal function set cmpy_ord_endValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_ord_endValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_ord_endValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_ord_endValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_tkr_cfgStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_tkr_cfgValidator() : StyleValidator
    {
        return model_internal::_cmpy_tkr_cfgValidator;
    }

    model_internal function set _cmpy_tkr_cfgIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_tkr_cfgIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_tkr_cfgIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_tkr_cfgIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_tkr_cfgIsValid():Boolean
    {
        if (!model_internal::_cmpy_tkr_cfgIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_tkr_cfgIsValid();
        }

        return model_internal::_cmpy_tkr_cfgIsValid;
    }

    model_internal function calculateCmpy_tkr_cfgIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_tkr_cfgValidator.validate(model_internal::_instance.cmpy_tkr_cfg)
        model_internal::_cmpy_tkr_cfgIsValid_der = (valRes.results == null);
        model_internal::_cmpy_tkr_cfgIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_tkr_cfgValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_tkr_cfgValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_tkr_cfgValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_tkr_cfgValidationFailureMessages == null)
            model_internal::calculateCmpy_tkr_cfgIsValid();

        return _cmpy_tkr_cfgValidationFailureMessages;
    }

    model_internal function set cmpy_tkr_cfgValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_tkr_cfgValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_tkr_cfgValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_tkr_cfgValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_exp_cpdeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_exp_cpdeValidator() : StyleValidator
    {
        return model_internal::_cmpy_exp_cpdeValidator;
    }

    model_internal function set _cmpy_exp_cpdeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_exp_cpdeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_exp_cpdeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_exp_cpdeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_exp_cpdeIsValid():Boolean
    {
        if (!model_internal::_cmpy_exp_cpdeIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_exp_cpdeIsValid();
        }

        return model_internal::_cmpy_exp_cpdeIsValid;
    }

    model_internal function calculateCmpy_exp_cpdeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_exp_cpdeValidator.validate(model_internal::_instance.cmpy_exp_cpde)
        model_internal::_cmpy_exp_cpdeIsValid_der = (valRes.results == null);
        model_internal::_cmpy_exp_cpdeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_exp_cpdeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_exp_cpdeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_exp_cpdeValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_exp_cpdeValidationFailureMessages == null)
            model_internal::calculateCmpy_exp_cpdeIsValid();

        return _cmpy_exp_cpdeValidationFailureMessages;
    }

    model_internal function set cmpy_exp_cpdeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_exp_cpdeValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_exp_cpdeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_exp_cpdeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_codeValidator() : StyleValidator
    {
        return model_internal::_cmpy_codeValidator;
    }

    model_internal function set _cmpy_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_codeIsValid():Boolean
    {
        if (!model_internal::_cmpy_codeIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_codeIsValid();
        }

        return model_internal::_cmpy_codeIsValid;
    }

    model_internal function calculateCmpy_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_codeValidator.validate(model_internal::_instance.cmpy_code)
        model_internal::_cmpy_codeIsValid_der = (valRes.results == null);
        model_internal::_cmpy_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_codeValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_codeValidationFailureMessages == null)
            model_internal::calculateCmpy_codeIsValid();

        return _cmpy_codeValidationFailureMessages;
    }

    model_internal function set cmpy_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_codeValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_ord_strtStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_ord_strtValidator() : StyleValidator
    {
        return model_internal::_cmpy_ord_strtValidator;
    }

    model_internal function set _cmpy_ord_strtIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_ord_strtIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_ord_strtIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_ord_strtIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_ord_strtIsValid():Boolean
    {
        if (!model_internal::_cmpy_ord_strtIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_ord_strtIsValid();
        }

        return model_internal::_cmpy_ord_strtIsValid;
    }

    model_internal function calculateCmpy_ord_strtIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_ord_strtValidator.validate(model_internal::_instance.cmpy_ord_strt)
        model_internal::_cmpy_ord_strtIsValid_der = (valRes.results == null);
        model_internal::_cmpy_ord_strtIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_ord_strtValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_ord_strtValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_ord_strtValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_ord_strtValidationFailureMessages == null)
            model_internal::calculateCmpy_ord_strtIsValid();

        return _cmpy_ord_strtValidationFailureMessages;
    }

    model_internal function set cmpy_ord_strtValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_ord_strtValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_ord_strtValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_ord_strtValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_exp_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_exp_codeValidator() : StyleValidator
    {
        return model_internal::_cmpy_exp_codeValidator;
    }

    model_internal function set _cmpy_exp_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_exp_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_exp_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_exp_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_exp_codeIsValid():Boolean
    {
        if (!model_internal::_cmpy_exp_codeIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_exp_codeIsValid();
        }

        return model_internal::_cmpy_exp_codeIsValid;
    }

    model_internal function calculateCmpy_exp_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_exp_codeValidator.validate(model_internal::_instance.cmpy_exp_code)
        model_internal::_cmpy_exp_codeIsValid_der = (valRes.results == null);
        model_internal::_cmpy_exp_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_exp_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_exp_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_exp_codeValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_exp_codeValidationFailureMessages == null)
            model_internal::calculateCmpy_exp_codeIsValid();

        return _cmpy_exp_codeValidationFailureMessages;
    }

    model_internal function set cmpy_exp_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_exp_codeValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_exp_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_exp_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_nameValidator() : StyleValidator
    {
        return model_internal::_cmpy_nameValidator;
    }

    model_internal function set _cmpy_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_nameIsValid():Boolean
    {
        if (!model_internal::_cmpy_nameIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_nameIsValid();
        }

        return model_internal::_cmpy_nameIsValid;
    }

    model_internal function calculateCmpy_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_nameValidator.validate(model_internal::_instance.cmpy_name)
        model_internal::_cmpy_nameIsValid_der = (valRes.results == null);
        model_internal::_cmpy_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_nameValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_nameValidationFailureMessages == null)
            model_internal::calculateCmpy_nameIsValid();

        return _cmpy_nameValidationFailureMessages;
    }

    model_internal function set cmpy_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_nameValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_ld_rep_vpStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_ld_rep_vpValidator() : StyleValidator
    {
        return model_internal::_cmpy_ld_rep_vpValidator;
    }

    model_internal function set _cmpy_ld_rep_vpIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_ld_rep_vpIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_ld_rep_vpIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_ld_rep_vpIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_ld_rep_vpIsValid():Boolean
    {
        if (!model_internal::_cmpy_ld_rep_vpIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_ld_rep_vpIsValid();
        }

        return model_internal::_cmpy_ld_rep_vpIsValid;
    }

    model_internal function calculateCmpy_ld_rep_vpIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_ld_rep_vpValidator.validate(model_internal::_instance.cmpy_ld_rep_vp)
        model_internal::_cmpy_ld_rep_vpIsValid_der = (valRes.results == null);
        model_internal::_cmpy_ld_rep_vpIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_ld_rep_vpValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_ld_rep_vpValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_ld_rep_vpValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_ld_rep_vpValidationFailureMessages == null)
            model_internal::calculateCmpy_ld_rep_vpIsValid();

        return _cmpy_ld_rep_vpValidationFailureMessages;
    }

    model_internal function set cmpy_ld_rep_vpValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_ld_rep_vpValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_ld_rep_vpValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_ld_rep_vpValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_vetStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_vetValidator() : StyleValidator
    {
        return model_internal::_cmpy_vetValidator;
    }

    model_internal function set _cmpy_vetIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_vetIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_vetIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_vetIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_vetIsValid():Boolean
    {
        if (!model_internal::_cmpy_vetIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_vetIsValid();
        }

        return model_internal::_cmpy_vetIsValid;
    }

    model_internal function calculateCmpy_vetIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_vetValidator.validate(model_internal::_instance.cmpy_vet)
        model_internal::_cmpy_vetIsValid_der = (valRes.results == null);
        model_internal::_cmpy_vetIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_vetValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_vetValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_vetValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_vetValidationFailureMessages == null)
            model_internal::calculateCmpy_vetIsValid();

        return _cmpy_vetValidationFailureMessages;
    }

    model_internal function set cmpy_vetValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_vetValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_vetValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_vetValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get issuerStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get issuerValidator() : StyleValidator
    {
        return model_internal::_issuerValidator;
    }

    model_internal function set _issuerIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_issuerIsValid;         
        if (oldValue !== value)
        {
            model_internal::_issuerIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "issuerIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get issuerIsValid():Boolean
    {
        if (!model_internal::_issuerIsValidCacheInitialized)
        {
            model_internal::calculateIssuerIsValid();
        }

        return model_internal::_issuerIsValid;
    }

    model_internal function calculateIssuerIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_issuerValidator.validate(model_internal::_instance.issuer)
        model_internal::_issuerIsValid_der = (valRes.results == null);
        model_internal::_issuerIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::issuerValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::issuerValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get issuerValidationFailureMessages():Array
    {
        if (model_internal::_issuerValidationFailureMessages == null)
            model_internal::calculateIssuerIsValid();

        return _issuerValidationFailureMessages;
    }

    model_internal function set issuerValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_issuerValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_issuerValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "issuerValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_rtn_promptStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_rtn_promptValidator() : StyleValidator
    {
        return model_internal::_cmpy_rtn_promptValidator;
    }

    model_internal function set _cmpy_rtn_promptIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_rtn_promptIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_rtn_promptIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_rtn_promptIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_rtn_promptIsValid():Boolean
    {
        if (!model_internal::_cmpy_rtn_promptIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_rtn_promptIsValid();
        }

        return model_internal::_cmpy_rtn_promptIsValid;
    }

    model_internal function calculateCmpy_rtn_promptIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_rtn_promptValidator.validate(model_internal::_instance.cmpy_rtn_prompt)
        model_internal::_cmpy_rtn_promptIsValid_der = (valRes.results == null);
        model_internal::_cmpy_rtn_promptIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_rtn_promptValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_rtn_promptValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_rtn_promptValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_rtn_promptValidationFailureMessages == null)
            model_internal::calculateCmpy_rtn_promptIsValid();

        return _cmpy_rtn_promptValidationFailureMessages;
    }

    model_internal function set cmpy_rtn_promptValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_rtn_promptValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_rtn_promptValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_rtn_promptValidationFailureMessages", oldValue, value));
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
    public function get cmpy_bol_vp_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_bol_vp_nameValidator() : StyleValidator
    {
        return model_internal::_cmpy_bol_vp_nameValidator;
    }

    model_internal function set _cmpy_bol_vp_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_bol_vp_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_bol_vp_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_bol_vp_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_bol_vp_nameIsValid():Boolean
    {
        if (!model_internal::_cmpy_bol_vp_nameIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_bol_vp_nameIsValid();
        }

        return model_internal::_cmpy_bol_vp_nameIsValid;
    }

    model_internal function calculateCmpy_bol_vp_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_bol_vp_nameValidator.validate(model_internal::_instance.cmpy_bol_vp_name)
        model_internal::_cmpy_bol_vp_nameIsValid_der = (valRes.results == null);
        model_internal::_cmpy_bol_vp_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_bol_vp_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_bol_vp_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_bol_vp_nameValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_bol_vp_nameValidationFailureMessages == null)
            model_internal::calculateCmpy_bol_vp_nameIsValid();

        return _cmpy_bol_vp_nameValidationFailureMessages;
    }

    model_internal function set cmpy_bol_vp_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_bol_vp_nameValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_bol_vp_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_bol_vp_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_trip_lastStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_trip_lastValidator() : StyleValidator
    {
        return model_internal::_cmpy_trip_lastValidator;
    }

    model_internal function set _cmpy_trip_lastIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_trip_lastIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_trip_lastIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_trip_lastIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_trip_lastIsValid():Boolean
    {
        if (!model_internal::_cmpy_trip_lastIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_trip_lastIsValid();
        }

        return model_internal::_cmpy_trip_lastIsValid;
    }

    model_internal function calculateCmpy_trip_lastIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_trip_lastValidator.validate(model_internal::_instance.cmpy_trip_last)
        model_internal::_cmpy_trip_lastIsValid_der = (valRes.results == null);
        model_internal::_cmpy_trip_lastIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_trip_lastValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_trip_lastValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_trip_lastValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_trip_lastValidationFailureMessages == null)
            model_internal::calculateCmpy_trip_lastIsValid();

        return _cmpy_trip_lastValidationFailureMessages;
    }

    model_internal function set cmpy_trip_lastValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_trip_lastValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_trip_lastValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_trip_lastValidationFailureMessages", oldValue, value));
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
    public function get cmpy_add_promptStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_add_promptValidator() : StyleValidator
    {
        return model_internal::_cmpy_add_promptValidator;
    }

    model_internal function set _cmpy_add_promptIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_add_promptIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_add_promptIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_add_promptIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_add_promptIsValid():Boolean
    {
        if (!model_internal::_cmpy_add_promptIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_add_promptIsValid();
        }

        return model_internal::_cmpy_add_promptIsValid;
    }

    model_internal function calculateCmpy_add_promptIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_add_promptValidator.validate(model_internal::_instance.cmpy_add_prompt)
        model_internal::_cmpy_add_promptIsValid_der = (valRes.results == null);
        model_internal::_cmpy_add_promptIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_add_promptValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_add_promptValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_add_promptValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_add_promptValidationFailureMessages == null)
            model_internal::calculateCmpy_add_promptIsValid();

        return _cmpy_add_promptValidationFailureMessages;
    }

    model_internal function set cmpy_add_promptValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_add_promptValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_add_promptValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_add_promptValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_log_ld_delStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_log_ld_delValidator() : StyleValidator
    {
        return model_internal::_cmpy_log_ld_delValidator;
    }

    model_internal function set _cmpy_log_ld_delIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_log_ld_delIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_log_ld_delIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_log_ld_delIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_log_ld_delIsValid():Boolean
    {
        if (!model_internal::_cmpy_log_ld_delIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_log_ld_delIsValid();
        }

        return model_internal::_cmpy_log_ld_delIsValid;
    }

    model_internal function calculateCmpy_log_ld_delIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_log_ld_delValidator.validate(model_internal::_instance.cmpy_log_ld_del)
        model_internal::_cmpy_log_ld_delIsValid_der = (valRes.results == null);
        model_internal::_cmpy_log_ld_delIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_log_ld_delValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_log_ld_delValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_log_ld_delValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_log_ld_delValidationFailureMessages == null)
            model_internal::calculateCmpy_log_ld_delIsValid();

        return _cmpy_log_ld_delValidationFailureMessages;
    }

    model_internal function set cmpy_log_ld_delValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_log_ld_delValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_log_ld_delValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_log_ld_delValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_auto_ldStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_auto_ldValidator() : StyleValidator
    {
        return model_internal::_cmpy_auto_ldValidator;
    }

    model_internal function set _cmpy_auto_ldIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_auto_ldIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_auto_ldIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_auto_ldIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_auto_ldIsValid():Boolean
    {
        if (!model_internal::_cmpy_auto_ldIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_auto_ldIsValid();
        }

        return model_internal::_cmpy_auto_ldIsValid;
    }

    model_internal function calculateCmpy_auto_ldIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_auto_ldValidator.validate(model_internal::_instance.cmpy_auto_ld)
        model_internal::_cmpy_auto_ldIsValid_der = (valRes.results == null);
        model_internal::_cmpy_auto_ldIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_auto_ldValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_auto_ldValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_auto_ldValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_auto_ldValidationFailureMessages == null)
            model_internal::calculateCmpy_auto_ldIsValid();

        return _cmpy_auto_ldValidationFailureMessages;
    }

    model_internal function set cmpy_auto_ldValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_auto_ldValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_auto_ldValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_auto_ldValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_typeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_typeValidator() : StyleValidator
    {
        return model_internal::_cmpy_typeValidator;
    }

    model_internal function set _cmpy_typeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_typeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_typeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_typeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_typeIsValid():Boolean
    {
        if (!model_internal::_cmpy_typeIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_typeIsValid();
        }

        return model_internal::_cmpy_typeIsValid;
    }

    model_internal function calculateCmpy_typeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_typeValidator.validate(model_internal::_instance.cmpy_type)
        model_internal::_cmpy_typeIsValid_der = (valRes.results == null);
        model_internal::_cmpy_typeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_typeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_typeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_typeValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_typeValidationFailureMessages == null)
            model_internal::calculateCmpy_typeIsValid();

        return _cmpy_typeValidationFailureMessages;
    }

    model_internal function set cmpy_typeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_typeValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_typeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_typeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get employerStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get employerValidator() : StyleValidator
    {
        return model_internal::_employerValidator;
    }

    model_internal function set _employerIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_employerIsValid;         
        if (oldValue !== value)
        {
            model_internal::_employerIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "employerIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get employerIsValid():Boolean
    {
        if (!model_internal::_employerIsValidCacheInitialized)
        {
            model_internal::calculateEmployerIsValid();
        }

        return model_internal::_employerIsValid;
    }

    model_internal function calculateEmployerIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_employerValidator.validate(model_internal::_instance.employer)
        model_internal::_employerIsValid_der = (valRes.results == null);
        model_internal::_employerIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::employerValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::employerValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get employerValidationFailureMessages():Array
    {
        if (model_internal::_employerValidationFailureMessages == null)
            model_internal::calculateEmployerIsValid();

        return _employerValidationFailureMessages;
    }

    model_internal function set employerValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_employerValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_employerValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "employerValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_tkr_activatStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_tkr_activatValidator() : StyleValidator
    {
        return model_internal::_cmpy_tkr_activatValidator;
    }

    model_internal function set _cmpy_tkr_activatIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_tkr_activatIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_tkr_activatIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_tkr_activatIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_tkr_activatIsValid():Boolean
    {
        if (!model_internal::_cmpy_tkr_activatIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_tkr_activatIsValid();
        }

        return model_internal::_cmpy_tkr_activatIsValid;
    }

    model_internal function calculateCmpy_tkr_activatIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_tkr_activatValidator.validate(model_internal::_instance.cmpy_tkr_activat)
        model_internal::_cmpy_tkr_activatIsValid_der = (valRes.results == null);
        model_internal::_cmpy_tkr_activatIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_tkr_activatValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_tkr_activatValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_tkr_activatValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_tkr_activatValidationFailureMessages == null)
            model_internal::calculateCmpy_tkr_activatIsValid();

        return _cmpy_tkr_activatValidationFailureMessages;
    }

    model_internal function set cmpy_tkr_activatValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_tkr_activatValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_tkr_activatValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_tkr_activatValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_rpt_tempStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_rpt_tempValidator() : StyleValidator
    {
        return model_internal::_cmpy_rpt_tempValidator;
    }

    model_internal function set _cmpy_rpt_tempIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_rpt_tempIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_rpt_tempIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_rpt_tempIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_rpt_tempIsValid():Boolean
    {
        if (!model_internal::_cmpy_rpt_tempIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_rpt_tempIsValid();
        }

        return model_internal::_cmpy_rpt_tempIsValid;
    }

    model_internal function calculateCmpy_rpt_tempIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_rpt_tempValidator.validate(model_internal::_instance.cmpy_rpt_temp)
        model_internal::_cmpy_rpt_tempIsValid_der = (valRes.results == null);
        model_internal::_cmpy_rpt_tempIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_rpt_tempValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_rpt_tempValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_rpt_tempValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_rpt_tempValidationFailureMessages == null)
            model_internal::calculateCmpy_rpt_tempIsValid();

        return _cmpy_rpt_tempValidationFailureMessages;
    }

    model_internal function set cmpy_rpt_tempValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_rpt_tempValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_rpt_tempValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_rpt_tempValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_wipe_ordetsStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_wipe_ordetsValidator() : StyleValidator
    {
        return model_internal::_cmpy_wipe_ordetsValidator;
    }

    model_internal function set _cmpy_wipe_ordetsIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_wipe_ordetsIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_wipe_ordetsIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_wipe_ordetsIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_wipe_ordetsIsValid():Boolean
    {
        if (!model_internal::_cmpy_wipe_ordetsIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_wipe_ordetsIsValid();
        }

        return model_internal::_cmpy_wipe_ordetsIsValid;
    }

    model_internal function calculateCmpy_wipe_ordetsIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_wipe_ordetsValidator.validate(model_internal::_instance.cmpy_wipe_ordets)
        model_internal::_cmpy_wipe_ordetsIsValid_der = (valRes.results == null);
        model_internal::_cmpy_wipe_ordetsIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_wipe_ordetsValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_wipe_ordetsValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_wipe_ordetsValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_wipe_ordetsValidationFailureMessages == null)
            model_internal::calculateCmpy_wipe_ordetsIsValid();

        return _cmpy_wipe_ordetsValidationFailureMessages;
    }

    model_internal function set cmpy_wipe_ordetsValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_wipe_ordetsValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_wipe_ordetsValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_wipe_ordetsValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_mod_drawerStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_mod_drawerValidator() : StyleValidator
    {
        return model_internal::_cmpy_mod_drawerValidator;
    }

    model_internal function set _cmpy_mod_drawerIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_mod_drawerIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_mod_drawerIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_mod_drawerIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_mod_drawerIsValid():Boolean
    {
        if (!model_internal::_cmpy_mod_drawerIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_mod_drawerIsValid();
        }

        return model_internal::_cmpy_mod_drawerIsValid;
    }

    model_internal function calculateCmpy_mod_drawerIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_mod_drawerValidator.validate(model_internal::_instance.cmpy_mod_drawer)
        model_internal::_cmpy_mod_drawerIsValid_der = (valRes.results == null);
        model_internal::_cmpy_mod_drawerIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_mod_drawerValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_mod_drawerValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_mod_drawerValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_mod_drawerValidationFailureMessages == null)
            model_internal::calculateCmpy_mod_drawerIsValid();

        return _cmpy_mod_drawerValidationFailureMessages;
    }

    model_internal function set cmpy_mod_drawerValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_mod_drawerValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_mod_drawerValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_mod_drawerValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_flag_3Style():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_flag_3Validator() : StyleValidator
    {
        return model_internal::_cmpy_flag_3Validator;
    }

    model_internal function set _cmpy_flag_3IsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_flag_3IsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_flag_3IsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_flag_3IsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_flag_3IsValid():Boolean
    {
        if (!model_internal::_cmpy_flag_3IsValidCacheInitialized)
        {
            model_internal::calculateCmpy_flag_3IsValid();
        }

        return model_internal::_cmpy_flag_3IsValid;
    }

    model_internal function calculateCmpy_flag_3IsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_flag_3Validator.validate(model_internal::_instance.cmpy_flag_3)
        model_internal::_cmpy_flag_3IsValid_der = (valRes.results == null);
        model_internal::_cmpy_flag_3IsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_flag_3ValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_flag_3ValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_flag_3ValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_flag_3ValidationFailureMessages == null)
            model_internal::calculateCmpy_flag_3IsValid();

        return _cmpy_flag_3ValidationFailureMessages;
    }

    model_internal function set cmpy_flag_3ValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_flag_3ValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_flag_3ValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_flag_3ValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_flag_1Style():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_flag_1Validator() : StyleValidator
    {
        return model_internal::_cmpy_flag_1Validator;
    }

    model_internal function set _cmpy_flag_1IsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_flag_1IsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_flag_1IsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_flag_1IsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_flag_1IsValid():Boolean
    {
        if (!model_internal::_cmpy_flag_1IsValidCacheInitialized)
        {
            model_internal::calculateCmpy_flag_1IsValid();
        }

        return model_internal::_cmpy_flag_1IsValid;
    }

    model_internal function calculateCmpy_flag_1IsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_flag_1Validator.validate(model_internal::_instance.cmpy_flag_1)
        model_internal::_cmpy_flag_1IsValid_der = (valRes.results == null);
        model_internal::_cmpy_flag_1IsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_flag_1ValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_flag_1ValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_flag_1ValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_flag_1ValidationFailureMessages == null)
            model_internal::calculateCmpy_flag_1IsValid();

        return _cmpy_flag_1ValidationFailureMessages;
    }

    model_internal function set cmpy_flag_1ValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_flag_1ValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_flag_1ValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_flag_1ValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_bay_loop_chStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_bay_loop_chValidator() : StyleValidator
    {
        return model_internal::_cmpy_bay_loop_chValidator;
    }

    model_internal function set _cmpy_bay_loop_chIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_bay_loop_chIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_bay_loop_chIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_bay_loop_chIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_bay_loop_chIsValid():Boolean
    {
        if (!model_internal::_cmpy_bay_loop_chIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_bay_loop_chIsValid();
        }

        return model_internal::_cmpy_bay_loop_chIsValid;
    }

    model_internal function calculateCmpy_bay_loop_chIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_bay_loop_chValidator.validate(model_internal::_instance.cmpy_bay_loop_ch)
        model_internal::_cmpy_bay_loop_chIsValid_der = (valRes.results == null);
        model_internal::_cmpy_bay_loop_chIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_bay_loop_chValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_bay_loop_chValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_bay_loop_chValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_bay_loop_chValidationFailureMessages == null)
            model_internal::calculateCmpy_bay_loop_chIsValid();

        return _cmpy_bay_loop_chValidationFailureMessages;
    }

    model_internal function set cmpy_bay_loop_chValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_bay_loop_chValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_bay_loop_chValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_bay_loop_chValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_flag_2Style():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_flag_2Validator() : StyleValidator
    {
        return model_internal::_cmpy_flag_2Validator;
    }

    model_internal function set _cmpy_flag_2IsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_flag_2IsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_flag_2IsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_flag_2IsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_flag_2IsValid():Boolean
    {
        if (!model_internal::_cmpy_flag_2IsValidCacheInitialized)
        {
            model_internal::calculateCmpy_flag_2IsValid();
        }

        return model_internal::_cmpy_flag_2IsValid;
    }

    model_internal function calculateCmpy_flag_2IsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_flag_2Validator.validate(model_internal::_instance.cmpy_flag_2)
        model_internal::_cmpy_flag_2IsValid_der = (valRes.results == null);
        model_internal::_cmpy_flag_2IsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_flag_2ValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_flag_2ValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_flag_2ValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_flag_2ValidationFailureMessages == null)
            model_internal::calculateCmpy_flag_2IsValid();

        return _cmpy_flag_2ValidationFailureMessages;
    }

    model_internal function set cmpy_flag_2ValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_flag_2ValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_flag_2ValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_flag_2ValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_enable_expdStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_enable_expdValidator() : StyleValidator
    {
        return model_internal::_cmpy_enable_expdValidator;
    }

    model_internal function set _cmpy_enable_expdIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_enable_expdIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_enable_expdIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_enable_expdIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_enable_expdIsValid():Boolean
    {
        if (!model_internal::_cmpy_enable_expdIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_enable_expdIsValid();
        }

        return model_internal::_cmpy_enable_expdIsValid;
    }

    model_internal function calculateCmpy_enable_expdIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_enable_expdValidator.validate(model_internal::_instance.cmpy_enable_expd)
        model_internal::_cmpy_enable_expdIsValid_der = (valRes.results == null);
        model_internal::_cmpy_enable_expdIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_enable_expdValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_enable_expdValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_enable_expdValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_enable_expdValidationFailureMessages == null)
            model_internal::calculateCmpy_enable_expdIsValid();

        return _cmpy_enable_expdValidationFailureMessages;
    }

    model_internal function set cmpy_enable_expdValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_enable_expdValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_enable_expdValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_enable_expdValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_trip_endStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_trip_endValidator() : StyleValidator
    {
        return model_internal::_cmpy_trip_endValidator;
    }

    model_internal function set _cmpy_trip_endIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_trip_endIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_trip_endIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_trip_endIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_trip_endIsValid():Boolean
    {
        if (!model_internal::_cmpy_trip_endIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_trip_endIsValid();
        }

        return model_internal::_cmpy_trip_endIsValid;
    }

    model_internal function calculateCmpy_trip_endIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_trip_endValidator.validate(model_internal::_instance.cmpy_trip_end)
        model_internal::_cmpy_trip_endIsValid_der = (valRes.results == null);
        model_internal::_cmpy_trip_endIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_trip_endValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_trip_endValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_trip_endValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_trip_endValidationFailureMessages == null)
            model_internal::calculateCmpy_trip_endIsValid();

        return _cmpy_trip_endValidationFailureMessages;
    }

    model_internal function set cmpy_trip_endValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_trip_endValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_trip_endValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_trip_endValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_comms_okStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_comms_okValidator() : StyleValidator
    {
        return model_internal::_cmpy_comms_okValidator;
    }

    model_internal function set _cmpy_comms_okIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_comms_okIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_comms_okIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_comms_okIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_comms_okIsValid():Boolean
    {
        if (!model_internal::_cmpy_comms_okIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_comms_okIsValid();
        }

        return model_internal::_cmpy_comms_okIsValid;
    }

    model_internal function calculateCmpy_comms_okIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_comms_okValidator.validate(model_internal::_instance.cmpy_comms_ok)
        model_internal::_cmpy_comms_okIsValid_der = (valRes.results == null);
        model_internal::_cmpy_comms_okIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_comms_okValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_comms_okValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_comms_okValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_comms_okValidationFailureMessages == null)
            model_internal::calculateCmpy_comms_okIsValid();

        return _cmpy_comms_okValidationFailureMessages;
    }

    model_internal function set cmpy_comms_okValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_comms_okValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_comms_okValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_comms_okValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_issuStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_issuValidator() : StyleValidator
    {
        return model_internal::_cmpy_issuValidator;
    }

    model_internal function set _cmpy_issuIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_issuIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_issuIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_issuIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_issuIsValid():Boolean
    {
        if (!model_internal::_cmpy_issuIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_issuIsValid();
        }

        return model_internal::_cmpy_issuIsValid;
    }

    model_internal function calculateCmpy_issuIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_issuValidator.validate(model_internal::_instance.cmpy_issu)
        model_internal::_cmpy_issuIsValid_der = (valRes.results == null);
        model_internal::_cmpy_issuIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_issuValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_issuValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_issuValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_issuValidationFailureMessages == null)
            model_internal::calculateCmpy_issuIsValid();

        return _cmpy_issuValidationFailureMessages;
    }

    model_internal function set cmpy_issuValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_issuValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_issuValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_issuValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_wgh_completStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_wgh_completValidator() : StyleValidator
    {
        return model_internal::_cmpy_wgh_completValidator;
    }

    model_internal function set _cmpy_wgh_completIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_wgh_completIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_wgh_completIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_wgh_completIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_wgh_completIsValid():Boolean
    {
        if (!model_internal::_cmpy_wgh_completIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_wgh_completIsValid();
        }

        return model_internal::_cmpy_wgh_completIsValid;
    }

    model_internal function calculateCmpy_wgh_completIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_wgh_completValidator.validate(model_internal::_instance.cmpy_wgh_complet)
        model_internal::_cmpy_wgh_completIsValid_der = (valRes.results == null);
        model_internal::_cmpy_wgh_completIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_wgh_completValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_wgh_completValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_wgh_completValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_wgh_completValidationFailureMessages == null)
            model_internal::calculateCmpy_wgh_completIsValid();

        return _cmpy_wgh_completValidationFailureMessages;
    }

    model_internal function set cmpy_wgh_completValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_wgh_completValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_wgh_completValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_wgh_completValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_compress_blStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_compress_blValidator() : StyleValidator
    {
        return model_internal::_cmpy_compress_blValidator;
    }

    model_internal function set _cmpy_compress_blIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_compress_blIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_compress_blIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_compress_blIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_compress_blIsValid():Boolean
    {
        if (!model_internal::_cmpy_compress_blIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_compress_blIsValid();
        }

        return model_internal::_cmpy_compress_blIsValid;
    }

    model_internal function calculateCmpy_compress_blIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_compress_blValidator.validate(model_internal::_instance.cmpy_compress_bl)
        model_internal::_cmpy_compress_blIsValid_der = (valRes.results == null);
        model_internal::_cmpy_compress_blIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_compress_blValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_compress_blValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_compress_blValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_compress_blValidationFailureMessages == null)
            model_internal::calculateCmpy_compress_blIsValid();

        return _cmpy_compress_blValidationFailureMessages;
    }

    model_internal function set cmpy_compress_blValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_compress_blValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_compress_blValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_compress_blValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_plantStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_plantValidator() : StyleValidator
    {
        return model_internal::_cmpy_plantValidator;
    }

    model_internal function set _cmpy_plantIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_plantIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_plantIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_plantIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_plantIsValid():Boolean
    {
        if (!model_internal::_cmpy_plantIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_plantIsValid();
        }

        return model_internal::_cmpy_plantIsValid;
    }

    model_internal function calculateCmpy_plantIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_plantValidator.validate(model_internal::_instance.cmpy_plant)
        model_internal::_cmpy_plantIsValid_der = (valRes.results == null);
        model_internal::_cmpy_plantIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_plantValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_plantValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_plantValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_plantValidationFailureMessages == null)
            model_internal::calculateCmpy_plantIsValid();

        return _cmpy_plantValidationFailureMessages;
    }

    model_internal function set cmpy_plantValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_plantValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_plantValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_plantValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_auto_reconcStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_auto_reconcValidator() : StyleValidator
    {
        return model_internal::_cmpy_auto_reconcValidator;
    }

    model_internal function set _cmpy_auto_reconcIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_auto_reconcIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_auto_reconcIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_auto_reconcIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_auto_reconcIsValid():Boolean
    {
        if (!model_internal::_cmpy_auto_reconcIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_auto_reconcIsValid();
        }

        return model_internal::_cmpy_auto_reconcIsValid;
    }

    model_internal function calculateCmpy_auto_reconcIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_auto_reconcValidator.validate(model_internal::_instance.cmpy_auto_reconc)
        model_internal::_cmpy_auto_reconcIsValid_der = (valRes.results == null);
        model_internal::_cmpy_auto_reconcIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_auto_reconcValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_auto_reconcValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_auto_reconcValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_auto_reconcValidationFailureMessages == null)
            model_internal::calculateCmpy_auto_reconcIsValid();

        return _cmpy_auto_reconcValidationFailureMessages;
    }

    model_internal function set cmpy_auto_reconcValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_auto_reconcValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_auto_reconcValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_auto_reconcValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_bltol_flagStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_bltol_flagValidator() : StyleValidator
    {
        return model_internal::_cmpy_bltol_flagValidator;
    }

    model_internal function set _cmpy_bltol_flagIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_bltol_flagIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_bltol_flagIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_bltol_flagIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_bltol_flagIsValid():Boolean
    {
        if (!model_internal::_cmpy_bltol_flagIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_bltol_flagIsValid();
        }

        return model_internal::_cmpy_bltol_flagIsValid;
    }

    model_internal function calculateCmpy_bltol_flagIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_bltol_flagValidator.validate(model_internal::_instance.cmpy_bltol_flag)
        model_internal::_cmpy_bltol_flagIsValid_der = (valRes.results == null);
        model_internal::_cmpy_bltol_flagIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_bltol_flagValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_bltol_flagValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_bltol_flagValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_bltol_flagValidationFailureMessages == null)
            model_internal::calculateCmpy_bltol_flagIsValid();

        return _cmpy_bltol_flagValidationFailureMessages;
    }

    model_internal function set cmpy_bltol_flagValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_bltol_flagValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_bltol_flagValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_bltol_flagValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_must_sealnoStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_must_sealnoValidator() : StyleValidator
    {
        return model_internal::_cmpy_must_sealnoValidator;
    }

    model_internal function set _cmpy_must_sealnoIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_must_sealnoIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_must_sealnoIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_must_sealnoIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_must_sealnoIsValid():Boolean
    {
        if (!model_internal::_cmpy_must_sealnoIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_must_sealnoIsValid();
        }

        return model_internal::_cmpy_must_sealnoIsValid;
    }

    model_internal function calculateCmpy_must_sealnoIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_must_sealnoValidator.validate(model_internal::_instance.cmpy_must_sealno)
        model_internal::_cmpy_must_sealnoIsValid_der = (valRes.results == null);
        model_internal::_cmpy_must_sealnoIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_must_sealnoValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_must_sealnoValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_must_sealnoValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_must_sealnoValidationFailureMessages == null)
            model_internal::calculateCmpy_must_sealnoIsValid();

        return _cmpy_must_sealnoValidationFailureMessages;
    }

    model_internal function set cmpy_must_sealnoValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_must_sealnoValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_must_sealnoValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_must_sealnoValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_ord_lastStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_ord_lastValidator() : StyleValidator
    {
        return model_internal::_cmpy_ord_lastValidator;
    }

    model_internal function set _cmpy_ord_lastIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_ord_lastIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_ord_lastIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_ord_lastIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_ord_lastIsValid():Boolean
    {
        if (!model_internal::_cmpy_ord_lastIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_ord_lastIsValid();
        }

        return model_internal::_cmpy_ord_lastIsValid;
    }

    model_internal function calculateCmpy_ord_lastIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_ord_lastValidator.validate(model_internal::_instance.cmpy_ord_last)
        model_internal::_cmpy_ord_lastIsValid_der = (valRes.results == null);
        model_internal::_cmpy_ord_lastIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_ord_lastValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_ord_lastValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_ord_lastValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_ord_lastValidationFailureMessages == null)
            model_internal::calculateCmpy_ord_lastIsValid();

        return _cmpy_ord_lastValidationFailureMessages;
    }

    model_internal function set cmpy_ord_lastValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_ord_lastValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_ord_lastValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_ord_lastValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_seal_numberStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_seal_numberValidator() : StyleValidator
    {
        return model_internal::_cmpy_seal_numberValidator;
    }

    model_internal function set _cmpy_seal_numberIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_seal_numberIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_seal_numberIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_seal_numberIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_seal_numberIsValid():Boolean
    {
        if (!model_internal::_cmpy_seal_numberIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_seal_numberIsValid();
        }

        return model_internal::_cmpy_seal_numberIsValid;
    }

    model_internal function calculateCmpy_seal_numberIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_seal_numberValidator.validate(model_internal::_instance.cmpy_seal_number)
        model_internal::_cmpy_seal_numberIsValid_der = (valRes.results == null);
        model_internal::_cmpy_seal_numberIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_seal_numberValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_seal_numberValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_seal_numberValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_seal_numberValidationFailureMessages == null)
            model_internal::calculateCmpy_seal_numberIsValid();

        return _cmpy_seal_numberValidationFailureMessages;
    }

    model_internal function set cmpy_seal_numberValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_seal_numberValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_seal_numberValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_seal_numberValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_host_docsStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_host_docsValidator() : StyleValidator
    {
        return model_internal::_cmpy_host_docsValidator;
    }

    model_internal function set _cmpy_host_docsIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_host_docsIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_host_docsIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_host_docsIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_host_docsIsValid():Boolean
    {
        if (!model_internal::_cmpy_host_docsIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_host_docsIsValid();
        }

        return model_internal::_cmpy_host_docsIsValid;
    }

    model_internal function calculateCmpy_host_docsIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_host_docsValidator.validate(model_internal::_instance.cmpy_host_docs)
        model_internal::_cmpy_host_docsIsValid_der = (valRes.results == null);
        model_internal::_cmpy_host_docsIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_host_docsValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_host_docsValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_host_docsValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_host_docsValidationFailureMessages == null)
            model_internal::calculateCmpy_host_docsIsValid();

        return _cmpy_host_docsValidationFailureMessages;
    }

    model_internal function set cmpy_host_docsValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_host_docsValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_host_docsValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_host_docsValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_trip_strtStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_trip_strtValidator() : StyleValidator
    {
        return model_internal::_cmpy_trip_strtValidator;
    }

    model_internal function set _cmpy_trip_strtIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_trip_strtIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_trip_strtIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_trip_strtIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_trip_strtIsValid():Boolean
    {
        if (!model_internal::_cmpy_trip_strtIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_trip_strtIsValid();
        }

        return model_internal::_cmpy_trip_strtIsValid;
    }

    model_internal function calculateCmpy_trip_strtIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_trip_strtValidator.validate(model_internal::_instance.cmpy_trip_strt)
        model_internal::_cmpy_trip_strtIsValid_der = (valRes.results == null);
        model_internal::_cmpy_trip_strtIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_trip_strtValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_trip_strtValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_trip_strtValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_trip_strtValidationFailureMessages == null)
            model_internal::calculateCmpy_trip_strtIsValid();

        return _cmpy_trip_strtValidationFailureMessages;
    }

    model_internal function set cmpy_trip_strtValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_trip_strtValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_trip_strtValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_trip_strtValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_isseStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_isseValidator() : StyleValidator
    {
        return model_internal::_cmpy_isseValidator;
    }

    model_internal function set _cmpy_isseIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_isseIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_isseIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_isseIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_isseIsValid():Boolean
    {
        if (!model_internal::_cmpy_isseIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_isseIsValid();
        }

        return model_internal::_cmpy_isseIsValid;
    }

    model_internal function calculateCmpy_isseIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_isseValidator.validate(model_internal::_instance.cmpy_isse)
        model_internal::_cmpy_isseIsValid_der = (valRes.results == null);
        model_internal::_cmpy_isseIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_isseValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_isseValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_isseValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_isseValidationFailureMessages == null)
            model_internal::calculateCmpy_isseIsValid();

        return _cmpy_isseValidationFailureMessages;
    }

    model_internal function set cmpy_isseValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_isseValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_isseValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_isseValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get site_managerStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get site_managerValidator() : StyleValidator
    {
        return model_internal::_site_managerValidator;
    }

    model_internal function set _site_managerIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_site_managerIsValid;         
        if (oldValue !== value)
        {
            model_internal::_site_managerIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "site_managerIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get site_managerIsValid():Boolean
    {
        if (!model_internal::_site_managerIsValidCacheInitialized)
        {
            model_internal::calculateSite_managerIsValid();
        }

        return model_internal::_site_managerIsValid;
    }

    model_internal function calculateSite_managerIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_site_managerValidator.validate(model_internal::_instance.site_manager)
        model_internal::_site_managerIsValid_der = (valRes.results == null);
        model_internal::_site_managerIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::site_managerValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::site_managerValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get site_managerValidationFailureMessages():Array
    {
        if (model_internal::_site_managerValidationFailureMessages == null)
            model_internal::calculateSite_managerIsValid();

        return _site_managerValidationFailureMessages;
    }

    model_internal function set site_managerValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_site_managerValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_site_managerValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "site_managerValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_wgh_auto_flStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_wgh_auto_flValidator() : StyleValidator
    {
        return model_internal::_cmpy_wgh_auto_flValidator;
    }

    model_internal function set _cmpy_wgh_auto_flIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_wgh_auto_flIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_wgh_auto_flIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_wgh_auto_flIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_wgh_auto_flIsValid():Boolean
    {
        if (!model_internal::_cmpy_wgh_auto_flIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_wgh_auto_flIsValid();
        }

        return model_internal::_cmpy_wgh_auto_flIsValid;
    }

    model_internal function calculateCmpy_wgh_auto_flIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_wgh_auto_flValidator.validate(model_internal::_instance.cmpy_wgh_auto_fl)
        model_internal::_cmpy_wgh_auto_flIsValid_der = (valRes.results == null);
        model_internal::_cmpy_wgh_auto_flIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_wgh_auto_flValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_wgh_auto_flValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_wgh_auto_flValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_wgh_auto_flValidationFailureMessages == null)
            model_internal::calculateCmpy_wgh_auto_flIsValid();

        return _cmpy_wgh_auto_flValidationFailureMessages;
    }

    model_internal function set cmpy_wgh_auto_flValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_wgh_auto_flValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_wgh_auto_flValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_wgh_auto_flValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_req_pin_flagStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_req_pin_flagValidator() : StyleValidator
    {
        return model_internal::_cmpy_req_pin_flagValidator;
    }

    model_internal function set _cmpy_req_pin_flagIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_req_pin_flagIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_req_pin_flagIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_req_pin_flagIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_req_pin_flagIsValid():Boolean
    {
        if (!model_internal::_cmpy_req_pin_flagIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_req_pin_flagIsValid();
        }

        return model_internal::_cmpy_req_pin_flagIsValid;
    }

    model_internal function calculateCmpy_req_pin_flagIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_req_pin_flagValidator.validate(model_internal::_instance.cmpy_req_pin_flag)
        model_internal::_cmpy_req_pin_flagIsValid_der = (valRes.results == null);
        model_internal::_cmpy_req_pin_flagIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_req_pin_flagValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_req_pin_flagValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_req_pin_flagValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_req_pin_flagValidationFailureMessages == null)
            model_internal::calculateCmpy_req_pin_flagIsValid();

        return _cmpy_req_pin_flagValidationFailureMessages;
    }

    model_internal function set cmpy_req_pin_flagValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_req_pin_flagValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_req_pin_flagValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_req_pin_flagValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_check_licenStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_check_licenValidator() : StyleValidator
    {
        return model_internal::_cmpy_check_licenValidator;
    }

    model_internal function set _cmpy_check_licenIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_check_licenIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_check_licenIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_check_licenIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_check_licenIsValid():Boolean
    {
        if (!model_internal::_cmpy_check_licenIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_check_licenIsValid();
        }

        return model_internal::_cmpy_check_licenIsValid;
    }

    model_internal function calculateCmpy_check_licenIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_check_licenValidator.validate(model_internal::_instance.cmpy_check_licen)
        model_internal::_cmpy_check_licenIsValid_der = (valRes.results == null);
        model_internal::_cmpy_check_licenIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_check_licenValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_check_licenValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_check_licenValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_check_licenValidationFailureMessages == null)
            model_internal::calculateCmpy_check_licenIsValid();

        return _cmpy_check_licenValidationFailureMessages;
    }

    model_internal function set cmpy_check_licenValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_check_licenValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_cmpy_check_licenValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_check_licenValidationFailureMessages", oldValue, value));
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
            case("cmpy_ord_carrier"):
            {
                return cmpy_ord_carrierValidationFailureMessages;
            }
            case("cmpy_ldtol_flag"):
            {
                return cmpy_ldtol_flagValidationFailureMessages;
            }
            case("cmpy_drv_inst_vp"):
            {
                return cmpy_drv_inst_vpValidationFailureMessages;
            }
            case("customer"):
            {
                return customerValidationFailureMessages;
            }
            case("drawer"):
            {
                return drawerValidationFailureMessages;
            }
            case("cmpy_movements_rev"):
            {
                return cmpy_movements_revValidationFailureMessages;
            }
            case("cmpy_aoi"):
            {
                return cmpy_aoiValidationFailureMessages;
            }
            case("cmpy_ldgo_delta"):
            {
                return cmpy_ldgo_deltaValidationFailureMessages;
            }
            case("cmpy_rpt_t_unit"):
            {
                return cmpy_rpt_t_unitValidationFailureMessages;
            }
            case("carrier"):
            {
                return carrierValidationFailureMessages;
            }
            case("cmpy_msg"):
            {
                return cmpy_msgValidationFailureMessages;
            }
            case("supplier"):
            {
                return supplierValidationFailureMessages;
            }
            case("cmpy_host"):
            {
                return cmpy_hostValidationFailureMessages;
            }
            case("host"):
            {
                return hostValidationFailureMessages;
            }
            case("cmpy_ord_end"):
            {
                return cmpy_ord_endValidationFailureMessages;
            }
            case("cmpy_tkr_cfg"):
            {
                return cmpy_tkr_cfgValidationFailureMessages;
            }
            case("cmpy_exp_cpde"):
            {
                return cmpy_exp_cpdeValidationFailureMessages;
            }
            case("cmpy_code"):
            {
                return cmpy_codeValidationFailureMessages;
            }
            case("cmpy_ord_strt"):
            {
                return cmpy_ord_strtValidationFailureMessages;
            }
            case("cmpy_exp_code"):
            {
                return cmpy_exp_codeValidationFailureMessages;
            }
            case("cmpy_name"):
            {
                return cmpy_nameValidationFailureMessages;
            }
            case("cmpy_ld_rep_vp"):
            {
                return cmpy_ld_rep_vpValidationFailureMessages;
            }
            case("cmpy_vet"):
            {
                return cmpy_vetValidationFailureMessages;
            }
            case("issuer"):
            {
                return issuerValidationFailureMessages;
            }
            case("cmpy_rtn_prompt"):
            {
                return cmpy_rtn_promptValidationFailureMessages;
            }
            case("cmpy_schd_archive"):
            {
                return cmpy_schd_archiveValidationFailureMessages;
            }
            case("cmpy_bol_vp_name"):
            {
                return cmpy_bol_vp_nameValidationFailureMessages;
            }
            case("cmpy_trip_last"):
            {
                return cmpy_trip_lastValidationFailureMessages;
            }
            case("cmpy_schd_rev_repost"):
            {
                return cmpy_schd_rev_repostValidationFailureMessages;
            }
            case("cmpy_add_prompt"):
            {
                return cmpy_add_promptValidationFailureMessages;
            }
            case("cmpy_log_ld_del"):
            {
                return cmpy_log_ld_delValidationFailureMessages;
            }
            case("cmpy_auto_ld"):
            {
                return cmpy_auto_ldValidationFailureMessages;
            }
            case("cmpy_type"):
            {
                return cmpy_typeValidationFailureMessages;
            }
            case("employer"):
            {
                return employerValidationFailureMessages;
            }
            case("cmpy_tkr_activat"):
            {
                return cmpy_tkr_activatValidationFailureMessages;
            }
            case("cmpy_rpt_temp"):
            {
                return cmpy_rpt_tempValidationFailureMessages;
            }
            case("cmpy_wipe_ordets"):
            {
                return cmpy_wipe_ordetsValidationFailureMessages;
            }
            case("cmpy_mod_drawer"):
            {
                return cmpy_mod_drawerValidationFailureMessages;
            }
            case("cmpy_flag_3"):
            {
                return cmpy_flag_3ValidationFailureMessages;
            }
            case("cmpy_flag_1"):
            {
                return cmpy_flag_1ValidationFailureMessages;
            }
            case("cmpy_bay_loop_ch"):
            {
                return cmpy_bay_loop_chValidationFailureMessages;
            }
            case("cmpy_flag_2"):
            {
                return cmpy_flag_2ValidationFailureMessages;
            }
            case("cmpy_enable_expd"):
            {
                return cmpy_enable_expdValidationFailureMessages;
            }
            case("cmpy_trip_end"):
            {
                return cmpy_trip_endValidationFailureMessages;
            }
            case("cmpy_comms_ok"):
            {
                return cmpy_comms_okValidationFailureMessages;
            }
            case("cmpy_issu"):
            {
                return cmpy_issuValidationFailureMessages;
            }
            case("cmpy_wgh_complet"):
            {
                return cmpy_wgh_completValidationFailureMessages;
            }
            case("cmpy_compress_bl"):
            {
                return cmpy_compress_blValidationFailureMessages;
            }
            case("cmpy_plant"):
            {
                return cmpy_plantValidationFailureMessages;
            }
            case("cmpy_auto_reconc"):
            {
                return cmpy_auto_reconcValidationFailureMessages;
            }
            case("cmpy_bltol_flag"):
            {
                return cmpy_bltol_flagValidationFailureMessages;
            }
            case("cmpy_must_sealno"):
            {
                return cmpy_must_sealnoValidationFailureMessages;
            }
            case("cmpy_ord_last"):
            {
                return cmpy_ord_lastValidationFailureMessages;
            }
            case("cmpy_seal_number"):
            {
                return cmpy_seal_numberValidationFailureMessages;
            }
            case("cmpy_host_docs"):
            {
                return cmpy_host_docsValidationFailureMessages;
            }
            case("cmpy_trip_strt"):
            {
                return cmpy_trip_strtValidationFailureMessages;
            }
            case("cmpy_isse"):
            {
                return cmpy_isseValidationFailureMessages;
            }
            case("site_manager"):
            {
                return site_managerValidationFailureMessages;
            }
            case("cmpy_wgh_auto_fl"):
            {
                return cmpy_wgh_auto_flValidationFailureMessages;
            }
            case("cmpy_req_pin_flag"):
            {
                return cmpy_req_pin_flagValidationFailureMessages;
            }
            case("cmpy_check_licen"):
            {
                return cmpy_check_licenValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
