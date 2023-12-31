-- DROP TABLE CLOSEOUT_TK_OWNER_BASES;
-- DROP TABLE CLOSEOUT_TANK_BASES;

/*
  add a child table CLOSEOUT_TANK_BASES to handle base product changes in the tank during the folio
*/

CREATE TABLE CLOSEOUT_TANK_BASES 
(	
    CLOSEOUT_NR               NUMBER(9,0) NOT NULL, 
    TANK_TERMINAL             VARCHAR2(16 BYTE) NOT NULL, 
    TANK_CODE                 VARCHAR2(24 BYTE) NOT NULL, 
    BASE_PERIOD_INDEX         NUMBER(9) DEFAULT 1 NOT NULL,
    BASE_PERIOD_OPEN          TIMESTAMP(6),
    BASE_PERIOD_CLOSE         TIMESTAMP(6),
    TANK_BASECODE             VARCHAR2(20 BYTE), 
    TANK_BASENAME             VARCHAR2(40 BYTE),
    OPEN_STD_TOT              FLOAT(126), 
    OPEN_MASS_TOT             FLOAT(126), 
    LAST_GAUGE_TIME           DATE, 
    CLOSE_STD_TOT             FLOAT(126), 
    CLOSE_MASS_TOT            FLOAT(126), 
    FREEZE_STD_TOT            FLOAT(126), 
    FREEZE_MASS_TOT           FLOAT(126), 
    RCPT_VOL                  FLOAT(126), 
    TRF_VOL                   FLOAT(126), 
    OPEN_TEMP                 FLOAT(126), 
    OPEN_DENSITY              FLOAT(126), 
    FREEZE_TEMP               FLOAT(126), 
    FREEZE_DENSITY            FLOAT(126), 
    CLOSE_TEMP                FLOAT(126), 
    CLOSE_DENSITY             FLOAT(126), 
    DESCRIPTION               VARCHAR2(255 BYTE), 
    USER_CODE                 VARCHAR2(12 BYTE), 
    LAST_CHG_TIME             TIMESTAMP(6), 
    OPEN_AMB_TOT              FLOAT(126), 
    CLOSE_AMB_TOT             FLOAT(126), 
    FREEZE_AMB_TOT            FLOAT(126), 
    TANK_LEVEL                FLOAT(126), 
    TANK_WATER_LVL            FLOAT(126), 
    TANK_WATER                FLOAT(126), 
    TANK_ROOF_WEIGHT          FLOAT(126), 
    TANK_IFC                  FLOAT(126)
);

ALTER TABLE CLOSEOUT_TANK_BASES
ADD CONSTRAINT CLOSEOUT_TANK_BASES_PK PRIMARY KEY (CLOSEOUT_NR, TANK_TERMINAL, TANK_CODE, BASE_PERIOD_INDEX);

ALTER TABLE CLOSEOUT_TANK_BASES 
ADD CONSTRAINT CLOSEOUT_TANK_BASES_FK FOREIGN KEY (CLOSEOUT_NR)
REFERENCES CLOSEOUTS (CLOSEOUT_NR);



/*
  add a child table CLOSEOUT_TK_OWNER_BASES to handle ownership changes in the tank caused by its base product changes during the folio
*/
CREATE TABLE CLOSEOUT_TK_OWNER_BASES 
(	
    CLOSEOUT_NR               NUMBER(9,0) NOT NULL, 
    TKCMPY_LINK               VARCHAR2(16 BYTE) NOT NULL, 
    TKLINK_TANKCODE           VARCHAR2(24 BYTE) NOT NULL, 
    TKLINK_TANKDEPO           VARCHAR2(16 BYTE) NOT NULL, 
    BASE_PERIOD_INDEX         NUMBER(9) DEFAULT 1 NOT NULL,
    OPEN_AMB_TOT              FLOAT(126), 
    OPEN_STD_TOT              FLOAT(126), 
    OPEN_MASS_TOT             FLOAT(126), 
    OPEN_PERCENTAGE           FLOAT(126), 
    CLOSE_AMB_TOT             FLOAT(126), 
    CLOSE_STD_TOT             FLOAT(126), 
    CLOSE_MASS_TOT            FLOAT(126), 
    CLOSE_PERCENTAGE          FLOAT(126), 
    CLOSE_TKO_IN_STD          FLOAT(126), 
    CLOSE_TKO_IN_KG           FLOAT(126), 
    CLOSE_TKO_OUT_STD         FLOAT(126), 
    CLOSE_TKO_OUT_KG          FLOAT(126), 
    FREEZE_AMB_TOT            FLOAT(126), 
    FREEZE_STD_TOT            FLOAT(126), 
    FREEZE_MASS_TOT           FLOAT(126), 
    FREEZE_PERCENTAGE         FLOAT(126), 
    FREEZE_TKO_IN_STD         FLOAT(126), 
    FREEZE_TKO_IN_KG          FLOAT(126), 
    FREEZE_TKO_OUT_STD        FLOAT(126), 
    FREEZE_TKO_OUT_KG         FLOAT(126), 
    ADJ_STD_TOT               FLOAT(126), 
    ADJ_MASS_TOT              FLOAT(126), 
    ADJ_AMB_TOT               FLOAT(126), 
    ADJ_DESCRIPTION           VARCHAR2(255 BYTE), 
    DESCRIPTION               VARCHAR2(255 BYTE), 
    USER_CODE                 VARCHAR2(12 BYTE), 
    LAST_CHG_TIME             TIMESTAMP (6)
);

ALTER TABLE CLOSEOUT_TK_OWNER_BASES
ADD CONSTRAINT PK_CLOSEOUT_TK_OWNER_BASES PRIMARY KEY (CLOSEOUT_NR, TKCMPY_LINK, TKLINK_TANKCODE, TKLINK_TANKDEPO, BASE_PERIOD_INDEX);

ALTER TABLE CLOSEOUT_TK_OWNER_BASES 
ADD CONSTRAINT FK_CLOSEOUT_TK_OWNER_BS_NR FOREIGN KEY (CLOSEOUT_NR)
REFERENCES CLOSEOUTS (CLOSEOUT_NR);

ALTER TABLE CLOSEOUT_TK_OWNER_BASES 
ADD CONSTRAINT FK_CLOSEOUT_TK_OWNER_BS_TK FOREIGN KEY (TKLINK_TANKCODE, TKLINK_TANKDEPO, TKCMPY_LINK)
REFERENCES TK_OWNERS (TKLINK_TANKCODE, TKLINK_TANKDEPO, TKCMPY_LINK);


