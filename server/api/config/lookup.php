<?php

class Lookup
{
    const NULL_MESSAGE = 0;
    /**/

    const BAD_LENGTH = 1;
    /*Incorrect length.*/

    const COMMS_DOWN = 2;
    /*Communications to % Down*/

    const COMMS_UP = 3;
    /*Communications to % Up*/

    const DB_DUPLICATE = 4;
    /*% already exists - cant be added.*/

    const DB_FULL = 5;
    /*Exceeded maximum number of %.*/

    const EXPECTED_ALPHA = 6;
    /*Only letters acceptable.*/

    const EXPECTED_HEX = 7;
    /*Only hexadecimal characters acceptable.*/

    const EXPECTED_NUMERIC = 8;
    /*Only digits acceptable.*/

    const EXPECTED_OCTAL = 9;
    /*Only octal digits acceptable.*/

    const INVALID_DATE = 10;
    /*Invalid date.*/

    const INVALID_TIME = 11;
    /*Invalid time.*/

    const JNL_TRF2 = 12;
    /*TRANSACTION% Arm %, Open Obs:%, Close Obs:%###Open Std:%, Close Std:%*/

    const MESG_ILLEGAL = 13;
    /*Invalid Message Received from %. Error = %.*/

    const NO_DECIMALS = 14;
    /*No decimal places allowed.*/

    const NO_MODS_ALLOWED = 15;
    /*No updates allowed here!*/

    const NO_SIGN_ALLOWED = 16;
    /*Sign not allowed.*/

    const OPEN_FAILED = 17;
    /*Open on % failed.*/

    const OUT_OF_RANGE = 18;
    /*% out of range. Expected range % to %.*/

    const PERMISSION_DENIED = 19;
    /*% Permission Denied to %.*/

    const PERMISSION_GRANTED = 20;
    /*% Permission Granted to %.*/

    const RECORD_ACCESS = 21;
    /*Access Failed on Record %, Value = %.*/

    const RECORD_ADDED = 22;
    /*% added % record with %: %*/

    const RECORD_CHANGED = 23;
    /*% changed % of record % with % % to %*/

    const RECORD_DELETED = 24;
    /*% deleted % record with %: %*/

    const SEEK_FAILED = 25;
    /*Seek on % failed.*/

    const SYNTAX_OK = 26;
    /*Syntax is correct.*/

    const TASK_STARTED = 27;
    /*% Commenced.*/

    const TMM_ACC_PROMPT = 28;
    /*ENTER DRIVER ID*/

    const TMM_ACC_REJECT = 29;
    /*INVALID ID*/

    const TMM_ADJUSTS = 30;
    /*Adjustment*/

    const TMM_ALLOCS = 31;
    /*Product Allocation*/

    const TMM_ALLOC_CHECK = 32;
    /*CHECK*/

    const TMM_ALLOC_LEFT = 33;
    /*Allocation left*/

    const TMM_ALLOC_LIMIT = 34;
    /*Allocation Limit*/

    const TMM_ALLOC_OFF = 35;
    /*FREE*/

    const TMM_ALLOC_ON = 36;
    /*LOCK*/

    const TMM_ALLOC_RESET = 37;
    /*Really want to reset allocation?*/

    const TMM_AMB_LITRE = 38;
    /*LTR*/

    const TMM_ARMS = 39;
    /*Arm*/

    const TMM_ARMF_CODE = 40;
    /*Arm Code*/

    const TMM_ARMF_LOCK = 41;
    /*Arm locked?*/

    const TMM_ARMF_TYPE = 42;
    /*Arm Type*/

    const TMM_ARMS_PARKED = 43;
    /*% Arms parked while fuel flowing*/

    const TMM_ARM_PRODUCT = 44;
    /*Arm product*/

    const TMM_BASE_CODE = 45;
    /*Base-Product Code*/

    const TMM_BASE_NAME = 46;
    /*Base-Product Name*/

    const TMM_BASE_PRODS = 47;
    /*Base Product*/

    const TMM_BLEND_ALARM = 48;
    /*% Blending alarm*/

    const TMM_BOL = 49;
    /*BILL OF LADING*/

    const TMM_CANNOT_ADD = 50;
    /*Cannot add %*/

    const TMM_CANNOT_DELETE = 51;
    /*Cannot delete %*/

    const TMM_CMPY_CODE = 52;
    /*Company Code*/

    const TMM_CMPY_NAME = 53;
    /*Company Name*/

    const TMM_CMPY_TYPE = 54;
    /*Company Type*/

    const TMM_COMMS_EST = 55;
    /*% Communications established*/

    const TMM_COMMS_FAIL = 56;
    /*% Communications failed*/

    const TMM_COMPANYS = 57;
    /*COMPANYS*/

    const TMM_COMPARTMENT = 58;
    /*Compartment*/

    const TMM_CMPT_CAPACITY = 59;
    /*Compartment capacity*/

    const TMM_CONFIRM = 60;
    /*Really want to delete the row ?*/

    const TMM_CONNECT_EARTH = 61;
    /*CONNECT EARTH*/

    const TMM_COR_LITRE = 62;
    /*CLT*/

    const TMM_COR_US_GALLON = 63;
    /*Cor gal(US)*/

    const TMM_CROSS_CHECK_ERROR = 64;
    /*% Main Product Counter Crosscheck error %*/

    const TMM_DATABASE = 65;
    /*Database*/

    const TMM_DB_KEY = 66;
    /*key %, % : record class %*/

    const TMM_DECONFIGURED = 67;
    /*deconfigured*/

    const TMM_DISCONNECT_EARTH = 68;
    /*DISCONNECT EARTH*/

    const TMM_DOCUMENT = 69;
    /*ISSUE:Type % Document To%-Trip%-Load% Area:% Site:%*/

    const TMM_EMERGENCY_STOP = 70;
    /*% Emergency Stop activated while fuel flowing*/

    const TMM_ECNCT_SUB_ITEM = 71;
    /*Equipment sub-type*/

    const TMM_END = 72;
    /*End*/

    const TMM_EQUIP_TYPES = 73;
    /*Equipment Type*/

    const TMM_EQPT_CODE = 74;
    /*Transport Equipment Code*/

    const TMM_ERROR = 75;
    /*ERROR: %*/

    const TMM_EVENTS = 76;
    /*EVENTS*/

    const TMM_ETYP_ID = 77;
    /*Equipment type Id*/

    const TMM_ETYP_N_ITEMS = 78;
    /*Number of Equipment type items*/

    const TMM_ETYP_TITLE = 79;
    /*Title of Equipment type*/

    const TMM_FATAL_SW_ERROR = 80;
    /*% Fatal software error*/

    const TMM_FLOWPROF = 81;
    /*Flow_profile*/

    const TMM_FLO_PCB_FAIL = 82;
    /*% Flowmeter counter PCB failure.Contents after RESET %, after test %*/

    const TMM_FPF_DN_QTY_RAMP = 83;
    /*Ramp-down Quantity*/

    const TMM_FPF_HI_RATE = 84;
    /*High Flow Rate*/

    const TMM_FPF_LO_RATE = 85;
    /*Low Flow Rate*/

    const TMM_FPF_MAX_QTY = 86;
    /*Maximum Quantity*/

    const TMM_FPF_MIN_QTY = 87;
    /*Minimum Quantity*/

    const TMM_FPF_SHUT_OFF_QTY = 88;
    /*Shutoff Quantity*/

    const TMM_FPF_UP_QTY_RAMP = 89;
    /*Ramp-up Quantity*/

    const TMM_HELP_LABEL = 90;
    /* ARROWS-Scroll Screen      Esc-Exit Help*/

    const TMM_JNLC_MSG = 91;
    /*jnlclean %*/

    const TMM_ILK_FAIL = 92;
    /*% Interlock fail while fuel flowing*/

    const TMM_INJECTOR_VOL = 93;
    /*Injector_volume*/

    const TMM_INJ_NO = 94;
    /*Injector Number*/

    const TMM_INJ_VOL = 95;
    /*Injector Volume*/

    const TMM_ITEM = 96;
    /*item or line*/

    const TMM_CLOS_MSG = 97;
    /*CLOSEOUT %*/

    const TMM_ALREADY_EXISTS = 98;
    /*Entry already exists*/

    const TMM_NO_PRODUCTS = 99;
    /*  No  products  available*/

    const TMM_KEY_READER = 100;
    /*Key_Reader*/

    const TMM_KFA_FLOWRATE = 101;
    /*Flow Rate*/

    const TMM_KGRAM = 102;
    /*KGM*/

    const TMM_K_FACTORS = 103;
    /*K-factor*/

    const TMM_LCD_CLOCK_FAIL = 104;
    /*% LCD Clock failure.   %*/

    const TMM_LDC = 105;
    /*Loading Console*/

    const TMM_LDCF_CODE = 106;
    /*Loading Console Code*/

    const TMM_LDCF_TYPE = 107;
    /*Loading Console Type*/

    const TMM_LOADS = 108;
    /*Load*/

    const TMM_LOAD_DOCKET_FULL = 109;
    /*Too many entries to fit on BILL OF LADING, load sequence no %*/

    const TMM_LOAD_KEY = 110;
    /*Load Key*/

    const TMM_LOCKAL = 111;
    /*Allocation Lock*/

    const TMM_LOCKAL_SUPL = 112;
    /*Allocation Lock Supplier*/

    const TMM_LOCKAL_LOCK = 113;
    /*Lock*/

    const TMM_LOG_ALRM = 114;
    /*ALARM */

    const TMM_LOG_BAY = 115;
    /*BAY   */

    const TMM_LOG_COMM = 116;
    /*COMMS */

    const TMM_LOG_CONF = 117;
    /*CONFIG*/

    const TMM_LOG_DELV = 118;
    /*DELIV */

    const TMM_LOG_DOC = 119;
    /*DOC   */

    const TMM_LOG_FAIL = 120;
    /*FAIL  */

    const TMM_LOG_LOAD = 121;
    /*LOAD  */

    const TMM_LOG_MOVE = 122;
    /*MOVE  */

    const TMM_LOG_ORD = 123;
    /*ORDER */

    const TMM_LOG_PAY = 124;
    /*PAY   */

    const TMM_LOG_SCHD = 125;
    /*SCHED */

    const TMM_LOG_TRF = 126;
    /*TRANSFER %, Cmpt%, Prod:%, Obs%, Std%, Temp% Den% Tank:%*/

    const TMM_LOG_TRS = 127;
    /*TRANSACTION %, Bay%, Trip%, Load%, Dvr%, Tkr%, Start%, End%, Site%*/

    const TMM_LOG_VEHI = 128;
    /*VEHIC */

    const TMM_LO_FLO_IN_HI = 129;
    /*% Low flow rate during high flow period*/

    const TMM_LO_VOL_IN_UP = 130;
    /*% Low delivered volume during ramp-up. % litres*/

    const TMM_MAIN_PROD_TRIP = 131;
    /*% Main Product Trip Asserted on Arm: %*/

    const TMM_METERS = 132;
    /*Meter*/

    const TMM_METER_NO = 133;
    /*Meter Number*/

    const TMM_METER_CURVE = 134;
    /*Meter Curve*/

    const TMM_METRIC_TONNE = 135;
    /*TON*/

    const TMM_NO = 136;
    /*NO*/

    const TMM_NON_FATAL_ERROR = 137;
    /*Module: %, Function: %, error: %, %, %, %*/

    const TMM_NOT_AVAILABLE = 138;
    /*Selection % is not available.*/

    const TMM_NOT_SCHEDULABLE = 139;
    /*% not schedulable*/

    const TMM_NO_ADD_FLO = 140;
    /*% No additive flow. Arm: % Additive: %*/

    const TMM_NO_FLO_IN_HI = 141;
    /*% No main product flow during high flow period*/

    const TMM_NO_VOL_IN_UP = 142;
    /*% No delivered volume during ramp-up.*/

    const TMM_OMEGA = 143;
    /*Diamond Key International OMEGA 3000*/

    const TMM_OUT_OF_SPACE = 144;
    /*% Full. No more space available for %.*/

    const TMM_OVER_RUN_ERROR = 145;
    /*% Main Product Counter Over-run error %*/

    const TMM_PCB_CONF_ERR = 146;
    /*% PCB Configuration err. Rack: % Exp_id: % Exp_slot: % Act_id: % Act_slot % Record: %*/

    const TMM_PERSONNEL = 147;
    /*Personnel*/

    const TMM_PER_AUTH = 148;
    /*Personnel Authority Level*/

    const TMM_PER_CODE = 149;
    /*Personnel Code*/

    const TMM_PER_KEY_ID = 150;
    /*Personnel Key Identifier*/

    const TMM_PER_LOCK = 151;
    /*Personnel locked out?*/

    const TMM_PER_NAME = 152;
    /*Personnel Name*/

    const TMM_POWER_FAIL = 153;
    /*% Power failure.  Mode: %*/

    const TMM_POWER_FAIL_IN_FLO = 154;
    /*% Power fail while fuel flowing*/

    const TMM_PRINTING = 155;
    /*Printing: %*/

    const TMM_PRODUCTS = 156;
    /*Products*/

    const TMM_PROD_CODE = 157;
    /*Product Code*/

    const TMM_PROD_NAME = 158;
    /*Product Name*/

    const TMM_RATIOS = 159;
    /*Ratios*/

    const TMM_RATIO_VALUE = 160;
    /*Ratio*/

    const TMM_RECORDS = 161;
    /*records*/

    const TMM_RELEASE_UNKNOWN = 162;
    /*% Release for unknown transaction: %*/

    const TMM_SCHEDULE = 163;
    /*Load Specification*/

    const TMM_SCULLY_TRIP = 164;
    /*Bay % Company % Driver % Scully tripped while fuel flowing*/

    const TMM_SEARCHING = 165;
    /*Searching ... this could take a while ...*/

    const TMM_SHLS_DATE = 166;
    /*Load Spec. Date*/

    const TMM_SHLS_SHIFT = 167;
    /*Load Spec. Shift*/

    const TMM_SHLS_TRIP_NO = 168;
    /*Load Spec. Trip No*/

    const TMM_SITE = 169;
    /*SITE*/

    const TMM_SITE_ADDR = 170;
    /*Site Address*/

    const TMM_SITE_CODE = 171;
    /*Site Code*/

    const TMM_SITE_NAME = 172;
    /*Site Name*/

    const TMM_SPECDETS = 173;
    /*Ld_spec details*/

    const TMM_SSR_ERR = 174;
    /*% SSR Readback error. Card % SSR % Error code %*/

    const TMM_START = 175;
    /*Start*/

    const TMM_SUPPLIER_PROD = 176;
    /*% of Supplier %*/

    const TMM_TANKERS = 177;
    /*Tankers*/

    const TMM_TANKS = 178;
    /*TANK*/

    const TMM_TANK_CODE = 179;
    /*Tank Code*/

    const TMM_TANK_DENSITY = 180;
    /*Tank Density*/

    const TMM_TEMP_PROBE_FAIL = 181;
    /*% Temperature probe failed on Arm: %*/

    const TMM_TNKR_CODE = 182;
    /*Tanker Code*/

    const TMM_TRANSP_EQUIP = 183;
    /*Transport Equipment*/

    const TMM_TRS_STAT_INVAL = 184;
    /*???*/

    const TMM_TRS_STAT_AUTH = 185;
    /*AUTH*/

    const TMM_TRS_STAT_ENDED = 186;
    /*ENDED*/

    const TMM_TRS_STAT_LOGGING = 187;
    /*LOGGING*/

    const TMM_TRS_STAT_LOGGED = 188;
    /*LOGGED*/

    const TMM_TYPE_DEFAULT = 189;
    /*NEW TYPE*/

    const TMM_UNAUTH = 190;
    /*Unauthorised */

    const TMM_UNAUTH_ADD = 191;
    /*% Unauthorised Additive flow on Additive : %*/

    const TMM_UNAUTH_MAIN = 192;
    /*% Unauthorised main product flow in non-flow mode*/

    const TMM_UNKNOWN_SUP = 193;
    /*Unknown supplier */

    const TMM_UNTIL = 194;
    /*until %*/

    const TMM_VAPOUR_TRIP = 195;
    /*% Vapour recovery disconnected while fuel flowing*/

    const TMM_YES = 196;
    /*YES*/

    const TOO_MANY_DECIMALS = 197;
    /*Too many decimal places.*/

    const TMM_TRANSFER_FROM = 198;
    /*Transfer of % from % to %.*/

    const TMM_AUTH_REQ = 199;
    /*Authorisation request message received from : %*/

    const TMM_AUTH_ACK = 200;
    /*Authorisation acknowledge message sent to : % */

    const TMM_UNKNOWN_PROD_CODE = 201;
    /* UNKNOWN PRODCODE */

    const TMM_UNKNOWN_PROD_NAME = 202;
    /*UNKNOWN PRODUCT*/

    const TMM_T_DETAILS = 203;
    /*Transaction details to log from : % */

    const TMM_NULL_TRANS = 204;
    /*Transaction with no volumes (NULL TRANSACTION) at : % */

    const TMM_LOAD_CREAT = 205;
    /*Trip :  %  , Supplier :  %  ,  Load: %  for  Depot : %   created at :  % */

    const TMM_TRANS_CREAT = 206;
    /*Transaction : %  created at : %  for Trip: %  , Load: % */

    const TMM_DUPLICATE_TRANS = 207;
    /*Transaction : %  data already stored (DUPLICATE) at : % */

    const TMM_DUP_TRANSID = 208;
    /*Transaction : %  already exists (DUPLICATE ID) at : % */

    const TMM_AUTH = 209;
    /*Key  % of Company  %  Granted Access to %*/

    const TMM_KEY_INVALID = 210;
    /*Key  % Invalid - presented at % */

    const TMM_COMP_INVALID = 211;
    /*Key  % Company % Invalid - presented at % */

    const TMM_IN_PROGESS = 212;
    /*Docket requested and transaction still in progress*/

    const TMM_UNKNOWN_PROD = 213;
    /*Unknown supplier product loaded at bay % arm % base name % base code % add group % add count % */

    const TMM_LOAD_KEY_INVALID = 214;
    /*Key %  Load key is invalid at % */

    const TMM_CLOSEOUT = 215;
    /*Close Out Meter Totals Report*/

    const TMM_TOTALS = 216;
    /*Bay: %, Arm: %, Observed Litres: %, Standard Litres: %,*/

    const TMM_ADJ_AMNT = 217;
    /*Safe fill adjustment amount*/

    const TMM_TEXT_ONLY = 218;
    /*%*/

    const TMM_CONF_ADD = 219;
    /*% Added % with % set to %*/

    const TMM_CONF_DEL = 220;
    /*% Deleted % with % set to %*/

    const TMM_CONF_MOD = 221;
    /*% Modified % of % : % changed from % to %*/

    const TMM_SPECPROD = 222;
    /*Ld_spec products*/

    const TMM_LOG_SYS = 223;
    /*SYSTEM*/

    const TMM_SCRSUP_RATIO_WARNING = 224;
    /*In ratio screens: The sum of ratios is proportional to the total product volume*/

    const TMM_PRESCHED_CONFLICT = 225;
    /*Loaded product doesnt match Scheduled at Bay %, Spec %, Prescheduled prod %, Loaded prod %, Compt %*/

    const TMM_PREORDER_CONFLICT = 226;
    /*Loaded product doesnt match Preodered at Bay %, Spec %,  Preordered prod %, Loaded prod %*/

    const TMM_ETYP_MAIN_LABEL = 227;
    /* F1-Help F2-Add F3-Mod F4-Redraw F5-Del F6-List F7-Print Enter-More Esc-Exit*/

    const TMM_ETYP_COMPOSE_LABEL = 228;
    /* F1-Help Enter-Select F8-Save Esc-Exit   COMPOSE MODE*/

    const TMM_ETYP_CMPT_ADD_LABEL = 229;
    /* Enter-Add F8-Save Esc-Exit   ADD MODE*/

    const TMM_ETYP_CMPT_MODIFY_LABEL = 230;
    /* F1-Breakdown F8-Save Esc-Exit   ADD MODE*/

    const TMM_ETYP_CMPT_VIEW_LABEL = 231;
    /* F1-Breakdown F3-Modify Esc-Exit*/

    const TMM_BASIC_LABEL = 232;
    /* ARROWS-CursorMovement Esc-Exit*/

    const TMM_ETYP_BREAKDOWN_ILLEGAL = 233;
    /*TYPE NOT COMPOSED OF OTHER TYPES*/

    const TMM_ETYP_DELETION_ILLEGAL = 234;
    /*DELETION ILLEGAL - type used by other types*/

    const TMM_ETYP_MODIFICATION_ILLEGAL = 235;
    /*MODIFICATION NOT PERMITTED - modify sub-types if necessary*/

    const TMM_ETYP_COMPOSE_QUERY = 236;
    /*Do you wish to compose type from those listed*/

    const TMM_ETYP_CONFIRM_DELETE = 237;
    /*WARNING : type may be used - Please confirm deletion*/

    const TMM_ETYP_SCHED_QUERY = 238;
    /*Do you wish the type to be schedulable*/

    const TMM_ILLEGAL_ENTRY = 239;
    /*ILLEGAL ENTRY*/

    const TMM_CODE_ALLOCATED = 240;
    /*CODE PREVIOUSLY ALLOCATED*/

    const TMM_ETYP_ZERO_CMPTS = 241;
    /*NO COMPARTMENTS IN TYPE*/

    const TMM_PRM_PRSSNL = 242;
    /*PRM_PRSSNL*/

    const TMM_PRM_EQPT = 243;
    /*PRM_EQPT*/

    const TMM_PER_DEPARTMENT = 244;
    /*Personnel department*/

    const TMM_PER_AREA = 245;
    /*Personnel in area*/

    const TMM_PER_TIMECODE = 246;
    /*Personnel timecode*/

    const TMM_UNAUTH_PROD = 247;
    /*% Unauthorised product flow % litres*/

    const TMM_GATE_DISABLE = 248;
    /*Gate % is disabled*/

    const TMM_GATE_OFF = 249;
    /*Gate % is switched off*/

    const TMM_GATE_OPEN = 250;
    /*Gate % is opened by % */

    const TMM_PROMPT_REPLY = 251;
    /*% received at gate: %  prompt: % */

    const TMM_ACCESS_DENIED = 252;
    /* % denied access at gate: % */

    const TMM_ACCESS_PERMITTED = 253;
    /* % allowed access at gate: % from area % to area % */

    const TMM_RPT_PRD = 254;
    /*Reporting Period*/

    const TMM_DAY_OF_WEEK = 255;
    /*Day of Week*/

    const TMM_DAY_OF_MONTH = 256;
    /*Day of Month*/

    const TMM_CLSOUT_TIME = 257;
    /*Report Close Out Time*/

    const TMM_LDS_RTN_PRD = 258;
    /*Loads Retention Period*/

    const TMM_OPR_LIMIT = 259;
    /*Operating Limit*/

    const TMM_CONTREC_TIMEOUT = 260;
    /*Timeout at CONTREC % ,Awaiting 2nd card wipe*/

    const TMM_OP_DATE = 261;
    /*Operating Date*/

    const TMM_CH_PASSWORD = 262;
    /*% assigned password for %*/

    const TMM_GATE_OPEN_FOR_PSN = 263;
    /*%s opened Gate % for % */

    const TMM_P_ENTER_ID = 264;
    /*Enter identification tag*/

    const TMM_P_UNLD_VOL = 265;
    /*Unloading, please enter volume*/

    const TMM_P_UNLD_DENS = 266;
    /*Unloading, please enter density*/

    const TMM_P_CONNECT_UNLD = 267;
    /*Connect earth lead and unload. */

    const TMM_P_CONNECT_UNLD_2 = 268;
    /*Remove identification tag when finished*/

    const TMM_P_CONNECT_LD = 269;
    /*Connect earth lead and load. */

    const TMM_P_CONNECT_LD_2 = 270;
    /*Press enter when ready. */

    const TMM_P_LD = 271;
    /*Remove identification tag when finished*/

    const TMM_P_TANK_OVFL = 272;
    /*Tank will overflow. */

    const TMM_P_TANK_OVFL_2 = 273;
    /*Re-enter predicted volume*/

    const TMM_P_NOT_ID = 274;
    /*Identification tag unknown.*/

    const TMM_P_NOT_ID_2 = 275;
    /*Remove identification tag and restart */

    const TMM_P_DENS_RANGE = 276;
    /*Density not in range 0.% to 0.%*/

    const TMM_P_TK_NOT_RCPT = 277;
    /*Tank not in receipt mode. */

    const TMM_P_TK_NOT_SUPL = 278;
    /*Tank not in supply mode. */

    const TMM_P_TRANS_DIS_ALL = 279;
    /*Transaction disallowed*/

    const TMM_P_TRANS_ALARM = 280;
    /*Transaction Alarm ...*/

    const TMM_JET_BRIDGER = 281;
    /*JET_BRIDGER*/

    const TMM_AVGAS_BRIDGER = 282;
    /*AVGAS_BRIDGER*/

    const TMM_JET_BRIDGER_ND = 283;
    /*JET_BRIDGER_NON_DED*/

    const TMM_AVGAS_BRIDGER_ND = 284;
    /*AVGAS_BRIDGER_NON_DED*/

    const TMM_JET_REFUELLER = 285;
    /*JET_REFUELLER*/

