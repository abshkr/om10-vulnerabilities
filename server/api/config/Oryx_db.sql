/*
    This one is not for Oryx but a general setting for a fix in MT
    define the SITE_MT_LIMIT_PERCENT for the upper limit check of loading quantitiy in Manual Transaction
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_MT_LIMIT_PERCENT';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_MT_LIMIT_PERCENT', '0.3', 'The upper limit of loading quantitiy in Manual Transaction (%)', NULL );

commit;




/*
    define the SITE_USE_WATER_STRAPPING for usage of strapping data to calculate water volume from level
    Y: Calculate water volume from level by strapping data
    N: Don't consider the water volume
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_USE_WATER_STRAPPING';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_USE_WATER_STRAPPING', 'Y', 'Calculate water volume from level by strapping data', NULL );

commit;



-- STRAPS
-- add new column STRAP_TYPE to store the type of strappings: 0, product level; 1, water level.
-- make its default value ZERO so that the existing data will not be affected.
-- add an enum STRAP_TYPES for this column.
alter table STRAPS add STRAP_TYPE NUMBER(1) DEFAULT 0;


/*
	add contents for Strapping Data Types: Product Level or Water Level
*/

delete from MSG_LOOKUP where MSG_ID in (3180, 3181);

commit;

insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3180, 'ENG', 'Product Level');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3181, 'ENG', 'Water Level');

insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3180, 'CHN', '油品液位');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3181, 'CHN', '水液位');

commit;

delete from ENUMITEM where ENUMTYPENAME='STRAP_TYPE';

insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('STRAP_TYPE', 0, 'P', 3180);
insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('STRAP_TYPE', 1, 'W', 3181);

commit;


-- Add VIEW for Strapping Data Types

CREATE OR REPLACE VIEW STRAP_TYPES
(STRAP_TYPE_ID, STRAP_TYPE_CODE, STRAP_TYPE_NAME)
AS 
SELECT 
	ENUMITEM.ENUM_NO STRAP_TYPE_ID
	, ENUMITEM.ENUM_CODE STRAP_TYPE_CODE
	, MSG_GLBL.MESSAGE STRAP_TYPE_NAME
FROM ENUMITEM,MSG_GLBL
WHERE ENUMITEM.ENUM_TMM=MSG_GLBL.MSG_ID
AND ENUMTYPENAME='STRAP_TYPE';

/

commit;




CREATE OR REPLACE PACKAGE LOADER_PKG
AS 
TYPE numType IS TABLE OF NUMBER INDEX BY BINARY_INTEGER;
TYPE fltType IS TABLE OF FLOAT INDEX BY BINARY_INTEGER;
TYPE strType IS TABLE OF VARCHAR2(100) INDEX BY BINARY_INTEGER;

PROCEDURE LOAD_STRAPS_DATA
(
    i_strap_height    in numType,
    i_strap_vol       in flttype,
    i_str_tk_tankcode in strtype,
    i_str_tk_tankdepo in strtype
);

PROCEDURE LOAD_STRAPS_DATA_BY_TYPE
(
    i_strap_height    in numType,
    i_strap_vol       in flttype,
    i_strap_type      in numType,
    i_str_tk_tankcode in strtype,
    i_str_tk_tankdepo in strtype
);
END;
/

CREATE OR REPLACE PACKAGE BODY LOADER_PKG
AS
PROCEDURE LOAD_STRAPS_DATA
/*******************************************************************************
    <NAME>
        LOAD_STRAPS_DATA

    <PURPOSE>
        Save the TANK straps data into STRAPS table.

    <PARAMETERS>
        i_strap_height     [IN]  : Tank Height array.
        i_strap_vol        [IN]  : Tank Volumn array.
        i_str_tk_tankcode  [IN]  : Tank Code array.
        i_str_tk_tankdepo  [IN]  : Company Code array.

    <REVISIONS>
    Ver        Date        Author           Descriptions
    ---------  ----------  ---------------  ----------------------------------
    1.0        13/03/2018  Jack Zhu         Created.
*******************************************************************************/
(
    i_strap_height    in numtype,
    i_strap_vol       in flttype,
    i_str_tk_tankcode in strtype,
    i_str_tk_tankdepo in strtype
)
IS
    duplicate_info EXCEPTION;
    PRAGMA EXCEPTION_INIT (duplicate_info, -00001);
    v_stmt_str     VARCHAR2(2000);
    v_tablename    VARCHAR2(30);
