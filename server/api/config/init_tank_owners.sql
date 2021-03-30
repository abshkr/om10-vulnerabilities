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

-- new table CLOSEOUT_TK_OWNER
CREATE TABLE "CLOSEOUT_TK_OWNER" 
(   
    "CLOSEOUT_NR" NUMBER(9,0) NOT NULL ENABLE,
    "TKCMPY_LINK" VARCHAR2(16 BYTE) NOT NULL ENABLE, 
    "TKLINK_TANKCODE" VARCHAR2(24 BYTE) NOT NULL ENABLE, 
    "TKLINK_TANKDEPO" VARCHAR2(16 BYTE) NOT NULL ENABLE, 
    "OPEN_AMB_TOT" FLOAT(126), 
    "OPEN_STD_TOT" FLOAT(126), 
    "OPEN_MASS_TOT" FLOAT(126), 
    "OPEN_PERCENTAGE" FLOAT(126), 
    "CLOSE_AMB_TOT" FLOAT(126), 
    "CLOSE_STD_TOT" FLOAT(126), 
    "CLOSE_MASS_TOT" FLOAT(126), 
    "CLOSE_PERCENTAGE" FLOAT(126), 
    "CLOSE_TKO_IN_STD" FLOAT(126), 
    "CLOSE_TKO_IN_KG" FLOAT(126), 
    "CLOSE_TKO_OUT_STD" FLOAT(126), 
    "CLOSE_TKO_OUT_KG" FLOAT(126), 
    "FREEZE_AMB_TOT" FLOAT(126), 
    "FREEZE_STD_TOT" FLOAT(126), 
    "FREEZE_MASS_TOT" FLOAT(126), 
    "FREEZE_PERCENTAGE" FLOAT(126), 
    "FREEZE_TKO_IN_STD" FLOAT(126), 
    "FREEZE_TKO_IN_KG" FLOAT(126), 
    "FREEZE_TKO_OUT_STD" FLOAT(126), 
    "FREEZE_TKO_OUT_KG" FLOAT(126), 
    "ADJ_STD_TOT" FLOAT(126), 
    "ADJ_MASS_TOT" FLOAT(126), 
    "ADJ_AMB_TOT" FLOAT(126), 
    "ADJ_DESCRIPTION" VARCHAR2(255 BYTE), 
    "DESCRIPTION" VARCHAR2(255 BYTE), 
    "USER_CODE" VARCHAR2(12 BYTE), 
    "LAST_CHG_TIME" TIMESTAMP (6), 
    CONSTRAINT "PK_CLOSEOUT_TK_OWNER" PRIMARY KEY ("CLOSEOUT_NR", "TKCMPY_LINK", "TKLINK_TANKCODE", "TKLINK_TANKDEPO"),
    CONSTRAINT "FK_CLOSEOUT_TK_OWNER_NR" FOREIGN KEY ("CLOSEOUT_NR") REFERENCES "CLOSEOUTS" ("CLOSEOUT_NR"),
    CONSTRAINT "FK_CLOSEOUT_TK_OWNER_TK" FOREIGN KEY ("TKCMPY_LINK", "TKLINK_TANKCODE", "TKLINK_TANKDEPO") 
        REFERENCES "TK_OWNERS" ("TKCMPY_LINK", "TKLINK_TANKCODE", "TKLINK_TANKDEPO") 
)
/