    const TMM_AVGAS_REFUELLER = 286;
    /*AVGAS_REFUELLER*/

    const TMM_DENS_EXEPTION = 287;
    /*% % Product Density Variation : Predicted 0.%  Metered 0.%*/

    const TMM_VOL_EXEPTION = 288;
    /*% % Product Volume Variation : Predicted %  Delivered %*/

    const TMM_D_TRANSFER = 289;
    /*TRANSFER % BAY %  OpenObs % CloseObs % OpenStd % CloseStd % */

    const TMM_D_TRANSACTION = 290;
    /*UNLOAD % % % % Docket % Obs L % Std L % Temp % Density 0.% DensBOL 0.% */

    const TMM_KEY_LOCK_OUT = 291;
    /*% locked out of area %*/

    const TMM_KEY_UNRECOGNISED = 292;
    /*unrecognised key % at gate %*/

    const TMM_AUTH_LVL_PERMIT_FAILED = 293;
    /* key % of incorrect authority at gate %*/

    const TMM_ETYP_PERMIT_FAILED = 294;
    /* key % of incorrect equipment type at gate %*/

    const TMM_P_DEP_ESTOP = 295;
    /*Emergency stop asserted*/

    const TMM_P_DEP_DEADMAN = 296;
    /*Deadman timer expired*/

    const TMM_P_DEP_BAD_DENS = 297;
    /*Bridged density out of range*/

    const TMM_P_UNLD_DOCKET = 298;
    /*Unloading, please enter docket number*/

    const TMM_P_DENS_PREFIX = 299;
    /* = 0.*/

    const TMM_P_TRIP_EXCPTN = 300;
    /*Please re-enter non-zero docket number*/

    const TMM_ACCU_HF_ALARM = 301;
    /*Flow of product too fast at accuload %*/

    const TMM_ACCU_DA_ALARM = 302;
    /*Possible memory fault at accuload %*/

    const TMM_ACCU_OA_ALARM = 303;
    /*Quantity delivered by accuload % over preset*/

    const TMM_ACCU_TB_ALARM = 304;
    /*Accuload % EXCESSIVE INTERNAL TEMPERATURE*/

    const TMM_ACCU_TP_ALARM = 305;
    /*Temperature probe failure at accuload %*/

    const TMM_ACCU_VF_ALARM = 306;
    /*VALVE CLOSURE FAILURE at accuload %*/

    const TMM_ACCU_WD_ALARM = 307;
    /*Watch dog alarm at accuload %*/

    const TMM_ACCU_LF_ALARM = 308;
    /*Product flow rate at accuload % below minimum permitted rate*/

    const TMM_ACCU_PT_ALARM = 309;
    /*NO PULSES at accuload % ALTHOUGH VALVE OPEN*/

    const TMM_ACCU_PS_ALARM = 310;
    /*PULSE ERRORS at accuload %*/

    const TMM_ACCU_TK_ALARM = 311;
    /*Ticket cranked during loading at accuload %*/

    const TMM_ACCU_PR_ALARM = 312;
    /*Pressure transducer failure at accuload %*/

    const TMM_ACCU_BP_ALARM = 313;
    /*BACKPRESSURE UNMAINTAINABLE at accuload %*/

    const TMM_ACCU_CF_ALARM = 314;
    /*Bad callibration factor at accuload %*/

    const TMM_ACCU_LD_ALARM = 315;
    /*Possible hardware problem at accuload %*/

    const TMM_ACCU_CA_ALARM = 316;
    /*Cessation of polling to accuload % detected*/

    const TMM_LOG_ACCU_TRF = 317;
    /*TRANSFER %, Cmpt %, Product %, Loaded %, Metered %, Temp % Den % press %*/

    const TMM_P_WRONG_LANE = 318;
    /*Wrong lane. Remove identification tag*/

    const TMM_D_TRANS_LOAD = 319;
    /*LOAD % % % % Obs L % Std L % Temp % Tank Density 0.%*/

    const TMM_INVALID_TRIP_NO = 320;
    /*Invalid trip number % entered at %*/

    const TMM_EPC_NOT_IDLE = 321;
    /*E.P.C  %  not in idle mode */

    const TMM_EPC_AUTH_TRANS = 322;
    /*E.P.C  %  transaction authorised */

    const TMM_EPC_PRICE_SET = 323;
    /*E.P.C  %  price set to % */

    const TMM_EPC_TRF = 324;
    /*E.P.C % transaction no: %, transfer % litres, $ % - % %*/

    const TMM_P_TPM_ALARM = 325;
    /*LOG MESSAGE from dl=%, nw=%: code %*/

    const TMM_SEND_PARM = 326;
    /*Sending parameters out to bay %*/

    const TMM_SEND_PARM_TITLE = 327;
    /*: ARM : Q1  : Q2  : K_FACTOR  : PRODUCT : MAX_L : MIN_L : HI_FL : LO_FL : F_TRIP : SHUTDN : MIN_LO_FL :*/

    const TMM_PARM_DUMP = 328;
    /*:  % : %: %: %: %  : %  : %  :  %: % : % : % : %   :*/

    const TMM_TANK_MISSING = 329;
    /* Missing tank record % in database */

    const TMM_COMPLETE = 330;
    /*COMPLETE*/

    const TMM_COMP_PREV = 331;
    /*COMP(PREV)*/

    const TMM_COMP_CURR = 332;
    /*COMP(CURR)*/

    const TMM_INCOMPLETE = 333;
    /*INCOMPLETE*/

    const TMM_LOADING = 334;
    /*LOADING*/

    const TMM_SHL_ENDSRCH = 335;
    /*End of Load Spec Search*/

    const TMM_SHL_NOTFOUND = 336;
    /*Load Spec not found*/

    const TMM_SHL_DOC = 337;
    /*Docket is being printed, please wait ...*/

    const TMM_SHL_PROGRESS = 338;
    /*Transaction in progress, cannot modify*/

    const TMM_SHL_NOT_MOD = 339;
    /*Load Spec is completed, cannot modify*/

    const TMM_PRN_NOT_ONLINE = 340;
    /*Printer not on line*/

    const TMM_SHL_NOT_LOADED = 341;
    /*Load Spec not loaded*/

    const TMM_SHL_TRY_LATER = 342;
    /*Transaction in progress, try later*/

    const TMM_SHL_LD_CMP = 343;
    /*Load is incomplete, really want to complete the load?*/

    const TMM_SHL_NOT_EXIST = 344;
    /*Trip number doesnt exist, please enter another one*/

    const TMM_SHL_DIGIT_TOO_LONG = 345;
    /*Sorry, you cannot enter more than SIX digits*/

    const TMM_SHL_DIGIT_ENTER = 346;
    /*Please enter digits*/

    const TMM_SHL_NOT_UNIQ = 347;
    /*Trip number not unique, please enter another one*/

    const TMM_SHL_NOTKRS = 348;
    /*No tankers for the carrier*/

    const TMM_CARRIER = 349;
    /*carrier*/

    const TMM_INVALID = 350;
    /*% invalid*/

    const TMM_NO_RECORD = 351;
    /*No record exists, ignored*/

    const TMM_DB_FULL = 352;
    /*Database is full, ignored*/

    const TMM_NO_SUPPLIERS = 353;
    /*No suppliers available*/

    const TMM_TANK_HIGH_ALM = 354;
    /*High Product level at tank %*/

    const TMM_TANK_LOW_ALM = 355;
    /*Low Product level at tank %*/

    const TMM_TANK_UNAVAIL = 356;
    /*% unavailable for tank %*/

    const TMM_PRODUCT_TEMP = 357;
    /*Product Temperature*/

    const TMM_AMBIENT_VOL = 358;
    /*Observed product volume*/

    const TMM_CORRECTED_VOL = 359;
    /*Standard product volume*/

    const TMM_ULLAGE = 360;
    /*Ullage*/

    const TMM_H2O_CONTENT = 361;
    /*Water content*/

    const TMM_PRD_LVL_ALARMS = 362;
    /*Product Level Alarms*/

    const TMM_TANK_HIGH_HIGH_ALM = 363;
    /*High High alarm at tank %*/

    const TMM_TANK_LOW_LOW_ALM = 364;
    /*Low Low alarm at tank %*/

    const TMM_TANK_OP_CHANGE_HIGH_ALM = 365;
    /*Operator Change High alarm at tank %*/

    const TMM_TANK_OP_CHANGE_LOW_ALM = 366;
    /*Operator Change Low alarm at tank %*/

    const TMM_TANK_OP_SETPT_HIGH_ALM = 367;
    /*Operator Setpoint High alarm at tank %*/

    const TMM_TANK_OP_SETPT_LOW_ALM = 368;
    /*Operator Setpoint Low alarm at tank %*/

    const TMM_TANK_NOT_SET = 369;
    /*% not set at tank %*/

    const TMM_SW_LVL_ALARMS = 370;
    /*Software Level Alarms*/

    const TMM_MTR_XCESS = 371;
    /*Unaccounted % through meters connected to tank % of % to % litres over period % to %*/

    const TMM_TNK_LOSS = 372;
    /*Unaccounted loss of % to % litres at tank % over period % to % at terminal %*/

    const TMM_TNK_GAIN = 373;
    /*Unaccounted gain of % to % litres at tank % over period % to % at terminal %*/

    const TMM_INFLOW = 374;
    /*inflow*/

    const TMM_OUTFLOW = 375;
    /*outflow*/

    const TMM_RCNCL_OK = 376;
    /*Reconciliation for tank % OK*/

    const TMM_UNPLANNED_EQUIP = 377;
    /*Driver : % loading with unplanned equipment , Tanker changed from % to %.*/

    const TMM_RSTMTOT = 378;
    /*% resets meter total for bay % arm % at OBS % STD %*/

    const TMM_ADD_VOL = 379;
    /*Transfer %: Additive injection volume: % ml*/

    const TMM_CO_NOT_CUSTOMER = 380;
    /*Carrier company not a customer , Order load */

    const TMM_B_AND_L = 381;
    /* % % of % borrowed from % by %*/

    const TMM_B_AND_L_REASON = 382;
    /* loan reason : % */

    const TMM_DOC_AUTH = 383;
    /*Key  % of Company  %  Granted Access to %*/

    const TMM_DOC_TOTALS = 384;
    /*Bay: %, Arm: %, Observed Litres: %, Standard Litres: %,*/

    const TMM_VEH_DENIED = 385;
    /* % denied access at gate: % */

    const TMM_VEH_PERMITTED = 386;
    /* % allowed access at gate: % from area % to area % */

    const TMM_VEH_TIMEOUT = 387;
    /* Timeout at cardreader % ,Awaiting further card wipe*/

    const TMM_STRAPS_ERROR = 388;
    /*INADEQUATE STRAPPING DATA : TANK % VOLUME INDETERMINATE*/

    const TMM_CENTS_PER_LITRE = 389;
    /* Cents per Litre */

    const TMM_CELSIUS = 390;
    /* Celsius */

    const TMM_FAHRENHEIT = 391;
    /* Fahrenheit */

    const TMM_ALLOCRESET = 392;
    /*RESET*/

    const TMM_DAILY = 393;
    /*DAILY*/

    const TMM_WEEKLY = 394;
    /*WEEKLY*/

    const TMM_FORTNIGHTLY = 395;
    /*FORTNIGHTLY*/

    const TMM_MONTHLY = 396;
    /*MONTHLY*/

    const TMM_WHESSOE = 397;
    /*WHESSMATIC 500 */

    const TMM_RELEASE = 398;
    /*RELEASE */

    const TMM_ACCESS_CONTROLLER = 399;
    /*ACCESS CONTROLLER*/

    const TMM_LOAD_GANTRY_SUPERVISOR = 400;
    /*LOAD GANTRY SUPERVISOR*/

    const TMM_LOAD_SCHEDULER = 401;
    /*LOAD SCHEDULER*/

    const TMM_MAIN_MENU = 402;
    /*MAIN MENU*/

    const TMM_REPORTING = 403;
    /*REPORTING MENU*/

    const TMM_PROD_PRICE = 404;
    /*Product Price*/

    const TMM_PROD_UNIT = 405;
    /*Product Unit*/

    const TMM_HST_CFG_ERROR = 406;
    /*HOST %: Load % for trip % cannot be % %*/

    const TMM_HST_ORDER = 407;
    /*order*/

    const TMM_HST_SCHEDULE = 408;
    /*schedule*/

    const TMM_HST_CREATED = 409;
    /*created*/

    const TMM_HST_MODIFIED = 410;
    /*updated*/

    const TMM_HST_DELETED = 411;
    /*deleted*/

    const TMM_HST_QUOTA = 412;
    /*product quota*/

    const TMM_HST_COMPARTMENT = 413;
    /*compartment*/

    const TMM_HST_TANKER = 414;
    /*: tanker % invalid*/

    const TMM_HST_STARTED = 415;
    /*: loading has commenced*/

    const TMM_HST_MAX = 416;
    /*: number of %s (%) out of range */

    const TMM_HST_VOL = 417;
    /*: quantity in % % must be >= 0*/

    const TMM_HST_RANGE = 418;
    /*: % number % out of range*/

    const TMM_HST_PROD = 419;
    /*: supplier product % in % % invalid*/

    const TMM_HST_UNIT = 420;
    /*: unit % in % % invalid*/

    const TMM_HST_TIME = 421;
    /*: scheduled time is invalid*/

    const TMM_HST_TRIP = 422;
    /*: trip number invalid*/

    const TMM_HST_SAFE = 423;
    /*: quantity % in % % exceeds safe fill level*/

    const TMM_HST_TYPE = 424;
    /*: Trip % is already PRESCHEDULED: cannot be changed to ORDER*/

    const TMM_CSTLOCKAL = 425;
    /*Customer Lock Allocation*/

    const TMM_CUSTOMER_ALLC = 426;
    /*Database is full, ignored*/

    const TMM_AL_DAILY = 427;
    /*DAILY*/

    const TMM_AL_WEEKLY = 428;
    /*WEEKLY*/

    const TMM_AL_FORTNIGHTLY = 429;
    /*FORTNIGHTLY*/

    const TMM_AL_MONTHLY = 430;
    /*MONTHLY*/

    const TMM_PMV_CREATED = 431;
    /*Product Movement: % created - product % source % type % destination % type %*/

    const TMM_PMV_COMPLETE = 432;
    /*Product Movement: % ended - product: % scale: % amount: %*/

    const TMM_LIST_UNKN_CMPY_TYPE = 433;
    /*Unknown % company*/

    const TMM_LIST_NO_CMPY_TYPE = 434;
    /*No %s available*/

    const TMM_LIST_INV_CMPY_TYPE = 435;
    /*Invalid Company Type*/

    const TMM_GNRL_INIT_ERROR = 436;
    /*Fatal Initialisation Error*/

    const TMM_DEL_SCHED = 437;
    /*% deleted SCHEDULE with Trip Num: %  Supplier: %  Delivery Date: % Status: % */

    const TMM_DEL_LOAD = 438;
    /*% deleted LOAD with Trip Num: %  Carrier: %  Loaded Date: % Status: % */

    const TMM_NEW = 439;
    /*NEW*/

    const TMM_UNKNOWN = 440;
    /*Entered Identifier is unknown*/

    const TMM_NO_ENTRIES = 441;
    /*No data available*/

    const TMM_STOCK_MANAGEMENT = 442;
    /*STOCK MANAGEMENT*/

    const TMM_CONF_ADD_MTR_PT = 443;
    /*% added meter curve point on bay %, arm %: flow % - K-factor %*/

    const TMM_CONF_DEL_MTR_PT = 444;
    /*% deleted meter curve point on meter %: flow % - K-factor %*/

    const TMM_OM_BULK = 445;
    /*BULK*/

    const TMM_OM_PACK = 446;
    /*PACK*/

    const TMM_OM_PROFILE = 447;
    /*PROFILE*/

    const TMM_OM_CASH = 448;
    /*CASH*/

    const TMM_OM_CREDIT = 449;
    /*CREDIT*/

    const TMM_OM_CHEQUE = 450;
    /*CHEQUE*/

    const TMM_OM_LOAN = 451;
    /*LOAN*/

    const TMM_ROAD_BULK = 452;
    /*ROAD BULK*/

    const TMM_ROAD_PACK = 453;
    /*ROAD PACK*/

    const TMM_RAIL_BULK = 454;
    /*RAIL BULK*/

    const TMM_RAIL_PACK = 455;
    /*RAIL PACK*/

    const TMM_PIPELINE = 456;
    /*PIPELINE*/

    const TMM_PMV_OPEN_METER = 457;
    /*Product Movement % meter totals: Opening observed % , Opening standard % */

    const TMM_PMV_CLOSE_METER = 458;
    /*Product Movement % meter totals: Closing observed % , Closing standard % */

    const TMM_CONTINUE = 459;
    /*Do you wish to order more products ?*/

    const TMM_ALL_ROLE = 460;
    /*ALL_ROLE*/

    const TMM_DIRECT_DEBIT = 461;
    /*DIRECT DEBIT*/

    const TMM_CREDIT_CARD = 462;
    /*CREDIT CARD*/

    const TMM_INVLD_SRCH = 463;
    /*Invalid SEARCH data*/

    const TMM_ORDER_PROCESSING = 464;
    /*ORDER[%] PROCESSING*/

    const TMM_LOSS_IN_RECEIPT = 465;
    /*UNEXPECTED TANK % PRODUCT LOSS WHILE IN RECEIPT*/

    const TMM_GAIN_IN_TRANSFER = 466;
    /*UNEXPECTED TANK % PRODUCT GAIN WHILE IN TRANSFER*/

    const TMM_INJECTOR = 467;
    /*Injector*/

    const TMM_TSW_LOCK_ARM = 468;
    /*Tank switching: % arm % at bay %*/

    const TMM_TSW_SWITCH = 469;
    /*Tank switching: Switched % % from % to %*/

    const TMM_TSW_LOCKED = 470;
    /*Locked*/

    const TMM_TSW_UNLOCKED = 471;
    /*Unlocked*/

    const TMM_DATE_ERROR = 472;
    /*The delivery date is EARLIER than order date*/

    const TMM_PRESS_SPACE = 473;
    /*Please press space bar for choice list*/

    const TMM_MUST_ENTER = 474;
    /*This field must be filled in*/

    const TMM_NO_MORE_DATA = 475;
    /*No more data available*/

    const TMM_DEBIT = 476;
    /*DEBIT*/

    const TMM_AT_LOAD_COMPLETION = 477;
    /*AT LOAD COMPLETION TIME*/

    const TMM_AT_LOAD_RECONCILIATION = 478;
    /*AT LOAD RECONCILIATION TIME*/

    const TMM_AT_CLOSEOUT = 479;
    /*AT CLOSEOUT TIME*/

    const TMM_NOTHING = 480;
    /**/

    const TMM_PRICED = 481;
    /*PRICED*/

    const TMM_UNPRICED = 482;
    /*UNPRICED*/

    const TMM_CREDIT_NOTE = 483;
    /*CREDIT NOTE*/

    const TMM_PRODUCT_UNIT = 484;
    /*PRODUCT UNIT*/

    const TMM_PACK_UNIT = 485;
    /*PACK UNIT*/

    const TMM_DISCOUNT = 486;
    /*DISCOUNT*/

    const TMM_SHIP = 487;
    /*SHIP*/

    const TMM_INVOICE = 488;
    /*INVOICE*/

    const TMM_TRANSFER = 489;
    /*TRANSFER*/

    const TMM_AMBIENT = 490;
    /*OBSERVED*/

    const TMM_CORRECTED = 491;
    /*STANDARD*/

    const TMM_MASS = 492;
    /*MASS*/

    const TMM_ORDER_STAT_SCHED = 493;
    /*FULLY SCHEDULED*/

    const TMM_ORDER_STAT_FILL = 494;
    /*PARTIALLY SCHEDULED*/

    const TMM_ORDER_STAT_DELV = 495;
    /*FULLY LOADED*/

    const TMM_ORDER_STAT_CMPLTD = 496;
    /*FULLY DELIVERED*/

    const TMM_ORDER_STAT_OUT = 497;
    /*OUTSTANDING*/

    const TMM_PAY_THANKS = 498;
    /*PAYMENT-THANKYOU*/

    const TMM_CUB_METRE = 499;
    /*CUBIC METRE*/

    const TMM_MANAGER = 500;
    /*MANAGER*/

    const TMM_ACCOUNTANT = 501;
    /*ACCOUNTANT*/

    const TMM_SUPERVISOR = 502;
    /*SUPERVISOR*/

    const TMM_ENGINEER = 503;
    /*ENGINEER*/

    const TMM_DESPATCH = 504;
    /*DISPATCH*/

    const TMM_GUARD = 505;
    /*GUARD*/

    const TMM_DRIVER = 506;
    /*DRIVER*/

    const TMM_CONTRACTOR = 507;
    /*CONTRACTOR*/

    const TMM_LOADER = 508;
    /*LOADER*/

    const TMM_VISITOR = 509;
    /*VISITOR*/

    const TMM_ALL_ROLE_FOR_COMPANY = 510;
    /*ALL ROLE FOR COMPANY*/

    const TMM_PERSONAL = 511;
    /*PERSONAL*/

    const TMM_NO_ADD_ALLOWED = 512;
    /*No more data may be added */

    const TMM_NO_MESSAGE = 513;
    /*NO MESSAGE*/

    const TMM_ALL_COMPANY = 514;
    /*ALL COMPANY*/

    const TMM_ALL_PERSONNEL = 515;
    /*ALL PERSONNEL*/

    const TMM_RTN_CFG_BAY_ONLY = 516;
    /*BAY only*/

    const TMM_RTN_CFG_GATE_BAY = 517;
    /*GATE and BAY*/

    const TMM_RTN_CFG_GATE_SPC = 518;
    /*GATE and RETURNS DEVICE*/

    const TMM_RTN_CFG_GATE_ONLY = 519;
    /*GATE only*/

    const TMM_RTN_CFG_SPC_ONLY = 520;
    /*RETURNS DEVICE only*/

    const TMM_RTN_NOT_KNOWN = 521;
    /*NOT KNOWN*/

    const TMM_RTN_UNSPEC = 522;
    /*UNSPECIFIED*/

    const TMM_RTN_KNOWN = 523;
    /*KNOWN*/

    const TMM_AUTH_INSUFFICIENT = 524;
    /*AUTHORITY INSUFFICIENT*/

    const TMM_TANK_VOL_RESET = 525;
    /*% reset volume at tank % (std) OLD % NEW % (obs) OLD % NEW %*/

    const TMM_TANK_OWNED_VOL_RESET = 526;
    /*Owned (std) vol. reset for % at tank % OLD % NEW % */

    const TMM_OMEGA_SUPPORT = 527;
    /*Omega Support*/

    const TMM_TANK_TEMP = 528;
    /*Tank Temperature*/

    const TMM_ETHANOL_MF = 529;
    /*Ethanol Mass Fraction*/

    const TMM_PRDCT_CONFIRM = 530;
    /*Current tank product is % . Continue ... */

    const TMM_NOT_FOUND_IN_AREA = 531;
    /*No % found in area % */

    const TMM_DOCUMENT_PRINTER = 532;
    /*DOCUMENT PRINTER*/

    const TMM_PMV_NOT_STARTED_AT_SCREEN = 533;
    /*MOVEMENT NOT STARTED AT SCREEN % */

    const TMM_CONTINUE_QUERY = 534;
    /*Continue...*/

    const TMM_RECEIPT = 535;
    /*Receipt*/

    const TMM_DATE_ERROR2 = 536;
    /*The expiry date is EARLIER than delivery date*/

    const TMM_WAIT = 537;
    /*% Please wait...*/

    const TMM_PRINTING_PMV_RCPT = 538;
    /*PRINTING MOVEMENT RECEIPT*/

    const TMM_MTR_OUT_TNK_IN = 539;
    /*Volume increase at % but nett meter outflow over period % to %*/

    const TMM_MTR_IN_TNK_OUT = 540;
    /*Volume decrease at % but nett meter inflow over period % to %*/

    const TMM_OUTFLOW_MTR_TOTALS_ERROR = 541;
    /*Totals for outflow meters at tank % low*/

    const TMM_INFLOW_MTR_TOTALS_ERROR = 542;
    /*Totals for inflow meters at tank % low*/

    const TMM_AT_ALLOC_RESET = 543;
    /*AT ALLOCATION RESET TIME*/

    const TMM_ON_DEMAND_ONLY = 544;
    /*ON DEMAND ONLY*/

    const TMM_CUSTOMER = 545;
    /*CUSTOMER*/

    const TMM_UNKNOWN_TANKER_CFG = 546;
    /*Configuration of tanker % unknown %*/

    const TMM_RETURNS_IGNORED = 547;
    /*Returns ignored.*/

    const TMM_ILLEGAL_GEN_PROD = 548;
    /*Generic Product has different Base Product. Choose/Add different Generic Product.*/

    const TMM_RTN_INCOMPLETE = 549;
    /*INCOMPLETE RETURNS DATA FOR TANKER %*/

    const TMM_RTN_NO_SPEC = 550;
    /*RETURNS SPECIFIED WITHOUT LOAD SPEC FOR TANKER % COMPARTMENT %*/

    const TMM_MTOT_REC = 551;
    /*Meter Total Received from %. Total %.*/

    const TMM_MTD_CONTREC_411 = 552;
    /*CONTREC_411 */

