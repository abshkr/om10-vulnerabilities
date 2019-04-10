/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - Gui_Personnel.as.
 */

package valueObjects
{
import com.adobe.fiber.services.IFiberManagingService;
import com.adobe.fiber.util.FiberUtils;
import com.adobe.fiber.valueobjects.IValueObject;
import flash.events.Event;
import flash.events.EventDispatcher;
import mx.binding.utils.ChangeWatcher;
import mx.collections.ArrayCollection;
import mx.events.PropertyChangeEvent;
import mx.validators.ValidationResult;

import flash.net.registerClassAlias;
import flash.net.getClassByAlias;
import com.adobe.fiber.core.model_internal;
import com.adobe.fiber.valueobjects.IPropertyIterator;
import com.adobe.fiber.valueobjects.AvailablePropertyIterator;

use namespace model_internal;

[Managed]
[ExcludeClass]
public class _Super_Gui_Personnel extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("Gui_Personnel") == null)
            {
                flash.net.registerClassAlias("Gui_Personnel", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("Gui_Personnel", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _Gui_PersonnelEntityMetadata;
    model_internal var _changedObjects:mx.collections.ArrayCollection = new ArrayCollection();

    public function getChangedObjects() : Array
    {
        _changedObjects.addItemAt(this,0);
        return _changedObjects.source;
    }

    public function clearChangedObjects() : void
    {
        _changedObjects.removeAll();
    }

    /**
     * properties
     */
    private var _internal_rn : String;
    private var _internal_cmpy_ord_carrier : String;
    private var _internal_per_area : Object;
    private var _internal_user_login_count : Object;
    private var _internal_cmpy_ldtol_flag : String;
    private var _internal_pt_timecd : String;
    private var _internal_cmpy_drv_inst_vp : String;
    private var _internal_user_code : String;
    private var _internal_per_passwd : String;
    private var _internal_per_exp_d3_dmy : String;
    private var _internal_cmpy_aoi : Object;
    private var _internal_cmpy_ldgo_delta : String;
    private var _internal_perl_enter_time : Object;
    private var _internal_cmpy_rpt_t_unit : String;
    private var _internal_per_lock : String;
    private var _internal_role : Object;
    private var _internal_cmpy_msg : Object;
    private var _internal_per_auth : String;
    private var _internal_cmpy_host : String;
    private var _internal_per_exp_d1_dmy : String;
    private var _internal_user_type : String;
    private var _internal_cmpy_ord_end : String;
    private var _internal_per_password : Object;
    private var _internal_cmpy_tkr_cfg : String;
    private var _internal_cmpy_ord_strt : String;
    private var _internal_cmpy_code : String;
    private var _internal_record_order : String;
    private var _internal_expire_time : String;
    private var _internal_cmpy_exp_code : Object;
    private var _internal_cmpy_name : String;
    private var _internal_user_status_flag : String;
    private var _internal_cmpy_ld_rep_vp : String;
    private var _internal_per_passwd_2 : String;
    private var _internal_perl_ara : String;
    private var _internal_cmpy_vet : String;
    private var _internal_per_level_num : String;
    private var _internal_per_next_msg : Object;
    private var _internal_cmpy_rtn_prompt : String;
    private var _internal_user_last_reason : Object;
    private var _internal_user_password : String;
    private var _internal_per_accesslocks : Object;
    private var _internal_cmpy_bol_vp_name : String;
    private var _internal_cmpy_trip_last : String;
    private var _internal_per_cmpy : String;
    private var _internal_per_passconfirm : Object;
    private var _internal_cmpy_add_prompt : String;
    private var _internal_cmpy_log_ld_del : String;
    private var _internal_session_id : Object;
    private var _internal_cmpy_auto_ld : String;
    private var _internal_cmpy_type : String;
    private var _internal_cmpy_tkr_activat : String;
    private var _internal_cmpy_rpt_temp : String;
    private var _internal_per_code : String;
    private var _internal_cmpy_wipe_ordets : String;
    private var _internal_cmpy_mod_drawer : String;
    private var _internal_cmpy_flag_3 : String;
    private var _internal_per_licence_no : Object;
    private var _internal_cmpy_bay_loop_ch : String;
    private var _internal_cmpy_flag_1 : String;
    private var _internal_cmpy_flag_2 : String;
    private var _internal_cmpy_enable_expd : String;
    private var _internal_cmpy_trip_end : String;
    private var _internal_user_id : String;
    private var _internal_perl_psn : String;
    private var _internal_cmpy_comms_ok : String;
    private var _internal_pt_psncode : String;
    private var _internal_cmpy_issu : String;
    private var _internal_record_switch : String;
    private var _internal_per_name : String;
    private var _internal_cmpy_wgh_complet : String;
    private var _internal_cmpy_compress_bl : Object;
    private var _internal_per_department : String;
    private var _internal_cmpy_auto_reconc : String;
    private var _internal_per_exp_d2_dmy : String;
    private var _internal_cmpy_bltol_flag : String;
    private var _internal_cmpy_must_sealno : String;
    private var _internal_cmpy_ord_last : String;
    private var _internal_cmpy_seal_number : String;
    private var _internal_cmpy_host_docs : String;
    private var _internal_cmpy_trip_strt : String;
    private var _internal_per_terminal : Object;
    private var _internal_valid_time : String;
    private var _internal_cmpy_wgh_auto_fl : String;
    private var _internal_user_username : String;
    private var _internal_cmpy_req_pin_flag : String;
    private var _internal_cmpy_check_licen : Object;
    private var _internal_per_last_dmy : String;
    private var _internal_password_validate : Object;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_Gui_Personnel()
    {
        _model = new _Gui_PersonnelEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_ord_carrier", model_internal::setterListenerCmpy_ord_carrier));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "per_area", model_internal::setterListenerPer_area));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "user_login_count", model_internal::setterListenerUser_login_count));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_ldtol_flag", model_internal::setterListenerCmpy_ldtol_flag));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "pt_timecd", model_internal::setterListenerPt_timecd));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_drv_inst_vp", model_internal::setterListenerCmpy_drv_inst_vp));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "user_code", model_internal::setterListenerUser_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "per_passwd", model_internal::setterListenerPer_passwd));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "per_exp_d3_dmy", model_internal::setterListenerPer_exp_d3_dmy));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_aoi", model_internal::setterListenerCmpy_aoi));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_ldgo_delta", model_internal::setterListenerCmpy_ldgo_delta));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "perl_enter_time", model_internal::setterListenerPerl_enter_time));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_rpt_t_unit", model_internal::setterListenerCmpy_rpt_t_unit));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "per_lock", model_internal::setterListenerPer_lock));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "role", model_internal::setterListenerRole));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_msg", model_internal::setterListenerCmpy_msg));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "per_auth", model_internal::setterListenerPer_auth));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_host", model_internal::setterListenerCmpy_host));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "per_exp_d1_dmy", model_internal::setterListenerPer_exp_d1_dmy));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "user_type", model_internal::setterListenerUser_type));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_ord_end", model_internal::setterListenerCmpy_ord_end));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "per_password", model_internal::setterListenerPer_password));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_tkr_cfg", model_internal::setterListenerCmpy_tkr_cfg));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_ord_strt", model_internal::setterListenerCmpy_ord_strt));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_code", model_internal::setterListenerCmpy_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "record_order", model_internal::setterListenerRecord_order));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "expire_time", model_internal::setterListenerExpire_time));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_exp_code", model_internal::setterListenerCmpy_exp_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_name", model_internal::setterListenerCmpy_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "user_status_flag", model_internal::setterListenerUser_status_flag));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_ld_rep_vp", model_internal::setterListenerCmpy_ld_rep_vp));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "per_passwd_2", model_internal::setterListenerPer_passwd_2));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "perl_ara", model_internal::setterListenerPerl_ara));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_vet", model_internal::setterListenerCmpy_vet));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "per_level_num", model_internal::setterListenerPer_level_num));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "per_next_msg", model_internal::setterListenerPer_next_msg));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_rtn_prompt", model_internal::setterListenerCmpy_rtn_prompt));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "user_last_reason", model_internal::setterListenerUser_last_reason));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "user_password", model_internal::setterListenerUser_password));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "per_accesslocks", model_internal::setterListenerPer_accesslocks));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_bol_vp_name", model_internal::setterListenerCmpy_bol_vp_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_trip_last", model_internal::setterListenerCmpy_trip_last));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "per_cmpy", model_internal::setterListenerPer_cmpy));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "per_passconfirm", model_internal::setterListenerPer_passconfirm));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_add_prompt", model_internal::setterListenerCmpy_add_prompt));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_log_ld_del", model_internal::setterListenerCmpy_log_ld_del));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "session_id", model_internal::setterListenerSession_id));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_auto_ld", model_internal::setterListenerCmpy_auto_ld));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_type", model_internal::setterListenerCmpy_type));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_tkr_activat", model_internal::setterListenerCmpy_tkr_activat));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_rpt_temp", model_internal::setterListenerCmpy_rpt_temp));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "per_code", model_internal::setterListenerPer_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_wipe_ordets", model_internal::setterListenerCmpy_wipe_ordets));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_mod_drawer", model_internal::setterListenerCmpy_mod_drawer));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_flag_3", model_internal::setterListenerCmpy_flag_3));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "per_licence_no", model_internal::setterListenerPer_licence_no));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_bay_loop_ch", model_internal::setterListenerCmpy_bay_loop_ch));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_flag_1", model_internal::setterListenerCmpy_flag_1));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_flag_2", model_internal::setterListenerCmpy_flag_2));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_enable_expd", model_internal::setterListenerCmpy_enable_expd));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_trip_end", model_internal::setterListenerCmpy_trip_end));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "user_id", model_internal::setterListenerUser_id));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "perl_psn", model_internal::setterListenerPerl_psn));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_comms_ok", model_internal::setterListenerCmpy_comms_ok));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "pt_psncode", model_internal::setterListenerPt_psncode));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_issu", model_internal::setterListenerCmpy_issu));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "record_switch", model_internal::setterListenerRecord_switch));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "per_name", model_internal::setterListenerPer_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_wgh_complet", model_internal::setterListenerCmpy_wgh_complet));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_compress_bl", model_internal::setterListenerCmpy_compress_bl));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "per_department", model_internal::setterListenerPer_department));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_auto_reconc", model_internal::setterListenerCmpy_auto_reconc));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "per_exp_d2_dmy", model_internal::setterListenerPer_exp_d2_dmy));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_bltol_flag", model_internal::setterListenerCmpy_bltol_flag));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_must_sealno", model_internal::setterListenerCmpy_must_sealno));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_ord_last", model_internal::setterListenerCmpy_ord_last));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_seal_number", model_internal::setterListenerCmpy_seal_number));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_host_docs", model_internal::setterListenerCmpy_host_docs));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_trip_strt", model_internal::setterListenerCmpy_trip_strt));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "per_terminal", model_internal::setterListenerPer_terminal));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "valid_time", model_internal::setterListenerValid_time));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_wgh_auto_fl", model_internal::setterListenerCmpy_wgh_auto_fl));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "user_username", model_internal::setterListenerUser_username));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_req_pin_flag", model_internal::setterListenerCmpy_req_pin_flag));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_check_licen", model_internal::setterListenerCmpy_check_licen));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "per_last_dmy", model_internal::setterListenerPer_last_dmy));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "password_validate", model_internal::setterListenerPassword_validate));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get rn() : String
    {
        return _internal_rn;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_ord_carrier() : String
    {
        return _internal_cmpy_ord_carrier;
    }

    [Bindable(event="propertyChange")]
    public function get per_area() : Object
    {
        return _internal_per_area;
    }

    [Bindable(event="propertyChange")]
    public function get user_login_count() : Object
    {
        return _internal_user_login_count;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_ldtol_flag() : String
    {
        return _internal_cmpy_ldtol_flag;
    }

    [Bindable(event="propertyChange")]
    public function get pt_timecd() : String
    {
        return _internal_pt_timecd;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_drv_inst_vp() : String
    {
        return _internal_cmpy_drv_inst_vp;
    }

    [Bindable(event="propertyChange")]
    public function get user_code() : String
    {
        return _internal_user_code;
    }

    [Bindable(event="propertyChange")]
    public function get per_passwd() : String
    {
        return _internal_per_passwd;
    }

    [Bindable(event="propertyChange")]
    public function get per_exp_d3_dmy() : String
    {
        return _internal_per_exp_d3_dmy;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_aoi() : Object
    {
        return _internal_cmpy_aoi;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_ldgo_delta() : String
    {
        return _internal_cmpy_ldgo_delta;
    }

    [Bindable(event="propertyChange")]
    public function get perl_enter_time() : Object
    {
        return _internal_perl_enter_time;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_rpt_t_unit() : String
    {
        return _internal_cmpy_rpt_t_unit;
    }

    [Bindable(event="propertyChange")]
    public function get per_lock() : String
    {
        return _internal_per_lock;
    }

    [Bindable(event="propertyChange")]
    public function get role() : Object
    {
        return _internal_role;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_msg() : Object
    {
        return _internal_cmpy_msg;
    }

    [Bindable(event="propertyChange")]
    public function get per_auth() : String
    {
        return _internal_per_auth;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_host() : String
    {
        return _internal_cmpy_host;
    }

    [Bindable(event="propertyChange")]
    public function get per_exp_d1_dmy() : String
    {
        return _internal_per_exp_d1_dmy;
    }

    [Bindable(event="propertyChange")]
    public function get user_type() : String
    {
        return _internal_user_type;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_ord_end() : String
    {
        return _internal_cmpy_ord_end;
    }

    [Bindable(event="propertyChange")]
    public function get per_password() : Object
    {
        return _internal_per_password;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_tkr_cfg() : String
    {
        return _internal_cmpy_tkr_cfg;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_ord_strt() : String
    {
        return _internal_cmpy_ord_strt;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_code() : String
    {
        return _internal_cmpy_code;
    }

    [Bindable(event="propertyChange")]
    public function get record_order() : String
    {
        return _internal_record_order;
    }

    [Bindable(event="propertyChange")]
    public function get expire_time() : String
    {
        return _internal_expire_time;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_exp_code() : Object
    {
        return _internal_cmpy_exp_code;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_name() : String
    {
        return _internal_cmpy_name;
    }

    [Bindable(event="propertyChange")]
    public function get user_status_flag() : String
    {
        return _internal_user_status_flag;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_ld_rep_vp() : String
    {
        return _internal_cmpy_ld_rep_vp;
    }

    [Bindable(event="propertyChange")]
    public function get per_passwd_2() : String
    {
        return _internal_per_passwd_2;
    }

    [Bindable(event="propertyChange")]
    public function get perl_ara() : String
    {
        return _internal_perl_ara;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_vet() : String
    {
        return _internal_cmpy_vet;
    }

    [Bindable(event="propertyChange")]
    public function get per_level_num() : String
    {
        return _internal_per_level_num;
    }

    [Bindable(event="propertyChange")]
    public function get per_next_msg() : Object
    {
        return _internal_per_next_msg;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_rtn_prompt() : String
    {
        return _internal_cmpy_rtn_prompt;
    }

    [Bindable(event="propertyChange")]
    public function get user_last_reason() : Object
    {
        return _internal_user_last_reason;
    }

    [Bindable(event="propertyChange")]
    public function get user_password() : String
    {
        return _internal_user_password;
    }

    [Bindable(event="propertyChange")]
    public function get per_accesslocks() : Object
    {
        return _internal_per_accesslocks;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_bol_vp_name() : String
    {
        return _internal_cmpy_bol_vp_name;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_trip_last() : String
    {
        return _internal_cmpy_trip_last;
    }

    [Bindable(event="propertyChange")]
    public function get per_cmpy() : String
    {
        return _internal_per_cmpy;
    }

    [Bindable(event="propertyChange")]
    public function get per_passconfirm() : Object
    {
        return _internal_per_passconfirm;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_add_prompt() : String
    {
        return _internal_cmpy_add_prompt;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_log_ld_del() : String
    {
        return _internal_cmpy_log_ld_del;
    }

    [Bindable(event="propertyChange")]
    public function get session_id() : Object
    {
        return _internal_session_id;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_auto_ld() : String
    {
        return _internal_cmpy_auto_ld;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_type() : String
    {
        return _internal_cmpy_type;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_tkr_activat() : String
    {
        return _internal_cmpy_tkr_activat;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_rpt_temp() : String
    {
        return _internal_cmpy_rpt_temp;
    }

    [Bindable(event="propertyChange")]
    public function get per_code() : String
    {
        return _internal_per_code;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_wipe_ordets() : String
    {
        return _internal_cmpy_wipe_ordets;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_mod_drawer() : String
    {
        return _internal_cmpy_mod_drawer;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_flag_3() : String
    {
        return _internal_cmpy_flag_3;
    }

    [Bindable(event="propertyChange")]
    public function get per_licence_no() : Object
    {
        return _internal_per_licence_no;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_bay_loop_ch() : String
    {
        return _internal_cmpy_bay_loop_ch;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_flag_1() : String
    {
        return _internal_cmpy_flag_1;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_flag_2() : String
    {
        return _internal_cmpy_flag_2;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_enable_expd() : String
    {
        return _internal_cmpy_enable_expd;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_trip_end() : String
    {
        return _internal_cmpy_trip_end;
    }

    [Bindable(event="propertyChange")]
    public function get user_id() : String
    {
        return _internal_user_id;
    }

    [Bindable(event="propertyChange")]
    public function get perl_psn() : String
    {
        return _internal_perl_psn;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_comms_ok() : String
    {
        return _internal_cmpy_comms_ok;
    }

    [Bindable(event="propertyChange")]
    public function get pt_psncode() : String
    {
        return _internal_pt_psncode;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_issu() : String
    {
        return _internal_cmpy_issu;
    }

    [Bindable(event="propertyChange")]
    public function get record_switch() : String
    {
        return _internal_record_switch;
    }

    [Bindable(event="propertyChange")]
    public function get per_name() : String
    {
        return _internal_per_name;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_wgh_complet() : String
    {
        return _internal_cmpy_wgh_complet;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_compress_bl() : Object
    {
        return _internal_cmpy_compress_bl;
    }

    [Bindable(event="propertyChange")]
    public function get per_department() : String
    {
        return _internal_per_department;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_auto_reconc() : String
    {
        return _internal_cmpy_auto_reconc;
    }

    [Bindable(event="propertyChange")]
    public function get per_exp_d2_dmy() : String
    {
        return _internal_per_exp_d2_dmy;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_bltol_flag() : String
    {
        return _internal_cmpy_bltol_flag;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_must_sealno() : String
    {
        return _internal_cmpy_must_sealno;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_ord_last() : String
    {
        return _internal_cmpy_ord_last;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_seal_number() : String
    {
        return _internal_cmpy_seal_number;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_host_docs() : String
    {
        return _internal_cmpy_host_docs;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_trip_strt() : String
    {
        return _internal_cmpy_trip_strt;
    }

    [Bindable(event="propertyChange")]
    public function get per_terminal() : Object
    {
        return _internal_per_terminal;
    }

    [Bindable(event="propertyChange")]
    public function get valid_time() : String
    {
        return _internal_valid_time;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_wgh_auto_fl() : String
    {
        return _internal_cmpy_wgh_auto_fl;
    }

    [Bindable(event="propertyChange")]
    public function get user_username() : String
    {
        return _internal_user_username;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_req_pin_flag() : String
    {
        return _internal_cmpy_req_pin_flag;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_check_licen() : Object
    {
        return _internal_cmpy_check_licen;
    }

    [Bindable(event="propertyChange")]
    public function get per_last_dmy() : String
    {
        return _internal_per_last_dmy;
    }

    [Bindable(event="propertyChange")]
    public function get password_validate() : Object
    {
        return _internal_password_validate;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set rn(value:String) : void
    {
        var oldValue:String = _internal_rn;
        if (oldValue !== value)
        {
            _internal_rn = value;
        }
    }

    public function set cmpy_ord_carrier(value:String) : void
    {
        var oldValue:String = _internal_cmpy_ord_carrier;
        if (oldValue !== value)
        {
            _internal_cmpy_ord_carrier = value;
        }
    }

    public function set per_area(value:Object) : void
    {
        var oldValue:Object = _internal_per_area;
        if (oldValue !== value)
        {
            _internal_per_area = value;
        }
    }

    public function set user_login_count(value:Object) : void
    {
        var oldValue:Object = _internal_user_login_count;
        if (oldValue !== value)
        {
            _internal_user_login_count = value;
        }
    }

    public function set cmpy_ldtol_flag(value:String) : void
    {
        var oldValue:String = _internal_cmpy_ldtol_flag;
        if (oldValue !== value)
        {
            _internal_cmpy_ldtol_flag = value;
        }
    }

    public function set pt_timecd(value:String) : void
    {
        var oldValue:String = _internal_pt_timecd;
        if (oldValue !== value)
        {
            _internal_pt_timecd = value;
        }
    }

    public function set cmpy_drv_inst_vp(value:String) : void
    {
        var oldValue:String = _internal_cmpy_drv_inst_vp;
        if (oldValue !== value)
        {
            _internal_cmpy_drv_inst_vp = value;
        }
    }

    public function set user_code(value:String) : void
    {
        var oldValue:String = _internal_user_code;
        if (oldValue !== value)
        {
            _internal_user_code = value;
        }
    }

    public function set per_passwd(value:String) : void
    {
        var oldValue:String = _internal_per_passwd;
        if (oldValue !== value)
        {
            _internal_per_passwd = value;
        }
    }

    public function set per_exp_d3_dmy(value:String) : void
    {
        var oldValue:String = _internal_per_exp_d3_dmy;
        if (oldValue !== value)
        {
            _internal_per_exp_d3_dmy = value;
        }
    }

    public function set cmpy_aoi(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_aoi;
        if (oldValue !== value)
        {
            _internal_cmpy_aoi = value;
        }
    }

    public function set cmpy_ldgo_delta(value:String) : void
    {
        var oldValue:String = _internal_cmpy_ldgo_delta;
        if (oldValue !== value)
        {
            _internal_cmpy_ldgo_delta = value;
        }
    }

    public function set perl_enter_time(value:Object) : void
    {
        var oldValue:Object = _internal_perl_enter_time;
        if (oldValue !== value)
        {
            _internal_perl_enter_time = value;
        }
    }

    public function set cmpy_rpt_t_unit(value:String) : void
    {
        var oldValue:String = _internal_cmpy_rpt_t_unit;
        if (oldValue !== value)
        {
            _internal_cmpy_rpt_t_unit = value;
        }
    }

    public function set per_lock(value:String) : void
    {
        var oldValue:String = _internal_per_lock;
        if (oldValue !== value)
        {
            _internal_per_lock = value;
        }
    }

    public function set role(value:Object) : void
    {
        var oldValue:Object = _internal_role;
        if (oldValue !== value)
        {
            _internal_role = value;
        }
    }

    public function set cmpy_msg(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_msg;
        if (oldValue !== value)
        {
            _internal_cmpy_msg = value;
        }
    }

    public function set per_auth(value:String) : void
    {
        var oldValue:String = _internal_per_auth;
        if (oldValue !== value)
        {
            _internal_per_auth = value;
        }
    }

    public function set cmpy_host(value:String) : void
    {
        var oldValue:String = _internal_cmpy_host;
        if (oldValue !== value)
        {
            _internal_cmpy_host = value;
        }
    }

    public function set per_exp_d1_dmy(value:String) : void
    {
        var oldValue:String = _internal_per_exp_d1_dmy;
        if (oldValue !== value)
        {
            _internal_per_exp_d1_dmy = value;
        }
    }

    public function set user_type(value:String) : void
    {
        var oldValue:String = _internal_user_type;
        if (oldValue !== value)
        {
            _internal_user_type = value;
        }
    }

    public function set cmpy_ord_end(value:String) : void
    {
        var oldValue:String = _internal_cmpy_ord_end;
        if (oldValue !== value)
        {
            _internal_cmpy_ord_end = value;
        }
    }

    public function set per_password(value:Object) : void
    {
        var oldValue:Object = _internal_per_password;
        if (oldValue !== value)
        {
            _internal_per_password = value;
        }
    }

    public function set cmpy_tkr_cfg(value:String) : void
    {
        var oldValue:String = _internal_cmpy_tkr_cfg;
        if (oldValue !== value)
        {
            _internal_cmpy_tkr_cfg = value;
        }
    }

    public function set cmpy_ord_strt(value:String) : void
    {
        var oldValue:String = _internal_cmpy_ord_strt;
        if (oldValue !== value)
        {
            _internal_cmpy_ord_strt = value;
        }
    }

    public function set cmpy_code(value:String) : void
    {
        var oldValue:String = _internal_cmpy_code;
        if (oldValue !== value)
        {
            _internal_cmpy_code = value;
        }
    }

    public function set record_order(value:String) : void
    {
        var oldValue:String = _internal_record_order;
        if (oldValue !== value)
        {
            _internal_record_order = value;
        }
    }

    public function set expire_time(value:String) : void
    {
        var oldValue:String = _internal_expire_time;
        if (oldValue !== value)
        {
            _internal_expire_time = value;
        }
    }

    public function set cmpy_exp_code(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_exp_code;
        if (oldValue !== value)
        {
            _internal_cmpy_exp_code = value;
        }
    }

    public function set cmpy_name(value:String) : void
    {
        var oldValue:String = _internal_cmpy_name;
        if (oldValue !== value)
        {
            _internal_cmpy_name = value;
        }
    }

    public function set user_status_flag(value:String) : void
    {
        var oldValue:String = _internal_user_status_flag;
        if (oldValue !== value)
        {
            _internal_user_status_flag = value;
        }
    }

    public function set cmpy_ld_rep_vp(value:String) : void
    {
        var oldValue:String = _internal_cmpy_ld_rep_vp;
        if (oldValue !== value)
        {
            _internal_cmpy_ld_rep_vp = value;
        }
    }

    public function set per_passwd_2(value:String) : void
    {
        var oldValue:String = _internal_per_passwd_2;
        if (oldValue !== value)
        {
            _internal_per_passwd_2 = value;
        }
    }

    public function set perl_ara(value:String) : void
    {
        var oldValue:String = _internal_perl_ara;
        if (oldValue !== value)
        {
            _internal_perl_ara = value;
        }
    }

    public function set cmpy_vet(value:String) : void
    {
        var oldValue:String = _internal_cmpy_vet;
        if (oldValue !== value)
        {
            _internal_cmpy_vet = value;
        }
    }

    public function set per_level_num(value:String) : void
    {
        var oldValue:String = _internal_per_level_num;
        if (oldValue !== value)
        {
            _internal_per_level_num = value;
        }
    }

    public function set per_next_msg(value:Object) : void
    {
        var oldValue:Object = _internal_per_next_msg;
        if (oldValue !== value)
        {
            _internal_per_next_msg = value;
        }
    }

    public function set cmpy_rtn_prompt(value:String) : void
    {
        var oldValue:String = _internal_cmpy_rtn_prompt;
        if (oldValue !== value)
        {
            _internal_cmpy_rtn_prompt = value;
        }
    }

    public function set user_last_reason(value:Object) : void
    {
        var oldValue:Object = _internal_user_last_reason;
        if (oldValue !== value)
        {
            _internal_user_last_reason = value;
        }
    }

    public function set user_password(value:String) : void
    {
        var oldValue:String = _internal_user_password;
        if (oldValue !== value)
        {
            _internal_user_password = value;
        }
    }

    public function set per_accesslocks(value:Object) : void
    {
        var oldValue:Object = _internal_per_accesslocks;
        if (oldValue !== value)
        {
            _internal_per_accesslocks = value;
        }
    }

    public function set cmpy_bol_vp_name(value:String) : void
    {
        var oldValue:String = _internal_cmpy_bol_vp_name;
        if (oldValue !== value)
        {
            _internal_cmpy_bol_vp_name = value;
        }
    }

    public function set cmpy_trip_last(value:String) : void
    {
        var oldValue:String = _internal_cmpy_trip_last;
        if (oldValue !== value)
        {
            _internal_cmpy_trip_last = value;
        }
    }

    public function set per_cmpy(value:String) : void
    {
        var oldValue:String = _internal_per_cmpy;
        if (oldValue !== value)
        {
            _internal_per_cmpy = value;
        }
    }

    public function set per_passconfirm(value:Object) : void
    {
        var oldValue:Object = _internal_per_passconfirm;
        if (oldValue !== value)
        {
            _internal_per_passconfirm = value;
        }
    }

    public function set cmpy_add_prompt(value:String) : void
    {
        var oldValue:String = _internal_cmpy_add_prompt;
        if (oldValue !== value)
        {
            _internal_cmpy_add_prompt = value;
        }
    }

    public function set cmpy_log_ld_del(value:String) : void
    {
        var oldValue:String = _internal_cmpy_log_ld_del;
        if (oldValue !== value)
        {
            _internal_cmpy_log_ld_del = value;
        }
    }

    public function set session_id(value:Object) : void
    {
        var oldValue:Object = _internal_session_id;
        if (oldValue !== value)
        {
            _internal_session_id = value;
        }
    }

    public function set cmpy_auto_ld(value:String) : void
    {
        var oldValue:String = _internal_cmpy_auto_ld;
        if (oldValue !== value)
        {
            _internal_cmpy_auto_ld = value;
        }
    }

    public function set cmpy_type(value:String) : void
    {
        var oldValue:String = _internal_cmpy_type;
        if (oldValue !== value)
        {
            _internal_cmpy_type = value;
        }
    }

    public function set cmpy_tkr_activat(value:String) : void
    {
        var oldValue:String = _internal_cmpy_tkr_activat;
        if (oldValue !== value)
        {
            _internal_cmpy_tkr_activat = value;
        }
    }

    public function set cmpy_rpt_temp(value:String) : void
    {
        var oldValue:String = _internal_cmpy_rpt_temp;
        if (oldValue !== value)
        {
            _internal_cmpy_rpt_temp = value;
        }
    }

    public function set per_code(value:String) : void
    {
        var oldValue:String = _internal_per_code;
        if (oldValue !== value)
        {
            _internal_per_code = value;
        }
    }

    public function set cmpy_wipe_ordets(value:String) : void
    {
        var oldValue:String = _internal_cmpy_wipe_ordets;
        if (oldValue !== value)
        {
            _internal_cmpy_wipe_ordets = value;
        }
    }

    public function set cmpy_mod_drawer(value:String) : void
    {
        var oldValue:String = _internal_cmpy_mod_drawer;
        if (oldValue !== value)
        {
            _internal_cmpy_mod_drawer = value;
        }
    }

    public function set cmpy_flag_3(value:String) : void
    {
        var oldValue:String = _internal_cmpy_flag_3;
        if (oldValue !== value)
        {
            _internal_cmpy_flag_3 = value;
        }
    }

    public function set per_licence_no(value:Object) : void
    {
        var oldValue:Object = _internal_per_licence_no;
        if (oldValue !== value)
        {
            _internal_per_licence_no = value;
        }
    }

    public function set cmpy_bay_loop_ch(value:String) : void
    {
        var oldValue:String = _internal_cmpy_bay_loop_ch;
        if (oldValue !== value)
        {
            _internal_cmpy_bay_loop_ch = value;
        }
    }

    public function set cmpy_flag_1(value:String) : void
    {
        var oldValue:String = _internal_cmpy_flag_1;
        if (oldValue !== value)
        {
            _internal_cmpy_flag_1 = value;
        }
    }

    public function set cmpy_flag_2(value:String) : void
    {
        var oldValue:String = _internal_cmpy_flag_2;
        if (oldValue !== value)
        {
            _internal_cmpy_flag_2 = value;
        }
    }

    public function set cmpy_enable_expd(value:String) : void
    {
        var oldValue:String = _internal_cmpy_enable_expd;
        if (oldValue !== value)
        {
            _internal_cmpy_enable_expd = value;
        }
    }

    public function set cmpy_trip_end(value:String) : void
    {
        var oldValue:String = _internal_cmpy_trip_end;
        if (oldValue !== value)
        {
            _internal_cmpy_trip_end = value;
        }
    }

    public function set user_id(value:String) : void
    {
        var oldValue:String = _internal_user_id;
        if (oldValue !== value)
        {
            _internal_user_id = value;
        }
    }

    public function set perl_psn(value:String) : void
    {
        var oldValue:String = _internal_perl_psn;
        if (oldValue !== value)
        {
            _internal_perl_psn = value;
        }
    }

    public function set cmpy_comms_ok(value:String) : void
    {
        var oldValue:String = _internal_cmpy_comms_ok;
        if (oldValue !== value)
        {
            _internal_cmpy_comms_ok = value;
        }
    }

    public function set pt_psncode(value:String) : void
    {
        var oldValue:String = _internal_pt_psncode;
        if (oldValue !== value)
        {
            _internal_pt_psncode = value;
        }
    }

    public function set cmpy_issu(value:String) : void
    {
        var oldValue:String = _internal_cmpy_issu;
        if (oldValue !== value)
        {
            _internal_cmpy_issu = value;
        }
    }

    public function set record_switch(value:String) : void
    {
        var oldValue:String = _internal_record_switch;
        if (oldValue !== value)
        {
            _internal_record_switch = value;
        }
    }

    public function set per_name(value:String) : void
    {
        var oldValue:String = _internal_per_name;
        if (oldValue !== value)
        {
            _internal_per_name = value;
        }
    }

    public function set cmpy_wgh_complet(value:String) : void
    {
        var oldValue:String = _internal_cmpy_wgh_complet;
        if (oldValue !== value)
        {
            _internal_cmpy_wgh_complet = value;
        }
    }

    public function set cmpy_compress_bl(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_compress_bl;
        if (oldValue !== value)
        {
            _internal_cmpy_compress_bl = value;
        }
    }

    public function set per_department(value:String) : void
    {
        var oldValue:String = _internal_per_department;
        if (oldValue !== value)
        {
            _internal_per_department = value;
        }
    }

    public function set cmpy_auto_reconc(value:String) : void
    {
        var oldValue:String = _internal_cmpy_auto_reconc;
        if (oldValue !== value)
        {
            _internal_cmpy_auto_reconc = value;
        }
    }

    public function set per_exp_d2_dmy(value:String) : void
    {
        var oldValue:String = _internal_per_exp_d2_dmy;
        if (oldValue !== value)
        {
            _internal_per_exp_d2_dmy = value;
        }
    }

    public function set cmpy_bltol_flag(value:String) : void
    {
        var oldValue:String = _internal_cmpy_bltol_flag;
        if (oldValue !== value)
        {
            _internal_cmpy_bltol_flag = value;
        }
    }

    public function set cmpy_must_sealno(value:String) : void
    {
        var oldValue:String = _internal_cmpy_must_sealno;
        if (oldValue !== value)
        {
            _internal_cmpy_must_sealno = value;
        }
    }

    public function set cmpy_ord_last(value:String) : void
    {
        var oldValue:String = _internal_cmpy_ord_last;
        if (oldValue !== value)
        {
            _internal_cmpy_ord_last = value;
        }
    }

    public function set cmpy_seal_number(value:String) : void
    {
        var oldValue:String = _internal_cmpy_seal_number;
        if (oldValue !== value)
        {
            _internal_cmpy_seal_number = value;
        }
    }

    public function set cmpy_host_docs(value:String) : void
    {
        var oldValue:String = _internal_cmpy_host_docs;
        if (oldValue !== value)
        {
            _internal_cmpy_host_docs = value;
        }
    }

    public function set cmpy_trip_strt(value:String) : void
    {
        var oldValue:String = _internal_cmpy_trip_strt;
        if (oldValue !== value)
        {
            _internal_cmpy_trip_strt = value;
        }
    }

    public function set per_terminal(value:Object) : void
    {
        var oldValue:Object = _internal_per_terminal;
        if (oldValue !== value)
        {
            _internal_per_terminal = value;
        }
    }

    public function set valid_time(value:String) : void
    {
        var oldValue:String = _internal_valid_time;
        if (oldValue !== value)
        {
            _internal_valid_time = value;
        }
    }

    public function set cmpy_wgh_auto_fl(value:String) : void
    {
        var oldValue:String = _internal_cmpy_wgh_auto_fl;
        if (oldValue !== value)
        {
            _internal_cmpy_wgh_auto_fl = value;
        }
    }

    public function set user_username(value:String) : void
    {
        var oldValue:String = _internal_user_username;
        if (oldValue !== value)
        {
            _internal_user_username = value;
        }
    }

    public function set cmpy_req_pin_flag(value:String) : void
    {
        var oldValue:String = _internal_cmpy_req_pin_flag;
        if (oldValue !== value)
        {
            _internal_cmpy_req_pin_flag = value;
        }
    }

    public function set cmpy_check_licen(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_check_licen;
        if (oldValue !== value)
        {
            _internal_cmpy_check_licen = value;
        }
    }

    public function set per_last_dmy(value:String) : void
    {
        var oldValue:String = _internal_per_last_dmy;
        if (oldValue !== value)
        {
            _internal_per_last_dmy = value;
        }
    }

    public function set password_validate(value:Object) : void
    {
        var oldValue:Object = _internal_password_validate;
        if (oldValue !== value)
        {
            _internal_password_validate = value;
        }
    }

    /**
     * Data/source property setter listeners
     *
     * Each data property whose value affects other properties or the validity of the entity
     * needs to invalidate all previously calculated artifacts. These include:
     *  - any derived properties or constraints that reference the given data property.
     *  - any availability guards (variant expressions) that reference the given data property.
     *  - any style validations, message tokens or guards that reference the given data property.
     *  - the validity of the property (and the containing entity) if the given data property has a length restriction.
     *  - the validity of the property (and the containing entity) if the given data property is required.
     */

    model_internal function setterListenerCmpy_ord_carrier(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_ord_carrier();
    }

    model_internal function setterListenerPer_area(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPer_area();
    }

    model_internal function setterListenerUser_login_count(value:flash.events.Event):void
    {
        _model.invalidateDependentOnUser_login_count();
    }

    model_internal function setterListenerCmpy_ldtol_flag(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_ldtol_flag();
    }

    model_internal function setterListenerPt_timecd(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPt_timecd();
    }

    model_internal function setterListenerCmpy_drv_inst_vp(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_drv_inst_vp();
    }

    model_internal function setterListenerUser_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnUser_code();
    }

    model_internal function setterListenerPer_passwd(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPer_passwd();
    }

    model_internal function setterListenerPer_exp_d3_dmy(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPer_exp_d3_dmy();
    }

    model_internal function setterListenerCmpy_aoi(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_aoi();
    }

    model_internal function setterListenerCmpy_ldgo_delta(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_ldgo_delta();
    }

    model_internal function setterListenerPerl_enter_time(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPerl_enter_time();
    }

    model_internal function setterListenerCmpy_rpt_t_unit(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_rpt_t_unit();
    }

    model_internal function setterListenerPer_lock(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPer_lock();
    }

    model_internal function setterListenerRole(value:flash.events.Event):void
    {
        _model.invalidateDependentOnRole();
    }

    model_internal function setterListenerCmpy_msg(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_msg();
    }

    model_internal function setterListenerPer_auth(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPer_auth();
    }

    model_internal function setterListenerCmpy_host(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_host();
    }

    model_internal function setterListenerPer_exp_d1_dmy(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPer_exp_d1_dmy();
    }

    model_internal function setterListenerUser_type(value:flash.events.Event):void
    {
        _model.invalidateDependentOnUser_type();
    }

    model_internal function setterListenerCmpy_ord_end(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_ord_end();
    }

    model_internal function setterListenerPer_password(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPer_password();
    }

    model_internal function setterListenerCmpy_tkr_cfg(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_tkr_cfg();
    }

    model_internal function setterListenerCmpy_ord_strt(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_ord_strt();
    }

    model_internal function setterListenerCmpy_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_code();
    }

    model_internal function setterListenerRecord_order(value:flash.events.Event):void
    {
        _model.invalidateDependentOnRecord_order();
    }

    model_internal function setterListenerExpire_time(value:flash.events.Event):void
    {
        _model.invalidateDependentOnExpire_time();
    }

    model_internal function setterListenerCmpy_exp_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_exp_code();
    }

    model_internal function setterListenerCmpy_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_name();
    }

    model_internal function setterListenerUser_status_flag(value:flash.events.Event):void
    {
        _model.invalidateDependentOnUser_status_flag();
    }

    model_internal function setterListenerCmpy_ld_rep_vp(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_ld_rep_vp();
    }

    model_internal function setterListenerPer_passwd_2(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPer_passwd_2();
    }

    model_internal function setterListenerPerl_ara(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPerl_ara();
    }

    model_internal function setterListenerCmpy_vet(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_vet();
    }

    model_internal function setterListenerPer_level_num(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPer_level_num();
    }

    model_internal function setterListenerPer_next_msg(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPer_next_msg();
    }

    model_internal function setterListenerCmpy_rtn_prompt(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_rtn_prompt();
    }

    model_internal function setterListenerUser_last_reason(value:flash.events.Event):void
    {
        _model.invalidateDependentOnUser_last_reason();
    }

    model_internal function setterListenerUser_password(value:flash.events.Event):void
    {
        _model.invalidateDependentOnUser_password();
    }

    model_internal function setterListenerPer_accesslocks(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPer_accesslocks();
    }

    model_internal function setterListenerCmpy_bol_vp_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_bol_vp_name();
    }

    model_internal function setterListenerCmpy_trip_last(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_trip_last();
    }

    model_internal function setterListenerPer_cmpy(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPer_cmpy();
    }

    model_internal function setterListenerPer_passconfirm(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPer_passconfirm();
    }

    model_internal function setterListenerCmpy_add_prompt(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_add_prompt();
    }

    model_internal function setterListenerCmpy_log_ld_del(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_log_ld_del();
    }

    model_internal function setterListenerSession_id(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSession_id();
    }

    model_internal function setterListenerCmpy_auto_ld(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_auto_ld();
    }

    model_internal function setterListenerCmpy_type(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_type();
    }

    model_internal function setterListenerCmpy_tkr_activat(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_tkr_activat();
    }

    model_internal function setterListenerCmpy_rpt_temp(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_rpt_temp();
    }

    model_internal function setterListenerPer_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPer_code();
    }

    model_internal function setterListenerCmpy_wipe_ordets(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_wipe_ordets();
    }

    model_internal function setterListenerCmpy_mod_drawer(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_mod_drawer();
    }

    model_internal function setterListenerCmpy_flag_3(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_flag_3();
    }

    model_internal function setterListenerPer_licence_no(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPer_licence_no();
    }

    model_internal function setterListenerCmpy_bay_loop_ch(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_bay_loop_ch();
    }

    model_internal function setterListenerCmpy_flag_1(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_flag_1();
    }

    model_internal function setterListenerCmpy_flag_2(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_flag_2();
    }

    model_internal function setterListenerCmpy_enable_expd(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_enable_expd();
    }

    model_internal function setterListenerCmpy_trip_end(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_trip_end();
    }

    model_internal function setterListenerUser_id(value:flash.events.Event):void
    {
        _model.invalidateDependentOnUser_id();
    }

    model_internal function setterListenerPerl_psn(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPerl_psn();
    }

    model_internal function setterListenerCmpy_comms_ok(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_comms_ok();
    }

    model_internal function setterListenerPt_psncode(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPt_psncode();
    }

    model_internal function setterListenerCmpy_issu(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_issu();
    }

    model_internal function setterListenerRecord_switch(value:flash.events.Event):void
    {
        _model.invalidateDependentOnRecord_switch();
    }

    model_internal function setterListenerPer_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPer_name();
    }

    model_internal function setterListenerCmpy_wgh_complet(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_wgh_complet();
    }

    model_internal function setterListenerCmpy_compress_bl(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_compress_bl();
    }

    model_internal function setterListenerPer_department(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPer_department();
    }

    model_internal function setterListenerCmpy_auto_reconc(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_auto_reconc();
    }

    model_internal function setterListenerPer_exp_d2_dmy(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPer_exp_d2_dmy();
    }

    model_internal function setterListenerCmpy_bltol_flag(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_bltol_flag();
    }

    model_internal function setterListenerCmpy_must_sealno(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_must_sealno();
    }

    model_internal function setterListenerCmpy_ord_last(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_ord_last();
    }

    model_internal function setterListenerCmpy_seal_number(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_seal_number();
    }

    model_internal function setterListenerCmpy_host_docs(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_host_docs();
    }

    model_internal function setterListenerCmpy_trip_strt(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_trip_strt();
    }

    model_internal function setterListenerPer_terminal(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPer_terminal();
    }

    model_internal function setterListenerValid_time(value:flash.events.Event):void
    {
        _model.invalidateDependentOnValid_time();
    }

    model_internal function setterListenerCmpy_wgh_auto_fl(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_wgh_auto_fl();
    }

    model_internal function setterListenerUser_username(value:flash.events.Event):void
    {
        _model.invalidateDependentOnUser_username();
    }

    model_internal function setterListenerCmpy_req_pin_flag(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_req_pin_flag();
    }

    model_internal function setterListenerCmpy_check_licen(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_check_licen();
    }

    model_internal function setterListenerPer_last_dmy(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPer_last_dmy();
    }

    model_internal function setterListenerPassword_validate(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPassword_validate();
    }


    /**
     * valid related derived properties
     */
    model_internal var _isValid : Boolean;
    model_internal var _invalidConstraints:Array = new Array();
    model_internal var _validationFailureMessages:Array = new Array();

    /**
     * derived property calculators
     */

    /**
     * isValid calculator
     */
    model_internal function calculateIsValid():Boolean
    {
        var violatedConsts:Array = new Array();
        var validationFailureMessages:Array = new Array();

        var propertyValidity:Boolean = true;
        if (!_model.cmpy_ord_carrierIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_ord_carrierValidationFailureMessages);
        }
        if (!_model.per_areaIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_per_areaValidationFailureMessages);
        }
        if (!_model.user_login_countIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_user_login_countValidationFailureMessages);
        }
        if (!_model.cmpy_ldtol_flagIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_ldtol_flagValidationFailureMessages);
        }
        if (!_model.pt_timecdIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_pt_timecdValidationFailureMessages);
        }
        if (!_model.cmpy_drv_inst_vpIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_drv_inst_vpValidationFailureMessages);
        }
        if (!_model.user_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_user_codeValidationFailureMessages);
        }
        if (!_model.per_passwdIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_per_passwdValidationFailureMessages);
        }
        if (!_model.per_exp_d3_dmyIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_per_exp_d3_dmyValidationFailureMessages);
        }
        if (!_model.cmpy_aoiIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_aoiValidationFailureMessages);
        }
        if (!_model.cmpy_ldgo_deltaIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_ldgo_deltaValidationFailureMessages);
        }
        if (!_model.perl_enter_timeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_perl_enter_timeValidationFailureMessages);
        }
        if (!_model.cmpy_rpt_t_unitIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_rpt_t_unitValidationFailureMessages);
        }
        if (!_model.per_lockIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_per_lockValidationFailureMessages);
        }
        if (!_model.roleIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_roleValidationFailureMessages);
        }
        if (!_model.cmpy_msgIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_msgValidationFailureMessages);
        }
        if (!_model.per_authIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_per_authValidationFailureMessages);
        }
        if (!_model.cmpy_hostIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_hostValidationFailureMessages);
        }
        if (!_model.per_exp_d1_dmyIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_per_exp_d1_dmyValidationFailureMessages);
        }
        if (!_model.user_typeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_user_typeValidationFailureMessages);
        }
        if (!_model.cmpy_ord_endIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_ord_endValidationFailureMessages);
        }
        if (!_model.per_passwordIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_per_passwordValidationFailureMessages);
        }
        if (!_model.cmpy_tkr_cfgIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_tkr_cfgValidationFailureMessages);
        }
        if (!_model.cmpy_ord_strtIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_ord_strtValidationFailureMessages);
        }
        if (!_model.cmpy_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_codeValidationFailureMessages);
        }
        if (!_model.record_orderIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_record_orderValidationFailureMessages);
        }
        if (!_model.expire_timeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_expire_timeValidationFailureMessages);
        }
        if (!_model.cmpy_exp_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_exp_codeValidationFailureMessages);
        }
        if (!_model.cmpy_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_nameValidationFailureMessages);
        }
        if (!_model.user_status_flagIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_user_status_flagValidationFailureMessages);
        }
        if (!_model.cmpy_ld_rep_vpIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_ld_rep_vpValidationFailureMessages);
        }
        if (!_model.per_passwd_2IsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_per_passwd_2ValidationFailureMessages);
        }
        if (!_model.perl_araIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_perl_araValidationFailureMessages);
        }
        if (!_model.cmpy_vetIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_vetValidationFailureMessages);
        }
        if (!_model.per_level_numIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_per_level_numValidationFailureMessages);
        }
        if (!_model.per_next_msgIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_per_next_msgValidationFailureMessages);
        }
        if (!_model.cmpy_rtn_promptIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_rtn_promptValidationFailureMessages);
        }
        if (!_model.user_last_reasonIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_user_last_reasonValidationFailureMessages);
        }
        if (!_model.user_passwordIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_user_passwordValidationFailureMessages);
        }
        if (!_model.per_accesslocksIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_per_accesslocksValidationFailureMessages);
        }
        if (!_model.cmpy_bol_vp_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_bol_vp_nameValidationFailureMessages);
        }
        if (!_model.cmpy_trip_lastIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_trip_lastValidationFailureMessages);
        }
        if (!_model.per_cmpyIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_per_cmpyValidationFailureMessages);
        }
        if (!_model.per_passconfirmIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_per_passconfirmValidationFailureMessages);
        }
        if (!_model.cmpy_add_promptIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_add_promptValidationFailureMessages);
        }
        if (!_model.cmpy_log_ld_delIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_log_ld_delValidationFailureMessages);
        }
        if (!_model.session_idIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_session_idValidationFailureMessages);
        }
        if (!_model.cmpy_auto_ldIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_auto_ldValidationFailureMessages);
        }
        if (!_model.cmpy_typeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_typeValidationFailureMessages);
        }
        if (!_model.cmpy_tkr_activatIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_tkr_activatValidationFailureMessages);
        }
        if (!_model.cmpy_rpt_tempIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_rpt_tempValidationFailureMessages);
        }
        if (!_model.per_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_per_codeValidationFailureMessages);
        }
        if (!_model.cmpy_wipe_ordetsIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_wipe_ordetsValidationFailureMessages);
        }
        if (!_model.cmpy_mod_drawerIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_mod_drawerValidationFailureMessages);
        }
        if (!_model.cmpy_flag_3IsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_flag_3ValidationFailureMessages);
        }
        if (!_model.per_licence_noIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_per_licence_noValidationFailureMessages);
        }
        if (!_model.cmpy_bay_loop_chIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_bay_loop_chValidationFailureMessages);
        }
        if (!_model.cmpy_flag_1IsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_flag_1ValidationFailureMessages);
        }
        if (!_model.cmpy_flag_2IsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_flag_2ValidationFailureMessages);
        }
        if (!_model.cmpy_enable_expdIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_enable_expdValidationFailureMessages);
        }
        if (!_model.cmpy_trip_endIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_trip_endValidationFailureMessages);
        }
        if (!_model.user_idIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_user_idValidationFailureMessages);
        }
        if (!_model.perl_psnIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_perl_psnValidationFailureMessages);
        }
        if (!_model.cmpy_comms_okIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_comms_okValidationFailureMessages);
        }
        if (!_model.pt_psncodeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_pt_psncodeValidationFailureMessages);
        }
        if (!_model.cmpy_issuIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_issuValidationFailureMessages);
        }
        if (!_model.record_switchIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_record_switchValidationFailureMessages);
        }
        if (!_model.per_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_per_nameValidationFailureMessages);
        }
        if (!_model.cmpy_wgh_completIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_wgh_completValidationFailureMessages);
        }
        if (!_model.cmpy_compress_blIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_compress_blValidationFailureMessages);
        }
        if (!_model.per_departmentIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_per_departmentValidationFailureMessages);
        }
        if (!_model.cmpy_auto_reconcIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_auto_reconcValidationFailureMessages);
        }
        if (!_model.per_exp_d2_dmyIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_per_exp_d2_dmyValidationFailureMessages);
        }
        if (!_model.cmpy_bltol_flagIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_bltol_flagValidationFailureMessages);
        }
        if (!_model.cmpy_must_sealnoIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_must_sealnoValidationFailureMessages);
        }
        if (!_model.cmpy_ord_lastIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_ord_lastValidationFailureMessages);
        }
        if (!_model.cmpy_seal_numberIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_seal_numberValidationFailureMessages);
        }
        if (!_model.cmpy_host_docsIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_host_docsValidationFailureMessages);
        }
        if (!_model.cmpy_trip_strtIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_trip_strtValidationFailureMessages);
        }
        if (!_model.per_terminalIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_per_terminalValidationFailureMessages);
        }
        if (!_model.valid_timeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_valid_timeValidationFailureMessages);
        }
        if (!_model.cmpy_wgh_auto_flIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_wgh_auto_flValidationFailureMessages);
        }
        if (!_model.user_usernameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_user_usernameValidationFailureMessages);
        }
        if (!_model.cmpy_req_pin_flagIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_req_pin_flagValidationFailureMessages);
        }
        if (!_model.cmpy_check_licenIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_check_licenValidationFailureMessages);
        }
        if (!_model.per_last_dmyIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_per_last_dmyValidationFailureMessages);
        }
        if (!_model.password_validateIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_password_validateValidationFailureMessages);
        }

        model_internal::_cacheInitialized_isValid = true;
        model_internal::invalidConstraints_der = violatedConsts;
        model_internal::validationFailureMessages_der = validationFailureMessages;
        return violatedConsts.length == 0 && propertyValidity;
    }

    /**
     * derived property setters
     */

    model_internal function set isValid_der(value:Boolean) : void
    {
        var oldValue:Boolean = model_internal::_isValid;
        if (oldValue !== value)
        {
            model_internal::_isValid = value;
            _model.model_internal::fireChangeEvent("isValid", oldValue, model_internal::_isValid);
        }
    }

    /**
     * derived property getters
     */

    [Transient]
    [Bindable(event="propertyChange")]
    public function get _model() : _Gui_PersonnelEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _Gui_PersonnelEntityMetadata) : void
    {
        var oldValue : _Gui_PersonnelEntityMetadata = model_internal::_dminternal_model;
        if (oldValue !== value)
        {
            model_internal::_dminternal_model = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "_model", oldValue, model_internal::_dminternal_model));
        }
    }

    /**
     * methods
     */


    /**
     *  services
     */
    private var _managingService:com.adobe.fiber.services.IFiberManagingService;

    public function set managingService(managingService:com.adobe.fiber.services.IFiberManagingService):void
    {
        _managingService = managingService;
    }

    model_internal function set invalidConstraints_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_invalidConstraints;
        // avoid firing the event when old and new value are different empty arrays
        if (oldValue !== value && (oldValue.length > 0 || value.length > 0))
        {
            model_internal::_invalidConstraints = value;
            _model.model_internal::fireChangeEvent("invalidConstraints", oldValue, model_internal::_invalidConstraints);
        }
    }

    model_internal function set validationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_validationFailureMessages;
        // avoid firing the event when old and new value are different empty arrays
        if (oldValue !== value && (oldValue.length > 0 || value.length > 0))
        {
            model_internal::_validationFailureMessages = value;
            _model.model_internal::fireChangeEvent("validationFailureMessages", oldValue, model_internal::_validationFailureMessages);
        }
    }

    model_internal var _doValidationCacheOfCmpy_ord_carrier : Array = null;
    model_internal var _doValidationLastValOfCmpy_ord_carrier : String;

    model_internal function _doValidationForCmpy_ord_carrier(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_ord_carrier != null && model_internal::_doValidationLastValOfCmpy_ord_carrier == value)
           return model_internal::_doValidationCacheOfCmpy_ord_carrier ;

        _model.model_internal::_cmpy_ord_carrierIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_ord_carrierAvailable && _internal_cmpy_ord_carrier == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_ord_carrier is required"));
        }

        model_internal::_doValidationCacheOfCmpy_ord_carrier = validationFailures;
        model_internal::_doValidationLastValOfCmpy_ord_carrier = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfPer_area : Array = null;
    model_internal var _doValidationLastValOfPer_area : Object;

    model_internal function _doValidationForPer_area(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfPer_area != null && model_internal::_doValidationLastValOfPer_area == value)
           return model_internal::_doValidationCacheOfPer_area ;

        _model.model_internal::_per_areaIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPer_areaAvailable && _internal_per_area == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "per_area is required"));
        }

        model_internal::_doValidationCacheOfPer_area = validationFailures;
        model_internal::_doValidationLastValOfPer_area = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfUser_login_count : Array = null;
    model_internal var _doValidationLastValOfUser_login_count : Object;

    model_internal function _doValidationForUser_login_count(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfUser_login_count != null && model_internal::_doValidationLastValOfUser_login_count == value)
           return model_internal::_doValidationCacheOfUser_login_count ;

        _model.model_internal::_user_login_countIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isUser_login_countAvailable && _internal_user_login_count == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "user_login_count is required"));
        }

        model_internal::_doValidationCacheOfUser_login_count = validationFailures;
        model_internal::_doValidationLastValOfUser_login_count = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_ldtol_flag : Array = null;
    model_internal var _doValidationLastValOfCmpy_ldtol_flag : String;

    model_internal function _doValidationForCmpy_ldtol_flag(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_ldtol_flag != null && model_internal::_doValidationLastValOfCmpy_ldtol_flag == value)
           return model_internal::_doValidationCacheOfCmpy_ldtol_flag ;

        _model.model_internal::_cmpy_ldtol_flagIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_ldtol_flagAvailable && _internal_cmpy_ldtol_flag == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_ldtol_flag is required"));
        }

        model_internal::_doValidationCacheOfCmpy_ldtol_flag = validationFailures;
        model_internal::_doValidationLastValOfCmpy_ldtol_flag = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfPt_timecd : Array = null;
    model_internal var _doValidationLastValOfPt_timecd : String;

    model_internal function _doValidationForPt_timecd(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfPt_timecd != null && model_internal::_doValidationLastValOfPt_timecd == value)
           return model_internal::_doValidationCacheOfPt_timecd ;

        _model.model_internal::_pt_timecdIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPt_timecdAvailable && _internal_pt_timecd == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "pt_timecd is required"));
        }

        model_internal::_doValidationCacheOfPt_timecd = validationFailures;
        model_internal::_doValidationLastValOfPt_timecd = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_drv_inst_vp : Array = null;
    model_internal var _doValidationLastValOfCmpy_drv_inst_vp : String;

    model_internal function _doValidationForCmpy_drv_inst_vp(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_drv_inst_vp != null && model_internal::_doValidationLastValOfCmpy_drv_inst_vp == value)
           return model_internal::_doValidationCacheOfCmpy_drv_inst_vp ;

        _model.model_internal::_cmpy_drv_inst_vpIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_drv_inst_vpAvailable && _internal_cmpy_drv_inst_vp == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_drv_inst_vp is required"));
        }

        model_internal::_doValidationCacheOfCmpy_drv_inst_vp = validationFailures;
        model_internal::_doValidationLastValOfCmpy_drv_inst_vp = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfUser_code : Array = null;
    model_internal var _doValidationLastValOfUser_code : String;

    model_internal function _doValidationForUser_code(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfUser_code != null && model_internal::_doValidationLastValOfUser_code == value)
           return model_internal::_doValidationCacheOfUser_code ;

        _model.model_internal::_user_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isUser_codeAvailable && _internal_user_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "user_code is required"));
        }

        model_internal::_doValidationCacheOfUser_code = validationFailures;
        model_internal::_doValidationLastValOfUser_code = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfPer_passwd : Array = null;
    model_internal var _doValidationLastValOfPer_passwd : String;

    model_internal function _doValidationForPer_passwd(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfPer_passwd != null && model_internal::_doValidationLastValOfPer_passwd == value)
           return model_internal::_doValidationCacheOfPer_passwd ;

        _model.model_internal::_per_passwdIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPer_passwdAvailable && _internal_per_passwd == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "per_passwd is required"));
        }

        model_internal::_doValidationCacheOfPer_passwd = validationFailures;
        model_internal::_doValidationLastValOfPer_passwd = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfPer_exp_d3_dmy : Array = null;
    model_internal var _doValidationLastValOfPer_exp_d3_dmy : String;

    model_internal function _doValidationForPer_exp_d3_dmy(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfPer_exp_d3_dmy != null && model_internal::_doValidationLastValOfPer_exp_d3_dmy == value)
           return model_internal::_doValidationCacheOfPer_exp_d3_dmy ;

        _model.model_internal::_per_exp_d3_dmyIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPer_exp_d3_dmyAvailable && _internal_per_exp_d3_dmy == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "per_exp_d3_dmy is required"));
        }

        model_internal::_doValidationCacheOfPer_exp_d3_dmy = validationFailures;
        model_internal::_doValidationLastValOfPer_exp_d3_dmy = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_aoi : Array = null;
    model_internal var _doValidationLastValOfCmpy_aoi : Object;

    model_internal function _doValidationForCmpy_aoi(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfCmpy_aoi != null && model_internal::_doValidationLastValOfCmpy_aoi == value)
           return model_internal::_doValidationCacheOfCmpy_aoi ;

        _model.model_internal::_cmpy_aoiIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_aoiAvailable && _internal_cmpy_aoi == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_aoi is required"));
        }

        model_internal::_doValidationCacheOfCmpy_aoi = validationFailures;
        model_internal::_doValidationLastValOfCmpy_aoi = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_ldgo_delta : Array = null;
    model_internal var _doValidationLastValOfCmpy_ldgo_delta : String;

    model_internal function _doValidationForCmpy_ldgo_delta(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_ldgo_delta != null && model_internal::_doValidationLastValOfCmpy_ldgo_delta == value)
           return model_internal::_doValidationCacheOfCmpy_ldgo_delta ;

        _model.model_internal::_cmpy_ldgo_deltaIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_ldgo_deltaAvailable && _internal_cmpy_ldgo_delta == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_ldgo_delta is required"));
        }

        model_internal::_doValidationCacheOfCmpy_ldgo_delta = validationFailures;
        model_internal::_doValidationLastValOfCmpy_ldgo_delta = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfPerl_enter_time : Array = null;
    model_internal var _doValidationLastValOfPerl_enter_time : Object;

    model_internal function _doValidationForPerl_enter_time(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfPerl_enter_time != null && model_internal::_doValidationLastValOfPerl_enter_time == value)
           return model_internal::_doValidationCacheOfPerl_enter_time ;

        _model.model_internal::_perl_enter_timeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPerl_enter_timeAvailable && _internal_perl_enter_time == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "perl_enter_time is required"));
        }

        model_internal::_doValidationCacheOfPerl_enter_time = validationFailures;
        model_internal::_doValidationLastValOfPerl_enter_time = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_rpt_t_unit : Array = null;
    model_internal var _doValidationLastValOfCmpy_rpt_t_unit : String;

    model_internal function _doValidationForCmpy_rpt_t_unit(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_rpt_t_unit != null && model_internal::_doValidationLastValOfCmpy_rpt_t_unit == value)
           return model_internal::_doValidationCacheOfCmpy_rpt_t_unit ;

        _model.model_internal::_cmpy_rpt_t_unitIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_rpt_t_unitAvailable && _internal_cmpy_rpt_t_unit == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_rpt_t_unit is required"));
        }

        model_internal::_doValidationCacheOfCmpy_rpt_t_unit = validationFailures;
        model_internal::_doValidationLastValOfCmpy_rpt_t_unit = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfPer_lock : Array = null;
    model_internal var _doValidationLastValOfPer_lock : String;

    model_internal function _doValidationForPer_lock(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfPer_lock != null && model_internal::_doValidationLastValOfPer_lock == value)
           return model_internal::_doValidationCacheOfPer_lock ;

        _model.model_internal::_per_lockIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPer_lockAvailable && _internal_per_lock == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "per_lock is required"));
        }

        model_internal::_doValidationCacheOfPer_lock = validationFailures;
        model_internal::_doValidationLastValOfPer_lock = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfRole : Array = null;
    model_internal var _doValidationLastValOfRole : Object;

    model_internal function _doValidationForRole(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfRole != null && model_internal::_doValidationLastValOfRole == value)
           return model_internal::_doValidationCacheOfRole ;

        _model.model_internal::_roleIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isRoleAvailable && _internal_role == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "role is required"));
        }

        model_internal::_doValidationCacheOfRole = validationFailures;
        model_internal::_doValidationLastValOfRole = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_msg : Array = null;
    model_internal var _doValidationLastValOfCmpy_msg : Object;

    model_internal function _doValidationForCmpy_msg(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfCmpy_msg != null && model_internal::_doValidationLastValOfCmpy_msg == value)
           return model_internal::_doValidationCacheOfCmpy_msg ;

        _model.model_internal::_cmpy_msgIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_msgAvailable && _internal_cmpy_msg == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_msg is required"));
        }

        model_internal::_doValidationCacheOfCmpy_msg = validationFailures;
        model_internal::_doValidationLastValOfCmpy_msg = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfPer_auth : Array = null;
    model_internal var _doValidationLastValOfPer_auth : String;

    model_internal function _doValidationForPer_auth(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfPer_auth != null && model_internal::_doValidationLastValOfPer_auth == value)
           return model_internal::_doValidationCacheOfPer_auth ;

        _model.model_internal::_per_authIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPer_authAvailable && _internal_per_auth == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "per_auth is required"));
        }

        model_internal::_doValidationCacheOfPer_auth = validationFailures;
        model_internal::_doValidationLastValOfPer_auth = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_host : Array = null;
    model_internal var _doValidationLastValOfCmpy_host : String;

    model_internal function _doValidationForCmpy_host(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_host != null && model_internal::_doValidationLastValOfCmpy_host == value)
           return model_internal::_doValidationCacheOfCmpy_host ;

        _model.model_internal::_cmpy_hostIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_hostAvailable && _internal_cmpy_host == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_host is required"));
        }

        model_internal::_doValidationCacheOfCmpy_host = validationFailures;
        model_internal::_doValidationLastValOfCmpy_host = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfPer_exp_d1_dmy : Array = null;
    model_internal var _doValidationLastValOfPer_exp_d1_dmy : String;

    model_internal function _doValidationForPer_exp_d1_dmy(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfPer_exp_d1_dmy != null && model_internal::_doValidationLastValOfPer_exp_d1_dmy == value)
           return model_internal::_doValidationCacheOfPer_exp_d1_dmy ;

        _model.model_internal::_per_exp_d1_dmyIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPer_exp_d1_dmyAvailable && _internal_per_exp_d1_dmy == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "per_exp_d1_dmy is required"));
        }

        model_internal::_doValidationCacheOfPer_exp_d1_dmy = validationFailures;
        model_internal::_doValidationLastValOfPer_exp_d1_dmy = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfUser_type : Array = null;
    model_internal var _doValidationLastValOfUser_type : String;

    model_internal function _doValidationForUser_type(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfUser_type != null && model_internal::_doValidationLastValOfUser_type == value)
           return model_internal::_doValidationCacheOfUser_type ;

        _model.model_internal::_user_typeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isUser_typeAvailable && _internal_user_type == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "user_type is required"));
        }

        model_internal::_doValidationCacheOfUser_type = validationFailures;
        model_internal::_doValidationLastValOfUser_type = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_ord_end : Array = null;
    model_internal var _doValidationLastValOfCmpy_ord_end : String;

    model_internal function _doValidationForCmpy_ord_end(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_ord_end != null && model_internal::_doValidationLastValOfCmpy_ord_end == value)
           return model_internal::_doValidationCacheOfCmpy_ord_end ;

        _model.model_internal::_cmpy_ord_endIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_ord_endAvailable && _internal_cmpy_ord_end == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_ord_end is required"));
        }

        model_internal::_doValidationCacheOfCmpy_ord_end = validationFailures;
        model_internal::_doValidationLastValOfCmpy_ord_end = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfPer_password : Array = null;
    model_internal var _doValidationLastValOfPer_password : Object;

    model_internal function _doValidationForPer_password(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfPer_password != null && model_internal::_doValidationLastValOfPer_password == value)
           return model_internal::_doValidationCacheOfPer_password ;

        _model.model_internal::_per_passwordIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPer_passwordAvailable && _internal_per_password == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "per_password is required"));
        }

        model_internal::_doValidationCacheOfPer_password = validationFailures;
        model_internal::_doValidationLastValOfPer_password = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_tkr_cfg : Array = null;
    model_internal var _doValidationLastValOfCmpy_tkr_cfg : String;

    model_internal function _doValidationForCmpy_tkr_cfg(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_tkr_cfg != null && model_internal::_doValidationLastValOfCmpy_tkr_cfg == value)
           return model_internal::_doValidationCacheOfCmpy_tkr_cfg ;

        _model.model_internal::_cmpy_tkr_cfgIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_tkr_cfgAvailable && _internal_cmpy_tkr_cfg == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_tkr_cfg is required"));
        }

        model_internal::_doValidationCacheOfCmpy_tkr_cfg = validationFailures;
        model_internal::_doValidationLastValOfCmpy_tkr_cfg = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_ord_strt : Array = null;
    model_internal var _doValidationLastValOfCmpy_ord_strt : String;

    model_internal function _doValidationForCmpy_ord_strt(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_ord_strt != null && model_internal::_doValidationLastValOfCmpy_ord_strt == value)
           return model_internal::_doValidationCacheOfCmpy_ord_strt ;

        _model.model_internal::_cmpy_ord_strtIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_ord_strtAvailable && _internal_cmpy_ord_strt == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_ord_strt is required"));
        }

        model_internal::_doValidationCacheOfCmpy_ord_strt = validationFailures;
        model_internal::_doValidationLastValOfCmpy_ord_strt = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_code : Array = null;
    model_internal var _doValidationLastValOfCmpy_code : String;

    model_internal function _doValidationForCmpy_code(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_code != null && model_internal::_doValidationLastValOfCmpy_code == value)
           return model_internal::_doValidationCacheOfCmpy_code ;

        _model.model_internal::_cmpy_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_codeAvailable && _internal_cmpy_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_code is required"));
        }

        model_internal::_doValidationCacheOfCmpy_code = validationFailures;
        model_internal::_doValidationLastValOfCmpy_code = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfRecord_order : Array = null;
    model_internal var _doValidationLastValOfRecord_order : String;

    model_internal function _doValidationForRecord_order(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfRecord_order != null && model_internal::_doValidationLastValOfRecord_order == value)
           return model_internal::_doValidationCacheOfRecord_order ;

        _model.model_internal::_record_orderIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isRecord_orderAvailable && _internal_record_order == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "record_order is required"));
        }

        model_internal::_doValidationCacheOfRecord_order = validationFailures;
        model_internal::_doValidationLastValOfRecord_order = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfExpire_time : Array = null;
    model_internal var _doValidationLastValOfExpire_time : String;

    model_internal function _doValidationForExpire_time(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfExpire_time != null && model_internal::_doValidationLastValOfExpire_time == value)
           return model_internal::_doValidationCacheOfExpire_time ;

        _model.model_internal::_expire_timeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isExpire_timeAvailable && _internal_expire_time == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "expire_time is required"));
        }

        model_internal::_doValidationCacheOfExpire_time = validationFailures;
        model_internal::_doValidationLastValOfExpire_time = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_exp_code : Array = null;
    model_internal var _doValidationLastValOfCmpy_exp_code : Object;

    model_internal function _doValidationForCmpy_exp_code(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfCmpy_exp_code != null && model_internal::_doValidationLastValOfCmpy_exp_code == value)
           return model_internal::_doValidationCacheOfCmpy_exp_code ;

        _model.model_internal::_cmpy_exp_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_exp_codeAvailable && _internal_cmpy_exp_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_exp_code is required"));
        }

        model_internal::_doValidationCacheOfCmpy_exp_code = validationFailures;
        model_internal::_doValidationLastValOfCmpy_exp_code = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_name : Array = null;
    model_internal var _doValidationLastValOfCmpy_name : String;

    model_internal function _doValidationForCmpy_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_name != null && model_internal::_doValidationLastValOfCmpy_name == value)
           return model_internal::_doValidationCacheOfCmpy_name ;

        _model.model_internal::_cmpy_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_nameAvailable && _internal_cmpy_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_name is required"));
        }

        model_internal::_doValidationCacheOfCmpy_name = validationFailures;
        model_internal::_doValidationLastValOfCmpy_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfUser_status_flag : Array = null;
    model_internal var _doValidationLastValOfUser_status_flag : String;

    model_internal function _doValidationForUser_status_flag(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfUser_status_flag != null && model_internal::_doValidationLastValOfUser_status_flag == value)
           return model_internal::_doValidationCacheOfUser_status_flag ;

        _model.model_internal::_user_status_flagIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isUser_status_flagAvailable && _internal_user_status_flag == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "user_status_flag is required"));
        }

        model_internal::_doValidationCacheOfUser_status_flag = validationFailures;
        model_internal::_doValidationLastValOfUser_status_flag = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_ld_rep_vp : Array = null;
    model_internal var _doValidationLastValOfCmpy_ld_rep_vp : String;

    model_internal function _doValidationForCmpy_ld_rep_vp(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_ld_rep_vp != null && model_internal::_doValidationLastValOfCmpy_ld_rep_vp == value)
           return model_internal::_doValidationCacheOfCmpy_ld_rep_vp ;

        _model.model_internal::_cmpy_ld_rep_vpIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_ld_rep_vpAvailable && _internal_cmpy_ld_rep_vp == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_ld_rep_vp is required"));
        }

        model_internal::_doValidationCacheOfCmpy_ld_rep_vp = validationFailures;
        model_internal::_doValidationLastValOfCmpy_ld_rep_vp = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfPer_passwd_2 : Array = null;
    model_internal var _doValidationLastValOfPer_passwd_2 : String;

    model_internal function _doValidationForPer_passwd_2(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfPer_passwd_2 != null && model_internal::_doValidationLastValOfPer_passwd_2 == value)
           return model_internal::_doValidationCacheOfPer_passwd_2 ;

        _model.model_internal::_per_passwd_2IsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPer_passwd_2Available && _internal_per_passwd_2 == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "per_passwd_2 is required"));
        }

        model_internal::_doValidationCacheOfPer_passwd_2 = validationFailures;
        model_internal::_doValidationLastValOfPer_passwd_2 = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfPerl_ara : Array = null;
    model_internal var _doValidationLastValOfPerl_ara : String;

    model_internal function _doValidationForPerl_ara(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfPerl_ara != null && model_internal::_doValidationLastValOfPerl_ara == value)
           return model_internal::_doValidationCacheOfPerl_ara ;

        _model.model_internal::_perl_araIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPerl_araAvailable && _internal_perl_ara == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "perl_ara is required"));
        }

        model_internal::_doValidationCacheOfPerl_ara = validationFailures;
        model_internal::_doValidationLastValOfPerl_ara = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_vet : Array = null;
    model_internal var _doValidationLastValOfCmpy_vet : String;

    model_internal function _doValidationForCmpy_vet(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_vet != null && model_internal::_doValidationLastValOfCmpy_vet == value)
           return model_internal::_doValidationCacheOfCmpy_vet ;

        _model.model_internal::_cmpy_vetIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_vetAvailable && _internal_cmpy_vet == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_vet is required"));
        }

        model_internal::_doValidationCacheOfCmpy_vet = validationFailures;
        model_internal::_doValidationLastValOfCmpy_vet = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfPer_level_num : Array = null;
    model_internal var _doValidationLastValOfPer_level_num : String;

    model_internal function _doValidationForPer_level_num(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfPer_level_num != null && model_internal::_doValidationLastValOfPer_level_num == value)
           return model_internal::_doValidationCacheOfPer_level_num ;

        _model.model_internal::_per_level_numIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPer_level_numAvailable && _internal_per_level_num == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "per_level_num is required"));
        }

        model_internal::_doValidationCacheOfPer_level_num = validationFailures;
        model_internal::_doValidationLastValOfPer_level_num = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfPer_next_msg : Array = null;
    model_internal var _doValidationLastValOfPer_next_msg : Object;

    model_internal function _doValidationForPer_next_msg(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfPer_next_msg != null && model_internal::_doValidationLastValOfPer_next_msg == value)
           return model_internal::_doValidationCacheOfPer_next_msg ;

        _model.model_internal::_per_next_msgIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPer_next_msgAvailable && _internal_per_next_msg == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "per_next_msg is required"));
        }

        model_internal::_doValidationCacheOfPer_next_msg = validationFailures;
        model_internal::_doValidationLastValOfPer_next_msg = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_rtn_prompt : Array = null;
    model_internal var _doValidationLastValOfCmpy_rtn_prompt : String;

    model_internal function _doValidationForCmpy_rtn_prompt(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_rtn_prompt != null && model_internal::_doValidationLastValOfCmpy_rtn_prompt == value)
           return model_internal::_doValidationCacheOfCmpy_rtn_prompt ;

        _model.model_internal::_cmpy_rtn_promptIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_rtn_promptAvailable && _internal_cmpy_rtn_prompt == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_rtn_prompt is required"));
        }

        model_internal::_doValidationCacheOfCmpy_rtn_prompt = validationFailures;
        model_internal::_doValidationLastValOfCmpy_rtn_prompt = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfUser_last_reason : Array = null;
    model_internal var _doValidationLastValOfUser_last_reason : Object;

    model_internal function _doValidationForUser_last_reason(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfUser_last_reason != null && model_internal::_doValidationLastValOfUser_last_reason == value)
           return model_internal::_doValidationCacheOfUser_last_reason ;

        _model.model_internal::_user_last_reasonIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isUser_last_reasonAvailable && _internal_user_last_reason == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "user_last_reason is required"));
        }

        model_internal::_doValidationCacheOfUser_last_reason = validationFailures;
        model_internal::_doValidationLastValOfUser_last_reason = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfUser_password : Array = null;
    model_internal var _doValidationLastValOfUser_password : String;

    model_internal function _doValidationForUser_password(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfUser_password != null && model_internal::_doValidationLastValOfUser_password == value)
           return model_internal::_doValidationCacheOfUser_password ;

        _model.model_internal::_user_passwordIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isUser_passwordAvailable && _internal_user_password == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "user_password is required"));
        }

        model_internal::_doValidationCacheOfUser_password = validationFailures;
        model_internal::_doValidationLastValOfUser_password = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfPer_accesslocks : Array = null;
    model_internal var _doValidationLastValOfPer_accesslocks : Object;

    model_internal function _doValidationForPer_accesslocks(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfPer_accesslocks != null && model_internal::_doValidationLastValOfPer_accesslocks == value)
           return model_internal::_doValidationCacheOfPer_accesslocks ;

        _model.model_internal::_per_accesslocksIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPer_accesslocksAvailable && _internal_per_accesslocks == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "per_accesslocks is required"));
        }

        model_internal::_doValidationCacheOfPer_accesslocks = validationFailures;
        model_internal::_doValidationLastValOfPer_accesslocks = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_bol_vp_name : Array = null;
    model_internal var _doValidationLastValOfCmpy_bol_vp_name : String;

    model_internal function _doValidationForCmpy_bol_vp_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_bol_vp_name != null && model_internal::_doValidationLastValOfCmpy_bol_vp_name == value)
           return model_internal::_doValidationCacheOfCmpy_bol_vp_name ;

        _model.model_internal::_cmpy_bol_vp_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_bol_vp_nameAvailable && _internal_cmpy_bol_vp_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_bol_vp_name is required"));
        }

        model_internal::_doValidationCacheOfCmpy_bol_vp_name = validationFailures;
        model_internal::_doValidationLastValOfCmpy_bol_vp_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_trip_last : Array = null;
    model_internal var _doValidationLastValOfCmpy_trip_last : String;

    model_internal function _doValidationForCmpy_trip_last(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_trip_last != null && model_internal::_doValidationLastValOfCmpy_trip_last == value)
           return model_internal::_doValidationCacheOfCmpy_trip_last ;

        _model.model_internal::_cmpy_trip_lastIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_trip_lastAvailable && _internal_cmpy_trip_last == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_trip_last is required"));
        }

        model_internal::_doValidationCacheOfCmpy_trip_last = validationFailures;
        model_internal::_doValidationLastValOfCmpy_trip_last = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfPer_cmpy : Array = null;
    model_internal var _doValidationLastValOfPer_cmpy : String;

    model_internal function _doValidationForPer_cmpy(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfPer_cmpy != null && model_internal::_doValidationLastValOfPer_cmpy == value)
           return model_internal::_doValidationCacheOfPer_cmpy ;

        _model.model_internal::_per_cmpyIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPer_cmpyAvailable && _internal_per_cmpy == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "per_cmpy is required"));
        }

        model_internal::_doValidationCacheOfPer_cmpy = validationFailures;
        model_internal::_doValidationLastValOfPer_cmpy = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfPer_passconfirm : Array = null;
    model_internal var _doValidationLastValOfPer_passconfirm : Object;

    model_internal function _doValidationForPer_passconfirm(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfPer_passconfirm != null && model_internal::_doValidationLastValOfPer_passconfirm == value)
           return model_internal::_doValidationCacheOfPer_passconfirm ;

        _model.model_internal::_per_passconfirmIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPer_passconfirmAvailable && _internal_per_passconfirm == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "per_passconfirm is required"));
        }

        model_internal::_doValidationCacheOfPer_passconfirm = validationFailures;
        model_internal::_doValidationLastValOfPer_passconfirm = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_add_prompt : Array = null;
    model_internal var _doValidationLastValOfCmpy_add_prompt : String;

    model_internal function _doValidationForCmpy_add_prompt(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_add_prompt != null && model_internal::_doValidationLastValOfCmpy_add_prompt == value)
           return model_internal::_doValidationCacheOfCmpy_add_prompt ;

        _model.model_internal::_cmpy_add_promptIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_add_promptAvailable && _internal_cmpy_add_prompt == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_add_prompt is required"));
        }

        model_internal::_doValidationCacheOfCmpy_add_prompt = validationFailures;
        model_internal::_doValidationLastValOfCmpy_add_prompt = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_log_ld_del : Array = null;
    model_internal var _doValidationLastValOfCmpy_log_ld_del : String;

    model_internal function _doValidationForCmpy_log_ld_del(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_log_ld_del != null && model_internal::_doValidationLastValOfCmpy_log_ld_del == value)
           return model_internal::_doValidationCacheOfCmpy_log_ld_del ;

        _model.model_internal::_cmpy_log_ld_delIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_log_ld_delAvailable && _internal_cmpy_log_ld_del == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_log_ld_del is required"));
        }

        model_internal::_doValidationCacheOfCmpy_log_ld_del = validationFailures;
        model_internal::_doValidationLastValOfCmpy_log_ld_del = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfSession_id : Array = null;
    model_internal var _doValidationLastValOfSession_id : Object;

    model_internal function _doValidationForSession_id(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfSession_id != null && model_internal::_doValidationLastValOfSession_id == value)
           return model_internal::_doValidationCacheOfSession_id ;

        _model.model_internal::_session_idIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isSession_idAvailable && _internal_session_id == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "session_id is required"));
        }

        model_internal::_doValidationCacheOfSession_id = validationFailures;
        model_internal::_doValidationLastValOfSession_id = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_auto_ld : Array = null;
    model_internal var _doValidationLastValOfCmpy_auto_ld : String;

    model_internal function _doValidationForCmpy_auto_ld(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_auto_ld != null && model_internal::_doValidationLastValOfCmpy_auto_ld == value)
           return model_internal::_doValidationCacheOfCmpy_auto_ld ;

        _model.model_internal::_cmpy_auto_ldIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_auto_ldAvailable && _internal_cmpy_auto_ld == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_auto_ld is required"));
        }

        model_internal::_doValidationCacheOfCmpy_auto_ld = validationFailures;
        model_internal::_doValidationLastValOfCmpy_auto_ld = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_type : Array = null;
    model_internal var _doValidationLastValOfCmpy_type : String;

    model_internal function _doValidationForCmpy_type(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_type != null && model_internal::_doValidationLastValOfCmpy_type == value)
           return model_internal::_doValidationCacheOfCmpy_type ;

        _model.model_internal::_cmpy_typeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_typeAvailable && _internal_cmpy_type == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_type is required"));
        }

        model_internal::_doValidationCacheOfCmpy_type = validationFailures;
        model_internal::_doValidationLastValOfCmpy_type = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_tkr_activat : Array = null;
    model_internal var _doValidationLastValOfCmpy_tkr_activat : String;

    model_internal function _doValidationForCmpy_tkr_activat(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_tkr_activat != null && model_internal::_doValidationLastValOfCmpy_tkr_activat == value)
           return model_internal::_doValidationCacheOfCmpy_tkr_activat ;

        _model.model_internal::_cmpy_tkr_activatIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_tkr_activatAvailable && _internal_cmpy_tkr_activat == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_tkr_activat is required"));
        }

        model_internal::_doValidationCacheOfCmpy_tkr_activat = validationFailures;
        model_internal::_doValidationLastValOfCmpy_tkr_activat = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_rpt_temp : Array = null;
    model_internal var _doValidationLastValOfCmpy_rpt_temp : String;

    model_internal function _doValidationForCmpy_rpt_temp(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_rpt_temp != null && model_internal::_doValidationLastValOfCmpy_rpt_temp == value)
           return model_internal::_doValidationCacheOfCmpy_rpt_temp ;

        _model.model_internal::_cmpy_rpt_tempIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_rpt_tempAvailable && _internal_cmpy_rpt_temp == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_rpt_temp is required"));
        }

        model_internal::_doValidationCacheOfCmpy_rpt_temp = validationFailures;
        model_internal::_doValidationLastValOfCmpy_rpt_temp = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfPer_code : Array = null;
    model_internal var _doValidationLastValOfPer_code : String;

    model_internal function _doValidationForPer_code(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfPer_code != null && model_internal::_doValidationLastValOfPer_code == value)
           return model_internal::_doValidationCacheOfPer_code ;

        _model.model_internal::_per_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPer_codeAvailable && _internal_per_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "per_code is required"));
        }

        model_internal::_doValidationCacheOfPer_code = validationFailures;
        model_internal::_doValidationLastValOfPer_code = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_wipe_ordets : Array = null;
    model_internal var _doValidationLastValOfCmpy_wipe_ordets : String;

    model_internal function _doValidationForCmpy_wipe_ordets(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_wipe_ordets != null && model_internal::_doValidationLastValOfCmpy_wipe_ordets == value)
           return model_internal::_doValidationCacheOfCmpy_wipe_ordets ;

        _model.model_internal::_cmpy_wipe_ordetsIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_wipe_ordetsAvailable && _internal_cmpy_wipe_ordets == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_wipe_ordets is required"));
        }

        model_internal::_doValidationCacheOfCmpy_wipe_ordets = validationFailures;
        model_internal::_doValidationLastValOfCmpy_wipe_ordets = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_mod_drawer : Array = null;
    model_internal var _doValidationLastValOfCmpy_mod_drawer : String;

    model_internal function _doValidationForCmpy_mod_drawer(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_mod_drawer != null && model_internal::_doValidationLastValOfCmpy_mod_drawer == value)
           return model_internal::_doValidationCacheOfCmpy_mod_drawer ;

        _model.model_internal::_cmpy_mod_drawerIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_mod_drawerAvailable && _internal_cmpy_mod_drawer == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_mod_drawer is required"));
        }

        model_internal::_doValidationCacheOfCmpy_mod_drawer = validationFailures;
        model_internal::_doValidationLastValOfCmpy_mod_drawer = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_flag_3 : Array = null;
    model_internal var _doValidationLastValOfCmpy_flag_3 : String;

    model_internal function _doValidationForCmpy_flag_3(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_flag_3 != null && model_internal::_doValidationLastValOfCmpy_flag_3 == value)
           return model_internal::_doValidationCacheOfCmpy_flag_3 ;

        _model.model_internal::_cmpy_flag_3IsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_flag_3Available && _internal_cmpy_flag_3 == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_flag_3 is required"));
        }

        model_internal::_doValidationCacheOfCmpy_flag_3 = validationFailures;
        model_internal::_doValidationLastValOfCmpy_flag_3 = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfPer_licence_no : Array = null;
    model_internal var _doValidationLastValOfPer_licence_no : Object;

    model_internal function _doValidationForPer_licence_no(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfPer_licence_no != null && model_internal::_doValidationLastValOfPer_licence_no == value)
           return model_internal::_doValidationCacheOfPer_licence_no ;

        _model.model_internal::_per_licence_noIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPer_licence_noAvailable && _internal_per_licence_no == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "per_licence_no is required"));
        }

        model_internal::_doValidationCacheOfPer_licence_no = validationFailures;
        model_internal::_doValidationLastValOfPer_licence_no = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_bay_loop_ch : Array = null;
    model_internal var _doValidationLastValOfCmpy_bay_loop_ch : String;

    model_internal function _doValidationForCmpy_bay_loop_ch(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_bay_loop_ch != null && model_internal::_doValidationLastValOfCmpy_bay_loop_ch == value)
           return model_internal::_doValidationCacheOfCmpy_bay_loop_ch ;

        _model.model_internal::_cmpy_bay_loop_chIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_bay_loop_chAvailable && _internal_cmpy_bay_loop_ch == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_bay_loop_ch is required"));
        }

        model_internal::_doValidationCacheOfCmpy_bay_loop_ch = validationFailures;
        model_internal::_doValidationLastValOfCmpy_bay_loop_ch = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_flag_1 : Array = null;
    model_internal var _doValidationLastValOfCmpy_flag_1 : String;

    model_internal function _doValidationForCmpy_flag_1(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_flag_1 != null && model_internal::_doValidationLastValOfCmpy_flag_1 == value)
           return model_internal::_doValidationCacheOfCmpy_flag_1 ;

        _model.model_internal::_cmpy_flag_1IsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_flag_1Available && _internal_cmpy_flag_1 == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_flag_1 is required"));
        }

        model_internal::_doValidationCacheOfCmpy_flag_1 = validationFailures;
        model_internal::_doValidationLastValOfCmpy_flag_1 = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_flag_2 : Array = null;
    model_internal var _doValidationLastValOfCmpy_flag_2 : String;

    model_internal function _doValidationForCmpy_flag_2(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_flag_2 != null && model_internal::_doValidationLastValOfCmpy_flag_2 == value)
           return model_internal::_doValidationCacheOfCmpy_flag_2 ;

        _model.model_internal::_cmpy_flag_2IsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_flag_2Available && _internal_cmpy_flag_2 == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_flag_2 is required"));
        }

        model_internal::_doValidationCacheOfCmpy_flag_2 = validationFailures;
        model_internal::_doValidationLastValOfCmpy_flag_2 = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_enable_expd : Array = null;
    model_internal var _doValidationLastValOfCmpy_enable_expd : String;

    model_internal function _doValidationForCmpy_enable_expd(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_enable_expd != null && model_internal::_doValidationLastValOfCmpy_enable_expd == value)
           return model_internal::_doValidationCacheOfCmpy_enable_expd ;

        _model.model_internal::_cmpy_enable_expdIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_enable_expdAvailable && _internal_cmpy_enable_expd == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_enable_expd is required"));
        }

        model_internal::_doValidationCacheOfCmpy_enable_expd = validationFailures;
        model_internal::_doValidationLastValOfCmpy_enable_expd = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_trip_end : Array = null;
    model_internal var _doValidationLastValOfCmpy_trip_end : String;

    model_internal function _doValidationForCmpy_trip_end(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_trip_end != null && model_internal::_doValidationLastValOfCmpy_trip_end == value)
           return model_internal::_doValidationCacheOfCmpy_trip_end ;

        _model.model_internal::_cmpy_trip_endIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_trip_endAvailable && _internal_cmpy_trip_end == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_trip_end is required"));
        }

        model_internal::_doValidationCacheOfCmpy_trip_end = validationFailures;
        model_internal::_doValidationLastValOfCmpy_trip_end = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfUser_id : Array = null;
    model_internal var _doValidationLastValOfUser_id : String;

    model_internal function _doValidationForUser_id(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfUser_id != null && model_internal::_doValidationLastValOfUser_id == value)
           return model_internal::_doValidationCacheOfUser_id ;

        _model.model_internal::_user_idIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isUser_idAvailable && _internal_user_id == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "user_id is required"));
        }

        model_internal::_doValidationCacheOfUser_id = validationFailures;
        model_internal::_doValidationLastValOfUser_id = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfPerl_psn : Array = null;
    model_internal var _doValidationLastValOfPerl_psn : String;

    model_internal function _doValidationForPerl_psn(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfPerl_psn != null && model_internal::_doValidationLastValOfPerl_psn == value)
           return model_internal::_doValidationCacheOfPerl_psn ;

        _model.model_internal::_perl_psnIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPerl_psnAvailable && _internal_perl_psn == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "perl_psn is required"));
        }

        model_internal::_doValidationCacheOfPerl_psn = validationFailures;
        model_internal::_doValidationLastValOfPerl_psn = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_comms_ok : Array = null;
    model_internal var _doValidationLastValOfCmpy_comms_ok : String;

    model_internal function _doValidationForCmpy_comms_ok(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_comms_ok != null && model_internal::_doValidationLastValOfCmpy_comms_ok == value)
           return model_internal::_doValidationCacheOfCmpy_comms_ok ;

        _model.model_internal::_cmpy_comms_okIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_comms_okAvailable && _internal_cmpy_comms_ok == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_comms_ok is required"));
        }

        model_internal::_doValidationCacheOfCmpy_comms_ok = validationFailures;
        model_internal::_doValidationLastValOfCmpy_comms_ok = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfPt_psncode : Array = null;
    model_internal var _doValidationLastValOfPt_psncode : String;

    model_internal function _doValidationForPt_psncode(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfPt_psncode != null && model_internal::_doValidationLastValOfPt_psncode == value)
           return model_internal::_doValidationCacheOfPt_psncode ;

        _model.model_internal::_pt_psncodeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPt_psncodeAvailable && _internal_pt_psncode == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "pt_psncode is required"));
        }

        model_internal::_doValidationCacheOfPt_psncode = validationFailures;
        model_internal::_doValidationLastValOfPt_psncode = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_issu : Array = null;
    model_internal var _doValidationLastValOfCmpy_issu : String;

    model_internal function _doValidationForCmpy_issu(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_issu != null && model_internal::_doValidationLastValOfCmpy_issu == value)
           return model_internal::_doValidationCacheOfCmpy_issu ;

        _model.model_internal::_cmpy_issuIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_issuAvailable && _internal_cmpy_issu == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_issu is required"));
        }

        model_internal::_doValidationCacheOfCmpy_issu = validationFailures;
        model_internal::_doValidationLastValOfCmpy_issu = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfRecord_switch : Array = null;
    model_internal var _doValidationLastValOfRecord_switch : String;

    model_internal function _doValidationForRecord_switch(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfRecord_switch != null && model_internal::_doValidationLastValOfRecord_switch == value)
           return model_internal::_doValidationCacheOfRecord_switch ;

        _model.model_internal::_record_switchIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isRecord_switchAvailable && _internal_record_switch == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "record_switch is required"));
        }

        model_internal::_doValidationCacheOfRecord_switch = validationFailures;
        model_internal::_doValidationLastValOfRecord_switch = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfPer_name : Array = null;
    model_internal var _doValidationLastValOfPer_name : String;

    model_internal function _doValidationForPer_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfPer_name != null && model_internal::_doValidationLastValOfPer_name == value)
           return model_internal::_doValidationCacheOfPer_name ;

        _model.model_internal::_per_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPer_nameAvailable && _internal_per_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "per_name is required"));
        }

        model_internal::_doValidationCacheOfPer_name = validationFailures;
        model_internal::_doValidationLastValOfPer_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_wgh_complet : Array = null;
    model_internal var _doValidationLastValOfCmpy_wgh_complet : String;

    model_internal function _doValidationForCmpy_wgh_complet(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_wgh_complet != null && model_internal::_doValidationLastValOfCmpy_wgh_complet == value)
           return model_internal::_doValidationCacheOfCmpy_wgh_complet ;

        _model.model_internal::_cmpy_wgh_completIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_wgh_completAvailable && _internal_cmpy_wgh_complet == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_wgh_complet is required"));
        }

        model_internal::_doValidationCacheOfCmpy_wgh_complet = validationFailures;
        model_internal::_doValidationLastValOfCmpy_wgh_complet = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_compress_bl : Array = null;
    model_internal var _doValidationLastValOfCmpy_compress_bl : Object;

    model_internal function _doValidationForCmpy_compress_bl(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfCmpy_compress_bl != null && model_internal::_doValidationLastValOfCmpy_compress_bl == value)
           return model_internal::_doValidationCacheOfCmpy_compress_bl ;

        _model.model_internal::_cmpy_compress_blIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_compress_blAvailable && _internal_cmpy_compress_bl == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_compress_bl is required"));
        }

        model_internal::_doValidationCacheOfCmpy_compress_bl = validationFailures;
        model_internal::_doValidationLastValOfCmpy_compress_bl = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfPer_department : Array = null;
    model_internal var _doValidationLastValOfPer_department : String;

    model_internal function _doValidationForPer_department(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfPer_department != null && model_internal::_doValidationLastValOfPer_department == value)
           return model_internal::_doValidationCacheOfPer_department ;

        _model.model_internal::_per_departmentIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPer_departmentAvailable && _internal_per_department == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "per_department is required"));
        }

        model_internal::_doValidationCacheOfPer_department = validationFailures;
        model_internal::_doValidationLastValOfPer_department = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_auto_reconc : Array = null;
    model_internal var _doValidationLastValOfCmpy_auto_reconc : String;

    model_internal function _doValidationForCmpy_auto_reconc(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_auto_reconc != null && model_internal::_doValidationLastValOfCmpy_auto_reconc == value)
           return model_internal::_doValidationCacheOfCmpy_auto_reconc ;

        _model.model_internal::_cmpy_auto_reconcIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_auto_reconcAvailable && _internal_cmpy_auto_reconc == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_auto_reconc is required"));
        }

        model_internal::_doValidationCacheOfCmpy_auto_reconc = validationFailures;
        model_internal::_doValidationLastValOfCmpy_auto_reconc = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfPer_exp_d2_dmy : Array = null;
    model_internal var _doValidationLastValOfPer_exp_d2_dmy : String;

    model_internal function _doValidationForPer_exp_d2_dmy(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfPer_exp_d2_dmy != null && model_internal::_doValidationLastValOfPer_exp_d2_dmy == value)
           return model_internal::_doValidationCacheOfPer_exp_d2_dmy ;

        _model.model_internal::_per_exp_d2_dmyIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPer_exp_d2_dmyAvailable && _internal_per_exp_d2_dmy == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "per_exp_d2_dmy is required"));
        }

        model_internal::_doValidationCacheOfPer_exp_d2_dmy = validationFailures;
        model_internal::_doValidationLastValOfPer_exp_d2_dmy = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_bltol_flag : Array = null;
    model_internal var _doValidationLastValOfCmpy_bltol_flag : String;

    model_internal function _doValidationForCmpy_bltol_flag(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_bltol_flag != null && model_internal::_doValidationLastValOfCmpy_bltol_flag == value)
           return model_internal::_doValidationCacheOfCmpy_bltol_flag ;

        _model.model_internal::_cmpy_bltol_flagIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_bltol_flagAvailable && _internal_cmpy_bltol_flag == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_bltol_flag is required"));
        }

        model_internal::_doValidationCacheOfCmpy_bltol_flag = validationFailures;
        model_internal::_doValidationLastValOfCmpy_bltol_flag = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_must_sealno : Array = null;
    model_internal var _doValidationLastValOfCmpy_must_sealno : String;

    model_internal function _doValidationForCmpy_must_sealno(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_must_sealno != null && model_internal::_doValidationLastValOfCmpy_must_sealno == value)
           return model_internal::_doValidationCacheOfCmpy_must_sealno ;

        _model.model_internal::_cmpy_must_sealnoIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_must_sealnoAvailable && _internal_cmpy_must_sealno == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_must_sealno is required"));
        }

        model_internal::_doValidationCacheOfCmpy_must_sealno = validationFailures;
        model_internal::_doValidationLastValOfCmpy_must_sealno = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_ord_last : Array = null;
    model_internal var _doValidationLastValOfCmpy_ord_last : String;

    model_internal function _doValidationForCmpy_ord_last(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_ord_last != null && model_internal::_doValidationLastValOfCmpy_ord_last == value)
           return model_internal::_doValidationCacheOfCmpy_ord_last ;

        _model.model_internal::_cmpy_ord_lastIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_ord_lastAvailable && _internal_cmpy_ord_last == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_ord_last is required"));
        }

        model_internal::_doValidationCacheOfCmpy_ord_last = validationFailures;
        model_internal::_doValidationLastValOfCmpy_ord_last = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_seal_number : Array = null;
    model_internal var _doValidationLastValOfCmpy_seal_number : String;

    model_internal function _doValidationForCmpy_seal_number(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_seal_number != null && model_internal::_doValidationLastValOfCmpy_seal_number == value)
           return model_internal::_doValidationCacheOfCmpy_seal_number ;

        _model.model_internal::_cmpy_seal_numberIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_seal_numberAvailable && _internal_cmpy_seal_number == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_seal_number is required"));
        }

        model_internal::_doValidationCacheOfCmpy_seal_number = validationFailures;
        model_internal::_doValidationLastValOfCmpy_seal_number = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_host_docs : Array = null;
    model_internal var _doValidationLastValOfCmpy_host_docs : String;

    model_internal function _doValidationForCmpy_host_docs(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_host_docs != null && model_internal::_doValidationLastValOfCmpy_host_docs == value)
           return model_internal::_doValidationCacheOfCmpy_host_docs ;

        _model.model_internal::_cmpy_host_docsIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_host_docsAvailable && _internal_cmpy_host_docs == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_host_docs is required"));
        }

        model_internal::_doValidationCacheOfCmpy_host_docs = validationFailures;
        model_internal::_doValidationLastValOfCmpy_host_docs = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_trip_strt : Array = null;
    model_internal var _doValidationLastValOfCmpy_trip_strt : String;

    model_internal function _doValidationForCmpy_trip_strt(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_trip_strt != null && model_internal::_doValidationLastValOfCmpy_trip_strt == value)
           return model_internal::_doValidationCacheOfCmpy_trip_strt ;

        _model.model_internal::_cmpy_trip_strtIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_trip_strtAvailable && _internal_cmpy_trip_strt == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_trip_strt is required"));
        }

        model_internal::_doValidationCacheOfCmpy_trip_strt = validationFailures;
        model_internal::_doValidationLastValOfCmpy_trip_strt = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfPer_terminal : Array = null;
    model_internal var _doValidationLastValOfPer_terminal : Object;

    model_internal function _doValidationForPer_terminal(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfPer_terminal != null && model_internal::_doValidationLastValOfPer_terminal == value)
           return model_internal::_doValidationCacheOfPer_terminal ;

        _model.model_internal::_per_terminalIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPer_terminalAvailable && _internal_per_terminal == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "per_terminal is required"));
        }

        model_internal::_doValidationCacheOfPer_terminal = validationFailures;
        model_internal::_doValidationLastValOfPer_terminal = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfValid_time : Array = null;
    model_internal var _doValidationLastValOfValid_time : String;

    model_internal function _doValidationForValid_time(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfValid_time != null && model_internal::_doValidationLastValOfValid_time == value)
           return model_internal::_doValidationCacheOfValid_time ;

        _model.model_internal::_valid_timeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isValid_timeAvailable && _internal_valid_time == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "valid_time is required"));
        }

        model_internal::_doValidationCacheOfValid_time = validationFailures;
        model_internal::_doValidationLastValOfValid_time = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_wgh_auto_fl : Array = null;
    model_internal var _doValidationLastValOfCmpy_wgh_auto_fl : String;

    model_internal function _doValidationForCmpy_wgh_auto_fl(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_wgh_auto_fl != null && model_internal::_doValidationLastValOfCmpy_wgh_auto_fl == value)
           return model_internal::_doValidationCacheOfCmpy_wgh_auto_fl ;

        _model.model_internal::_cmpy_wgh_auto_flIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_wgh_auto_flAvailable && _internal_cmpy_wgh_auto_fl == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_wgh_auto_fl is required"));
        }

        model_internal::_doValidationCacheOfCmpy_wgh_auto_fl = validationFailures;
        model_internal::_doValidationLastValOfCmpy_wgh_auto_fl = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfUser_username : Array = null;
    model_internal var _doValidationLastValOfUser_username : String;

    model_internal function _doValidationForUser_username(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfUser_username != null && model_internal::_doValidationLastValOfUser_username == value)
           return model_internal::_doValidationCacheOfUser_username ;

        _model.model_internal::_user_usernameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isUser_usernameAvailable && _internal_user_username == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "user_username is required"));
        }

        model_internal::_doValidationCacheOfUser_username = validationFailures;
        model_internal::_doValidationLastValOfUser_username = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_req_pin_flag : Array = null;
    model_internal var _doValidationLastValOfCmpy_req_pin_flag : String;

    model_internal function _doValidationForCmpy_req_pin_flag(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_req_pin_flag != null && model_internal::_doValidationLastValOfCmpy_req_pin_flag == value)
           return model_internal::_doValidationCacheOfCmpy_req_pin_flag ;

        _model.model_internal::_cmpy_req_pin_flagIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_req_pin_flagAvailable && _internal_cmpy_req_pin_flag == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_req_pin_flag is required"));
        }

        model_internal::_doValidationCacheOfCmpy_req_pin_flag = validationFailures;
        model_internal::_doValidationLastValOfCmpy_req_pin_flag = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_check_licen : Array = null;
    model_internal var _doValidationLastValOfCmpy_check_licen : Object;

    model_internal function _doValidationForCmpy_check_licen(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfCmpy_check_licen != null && model_internal::_doValidationLastValOfCmpy_check_licen == value)
           return model_internal::_doValidationCacheOfCmpy_check_licen ;

        _model.model_internal::_cmpy_check_licenIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_check_licenAvailable && _internal_cmpy_check_licen == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_check_licen is required"));
        }

        model_internal::_doValidationCacheOfCmpy_check_licen = validationFailures;
        model_internal::_doValidationLastValOfCmpy_check_licen = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfPer_last_dmy : Array = null;
    model_internal var _doValidationLastValOfPer_last_dmy : String;

    model_internal function _doValidationForPer_last_dmy(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfPer_last_dmy != null && model_internal::_doValidationLastValOfPer_last_dmy == value)
           return model_internal::_doValidationCacheOfPer_last_dmy ;

        _model.model_internal::_per_last_dmyIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPer_last_dmyAvailable && _internal_per_last_dmy == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "per_last_dmy is required"));
        }

        model_internal::_doValidationCacheOfPer_last_dmy = validationFailures;
        model_internal::_doValidationLastValOfPer_last_dmy = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfPassword_validate : Array = null;
    model_internal var _doValidationLastValOfPassword_validate : Object;

    model_internal function _doValidationForPassword_validate(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfPassword_validate != null && model_internal::_doValidationLastValOfPassword_validate == value)
           return model_internal::_doValidationCacheOfPassword_validate ;

        _model.model_internal::_password_validateIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPassword_validateAvailable && _internal_password_validate == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "password_validate is required"));
        }

        model_internal::_doValidationCacheOfPassword_validate = validationFailures;
        model_internal::_doValidationLastValOfPassword_validate = value;

        return validationFailures;
    }
    

}

}
