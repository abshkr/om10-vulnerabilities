
  CREATE OR REPLACE FORCE VIEW "GUI_ALLOCATION_ADJUSTS" ("ADJST_TYPE", "ADJST_TYPENAME", "ADJST_CMPYCODE", "ADJST_CMPYNAME", "ADJST_PRODCODE", "ADJST_PRODNAME", "ADJST_SUPPCODE", "ADJST_SUPPNAME", "ADJST_QTYUSED", "ADJST_PRODUNIT", "ADJST_UNITNAME", "ADJST_LOADID", "ADJST_TERMINAL", "ADJST_TANKER", "ADJST_CARRIER", "ADJST_TRIPNO", "ADJST_TRIPSUPP", "ADJST_LOADEND", "ADJST_SCHDDATE") AS 
  select
	adjst.ADJALL_ALL_ATKY_AT_TYPE		as ADJST_TYPE
	, ctype.COMPANY_NAME				as ADJST_TYPENAME
	, adjst.ADJALL_ALL_ATKY_AT_CMPY		as ADJST_CMPYCODE
	, acmpy.CMPY_NAME					as ADJST_CMPYNAME
	, adjst.ADJALL_ALL_PROD_PRODCODE	as ADJST_PRODCODE
	, aprod.PROD_NAME					as ADJST_PRODNAME
	, adjst.ADJALL_ALL_PROD_PRODCMPY	as ADJST_SUPPCODE
	, pcmpy.CMPY_NAME					as ADJST_SUPPNAME
	, adjst.ADJUST_QTY					as ADJST_QTYUSED
	, adjst.ADJUST_UNIT					as ADJST_PRODUNIT
	, aunit.DESCRIPTION					as ADJST_UNITNAME
	, adjst.ADJTRSA_LOAD_ID										as ADJST_LOADID
	, adjst.ADJTRSA_LD_TRM||' - '||trmnl.TERM_NAME				as ADJST_TERMINAL
	, loads.LOAD_TANKER											as ADJST_TANKER
	, loads.LOAD_CARRIER||' - '||ccmpy.CMPY_NAME				as ADJST_CARRIER
	, sched.SHLS_TRIP_NO										as ADJST_TRIPNO
	, sched.SHLS_SUPP||' - '||scmpy.CMPY_NAME					as ADJST_TRIPSUPP
	, loads.LOAD_DMY											as ADJST_LOADEND
	, sched.SHLS_CALDATE										as ADJST_SCHDDATE
from
	ADJUSTS							adjst
	, COMPANY_TYP 					ctype
	, COMPANYS						acmpy
	, PRODUCTS 						aprod
	, COMPANYS						pcmpy
	, UNIT_SCALE_VW					aunit
	, SCHEDULE						sched
	, LOADS							loads
	, TERMINAL						trmnl
	, COMPANYS						ccmpy
	, COMPANYS						scmpy
where
-- 	( ( (SYS_CONTEXT('CONN_CONTEXT', 'ISMANAGER') = 'N') and (pcmpy.CMPY_CODE = SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE')) )
	( ( (SYS_CONTEXT('CONN_CONTEXT', 'ISMANAGER') = 'N') 
	   and (pcmpy.CMPY_CODE = SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE') 
-- 	    or (adjst.ADJALL_ALL_ATKY_AT_TYPE=1 and acmpy.CMPY_CODE = SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE'))) )
	    or (acmpy.CMPY_CODE = SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE'))
		or (adjst.ADJALL_ALL_ATKY_AT_TYPE=2 and acmpy.CMPY_CODE in (select child_cmpy_code from company_relation where parent_cmpy_code=SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE') and parent_cmpy_role=1 and child_cmpy_role=2) ) 
		) ) 
	or ( SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE') IS NULL )
	or ( SYS_CONTEXT('CONN_CONTEXT', 'ISMANAGER') = 'Y' )
	or ( SYS_CONTEXT('CONN_CONTEXT', 'ISMANAGER') IS NULL) )
	and adjst.ADJALL_ALL_ATKY_AT_TYPE = ctype.COMPANY_ID
	and adjst.ADJALL_ALL_ATKY_AT_CMPY = acmpy.CMPY_CODE
	and adjst.ADJALL_ALL_PROD_PRODCODE = aprod.PROD_CODE
	and adjst.ADJALL_ALL_PROD_PRODCMPY = aprod.PROD_CMPY
	and adjst.ADJALL_ALL_PROD_PRODCMPY = pcmpy.CMPY_CODE
	and adjst.ADJUST_UNIT = aunit.UNIT_ID(+)
	and adjst.ADJTRSA_LD_TRM = loads.LD_TERMINAL
	and adjst.ADJTRSA_LOAD_ID = loads.LOAD_ID
	and trmnl.TERM_CODE = loads.LD_TERMINAL
	and sched.SHLSLOAD_LD_TRM = loads.LD_TERMINAL
	and sched.SHLSLOAD_LOAD_ID = loads.LOAD_ID
	and loads.LOAD_CARRIER = ccmpy.CMPY_CODE
	and sched.SHLS_SUPP = scmpy.CMPY_CODE;