    const TMM_MTD_EMAIL_TPM = 553;
    /*EMAIL_TPM */

    const TMM_MTD_SARASOTA_FCT_900 = 554;
    /*SARASOTA_FCT_900 */

    const TMM_CANNOT_MODIFY = 555;
    /*Cannot modify %*/

    const TMM_MTOT_INV_TK = 556;
    /*Meter Totalizer % not connected to a valid tank %.*/

    const TMM_DUPLICATE_SPEC = 557;
    /*Duplicate Load Spec Trip:% Drawer:% needs to be priority stamped.*/

    const TMM_PRESS_SPACE_OR_TYPE = 558;
    /*Please press space bar for choices or type entry*/

    const TMM_PRESS_SPACE_TO_TOGGLE = 559;
    /*Please press space bar to toggle value*/

    const TMM_JNLT_ALL = 560;
    /*ALL*/

    const TMM_JNLT_ORD = 561;
    /*ORDER*/

    const TMM_JNLT_SCHD = 562;
    /*SCHED*/

    const TMM_JNLT_LOAD = 563;
    /*LOAD*/

    const TMM_JNLT_BAY = 564;
    /*BAY*/

    const TMM_JNLT_DELV = 565;
    /*DELIVER*/

    const TMM_JNLT_PAY = 566;
    /*PAY*/

    const TMM_JNLT_MOVE = 567;
    /*MOVE*/

    const TMM_JNLT_VEHI = 568;
    /*VEHICLE*/

    const TMM_JNLT_FAIL = 569;
    /*FAIL*/

    const TMM_JNLT_CONF = 570;
    /*CONF*/

    const TMM_JNLT_COMM = 571;
    /*COMMS*/

    const TMM_JNLT_ALRM = 572;
    /*ALARM*/

    const TMM_JNLT_SYS = 573;
    /*SYSTEM*/

    const TMM_INVALID_PASSWORD = 574;
    /*Invalid Password*/

    const TMM_SCR_ACCESS_DENIED = 575;
    /*Access Denied!*/

    const TMM_PGING_WAIT = 576;
    /*Obtaining data. Please wait...*/

    const TMM_EQUIP_MENU = 577;
    /*EQUIPMENT LIST MENU*/

    const TMM_SCHEDULE_MENU = 578;
    /*SCHEDULE CHOICE MENU*/

    const TMM_ID_ASSIGNED = 579;
    /*% assigned Identification no. % (Issuer %) to %*/

    const TMM_ID_UNASSIGNED = 580;
    /*Identification no. % issued by % assignment removed for  %*/

    const TMM_CMPY_SITE_MANAGER = 581;
    /*SITE_MANAGER*/

    const TMM_CMPY_SUPPLIER = 582;
    /*SUPPLIER*/

    const TMM_CMPY_CARRIER = 583;
    /*CARRIER*/

    const TMM_CMPY_CUSTOMER = 584;
    /*CUSTOMER*/

    const TMM_CMPY_DRAWER = 585;
    /*DRAWER*/

    const TMM_CMPY_ISSUER = 586;
    /*ISSUER*/

    const TMM_ILLEGAL_ENUM = 587;
    /*Enumerated Data Type: % is not set up*/

    const TMM_COMBINATION = 588;
    /*COMBINATION*/

    const TMM_RAIL_LOADER = 589;
    /*RAIL LOADER*/

    const TMM_TANKER = 590;
    /*TANKER*/

    const TMM_KEY_TRIP_NO = 591;
    /*SCUP TRIP*/

    const TMM_ADD = 592;
    /*ADD*/

    const TMM_MODIFY = 593;
    /*MODIFY*/

    const TMM_NO_ALLOC = 594;
    /*Insufficient % allocation for: Drawer:%, Supplier:%, Product:%, qty:%*/

    const TMM_LOAD_ADVICE = 595;
    /*Load advice requested for card % issued by % for tanker %*/

    const TMM_ORDER_STAT_EXPIRED = 596;
    /*EXPIRED*/

    const TMM_FIND = 597;
    /*FIND*/

    const TMM_DRAWER_PRODUCT = 598;
    /*Drawer product*/

    const TMM_NO_EQUIVALENT = 599;
    /* % has no equivalent % for %*/

    const TMM_CMPY_HOST = 600;
    /*Host Name*/

    const TMM_HST_ALL_TK_DET_REQ = 601;
    /*Tank Details Message (all tanks) scheduled for %*/

    const TMM_HST_1_TK_DET_REQ = 602;
    /*Tank Details Message (tank %) scheduled for %*/

    const TMM_HST_TEST_MSG_ARRIVED = 603;
    /*% Host Test message arrived: %*/

    const TMM_CMPY_VET_CARRIER = 604;
    /*VET CARRIER*/

    const TMM_CMPY_VET_PRIMEMOVER = 605;
    /*VET PRIMEMOVER*/

    const TMM_CMPY_VET_TRAILER = 606;
    /*VET TRAILER*/

    const TMM_CMPY_VET_ALL = 607;
    /*VET ALL*/

    const TMM_CMPY_EMPLOYER = 608;
    /*EMPLOYER*/

    const TMM_MOD_ALLOCATION = 609;
    /*% changed Allocation for %:%, Supplier:%, Product Code:% set to %.*/

    const TMM_TANKER_ENTERS_SITE = 610;
    /*Tanker % (key_id: %, issuer: %) enters Site: % Driver: %*/

    const TMM_TANKER_LEAVES_SITE = 611;
    /*Tanker % (key_id: %, issuer: %) leaves Site: % Driver: %*/

    const TMM_TANK_METER_CHANGE = 612;
    /*% changed Meter(s) from Tank % to Tank %*/

    const TMM_LOAD_STARTED = 613;
    /*Load % (trip %) started*/

    const TMM_LOAD_COMPLETED = 614;
    /*Load % (trip %) (Site %) completed*/

    const TMM_HST_SCHD_MSG = 615;
    /*Dispatching a % message to %*/

    const TMM_LOAD_SPEC_ADD = 616;
    /*Load Spec added by Company % (Trip %, Drawer: %, Supplier %)*/

    const TMM_LOAD_SPEC_MOD = 617;
    /*Load Spec modified by Company % (Trip %, Drawer: %, Supplier %)*/

    const TMM_INCOMPATIBLE_RETURNS_PROD = 618;
    /*Incompatible Product: Trip:%,%,Trlr:%,Cmpt:%, product %, preloaded:%*/

    const TMM_DIFF_RETURNS_VOL = 619;
    /*Different returns qty: Trip:%,Supplier:%,Trailer:%,Cmpt:%,bay recorded:%, OMEGA has:%*/

    const TMM_RTN_ORIG_UNKNOWN = 620;
    /**/

    const TMM_RTN_ORIG_BAY = 621;
    /*BAY*/

    const TMM_RTN_ORIG_SPC = 622;
    /*SPC*/

    const TMM_RTN_ORIG_MENU = 623;
    /*MENU*/

    const TMM_RTN_ORIG_HOST = 624;
    /*HOST*/

    const TMM_RTN_ORIG_TRUCK = 625;
    /*TRUCK*/

    const TMM_RTN_NO_ULLAGE = 626;
    /*INSUFFICIENT ULLAGE*/

    const TMM_RTN_EQUIP_FAIL = 627;
    /*EQUIPMENT FAILURE*/

    const TMM_RTN_CUST_NOT_AVAIL = 628;
    /*CUSTOMER NOT AVAIL*/

    const TMM_RTN_WRONG_PROD = 629;
    /*WRONG PRODUCT*/

    const TMM_RTN_ORDER_CANCEL = 630;
    /*ORDER CANCELLED*/

    const TMM_RTN_NO_ACCESS = 631;
    /*NO ACCESS*/

    const TMM_RTN_COD_NOT_AVAIL = 632;
    /*COD NOT AVAIL*/

    const TMM_RTN_NO_TIME = 633;
    /*WORK INCOMPLETE*/

    const TMM_LOAD_SPEC_DEL = 634;
    /*Load Spec deleted by Company % (Trip %, Drawer: %, Supplier %)*/

    const TMM_DATE_ERROR3 = 635;
    /*The order date is AFTER the expiry date*/

    const TMM_LD_REJECT = 636;
    /*% rejected -> %*/

    const TMM_RTN_STORED = 637;
    /*Returns data stored for %*/

    const TMM_HOST_CMPY_TYPE = 638;
    /*HOST*/

    const TMM_RTN_CFG_HOST_ONLY = 639;
    /*HOST ONLY*/

    const TMM_RTN_CFG_NO_ENTRY_MTHD = 640;
    /*NONE*/

    const TMM_KEY_ADD = 641;
    /*% added Access Card (Issuer: %, Card Number %)*/

    const TMM_KEY_MOD = 642;
    /*% modified Access Card (Issuer: %, Card Number %)*/

    const TMM_KEY_DEL = 643;
    /*% deleted Access Card (Issuer: %, Card Number %)*/

    const TMM_PSN_ADD = 644;
    /*% added Personnel (Personnel Code: %)*/

    const TMM_PSN_MOD = 645;
    /*% modified Personnel (Personnel Code: %)*/

    const TMM_PSN_DEL = 646;
    /*% deleted Personnel (Personnel Code: %)*/

    const TMM_PSN_KEY_LINK = 647;
    /*Access Card (Issuer: %, Card Number %) linked to Personnel (Personnel Code: %) by Company %*/

    const TMM_RTN_CFG_H_B_SPC = 648;
    /*HOST BAY OR DEVICE*/

    const TMM_LARGE_DENSITY_CHANGE = 649;
    /*Large density change at tank %*/

    const TMM_RETURNS_ENTRY = 650;
    /*% entered % l RETURNS for cmpt % of Trip % Supp %*/

    const TMM_OBS = 651;
    /*ON BOARD SYSTEM*/

    const TMM_ADDED_UNKNOWN_PROD = 652;
    /*%,% added unknown product %*/

    const TMM_INV_TYP = 653;
    /*INVALID_TYPE*/

    const TMM_PRESCHEDULE = 654;
    /*PRESCHEDULE*/

    const TMM_PREORDER = 655;
    /*PREORDER*/

    const TMM_ORDER = 656;
    /*ORDER*/

    const TMM_BRIDGER = 657;
    /*UNLOAD*/

    const TMM_REFUELLER = 658;
    /*REFUELLER*/

    const TMM_CUST_ORDER = 659;
    /*CUST_ORDER*/

    const TMM_PROD_ALLOC = 660;
    /*ALLOCATED PRODUCT*/

    const TMM_HOST_DETS = 661;
    /*HOST_DETAILS*/

    const TMM_NEW_LOADED_DETAILS = 662;
    /*Loaded Compartment:% of Trip:%,% Prod:% Qty:% % stored*/

    const TMM_LPG_TRF = 663;
    /*TRANSFER % %: Gross % Kg, vapour return % Kg, Nett % Kg.*/

    const TMM_AMSKAN = 664;
    /*Tagid:% Issuer:% Tkcd:% Tk:% Psncd:% Psn:% Gate:% Access:% Ccm_time:%*/

    const TMM_HOST_DELIVERY_INFO = 665;
    /*Sending Delivery Information message for Trip:% to %*/

    const TMM_UNASSIGNED = 666;
    /*Unassigned*/

    const TMM_SCHEDULABLE = 667;
    /*Schedulable*/

    const TMM_NON_SCHEDULABLE = 668;
    /*Non Schedulable*/

    const TMM_MAV_DLV_PLAN_SENT = 669;
    /*Sent Delivery Plan to Tanker %, Trip: %*/

    const TMM_MAV_LD_PRODS_SENT = 670;
    /*Sent Loaded Products to Tanker %, Trip: %*/

    const TMM_MAV_CARD_RX = 671;
    /*Received Driver Logon from Tanker %, Driver Code: %*/

    const TMM_MAV_DLV_INFO_RX = 672;
    /*Received Delivery Info from Tanker %, Trip: %*/

    const TMM_MAV_CONFIG_SENT = 673;
    /*Sent Configuration Data to Tanker %*/

    const TMM_TYPE_UNKNOWN = 674;
    /*Unknown Type*/

    const TMM_BLC_CARD = 675;
    /*B.L.C. Card*/

    const TMM_TRACK_TWO = 676;
    /*Track Two Card*/

    const TMM_PIN = 677;
    /*Personal Identification Number*/

    const TMM_TAG = 678;
    /*Identification Tag*/

    const TMM_TOUCH_MEMORY = 679;
    /*Micro Cans*/

    const TMM_RTN_TYPE_PRELOAD = 680;
    /*PRELOAD*/

    const TMM_RTN_TYPE_DEBRIEF = 681;
    /*DEBRIEF*/

    const TMM_INVALID_ENUM_CONST = 682;
    /*****/

    const TMM_OMC_LOG_EVENT_LOG_START = 683;
    /*Log Started*/

    const TMM_OMC_LOG_EVENT_LOG_DROPPED = 684;
    /*Log Entries Dropped*/

    const TMM_OMC_LOG_PROGRAM_ERROR = 685;
    /*Program Error:*/

    const TMM_OMC_LOG_TRAILER_CHANGE = 686;
    /*Current Trailer(s):*/

    const TMM_MAV_LOG = 687;
    /*Tanker %: % % %*/

    const TMM_DOUBLE_AUTH_CMPT = 688;
    /*Compt % (%,%) CANNOT be authorised for % since it still is for trans %*/

    const TMM_OMC_LOG_DRIVER_LOGIN = 689;
    /*Driver Login:*/

    const TMM_OMC_LOG_DRIVER_LOGOUT = 690;
    /*Driver Logout:*/

    const TMM_OMC_LOG_FLEETCOM_DEBRIEF = 691;
    /*Fleetcom Debriefed File:*/

    const TMM_MAV_TKR_IN_RANGE = 692;
    /*Tanker % in Range*/

    const TMM_MAV_TKR_OUT_RANGE = 693;
    /*Tanker % out of Range*/

    const TMM_OMC_LOG_COMMS_UP = 694;
    /*Comms Up*/

    const TMM_OMC_LOG_COMMS_DOWN = 695;
    /*Comms Down*/

    const TMM_OMC_LOG_POWER_UP = 696;
    /*Powered Up*/

    const TMM_OMC_LOG_FLEETCOM_FAIL = 697;
    /*Fleetcom Failed to Debrief*/

    const TMM_OUT_OF_ORDER = 698;
    /*OUT OF ORDER*/

    const TMM_WGH_NEXT_CARD = 699;
    /*Wipe next card*/

    const TMM_WGH_PSN_CARD = 700;
    /*  Please  wipe  personnel  card*/

    const TMM_WGH_EQP_CARD = 701;
    /*  Please  wipe  equipment  card*/

    const TMM_WGH_MORE_POES = 702;
    /*More trailers?*/

    const TMM_IDENTIFY_LOAD = 703;
    /*   Loading(Y)   or Unloading(N)?*/

    const TMM_ENTER_TRIP_NO = 704;
    /*  Please enter  trip: */

    const TMM_WGH_PSN_MESSAGE = 705;
    /*personal msg*/

    const TMM_CONFIRM_POES = 706;
    /*% on bridge?*/

    const TMM_WAIT_FOR_WEIGHT = 707;
    /*Polling bridge*/

    const TMM_WGH_REMOVE_POE = 708;
    /*Removed %?*/

    const TMM_LAST_PROD_FROM_HERE = 709;
    /*Last  product   loaded  here?*/

    const TMM_SWITCH_LOADING = 710;
    /*Followed switch loading proc.?*/

    const TMM_ASK_FOR_WEIGHT = 711;
    /*Maximum Gross   kg: */

    const TMM_WGH_ASK_FOR_PROD = 712;
    /*% in %?*/

    const TMM_WGH_PROMPT_PC = 713;
    /*Enter rotogauge output:*/

    const TMM_WAITING_FOR_KEY = 714;
    /*Awaiting Key*/

    const TMM_PRE_LOAD_WGH = 715;
    /*Pre-load weighing*/

    const TMM_POST_LOAD_WGH = 716;
    /*Post-load weighing*/

    const TMM_WGH_START_LOAD = 717;
    /*  Proceed  to   loading  device*/

    const TMM_WGH_COMPLETE_LOAD = 718;
    /*Please move off weighbridge*/

    const TMM_MAV_NOT_BALANCE = 719;
    /*Load does not balance. Tanker %, Trip: %. Delivery info NOT sent to host.*/

    const TMM_MAV_NO_LOADED_CMPTS = 720;
    /*No loaded compartment records. Tanker %, Trip: %. Delivery info NOT sent to host.*/

    const TMM_MAV_DLV_PLAN_DELETE_SENT = 721;
    /*Sent Delivery Plan Delete to Tanker %, Trip: %*/

    const TMM_OMC_LOG_SPVSR_LOGIN = 722;
    /*Supervisor Login*/

    const TMM_OMC_LOG_MAINT_LOGIN = 723;
    /*Maintenance Login*/

    const TMM_RTN_DROPPED_AT_OTHER_SITE = 724;
    /*DROPPED ELSEWHERE*/

    const TMM_UPS_MAINS_POWER_FAILURE = 725;
    /*MAINS POWER FAILURE DETECTED - UPS POWER ACTIVATED*/

    const TMM_UPS_MAINS_POWER_OK = 726;
    /*MAINS POWER OK DETECTED - UPS POWER DE-ACTIVATED*/

    const TMM_WGH_FIRST_CARD = 727;
    /*Please wipe card*/

    const TMM_UPS_MAINS_FAILURE_BATT_LOW = 728;
    /*MAINS POWER FAILURE DETECTED - UPS POWER CRITICAL!! BATTERIES ARE LOW*/

    const TMM_UPS_MAINS_OK_BATT_LOW = 729;
    /*MAINS POWER OK DETECTED - UPS POWER CRITCIAL!! BATTERIES ARE LOW*/

    const TMM_UPS_SYSTEM_SHUTDOWN_NOW = 730;
    /*SHUTTING DOWN SYSTEM -- NOW! --*/

    const TMM_TAG_ASSIGNMENT = 731;
    /*% assigned Tag % to Issuer: % IDENTITY NO.: %*/

    const TMM_MAV_TRIP_REP_READY = 732;
    /*MAVIS -> HOST trip structure ready: Supplier % Load_id % Trip_id % Trailer_code %*/

    const TMM_UPS_SYSTEM_SHUTDOWN_WARN = 733;
    /*SHUTTING SYSTEM DOWN IN 1 MINUTE -- MAINS POWER HAS NOT RETURNED*/

    const TMM_DKT_DELETE = 734;
    /*% Deleted Docket % from Trip % (Supp: %)*/

    const TMM_DKT_ADD = 735;
    /*% Added Docket % to Trip % (Supp: %)*/

    const TMM_SHL_ADD_PROD = 736;
    /*% Added Product % (Drwr: %) to Loadspec % (Supp: %), Quantiy: %*/

    const TMM_SHL_DEL_PROD = 737;
    /*% Deleted Product % (Drwr: %) from Loadspec % (Supp: %), Quantiy: %*/

    const TMM_SHL_ADD = 738;
    /*% Added Loadspec % (Supp: %)*/

    const TMM_SHL_TKR_CHG = 739;
    /*% Changed Tanker % from Load % (Supp: %) to Load % (Supp: %)*/

    const TMM_PSN_ADDED = 740;
    /*% Added Personnel Code %, Role %*/

    const TMM_PSN_DELETE = 741;
    /*% Deleted Personnel Code %, Role %*/

    const TMM_BLC_BOTTOM = 742;
    /*BLC_BOTTOM*/

    const TMM_BLC_TOP = 743;
    /*BLC_TOP*/

    const TMM_BLC_100 = 744;
    /*BLC_100*/

    const TMM_BLC_LPG = 745;
    /*BLC_LPG*/

    const TMM_ACCULOAD = 746;
    /*ACCULOAD*/

    const TMM_DEPOT_SD = 747;
    /*DEPOT_SD*/

    const TMM_WGH_TOLEDO = 748;
    /*TOLEDO*/

    const TMM_WGH_ULTRA = 749;
    /*ULTRA*/

    const TMM_WGH_MERCURY = 750;
    /*MERCURY*/

    const TMM_NO_EQUIVALENT_GATE = 751;
    /*Gate % is not present in the OMEGA database*/

    const TMM_EQUIP_ADD = 752;
    /*% Added Equipment %, of Type %*/

    const TMM_EQUIP_DEL = 753;
    /*% Deleted Equipment %, of Type %*/

    const TMM_SP_PROD_ADD = 754;
    /*% Added DRAWER PRODUCT Code %, Company %*/

    const TMM_SP_PROD_DEL = 755;
    /*% Deleted DRAWER PRODUCT Code %, Company %*/

    const TMM_AUTOMATIC = 756;
    /*AUTOMATIC*/

    const TMM_MANUAL = 757;
    /*MANUAL*/

    const TMM_SYNC_AMSKAN = 758;
    /*Synchronizing log with Amskan*/

    const TMM_AMSKANT = 759;
    /*Tagid:% Issuer:% Tankercode:% Tanker:% Gate:% Access:% Ccm_time:%*/

    const TMM_AMSKANP = 760;
    /*Tagid:% Issuer:% Personcode:% Name:% Gate:% Access:% Ccm_time:%*/

    const TMM_GS1650 = 761;
    /*GS1650*/

    const TMM_MT_8530 = 762;
    /*MT_8530*/

    const TMM_AD_4323 = 763;
    /*AD_4323*/

    const TMM_HOST_DOC = 764;
    /*Host prints documents*/

    const TMM_HOST_UP = 765;
    /*Host communication is up*/

    const TMM_LOG_LD_DEL = 766;
    /*Load deletion is logged*/

    const TMM_AUTO_LD = 767;
    /*Auto-complete prescheduled loads*/

    const TMM_ADD_PROMPT = 768;
    /*Bay may prompt for additives if there is a choice*/

    const TMM_TKR_CFG = 769;
    /*Tankers can be configured automatically*/

    const TMM_TKR_ACT = 770;
    /*Tankers can be activated automatically*/

    const TMM_WGH_COMPLE = 771;
    /*Loads started on weighbridge MUST end there*/

    const TMM_WGH_AUTO_FL = 772;
    /*Auto-fill non-prescheduled weighbridge loads*/

    const TMM_PMV_RECEIPTS = 773;
    /*Site handles Product Movement Receipts*/

    const TMM_ETHYL_ALC = 774;
    /*Site handles ETHYL ALCOHOL*/

    const TMM_CAN_UNLOAD = 775;
    /*Site handles Un-loads on weighbridge(s)*/

    const TMM_INFORMATIONAL = 776;
    /*INFORMATIONAL*/

    const TMM_OFFICIAL = 777;
    /*OFFICIAL*/

    const TMM_NOT_APPLICABLE = 778;
    /*NOT APPLICABLE*/

    const TMM_ANNUALLY = 779;
    /*ANNUALLY*/

    const TMM_PROVIDE_DATA = 780;
    /*Please provide all data*/

    const TMM_LDC_Q_FACTORS_HDR = 781;
    /*Received Q-factors from bay %*/

    const TMM_LDC_Q_FACTORS = 782;
    /*Arm% Q1 % Q2 %, Arm% Q1 % Q2 %, Arm% Q1 % Q2 %, Arm% Q1 % Q2 %*/

    const TMM_LDC_K_FACTORS_HDR = 783;
    /*Received K-factors from bay %*/

    const TMM_LDC_K_FACTORS = 784;
    /*Arm% K-factor %  Arm% K-factor %  Arm% K-factor %  Arm% K-factor %*/

    const TMM_LDC_M_CURVE_HDR = 785;
    /*Received Meter Curve from bay %, arm %*/

    const TMM_LDC_M_CURVE_1 = 786;
    /*3000:% 2000:% 1500:% 750:% 500:%  300:%  150:%*/

    const TMM_LDC_M_CURVE_2 = 787;
    /* 500:%  462:%  429:%  400:%  375:%  353:%  333:%  316:%  300:%  286:%*/

    const TMM_LDC_M_CURVE_3 = 788;
    /* 273:%  261:%  250:%  240:%  231:%  222:%  214:%  207:%  200:%  194:%*/

    const TMM_LDC_M_CURVE_4 = 789;
    /* 188:%  182:%  176:%  171:%  167:%  162:%  158:%  154:%  150:%*/

    const TMM_CONFIRM_BAYLOCK = 790;
    /*This will lock out all bays. Continue... */

    const TMM_MAV_SWAP_LOAD = 791;
    /*Swapping load %, date %, shift %, from tanker % to tanker %*/

    const TMM_MAV_DB_FULL = 792;
    /*Database on tanker % is full*/

    const TMM_MAV_DEBRIEFED_TWELVE = 793;
    /*Debriefed load %, from tanker % is more than 24 hours old*/

    const TMM_MAV_MAINT_CARD = 794;
    /*Maintenance card details received from truck %*/

    const TMM_MAV_CARD_OK = 795;
    /*Card details from Truck % Driver % accepted*/

    const TMM_MAV_CARD_NOT_OK = 796;
    /*Card details from Truck % Card % NOT accepted*/

    const TMM_ALLOC_PERIOD = 797;
    /*PERIOD*/

    const TMM_WGHD_REPLY = 798;
    /*Invalid reply format from the weighbridge*/

    const TMM_PREORDER_VET = 799;
    /*(Pre-)Order Loads may change carrier*/

