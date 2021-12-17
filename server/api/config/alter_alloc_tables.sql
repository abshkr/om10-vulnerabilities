/*
    Add the following new columns in table LOCKAL:
    LOCKAL_START_DMY: The Effective date/time field for RESET lock type; The Period-start date/time field for PERIOD lock type for the full allocation 
    LOCKAL_END_DMY: The Expiry date/time field for RESET lock type; The Period-end date/time field for PERIOD lock typefor the full allocation 
    LOCKAL_NEXT_DMY: The additional date time fields to capture the next date for the RESET types
    LOCKAL_COMMENTS: The additional free text comments for user defined message
*/

alter table LOCKAL add LOCKAL_START_DMY DATE;
alter table LOCKAL add LOCKAL_END_DMY DATE;
alter table LOCKAL add LOCKAL_NEXT_DMY DATE;
alter table LOCKAL add LOCKAL_COMMENTS VARCHAR2(1000);


-- update GUI_ALLOCATIONS to add new columns

CREATE OR REPLACE FORCE  VIEW GUI_ALLOCATIONS AS 
select
    alloc.LOCKATYP_AT_TYPE          as ALLOC_TYPE
    , ctype.COMPANY_NAME            as ALLOC_TYPENAME
    , alloc.LOCKATYP_AT_CMPY        as ALLOC_CMPYCODE
    , acmpy.CMPY_NAME               as ALLOC_CMPYNAME
    , alloc.LOCKAL_SUPL             as ALLOC_SUPPCODE
    , scmpy.CMPY_NAME               as ALLOC_SUPPNAME
    , alloc.LOCKAL_LOCK             as ALLOC_LOCK
    , ltype.ALLOC_LOCK_NAME         as ALLOC_LOCKNAME
    , alloc.LOCKAL_PERIOD           as ALLOC_PERIOD
    , ptype.ALLOC_PERIOD_NAME       as ALLOC_PERIODNAME
    , alloc.LOCKAL_DMY              as ALLOC_DATETIME
    , alloc.LOCKAL_START_DMY        as ALLOC_START_DATE
    , alloc.LOCKAL_END_DMY          as ALLOC_END_DATE
    , alloc.LOCKAL_NEXT_DMY         as ALLOC_NEXT_DATE
    , alloc.LOCKAL_COMMENTS         as ALLOC_COMMENTS
    , alloc.LOCKATYP_AT_TYPE || ' - ' || ctype.COMPANY_NAME            as ALLOC_TYPEDESC
    , alloc.LOCKATYP_AT_CMPY || ' - ' || acmpy.CMPY_NAME               as ALLOC_CMPYDESC
    , alloc.LOCKAL_SUPL || ' - ' || scmpy.CMPY_NAME                    as ALLOC_SUPPDESC
    , alloc.LOCKAL_LOCK || ' - ' || ltype.ALLOC_LOCK_NAME              as ALLOC_LOCKDESC
    , DECODE(alloc.LOCKAL_PERIOD, NULL, '', alloc.LOCKAL_PERIOD || ' - ' || ptype.ALLOC_PERIOD_NAME)          as ALLOC_PERIODDESC
from
    LOCKAL                          alloc
    , COMPANY_TYP                   ctype
    , COMPANYS                      acmpy
    , COMPANYS                      scmpy
    , ALLOC_LOCK_TYP                ltype
    , ALLOC_PERIOD_TYP              ptype
where
--  ( ( (SYS_CONTEXT('CONN_CONTEXT', 'ISMANAGER') = 'N') and (scmpy.CMPY_CODE = SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE')) )
    ( ( (SYS_CONTEXT('CONN_CONTEXT', 'ISMANAGER') = 'N')
       and (scmpy.CMPY_CODE = SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE')
--      or (alloc.LOCKATYP_AT_TYPE=1 and acmpy.CMPY_CODE = SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE'))) )
        or (acmpy.CMPY_CODE = SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE'))
        or (alloc.LOCKATYP_AT_TYPE=2 and acmpy.CMPY_CODE in (select child_cmpy_code from company_relation where parent_cmpy_code=SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE') and parent_cmpy_role=1 and child_cmpy_role=2 and status=1) )
        ) )
    or ( SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE') IS NULL )
    or ( SYS_CONTEXT('CONN_CONTEXT', 'ISMANAGER') = 'Y' )
    or ( SYS_CONTEXT('CONN_CONTEXT', 'ISMANAGER') IS NULL) )
    and alloc.LOCKATYP_AT_TYPE = ctype.COMPANY_ID
    and alloc.LOCKATYP_AT_CMPY = acmpy.CMPY_CODE
    and alloc.LOCKAL_SUPL = scmpy.CMPY_CODE
    and alloc.LOCKAL_LOCK = ltype.ALLOC_LOCK_ID
    and alloc.LOCKAL_PERIOD = ptype.ALLOC_PERIOD_ID(+)
/