BEGIN
    v_tablename := 'STRAPS';
    v_stmt_str := 'INSERT INTO ' || v_tablename || '(STRAP_HEIGHT, STRAP_VOL, STR_TK_TANKCODE, STR_TK_TANKDEPO) VALUES (:STRAP_HEIGHT, :STRAP_VOL, :STR_TK_TANKCODE, :STR_TK_TANKDEPO)';

    FOR i IN 1..i_strap_height.count LOOP
        EXECUTE IMMEDIATE v_stmt_str USING i_strap_height(i), i_strap_vol(i), i_str_tk_tankcode(i), i_str_tk_tankdepo(i);
    END LOOP;

    EXCEPTION
        WHEN duplicate_info THEN
          RAISE_APPLICATION_ERROR(
            num=> -20107,
           msg=> 'Duplicate audit entry');
END;

PROCEDURE LOAD_STRAPS_DATA_BY_TYPE
/*******************************************************************************
    <NAME>
        LOAD_STRAPS_DATA_BY_TYPE

    <PURPOSE>
        Save the TANK straps data into STRAPS table according to its type (product or water level).

    <PARAMETERS>
        i_strap_height     [IN]  : Tank Height array.
        i_strap_vol        [IN]  : Tank Volumn array.
        i_strap_type       [IN]  : Strap Type array.
        i_str_tk_tankcode  [IN]  : Tank Code array.
        i_str_tk_tankdepo  [IN]  : Company Code array.

    <REVISIONS>
    Ver        Date        Author           Descriptions
    ---------  ----------  ---------------  ----------------------------------
    1.0        10/02/2021  Bin Zhou         Created.
*******************************************************************************/
(
    i_strap_height    in numtype,
    i_strap_vol       in flttype,
    i_strap_type      in numtype,
    i_str_tk_tankcode in strtype,
    i_str_tk_tankdepo in strtype
)
IS
    duplicate_info EXCEPTION;
    PRAGMA EXCEPTION_INIT (duplicate_info, -00001);
    v_stmt_str     VARCHAR2(2000);
    v_tablename    VARCHAR2(30);
BEGIN
    v_tablename := 'STRAPS';
    v_stmt_str := 'INSERT INTO ' || v_tablename || '(STRAP_HEIGHT, STRAP_VOL, STRAP_TYPE, STR_TK_TANKCODE, STR_TK_TANKDEPO) VALUES (:STRAP_HEIGHT, :STRAP_VOL, :STRAP_TYPE, :STR_TK_TANKCODE, :STR_TK_TANKDEPO)';

    FOR i IN 1..i_strap_height.count LOOP
        EXECUTE IMMEDIATE v_stmt_str USING i_strap_height(i), i_strap_vol(i), i_strap_type(i), i_str_tk_tankcode(i), i_str_tk_tankdepo(i);
    END LOOP;

    EXCEPTION
        WHEN duplicate_info THEN
          RAISE_APPLICATION_ERROR(
            num=> -20107,
           msg=> 'Duplicate audit entry');
END;

END LOADER_PKG;
/




-- TANKS
-- the columns to store water related data were designed already: TANK_WATER_LVL and TANK_WATER 
-- add new column TANK_IFC to store the Internal Floating Roof Compensation
alter table TANKS add TANK_IFC FLOAT;
-- add new column TANK_ROOF_WEIGHT to store the Internal Floating Roof weight
alter table TANKS add TANK_ROOF_WEIGHT FLOAT;
-- add new column TANK_TOTAL_VOL to store the total observed volume
alter table TANKS add TANK_TOTAL_VOL FLOAT;
-- add new column TANK_AIR_KG to store the weight in air
alter table TANKS add TANK_AIR_KG FLOAT;
-- add new column TANK_AIR_KG to store the VCF
alter table TANKS add TANK_VCF FLOAT;
-- add new column TANK_DENS_MODE to store the mode of density, 1: theoretical density; 0: standard density
alter table TANKS add TANK_DENS_MODE NUMBER(1) DEFAULT 0;

