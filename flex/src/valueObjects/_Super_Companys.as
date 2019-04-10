/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - Companys.as.
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

[ExcludeClass]
public class _Super_Companys extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("Companys") == null)
            {
                flash.net.registerClassAlias("Companys", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("Companys", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _CompanysEntityMetadata;
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
    private var _internal_cmpy_ord_carrier : Object;
    private var _internal_cmpy_ldtol_flag : String;
    private var _internal_cmpy_drv_inst_vp : Object;
    private var _internal_customer : Object;
    private var _internal_drawer : Object;
    private var _internal_cmpy_movements_rev : String;
    private var _internal_cmpy_aoi : Object;
    private var _internal_cmpy_ldgo_delta : Object;
    private var _internal_cmpy_rpt_t_unit : Object;
    private var _internal_carrier : Object;
    private var _internal_cmpy_msg : Object;
    private var _internal_supplier : Object;
    private var _internal_cmpy_host : Object;
    private var _internal_host : Object;
    private var _internal_cmpy_ord_end : Object;
    private var _internal_cmpy_tkr_cfg : Object;
    private var _internal_cmpy_exp_cpde : Object;
    private var _internal_cmpy_code : String;
    private var _internal_cmpy_ord_strt : Object;
    private var _internal_cmpy_exp_code : Object;
    private var _internal_cmpy_name : String;
    private var _internal_cmpy_ld_rep_vp : Object;
    private var _internal_cmpy_vet : Object;
    private var _internal_issuer : Object;
    private var _internal_cmpy_rtn_prompt : Object;
    private var _internal_cmpy_schd_archive : String;
    private var _internal_cmpy_bol_vp_name : Object;
    private var _internal_cmpy_trip_last : Object;
    private var _internal_cmpy_schd_rev_repost : String;
    private var _internal_cmpy_add_prompt : Object;
    private var _internal_cmpy_log_ld_del : Object;
    private var _internal_cmpy_auto_ld : Object;
    private var _internal_cmpy_type : String;
    private var _internal_employer : Object;
    private var _internal_cmpy_tkr_activat : Object;
    private var _internal_cmpy_rpt_temp : Object;
    private var _internal_cmpy_wipe_ordets : Object;
    private var _internal_cmpy_mod_drawer : Object;
    private var _internal_cmpy_flag_3 : Object;
    private var _internal_cmpy_flag_1 : Object;
    private var _internal_cmpy_bay_loop_ch : Object;
    private var _internal_cmpy_flag_2 : Object;
    private var _internal_cmpy_enable_expd : Object;
    private var _internal_cmpy_trip_end : Object;
    private var _internal_cmpy_comms_ok : Object;
    private var _internal_cmpy_issu : Object;
    private var _internal_cmpy_wgh_complet : Object;
    private var _internal_cmpy_compress_bl : Object;
    private var _internal_cmpy_plant : Object;
    private var _internal_cmpy_auto_reconc : Object;
    private var _internal_cmpy_bltol_flag : String;
    private var _internal_cmpy_must_sealno : Object;
    private var _internal_cmpy_ord_last : Object;
    private var _internal_cmpy_seal_number : Object;
    private var _internal_cmpy_host_docs : Object;
    private var _internal_cmpy_trip_strt : Object;
    private var _internal_cmpy_isse : Object;
    private var _internal_site_manager : Object;
    private var _internal_cmpy_wgh_auto_fl : Object;
    private var _internal_cmpy_req_pin_flag : String;
    private var _internal_cmpy_check_licen : Object;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_Companys()
    {
        _model = new _CompanysEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_ord_carrier", model_internal::setterListenerCmpy_ord_carrier));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_ldtol_flag", model_internal::setterListenerCmpy_ldtol_flag));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_drv_inst_vp", model_internal::setterListenerCmpy_drv_inst_vp));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "customer", model_internal::setterListenerCustomer));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "drawer", model_internal::setterListenerDrawer));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_movements_rev", model_internal::setterListenerCmpy_movements_rev));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_aoi", model_internal::setterListenerCmpy_aoi));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_ldgo_delta", model_internal::setterListenerCmpy_ldgo_delta));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_rpt_t_unit", model_internal::setterListenerCmpy_rpt_t_unit));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "carrier", model_internal::setterListenerCarrier));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_msg", model_internal::setterListenerCmpy_msg));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "supplier", model_internal::setterListenerSupplier));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_host", model_internal::setterListenerCmpy_host));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "host", model_internal::setterListenerHost));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_ord_end", model_internal::setterListenerCmpy_ord_end));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_tkr_cfg", model_internal::setterListenerCmpy_tkr_cfg));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_exp_cpde", model_internal::setterListenerCmpy_exp_cpde));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_code", model_internal::setterListenerCmpy_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_ord_strt", model_internal::setterListenerCmpy_ord_strt));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_exp_code", model_internal::setterListenerCmpy_exp_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_name", model_internal::setterListenerCmpy_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_ld_rep_vp", model_internal::setterListenerCmpy_ld_rep_vp));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_vet", model_internal::setterListenerCmpy_vet));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "issuer", model_internal::setterListenerIssuer));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_rtn_prompt", model_internal::setterListenerCmpy_rtn_prompt));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_schd_archive", model_internal::setterListenerCmpy_schd_archive));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_bol_vp_name", model_internal::setterListenerCmpy_bol_vp_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_trip_last", model_internal::setterListenerCmpy_trip_last));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_schd_rev_repost", model_internal::setterListenerCmpy_schd_rev_repost));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_add_prompt", model_internal::setterListenerCmpy_add_prompt));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_log_ld_del", model_internal::setterListenerCmpy_log_ld_del));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_auto_ld", model_internal::setterListenerCmpy_auto_ld));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_type", model_internal::setterListenerCmpy_type));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "employer", model_internal::setterListenerEmployer));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_tkr_activat", model_internal::setterListenerCmpy_tkr_activat));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_rpt_temp", model_internal::setterListenerCmpy_rpt_temp));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_wipe_ordets", model_internal::setterListenerCmpy_wipe_ordets));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_mod_drawer", model_internal::setterListenerCmpy_mod_drawer));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_flag_3", model_internal::setterListenerCmpy_flag_3));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_flag_1", model_internal::setterListenerCmpy_flag_1));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_bay_loop_ch", model_internal::setterListenerCmpy_bay_loop_ch));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_flag_2", model_internal::setterListenerCmpy_flag_2));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_enable_expd", model_internal::setterListenerCmpy_enable_expd));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_trip_end", model_internal::setterListenerCmpy_trip_end));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_comms_ok", model_internal::setterListenerCmpy_comms_ok));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_issu", model_internal::setterListenerCmpy_issu));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_wgh_complet", model_internal::setterListenerCmpy_wgh_complet));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_compress_bl", model_internal::setterListenerCmpy_compress_bl));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_plant", model_internal::setterListenerCmpy_plant));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_auto_reconc", model_internal::setterListenerCmpy_auto_reconc));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_bltol_flag", model_internal::setterListenerCmpy_bltol_flag));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_must_sealno", model_internal::setterListenerCmpy_must_sealno));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_ord_last", model_internal::setterListenerCmpy_ord_last));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_seal_number", model_internal::setterListenerCmpy_seal_number));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_host_docs", model_internal::setterListenerCmpy_host_docs));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_trip_strt", model_internal::setterListenerCmpy_trip_strt));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_isse", model_internal::setterListenerCmpy_isse));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "site_manager", model_internal::setterListenerSite_manager));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_wgh_auto_fl", model_internal::setterListenerCmpy_wgh_auto_fl));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_req_pin_flag", model_internal::setterListenerCmpy_req_pin_flag));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_check_licen", model_internal::setterListenerCmpy_check_licen));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get cmpy_ord_carrier() : Object
    {
        return _internal_cmpy_ord_carrier;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_ldtol_flag() : String
    {
        return _internal_cmpy_ldtol_flag;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_drv_inst_vp() : Object
    {
        return _internal_cmpy_drv_inst_vp;
    }

    [Bindable(event="propertyChange")]
    public function get customer() : Object
    {
        return _internal_customer;
    }

    [Bindable(event="propertyChange")]
    public function get drawer() : Object
    {
        return _internal_drawer;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_movements_rev() : String
    {
        return _internal_cmpy_movements_rev;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_aoi() : Object
    {
        return _internal_cmpy_aoi;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_ldgo_delta() : Object
    {
        return _internal_cmpy_ldgo_delta;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_rpt_t_unit() : Object
    {
        return _internal_cmpy_rpt_t_unit;
    }

    [Bindable(event="propertyChange")]
    public function get carrier() : Object
    {
        return _internal_carrier;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_msg() : Object
    {
        return _internal_cmpy_msg;
    }

    [Bindable(event="propertyChange")]
    public function get supplier() : Object
    {
        return _internal_supplier;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_host() : Object
    {
        return _internal_cmpy_host;
    }

    [Bindable(event="propertyChange")]
    public function get host() : Object
    {
        return _internal_host;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_ord_end() : Object
    {
        return _internal_cmpy_ord_end;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_tkr_cfg() : Object
    {
        return _internal_cmpy_tkr_cfg;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_exp_cpde() : Object
    {
        return _internal_cmpy_exp_cpde;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_code() : String
    {
        return _internal_cmpy_code;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_ord_strt() : Object
    {
        return _internal_cmpy_ord_strt;
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
    public function get cmpy_ld_rep_vp() : Object
    {
        return _internal_cmpy_ld_rep_vp;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_vet() : Object
    {
        return _internal_cmpy_vet;
    }

    [Bindable(event="propertyChange")]
    public function get issuer() : Object
    {
        return _internal_issuer;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_rtn_prompt() : Object
    {
        return _internal_cmpy_rtn_prompt;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_schd_archive() : String
    {
        return _internal_cmpy_schd_archive;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_bol_vp_name() : Object
    {
        return _internal_cmpy_bol_vp_name;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_trip_last() : Object
    {
        return _internal_cmpy_trip_last;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_schd_rev_repost() : String
    {
        return _internal_cmpy_schd_rev_repost;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_add_prompt() : Object
    {
        return _internal_cmpy_add_prompt;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_log_ld_del() : Object
    {
        return _internal_cmpy_log_ld_del;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_auto_ld() : Object
    {
        return _internal_cmpy_auto_ld;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_type() : String
    {
        return _internal_cmpy_type;
    }

    [Bindable(event="propertyChange")]
    public function get employer() : Object
    {
        return _internal_employer;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_tkr_activat() : Object
    {
        return _internal_cmpy_tkr_activat;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_rpt_temp() : Object
    {
        return _internal_cmpy_rpt_temp;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_wipe_ordets() : Object
    {
        return _internal_cmpy_wipe_ordets;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_mod_drawer() : Object
    {
        return _internal_cmpy_mod_drawer;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_flag_3() : Object
    {
        return _internal_cmpy_flag_3;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_flag_1() : Object
    {
        return _internal_cmpy_flag_1;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_bay_loop_ch() : Object
    {
        return _internal_cmpy_bay_loop_ch;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_flag_2() : Object
    {
        return _internal_cmpy_flag_2;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_enable_expd() : Object
    {
        return _internal_cmpy_enable_expd;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_trip_end() : Object
    {
        return _internal_cmpy_trip_end;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_comms_ok() : Object
    {
        return _internal_cmpy_comms_ok;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_issu() : Object
    {
        return _internal_cmpy_issu;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_wgh_complet() : Object
    {
        return _internal_cmpy_wgh_complet;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_compress_bl() : Object
    {
        return _internal_cmpy_compress_bl;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_plant() : Object
    {
        return _internal_cmpy_plant;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_auto_reconc() : Object
    {
        return _internal_cmpy_auto_reconc;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_bltol_flag() : String
    {
        return _internal_cmpy_bltol_flag;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_must_sealno() : Object
    {
        return _internal_cmpy_must_sealno;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_ord_last() : Object
    {
        return _internal_cmpy_ord_last;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_seal_number() : Object
    {
        return _internal_cmpy_seal_number;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_host_docs() : Object
    {
        return _internal_cmpy_host_docs;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_trip_strt() : Object
    {
        return _internal_cmpy_trip_strt;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_isse() : Object
    {
        return _internal_cmpy_isse;
    }

    [Bindable(event="propertyChange")]
    public function get site_manager() : Object
    {
        return _internal_site_manager;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_wgh_auto_fl() : Object
    {
        return _internal_cmpy_wgh_auto_fl;
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

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set cmpy_ord_carrier(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_ord_carrier;
        if (oldValue !== value)
        {
            _internal_cmpy_ord_carrier = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_ord_carrier", oldValue, _internal_cmpy_ord_carrier));
        }
    }

    public function set cmpy_ldtol_flag(value:String) : void
    {
        var oldValue:String = _internal_cmpy_ldtol_flag;
        if (oldValue !== value)
        {
            _internal_cmpy_ldtol_flag = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_ldtol_flag", oldValue, _internal_cmpy_ldtol_flag));
        }
    }

    public function set cmpy_drv_inst_vp(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_drv_inst_vp;
        if (oldValue !== value)
        {
            _internal_cmpy_drv_inst_vp = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_drv_inst_vp", oldValue, _internal_cmpy_drv_inst_vp));
        }
    }

    public function set customer(value:Object) : void
    {
        var oldValue:Object = _internal_customer;
        if (oldValue !== value)
        {
            _internal_customer = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "customer", oldValue, _internal_customer));
        }
    }

    public function set drawer(value:Object) : void
    {
        var oldValue:Object = _internal_drawer;
        if (oldValue !== value)
        {
            _internal_drawer = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "drawer", oldValue, _internal_drawer));
        }
    }

    public function set cmpy_movements_rev(value:String) : void
    {
        var oldValue:String = _internal_cmpy_movements_rev;
        if (oldValue !== value)
        {
            _internal_cmpy_movements_rev = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_movements_rev", oldValue, _internal_cmpy_movements_rev));
        }
    }

    public function set cmpy_aoi(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_aoi;
        if (oldValue !== value)
        {
            _internal_cmpy_aoi = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_aoi", oldValue, _internal_cmpy_aoi));
        }
    }

    public function set cmpy_ldgo_delta(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_ldgo_delta;
        if (oldValue !== value)
        {
            _internal_cmpy_ldgo_delta = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_ldgo_delta", oldValue, _internal_cmpy_ldgo_delta));
        }
    }

    public function set cmpy_rpt_t_unit(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_rpt_t_unit;
        if (oldValue !== value)
        {
            _internal_cmpy_rpt_t_unit = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_rpt_t_unit", oldValue, _internal_cmpy_rpt_t_unit));
        }
    }

    public function set carrier(value:Object) : void
    {
        var oldValue:Object = _internal_carrier;
        if (oldValue !== value)
        {
            _internal_carrier = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "carrier", oldValue, _internal_carrier));
        }
    }

    public function set cmpy_msg(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_msg;
        if (oldValue !== value)
        {
            _internal_cmpy_msg = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_msg", oldValue, _internal_cmpy_msg));
        }
    }

    public function set supplier(value:Object) : void
    {
        var oldValue:Object = _internal_supplier;
        if (oldValue !== value)
        {
            _internal_supplier = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "supplier", oldValue, _internal_supplier));
        }
    }

    public function set cmpy_host(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_host;
        if (oldValue !== value)
        {
            _internal_cmpy_host = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_host", oldValue, _internal_cmpy_host));
        }
    }

    public function set host(value:Object) : void
    {
        var oldValue:Object = _internal_host;
        if (oldValue !== value)
        {
            _internal_host = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "host", oldValue, _internal_host));
        }
    }

    public function set cmpy_ord_end(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_ord_end;
        if (oldValue !== value)
        {
            _internal_cmpy_ord_end = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_ord_end", oldValue, _internal_cmpy_ord_end));
        }
    }

    public function set cmpy_tkr_cfg(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_tkr_cfg;
        if (oldValue !== value)
        {
            _internal_cmpy_tkr_cfg = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_tkr_cfg", oldValue, _internal_cmpy_tkr_cfg));
        }
    }

    public function set cmpy_exp_cpde(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_exp_cpde;
        if (oldValue !== value)
        {
            _internal_cmpy_exp_cpde = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_exp_cpde", oldValue, _internal_cmpy_exp_cpde));
        }
    }

    public function set cmpy_code(value:String) : void
    {
        var oldValue:String = _internal_cmpy_code;
        if (oldValue !== value)
        {
            _internal_cmpy_code = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_code", oldValue, _internal_cmpy_code));
        }
    }

    public function set cmpy_ord_strt(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_ord_strt;
        if (oldValue !== value)
        {
            _internal_cmpy_ord_strt = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_ord_strt", oldValue, _internal_cmpy_ord_strt));
        }
    }

    public function set cmpy_exp_code(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_exp_code;
        if (oldValue !== value)
        {
            _internal_cmpy_exp_code = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_exp_code", oldValue, _internal_cmpy_exp_code));
        }
    }

    public function set cmpy_name(value:String) : void
    {
        var oldValue:String = _internal_cmpy_name;
        if (oldValue !== value)
        {
            _internal_cmpy_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_name", oldValue, _internal_cmpy_name));
        }
    }

    public function set cmpy_ld_rep_vp(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_ld_rep_vp;
        if (oldValue !== value)
        {
            _internal_cmpy_ld_rep_vp = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_ld_rep_vp", oldValue, _internal_cmpy_ld_rep_vp));
        }
    }

    public function set cmpy_vet(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_vet;
        if (oldValue !== value)
        {
            _internal_cmpy_vet = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_vet", oldValue, _internal_cmpy_vet));
        }
    }

    public function set issuer(value:Object) : void
    {
        var oldValue:Object = _internal_issuer;
        if (oldValue !== value)
        {
            _internal_issuer = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "issuer", oldValue, _internal_issuer));
        }
    }

    public function set cmpy_rtn_prompt(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_rtn_prompt;
        if (oldValue !== value)
        {
            _internal_cmpy_rtn_prompt = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_rtn_prompt", oldValue, _internal_cmpy_rtn_prompt));
        }
    }

    public function set cmpy_schd_archive(value:String) : void
    {
        var oldValue:String = _internal_cmpy_schd_archive;
        if (oldValue !== value)
        {
            _internal_cmpy_schd_archive = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_schd_archive", oldValue, _internal_cmpy_schd_archive));
        }
    }

    public function set cmpy_bol_vp_name(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_bol_vp_name;
        if (oldValue !== value)
        {
            _internal_cmpy_bol_vp_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_bol_vp_name", oldValue, _internal_cmpy_bol_vp_name));
        }
    }

    public function set cmpy_trip_last(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_trip_last;
        if (oldValue !== value)
        {
            _internal_cmpy_trip_last = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_trip_last", oldValue, _internal_cmpy_trip_last));
        }
    }

    public function set cmpy_schd_rev_repost(value:String) : void
    {
        var oldValue:String = _internal_cmpy_schd_rev_repost;
        if (oldValue !== value)
        {
            _internal_cmpy_schd_rev_repost = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_schd_rev_repost", oldValue, _internal_cmpy_schd_rev_repost));
        }
    }

    public function set cmpy_add_prompt(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_add_prompt;
        if (oldValue !== value)
        {
            _internal_cmpy_add_prompt = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_add_prompt", oldValue, _internal_cmpy_add_prompt));
        }
    }

    public function set cmpy_log_ld_del(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_log_ld_del;
        if (oldValue !== value)
        {
            _internal_cmpy_log_ld_del = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_log_ld_del", oldValue, _internal_cmpy_log_ld_del));
        }
    }

    public function set cmpy_auto_ld(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_auto_ld;
        if (oldValue !== value)
        {
            _internal_cmpy_auto_ld = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_auto_ld", oldValue, _internal_cmpy_auto_ld));
        }
    }

    public function set cmpy_type(value:String) : void
    {
        var oldValue:String = _internal_cmpy_type;
        if (oldValue !== value)
        {
            _internal_cmpy_type = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_type", oldValue, _internal_cmpy_type));
        }
    }

    public function set employer(value:Object) : void
    {
        var oldValue:Object = _internal_employer;
        if (oldValue !== value)
        {
            _internal_employer = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "employer", oldValue, _internal_employer));
        }
    }

    public function set cmpy_tkr_activat(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_tkr_activat;
        if (oldValue !== value)
        {
            _internal_cmpy_tkr_activat = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_tkr_activat", oldValue, _internal_cmpy_tkr_activat));
        }
    }

    public function set cmpy_rpt_temp(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_rpt_temp;
        if (oldValue !== value)
        {
            _internal_cmpy_rpt_temp = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_rpt_temp", oldValue, _internal_cmpy_rpt_temp));
        }
    }

    public function set cmpy_wipe_ordets(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_wipe_ordets;
        if (oldValue !== value)
        {
            _internal_cmpy_wipe_ordets = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_wipe_ordets", oldValue, _internal_cmpy_wipe_ordets));
        }
    }

    public function set cmpy_mod_drawer(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_mod_drawer;
        if (oldValue !== value)
        {
            _internal_cmpy_mod_drawer = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_mod_drawer", oldValue, _internal_cmpy_mod_drawer));
        }
    }

    public function set cmpy_flag_3(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_flag_3;
        if (oldValue !== value)
        {
            _internal_cmpy_flag_3 = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_flag_3", oldValue, _internal_cmpy_flag_3));
        }
    }

    public function set cmpy_flag_1(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_flag_1;
        if (oldValue !== value)
        {
            _internal_cmpy_flag_1 = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_flag_1", oldValue, _internal_cmpy_flag_1));
        }
    }

    public function set cmpy_bay_loop_ch(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_bay_loop_ch;
        if (oldValue !== value)
        {
            _internal_cmpy_bay_loop_ch = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_bay_loop_ch", oldValue, _internal_cmpy_bay_loop_ch));
        }
    }

    public function set cmpy_flag_2(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_flag_2;
        if (oldValue !== value)
        {
            _internal_cmpy_flag_2 = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_flag_2", oldValue, _internal_cmpy_flag_2));
        }
    }

    public function set cmpy_enable_expd(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_enable_expd;
        if (oldValue !== value)
        {
            _internal_cmpy_enable_expd = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_enable_expd", oldValue, _internal_cmpy_enable_expd));
        }
    }

    public function set cmpy_trip_end(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_trip_end;
        if (oldValue !== value)
        {
            _internal_cmpy_trip_end = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_trip_end", oldValue, _internal_cmpy_trip_end));
        }
    }

    public function set cmpy_comms_ok(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_comms_ok;
        if (oldValue !== value)
        {
            _internal_cmpy_comms_ok = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_comms_ok", oldValue, _internal_cmpy_comms_ok));
        }
    }

    public function set cmpy_issu(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_issu;
        if (oldValue !== value)
        {
            _internal_cmpy_issu = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_issu", oldValue, _internal_cmpy_issu));
        }
    }

    public function set cmpy_wgh_complet(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_wgh_complet;
        if (oldValue !== value)
        {
            _internal_cmpy_wgh_complet = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_wgh_complet", oldValue, _internal_cmpy_wgh_complet));
        }
    }

    public function set cmpy_compress_bl(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_compress_bl;
        if (oldValue !== value)
        {
            _internal_cmpy_compress_bl = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_compress_bl", oldValue, _internal_cmpy_compress_bl));
        }
    }

    public function set cmpy_plant(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_plant;
        if (oldValue !== value)
        {
            _internal_cmpy_plant = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_plant", oldValue, _internal_cmpy_plant));
        }
    }

    public function set cmpy_auto_reconc(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_auto_reconc;
        if (oldValue !== value)
        {
            _internal_cmpy_auto_reconc = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_auto_reconc", oldValue, _internal_cmpy_auto_reconc));
        }
    }

    public function set cmpy_bltol_flag(value:String) : void
    {
        var oldValue:String = _internal_cmpy_bltol_flag;
        if (oldValue !== value)
        {
            _internal_cmpy_bltol_flag = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_bltol_flag", oldValue, _internal_cmpy_bltol_flag));
        }
    }

    public function set cmpy_must_sealno(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_must_sealno;
        if (oldValue !== value)
        {
            _internal_cmpy_must_sealno = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_must_sealno", oldValue, _internal_cmpy_must_sealno));
        }
    }

    public function set cmpy_ord_last(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_ord_last;
        if (oldValue !== value)
        {
            _internal_cmpy_ord_last = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_ord_last", oldValue, _internal_cmpy_ord_last));
        }
    }

    public function set cmpy_seal_number(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_seal_number;
        if (oldValue !== value)
        {
            _internal_cmpy_seal_number = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_seal_number", oldValue, _internal_cmpy_seal_number));
        }
    }

    public function set cmpy_host_docs(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_host_docs;
        if (oldValue !== value)
        {
            _internal_cmpy_host_docs = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_host_docs", oldValue, _internal_cmpy_host_docs));
        }
    }

    public function set cmpy_trip_strt(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_trip_strt;
        if (oldValue !== value)
        {
            _internal_cmpy_trip_strt = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_trip_strt", oldValue, _internal_cmpy_trip_strt));
        }
    }

    public function set cmpy_isse(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_isse;
        if (oldValue !== value)
        {
            _internal_cmpy_isse = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_isse", oldValue, _internal_cmpy_isse));
        }
    }

    public function set site_manager(value:Object) : void
    {
        var oldValue:Object = _internal_site_manager;
        if (oldValue !== value)
        {
            _internal_site_manager = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "site_manager", oldValue, _internal_site_manager));
        }
    }

    public function set cmpy_wgh_auto_fl(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_wgh_auto_fl;
        if (oldValue !== value)
        {
            _internal_cmpy_wgh_auto_fl = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_wgh_auto_fl", oldValue, _internal_cmpy_wgh_auto_fl));
        }
    }

    public function set cmpy_req_pin_flag(value:String) : void
    {
        var oldValue:String = _internal_cmpy_req_pin_flag;
        if (oldValue !== value)
        {
            _internal_cmpy_req_pin_flag = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_req_pin_flag", oldValue, _internal_cmpy_req_pin_flag));
        }
    }

    public function set cmpy_check_licen(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_check_licen;
        if (oldValue !== value)
        {
            _internal_cmpy_check_licen = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_check_licen", oldValue, _internal_cmpy_check_licen));
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

    model_internal function setterListenerCmpy_ldtol_flag(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_ldtol_flag();
    }

    model_internal function setterListenerCmpy_drv_inst_vp(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_drv_inst_vp();
    }

    model_internal function setterListenerCustomer(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCustomer();
    }

    model_internal function setterListenerDrawer(value:flash.events.Event):void
    {
        _model.invalidateDependentOnDrawer();
    }

    model_internal function setterListenerCmpy_movements_rev(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_movements_rev();
    }

    model_internal function setterListenerCmpy_aoi(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_aoi();
    }

    model_internal function setterListenerCmpy_ldgo_delta(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_ldgo_delta();
    }

    model_internal function setterListenerCmpy_rpt_t_unit(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_rpt_t_unit();
    }

    model_internal function setterListenerCarrier(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCarrier();
    }

    model_internal function setterListenerCmpy_msg(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_msg();
    }

    model_internal function setterListenerSupplier(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSupplier();
    }

    model_internal function setterListenerCmpy_host(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_host();
    }

    model_internal function setterListenerHost(value:flash.events.Event):void
    {
        _model.invalidateDependentOnHost();
    }

    model_internal function setterListenerCmpy_ord_end(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_ord_end();
    }

    model_internal function setterListenerCmpy_tkr_cfg(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_tkr_cfg();
    }

    model_internal function setterListenerCmpy_exp_cpde(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_exp_cpde();
    }

    model_internal function setterListenerCmpy_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_code();
    }

    model_internal function setterListenerCmpy_ord_strt(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_ord_strt();
    }

    model_internal function setterListenerCmpy_exp_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_exp_code();
    }

    model_internal function setterListenerCmpy_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_name();
    }

    model_internal function setterListenerCmpy_ld_rep_vp(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_ld_rep_vp();
    }

    model_internal function setterListenerCmpy_vet(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_vet();
    }

    model_internal function setterListenerIssuer(value:flash.events.Event):void
    {
        _model.invalidateDependentOnIssuer();
    }

    model_internal function setterListenerCmpy_rtn_prompt(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_rtn_prompt();
    }

    model_internal function setterListenerCmpy_schd_archive(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_schd_archive();
    }

    model_internal function setterListenerCmpy_bol_vp_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_bol_vp_name();
    }

    model_internal function setterListenerCmpy_trip_last(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_trip_last();
    }

    model_internal function setterListenerCmpy_schd_rev_repost(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_schd_rev_repost();
    }

    model_internal function setterListenerCmpy_add_prompt(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_add_prompt();
    }

    model_internal function setterListenerCmpy_log_ld_del(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_log_ld_del();
    }

    model_internal function setterListenerCmpy_auto_ld(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_auto_ld();
    }

    model_internal function setterListenerCmpy_type(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_type();
    }

    model_internal function setterListenerEmployer(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEmployer();
    }

    model_internal function setterListenerCmpy_tkr_activat(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_tkr_activat();
    }

    model_internal function setterListenerCmpy_rpt_temp(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_rpt_temp();
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

    model_internal function setterListenerCmpy_flag_1(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_flag_1();
    }

    model_internal function setterListenerCmpy_bay_loop_ch(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_bay_loop_ch();
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

    model_internal function setterListenerCmpy_comms_ok(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_comms_ok();
    }

    model_internal function setterListenerCmpy_issu(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_issu();
    }

    model_internal function setterListenerCmpy_wgh_complet(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_wgh_complet();
    }

    model_internal function setterListenerCmpy_compress_bl(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_compress_bl();
    }

    model_internal function setterListenerCmpy_plant(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_plant();
    }

    model_internal function setterListenerCmpy_auto_reconc(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_auto_reconc();
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

    model_internal function setterListenerCmpy_isse(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_isse();
    }

    model_internal function setterListenerSite_manager(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSite_manager();
    }

    model_internal function setterListenerCmpy_wgh_auto_fl(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_wgh_auto_fl();
    }

    model_internal function setterListenerCmpy_req_pin_flag(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_req_pin_flag();
    }

    model_internal function setterListenerCmpy_check_licen(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_check_licen();
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
        if (!_model.cmpy_ldtol_flagIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_ldtol_flagValidationFailureMessages);
        }
        if (!_model.cmpy_drv_inst_vpIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_drv_inst_vpValidationFailureMessages);
        }
        if (!_model.customerIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_customerValidationFailureMessages);
        }
        if (!_model.drawerIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_drawerValidationFailureMessages);
        }
        if (!_model.cmpy_movements_revIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_movements_revValidationFailureMessages);
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
        if (!_model.cmpy_rpt_t_unitIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_rpt_t_unitValidationFailureMessages);
        }
        if (!_model.carrierIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_carrierValidationFailureMessages);
        }
        if (!_model.cmpy_msgIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_msgValidationFailureMessages);
        }
        if (!_model.supplierIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_supplierValidationFailureMessages);
        }
        if (!_model.cmpy_hostIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_hostValidationFailureMessages);
        }
        if (!_model.hostIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_hostValidationFailureMessages);
        }
        if (!_model.cmpy_ord_endIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_ord_endValidationFailureMessages);
        }
        if (!_model.cmpy_tkr_cfgIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_tkr_cfgValidationFailureMessages);
        }
        if (!_model.cmpy_exp_cpdeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_exp_cpdeValidationFailureMessages);
        }
        if (!_model.cmpy_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_codeValidationFailureMessages);
        }
        if (!_model.cmpy_ord_strtIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_ord_strtValidationFailureMessages);
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
        if (!_model.cmpy_ld_rep_vpIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_ld_rep_vpValidationFailureMessages);
        }
        if (!_model.cmpy_vetIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_vetValidationFailureMessages);
        }
        if (!_model.issuerIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_issuerValidationFailureMessages);
        }
        if (!_model.cmpy_rtn_promptIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_rtn_promptValidationFailureMessages);
        }
        if (!_model.cmpy_schd_archiveIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_schd_archiveValidationFailureMessages);
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
        if (!_model.cmpy_schd_rev_repostIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_schd_rev_repostValidationFailureMessages);
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
        if (!_model.employerIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_employerValidationFailureMessages);
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
        if (!_model.cmpy_flag_1IsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_flag_1ValidationFailureMessages);
        }
        if (!_model.cmpy_bay_loop_chIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_bay_loop_chValidationFailureMessages);
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
        if (!_model.cmpy_comms_okIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_comms_okValidationFailureMessages);
        }
        if (!_model.cmpy_issuIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_issuValidationFailureMessages);
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
        if (!_model.cmpy_plantIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_plantValidationFailureMessages);
        }
        if (!_model.cmpy_auto_reconcIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_auto_reconcValidationFailureMessages);
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
        if (!_model.cmpy_isseIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_isseValidationFailureMessages);
        }
        if (!_model.site_managerIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_site_managerValidationFailureMessages);
        }
        if (!_model.cmpy_wgh_auto_flIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_wgh_auto_flValidationFailureMessages);
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
    public function get _model() : _CompanysEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _CompanysEntityMetadata) : void
    {
        var oldValue : _CompanysEntityMetadata = model_internal::_dminternal_model;
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
    model_internal var _doValidationLastValOfCmpy_ord_carrier : Object;

    model_internal function _doValidationForCmpy_ord_carrier(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

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
    
    model_internal var _doValidationCacheOfCmpy_drv_inst_vp : Array = null;
    model_internal var _doValidationLastValOfCmpy_drv_inst_vp : Object;

    model_internal function _doValidationForCmpy_drv_inst_vp(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

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
    
    model_internal var _doValidationCacheOfCustomer : Array = null;
    model_internal var _doValidationLastValOfCustomer : Object;

    model_internal function _doValidationForCustomer(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfCustomer != null && model_internal::_doValidationLastValOfCustomer == value)
           return model_internal::_doValidationCacheOfCustomer ;

        _model.model_internal::_customerIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCustomerAvailable && _internal_customer == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "customer is required"));
        }

        model_internal::_doValidationCacheOfCustomer = validationFailures;
        model_internal::_doValidationLastValOfCustomer = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfDrawer : Array = null;
    model_internal var _doValidationLastValOfDrawer : Object;

    model_internal function _doValidationForDrawer(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfDrawer != null && model_internal::_doValidationLastValOfDrawer == value)
           return model_internal::_doValidationCacheOfDrawer ;

        _model.model_internal::_drawerIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isDrawerAvailable && _internal_drawer == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "drawer is required"));
        }

        model_internal::_doValidationCacheOfDrawer = validationFailures;
        model_internal::_doValidationLastValOfDrawer = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_movements_rev : Array = null;
    model_internal var _doValidationLastValOfCmpy_movements_rev : String;

    model_internal function _doValidationForCmpy_movements_rev(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_movements_rev != null && model_internal::_doValidationLastValOfCmpy_movements_rev == value)
           return model_internal::_doValidationCacheOfCmpy_movements_rev ;

        _model.model_internal::_cmpy_movements_revIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_movements_revAvailable && _internal_cmpy_movements_rev == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_movements_rev is required"));
        }

        model_internal::_doValidationCacheOfCmpy_movements_rev = validationFailures;
        model_internal::_doValidationLastValOfCmpy_movements_rev = value;

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
    model_internal var _doValidationLastValOfCmpy_ldgo_delta : Object;

    model_internal function _doValidationForCmpy_ldgo_delta(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

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
    
    model_internal var _doValidationCacheOfCmpy_rpt_t_unit : Array = null;
    model_internal var _doValidationLastValOfCmpy_rpt_t_unit : Object;

    model_internal function _doValidationForCmpy_rpt_t_unit(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

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
    
    model_internal var _doValidationCacheOfCarrier : Array = null;
    model_internal var _doValidationLastValOfCarrier : Object;

    model_internal function _doValidationForCarrier(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfCarrier != null && model_internal::_doValidationLastValOfCarrier == value)
           return model_internal::_doValidationCacheOfCarrier ;

        _model.model_internal::_carrierIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCarrierAvailable && _internal_carrier == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "carrier is required"));
        }

        model_internal::_doValidationCacheOfCarrier = validationFailures;
        model_internal::_doValidationLastValOfCarrier = value;

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
    
    model_internal var _doValidationCacheOfSupplier : Array = null;
    model_internal var _doValidationLastValOfSupplier : Object;

    model_internal function _doValidationForSupplier(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfSupplier != null && model_internal::_doValidationLastValOfSupplier == value)
           return model_internal::_doValidationCacheOfSupplier ;

        _model.model_internal::_supplierIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isSupplierAvailable && _internal_supplier == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "supplier is required"));
        }

        model_internal::_doValidationCacheOfSupplier = validationFailures;
        model_internal::_doValidationLastValOfSupplier = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_host : Array = null;
    model_internal var _doValidationLastValOfCmpy_host : Object;

    model_internal function _doValidationForCmpy_host(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

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
    
    model_internal var _doValidationCacheOfHost : Array = null;
    model_internal var _doValidationLastValOfHost : Object;

    model_internal function _doValidationForHost(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfHost != null && model_internal::_doValidationLastValOfHost == value)
           return model_internal::_doValidationCacheOfHost ;

        _model.model_internal::_hostIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isHostAvailable && _internal_host == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "host is required"));
        }

        model_internal::_doValidationCacheOfHost = validationFailures;
        model_internal::_doValidationLastValOfHost = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_ord_end : Array = null;
    model_internal var _doValidationLastValOfCmpy_ord_end : Object;

    model_internal function _doValidationForCmpy_ord_end(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

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
    
    model_internal var _doValidationCacheOfCmpy_tkr_cfg : Array = null;
    model_internal var _doValidationLastValOfCmpy_tkr_cfg : Object;

    model_internal function _doValidationForCmpy_tkr_cfg(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

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
    
    model_internal var _doValidationCacheOfCmpy_exp_cpde : Array = null;
    model_internal var _doValidationLastValOfCmpy_exp_cpde : Object;

    model_internal function _doValidationForCmpy_exp_cpde(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfCmpy_exp_cpde != null && model_internal::_doValidationLastValOfCmpy_exp_cpde == value)
           return model_internal::_doValidationCacheOfCmpy_exp_cpde ;

        _model.model_internal::_cmpy_exp_cpdeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_exp_cpdeAvailable && _internal_cmpy_exp_cpde == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_exp_cpde is required"));
        }

        model_internal::_doValidationCacheOfCmpy_exp_cpde = validationFailures;
        model_internal::_doValidationLastValOfCmpy_exp_cpde = value;

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
    
    model_internal var _doValidationCacheOfCmpy_ord_strt : Array = null;
    model_internal var _doValidationLastValOfCmpy_ord_strt : Object;

    model_internal function _doValidationForCmpy_ord_strt(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

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
    
    model_internal var _doValidationCacheOfCmpy_ld_rep_vp : Array = null;
    model_internal var _doValidationLastValOfCmpy_ld_rep_vp : Object;

    model_internal function _doValidationForCmpy_ld_rep_vp(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

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
    
    model_internal var _doValidationCacheOfCmpy_vet : Array = null;
    model_internal var _doValidationLastValOfCmpy_vet : Object;

    model_internal function _doValidationForCmpy_vet(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

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
    
    model_internal var _doValidationCacheOfIssuer : Array = null;
    model_internal var _doValidationLastValOfIssuer : Object;

    model_internal function _doValidationForIssuer(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfIssuer != null && model_internal::_doValidationLastValOfIssuer == value)
           return model_internal::_doValidationCacheOfIssuer ;

        _model.model_internal::_issuerIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isIssuerAvailable && _internal_issuer == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "issuer is required"));
        }

        model_internal::_doValidationCacheOfIssuer = validationFailures;
        model_internal::_doValidationLastValOfIssuer = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_rtn_prompt : Array = null;
    model_internal var _doValidationLastValOfCmpy_rtn_prompt : Object;

    model_internal function _doValidationForCmpy_rtn_prompt(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

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
    
    model_internal var _doValidationCacheOfCmpy_schd_archive : Array = null;
    model_internal var _doValidationLastValOfCmpy_schd_archive : String;

    model_internal function _doValidationForCmpy_schd_archive(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_schd_archive != null && model_internal::_doValidationLastValOfCmpy_schd_archive == value)
           return model_internal::_doValidationCacheOfCmpy_schd_archive ;

        _model.model_internal::_cmpy_schd_archiveIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_schd_archiveAvailable && _internal_cmpy_schd_archive == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_schd_archive is required"));
        }

        model_internal::_doValidationCacheOfCmpy_schd_archive = validationFailures;
        model_internal::_doValidationLastValOfCmpy_schd_archive = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_bol_vp_name : Array = null;
    model_internal var _doValidationLastValOfCmpy_bol_vp_name : Object;

    model_internal function _doValidationForCmpy_bol_vp_name(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

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
    model_internal var _doValidationLastValOfCmpy_trip_last : Object;

    model_internal function _doValidationForCmpy_trip_last(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

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
    
    model_internal var _doValidationCacheOfCmpy_schd_rev_repost : Array = null;
    model_internal var _doValidationLastValOfCmpy_schd_rev_repost : String;

    model_internal function _doValidationForCmpy_schd_rev_repost(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_schd_rev_repost != null && model_internal::_doValidationLastValOfCmpy_schd_rev_repost == value)
           return model_internal::_doValidationCacheOfCmpy_schd_rev_repost ;

        _model.model_internal::_cmpy_schd_rev_repostIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_schd_rev_repostAvailable && _internal_cmpy_schd_rev_repost == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_schd_rev_repost is required"));
        }

        model_internal::_doValidationCacheOfCmpy_schd_rev_repost = validationFailures;
        model_internal::_doValidationLastValOfCmpy_schd_rev_repost = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_add_prompt : Array = null;
    model_internal var _doValidationLastValOfCmpy_add_prompt : Object;

    model_internal function _doValidationForCmpy_add_prompt(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

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
    model_internal var _doValidationLastValOfCmpy_log_ld_del : Object;

    model_internal function _doValidationForCmpy_log_ld_del(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

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
    
    model_internal var _doValidationCacheOfCmpy_auto_ld : Array = null;
    model_internal var _doValidationLastValOfCmpy_auto_ld : Object;

    model_internal function _doValidationForCmpy_auto_ld(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

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
    
    model_internal var _doValidationCacheOfEmployer : Array = null;
    model_internal var _doValidationLastValOfEmployer : Object;

    model_internal function _doValidationForEmployer(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfEmployer != null && model_internal::_doValidationLastValOfEmployer == value)
           return model_internal::_doValidationCacheOfEmployer ;

        _model.model_internal::_employerIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEmployerAvailable && _internal_employer == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "employer is required"));
        }

        model_internal::_doValidationCacheOfEmployer = validationFailures;
        model_internal::_doValidationLastValOfEmployer = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_tkr_activat : Array = null;
    model_internal var _doValidationLastValOfCmpy_tkr_activat : Object;

    model_internal function _doValidationForCmpy_tkr_activat(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

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
    model_internal var _doValidationLastValOfCmpy_rpt_temp : Object;

    model_internal function _doValidationForCmpy_rpt_temp(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

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
    
    model_internal var _doValidationCacheOfCmpy_wipe_ordets : Array = null;
    model_internal var _doValidationLastValOfCmpy_wipe_ordets : Object;

    model_internal function _doValidationForCmpy_wipe_ordets(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

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
    model_internal var _doValidationLastValOfCmpy_mod_drawer : Object;

    model_internal function _doValidationForCmpy_mod_drawer(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

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
    model_internal var _doValidationLastValOfCmpy_flag_3 : Object;

    model_internal function _doValidationForCmpy_flag_3(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

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
    
    model_internal var _doValidationCacheOfCmpy_flag_1 : Array = null;
    model_internal var _doValidationLastValOfCmpy_flag_1 : Object;

    model_internal function _doValidationForCmpy_flag_1(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

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
    
    model_internal var _doValidationCacheOfCmpy_bay_loop_ch : Array = null;
    model_internal var _doValidationLastValOfCmpy_bay_loop_ch : Object;

    model_internal function _doValidationForCmpy_bay_loop_ch(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

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
    
    model_internal var _doValidationCacheOfCmpy_flag_2 : Array = null;
    model_internal var _doValidationLastValOfCmpy_flag_2 : Object;

    model_internal function _doValidationForCmpy_flag_2(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

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
    model_internal var _doValidationLastValOfCmpy_enable_expd : Object;

    model_internal function _doValidationForCmpy_enable_expd(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

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
    model_internal var _doValidationLastValOfCmpy_trip_end : Object;

    model_internal function _doValidationForCmpy_trip_end(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

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
    
    model_internal var _doValidationCacheOfCmpy_comms_ok : Array = null;
    model_internal var _doValidationLastValOfCmpy_comms_ok : Object;

    model_internal function _doValidationForCmpy_comms_ok(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

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
    
    model_internal var _doValidationCacheOfCmpy_issu : Array = null;
    model_internal var _doValidationLastValOfCmpy_issu : Object;

    model_internal function _doValidationForCmpy_issu(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

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
    
    model_internal var _doValidationCacheOfCmpy_wgh_complet : Array = null;
    model_internal var _doValidationLastValOfCmpy_wgh_complet : Object;

    model_internal function _doValidationForCmpy_wgh_complet(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

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
    
    model_internal var _doValidationCacheOfCmpy_plant : Array = null;
    model_internal var _doValidationLastValOfCmpy_plant : Object;

    model_internal function _doValidationForCmpy_plant(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfCmpy_plant != null && model_internal::_doValidationLastValOfCmpy_plant == value)
           return model_internal::_doValidationCacheOfCmpy_plant ;

        _model.model_internal::_cmpy_plantIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_plantAvailable && _internal_cmpy_plant == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_plant is required"));
        }

        model_internal::_doValidationCacheOfCmpy_plant = validationFailures;
        model_internal::_doValidationLastValOfCmpy_plant = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_auto_reconc : Array = null;
    model_internal var _doValidationLastValOfCmpy_auto_reconc : Object;

    model_internal function _doValidationForCmpy_auto_reconc(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

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
    model_internal var _doValidationLastValOfCmpy_must_sealno : Object;

    model_internal function _doValidationForCmpy_must_sealno(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

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
    model_internal var _doValidationLastValOfCmpy_ord_last : Object;

    model_internal function _doValidationForCmpy_ord_last(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

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
    model_internal var _doValidationLastValOfCmpy_seal_number : Object;

    model_internal function _doValidationForCmpy_seal_number(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

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
    model_internal var _doValidationLastValOfCmpy_host_docs : Object;

    model_internal function _doValidationForCmpy_host_docs(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

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
    model_internal var _doValidationLastValOfCmpy_trip_strt : Object;

    model_internal function _doValidationForCmpy_trip_strt(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

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
    
    model_internal var _doValidationCacheOfCmpy_isse : Array = null;
    model_internal var _doValidationLastValOfCmpy_isse : Object;

    model_internal function _doValidationForCmpy_isse(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfCmpy_isse != null && model_internal::_doValidationLastValOfCmpy_isse == value)
           return model_internal::_doValidationCacheOfCmpy_isse ;

        _model.model_internal::_cmpy_isseIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_isseAvailable && _internal_cmpy_isse == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_isse is required"));
        }

        model_internal::_doValidationCacheOfCmpy_isse = validationFailures;
        model_internal::_doValidationLastValOfCmpy_isse = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfSite_manager : Array = null;
    model_internal var _doValidationLastValOfSite_manager : Object;

    model_internal function _doValidationForSite_manager(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfSite_manager != null && model_internal::_doValidationLastValOfSite_manager == value)
           return model_internal::_doValidationCacheOfSite_manager ;

        _model.model_internal::_site_managerIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isSite_managerAvailable && _internal_site_manager == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "site_manager is required"));
        }

        model_internal::_doValidationCacheOfSite_manager = validationFailures;
        model_internal::_doValidationLastValOfSite_manager = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_wgh_auto_fl : Array = null;
    model_internal var _doValidationLastValOfCmpy_wgh_auto_fl : Object;

    model_internal function _doValidationForCmpy_wgh_auto_fl(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

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
    

}

}