    const TMM_MAV_DLV_PLAN_NOT_SENT = 800;
    /*Tanker % in Maintenance, Delivery Plan % NOT sent*/

    const TMM_MONDAY = 801;
    /*Monday*/

    const TMM_TUESDAY = 802;
    /*Tuesday*/

    const TMM_WEDNESDAY = 803;
    /*Wednesday*/

    const TMM_THURSDAY = 804;
    /*Thursday*/

    const TMM_FRIDAY = 805;
    /*Friday*/

    const TMM_SATURDAY = 806;
    /*Saturday*/

    const TMM_SUNDAY = 807;
    /*Sunday*/

    const TMM_FUNDAY = 808;
    /*Funday*/

    const TMM_WB_PRELD_CONFLICT = 809;
    /*WB: % tared preloaded kg:%, % entered %percent,(Ltr:%,Kg:%), for % Trip:%,%*/

    const TMM_UNLOAD = 810;
    /*UNLOAD*/

    const TMM_MAV_FLEETCOM_READY = 811;
    /*MAVIS -> HOST fleetsum transfer file % , block % ready*/

    const TMM_MAV_LD_CMPT_CHANGED = 812;
    /*Loaded Comp:% in Trip % changed from % to % litres, from Prod % to %*/

    const TMM_MAV_LD_CMPT_ADDED = 813;
    /*Loaded Comp:% in Trip:% Prod:% Qty:% added*/

    const TMM_MAV_LOG_RECEIVED = 814;
    /*Log message received from Tanker % file %*/

    const TMM_MAV_FLEETCOM_RECEIVED = 815;
    /*Fleetcom message received from Tanker % file %*/

    const TMM_MAV_TRAILER_INVALID = 816;
    /*Trailer tag % on tanker % not known*/

    const TMM_MAV_CARD_LOGOFF = 817;
    /*Logoff message received from Truck %. Logging out Driver %*/

    const TMM_RSS_DLV_PLAN_DELETE_SENT = 818;
    /*Sent DELETE delivery plan to RSS: %, trip number %*/

    const TMM_RSS_NOT_SENT = 819;
    /*Can not send % for RSS: % , trip: %*/

    const TMM_RSS_TANKER_DETAILS_SENT = 820;
    /*Sent TANKER details to RSS: %*/

    const TMM_RSS_PERSON_DETAILS_SENT = 821;
    /*Sent PERSON details to RSS: %*/

    const TMM_RSS_CONFIG_DETAILS_SENT = 822;
    /*Sent CONFIG details to RSS: %*/

    const TMM_RSS_LD_DLV_PLAN_SENT = 823;
    /*Sent LOADED delivery plan to RSS: %, trip number %*/

    const TMM_RSS_DLV_PLAN_SENT = 824;
    /*Sent DELIVERY plan to RSS: %, trip number %*/

    const TMM_RSS_LD_PROD_SENT = 825;
    /*Sent LOADED products to RSS: %, trip number %*/

    const TMM_RSS_DEL_INFO_RECEIVED = 826;
    /*Received DELIVERY info from RSS, filename: %*/

    const TMM_RSS_LOG_MSG_RECEIVED = 827;
    /*Received LOG message from RSS, filename: %*/

    const TMM_RSS_NOT_RECEIVED = 828;
    /*Can not receive %  from RSS, filename: %*/

    const TMM_LOG_RSS = 829;
    /*RSS */

    const TMM_KRD_ACCEPT = 830;
    /*ACCEPTED*/

    const TMM_KRD_REJECT = 831;
    /*REJECTED*/

    const TMM_KRD_KEY_INVALID = 832;
    /*CARD INVALID*/

    const TMM_KEY_EXPIRED = 833;
    /*CARD EXPIRED*/

    const TMM_KEY_CPY_INVALID = 834;
    /*ISSUER INVALID*/

    const TMM_LD_NO_FILE = 835;
    /*  LOAD NUMBER   INVALID*/

    const TMM_LD_INCOMPLETE = 836;
    /*     LOAD       INCOMPLETE*/

    const TMM_WRONG_VEHICLE = 837;
    /*WRONG VEHICLE*/

    const TMM_CANT_LOAD = 838;
    /*LOAD REJECTED*/

    const TMM_NO_LOAD_SPEC = 839;
    /*NO LOAD SET UP*/

    const TMM_BAD_PARAMS = 840;
    /*BAD PARMAMETERS*/

    const TMM_KRD_NO_PRODUCTS = 841;
    /*    NO MORE     PRODUCTS*/

    const TMM_NO_ALLOCATION = 842;
    /*NO ALLOCATION*/

    const TMM_NO_TRANS_SPACE = 843;
    /*NO SPACE LEFT*/

    const TMM_NO_ADDITIVES = 844;
    /*NO ADDITIVES*/

    const TMM_AUTH_ERROR = 845;
    /*AUTHORISATION   ERROR*/

    const TMM_INVALID_OPERATOR = 846;
    /*  PERSON NOT    AUTHORISED*/

    const TMM_LD_COMPLETE = 847;
    /*    LOAD IS     COMPLETE*/

    const TMM_PREV_LD_INCOMPLETE = 848;
    /*PREVIOUS LOAD   IS INCOMPLETE*/

    const TMM_KRD_PROMPT = 849;
    /*ANSWER PROMPT*/

    const TMM_MSG_ACCEPT = 850;
    /*MESSAGE ACCEPTED*/

    const TMM_NO_ACTION = 851;
    /*SEALNUMBER MISSING*/

    const TMM_WRONG_COMPARTMENT = 852;
    /*     WRONG      COMPARTMENT*/

    const TMM_WRONG_CMPT_PROD = 853;
    /*WRONG PRODUCT   FOR COMPARTMENT*/

    const TMM_LOAD_ACTIVE = 854;
    /*     LOAD IS    AREADY ACTIVE*/

    const TMM_ILLEGAL_COMPONENT = 855;
    /*     ILLEGAL    COMPONENT*/

    const TMM_CONFIG_ERROR = 856;
    /*CONFIGURATION   ERROR*/

    const TMM_WEIGHT_TOO_LITTLE = 857;
    /*WEIGHT TOO SMALL FOR EQUIPMENT*/

    const TMM_TOO_MANY_TRAILERS = 858;
    /*    TOO MANY    TRAILERS*/

    const TMM_NO_TRAILER_DETAILS = 859;
    /*HAVE NO TRAILER SPECIFICATION*/

    const TMM_WRONG_KEY_SEQUENCE = 860;
    /*    WRONG KEY   SEQUENCE*/

    const TMM_DUPLICATE_EQUIPMENT = 861;
    /*EQUIPMENT USED  MORE THAN ONCE*/

    const TMM_ALREADY_LOADING = 862;
    /*    EQUIPMENT   ALREADY LOADING*/

    const TMM_WEIGHBRIDGE = 863;
    /*WEIGHBRIDGE*/

    const TMM_IGNORE_ORD_CARRIER = 864;
    /*Ignore Carrier for (Pre-)Order Loads*/

    const TMM_WEIGH_LD_COMPLETE = 865;
    /*Weighbridge Load % (trip %) completed*/

    const TMM_AUTO_LD_COMPLETE = 866;
    /*Auto-completion of Load % (trip:% suppl:%) Terminal %*/

    const TMM_WEIGH_UNLD_COMPLETE = 867;
    /*Weighbridge IMPORT Load % (trip %) completed*/

    const TMM_ORDER_DEL = 868;
    /*Order deleted by Company % (Order %, Drawer: %, Supplier %)*/

    const TMM_ORDER_EXPIRY_CAUSED = 869;
    /*Company % forced expiry of Order (Order %, Drawer: %, Supplier %)*/

    const TMM_NOT_LOAD = 870;
    /*NOT LOADED*/

    const TMM_IN_TRANSIT = 871;
    /*IN TRANSIT*/

    const TMM_NO_TRANSFERS = 872;
    /*NO TRANSFERS*/

    const TMM_AS_LOADED = 873;
    /*DELIVERED OK*/

    const TMM_W_RETURN = 874;
    /*WITH RETURNS*/

    const TMM_WIPE_ORDER_DETAILS = 875;
    /*HOST Update of Customer Order deletes old details*/

    const TMM_LOG_WBTRS = 876;
    /*Weighbridge trans %, Bay%, Trip%, Load%, Dvr%, Tkr%, Start%, End%, Site%*/

    const TMM_LPG_ADJUST = 877;
    /*Trip % Supplier % Trailer % reduced qty to % kg according to AS 1596-1989*/

    const TMM_NULL_NODE = 878;
    /*Unconnected*/

    const TMM_TANK_NODE = 879;
    /*Product Storage Tank*/

    const TMM_METER_NODE = 880;
    /*Meter*/

    const TMM_PUMP_NODE = 881;
    /*Pump*/

    const TMM_FVALVE_NODE = 882;
    /*Valve (F)*/

    const TMM_DVALVE_NODE = 883;
    /*Valve (D)*/

    const TMM_HOSE_NODE = 884;
    /*Arm Hose*/

    const TMM_INJ_NODE = 885;
    /*Additive Injector*/

    const TMM_ARM_NODE = 886;
    /*Arm*/

    const TMM_INVALID_NODE = 887;
    /*Invalid*/

    const TMM_GET_LAST_DOCKET = 888;
    /*  COLLECT LAST    DOCKET FIRST*/

    const TMM_BAT_ACCULOAD_RBM = 889;
    /*ACCULOAD RBM*/

    const TMM_BAT_ACCULOAD_RBU = 890;
    /*ACCULOAD RBU*/

    const TMM_BAT_ACCULOAD_SEP_SMX = 891;
    /*ACCULOAD ???*/

    const TMM_BAT_ACCU_SEQ_ACS = 892;
    /*ACCULOAD SEQ ACS*/

    const TMM_BAT_ACCULOAD_STM = 893;
    /*ACCULOAD STM*/

    const TMM_BAT_ACCU_STD_ACS = 894;
    /*ACCULOAD STD ACS*/

    const TMM_BAT_ACCULOAD_WBG = 895;
    /*ACCULOAD WBG*/

    const TMM_BAT_ACCULOAD_AUT = 896;
    /*ACCULOAD AUT*/

    const TMM_BAT_BLC_TOP = 897;
    /*BLC 80 TOP LOADING*/

    const TMM_BAT_BLC_BOT = 898;
    /*BLC 80 BOTTOM LOADING*/

    const TMM_BAT_BLC_100 = 899;
    /*BLC 100*/

    const TMM_BAT_DEV_TYPE_INVALID = 900;
    /*******/

    const TMM_BAI_METER_TY_INVALID = 901;
    /*******/

    const TMM_BAI_TURBINE_METER = 902;
    /*TURBINE*/

    const TMM_BAI_PD_METER = 903;
    /*P-D*/

    const TMM_BAI_MASS_METER = 904;
    /*MASS*/

    const TMM_KEY_PIN = 905;
    /*P.I.N. KEY*/

    const TMM_ACCU_STD2 = 906;
    /*ACCU STD2*/

    const TMM_ACCU_SEQ2 = 907;
    /*ACCU SEQ2*/

    const TMM_PRODUCT = 908;
    /*PRODUCT*/

    const TMM_CATEGORY = 909;
    /*CATEGORY*/

    const TMM_OTHER = 910;
    /*OTHER*/

    const TMM_TKR_CARD_ACT = 911;
    /*Tanker cards assigned automatically*/

    const TMM_ALARMS_OK = 912;
    /*OK - NORMAL*/

    const TMM_HH_LEVEL_ALARM = 913;
    /*HIGH HIGH*/

    const TMM_H_LEVEL_ALARM = 914;
    /*HIGH*/

    const TMM_LL_LEVEL_ALARM = 915;
    /*LOW LOW*/

    const TMM_L_LEVEL_ALARM = 916;
    /*LOW*/

    const TMM_OP_CHG_LOW_ALARM = 917;
    /*OPERATOR CHANGE LOW*/

    const TMM_OP_CHG_HIGH_ALARM = 918;
    /*OPERATOR CHANGE HIGH*/

    const TMM_OP_SET_LOW_ALARM = 919;
    /*OPERATOR SETPOINT LOW*/

    const TMM_OP_SET_HIGH_ALARM = 920;
    /*OPERATOR SETPOINT HIGH*/

    const TMM_RETURN_TO_REST = 921;
    /*RETURN TO REST*/

    const TMM_FULL_TRANSIT = 922;
    /*FULL TRANSIT*/

    const TMM_PART_TRANSIT = 923;
    /*PARTIAL TRANSIT*/

    const TMM_AT_REST = 924;
    /*REST*/

    const TMM_SUPPLIER_CATEGORY = 925;
    /*SUPPLIER_CATEGORY*/

    const TMM_FIXED = 926;
    /*FIXED*/

    const TMM_VARIABLE = 927;
    /*VARIABLE*/

    const TMM_CUST_ALREADY_SET = 928;
    /*Category cannot be set when customer defined*/

    const TMM_CAT_ALREADY_SET = 929;
    /*Setting a customer made category superfluous */

    const TMM_MAV_REP_PROBLEM = 930;
    /*Report process accuracy problem: %*/

    const TMM_RETURNS_ENTRY_LOC = 931;
    /*Returns entry location for this carrier*/

    const TMM_UNDEFINED = 932;
    /*Undefined*/

    const TMM_JET_BASE_DESC = 933;
    /*Jet Fuels/Kerosines*/

    const TMM_GASOLINE_DESC = 934;
    /*Gasolines*/

    const TMM_LUBE_OIL_DESC = 935;
    /*Lubricating oils*/

    const TMM_FUEL_OIL_DESC = 936;
    /*Diesel oils/Fuel oils/Heating oils*/

    const TMM_CRUDE_OIL_DESC = 937;
    /*Crude oil*/

    const TMM_ADDITIVE_DESC = 938;
    /*Additive*/

    const TMM_ETHANOL_DESC = 939;
    /*Ethanol/Water*/

    const TMM_LPG_DESC = 940;
    /*L.P.G.*/

    const TMM_SPECIFIC_P_DESC = 941;
    /*Individual/Special Petroleum Distillate*/

    const TMM_CPT_CONTRACT = 942;
    /*CONTRACT*/

    const TMM_CPT_LOAD = 943;
    /*LOAD*/

    const TMM_CPT_ORDER = 944;
    /*ORDER*/

    const TMM_CPT_DELIVERY = 945;
    /*DELIVERY*/

    const TMM_WGH_TRAIL_ASS = 946;
    /*Auto trailer assignment at Weigh bridge*/

    const TMM_TKR_CFG_LOAD_SPEC = 947;
    /*Auto tanker configuration for load specs sent from host*/

    const TMM_TRIGGER_CANNOT_CHANGE = 948;
    /*Cannot change the offset % for trigger %*/

    const TMM_MODB_LOG = 949;
    /*Modbus: %*/

    const TMM_PAK_LOG = 950;
    /*Pakscan: %*/

    const TMM_GRAND_TOTAL = 951;
    /*TOTAL AMOUNT OWED*/

    const TMM_SUB_TOTAL = 952;
    /*SUB TOTAL*/

    const TMM_FREIGHT_CHARGE = 953;
    /*DELIVERY CHARGES*/

    const TMM_IQ_COILTYPE = 954;
    /*IQ*/

    const TMM_INT_COILTYPE = 955;
    /*INTEGRAL*/

    const TMM_GP_COILTYPE = 956;
    /*GPFCU (GP)*/

    const TMM_ACT_COILTYPE = 957;
    /*GPFCU (ACT)*/

    const TMM_OM_TRANSFER = 958;
    /*TRANSFER*/

    const TMM_OM_PREPAID = 959;
    /*PREPAID*/

    const TMM_CONTRACT_CANNOT_UPDATE = 960;
    /*There is no price offsets for type %, please press F8 to save the price */

    const TMM_ORDER_CANNOT_UPDATE = 961;
    /*Price offsets cannot be updated for type %*/

    const TMM_RETRIEVING_DATA = 962;
    /*Retrieving Data*/

    const TMM_ORD_LIMIT_EXCEEDED = 963;
    /*Total (%) exceeds Order Limit (%)*/

    const TMM_CST_BALANCE_EXCEEDED = 964;
    /*Total (%) exceeds Customer Balance (%)*/

    const TMM_CST_LIMIT_EXCEEDED = 965;
    /*Total (%) exceeds Customer Limit (%)*/

    const TMM_CST_OVERDUE = 966;
    /*Customer has overdue amount of %*/

    const TMM_LOAD_INVOICE = 967;
    /*LOAD INVOICE*/

    const TMM_ORDER_INVOICE = 968;
    /*ORDER INVOICE*/

    const TMM_WGH_ACCEPTED_REQ = 969;
    /*ACCEPTED        Press YES*/

    const TMM_LOAD_NO = 970;
    /*TRIP NUMBER :*/

    const TMM_LOAD_DATE = 971;
    /*LOAD DATE :*/

    const TMM_LOAD_TIME = 972;
    /*LOAD TIME :*/

    const TMM_BAD_ARM_AT_BAY = 973;
    /*Invalid Compartment Number % entered at BAY %*/

    const TMM_LOAD_CODE = 974;
    /*LOAD NUMBER :*/

    const TMM_ADJUSTED = 975;
    /*Replacing Invoice :*/

    const TMM_BAT_ACCU_SEQ_ACT = 976;
    /*ACCULOAD SEQ ACT*/

    const TMM_BAT_ACCU_SEQ_ACN = 977;
    /*ACCULOAD SEQ ACN*/

    const TMM_BAT_ACCU_STD_ACT = 978;
    /*ACCULOAD STD ACT*/

    const TMM_BAT_ACCU_STD_ACN = 979;
    /*ACCULOAD STD ACN*/

    const TMM_BAT_CNTRC803_4 = 980;
    /*CONTREC 803 4*/

    const TMM_BAT_IDIS_UPC_IDS = 981;
    /*IDIS UPC IDS*/

    const TMM_MSL_INVALID = 982;
    /*INVALID*/

    const TMM_MSL_TANKLEVEL = 983;
    /*TANKLEVEL*/

    const TMM_MSL_GATEACCESS = 984;
    /*GATEACCESS*/

    const TMM_MSL_BAYACCESS = 985;
    /*BAYACCESS*/

    const TMM_MSL_ARMCMPT = 986;
    /*ARMCMPT*/

    const TMM_MSL_ARMVOLUME = 987;
    /*ARMVOLUME*/

    const TMM_MSL_AMBMETERTOT = 988;
    /*OBSMETERTOT*/

    const TMM_MSL_CORMETERTOT = 989;
    /*STDMETERTOT*/

    const TMM_MSL_VALVESTATUS = 990;
    /*VALVESTATUS*/

    const TMM_MSL_VALVEOPEN = 991;
    /*VALVEOPEN*/

    const TMM_MSL_VALVECLOSE = 992;
    /*VALVECLOSE*/

    const TMM_MSL_TANKSTATUS = 993;
    /*TANKSTATUS*/

    const TMM_MSL_TANKAVAILABLE = 994;
    /*TANKAVAILABLE*/

    const TMM_MSL_TANKHI = 995;
    /*TANKHI*/

    const TMM_MSL_TANKHIHI = 996;
    /*TANKHIHI*/

    const TMM_MSL_TANKLO = 997;
    /*TANKLO*/

    const TMM_MSL_TANKLOLO = 998;
    /*TANKLOLO*/

    const TMM_RECONCILED = 999;
    /*RECONCILED*/

    const TMM_LOADED = 1000;
    /*LOADED*/

    const TMM_ORDER_APPROVAL = 1001;
    /*ORDER APPROVAL*/

    const TMM_LIMIT_IS = 1002;
    /*Limit is %*/

    const TMM_MSL_BAY_PERSON = 1003;
    /*BAY_PERSON*/

    const TMM_MSL_BAY_EQUIPMENT = 1004;
    /*BAY_EQUIPMENT*/

    const TMM_MSL_BAY_LOAD_NO = 1005;
    /*BAY_LOAD_NO*/

    const TMM_BAY_LOOP_CHECK = 1006;
    /*Equipment must be in area of load authorisation*/

    const TMM_PAY_TERMS = 1007;
    /*WITHIN % DAYS */

    const TMM_PROD_TOT = 1008;
    /*PRODUCT TOTAL*/

    const TMM_INVOICED_LOSS = 1009;
    /*LOSS: % % Product:% Invoice:% Order:% Trip:% Supplier:%*/

    const TMM_INVOICED_ORDER = 1010;
    /*% Invoice:% Order:% Amount:% Supplier:% Customer%*/

    const TMM_INVOICED_LOAD = 1011;
    /*% Invoice:% Order:% Amount:% Trip:% Supplier:% Customer:%*/

    const TMM_TRANSFER_NOTE = 1012;
    /*TRANSFER NOTE*/

    const TMM_BORROW_AND_LOAN_DOC = 1013;
    /*BORROW AND LOAN NOTE*/

    const TMM_REDIRECTED = 1014;
    /*REDIRECTED*/

    const TMM_VALUE_ADDED_TAX = 1015;
    /*VALUE ADDED TAX*/

    const TMM_ORDER_COMPLETION = 1016;
    /*AT ORDER COMPLETION/EXPIRY*/

    const TMM_DELIVERY_NOTE = 1017;
    /*DELIVERY NOTE*/

    const TMM_ISSUE_DELIVERY_NOTE = 1018;
    /*% Delivery Note:% Order:% Amount:% Trip:% Supplier:% Customer:%*/

    const TMM_EXEMPTION = 1019;
    /*EXEMPTION#:%*/

    const TMM_PROCESSING = 1020;
    /*Processing. */

    const TMM_INVOICED_ALREADY = 1021;
    /*Order has been invoiced ...*/

    const TMM_AUTO_RECONCILE = 1022;
    /*Reconcile previous load when starting new load*/

    const TMM_ASSUME_EQUIP_ON_WB = 1023;
    /*Do NOT prompt: Equipment on weighbridge?*/

    const TMM_MANUAL_ORDER = 1024;
    /*Operator:% LoadedPacks:% LoadedUnits:% DeliveredPacks:% DeliveredUnits:% Packs ize:% Unit:% Product:% Order:%*/

    const TMM_TRF_DELIVERED_EXCEEDED = 1025;
    /*Delivery Quantity (%) exceeds Loaded Quantity (%)*/

    const TMM_LOAD_RECONCILED = 1026;
    /*The loads already reconciled, sorry!!!*/

    const TMM_ORDER_EXISTS = 1027;
    /*Order (%) for this drawer already exists. Escape please!*/

    const TMM_APPROVED_ALREADY = 1028;
    /*Order has been approved ...*/

    const TMM_LDV = 1029;
    /*LOAD VERIFICATION*/

    const TMM_PRINT_INVOICE = 1030;
    /*Printing invoice...*/

    const TMM_RETURNS = 1031;
    /*RETURN*/

    const TMM_OWN_USE = 1032;
    /*LOCAL*/

    const TMM_BOUGHT = 1033;
    /*IMPORT*/

    const TMM_DOWN_GRADE = 1034;
    /*DOWNGRADE*/

    const TMM_LOSS = 1035;
    /*        */

    const TMM_REFINERY = 1036;
    /*REFINERY*/

    const TMM_IN_PROGRESS = 1037;
    /*In progress*/

    const TMM_HALTED = 1038;
    /*Halted*/

    const TMM_DOES_NOT_EXIST = 1039;
    /*Does not exist*/

    const TMM_PMV_STORED = 1040;
    /*PMV %: Product %. Qty: % %. Source: % % %. Dest: % % %.*/

    const TMM_CAN_CHANGE_DRAWER = 1041;
    /*Can change drawer of NEW schedules*/

    const TMM_EXP_RETURN = 1042;
    /*RETURN*/

    const TMM_EXP_RECONCILIATION = 1043;
    /*RECONCILIATION*/

    const TMM_EXP_STOCK_GAIN = 1044;
    /*STOCK_GAIN*/

    const TMM_EXP_STOCK_LOSS = 1045;
    /*STOCK_LOSS*/

    const TMM_EXP_TRANSFER = 1046;
    /*TRANSFER*/

    const TMM_ADR_LINE_DESC1 = 1047;
    /*1st Address Line*/

    const TMM_ADR_LINE_DESC2 = 1048;
    /*2nd Address Line*/

    const TMM_ADR_LINE_DESC3 = 1049;
    /*Province*/

    const TMM_ADR_LINE_DESC4 = 1050;
    /*Postal Code*/

    const TMM_ADR_LINE_DESC5 = 1051;
    /*Country*/

    const TMM_RECONCILE_LAST_LOAD = 1052;
    /*RECONCILE LAST LOAD FIRST*/

    const TMM_SHL_UNASSIGNED = 1053;
    /*UNASSIGNED*/

    const TMM_FREE_COMPARTMENTS = 1054;
    /*% FREE COMPT*/

    const TMM_BY_PRODUCT = 1055;
    /*BY PRODUCT*/

    const TMM_STARTED = 1056;
    /*ACTIVE*/

    const TMM_OK_DELIVERED = 1057;
    /*DELIVERED OK*/

    const TMM_DIFF_DELIVERED = 1058;
    /*CHANGED DELIVERY*/

    const TMM_WITH_RETURNS = 1059;
    /*HAS RETURNS*/

    const TMM_AUTHORISED = 1060;
    /*AUTHORISED*/

    const TMM_CONFIRM_RECONCILE = 1061;
    /*Load Reconcile*/

