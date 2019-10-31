
  CREATE OR REPLACE FORCE VIEW "GUI_ALLOCATIONS" ("ALLOC_TYPE", "ALLOC_TYPENAME", "ALLOC_CMPYCODE", "ALLOC_CMPYNAME", "ALLOC_SUPPCODE", "ALLOC_SUPPNAME", "ALLOC_LOCK", "ALLOC_LOCKNAME", "ALLOC_PERIOD", "ALLOC_PERIODNAME", "ALLOC_DATETIME") AS 
  select
	alloc.LOCKATYP_AT_TYPE			as ALLOC_TYPE
	, ctype.COMPANY_NAME			as ALLOC_TYPENAME
	, alloc.LOCKATYP_AT_CMPY		as ALLOC_CMPYCODE
	, acmpy.CMPY_NAME				as ALLOC_CMPYNAME
	, alloc.LOCKAL_SUPL				as ALLOC_SUPPCODE
	, scmpy.CMPY_NAME				as ALLOC_SUPPNAME
	, alloc.LOCKAL_LOCK				as ALLOC_LOCK
	, ltype.ALLOC_LOCK_NAME			as ALLOC_LOCKNAME
	, alloc.LOCKAL_PERIOD			as ALLOC_PERIOD
	, ptype.ALLOC_PERIOD_NAME		as ALLOC_PERIODNAME
	, alloc.LOCKAL_DMY				as ALLOC_DATETIME
from
	LOCKAL							alloc
	, COMPANY_TYP 					ctype
	, COMPANYS						acmpy
	, COMPANYS						scmpy
	, ALLOC_LOCK_TYP				ltype
	, ALLOC_PERIOD_TYP				ptype
where
-- 	( ( (SYS_CONTEXT('CONN_CONTEXT', 'ISMANAGER') = 'N') and (scmpy.CMPY_CODE = SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE')) )
	( ( (SYS_CONTEXT('CONN_CONTEXT', 'ISMANAGER') = 'N') 
	   and (scmpy.CMPY_CODE = SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE') 
-- 	    or (alloc.LOCKATYP_AT_TYPE=1 and acmpy.CMPY_CODE = SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE'))) )
	    or (acmpy.CMPY_CODE = SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE'))
		or (alloc.LOCKATYP_AT_TYPE=2 and acmpy.CMPY_CODE in (select child_cmpy_code from company_relation where parent_cmpy_code=SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE') and parent_cmpy_role=1 and child_cmpy_role=2) ) 
		) ) 
	or ( SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE') IS NULL )
	or ( SYS_CONTEXT('CONN_CONTEXT', 'ISMANAGER') = 'Y' )
	or ( SYS_CONTEXT('CONN_CONTEXT', 'ISMANAGER') IS NULL) )
	and alloc.LOCKATYP_AT_TYPE = ctype.COMPANY_ID
	and alloc.LOCKATYP_AT_CMPY = acmpy.CMPY_CODE
	and alloc.LOCKAL_SUPL = scmpy.CMPY_CODE
	and alloc.LOCKAL_LOCK = ltype.ALLOC_LOCK_ID
	and alloc.LOCKAL_PERIOD = ptype.ALLOC_PERIOD_ID(+);
