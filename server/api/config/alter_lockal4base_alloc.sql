/*
    Add the following new column in table LOCKAL:
    LOCKAL_OWNER: it is a 16 bytes of company code, mainly stores 
        a. the exchange supplier code in Supplier Type Allocation - identify the supplier who can exchange the products with the allocation company which is another supplier, and the column LOCKAL_SUPL is always "BaSePrOd"
        b. the customer's supplier code in Customer Type Base Allocation - identify the supplier who has the customer account of the allocation company which is a customer type company, the column LOCKAL_SUPL is always "BaSePrOd"
        c. NULL in other types of allocation.
*/

alter table LOCKAL add LOCKAL_OWNER VARCHAR2(16);


-- update GUI_ALLOCATIONS to add new columns

CREATE OR REPLACE FORCE  VIEW GUI_ALLOCATIONS AS 
select
    alloc.LOCKAL_INDEX              as ALLOC_INDEX
    , alloc.LOCKATYP_AT_TYPE        as ALLOC_TYPE
    , ctype.COMPANY_NAME            as ALLOC_TYPENAME
    , alloc.LOCKATYP_AT_CMPY        as ALLOC_CMPYCODE
    , acmpy.CMPY_NAME               as ALLOC_CMPYNAME
    , alloc.LOCKAL_SUPL             as ALLOC_SUPPCODE
    , scmpy.CMPY_NAME               as ALLOC_SUPPNAME
    , alloc.LOCKAL_OWNER            as ALLOC_OWNERCODE
    , ocmpy.CMPY_NAME               as ALLOC_OWNERNAME
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
    , DECODE(alloc.LOCKAL_OWNER, NULL, '', alloc.LOCKAL_OWNER || ' - ' || ocmpy.CMPY_NAME)                    as ALLOC_OWNERDESC
    , alloc.LOCKAL_LOCK || ' - ' || ltype.ALLOC_LOCK_NAME              as ALLOC_LOCKDESC
    , DECODE(alloc.LOCKAL_PERIOD, NULL, '', alloc.LOCKAL_PERIOD || ' - ' || ptype.ALLOC_PERIOD_NAME)          as ALLOC_PERIODDESC
from
    LOCKAL                          alloc
    , COMPANY_TYP                   ctype
    , COMPANYS                      acmpy
    , COMPANYS                      scmpy
    , COMPANYS                      ocmpy
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
    and alloc.LOCKAL_OWNER = ocmpy.CMPY_CODE(+)
    and alloc.LOCKAL_LOCK = ltype.ALLOC_LOCK_ID
    and alloc.LOCKAL_PERIOD = ptype.ALLOC_PERIOD_ID(+)
/


