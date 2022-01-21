  CREATE OR REPLACE FORCE VIEW GUI_ACCESS_KEYS AS 
  select
	akey.KYA_KEY_NO 			as KYA_KEY_NO
	, akey.KYA_KEY_ISSUER		as KYA_KEY_ISSUER
	, issr.CMPY_NAME			as KYA_ISSUER_NAME
	, akey.KYA_TYPE				as KYA_TYPE
	, ktyp.KEY_NAME				as KYA_TYPE_NAME
	, akey.KYA_PHYS_TYPE		as KYA_PHYS_TYPE
	, ptyp.KEY_PHYS_NAME		as KYA_PHYS_NAME
	, akey.KYA_TIMECD			as KYA_TIMECODE
	, akey.KYA_LOCK				as KYA_LOCK
	, akey.KYA_ADHOC			as KYA_ADHOC
	, akey.KYA_TXT				as KYA_TXT
	, akey.KYA_DMY				as KYA_KEY_CREATED
	, akey.KYA_PIN				as KYA_PIN
	, akey.KYA_LAST_PIN_CHG		as KYA_PIN_CHANGED
	, akey.KYA_PSN				as KYA_PERSONNEL
	, psnl.PER_NAME             as KYA_PSNL_NAME
	, psnl.PER_CMPY				as KYA_PSNL_CMPY
	, pcmp.CMPY_NAME			as KYA_PSNL_CMPY_NAME
	, akey.KYA_ROLE				as KYA_ROLE
	, prol.AUTH_LEVEL_NAME		as KYA_ROLE_NAME
	, akey.KYA_DRAWER			as KYA_DRAWER
	, drwr.CMPY_NAME			as KYA_DRAW_NAME
	, akey.KYA_SP_SUPPLIER		as KYA_SUPPLIER
	, supp.CMPY_NAME            as KYA_SUPP_NAME
	, akey.KYA_TANKER			as KYA_TANKER
	, tnkr.TNKR_NAME			as KYA_TNKR_NAME
	, tnkr.TNKR_OWNER			as KYA_TNKR_CMPY
	, tcmp.CMPY_NAME			as KYA_TNKR_CMPY_NAME
	, tnkr.TNKR_CARRIER			as KYA_TNKR_CARRIER
	, tcrr.CMPY_NAME			as KYA_TNKR_CARRIER_NAME
	, akey.KYA_EQUIPMENT		as KYA_EQUIPMENT
	, eqpt.EQPT_CODE			as KYA_EQPT_CODE
	, eqpt.EQPT_TITLE			as KYA_EQPT_NAME
    , DECODE(eqpt.EQPT_TITLE, NULL, TO_CHAR(eqpt.EQPT_CODE), eqpt.EQPT_CODE||'['||eqpt.EQPT_TITLE||']') as KYA_EQPT_DESC
	, eqpt.EQPT_OWNER			as KYA_EQPT_CMPY
	, ecmp.CMPY_NAME			as KYA_EQPT_CMPY_NAME
	, etyp.ETYP_TITLE     		as KYA_ETYP_NAME
	, akey.KYA_LOAD_LD_TRM		as KYA_LOAD_SITE
	, term.TERM_NAME			as KYA_SITE_NAME
	, akey.KYA_LOAD_LOAD_ID		as KYA_LOAD_ID
	, schd.SHLS_TRIP_NO 		as KYA_TRIP_NO
	, akey.KYA_ALLOC_TYPE		as KYA_ALLOC_TYPE
	, atyp.COMPANY_NAME			as KYA_ALLOC_TYPE_NAME
	, akey.KYA_ALLOC_CMPY		as KYA_ALLOC_CMPY
	, acmp.CMPY_NAME			as KYA_ALLOC_CMPY_NAME
	, akey.CUST_ORDER_NO		as KYA_ORDER_NO
	, cord.ORDER_CUST_ORDNO		as KYA_CUST_ORDNO
	, ccmp.CMPY_NAME			as KYA_CUST_NAME
from
	ACCESS_KEYS akey
	, COMPANYS issr
	, KEY_TYP ktyp
	, KEY_PHYS_TYP ptyp
	, PERSONNEL psnl
	, COMPANYS pcmp
	, AUTH_LEVEL_TYP prol
	, COMPANYS drwr
	, COMPANYS supp
	, TANKERS tnkr
	, COMPANYS tcmp
    , COMPANYS tcrr
	, TRANSP_EQUIP eqpt
	, COMPANYS ecmp
	, EQUIP_TYPES etyp
	, COMPANY_TYP atyp
	, COMPANYS acmp
	, CUST_ORDER cord
	, CUSTOMER cust
	, COMPANYS ccmp
	, TERMINAL term
	, SCHEDULE schd
where
	( ( (SYS_CONTEXT('CONN_CONTEXT', 'ISMANAGER') = 'N') and (akey.KYA_KEY_ISSUER = SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE')) )
	or ( SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE') IS NULL )
	or ( SYS_CONTEXT('CONN_CONTEXT', 'ISMANAGER') = 'Y' )
	or ( SYS_CONTEXT('CONN_CONTEXT', 'ISMANAGER') IS NULL) )
	and akey.KYA_KEY_ISSUER = issr.CMPY_CODE(+)
	and akey.KYA_TYPE = ktyp.KEY_ID(+)
	and akey.KYA_PHYS_TYPE = ptyp.KEY_PHYS_ID(+)
	and akey.KYA_PSN = psnl.PER_CODE(+)
	and psnl.PER_CMPY = pcmp.CMPY_CODE(+)
	and akey.KYA_ROLE = prol.AUTH_LEVEL_ID(+)
	and akey.KYA_DRAWER = drwr.CMPY_CODE(+)
	and akey.KYA_SP_SUPPLIER = supp.CMPY_CODE(+)
	and akey.KYA_TANKER = tnkr.TNKR_CODE(+)
	and tnkr.TNKR_OWNER = tcmp.CMPY_CODE(+)
	and tnkr.TNKR_CARRIER = tcrr.CMPY_CODE(+)
	and akey.KYA_EQUIPMENT = eqpt.EQPT_ID(+)
	and eqpt.EQPT_OWNER = ecmp.CMPY_CODE(+)
	and eqpt.EQPT_ETP = etyp.ETYP_ID(+)
	and akey.KYA_ALLOC_TYPE = atyp.COMPANY_ID(+)
	and akey.KYA_ALLOC_CMPY = acmp.CMPY_CODE(+)
	and akey.CUST_ORDER_NO = cord.ORDER_NO(+)
	and cord.ORDER_CUST = cust.CUST_ACCT(+)
	and cust.CUST_CODE = ccmp.CMPY_CODE(+)
	and akey.KYA_LOAD_LD_TRM = schd.SHLSLOAD_LD_TRM(+)
	and akey.KYA_LOAD_LOAD_ID = schd.SHLSLOAD_LOAD_ID(+)
	and schd.SHLSLOAD_LD_TRM = term.TERM_CODE(+)
;
/