-- add new column to GUI_TANKS
CREATE OR REPLACE FORCE VIEW GUI_TANKS AS 
select
    tnk.TANK_CODE
    , tnk.TANK_NAME
    , tnk.TANK_TERMINAL
    , trm.TERM_NAME                        as TANK_SITENAME
    , tnk.TANK_BASE
    , bsp.BASE_NAME                        as TANK_BASE_NAME
    , bsp.BASE_PROD_GROUP                  as TANK_BASE_GROUP
    , bsp.BASE_CAT                         as TANK_BASE_CLASS
    , cls.BCLASS_DESC                      as TANK_BCLASS_NAME
    , bsp.BASE_RPT_TUNT                    as TANK_BASE_TUNIT
    , bsp.BASE_RPT_TEMP                    as TANK_BASE_RPTTEMP
    , cls.BCLASS_DENS_LO                   as TANK_BCLASS_DENS_LO
    , cls.BCLASS_DENS_HI                   as TANK_BCLASS_DENS_HI
    , cls.BCLASS_VCF_ALG                   as TANK_BCLASS_VCF_ALG
    , cls.BCLASS_TEMP_LO                   as TANK_BCLASS_TEMP_LO
    , cls.BCLASS_TEMP_HI                   as TANK_BCLASS_TEMP_HI
    , tnk.TANK_DRV_TYPE
    , tnk.TANK_DRV_AUX
    , tnk.TANK_IDENTIFIER
    , tnk.TANK_LOCATION
    , tnk.TANK_OUTFLOW_OPE
    , tnk.TANK_INFLOW_OPEN
    , tnk.TANK_ADHOC_IVRQ
    , tnk.TANK_INV_NEEDED
    , tnk.TANK_DIPPING_ON
    , tnk.TANK_LEAKDTCT_ON
    , tnk.TANK_ALARMED
    , tnk.TANK_POLL_GAP
    , tnk.TANK_PROD_LVL
    , tnk.TANK_ADDRESS
    , tnk.TANK_RCPTS
    , tnk.TANK_TRFS
    , tnk.TANK_NO_SBT
    , tnk.TANK_VERSNO
    , tnk.TANK_PAKSCAN_ACT
    , tnk.TANK_ALARM_STATE
    , tnk.TANK_LVL_ALARM
    , lat.LEVEL_ALARMS_NAME                as TANK_LVLALARM_DESC
    , tnk.TANK_GAUGINGMTHD
    , gmt.GAUGE_METHOD_NAME                as TANK_GAUGINGMTHD_DESC
    , tnk.TANK_INSTANCE
    , tnk.TANK_CHANNEL
    , tnk.TANK_SBT_TY
    , tnk.TANK_ETH_CONTENT
    , tnk.TANK_LTR_CLOSE
    , tnk.TANK_KG_CLOSE
    , tnk.TANK_CLOSE_DENS
    , tnk.TANK_RPTVCFCLOSE
    , tnk.TANK_INFLOW_RATE
    , tnk.TANK_SPARE_FLD1
    , tnk.TANK_SPARE_FLD2
    , tnk.TANK_RCPT_VOL
    , tnk.TANK_TRF_VOL
    , tnk.TANK_RCPT_KG
    , tnk.TANK_TRF_KG
    , tnk.TANK_PUMP_VOL
    , tnk.TANK_RES
    , tnk.TANK_AMB_VOL
    , tnk.TANK_COR_VOL
    , tnk.TANK_VAPOUR_KG
    , tnk.TANK_LIQUID_KG
    , tnk.TANK_WATER
    , tnk.TANK_WATER_LVL
    , tnk.TANK_ULLAGE
    , tnk.TANK_API
    , tnk.TANK_PROD_C_OF_E
    , tnk.TANK_60_86_VCF
    , tnk.TANK_DENSITY
    , tnk.TANK_TEMP
    , tnk.TANK_RPTVCF
    , tnk.TANK_AMB_DENSITY
    , tnk.TANK_DAILY_TOL_VOL               as TANK_DTOL_VOLUME
    , tnk.TANK_DAILY_TOL_PERCENT           as TANK_DTOL_PERCENT
    , tnk.TANK_MONTHLY_TOL_VOL             as TANK_MTOL_VOLUME
    , tnk.TANK_MONTHLY_TOL_PERCENT         as TANK_MTOL_PERCENT
    , tnk.TANK_DATE
    , tgr.TGR_GRLK                         as TANK_GROUP
	, tnk.TANK_15_DENSITY
	, bsp.BASE_REF_TEMP                    as TANK_BASE_REF_TEMP
	, bsp.BASE_REF_TUNT                    as TANK_BASE_REF_TUNT
	, bsp.BASE_CORR_MTHD                   as TANK_BASE_CORR_MTHD
	, bsp.BASE_REF_TEMP_SPEC               as TANK_BASE_REF_TEMP_SPEC
	, bsp.BASE_LIMIT_PRESET_HT             as TANK_BASE_LIMIT_PRESET_HT
	, bsp.BASE_DENS_LO                     as TANK_BASE_DENS_LO
	, bsp.BASE_DENS_HI                     as TANK_BASE_DENS_HI
	, bsp.BASE_COLOR                       as TANK_BASE_COLOR
	, tp.TANK_ACTIVE
	, tnk.TANK_ATG_MANCHG
	, tnk.TANK_ATG_STATUS
	, tnk.TANK_SULPHUR
	, tnk.TANK_FLASHPOINT
	, tnk.TANK_STATUS
	, tst.TANK_STATUS_NAME
	, tnk.TANK_HH_LEVEL
	, tnk.TANK_H_LEVEL
	, tnk.TANK_L_LEVEL
	, tnk.TANK_LL_LEVEL
	, tnk.TANK_UH_LEVEL
	, tnk.TANK_UL_LEVEL
    , tnk.TANK_MAX_LEVEL
    , tnk.TANK_MAX_CAPACITY
	, (
		case 
			when tnk.TANK_HH_LEVEL is null then -1 
			when tnk.TANK_HH_LEVEL is not null and tnk.TANK_PROD_LVL>=tnk.TANK_HH_LEVEL then 1 
			else 0 
		end 
	)       as TANK_HH_STATE
	, (
		case 
			when tnk.TANK_H_LEVEL is null then -1 
			when tnk.TANK_H_LEVEL is not null and tnk.TANK_PROD_LVL>=tnk.TANK_H_LEVEL then 1 
			else 0 
		end 
	)       as TANK_H_STATE
	, (
		case 
			when tnk.TANK_L_LEVEL is null then -1 
			when tnk.TANK_L_LEVEL is not null and tnk.TANK_PROD_LVL>=tnk.TANK_L_LEVEL then 1 
			else 0 
		end 
	)       as TANK_L_STATE
	, (
		case 
			when tnk.TANK_LL_LEVEL is null then -1 
			when tnk.TANK_LL_LEVEL is not null and tnk.TANK_PROD_LVL>=tnk.TANK_LL_LEVEL then 1 
			else 0 
		end 
	)       as TANK_LL_STATE
	, (
		case 
			when tnk.TANK_UH_LEVEL is null then -1 
			when tnk.TANK_UH_LEVEL is not null and tnk.TANK_PROD_LVL>=tnk.TANK_UH_LEVEL then 1 
			else 0 
		end 
	)       as TANK_UH_STATE
	, (
		case 
			when tnk.TANK_UL_LEVEL is null then -1 
			when tnk.TANK_UL_LEVEL is not null and tnk.TANK_PROD_LVL>=tnk.TANK_UL_LEVEL then 1 
			else 0 
		end 
	)       as TANK_UL_STATE
    , tnk.TANK_EXC_PID
    , tnk.TANK_EXC_PDS
    , tnk.TANK_EXC_SPMV
    , tnk.TANK_EXC_STCKRPT
    , tnk.TANK_VISCOSITY
    , tnk.TANK_BATCH_NO
    , bsp.AFC_ENABLED
    , bsp.AFC_PRIORITY
    , tnk.TANK_AMB_CLOSE
    , tnk.TANK_SG
    , tnk.TANK_IFC
    , tnk.TANK_ROOF_WEIGHT
    , NVL(tnk.TANK_TOTAL_VOL, (NVL(tnk.TANK_AMB_VOL,0) + NVL(tnk.TANK_WATER,0) + NVL(tnk.TANK_IFC,0))) as TANK_TOTAL_VOL
    , NVL(tnk.TANK_AIR_KG, (NVL(tnk.TANK_LIQUID_KG,0) - NVL(tnk.TANK_COR_VOL,0)*0.0011)) as TANK_AIR_KG
    , NVL(tnk.TANK_VCF, DECODE(tnk.TANK_AMB_VOL, NULL, 0, 0, 0, (NVL(tnk.TANK_COR_VOL,0)/tnk.TANK_AMB_VOL))) as TANK_VCF
    , tnk.TANK_DENS_MODE