    const TMM_RTN_IN_STORAGE = 1062;
    /*Receive Return Into Storage*/

    const TMM_FULLY_SPECIFIED = 1063;
    /*FULLY SPECED*/

    const TMM_NOW = 1064;
    /*NOW*/

    const TMM_OSD_DEPOT = 1065;
    /*Depot*/

    const TMM_OSD_SERVICE_STATION = 1066;
    /*Service station*/

    const TMM_OSD_OWN_USE = 1067;
    /*Own use*/

    const TMM_OSD_BONDED = 1068;
    /*Bonded*/

    const TMM_OSD_UNBONDED = 1069;
    /*Unbonded*/

    const TMM_OSD_DEPOSIT_OIL = 1070;
    /*Deposit oil*/

    const TMM_ONCE = 1071;
    /*ONCE*/

    const TMM_DELIVERY_NOTE_DOC = 1072;
    /*DELIVERYNOTE*/

    const TMM_DELIVERY_CONFIRM_DOC = 1073;
    /*DELVCONF*/

    const TMM_TRANSFER_DOC = 1074;
    /*TRANSFER*/

    const TMM_DELTA = 1075;
    /*DELTA */

    const TMM_LOAD_STATUS = 1076;
    /*LOAD STATUS*/

    const TMM_ORDER_STATUS = 1077;
    /*ORDER STATUS*/

    const TMM_CLOSEOUT_MSG = 1078;
    /*CLOSEOUT MSG*/

    const TMM_PROD_RECEIPT = 1079;
    /*PROD RECEIPT*/

    const TMM_GAIN_LOSS = 1080;
    /*GAIN/LOSS*/

    const TMM_ENFORCE_SEAL_NO = 1081;
    /*New loads must have seal number set*/

    const TMM_GIVE_REASON = 1082;
    /*Please select a reason*/

    const TMM_SPEC_SENDING = 1083;
    /*% establishing trip % supplier % for site %*/

    const TMM_TRS_MTRTOT_1 = 1084;
    /*TRANSACTION:% Meter:% OpenObs:% CloseObs:% OpenStd:% CloseStd:% OpenMass:% CloseMass:%*/

    const TMM_TRS_MTRTOT_2 = 1085;
    /*TRANSACTION:% Meter:% OpenObs:% CloseObs:% OpenStd:% CloseStd:%*/

    const TMM_TRS_MTRTOT_3 = 1086;
    /*TRANSACTION:% Meter:% OpenMass:% CloseMass:%*/

    const TMM_TRS_MTRTOT_4 = 1087;
    /*TRANSACTION:% Meter:% NO Meter Totals available*/

    const TMM_NO_CMPY_TYPE = 1088;
    /*No company of type % in database*/

    const TMM_OASIS = 1089;
    /*Diamond Key International OASIS*/

    const TMM_RECONCILE = 1090;
    /*DELIVERY CONFIRMATION*/

    const TMM_DELIVERNOTE = 1091;
    /*DELIVERY NOTE*/

    const TMM_ADD_TK_DENS = 1092;
    /*% added tank % for % with density %*/

    const TMM_BORROWER = 1093;
    /*To*/

    const TMM_LOANER = 1094;
    /*From*/

    const TMM_PERSON_ADD = 1095;
    /*%s added Personnel (Code: %, Employer: %, Department: %)*/

    const TMM_PERSON_MOD = 1096;
    /*% modified Personnel (Code: %, Employer: %, Department: %)*/

    const TMM_PERSON_DEL = 1097;
    /*% deleted Personnel (Code: %, Employer: %, Department: %)*/

    const TMM_PERSON_CARD_UPDATE = 1098;
    /*Personnel Access Key added or modified: (Card_no: %) (Issuer: %) */

    const TMM_PERSON_CARD_DELETE = 1099;
    /*Personnel Access Key deleted : (Card_no: %) (Issuer: %) */

    const TMM_DELETE_STUFFUP = 1100;
    /*Delete unsuccessful ?*/

    const TMM_KEY_UPDATE = 1101;
    /*% added or modified Access Key (Card_no: %, Issuer: %, Key_type: %) */

    const TMM_KEY_DELETE = 1102;
    /*% deleted Access Key (Card_no: %, Issuer: %, Key_type: %)*/

    const TMM_TANKER_ADD = 1103;
    /*% added Tanker (Code: %, Owner: %)*/

    const TMM_TANKER_MOD = 1104;
    /*%s modified Tanker (Code: %, Owner: %)*/

    const TMM_TANKER_DEL = 1105;
    /*% deleted Tanker (Code: %, Owner: %)*/

    const TMM_DEFAULT_RETURN = 1106;
    /*DEFAULT RETURN REASON*/

    const TMM_DEFAULT_RECONCILIATION = 1107;
    /*DEFAULT RECONCILIATION REASON*/

    const TMM_DEFAULT_STOCK_GAIN = 1108;
    /*DEFAULT GAIN REASON*/

    const TMM_DEFAULT_STOCK_LOSS = 1109;
    /*DEFAULT LOSS REASON*/

    const TMM_DEFAULT_TRANSFER = 1110;
    /*DEFAULT TRANSFER REASON*/

    const TMM_CANNOT_VIEW_LDKEY = 1111;
    /*LOAD NONE NEW - NO ASSOCATION PERMITTED!*/

    const TMM_DOC = 1112;
    /*ISSUE:Type % Document To%-Trip%-Load% Area:%*/

    const TMM_TRANSCONF_DOC = 1113;
    /*TRANSCONF*/

    const TMM_ORDER_STAT_PART_LD = 1114;
    /*PARTIALLY LOADED*/

    const TMM_ORDER_STAT_PART_DLV = 1115;
    /*PARTIALLY DELIVERED*/

    const TMM_GATE_CANNOT_OPEN = 1116;
    /*Cannot open gate %*/

    const TMM_LOAD_ALREADY_COMPLETED = 1117;
    /*Load % (trip %) started at term % ALREADY COMPLETED*/

    const TMM_LOAD_STARTED_WRONG_TERMINAL = 1118;
    /*Load % (trip %) started at WRONG Terminal %*/

    const TMM_LOAD_STARTED_WRONG_TANKER = 1119;
    /*Load % (trip %) started with WRONG Tanker %*/

    const TMM_VRU_DETECTED_LOSS_LTRS = 1120;
    /*Loss % litres on VRU detected for Backwards meter movement. Open meter %, Close meter %*/

    const TMM_VRU_DETECTED_LOSS = 1121;
    /*Loss on VRU detected for Backwards meter movement. Open meter %, Close meter %*/

    const TMM_KRD_TAG_ERROR = 1122;
    /*Device driver error: BAD TAG: %*/

    const TMM_DENSITY_INVALID = 1123;
    /*DENSITY INVALID*/

    const TMM_TANK_INVALID = 1124;
    /*TANK INVALID*/

    const TMM_TANKER_INVALID = 1125;
    /*TANKER INVALID*/

    const TMM_PREDICTED_QTY_FILLED = 1126;
    /*Predicted quantities have to be filled*/

    const TMM_OBSERVED_QTY_FILLED = 1127;
    /*Observed quantities have to be filled*/

    const TMM_NO_UNIT_SET = 1128;
    /*NO UNIT SET*/

    const TMM_NEW_HALTED = 1129;
    /*MOVEMENT MUST BE NEW OR HALTED*/

    const TMM_NO_ADDITION = 1130;
    /*ADDITION NOT PERMITTED*/

    const TMM_NO_MODIFICATION = 1131;
    /*MODIFICATION NOT PERMITTED*/

    const TMM_NO_DELETION = 1132;
    /*DELETION NOT PERMITTED*/

    const TMM_SPECIFY_OWNER = 1133;
    /*Please, Specify at least 1 owner*/

    const TMM_SPECIFY_OWNED_PROPORTION = 1134;
    /*Please, Specify Owned Proportion*/

    const TMM_INSUFFICIENT_QTY = 1135;
    /*Insufficient qty owned by %s (diff = %d l)*/

    const TMM_UNKNOWN_TERMINAL = 1136;
    /*UNKNOWN TERMINAL*/

    const TMM_NO_SCHEDULE = 1137;
    /*SCHEDULE DOES NOT EXIST*/

    const TMM_QTY_MOVED = 1138;
    /*Confirm % litres moved ?*/

    const TMM_NO_TANK_FOR_PROD = 1139;
    /*No tank for prod %*/

    const TMM_ADD_TANK_FOR_PROD = 1140;
    /*Add new tank by pressing F2-AddTank or change prod*/

    const TMM_PROD_IN_OTHER_TANK = 1141;
    /*Owner has enough product in other tanks, adjust ?*/

    const TMM_NO_STRAPS = 1142;
    /*Strapping data not defined, CANNOT calculate quantities*/

    const TMM_ENTER_CODE = 1143;
    /*Enter code for %*/

    const TMM_TANK_IN_GROUP = 1144;
    /*Tank % belongs to group %*/

    const TMM_TANK_IS_ACTIVE = 1145;
    /*Tank % is active in group %*/

    const TMM_TANK_GROUP_AT_TERM = 1146;
    /*Tank Group % belongs to terminal %*/

    const TMM_TANK_GROUP = 1147;
    /*TANK GROUP*/

    const TMM_OWNED_VOL_DISCREPANCY = 1148;
    /*Ownership % differs from gauged stock %*/

    const TMM_LOG_SCAD = 1149;
    /*SCADA*/

    const TMM_SCADA_ALARM = 1150;
    /*Alarm %, Location %*/

    const TMM_SCADA_ACK = 1151;
    /*% ACKNOWLEDGED %*/

    const TMM_SCADA_EVENT = 1152;
    /*% TRIGGERED %*/

    const TMM_UPDATE_UNLOAD_SPEC = 1153;
    /*% updated unload-spec supp: % trip: % cmpt: % prod: % qty: % unit: % dens: %*/

    const TMM_DELETE_LOAD = 1154;
    /*% deleted LOAD with Trip Num: %  Terminal: %  Supplier: %  Drawer: %*/

    const TMM_UNLOAD_IN_TRF = 1155;
    /*Trip:%, Supplier:%, in transfer to Site:%.*/

    const TMM_ACC_LVL_NUM = 1156;
    /*Personnel Access Level Number*/

    const TMM_NO_CORRECTION_METHOD = 1157;
    /*No Volume adjustment for temperature*/

    const TMM_BATCH = 1158;
    /*BATCH*/

    const TMM_BATCH_CODE = 1159;
    /*Batch Code*/

    const TMM_BATCH_COMPLETE = 1160;
    /*Batch:% Completed at Site % by %*/

    const TMM_PERS_MODS = 1161;
    /*% personnel updated by % on site:%*/

    const TMM_OWN_TANK_PROD = 1162;
    /*Company owns tank products*/

    const TMM_CMPY_VET_OWNED_PRODUCT = 1163;
    /*VET SUPPLIER PRODUCT OWNERSHIP*/

    const TMM_CANT_CHANGE_PM = 1164;
    /*Primemover % scheduled for trip %,% cant change to %*/

    const TMM_CANT_CHANGE_TRAILER = 1165;
    /*Trailer % scheduled for trip %,% cant change to %*/

    const TMM_OWNED_PRODUCT_INSUFFICIENT = 1166;
    /*Ownership of % insufficient for scheduled trip %,%*/

    const TMM_CO_ROLE_REQUIREMENT = 1167;
    /*Role of company % must be % to %*/

    const TMM_EQPT_LOAD_LOCK = 1168;
    /*Equipment % locked from loading*/

    const TMM_RECONCILE_PREVIOUS = 1169;
    /*Last Trip % Supplier:% must be reconciled first*/

    const TMM_ALARM_LOCATION = 1170;
    /*Alarms are handled by %*/

    const TMM_COMPANY_INVALID_AT_BAY = 1171;
    /*% company cannot be identified for bay operator*/

    const TMM_KRD_LOAD_AVAILABLE = 1172;
    /*LOAD AVAILABLE*/

    const TMM_KRD_NO_LOAD = 1173;
    /*NO LOADS*/

    const TMM_WIPE_CARD = 1174;
    /*WIPE CARD*/

    const TMM_PLEASE_WAIT = 1175;
    /*PLEASE WAIT*/

    const TMM_CMPY_VET_OP_AND_PM = 1176;
    /*VET PRODUCT OWNERSHIP AND PRIME MOVER*/

    const TMM_CMPY_VET_OP_AND_CARRIER = 1177;
    /*VET PRODUCT OWNERSHIP AND CARRIER*/

    const TMM_CMPY_VET_OP_AND_TRAILER = 1178;
    /*VET PRODUCT OWNERSHIP AND TRAILER*/

    const TMM_ORDER_STAT_CANCELLED = 1179;
    /*CANCELLED*/

    const TMM_BAT_ULTRA = 1180;
    /*ULTRA*/

    const TMM_BAT_MERCURY = 1181;
    /*MERCURY*/

    const TMM_BAT_TOLEDO = 1182;
    /*TOLEDO*/

    const TMM_AMSKAN_CCM = 1183;
    /*AMSKAN_CCM*/

    const TMM_CONTREC = 1184;
    /*CONTREC*/

    const TMM_CON_AWA = 1185;
    /*CON_AWA*/

    const TMM_CON_AWA_DOC = 1186;
    /*CON_AWA_DOC*/

    const TMM_CON_DOC = 1187;
    /*CON_DOC*/

    const TMM_CON_EPC = 1188;
    /*CON_EPC*/

    const TMM_CON_WEIGH = 1189;
    /*CON_WEIGH*/

    const TMM_EPCMULTI = 1190;
    /*EPCMULTI*/

    const TMM_KIKI = 1191;
    /*KIKI*/

    const TMM_LOOP_01 = 1192;
    /*LOOP_01*/

    const TMM_ULTRA_DESC = 1193;
    /*ULTRA WEIGH DEVICE*/

    const TMM_MERCURY_DESC = 1194;
    /*MERCURY WEIGH DEVICE*/

    const TMM_TOLEDO_DESC = 1195;
    /*TOLEDO WEIGH DEVICE*/

    const TMM_WGHBRDG_CONTREC_DESC = 1196;
    /*WEIGHBRIDGE CONTREC CARDREADER*/

    const TMM_LOOP_01_DESC = 1197;
    /*GROUND LOOP TYPE 1*/

    const TMM_BAM_USE_UNDEFINED = 1198;
    /*UNDEFINED*/

    const TMM_BAM_USE_BAY_UNSPECIFIED = 1199;
    /*BAY UNSPECIFIED*/

    const TMM_BAM_USE_BAY_FROM_TANK = 1200;
    /*BAY FROM TANK*/

    const TMM_BAM_USE_BAY_TO_TANK = 1201;
    /*BAY TO TANK*/

    const TMM_BAM_USE_BATCH_UNSPECIFIED = 1202;
    /*BATCH UNSPECIFIED*/

    const TMM_BAM_USE_BATCH_TO_TANK = 1203;
    /*BATCH TO TANK*/

    const TMM_BAM_USE_BATCH_FROM_TANK = 1204;
    /*BATCH FROM TANK*/

    const TMM_ACR_MOD = 1205;
    /*% modified access rights for %:%, to %.*/

    const TMM_DEL_IT = 1206;
    /*Do you want to delete it?*/

    const TMM_LD_RECONCILED = 1207;
    /*Load % (trip %) (supplier %) reconciled*/

    const TMM_CANNOT_DEL_LINE = 1208;
    /*You cannot delete this line.*/

    const TMM_SET_TK_DENS_ZERO = 1209;
    /*Attempt to set density of tank: %, to zero*/

    const TMM_CANNOT_DEL_DRAW_PROD = 1210;
    /*This product may not be deleted yet. It still has references to it.*/

    const TMM_MUST_FILL_ALL = 1211;
    /*You must fill in all of the fields.*/

    const TMM_NO_RATIOS_DEL_PROD = 1212;
    /*Deleting drawer product: %. Product has no ratios setup.*/

    const TMM_MUST_HAVE_RATIOS = 1213;
    /*Must have at least one ratio. Add another one before deleting this one.*/

    const TMM_MUST_EXPLAIN = 1214;
    /*You may not cancel this input. Please select an explanation.*/

    const TMM_OUT_MSG_APPENDED = 1215;
    /*Out message appended*/

    const TMM_MUST_BE_OM3000 = 1216;
    /*Changes to %, is restricted to % logins. This prohibits access to omega logins. crontab access failed.*/

    const TMM_OK_TO_PUMPBACK = 1217;
    /*AUTH UNLOAD*/

    const TMM_PUMPING_BACK = 1218;
    /*UNLOADING*/

    const TMM_PUMPED_BACK = 1219;
    /*DELIVERED*/

    const TMM_KRD_PROD_NOT_PURE = 1220;
    /*PRODUCT NOT PURE*/

    const TMM_KRD_DENSITY_NOT_SPECIFIED = 1221;
    /*DENSITY NOT SPECIFIED*/

    const TMM_KRD_WRONG_RTN_LOCATION = 1222;
    /*WRONG RETURN LOCATION*/

    const TMM_KRD_RECONCILED_WITHOUT_RTNS = 1223;
    /*RECONCILED WITHOUT RTNS*/

    const TMM_IN_BAY = 1224;
    /*IN BAY*/

    const TMM_BAM_USE_WEIGH_LOAD = 1225;
    /*WEIGHBRIDGE LOADING*/

    const TMM_BAM_USE_WEIGH_UNLOAD = 1226;
    /*WEIGHBRIDGE UN-LOADING*/

    const TMM_UNLOAD_STARTED = 1227;
    /*ACTIVE UNLOAD*/

    const TMM_MUST_BE_MNGR_CO = 1228;
    /*You must be a site manager to modify*/

    const TMM_TKR_ACCESS_PERMITTED = 1229;
    /*Driver: [%], Tanker: [%], Equipment1: [%], Carrier: [%, %] allowed access at Gate: [%] from area: [%] to area: [%]*/

    const TMM_SHL_UNLOADED = 1230;
    /*% changed Prod % to % in Cmpt % of Trip % Supplier %*/

    const TMM_ORPHAN_BAINJS = 1231;
    /*Deleted an orphan BAINJS record [%]*/

    const TMM_LD_STRT_WRONG_TKR_AND_TRM = 1232;
    /*Load (trip %, suppl %) started with wrong tanker % (not %) at wrong terminal % (not %). Deleting SHL*/

    const TMM_BOUL = 1233;
    /*BILL OF UNLADING*/

    const TMM_KRD_TRANS_IN_PROG = 1234;
    /*TRANSACTION STILL IN PROGRESS*/

    const TMM_KRD_DOCKET_BEING_PRINTED = 1235;
    /*DOCKET IS BEING PRINTED*/

    const TMM_LOCK_SET = 1236;
    /*LOCK SET FOR %*/

    const TMM_NOT_AVAIL_FOR_BLC100 = 1237;
    /*This option is not available for BLC-100 type devices*/

    const TMM_MODIFY_MTR_CURVE = 1238;
    /*% altered Curve for meter %*/

    const TMM_INSUFF_STCK_FOR_LOSS = 1239;
    /*Loss of % l for tank [%] could not be fully assigned to site managers proportion - insufficient stock.*/

    const TMM_NO_MGR_TK_FOR_GAINLOSS = 1240;
    /*Gain/loss of % l could not be assigned due to site managers non ownership of tank [%]*/

    const TMM_PROD_GROUP_CODE = 1241;
    /*Product Group Code*/

    const TMM_PROD_GROUP_NAME = 1242;
    /*Product Group Name*/

    const TMM_CONFIRM_CHANGE_GROUP = 1243;
    /*% is used for Base Class % Really want to change?*/

    const TMM_MOD_DGROUP = 1244;
    /*% modified Product Group from % to %*/

    const TMM_MOD_GROUP_UNIT = 1245;
    /*% modified Group Unit from % to %*/

    const TMM_ONLY_BY_CMP = 1246;
    /*Order Scheduling is allowed only BY COMPARTMENT*/

    const TMM_TANK_DETAILS = 1247;
    /*% modified Tank:%,Depot:% to Temp:%,Density:%,Obs:%,Std:%,Mass:%,Level:%,Gauging:%,Group:%*/

    const TMM_BAY_ARM_LOCK_NOTIFY = 1248;
    /*% set Bay Arm Lock for arm %*/

    const TMM_ADDED_ORDER = 1249;
    /*% added Order:% Customer:% Supplier:% SupplyPoint:% Terminal:%*/

    const TMM_PMV_TANK = 1250;
    /*TANK*/

    const TMM_UNIT_NOTE_BOX4 = 1251;
    /*L(STD) = STANDARD Litres at 15 C*/

    const TMM_UNIT_NOTE_BOX1 = 1252;
    /*+ NOTE: = +*/

    const TMM_UNIT_NOTE_BOX2 = 1253;
    /*+ LTR    = OBSERVED Metered Litres   +*/

    const TMM_UNIT_NOTE_BOX6 = 1254;
    /*+------------------------------------+*/

    const TMM_UNIT_NOTE_BOX3 = 1255;
    /*+*/

    const TMM_UNIT_NOTE_BOX5 = 1256;
    /*+*/

    const TMM_TC_WBRIDGE_DESC = 1257;
    /*TRANSACTION CONTROLLER WEIGHBRIDGE*/

    const TMM_ADD_MASS = 1258;
    /*Transfer %: Additive injection volume: % g*/

    const TMM_LD_ORDER_SENDING = 1259;
    /*% establishing trip % supplier % (by product) for site %*/

    const TMM_CONF_BASE_ADD = 1260;
    /*% Added BASE PRODUCT with % set to %*/

    const TMM_CONF_BASE_DEL = 1261;
    /*% Deleted BASE PRODUCT with % set to %*/

    const TMM_CONF_BASE_MOD = 1262;
    /*% Modified BASE PRODUCT of % : % changed from % to %*/

    const TMM_CONF_COMPANY_ADD = 1263;
    /*% Added COMPANY with % set to %*/

    const TMM_CONF_COMPANY_DEL = 1264;
    /*% Deleted % with COMPANY set to %*/

    const TMM_CONF_COMPANY_MOD = 1265;
    /*% Modified % of COMPANY : % changed from % to %*/

    const TMM_CONF_EQUIP_TP_ADD = 1266;
    /*% Added EQUIPMENT TYPE with % set to %*/

    const TMM_CONF_EQUIP_TP_DEL = 1267;
    /*% Deleted EQUIPMENT TYPE with % set to %*/

    const TMM_CONF_EQUIP_TP_MOD = 1268;
    /*% Modified % of EQUIPMENT TYPE : % changed from % to %*/

    const TMM_CONF_TANK_GRP_ADD = 1269;
    /*% Added % with TANK GROUP set to %*/

    const TMM_CONF_TANK_GRP_DEL = 1270;
    /*% Deleted % with TANK GROUP set to %*/

    const TMM_CONF_TANK_GRP_MOD = 1271;
    /*% Modified % of TANK GROUP : % changed from % to %*/

    const TMM_SP_PROD_MOD = 1272;
    /*% MODIFIED DRAWER PRODUCT Code %, Company %*/

    const TMM_ACCU_3_DESC = 1273;
    /*ACCULOAD 3*/

    const TMM_REPORTED_ADDITIVE_DESC = 1274;
    /*Reported Additive*/

    const TMM_SELF_FUEL_START = 1275;
    /*Self fuel transaction % started. Tanker: %, Equipment1: % Person %*/

    const TMM_WGHN_SIGA = 1276;
    /*SIGA*/

    const TMM_KRD_TKR_NOT_ON_WB = 1277;
    /*Position truck  correctly*/

    const TMM_CONF_ADD_PROD_GRP = 1278;
    /*% Added Product Group %. Description: %, Units: %*/

    const TMM_CONF_MOD_PROD_GRP_DSCR = 1279;
    /*% Modified Description of Product Group % from % to %*/

    const TMM_CONF_MOD_PROD_GRP_UNIT = 1280;
    /*% Modified Units of Product Group % from % to %*/

    const TMM_CONF_DEL_PROD_GRP = 1281;
    /*% deleted Product Group %, description: %*/

    const TMM_CONF_MOD_PROD_PROD_GRP = 1282;
    /*% Modified Product %:%. Set Product Group to %, was %*/

    const TMM_LOG_TRANSFER = 1283;
    /*TRANSFER %*/

    const TMM_VAP_WARN1 = 1284;
    /*Vapour return has occured on this load.  Disregard loaded product totals.*/

    const TMM_VAP_WARN2 = 1285;
    /*     Tanker must be grossed out over the weigh bridge.*/

    const TMM_VAP_WARN3 = 1286;
    /*     Equimpment Gross       kg*/

    const TMM_VAP_WARN4 = 1287;
    /*     Equimpment Tare  % kg*/

    const TMM_VAP_WARN5 = 1288;
    /*     Net =   kg*/

    const TMM_TOUCH_BUTTON = 1289;
    /*Touch button*/

    const TMM_PROX_CARD = 1290;
    /*Proximity card*/

    const TMM_SMART_CARD = 1291;
    /*Smart card*/

    const TMM_WB_WEIGH_IN = 1292;
    /*WEIGH IN: load %, tkr %, poe %, start_weight %*/

    const TMM_WB_WEIGH_OUT = 1293;
    /*WEIGH OUT: load %, tkr %, poe %, end_weight %*/

    const TMM_WB_NO_STRT_WGHT = 1294;
    /*WEIGHBRIDGE ERROR: load %, tkr %, poe %; start_weight missing, set it to empty weight %, end_weight set to %*/

