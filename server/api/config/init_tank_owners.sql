/*
    define the SITE_USE_PROD_OWNERSHIP for usage of Product Ownership in Omega system
    Y: Enable the Product Ownership in Omega system
    N: Disable the Product Ownership in Omega system
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_USE_PROD_OWNERSHIP';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_USE_PROD_OWNERSHIP', 'N', 'Use Product Ownership in Omega system', NULL );

commit;



-- initialize the TK_OWNERS with the site manager company if the tank does not have an owner yet.
insert into TK_OWNERS (
    TKCMPY_LINK
    , TKLINK_TANKCODE
    , TKLINK_TANKDEPO
    , TKOWNER_QTY
    , TKO_STD_LTR
    , TKO_AMB_LTR
    , TKO_KG
    , TKO_PERCENTAGE
    , TKO_IN
    , TKO_IN_KG
    , TKO_IN_TOTAL
    , TKO_OUT
    , TKO_OUT_KG
    , TKO_OUT_TOTAL
    , TKO_OUT_PRMV
    , TKO_OUT_LD
    , TKO_ADJ_STD
    , TKO_ADJ_AMB
    , TKO_ADJ_KG
)
select 
    cmp.CMPY_CODE            AS TKCMPY_LINK
    , tnk.TANK_CODE          AS TKLINK_TANKCODE
    , tnk.TANK_TERMINAL      AS TKLINK_TANKDEPO
    , tnk.TANK_COR_VOL       AS TKOWNER_QTY
    , tnk.TANK_COR_VOL       AS TKO_STD_LTR
    , tnk.TANK_AMB_VOL       AS TKO_AMB_LTR
    , tnk.TANK_LIQUID_KG     AS TKO_KG
    , 100                    AS TKO_PERCENTAGE
    , tnk.TANK_RCPT_VOL      AS TKO_IN
    , tnk.TANK_RCPT_KG       AS TKO_IN_KG
    , NULL                   AS TKO_IN_TOTAL
    , tnk.TANK_TRF_VOL       AS TKO_OUT
    , tnk.TANK_TRF_KG        AS TKO_OUT_KG
    , NULL                   AS TKO_OUT_TOTAL
    , NULL                   AS TKO_OUT_PRMV
    , NULL                   AS TKO_OUT_LD
    , NULL                   AS TKO_ADJ_STD
    , NULL                   AS TKO_ADJ_AMB
    , NULL                   AS TKO_ADJ_KG
from 
    (
        select 
            TKLINK_TANKCODE
            , TKLINK_TANKDEPO
            , count(*) as TKO_COUNT 
        from TK_OWNERS 
        group by TKLINK_TANKCODE, TKLINK_TANKDEPO
    )          tko
    , GUI_COMPANYS     cmp
    , GUI_TANKS        tnk
where 
    cmp.SITE_MANAGER='Y'
    and tnk.TANK_CODE = tko.TKLINK_TANKCODE(+)
    and tnk.TANK_TERMINAL = tko.TKLINK_TANKDEPO(+)
    and NVL(tko.TKO_COUNT, 0)=0
;

commit;



-- create a VIEW for TK_OWNERS
CREATE OR REPLACE VIEW TANK_OWNERS_VW
AS
select 
    TKCMPY_LINK
    , TKLINK_TANKCODE
    , TKLINK_TANKDEPO
    , TKO_PERCENTAGE
    , TKOWNER_QTY
    , TKO_STD_LTR
    , TKO_AMB_LTR
    , TKO_KG
    , TKO_IN
    , TKO_IN_KG
    , TKO_IN_TOTAL
    , TKO_OUT
    , TKO_OUT_KG
    , TKO_OUT_TOTAL
    , TKO_OUT_PRMV
    , TKO_OUT_LD
    , TKO_ADJ_STD
    , TKO_ADJ_AMB
    , TKO_ADJ_KG
    , cmp.*
    , tnk.*
from
    TK_OWNERS          tko
    , GUI_COMPANYS     cmp
    , GUI_TANKS        tnk
where
    tko.TKCMPY_LINK = cmp.CMPY_CODE
    and tko.TKLINK_TANKCODE = tnk.TANK_CODE
    and tko.TKLINK_TANKDEPO = tnk.TANK_TERMINAL
/