from
    TANKS                                  tnk
    , TERMINAL                             trm
    , BASE_PRODS                           bsp
	, (
        select
            bcls.BCLASS_NO
            , NVL(bctyp.BCLASS_NAME, bcls.BCLASS_DESC)			as BCLASS_DESC
            , bcls.BCLASS_DENS_LO
            , bcls.BCLASS_DENS_HI
            , bcls.BCLASS_VCF_ALG
            , bcls.BCLASS_TEMP_LO
            , bcls.BCLASS_TEMP_HI
        from
            BASECLASS 			bcls
            , BCLASS_TYP		bctyp
        where
            1=1
            and bcls.BCLASS_NO = bctyp.BCLASS_ID(+)
	) 								       cls
    , LEVEL_ALARMS_TYP                    lat
    , GAUGE_METHOD_TYP                    gmt
    , TGRLINK                            tgr
	, TANK_STATUS_TYP                    tst
    , (
		select distinct
			p.PN_TANK_TANKCODE 		as TANK_CODE
			, p.PN_TANK_TANKDEPO 	as TANK_TERMINAL
			, 1 					as TANK_ACTIVE
		from
			PIPENODE  				p
			, STREAM_LINKS 			s
		where
		p.PN_TANK_TANKCODE is not null
		and p.PN_TANK_TANKDEPO is not null
		and (p.PN_ID = s.STREAM_LINK_DOWN or p.PN_ID = s.STREAM_LINK_UP)
	)  								tp