    const TMM_LD_REJECT_2 = 1302;
    /*% rejected -> trip %, drawer:% rejected*/

    const TMM_LD_REJECT_3 = 1303;
    /*% rejected -> Tanker % has no equipment connected to it*/

    const TMM_LD_REJECT_4 = 1304;
    /*% rejected -> Maximum Load Quantity is 0 - Contact OMEGA Suppot.*/

    const TMM_LD_REJECT_5 = 1305;
    /*% rejected -> This Load Trip:%, Supplier:%, Tanker:% is alredy complete*/

    const TMM_LD_REJECT_6 = 1306;
    /*% rejected -> ORDER LOAD: %->Not enough allocation for SUPLIER:%,DRAWER:%,CARRIER:%*/

    const TMM_LD_REJECT_7 = 1307;
    /*% rejected -> Last Trip:%, Depot:%, Supplier:%, Tanker:%, is incomplete*/

    const TMM_LD_REJECT_8 = 1308;
    /*% rejected -> This Load Trip: %, Supplier: %, Tanker: % has a drawer (%) different from authorisation (%)*/

    const TMM_LD_REJECT_9 = 1309;
    /*% rejected -> No product left in trip%, supplier:%*/

    const TMM_LD_REJECT_10 = 1310;
    /*% rejected -> Scheduled Load: %,% - NOTHING ASSIGNED*/

    const TMM_LD_REJECT_11 = 1311;
    /*% rejected -> Trip: %, Supplier: % - Insufficent allocation*/

    const TMM_LD_REJECT_12 = 1312;
    /*% rejected -> Trip:%,Drawer:%->% cant load % (%,%)*/

    const TMM_LD_REJECT_13 = 1313;
    /*% rejected -> More than one load for trip %, drawer:%*/

    const TMM_LD_REJECT_14 = 1314;
    /*% rejected -> No Load Spec found for trip %, drawer: %*/

    const TMM_LD_REJECT_15 = 1315;
    /*% rejected -> Tanker % locked out from loading*/

    const TMM_LD_REJECT_16 = 1316;
    /*% rejected -> Equipment % locked out from loading*/

    const TMM_LD_REJECT_17 = 1317;
    /*% rejected -> Personnel % locked out*/

    const TMM_LD_REJECT_18 = 1318;
    /*% rejected -> Key ID. % locked out at this time*/

    const TMM_LD_REJECT_19 = 1319;
    /*% rejected -> Key locked out*/

    const TMM_LD_REJECT_20 = 1320;
    /*% rejected -> Transaction % is already complete*/

    const TMM_LD_REJECT_21 = 1321;
    /*% rejected -> Equipment % is not in area %*/

    const TMM_LD_REJECT_22 = 1322;
    /*% rejected -> Cant load normal load at drum fill bay*/

    const TMM_LD_REJECT_23 = 1323;
    /*% rejected -> Cant fill drums at normal bay*/

    const TMM_LD_REJECT_24 = 1324;
    /*% rejected -> Bay is locked for tank switching*/

    const TMM_LD_REJECT_25 = 1325;
    /*% rejected ->additive group clash, cant auth trip:%,cmpt:%*/

    const TMM_WB_POINT_CANT_SET = 0;
    /*WB:[%], Cant set setpoint after [%] tries, chek the weighbridge setting*/

    const TMM_TANK_SWITCH_UNLOCK_BAY = 1398;
    /*TANK_SWITCHING: unlocking bay %*/

    const TMM_PRODUCT_MOVEMENT = 1399;
    /*PRODUCT MOVEMENT*/

    const TMM_UNKNOWN_OPERATOR = 1400;
    /*Unknown Operator*/

    const TMM_UNKNOWN_TANKER = 1401;
    /*Unknown Tanker*/

    const TMM_ERROR_1 = 1402;
    /*Trip: %, Supplier: % - Unable to build base product list for loadable qty calculation*/

    const TMM_PROGRAMM_ERR_1 = 1403;
    /*%: Programming error (%:%), key rejected*/

    const TMM_PROGRAMM_ERR_2 = 1404;
    /*%: Progam error (%:%)  rejected*/

    const TMM_DUP_PSN_CARD = 1405
    ;
    /*%: More than 1 personnel card*/

    const TMM_MIXED_CARD = 1406;
    /*%: Mixed tanker and equipment cards*/

    const TMM_CARD_WIPE_MORE = 1407;
    /*%: Equipment card wiped   more than once*/

    const TMM_CARD_WIPE_FIRST = 1408;
    /*%: Prime mover card must be wiped first*/

    const TMM_DUP_TKR_CARD = 1409;
    /*%: More than one tanker card*/

    const TMM_DUP_TRIP_CARD = 1410;
    /*%: More than one trip card*/

    const TMM_CANT_CONF_TKR = 1411;
    /*%: % cant configure tanker with given component*/

    const TMM_TERMINAL_ILLEGAL = 1412;
    /*Terminal illegal for trip %, set to %*/

    const TMM_DRAWER_ILLEGAL = 1413;
    /*Drawer illegal for trip %, set to %*/

    const TMM_PERSON_ILLEGAL = 1414;
    /*Person illegal for trip %, set to %*/

    const TMM_TANKER_ILLEGAL = 1415;
    /*Tanker illegal for trip %, set to %*/

    const TMM_SUPPLIER_ILLEGAL = 1416;
    /*Supplier illegal for trip %, set to %*/

    const TMM_TRIP_ILLEGAL = 1417;
    /*Illegal trip %, set to %*/

    const TMM_TRAN_SHOULD_BE = 1418;
    /*Transaction % refers to trip %, should be %*/

    const TMM_KRD_FATAL = 1419;
    /*keyrd.pc - krd_fatal*/

    const TMM_OUT_OF_SPACE_CARD_READER = 1420;
    /*% Full. No more space available for TT LED card reader*/

    const TMM_MEMORY = 1421;
    /*memory*/

    const TMM_ERROR_NO_KEYREADER_CONF = 1422;
    /*No configuration data for LED key reader %*/

    const TMM_SYSERR_OUTOFRANGE_ARRAY = 1423;
    /*Array index out of range for OIS_CLOSEOUT_STRUCT*/

    const TMM_TANK_ADJUST_PRODUCT = 1424;
    /*Tank %: Adjusted ownership of % (ltr) from Company % to % %*/

    const TMM_OUT_OF_SPACE_STRAP_DATA = 1425;
    /*% Full. No more space available for strap data*/

    const TMM_SYSERR_OUTOFRANGE_TKNUM = 1426;
    /*There are more than the configured maximum number[%] of tanks. file=[%]*/

    const TANK_BASE = 1427;
    /*tank_base*/

    const TK_OWNERS_OR_CLOSEOUT = 1428;
    /*tk_owners or tk_closeout*/

    const TMM_ADJ_OWNED_QTY = 1429;
    /*Company % owns % of tank %. Adjusting owned qty from % to %*/

    const TMM_NO_PRODUCTIN_TRANSFER = 1430;
    /*No product in non NULL transfer*/

    const TMM_SOMETHING_WRONG = 1431;
    /*Something wrong with transfer bases*/

    const TMM_CANT_STORE_WEIGHT = 1432;
    /*Cant store start and end weights*/

    const TMM_TRANSFER_WEIGHT = 1433;
    /*TRANSFER %: Start Weight % kg, End Weight % kg*/

    const TMM_UNKNOWN_DRAWER = 1434;
    /*Unknown Drawer % for transaction % - ignored*/

    const TMM_UNKNOWN_TANKER_TRANS = 1435;
    /*Unknown Tanker % for transaction % - ignored*/

    const TMM_UNKNOWN_OPERATOR_TRANS = 1436;
    /*Unknown Tanker % for transaction % - ignored*/

    const TMM_INCONSISTENT_DATA = 1437;
    /*Transaction % ended, but contains inconsistent data*/

    const TMM_UNLOAD_STANDALONE = 1438;
    /*% unloaded standalone trip %, transaction % at bay %*/

    const AUTHORISED_TO_LOAD = 1439;
    /* % authorised to load trip %, transaction % at bay %*/

    const AUTHORISED_TO_UNLOAD = 1440;
    /*% authorised to unload trip %, transaction % at bay %*/

    const TMM_CANT_OBTAIN = 1441;
    /*Cant obtain % for %: %*/

    const TMM_CANT_SEND_MESSAGE = 1442;
    /*Cant send % message to %: %*/

    const TMM_BA_FATAL_ERR = 1443;
    /*FATAL ERROR in baiman (%:%): %*/

    const TMM_BAIMAN_EXITING = 1444;
    /*DB change demands BAIMAN to restart under OMINIT. BAIMAN is exiting*/

    const TMM_DOT_CPP_ERR = 1445;
    /*Error in Transaction.cpp file.*/

    const TMM_ALRM_MAJOR_1 = 1446;
    /*BAY:% Company:% Driver:% Tanker:% Trip:% %*/

    const TMM_ALRM_MAJOR_2 = 1447;
    /*BAY:% TRANSN:% Tanker:% Trip:%.*/

    const TMM__CANT_CONVERT_MESSAGE = 1448;
    /*Cant convert message from bay %  %, possibly wrong version*/

    const TMM_CONFIG_PORT_ERR = 1449;
    /*CONFIG port ERROR: %*/

    const TMM_COMMS_ERR = 1450;
    /*% comms ERROR: %*/

    const TMM_CONF_MOD_BASE_CLASS = 1451;
    /*% Modified % of % :  base class changed from % to %*/

    const TMM_CONF_MOD_BASE_Group = 1452;
    /*% Modified % of % :  base group changed from % to %*/

    const TMM_K_FACTOR_CHANGED = 1453;
    /*K Factor has been changed from % to % for Meter_Code: %; Login by: %*/

    const TMM_METER_CODE_ADDED = 1454;
    /*Added: Meter_Code:  %. min_flow: %; max_flow: %; K_factor: %. % */

    const TMM_TANK_SWITCHING = 1455;
    /*TANK_SWITCHING: Changing from tank % to % on BAY ARM %*/

    const TMM_TANK_SWITCHING_FAILED = 1456;
    /*ERROR: Tank switching failed, invalid tank node % on stream % */

    const TMM_M_FACTOR = 1457;
    /*M Factor: % for Meter_Code: %; Login by: %*/

    const TMM_MIN_QTY_CHANGED = 1458;
    /*BAY FLOW PROFILES: Minimum_Quantity has been changed from % to %. Bay:%; Arm:%. Login by: %*/

    const TMM_MAX_QTY_CHANGED = 1459;
    /*BAY FLOW PROFILES: Maximum_Quantity has been changed from % to %. Bay:%; Arm:%. Login by: %*/

    const TMM_HIGH_FLOW_CHANGED = 1460;
    /*BAY FLOW PROFILES: High_Flow has been changed from % to %. Bay:%; Arm:%. Login by: %*/

    const TMM_LOW_FLOW_CHANGED = 1461;
    /*BAY FLOW PROFILES: Low_Flow has been changed from % to %. Bay:%; Arm:%. Login by: %*/

    const TMM_HIGH_FLOW_START_CHANGED = 1462;
    /*BAY FLOW PROFILES: High_Flow_Start has been changed from % to %. Bay:%; Arm:%. Login by: %*/

    const TMM_SHUTDOWN_REMAINDER_CHANGED = 1463;
    /*BAY FLOW PROFILES: Shutdown_Remainder has been changed from % to %. Bay:%; Arm:%. Login by: %*/

    const TMM_FINAL_TRIP_REMAINDER_CHANGED = 1464;
    /*BAY FLOW PROFILES: Final_Trip_Remainder has been changed from % to %. Bay:%; Arm:%. Login by: %*/

    const TMM_COMPANY_MODIFIED = 1465;
    /*% modified Company details: (Code: %), (Name: %)*/

    const TMM_DATABASE_FULL = 1466;
    /*Database full. Deleting oldest EPC transaction.*/

    const TMM_MESSAGE_NOT_SENT = 1467;
    /*Software error %:%, Message maybe not sent to %.*/

    const TMM_FILE_QUEUE_OPEN_ERR = 1468;
    /*File queue %s couldnt be opened*/

    const TMM_NO_STRUCT_FOUNT = 1469;
    /*No struct of type % found*/

    const TMM_CANT_MALLOC = 1470;
    /*Cant malloc (%:%)*/

    const TMM_FORMAT_MSG_FAILED = 1471;
    /*Couldnt format msg to hst_send: %*/

    const TMM_SEND_MSG_FAILED = 1472;
    /*Couldnt send message to host_schd.*/

    const TMM_NO_PRODUCT_IN_TANK = 1473;
    /*Tank Change found no product in tank %. (%:%)*/

    const TMM_TANK_SWITCH_FAILED = 1474;
    /*Can not switch to Tank % (depot %). Reason: %*/

    const TMM_TANK_ALREADY_ACTIVE = 1475;
    /*Can not switch to Tank % (depot %). Reason: already active.*/

    const TMM_PERSON_STORE_FAILED = 1476;
    /*Person details (person_code :%) didnt store, reason: %*/

    const TMM_REJECTED_ANTIPASSBACK_1 = 1477;
    /*% REJECTED at gate % due to AntiPassBack is enabled.*/

    const TMM_REJECTED_ANTIPASSBACK_2 = 1478;
    /*% REJECTED to access at gate %, from area % to area % due to AntiPassBack is enabled.*/

    const TMM_NO_DOC_PRINTER = 1479;
    /*No DOCUMENT printer found in area*/

    const TMM_INVALID_KEY = 1480;
    /*Invalid key*/

    const TMM_MSG_NUMBERS_ERR = 1481;
    /*Check TMM_MSG records. % in database, % required. DBPATH=%*/

    const TMM_DEL_TAGS_FOR_KEY = 1482;
    /*% deleted tags for key %*/

    const TMM_O_K_FINISH_TRANSACTION = 1483;
    /*OfficeKey finishing transaction %*/

    const TMM_AUTH_ERR_EXIST = 1484;
    /*Authorisation error at bay %, transaction % already exists*/

    const TMM_LOCKTRIP_WHILE_FLOWING = 1485;
    /*BAY:% Company:% Driver:% Tanker:% Trip:% INTERLOCK_TRIP_WHILE_PRODUCT_IS FLOWING.*/

    const TMM_NO_PERSON = 1486;
    /*No Person defined for trip:% - set to NONPERSON*/

    const TMM_NO_TANKER = 1487;
    /*No Tanker defined for trip:% - set to NONTANKER*/

    const TMM_NO_CARRIER = 1488;
    /*No carrier defined for trip %- set to %*/

    const TMM_NO_DRAWER = 1489;
    /*No drawer defined for trip %- set to %*/

    const TMM_NO_SUPPLIER = 1490;
    /*No supplier defined for trip %- set to %*/

    const TMM_METER_TOTALS_RESET = 1491;
    /*Bay:% Eprom Version:% Meter Totals Message Arrive, Meter Totals Reset To :*/

    const TMM_LDC_LOCKED = 1492;
    /*LDC:% is locked!*/

    const TMM_QTY_IS_NEGATIVE = 1493;
    /*Value of quantity is negative (%), but shouldnt be. (%:%)*/

    const TMM_PRODUCT_CALCULATE_ERR_1 = 1494;
    /*ERROR: Calculating product volumes (%:%)*/

    const TMM_PRODUCT_CALCULATE_ERR_2 = 1495;
    /*ERROR: Calculating product volumes (%:%): Cant add base class % to %*/

    const TMM_ADDITIVE_CALCULATE_ERR = 1496;
    /*ERROR: Calculating additive volume (%:%)*/

    const TMM_EYHANOL_CALCULATE_ERR = 1497;
    /*ERROR: Calculating ETHANOL product volumes (%:%)*/

    const TMM_NO_SPACE_IN_MESSAGE = 1498;
    /*Transaction/Load details, no space in message for Meter Details, IGNORED some*/

    const TMM_NO_TANK_FOR_TRANSACTION = 1499;
    /*Load/Transaction Details: No tank for transaction. (LDC_CONSL: %, Arm: %)*/

    const TMM_NO_METER_FOR_TRANSACTION = 1500;
    /*Load/Transaction Details No meter for transaction. (Bay: %, Arm: %)*/

    const TMM_TOO_MANY_METERS = 1501;
    /*Too many meters details for message (%:%)*/

    const TMM_NO_SPACE_IN_STRUCT = 1502;
    /*Transaction details no space in LD_CMPT_DETS_STRUCT (%:%)*/

    const TMM_NO_BASE_PRODUCT = 1503;
    /*No base product in transfer*/

    const TMM_NO_SPACE_FOR_PRODUCT = 1504;
    /*Transaction details: No space for base product details(%:%)*/

    const TMM_NO_SPACE_FOR_CMPT = 1505;
    /*Transaction details: No space for base compartment details(%:%)*/

    const TMM_NO_METER_FOR_TRANSFER = 1507;
    /*Transaction details: No meter for transfer % found*/

    const TMM_INVALID_BASE_PRODUCT = 1508;
    /*Load details: Invalid base product (%:%)*/

    const TMM_TOO_MANY_TRANSFER = 1509;
    /*Load Details: too many transfers, ignoring one*/

    const TMM_TOO_MANY_CMPT_LPG = 1510;
    /*Load Details: too many compartments in LPG equip*/

    const TMM_NO_CMPT = 1511;
    /*Load %: Could not find compartment*/

    const TMM_INVALID_BASE_CD = 1513;
    /*invalid base_cd*/

    const TMM_BASE_CD_NOT_SET = 1514;
    /*base_cd not set.*/

    const TMM_INVALID_ADDI_CD = 1515;
    /*invalid additive_cd*/

    const TMM_INVALID_BASE_TANK_CD = 1516;
    /*invalid base_tank_cd:*/

    const TMM_INVALID_ADDI_TANK_CD = 1517;
    /*invalid additive_tank_cd:*/

    const TMM_ZERO_METER_MOVEMENT = 1518;
    /*Zero meter movement detected . Open meter:% , Close meter %*/

    const TMM_TANK_CHANGE_ON_MTD = 1519;
    /*Tanks changed on Mtd %*/

    const TMM_CONF_TANKER_FAILED = 1520;
    /*OBSMAN: Cant configure Tanker  Prime mover % with given trailers % %*/

    const TMM_CANT_ACTIVATE_TANKER = 1521;
    /*OBSMAN: Cannot automatically activate Tanker % for Company %*/

    const TMM_EQUIP_IS_LOADING = 1522;
    /*OBSMAN Equipment:% is loading in tnkr %*/

    const TMM_TOO_MANY_TRAILER = 1523;
    /*Too many trailers in trailer id list (%:%)*/

    const TMM_JNLC_DEBUG = 1524;
    /*DEBUG*/

    const TMM_JNLC_EVENT = 1525;
    /*EVENT*/

    const TMM_JNLC_ERROR = 1526;
    /*ERROR*/

    const TMM_JNLC_ALRM_CRITICAL = 1527;
    /*CRITICAL*/

    const TMM_JNLC_ALRM_MAJOR = 1528;
    /*MAJOR*/

    const TMM_JNLC_ALRM_MINOR = 1529;
    /*MINOR*/

    const TMM_JNLC_ALRM_WARNING = 1530;
    /*WARNING*/

    const TMM_JNLC_ALRM_INCIDENT = 1531;
    /*INCIDENT*/

    const TMM_ORDER_STORED_INCOMPLETE = 1532;
    /*Order % (supplier %, customer %) incompletely stored.*/

    const TMM_CUST_ORDER_IS = 1533;
    /*Customer Order:%, Drawer:%, Supplier:%, Customer:% is %*/

    const TMM_CUST_ORDER_SCHED = 1534;
    /*% scheduled CUST ORDER: order_no:%, cust:% as trip:%, supp:%, draw:%, tanker:%*/

    const TMM_CUST_ORDER_SCHED_FULLY = 1535;
    /*Customer Order %, Cust:%, Supp:%, prod:%  is fully scheduled.*/

    const TMM_CUST_ORDER_SCHED_NTH = 1536;
    /*Customer Order %, Cust:%, Supp:% has nothing to shedule.*/

    const TMM_CUST_ORDER_EXPIR = 1537;
    /*Customer Order %, Cust:%, Supp:% is expired.*/

    const TMM_REJECTED_EXPIRED = 1538;
    /*% Rejected because % expired*/

    const TMM_EXPIRY_WARNING = 1539;
    /*% Expiry Warning because % expired*/

    const TMM_ACCESS_EXPIRED = 1540;
    /*% access expired because last access more than % months ago*/

    const TMM_PLC_COMM_FAIL = 1541;
    /*PLC %d GENERAL COMMUNICATIONS FAILURE*/

    const TMM_PLC_READ_STAT_FAIL = 1542;
    /*PLC TAG %: %: Failed to read stat %*/

    const TMM_PLC_SET_STAT_FAIL = 1543;
    /*PLC TAG %: %: Failed to set to stat %*/

    const TMM_UNEXPECTED_INFLOW = 1544;
    /*UNEXPECTED inflow meter % reading: previous %, current %*/

    const TMM_UPDATE_LOADING_LOCK = 1545;
    /*% has updated Equipment:% of Type %, Loading Lock from % to %*/

    const TMM_UPDATE_PRELOAD_WEIGH = 1546;
    /*% has updated Equipment:% of Type %, Preload Weigh from % to %*/

    const TMM_BASE_ALLOC_NOT_ENOUGH = 1547;
    /*Supplier %s Base Allocation(%) for % not enough to load % of %*/

    const TMM_BASE_ALLOC_NEED_MORE = 1548;
    /*Supplier % has insufficient(%) Base Allocation for %, needs %*/

    const TMM_ALLOC_LOCKED = 1549;
    /*Trip:%, Drawer:%, Supplier:% - Allocation(s) locked*/

    const TMM_TOO_MANY_PROD = 1550;
    /*Too many products to fit on DOCUMENT*/

    const TMM_TOO_MANY_DRAWER = 1551;
    /*Too many drawer and base products to fit on DOCUMENT*/

    const TMM_TOO_MANY_CMPT_DOC = 1552;
    /*Too many compartment to fit on DOCUMENT*/

    const TMM_CANT_INIT_FORM = 1553;
    /*Cant initialise form*/

    const TMM_TOO_MANY_TRANS = 1554;
    /*Too many transactions in load to print*/

    const TMM_FILE_FOR_REPORT = 1555;
    /*file % for report %*/

    const TMM_TOO_MANY_DP_PROD = 1556;
    /*Too many dp products in load spec to fit into message.*/

    const TMM_TOO_MANY_PROD_IN_SPEC = 1557;
    /*Too many products in load spec to fit into message.*/

    const TMM_WRONG_MSG_VER = 1564;
    /*Wrong message version %, should be %*/

    const TMM_SERVOMEGA_COMM_ERR = 1565;
    /*servomega comms ERROR: %*/

    const TMM_BAIMAN_FATAL_ERR = 1566;
    /*FATAL ERROR in baiman (%:%): %*/

    const TMM_EQUIP_EXPIRY_CHANG = 1567;
    /*% changed Equipment expiry date title % to %*/

    const TMM_PERSONNEL_EXPIRY_CHANG = 1568;
    /*% changed Personnel expiry date title % to %*/

    const TMM_PROD_RATIO_ERR = 1569;
    /*Prod:%, %-ratio %:% cannot be achieved for %, inj_vol %*/

    const TMM_LOAN_DELETE = 1570;
    /*%, Loan Company:%, Loan Seq:%: A record has been DELETED.*/

    const TMM_TANK_GROUP_DUP = 1571;
    /*Attempt to add Tank % (group %) to group %*/

    const TMM_TANK_SWITCH_LOCK_BAY = 1572;
    /*TANK_SWITCHING: locking bay %*/

    const TMM_TANK_SWITCH = 1573;
    /*TANK_SWITCHING: Changing from tank % to % on TPM %*/

    const TMM_TANK_SWITCH_MAKE = 1574;
    /*TANK_SWITCHING: Making tank % NOT AVAILABLE*/

    const TMM_TKR_LICENSE_EXP = 1575;
    /*Tanker(%) Rejected because tanker license is expired*/

    const TMM_TKR_DANGER_LICENSE_EXP = 1576;
    /*Tanker(%) Rejected because dangerous goods license is expired*/

    const TMM_TKR_INSURANCE_LICENSE_EXP = 1577;
    /*Tanker(%) Rejected because insurance license is expired*/

    const TMM_RESET_GAUG_COMM = 1578;
    /*Resetting all Tank gauging device comms for config update*/

    const TMM_NO_PRINTER = 1579;
    /*NO % printer for company:%, area:%, trm:%.*/

    const TMM_SERIAL_TO_WB_OPEN = 1580;
    /*WB:%, The serial port to weighbridge is open*/

    const TMM_SERIAL_TO_WB__CANT_OPEN = 1581;
    /*WB:%, Cant open the serial port to weighbridge*/

    const TMM_WB_MODEL_UNKNOWN = 1582;
    /*WB:%, The model of weighbridge is unknown*/

    const TMM_WB_NO_REPLY = 1583;
    /*WB:%, No reply from weighbridge, OMEGA try again*/

    const TMM_WB_SERIAL_STAT_UNKNOWN = 1584;
    /*WB:%, Serial port state of weighbridge is unknown*/

