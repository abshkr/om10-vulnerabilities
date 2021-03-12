drop table TANK_BATCHES;

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


CREATE OR REPLACE VIEW TANK_BATCHES_VW
AS
SELECT
    tbt.TANK_BATCH_CODE 
    , tbt.TANK_BATCH_TIME 
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