where
    ( ( SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE') IS NULL )
    or ( SYS_CONTEXT('CONN_CONTEXT', 'ISMANAGER') = 'Y' )
    or ( SYS_CONTEXT('CONN_CONTEXT', 'ISMANAGER') IS NULL) )
    and tnk.TANK_TERMINAL = trm.TERM_CODE
    and tnk.TANK_BASE = bsp.BASE_CODE
    and bsp.BASE_CAT = cls.BCLASS_NO
    and tnk.TANK_LVL_ALARM = lat.LEVEL_ALARMS_ID(+)
    and tnk.TANK_STATUS = tst.TANK_STATUS_ID(+)
    and tnk.TANK_GAUGINGMTHD = gmt.GAUGE_METHOD_ID(+)
    and tnk.TANK_TERMINAL = tgr.TGR_TKLK_TANKDEPO(+)
    and tnk.TANK_CODE = tgr.TGR_TKLK_TANKCODE(+)
    and tnk.TANK_CODE = tp.TANK_CODE(+)
    and tnk.TANK_TERMINAL = tp.TANK_TERMINAL(+)
/




-- increase the size of column TRSB_BATCH_NO
ALTER TABLE TRANBASE MODIFY TRSB_BATCH_NO VARCHAR2(200);

-- increase the size of column TANK_BATCH_NO
ALTER TABLE TANKS MODIFY TANK_BATCH_NO VARCHAR2(200);

-- drop table TANK_BATCHES;

-- Tank Batch History
create table TANK_BATCHES
(
    TANK_BATCH_CODE     VARCHAR2(200)   NOT NULL,
    TANK_BATCH_TIME     DATE            DEFAULT SYSDATE NOT NULL,
    TANK_CODE	        VARCHAR2(24)    NOT NULL,
    TANK_TERMINAL	    VARCHAR2(16)    NOT NULL,
    TANK_BASE	        VARCHAR2(20)    NOT NULL,
    TANK_DENSITY	    FLOAT,
    TANK_PROD_QCR       VARCHAR2(200), -- quality certificate ref
    TANK_API            FLOAT,
    TANK_STD_TEMP       FLOAT,
    TANK_PROD_C_OF_E    FLOAT,
    TANK_15_DENSITY     FLOAT,
    TANK_SULPHUR        FLOAT,
    TANK_FLASHPOINT     FLOAT,
    TANK_VISCOSITY      FLOAT,
    TANK_SG             FLOAT,
    TANK_ROOF_WEIGHT    FLOAT,
    TANK_DENS_MODE      NUMBER(1)       DEFAULT 0,
    CONSTRAINT PK_TANK_BATCHES
    PRIMARY KEY(TANK_BATCH_CODE)
);

ALTER TABLE TANK_BATCHES
  ADD CONSTRAINT FK_TANK_BATCHES_TANK FOREIGN KEY (TANK_CODE, TANK_TERMINAL)
    REFERENCES TANKS (TANK_CODE, TANK_TERMINAL);

ALTER TABLE TANK_BATCHES
  ADD CONSTRAINT FK_TANK_BATCHES_BASE FOREIGN KEY (TANK_BASE)
    REFERENCES BASE_PRODS (BASE_CODE);

-- add batch end time
alter table TANK_BATCHES add TANK_BATCH_END DATE;


CREATE OR REPLACE VIEW TANK_BATCHES_VW
AS
SELECT
    tbt.TANK_BATCH_CODE 
    , tbt.TANK_BATCH_TIME 
    , tbt.TANK_BATCH_END 
    , tbt.TANK_CODE	    
    , tnk.TANK_NAME
    , tbt.TANK_TERMINAL	
    , trm.TERM_NAME                        as TANK_SITENAME
    , tbt.TANK_BASE	    
    , bsp.BASE_NAME                        as TANK_BASE_NAME
    , bsp.BASE_CAT                         as TANK_BASE_CLASS
    , cls.BCLASS_DESC                      as TANK_BCLASS_NAME
    , tbt.TANK_DENSITY	
    , tbt.TANK_PROD_QCR   
    , tbt.TANK_API        
    , tbt.TANK_STD_TEMP   
    , tbt.TANK_PROD_C_OF_E
    , tbt.TANK_15_DENSITY 
    , tbt.TANK_SULPHUR    
    , tbt.TANK_FLASHPOINT 
    , tbt.TANK_VISCOSITY  
    , tbt.TANK_SG         
    , tbt.TANK_ROOF_WEIGHT
    , tbt.TANK_DENS_MODE  
    , cls.BCLASS_DENS_LO                   as TANK_BCLASS_DENS_LO
    , cls.BCLASS_DENS_HI                   as TANK_BCLASS_DENS_HI
    , cls.BCLASS_VCF_ALG                   as TANK_BCLASS_VCF_ALG
    , cls.BCLASS_TEMP_LO                   as TANK_BCLASS_TEMP_LO
    , cls.BCLASS_TEMP_HI                   as TANK_BCLASS_TEMP_HI
    , bsp.BASE_PROD_GROUP                  as TANK_BASE_GROUP
    , bsp.BASE_RPT_TUNT                    as TANK_BASE_TUNIT
    , bsp.BASE_RPT_TEMP                    as TANK_BASE_RPTTEMP
    , bsp.BASE_REF_TEMP                    as TANK_BASE_REF_TEMP
    , bsp.BASE_REF_TUNT                    as TANK_BASE_REF_TUNT
    , bsp.BASE_CORR_MTHD                   as TANK_BASE_CORR_MTHD
    , bsp.BASE_REF_TEMP_SPEC               as TANK_BASE_REF_TEMP_SPEC
    , bsp.BASE_LIMIT_PRESET_HT             as TANK_BASE_LIMIT_PRESET_HT
    , bsp.BASE_DENS_LO                     as TANK_BASE_DENS_LO
    , bsp.BASE_DENS_HI                     as TANK_BASE_DENS_HI
    , bsp.BASE_COLOR                       as TANK_BASE_COLOR
    , bsp.AFC_ENABLED
    , bsp.AFC_PRIORITY
FROM
    TANK_BATCHES                           tbt
    , TANKS                                tnk
    , TERMINAL                             trm
    , BASE_PRODS                           bsp
	, (
        select
            bcls.BCLASS_NO
            , NVL(bctyp.BCLASS_NAME, bcls.BCLASS_DESC)			as BCLASS_DESC
            , bcls.BCLASS_DENS_LO
            , bcls.BCLASS_DENS_HI
            , bcls.BCLASS_VCF_ALG
            , bcls.BCLASS_TEMP_LO
            , bcls.BCLASS_TEMP_HI
        from
            BASECLASS 			bcls
            , BCLASS_TYP		bctyp
        where
            1=1
            and bcls.BCLASS_NO = bctyp.BCLASS_ID(+)
	) 								       cls
where
    ( ( SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE') IS NULL )
    or ( SYS_CONTEXT('CONN_CONTEXT', 'ISMANAGER') = 'Y' )
    or ( SYS_CONTEXT('CONN_CONTEXT', 'ISMANAGER') IS NULL) )
    and tbt.TANK_TERMINAL = tnk.TANK_TERMINAL
    and tbt.TANK_CODE = tnk.TANK_CODE
    and tbt.TANK_TERMINAL = trm.TERM_CODE
    and tbt.TANK_BASE = bsp.BASE_CODE
    and bsp.BASE_CAT = cls.BCLASS_NO
/