    const TMM_WB_PORT_DOWN = 1585;
    /*WB:%, Cant establish communication with the weighbridge after % tries, the port is down*/

    const TMM_WB_REP_FORMAT_UNKNOWN = 1586;
    /*WB:%, Unknown reply format from weighbridge*/

    const TMM_WB_REP_FORMAT_WRONG = 1587;
    /*WB:%, Wrong reply format from weighbridge*/

    const TMM_WB_GAP_ERR = 1588;
    /*WB:%, The weight gap between two weighs at weighbridge is greater than % KGRAM, OMEGA try again*/

    const TMM_WB_TRUCK_POSITION_ERR = 1589;
    /*WB:%, Truck incorrectly positioned, restarting card sequence*/

    const TMM_WB_NOT_STABLE = 1590;
    /*WB:%, Cant get STABLE weight, OMEGA try again*/

    const TMM_WB_CANT_SET_GROSS_MODE = 1591;
    /*WB:%, Cant set GROSS MODE, OMEGA try again*/

    const TMM_WB_N_CANT_SET_GROSS_MODE = 1592;
    /*WB:%, Cant set weighbridge to GROSS MODE after % tries, check the weighbridge setting*/

    const TMM_WB_WEIGHT_ACQUIRED = 1593;
    /*WB:%, A weight % KGRAM has been acquired by the weighbridge*/

    const TMM_WB_ECHO_BACK_ERR = 1594;
    /*WB:%, Cant get correct echo back afer % tries, check the weighbridge setting*/

    const TMM_WB_POINT_SET = 1595;
    /*WB:%, A setpoint: target weight=% KGRAM, has been set*/

    const TMM_LOG_REPLY_ERR = 1596;
    /*Cannt recognise replies from Amskan Log port.*/

    const TMM_DB_REPLY_ERR = 1597;
    /*Cannt recognise replies from Amskan db port.*/

    const TMM_AMSKAN_TAG_ADDED = 1598;
    /*Added % tags to Amskan DB.*/

    const TMM_AMSKAN_TAG_EDITED = 1599;
    /*Edited % tags to Amskan DB.*/

    const TMM_AMSKAN_CLEAR_ERR = 1600;
    /*Cannt send CLEAR command to Amskan DB port.*/

    const TMM_AMSKAN_TIME_ERR = 1601;
    /*Cannt send DEFINE TIME command to Amskan DB port.*/

    const TMM_AMSKAN_CANT_ADD_TAG = 1602;
    /*Cannt ADD tag % to Amskan DB.*/

    const TMM_AMSKAN_CANT_EDIT_TAG = 1603;
    /*Cannt EDIT (add/modify) tag % to Amskan DB.*/

    const TMM_AMSKAN_CANT_DEL_TAG = 1604;
    /*Cannt DELETE tag % to Amskan DB.*/

    const TMM_AMSKAN_CLEARED_DB = 1605;
    /*Cleared Amskan DataBase.*/

    const TMM_AMSKAN_DEFINED_TIME = 1606;
    /*Defined the time in Amskan.*/

    const TMM_AMSKAN_ADDED_TAG = 1607;
    /*Added tag % to Amskan DB.*/

    const TMM_AMSKAN_EDIT_TAG = 1608;
    /*Edit (added/modified) tag % in Amskan DB.*/

    const TMM_AMSKAN_DELETED_TAG = 1609;
    /*Deleted tag % from Amskan DB.*/

    const TMM_TAG_UNKNOWN = 1610;
    /*TAG:% is unknown to Omega database*/

    const TMM_CONF_TOO_MANY_METER = 1611;
    /*CONFIGURATION ERROR too many meters (%) (%:%).*/

    const TMM_CLEAN_LOADS = 1612;
    /*Cleaning up old loads*/

    const TMM_DELETE_SCHED = 1613;
    /*Deleting unused schedules*/

    const TMM_DELETE_ORDERS = 1614;
    /*Deleting expired cust orders*/

    const TMM_PRINT_INVOICE_CLOSEOUT = 1615;
    /*Printing Invoices AT CLOSEOUT*/

    const TMM_CHECK_ALLOC = 1616;
    /*Checking resettable allocations*/

    const TMM_DEL_PROD_MOVEMENT = 1617;
    /*Deleting completed product movement*/

    const TMM_SET_CLOSEOUT_DATE = 1618;
    /*Setting new closeout date*/

    const TMM_TIDY_RECON_DATA = 1619;
    /*Tidying up reconciliation data*/

    const TMM_CHECK_PERSON_EXP = 1620;
    /*Checking Personnel Expiry Dates*/

    const TMM_RESET_TANK_VOL = 1621;
    /*Re-setting tank volumes*/

    const TMM_UNLOCK_DB = 1622;
    /*Un-locking database*/

    const TMM_GENERATE_CLOSET_JNL = 1623;
    /*Generating closeout journal*/

    const TMM_CLOSEOUT_BACKUP = 1624;
    /*Closeout backup*/

    const TMM_CLEAN_FLEETCOM = 1625;
    /*Cleanup fleetcom*/

    const TMM_CLEAN_GAINLOSS = 1626;
    /*Cleanup gainloss*/

    const TMM_CLEAN_TANK_CLOSEOUT = 1627;
    /*Cleanup tank closeout*/

    const TMM_ERR_DROP_MSG = 1628;
    /*ERROR dropped a % message to % (%:%): %*/

    const TMM_CONF_ERR_DROP_MSG = 1629;
    /*CONFIGURATION ERROR dropped a % message to % (%:%).*/

    const TMM_MSG_DONT_KNOW = 1630;
    /*Dont know which message to format.*/

    const TMM_PROGRAM_ERR = 1631;
    /*PROGRAM error (%:%)*/

    const TMM_CANT_GET_UNLAOD_SPEC = 1632;
    /*Cant get UNLOAD_SPEC data (%)*/

    const TMM_MSG_CANT_CONVERT = 1633;
    /*Input msg, cant convert, %*/

    const TMM_CANT_GET_LAOD_DEL = 1634;
    /*Cant get Load Delete data %*/

    const TMM_CANT_GET_PMV = 1635;
    /*Cant get Pmv.Details data %*/

    const TMM_CANT_GET_PERSON = 1636;
    /*Cant get Person.Details data %*/

    const TMM_CANT_GET_TANKER = 1637;
    /*Cant get Tanker.Details data %*/

    const TMM_CANT_GET_ACCESSKEY = 1638;
    /*Cant get Accesskey.Details data %*/

    const TMM_CANT_GET_TKR_MOVEMENT = 1639;
    /*Cant get Tanker Movement data %*/

    const TMM_CANT_GET_LOAD_START = 1640;
    /*Cant get Load Started data %*/

    const TMM_CANT_GET_TRANS = 1641;
    /*Cant get Transaction Details data %*/

    const TMM_CANT_GET_WB_TRANS = 1642;
    /*Cant get Weighbridge Transaction Details data %*/

    const TMM_CANT_GET_LOAD = 1643;
    /*Cant get Load Details data %*/

    const TMM_CANT_GET_WB = 1644;
    /*Cant get Weighbridge Details data %*/

    const TMM_CANT_GET_REFUEL = 1645;
    /*Cant get Refuel Details data %*/

    const TMM_CANT_GET_DELIVERY_DOC = 1646;
    /*Cant get Delivery Document Request data %*/

    const TMM_CANT_GET_LOAD_SPEC_ERR = 1647;
    /*Cant get Load Spec Error data %*/

    const TMM_CANT_GET_ALLOC_CHANGE = 1648;
    /*Cant get Allocation Change data %*/

    const TMM_CANT_GET_TANK_REPORT = 1649;
    /*Cant get Tank Report: %*/

    const TMM_CANT_GET_TANK_CHANGE = 1654;
    /*Cant get Tank/Meter-Change data %*/

    const TMM_CANT_GET_DELIVERY_INFO = 1655;
    /*Cant get Delivery Info data %*/

    const TMM_CANT_GET_TRIP = 1656;
    /*Cant get Trip Data %*/

    const TMM_CANT_GET_FLEETCOM = 1657;
    /*Cant get fleetcom Data %*/

    const TMM_CANT_GET_TNAK_DET_REQ = 1659;
    /*Cant get Tank Det.Request data %*/

    const TMM_CANT_GET_LOAD_SPEC = 1660;
    /*Cant get Load Spec data %*/

    const TMM_CANT_GET_LOAD_ORDER = 1661;
    /*Cannot get Load Order data %*/

    const TMM_CANT_GET_BASE = 1662;
    /*Cant get Base.Details data %*/

    const TMM_CANT_GET_COMPANY = 1663;
    /*Cant get Company.Details data %*/

    const TMM_CANT_GET_TANK_GROUP = 1664;
    /*Cant get Tank Group.Details data %*/

    const TMM_CANT_GET_PROD = 1665;
    /*Cant get Prod.Details data %*/

    const TMM_CANT_GET_ETP = 1666;
    /*Cant get Etp.Details data %*/

    const TMM_MSG_TYPE_NOT_IMPLEMENT = 1667;
    /*Message type % not implemented*/

    const TMM_CANT_GET_JOURNAL = 1668;
    /*Cant get Journal Data %*/

    const TMM_MSG_TO_ALL_HOST_ERR = 1669;
    /*ERROR dropped a % message to ALL HOSTS : %*/

    const TMM_CANT_FIX_DELIVERY_INFO = 1670;
    /*Cant fix Delivery Info message for company %: %*/

    const TMM_CANT_FIX_ENTER_MSG = 1671;
    /*Cant fix Enter/Leave Site / Load Advice message for company %: %*/

    const TMM_CANT_FIX_LOAD_MSG = 1672;
    /*Cant fix Load Started/Delivery Document message for company %: %*/

    const TMM_CANT_FIX_TRANS_MSG = 1673;
    /*Cant fix Transaction/Load details for company %: %*/

    const TMM_CANT_FIX_REFUEL_MSG = 1674;
    /*Cant fix Refuel details for company %: %*/

    const TMM_CANT_FIX_LOAD_SPEC_ERR = 1675;
    /*Cant fix Load Spec error message for company %: %*/

    const TMM_CANT_FIX_ALLOC_CHANGE = 1676;
    /*Cant fix Allocation Change details for company %: %*/

    const TMM_CANT_FIX_METER_REPORT = 1677;
    /*Cant fix Meter Report for company %: %*/

    const TMM_CANT_FIX_TANK_REPORT = 1678;
    /*Cant fix Tank Report for company %: %*/

    const TMM_CANT_FIX_CLOSEOUT_REPORT = 1679;
    /*Cant fix Closeout Report for company %: %*/

    const TMM_CANT_FIX_TANK_CHANGE = 1680;
    /*Cant fix Tank/Meter change message for company %: %*/

    const TMM_CANT_FIX_LEAK_MSG = 1681;
    /*Cant fix Leak Alarm/Journal message for company %: %*/

    const TMM_CANT_FIX_TRIP_MSG = 1682;
    /*Cant fix Trip Data message for company %: %*/

    const TMM_INVALID_MSG_TYPE = 1683;
    /*Invalid message type %*/

    const TMM_INPUT_MSG_NO_TYPE = 1684;
    /*Input msg, no type from buf, %*/

    const TMM_INVALID_INPUT_MSG_TYPE = 1685;
    /*Invalid input msg type %*/

    const TMM_CMPY_NOT_ALLOW_MSG = 1686;
    /*Company % is not allowed to receive a % message, not sent*/

    const TMM_PRESET_NOT_CONFIRMED = 1687;
    /*Preset was NOT confirmed by OPERATOR at Accuload %,%*/

    const TMM_CMPT_NUMBER_ENTERED = 1688;
    /*Compartment Number entered at ACCULOAD %,% is:%*/

    const TMM_TRIP_NUMBER_ENTERED = 1689;
    /*Trip Number entered at ACCULOAD %,% is:%*/

    const TMM_SECOND_PIN_ENTERED = 1690;
    /*Second PIN entered at ACCULOAD %,% is:%*/

    const TMM_SECOND_PIN_INVALID = 1691;
    /*Second PIN entered at ACCULOAD %,% is:% INVALID*/

    const TMM_FIRST_PIN_INVALID = 1692;
    /*First PIN entered at ACCULOAD %,% is:% INVALID*/

    const TMM_DENSITY_TO_ACCU_ERR = 1693;
    /*Cant download DENSITY % to ACCULOAD %:%*/

    const TMM_AUTOPRESET_TO_ACCU_ERR = 1694;
    /*Cant download AUTOPRESET % to ACCUL%:%*/

    const TMM_ACCU_TO_COMM_MODE = 1695;
    /*Accuload % changed to COMMUNICATION_MODE*/

    const TMM_ALARM_AT_ACCU = 1696;
    /*% ALARM(S) at Accuload %, %*/

    const TMM_PERMISSIVE_NOT_CONNECTED = 1697;
    /*PERMISSIVE (interrupt.) is NOT connected at ACCU%,%*/

    const TMM_INTERRUPT_NOT_CONNECTED = 1698;
    /*Accuload %,%:INTERRUPTION PERMISSIVE is NOT connected*/

    const TMM_ACCU_COMM_DOEN = 1699;
    /*COMMS_DOWN at Accuload %, %*/

    const TMM_ACCU_IN_PROG_MODE = 1700;
    /*Accuload %, % in PROGRAMMING_MODE*/

    const TMM_ACCU_IN_STANDBY_MODE = 1701;
    /*Accuload %, % in STANDBY_MODE*/

    const TMM_ACCU_COMM_RESTORE = 1702;
    /*COMMUNICATIONS restored at Accuload %, %*/

    const TMM_WB_LOCKED = 1703;
    /*Weighbridge %, % is locked*/

    const TMM_WB_REQ_POST_UNLOAD_WEIGH = 1704;
    /*WB: %, % requesting POST UNload weighing trip:%,%*/

    const TMM_WB_FAIL_WEIGH_COMPONENT = 1705;
    /*WB:%, Failure to weigh all components*/

    const TMM_WB_REQ_POST_LOAD_WEIGH = 1706;
    /*WB: %, % requesting POST load weighing trip:%,%*/

    const TMM_WB_REQ_PRE_LOAD_WEIGH = 1707;
    /*WB: %, % requesting PRE load weighing trip:%,%*/

    const TMM_WB_PRIME_MOVER_FIRST = 1708;
    /*WB:%, Prime Mover must be at start of configuration*/

    const TMM_WB_CANT_CONF_TANKER = 1709;
    /*WB:%, % cant configure Tanker with given components*/

    const TMM_WB_NO_LEGAL_COMPONENT = 1710;
    /*WB:%, No legal components to identify tanker*/

    const TMM_WB_WEIGHT_PRIME_MOVER = 1711;
    /*WB:%, weight is %, prime mover weighs %*/

    const TMM_WB_MORE_TRAILERS = 1712;
    /*WB:%, cannot process more than two trailers on bridge*/

    const TMM_WB_WEIGHT_TRAILER = 1713;
    /*WB:%, weight is %, trailer weighs %*/

    const TMM_WB_NO_PROD = 1714;
    /*WB:% no available products for %*/

    const TMM_WB_NOT_SPECIFY_TRAILER = 1715;
    /*WB:% Prescheduled trip:%, supp:% does not specify trailer %*/

    const TMM_WB_NO_MORE_PROD = 1716;
    /*Weighbridge:% Trip:%,% has NO more products for %*/

    const TMM_WB_TRIP_STILL_LOADING = 1717;
    /*WB:% trip:%, supp:% is still loading*/

    const TMM_WB_TRIP_COMPLETE_ALREADY = 1718;
    /*WB:% trip:%, supp:% is already complete*/

    const TMM_WB_NO_CAPACITY_CONF = 1719;
    /*WB:% equipment % has no capacity configured*/

    const TMM_WB_NO_FOLLOWED_PROCEDURE = 1720;
    /*WB:%, % has NOT followed switch loading procedures*/

    const TMM_WB_CANT_CREATE_LOAD_SPEC = 1721;
    /*WB:%, cannot create load specification*/

    const TMM_WB_FAIL_WEIGH_EQUIP = 1722;
    /*WB:%, Failed to weigh all equipment*/

    const TMM_WB_UNEXPECT_CHANGE = 1723;
    /*WB:%, % unexpected change of % Kg*/

    const TMM_WB_ILLEGAL_WEIGHT = 1724;
    /*WB:%, Illegal weight for load %*/

    const TMM_WB_TKR_WEIGHT = 1725;
    /*WB:%, Tanker % weight is %, allowable:%*/

    const TMM_WB_ONLY_INCOMPLETE_LOAD = 1726;
    /*WB:%, can only complete INCOMPLETE loads*/

    const TMM_WB_PROG_ERR = 1727;
    /*WB:%, PROGRAM ERROR - not all equipment is weighed*/

    const TMM_WB_REQ_PRE_UNLOAD = 1728;
    /*WB: %, % requesting PRE UNload weighing trip :%,%*/

    const TMM_WB_REQ_NON_WB = 1732;
    /*WB: %, % requesting a NON-weighbridge trip :%,%*/

    const TMM_WB_DOCKET_FIRST = 1733;
    /*WB:%, % must collect docket for trip %,% before starting new one.*/

    const TMM_TKR_ON_WB = 1734;
    /*%, Tkr:% % on weighbridge %*/

    const TMM_WB_ONLY_1_CMPT_TRAILER = 1735;
    /*WB:%, only 1-compartment trailers accepted on weighbridge, % has %*/

    const TMM_WB_NOT_MORE_PIECE = 1736;
    /*WB:%, Cant have more than % pieces of equipment*/

    const TMM_WB_IS_LOCKED = 1737;
    /*WB:% is locked*/

    const TMM_WB_KEY_INVALID = 1738;
    /*WB:%, key % is invalid*/

    const TMM_NOT_MORE_OPERATOR = 1739;
    /*WB:%, cannot accept more than one operator*/

    const TMM_WB_CANT_ACCEPT_TKR = 1740;
    /*WB:%, cannot accept configured tanker as well as trailers*/

    const TMM_WB_TKR_NO_COMPONENT = 1741;
    /*WB:%, cannot accept tanker with NO components*/

    const TMM_WB_NOT_MORE_TKR = 1742;
    /*WB:%, cannot accept more than one tanker*/

    const TMM_WB_NOT_MORE_EQUIP = 1743;
    /*WB:%, cannot accept equipment % more than once*/

    const TMM_WB_LOGIC_OFF = 1744;
    /*WB:%, card reader has state LOGIC_OFF*/

    const TMM_WB_DISABLE_PHYS_OFF = 1745;
    /*WB:%, card reader has state DISABLED, PHYS_OFF*/

    const TMM_WGHMAN_START_SETPOINT = 1746;
    /*wghman starting % with setpoint values: low is %, low_low is %*/

    const TMM_WGHMAN_START_NO_SETPOINT = 1747;
    /*wghman starting % with NO setpoint (LDCF_INCONFG is N)*/

    const TMM_PRN_USE_REPORT = 1748;
    /*REPORT*/

    const TMM_PRN_USE_DOCUMENT = 1749;
    /*DOCUMENT*/

    const TMM_PRN_USE_INSTRUCT = 1750;
    /*INSTRUCT*/

    const TMM_PRN_USE_JOURNAL = 1751;
    /*JOURNAL*/

    const TMM_PRN_USE_ORDER = 1752;
    /*ORDER*/

    const TMM_PRN_USE_SCHED = 1753;
    /*SCHED*/

    const TMM_PRN_USE_LOAD = 1754;
    /*LOAD*/

    const TMM_PRN_USE_BAY = 1755;
    /*BAY*/

    const TMM_PRN_USE_DELIVER = 1756;
    /*DELIVER*/

    const TMM_PRN_USE_PAY = 1757;
    /*PAY*/

    const TMM_PRN_USE_MOVE = 1758;
    /*MOVE*/

    const TMM_PRN_USE_VEHI = 1759;
    /*VEHI*/

    const TMM_PRN_USE_DOC = 1760;
    /*DOC*/

    const TMM_PRN_USE_FAIL = 1761;
    /*FAIL*/

    const TMM_PRN_USE_CONFIG = 1762;
    /*CONFIG*/

    const TMM_PRN_USE_COMMS = 1763;
    /*COMMS*/

    const TMM_PRN_USE_ALARM = 1764;
    /*ALARM*/

    const TMM_PRN_USE_SYS = 1765;
    /*SYS*/

    const TMM_PRN_USE_SCADA = 1766;
    /*SCADA*/

    const TMM_PRN_USE_LD_REPORT = 1767;
    /*LD_REPORT*/

    const TMM_PRN_USE_INVOICE = 1768;
    /*INVOICE*/

    const TMM_PRN_USE_ORDERCONF = 1769;
    /*ORDERCONF*/

    const TMM_PRN_USE_BOR_LOAN = 1770;
    /*BOR_LOAN*/

    const TMM_PRN_USE_TRANSFER = 1771;
    /*TRANSFER*/

    const TMM_PRN_USE_VERIFY = 1772;
    /*VERIFY*/

    const TMM_PRN_USE_DLV_LOC_DOC = 1773;
    /*DLV_LOC_DOC*/

    const TMM_PRN_USE_RECEIPT_DOC = 1774;
    /*RECEIPT_DOC*/

    const TMM_JNL_REP_COLUMN_DATE = 1775;
    /*Date*/

    const TMM_JNL_REP_COLUMN_TIME = 1776;
    /*Time*/

    const TMM_JNL_REP_COLUMN_EVENT = 1777;
    /*Event*/

    const TMM_JNL_REP_COLUMN_CLASS = 1778;
    /*Class*/

    const TMM_JNL_REP_COLUMN_COMPANY = 1779;
    /*Company*/

    const TMM_JNL_REP_COLUMN_MESSAGE = 1780;
    /*Message*/

    const TMM_ENV_NOT_SET = 1781;
    /*Environment [%] not set.*/

    const TMM_UNIT_SCALE_C = 1782;
    /*C*/

    const TMM_UNIT_SCALE_F = 1783;
    /*F*/

    const TMM_UNIT_SCALE_PA = 1784;
    /*Pa*/

    const TMM_UNIT_SCALE_PSI = 1785;
    /*psi*/

    const TMM_UNIT_SCALE_ATM = 1786;
    /*atm*/

    const TMM_UNIT_SCALE_L_AMB = 1787;
    /*l (amb)*/

    const TMM_UNIT_SCALE_M3_AMB = 1788;
    /*m3 (amb)*/

    const TMM_UNIT_SCALE_GAL_IMP_AMB = 1789;
    /*gal IMP (amb)*/

    const TMM_UNIT_SCALE_GAL_US_AMB = 1790;
    /*gal US (amb)*/

    const TMM_UNIT_SCALE_BBL_IMP_AMB = 1791;
    /*bbl IMP (amb)*/

    const TMM_UNIT_SCALE_BBL_US_AMB = 1792;
    /*bbl US (amb)*/

    const TMM_UNIT_SCALE_L_COR = 1793;
    /*l (cor)*/

    const TMM_UNIT_SCALE_M3_COR = 1794;
    /*m3 (cor)*/

    const TMM_UNIT_SCALE_GAL_IMP_COR = 1795;
    /*gal IMP (cor)*/

    const TMM_UNIT_SCALE_GAL_US_COR = 1796;
    /*gal US (cor)*/

    const TMM_UNIT_SCALE_BBL_IMP_COR = 1797;
    /*bbl IMP (cor)*/

    const TMM_UNIT_SCALE_BBL_US_COR = 1798;
    /*bbl US (cor)*/

    const TMM_UNIT_SCALE_KG = 1799;
    /*kg*/

    const TMM_UNIT_SCALE_LB = 1800;
    /*lb*/

    const TMM_UNIT_SCALE_TON = 1801;
    /*ton*/

    const TMM_UNIT_SCALE_TON_IMP = 1802;
    /*ton IMP*/

    const TMM_UNIT_SCALE_KG_M3_AMB = 1803;
    /*kg/m3 (amb)*/

    const TMM_UNIT_SCALE_LB_IN3_AMB = 1804;
    /*lb/in3 (amb)*/

    const TMM_UNIT_SCALE_KG_M3_COR = 1805;
    /*kg/m3 (cor)*/

    const TMM_UNIT_SCALE_LB_IN3_COR = 1806;
    /*lb/in3 (cor)*/

    const TMM_UNIT_SCALE_IN = 1807;
    /*in*/

    const TMM_UNIT_SCALE_FT = 1808;
    /*ft*/

    const TMM_UNIT_SCALE_M = 1809;
    /*m*/

    const TMM_UNIT_SCALE_L = 1810;
    /*l*/

    const TMM_UNIT_SCALE_M3 = 1811;
    /*m3*/

    const TMM_UNIT_SCALE_GAL_IMP = 1812;
    /*gal IMP*/

    const TMM_UNIT_SCALE_GAL_US = 1813;
    /*gal US*/

    const TMM_UNIT_SCALE_BBL_IMP = 1814;
    /*bbl IMP*/

    const TMM_UNIT_SCALE_BBL_US = 1815;
    /*bbl US*/

    const TMM_UNIT_SCALE_ML = 1816;
    /*ml*/

    const TMM_BA_TYPE_UNKNOWN = 1817;
    /*???*/

    const TMM_BA_TYPE_TRANSACTION_OBP = 1818;
    /*TRANSACTION_OBP*/

    const TMM_BA_TYPE_UNLOADING_OBP = 1819;
    /*UNLOADING_OBP*/

