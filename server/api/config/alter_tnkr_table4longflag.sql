/*
    Add the following new columns in table TANKERS to identify long vehicles at a terminal:
    TNKR_LONG_VEHICLE: a flag at tanker level to indicate if the tanker is a long vehicle.
*/

alter table TANKERS add TNKR_LONG_VEHICLE VARCHAR2(2) DEFAULT 'N';


-- update GUI_TANKERS to add new columns

CREATE OR REPLACE FORCE VIEW GUI_TANKERS
AS 
select 
    tnkr.TNKR_CODE as TNKR_CODE
	, tnkr.TNKR_NUMBER as TNKR_NUMBER
    , tnkr.TNKR_NAME as TNKR_NAME
    , tnkr.TNKR_CARRIER as TNKR_CARRIER
    , carr.CMPY_NAME as TNKR_CARRIER_NAME
    , tnkr.TNKR_OWNER as TNKR_OWNER
    , mngr.CMPY_NAME as TNKR_OWNER_NAME
    , tnkr.TNKR_ETP as TNKR_ETP
    , etyp.ETYP_TITLE as TNKR_EQPT_NAME
    , tnkr.TNKR_BASE_SITE as TNKR_BASE_SITE
    , base.TERM_NAME as TNKR_BASE_SITE_NAME
    , tnkr.TNKR_DEST_DEPOT as TNKR_DEST_DEPOT
    , dest.TERM_NAME as TNKR_DEST_DEPOT_NAME
    , tnkr.TNKR_LAST_DEPOT as TNKR_LAST_DEPOT
    , prev.TERM_NAME as TNKR_LAST_DEPOT_NAME
    , tnkr.TNKR_CUR_DEPOT as TNKR_CUR_DEPOT
    , curr.TERM_NAME as TNKR_CUR_DEPOT_NAME
    , tnkr.TNKR_PIN as TNKR_PIN
    , NVL(tnkr.TNKR_LOCK, 'N') as TNKR_LOCK
    , NVL(tnkr.TNKR_ACTIVE, 'N') as TNKR_ACTIVE
    , NVL(tnkr.TNKR_BAY_LOOP_CH, 'N') as TNKR_BAY_LOOP_CH
    , NVL(tnkr.TNKR_ARCHIVE, 'N') as TNKR_ARCHIVE
    , NVL(tnkr.TNKR_LONG_VEHICLE, 'N') as TNKR_LONG_VEHICLE
    , tnkr.TNKR_NTRIPS as TNKR_NTRIPS
    , tnkr.TNKR_OWN_TXT as TNKR_OWN_TXT
    , tnkr.TNKR_LIC_EXP as TNKR_LIC_EXP
    , tnkr.TNKR_DGLIC_EXP as TNKR_DGLIC_EXP
    , tnkr.TNKR_INS_EXP as TNKR_INS_EXP
    , tnkr.STATS as TNKR_STATS
    , tnkr.LAST_TRIP as TNKR_LAST_TRIP
    , tnkr.TNKR_MAX_KG as TNKR_MAX_KG
    , tnkr.TNKR_LAST_MODIFIED as TNKR_LAST_MODIFIED
    , tnkr.TNKR_LAST_USED as TNKR_LAST_USED
    , tnkr.REMARKS AS REMARKS
    , etyp.ETYP_CATEGORY as ETYP_CATEGORY
	, tnkr.SLP_ID
	, tnkr.SLP_EXPIRY
from
    TANKERS tnkr
    , EQUIP_TYPES etyp
    , COMPANYS carr
    , COMPANYS mngr
    , TERMINAL base
    , TERMINAL dest
    , TERMINAL prev
    , TERMINAL curr
where
    ( 
-- 		(SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'N' and tnkr.TNKR_OWNER = SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE'))
		( SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'N' 
			and ( tnkr.TNKR_OWNER = SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE')
				or ( tnkr.TNKR_CARRIER = SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE') )
				or ( tnkr.TNKR_OWNER in (select child_cmpy_code from company_relation where parent_cmpy_code=SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE') and parent_cmpy_role=1 and child_cmpy_role=2 and status=1) ) 
				or ( tnkr.TNKR_CARRIER in (select child_cmpy_code from company_relation where parent_cmpy_code=SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE') and parent_cmpy_role=1 and child_cmpy_role=2 and status=1) ) 
			)
		)
        or SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE') IS NULL
        or SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'Y'
        or SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') IS NULL)
    and tnkr.TNKR_ETP = etyp.ETYP_ID(+)
    and tnkr.TNKR_CARRIER = carr.CMPY_CODE(+)
    and tnkr.TNKR_OWNER = mngr.CMPY_CODE(+)
    and tnkr.TNKR_BASE_SITE = base.TERM_CODE(+)
    and tnkr.TNKR_DEST_DEPOT = dest.TERM_CODE(+)
    and tnkr.TNKR_LAST_DEPOT = prev.TERM_CODE(+)
    and tnkr.TNKR_CUR_DEPOT = curr.TERM_CODE(+);

/
