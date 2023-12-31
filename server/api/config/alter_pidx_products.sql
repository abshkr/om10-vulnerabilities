/*
    Add the following new columns in table PRODUCTS for the feature of Petroleum Industry Data eXchange (PIDX) standards at a terminal:

    PROD_PIDX_CODE:    12 Alphanumeric long
                       A code which identifies the product loaded. 
                       Codes used are the Oil Industry Common PIDX Product Codes. 
                       The Finished Product and Component Product codes are maintained and available from the Downstream E-Business Subcommittee. 
                       If the Product Type Code is is an additive use “ADD” here and identify custom value for additive in the Additive Code below.    
*/

alter table PRODUCTS add PROD_PIDX_CODE VARCHAR2(12);



-- update GUI_PRODUCTS to add new columns
CREATE OR REPLACE FORCE VIEW GUI_PRODUCTS AS
select
    prod.PROD_CODE                  as PROD_CODE
    , prod.PROD_CMPY                as PROD_CMPYCODE
    , dcmp.CMPY_NAME                as PROD_CMPYNAME
    , prod.PROD_NAME                as PROD_NAME
    , prod.PROD_PROD_GROUP          as PROD_GROUP
    , pgrp.PGR_DESCRIPTION          as PROD_GROUPNAME
    , prod.PROD_PRICE               as PROD_PRICE
    , prod.PROD_PRICE_UNIT          as PROD_PRICEUNIT
    , prod.PROD_CLASS               as PROD_CLASS
    , gprd.GEN_PROD_DESC            as PROD_CLASSDESC
    , prod.PROD_TXT_COLOUR          as PROD_TEXTCOLOR
    , prod.PROD_BACK_COLOUR         as PROD_BACKCOLOR
    , prod.PROD_IMAGE               as PROD_IMAGE
    , prod.PROD_RPT_UNIT            as PROD_RPTUNIT
    , unit.DESCRIPTION              as PROD_RPTUNITNAME
    , prod.PROD_RPT_TEMP            as PROD_RPTTEMP
    , prod.PROD_NUMBER              as PROD_NUMBER
    , prod.PROD_IS_LOCKED           as PROD_IS_LOCKED
    , prod.PROD_IS_BLEND            as PROD_IS_BLEND
    , prod.PROD_LDTOL_FLAG          as PROD_LDTOL_FLAG
    , prod.PROD_LDTOL_PTOL          as PROD_LDTOL_PTOL
    , prod.PROD_LDTOL_NTOL          as PROD_LDTOL_NTOL
    , prod.PROD_IS_COMPLIANT        as PROD_IS_COMPLIANT
    , pflg.PROD_CHECK_HOT_VOLUME    as PROD_CHECK_HOT_VOLUME
    , prod.PROD_15_DENSITY          as PROD_15_DENSITY
    , prod.PROD_HOT_TEMP            as PROD_HOT_TEMP
    , prod.PROD_CHECK_2ND_DRAWER    as PROD_CHECK_2ND_DRAWER
    , prod.PROD_2ND_DRAWER          as PROD_2ND_DRAWER
    , dcmp2.CMPY_NAME               as PROD_2ND_DRAWER_NAME
    , prod.PROD_2ND_PRODUCT         as PROD_2ND_PRODUCT
    , prod.PROD_DESC                as PROD_DESC
    , prod2.PROD_NAME               as PROD_2ND_PRODUCT_NAME
    , prod.PROD_GUARDMASTER_CODE    as PROD_GUARDMASTER_CODE
    , prod.PROD_GUARDMASTER_QUALITY as PROD_GUARDMASTER_QUALITY
    , prod.PROD_PIDX_CODE           as PROD_PIDX_CODE
    , qlty.QUALITY_CODE             as PROD_GUARDMASTER_QLTYCODE
    , qlty.QUALITY_NAME             as PROD_GUARDMASTER_QLTYNAME
    , hzch.HZCF_ID                  as PROD_HAZID
    , hzch.HZCF_NAME                as PROD_HAZNAME
    , hzch.HZCF_CLASS               as PROD_HAZCLASS
    , hzch.HZCF_HZ_CODE             as PROD_HAZCODE
    , hzch.HZCF_SUB_RISK            as PROD_HAZRISK
    , hzch.HZCF_EMRG                as PROD_HAZEMRG
    , hzch.HZCF_PACK_GROUP          as PROD_HAZPACKGRP
    , hzch.HZCF_PACK_METHOD         as PROD_HAZPACKMTHD
from
    PRODUCTS                        prod
    , GUI_COMPANYS                  dcmp
    , PRODUCT_GROUP                 pgrp
    , UNIT_SCALE_VW                 unit
    , HZ_LINK                       hzlk
    , HAZCHEM                       hzch
    , (
            select
                gp.GEN_PROD_CODE
                , decode( gu.PROD_COUNT, NULL, 0, gu.PROD_COUNT)                                    as PROD_COUNT
                , gp.GEN_PROD_CODE||' ('||decode( gu.PROD_COUNT, NULL, 0, gu.PROD_COUNT)||') '      as GEN_PROD_DESC
            from
                GENERIC_PROD  gp
                , (
                    select PROD_CLASS, count(PROD_CODE) as PROD_COUNT from PRODUCTS where 1=1 group by PROD_CLASS
                ) gu
            where
                gp.GEN_PROD_CODE = gu.PROD_CLASS(+)
    ) gprd
    , (
        select
            rt.RAT_PROD_PRODCMPY
            , rt.RAT_PROD_PRODCODE
            , max(NVL(bp.BASE_LIMIT_PRESET_HT,0)) as                PROD_CHECK_HOT_VOLUME
        from
            RATIOS          rt
            , BASE_PRODS    bp
        where rt.RATIO_BASE=bp.BASE_CODE
        group by rt.RAT_PROD_PRODCMPY, rt.RAT_PROD_PRODCODE
    ) pflg
    , GUI_COMPANYS                  dcmp2
    , PRODUCTS                      prod2
    , PRODUCT_QUALITYS              qlty
where
    ( ( (SYS_CONTEXT('CONN_CONTEXT', 'ISMANAGER') = 'N') and (dcmp.CMPY_CODE = SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE')) )
    or ( SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE') IS NULL )
    or ( SYS_CONTEXT('CONN_CONTEXT', 'ISMANAGER') = 'Y' )
    or ( SYS_CONTEXT('CONN_CONTEXT', 'ISMANAGER') IS NULL) )
    and prod.PROD_CODE = pflg.RAT_PROD_PRODCODE(+)
    and prod.PROD_CMPY = pflg.RAT_PROD_PRODCMPY(+)
    and prod.PROD_CMPY = dcmp.CMPY_CODE
    and prod.PROD_PROD_GROUP = pgrp.PGR_CODE(+)
    and prod.PROD_RPT_UNIT = unit.UNIT_ID(+)
    and prod.PROD_CMPY = hzlk.HZLNK_SP_PRODCMPY(+)
    and prod.PROD_CODE = hzlk.HZLNK_SP_PRODCODE(+)
    and hzlk.HZ_LINK_ID = hzch.HZCF_ID(+)
    and prod.PROD_CLASS = gprd.GEN_PROD_CODE(+)
    and prod.PROD_2ND_DRAWER = dcmp2.CMPY_CODE(+)
    and prod.PROD_2ND_DRAWER = prod2.PROD_CMPY(+)
    and prod.PROD_2ND_PRODUCT = prod2.PROD_CODE(+)
    and prod.PROD_GUARDMASTER_QUALITY = qlty.QUALITY_ID(+)
/