    const TMM_BA_TYPE_BLC80_BAY = 1820;
    /*BLC80_BAY*/

    const TMM_BA_TYPE_WEIGHBRIDGE = 1821;
    /*WEIGHBRIDGE*/

    const TMM_BA_TYPE_TC_WEIGHBRIDGE = 1822;
    /*TC_WEIGHBRIDGE*/

    const TMM_BA_TYPE_FLEX_DRUM_FILL = 1823;
    /*FLEX_DRUM_FILL*/

    const TMM_BA_TYPE_OLD_ACCULOAD = 1824;
    /*OLD_ACCULOAD*/

    const TMM_OMINIT_STARTUP = 1860;

    const TMM_OMINIT_MKDIR_CORE_FAIL = 1861;

    const TMM_OMINIT_ILLEGAL_RUN_LEVEL = 1862;

    const CIUPLUS_COMMS_DOWN = 1866;

    const TANK_MODIFY = 1867;
    /*% modified Tank data for % to Temp:%, Density:%, Obs:%, Std:%, Mass:%, Level:%*/

    const ID_KEY_UPDATE = 1868;
    /* % modified identification assigment for issuer % and assignment number % */

    const ID_KEY_DELETE = 1869;
    /* % deleted identification assigment for issuer % and assignment number % */

    const ID_KEY_ADD = 1870;
    /* % added identification assigment for issuer % and assignment number % */

    const SPOOL_FAIL = 1871;
    /* Couldn't open spool file in % errno=% */

    const RECORD_ALTERED = 1872;
    /* % altered % record % */

    const RECORD_ADD = 1873;
    /* % added % record % */

    const RECORD_DELETE = 1874;
    /* % deleted % record % */

    const OLD_LOAD_CLEANUP = 1875;
    /* Cleaning up old loads */

    const DEL_UNUSED_SCHEDS = 1876;
    /* Deleting expired new non-movement schedules */

    const DEL_EXPIRED_CORDER = 1877;
    /* Deleting expired cust orders */

    const CLOSE_PRINT_INVOICES = 1878;
    /* Printing Invoices at CLOSEOUT */

    const CHECK_RESETTABLE_ALLOCS = 1879;
    /* Checking resettable allocations */

    const DEL_COMPLETE_PMVS = 1880;
    /* Deleting completed product movements */

    const SET_NEW_CO_DATE = 1881;
    /* Setting new closeout date */

    const RECONCILE_TIDY = 1882;
    /* Tidying up reconciliation data */

    const PRSNNL_EXP_DATE_CHCK = 1883;
    /* Checking Personnel Expiry Dates */

    const TANK_VOL_RESET = 1884;
    /* Re_setting tank volumes */

    const DB_UNLOCK = 1885;
    /* Un-locking database */

    const GEN_CO_JRNL = 1886;
    /* Generating closeout journal */

    const CO_BACKUP = 1887;
    /* Closeout backup */

    const FLEETCOM_CLEANUP = 1888;
    /* Cleanup fleetcom */

    const GAINLOSS_CLEANUP = 1889;
    /* Cleanup gainloss */

    const TNK_CO_CLEANUP = 1890;
    /* Cleanup tank closeout */

    const CO_COMPLETE_OK = 1891;
    /* Closeout completed successfully */

    const TMM_ORD_PROD_DATE_ERROR = 1892;
    /* End Date cannot be before Start Date */

    const TMM_ORD_PROD_DATE_CLASH = 1893;
    /* Period clashes with other */

    const TMM_ORD_PROD_NOT_FOUND = 1894;
    /* Product cannot be allocated */

    const TMM_CUST_ORDER_UNDEFINED = 1895;
    /* Order: % is undefined */

    const TMM_CUST_ORDER_EXPIRED = 1896;
    /* Order: % expired on %, cannot schedule */

    const TMM_CUST_ORDER_NOT_APPROVED = 1897;
    /* Order: % NOT approved: % */

    const TMM_CUST_ORDER_NOT_DELIV_DATE = 1898;
    /* Order: % delivery date % not reached, cannot schedule */

    const TMM_CUST_ORDER_NO_PROD_LEFT = 1899;
    /* Order: % has no product quantities left */

    const TMM_TEXT_ANY = 1900;
    /* ANY */

    const TMM_STD_NOTHING = 1901;
    /* */

    const TMM_STD_TANK_CD = 1902;
    /* Tank: % */

    const TMM_STD_BAY_CD = 1903;
    /* Bay: % */

    const TMM_STD_ARM_NR = 1904;
    /* Arm: % */

    const TMM_STD_SPEC = 1905;
    /* Spec: (%:%) */

    const TMM_STD_TRIP = 1906;
    /* Trip: % */

    const TMM_STD_LOAD_NR = 1907;
    /* Load: % */

    const TMM_STD_COMPARTMENT = 1908;
    /* Cmpt: % */

    const TMM_STD_AMB_QTY = 1909;
    /* Amb: % */

    const TMM_STD_STD_QTY = 1910;
    /* Std: % */

    const TMM_STD_MASS_QTY = 1911;
    /* Mass: % */

    const TMM_STD_VOL_QTY = 1912;
    /* Vol: % */

    const TMM_STD_OPEN_AMB = 1913;
    /* OpenAmb: % */

    const TMM_STD_CLOSE_AMB = 1914;
    /* CloseAmb: % */

    const TMM_STD_OPEN_STD = 1915;
    /* OpenStd: % */

    const TMM_STD_CLOSE_STD = 1916;
    /* CloseStd: % */

    const TMM_STD_OPEN_MASS = 1917;
    /* OpenMass: % */

    const TMM_STD_CLOSE_MASS = 1918;
    /* CloseMass: % */

    const TMM_STD_UNKNOWN_QTY = 1919;
    /* - */

    const TMM_STD_UNKNOWN_METER_TOT = 1920;
    /* -- */

    const TMM_STD_TRANSACTION_NR = 1921;
    /* TransactionNr: % */

    const TMM_STD_TRANSFER_NR = 1922;
    /* TransferNr: % */

    const TMM_STD_OPERATOR_CD = 1923;
    /* Operator: % */

    const TMM_STD_TANKER_CD = 1924;
    /* Tanker: % */

    const TMM_STD_ERROR_MSG_FROM_OBP = 1925;
    /* Error: % */

    const TMM_STD_JOURNAL_MSG_FROM_OBP = 1926;
    /* Msg: % */

    const TMM_STD_START_TIME = 1927;
    /* Start: % */

    const TMM_STD_END_TIME = 1928;
    /* End: % */

    const TMM_STD_DRAWER_PRODUCT = 1929;
    /* Prod: (%:%) */

    const TMM_STD_BASE_PRODUCT = 1930;
    /* Base: % */

    const TMM_STD_TEMPERATURE = 1931;
    /* Temp: % */

    const TMM_STD_DENSITY = 1932;
    /* Dens: % */

    const TMM_BAY_RETURNS_ENTRY = 1934;
    /* Returns entered at bay. %, %, %, % */

    const TMM_BAY_NULL_TRANS = 1935;
    /* Transaction with no volumes (NULL TRANSACTION), %, % */

    const TMM_BAY_TRS_METER_TOTALS = 1936;
    /* Transaction Meter Totals. %, %, %, %, %, %, %, %, % */

    const TMM_BAY_AUTHORISED_TO_LOAD = 1937;
    /* Authorised to load. %, %, %, %, %, %, % */

    const TMM_BAY_ERROR_FROM_OBP = 1938;
    /* Error from Loading Bay. %, % */

    const TMM_BAY_JOURNAL_FROM_OBP = 1939;
    /* Journal from Loading Bay. %, % */

    const TMM_BAY_COMMS_UP = 1940;
    /* Bay Comms Up. % */

    const TMM_BAY_COMMS_DOWN = 1941;
    /* Bay Comms Down. % */

    const TMM_BAY_TRANSACTION_ENDED = 1942;
    /* Transaction ended. %, %, %, %, %, %, %, %, % */

    const TMM_BAY_STD_TRANSFER = 1943;
    /* Transfer Details. %, %, %, %, %, %, %, %, %, %, % */

    const TMM_BAY_STD_TRANSFER_BASE = 1944;
    /* Transfer Base. %, %, %, %, %, %, %, %, %, %, % */

    const TMM_BAY_STD_TRANSFER_ADDI = 1945;
    /* Transfer Additive. %, %, %, %, %, %, %, % */

    const TMM_REJ_CANT_GET_SPEC_DATA = 1946;
    /* Cannot get load spec data */

    const TMM_REJ_CANT_START_LOAD = 1947;
    /* Cannot start load (DB Error) */

    const TMM_REJ_CANT_START_TRANSACTION = 1948;
    /* Cannot start transaction (DB Error) */

    const TMM_REJ_CANT_FIND_TRIP = 1949;
    /* Neither Spec nor Order found */

    const TMM_BAY_CARD_CHECK_FAILED = 1950;
    /* Authorisation failed. %, %, %, % */

    const TMM_STD_PHYS_CARD_TYPE = 1951;
    /* KeyType: % */

    const TMM_STD_CARD_CONTENTS = 1952;
    /* KeyContents: % */

    const TMM_STD_REJECT_REASON = 1953;
    /* Reason: % */

    const TMM_STD_DRAWER_CD = 1954;
    /* Drawer: % */

    const TMM_BAY_ACCESS_CHECK_FAILED = 1955;
    /* Authorisation failed. %, %, %, % */

    const TMM_BAY_GETTING_SPEC_FAILED = 1956;
    /* Authorisation failed. %, %, %, %, %, % */

    const TMM_REJ_NO_PSN_FOR_KEY = 1957;
    /* No Person found for Key */

    const TMM_STD_UNKNOWN_TANKER = 1958;
    /* - */

    const TMM_REJ_PSN_LOCKED_OUT = 1959;
    /* Operator Locked Out */

    const TMM_STD_UNKNOWN_OPERATOR = 1960;
    /* - */

    const TMM_REJ_NOT_ALLOWED_IN_AREA = 1961;
    /* Operator not allowed in Area */

    const TMM_REJ_TIME_LOCK_ACTIVE = 1962;
    /* Operator not allowed at this time */

    const TMM_REJ_NO_DRAWER = 1963;
    /* No Drawer found */

    const TMM_REJ_NO_TKR_FOR_KEY = 1964;
    /* No Tanker found for Key */

    const TMM_REJ_TANKER_LOCKED = 1965;
    /* Tanker locked */

    const TMM_REJ_TANKER_PERMIT_EXPIRED = 1966;
    /* Tanker Permit Expired */

    const TMM_REJ_NEED_SEAL = 1967;
    /* Seal Number required for spec */

    const TMM_REJ_CANT_GET_SUPPLIER = 1968;
    /* Cannot find Supplier for Trip */

    const TMM_REJ_TANKER_NOT_IN_SPEC = 1969;
    /* Tanker is not in Spec */

    const TMM_BAY_AUTH_FAILED_PROG_OR_DB_ERR = 1970;
    /* Authorisation failed. %, %, % */

    const TMM_STD_CODE_LOCATION = 1971;
    /* (%:%) */

    const TMM_REJ_PROG_ERR = 1972;
    /* Program Error */

    const TMM_REJ_DB_ERR = 1973;
    /* Database Error */

    const TMM_BAY_AUTH_FAILED_SIMPLE_REASON = 1974;
    /* Authorisation failed. %, % */

    const TMM_REJ_BAY_LOCKED = 1975;
    /* Bay locked */

    const TMM_REJ_TANK_SWITCHING = 1976;
    /* Bay locked for tank switching */

    const TMM_REJ_ALREADY_LOADING = 1977;
    /* Tanker has another active load */

    const TMM_REJ_LOAD_COMPLETE = 1978;
    /* Load is already complete */

    const TMM_REJ_NO_SPEC_PRODS = 1979;
    /* No Products Specified */

    const TMM_BAY_TRANSACTION_ENDED_BADLY = 1980;
    /* Transaction not properly stored in Database. %, % */

    const TMM_REJ_OPERATOR_PERMIT_EXPIRED = 1981;
    /* Operator Permit Expired */

    const TMM_BAY_OMEGA_CONFIG_ERR = 1982;
    /* Bay process detected an OMEGA configuration error. % */

    const TMM_ERR_NO_BAYS_DEFINED = 1983;
    /* No bays defined */

    const TMM_ERR_NO_DEVICES_DEFINED = 1984;
    /* No loading devices defined */

    const TMM_BAY_BAY_CONFIG_ERR = 1985;
    /* Bay configuration error detected. % % */

    const TMM_ERR_NO_METERS_DEFINED = 1986;
    /* No Meters defined for Bay */

    const TMM_ERR_NO_TANKS_DEFINED = 1987;
    /* No Tanks connected to Bay */

    const TMM_ERR_NO_BASES_DEFINED = 1988;
    /* No Base Products defined */

    const TMM_ERR_NO_KEYS_DEFINED = 1989;
    /* No Access Keys defined */

    const TMM_ERR_BAD_PRODUCT_DEF = 1990;
    /* Bad Product Definition in OMEGA (no ratios) */

    const TMM_BAY_TRANSACTION_STORE_ERROR = 1991;
    /* Error while attempting to store transaction details. % % % */

    const TMM_STD_DETAIL = 1992;
    /* Detail: % */

    const TMM_ERR_CANT_STORE_TRANSACTION = 1993;
    /* Transactions DB table */

    const TMM_ERR_CANT_STORE_TRANSFER = 1994;
    /* Transfers DB table */

    const TMM_ERR_CANT_STORE_TRANBASE = 1995;
    /* Tranbase DB table */

    const TMM_ERR_CANT_STORE_BA_METERS = 1996;
    /* BA_METERS DB table */

    const TMM_BAY_MESSAGE_ERROR = 1997;
    /* Can't understand message from bay. % % */

    const TMM_STD_MSG_TYPE = 1998;
    /* Message Type: % */

    const TMM_MSG_TYPE_TRANSACTION_DETAILS = 1999;
    /* Transaction Details */

    const TMM_BAY_DUPLICATE_TRANSACTION = 2000;
    /* Transaction has already ended, assume it is a DUPLICATE. % % */

    const TMM_REJ_NO_ALLOCATION = 2001;
    /* No Allocation */

    const TMM_REJ_CANT_CREATE_SPEC_FROM_ORDER = 2002;
    /* Can't generate Load Specification from Order */

    const TMM_REJ_TANKER_DOESNT_MATCH_SPEC = 2003;
    /* Tanker differs from Load Spec */

    const TMM_ERR_CANT_UPDATE_TANK_LIFTINGS = 2004;
    /* Update Liftings from Tank */

    const TMM_REJ_ORDER_NOT_SCHEDULABLE = 2005;
    /* Order not schedulable */

    const TMM_ENGLISH_TEXT_ONLY_SYS_ERR = 2006;
    /* % */

    const TMM_LOAD_CREATED = 2007;
    /* Load created. % % % % */

    const TMM_CLOSEOUT_TAB_LOCK_TRY = 2008;
    /* Tried lock tables % times */

    const TMM_CLOSEOUT_TAB_LOCK_FAILED = 2009;
    /* Failed of locking tables */

    const TMM_CLOSEOUT_TAB_LOCK_RELEASE = 2010;
    /* Release tables' locks */

    const TMM_CLOSEOUT_FAILED = 2011;
    /* Failed */

    const MSG_HEADER_FAILED = 2012;
    /* Msg Header Wrong. */

    const REJ_CANT_FIND_CUST_SUPP = 2013;
    /* Could not find CUST_SUPP for this CUST_ACCT(%s). */

    const REJ_CANT_FIND_CUST_ACCT = 2014;
    /* Could not find this CUST_ACCT(%s). */

    const CANT_FIND_CARRIER = 2015;
    /* Could not find Carrier Company. */

    const REJ_CANT_FIND_CUSTOMER = 2016;
    /* Could not find customer for supplier:%s,customer: %s. */

    const REJ_CANT_FIND_CUSTOMER_ACCOUNT = 2017;
    /* Could not find customer Account . */

    const UNKNOWN_ORDER_NO_AND_CUST_ORDER_NO = 2018;
    /* Unknown order no, cust_order_no */

    const ORDER_NO_CONFLICT = 2019;
    /* Order No in struct incompatible with Order_No in DB. */

    const PERIOD_DATE_VERIFY_FAILED = 2020;
    /* Period data verifiation FAILED. */

    const DELIVERY_CODE_CONFLICT = 2021;
    /* Inconsistent Delivery Location Code(%s) */

    const NO_ADDRESS_WITHOUT_NAME = 2022;
    /* No address without name.  */

    const WRONG_ORDER_STATE = 2023;
    /* Wrong order state.  */

    const TMM_UPDATED_ORDER = 2024;
    /*% updated Order:% Customer:% Supplier:% SupplyPoint:% Terminal:%*/

    const TMM_OPEN_ORDER_ADD_PROD = 2025;
    /*[%] added Product:[%], Product Company:[%] to Open Order, Order No:[%] */

    const TMM_OPEN_ORDER_MOD_PROD = 2026;
    /*[%] modifed Product:[%], Product Company:[%] to Open Order, Order No:[%] */

    const REJ_CANT_FIND_CUST_CODE = 2027;
    /* Could not find Customer Compsny Code for Supplier:[%],Customer_Account:[%] */

    const TMM_UNKNOWN_DLV_NAME = 2028;
    /*Unknown Delivery Location Name:[%] */

    const TMM_UNKNOWN_CUST_CODE = 2029;
    /* Unknown Customer Code:[%] */

    const TMM_UNKNOWN_PROD_UNIT = 2030;
    /* Unknown Product Unit:[%] */

    const HOST_COMMS_SCHED_OPEN_ORDER = 2031;
    /* Sale_Id(ERP_ORDER_NO):[%], CustCode:[%], SuppCode:[%],DrawCode:[%],Tanker:[%] has been scheduled into Trip:[%]. */

    const HOST_COMMS_ADD_PSN_LOCAL = 2032;
    /* Added Personnel Locally: User Id:%, User Name: % */

    const HOST_COMMS_UPDATE_PSN_LOCAL = 2033;
    /* Updated Personnel Locally: User Id:%, User Name: % */

    const HOST_COMMS_LOCK_PSN_LOCAL = 2034;
    /* Locked Personnel Locally: User Id:%, User Name: % */

    const HOST_COMMS_UNLOCK_PSN_LOCAL = 2035;
    /* Un-Locked Personnel Locally: User Id:%, User Name: % */

    const HOST_COMMS_ADD_PSN_REMOTE = 2036;
    /* Added Personnel Remotely: User Id:%, User Name: % */

    const HOST_COMMS_UPDATE_PSN_REMOTE = 2037;
    /* Updated Personnel Remotely: User Id:%, User Name: % */

    const HOST_COMMS_LOCK_PSN_REMOTE = 2038;
    /* Locked Personnel Remotely: User Id:%, User Name: % */

    const HOST_COMMS_UNLOCK_PSN_REMOTE = 2039;
    /* Un-Locked Personnel Remotely: User Id:%, User Name: % */

    const HOST_COMMS_LOGOUT = 2041;
    /* Omega-ML System Logout */

    const HOST_COMMS_DEL_TRIP = 2042;
    /* Deleted: Trip % */

    const HOST_COMMS_UPDATE_DENSITY = 2043;
    /* Updated Base Product Density: % Product, Origin Density: %, Current Density: % */

    const HOST_COMMS_LOADING_BAY_CONTROL_LOCAL = 2044;
    /* Loading Bay Status Control: % Loading Bay, Set to control by Locally. */

    const HOST_COMMS_LOADING_BAY_CONTROL_REMOTE = 2045;
    /* Loading Bay Status Control: % Loading Bay, Set to control by Remotely. */

    const HOST_COMMS_UPDATE_FACTOR = 2046;
    /* Update Factor: % Loading Bay, Origin Factor: %, Current Factor: %. */

    const HOST_COMMS_UPDATE_BAY_DENSITY = 2047;
    /* Updated Laoding Bay Density: % Product, Origin Density: %, Current Density: % */

    const HOST_COMMS_CHANGE_BAY = 2048;
    /* Change Loading Bay: % Trip, Origin % Bay, Changed to % Bay. */

    const HOST_COMMS_LOAD_CONPENSATION_L = 2049;
    /* Loading Compensation: % Trip, Product Compensation % L. */

    const HOST_COMMS_LOAD_CONPENSATION_KG = 2050;
    /* Loading Compensation: % Trip, Product Compensation % KG. */

    const HOST_COMMS_CORRECT_METER_L = 2051;
    /* Correct Meter: % Bay, Correct Meter  % L. */

    const HOST_COMMS_CORRECT_METER_KG = 2052;
    /* Correct Meter: % Bay, Correct Meter  % KG. */

    const HOST_COMMS_UPDATE_TEMP_COMPENSATION = 2053;
    /* Update Temperature Compensation: Set % Delivery Location, % Product Compensation Temperature is: %. */

    const HOST_COMMS_LOGIN = 2054;
    /* Omega-ML System Login */

    const HOST_COMMS_WAY_NO_NOT_EXIST = 2055;
    /* For ERP_Order[%], WAY_NO[%] does not exist in OmegaML DB. */

    const HOST_COMMS_PROD_NOT_MATCH_WAY_NO = 2056;
    /* For ERP_Order[%], Product[%] not available for WAY_NO[%]. */

    const HOST_COMMS_CHANGED_ARM = 2057;
    /* Arm Code has been changed from % to % for Trip[%],Supp[%],Cmpt[%]. */

    const TMM_REJ_TRIP_EXPIRED = 2058;
    /* Trip Expired. */

    const TMM_ERP_ORDER_NOT_MAPPING = 2059;
    /* ERP_ORDER/Sale_Id[%],Additive_Ok[%],Sale_Type[%]:Cannot Mapping. */

    const TMM_BAY_STD_TRANSFER_EX = 2062;
    /* Temperature compensation. %, %, %, % */

    const TMM_STD_PUB_QTY = 2063;
    /* Pub: % */

    const TMM_STD_PUB_TEMP = 2064;
    /* Pub Temp: % */

    const TMM_STD_PUB_DENS = 2065;
    /* Pub Dens: % */

    const TMM_STD_VCF = 2066;
    /* VCF: % */

    const TMM_PROD_RATIO_ADD = 2067;
    /* Drawer ratio added: drawer: %, base: %, ratio: %, blend tolerance flag: %, lower limit: %, upper limit: % */

    const TMM_PROD_RATIO_MOD = 2068;
    /* Drawer ratio modifed: drawer: %, base: %, ratio: %, blend tolerance flag: %, lower limit: %, upper limit: % */

    const TMM_PROD_RATIO_DEL = 2069;
    /* Drawer ratio deleted: drawer %, base % */

    const TMM_PIN_CHANGED = 2070;
    /* PIN changed for card [%] at bay [%] */

    const TMM_BAY_BLEND_TOLERANCE_DETAIL = 2071;
    /* Blend tolerance exceeded. Comp %, Base prod %, avl: %, amb: %, ratio: %, posi: %, neg: % */

    const TMM_BAY_BLEND_TOLERANCE_FAIL = 2072;
    /* Blend tolerance failed. Terminal: %, load id: % */

    const TMM_BAY_BLEND_TOLERANCE_PASS = 2073;
    /* Blend tolerance passed. Terminal: %, load id: % */

    const TMM_BAY_BLEND_TOLERANCE_FORCE = 2074;
    /* Blend tolerance check approved by supervisor. Terminal: %, load id: % */

    const TMM_BAY_LOAD_TOLERANCE_DETAIL = 2075;
    /* Load tolerance exceeded. Comp %, Base prod %, amb: %, sched: % ratio: %, posi: %, neg: % */

    const TMM_BAY_LOAD_TOLERANCE_FAIL = 2076;
    /* Load tolerance failed. Terminal: %, load id: % */

    const TMM_BAY_LOAD_TOLERANCE_PASS = 2077;
    /* Load tolerance passed. Terminal: %, load id: % */

    const TMM_BAY_LOAD_TOLERANCE_FORCE = 2078;
    /* Load tolerance check approved by supervisor. Terminal: %, load id: % */

    const TMM_TANK_METER_CHANGE_EX = 2079;
    /* % changed Meter % from Tank % to Tank %*/

    const TMM_K_VALUE_CHANGED = 2080;
    /* BAY [%] ARM [%] % changed from % to % */

    const TMM_K_METER_CHANGED = 2081;
    /* BAY [%] ARM [%] METER [%] factor changed from % to % */

    const TMM_K_PROD_CHANGED = 2082;
    /* BAY [%] ARM [%] PROD [%] % changed from % to % */

    const DELETE_PERSON = 2085;
    /* Deleting expired personnels */

    const LOCK_PERSON = 2086;
    /* Locking expired personnels */

    const TMM_WB_WEIGH_IN_GENERAL = 2087;
    /*Tkr % weigh in; total weight %*/

    const TMM_WB_WEIGH_OUT_GENERAL = 2088;
    /*Tkr % weigh out; total weight %*/

    const TMM_TICKET = 2089;
    /*Load % (trip %) (Site %) (Nomination key %) (Nomination item %) (ver %, %) completed*/

    const DEL_COMPL_SCHEDS = 2090;
    /* Deleting expired completed non-movement schedules */

    const DEL_NEW_MOV = 2091;
    /* Deleting expired new movements */

    const DEL_USED_MOV = 2092;
    /* Deleting expired used movements */

}
