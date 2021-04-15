-- Site config key
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) values ('SITE_USE_AXLE_WEIGHT_LIMIT', 'Y', 'Enable the axle weight limit check', NULL );
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) values ('AXLE_WEIGHT_LIMIT_TYPE', 'GML', 'GML | HML | XTRA | NA', NULL );

drop table SPECAXLES;
-- drop table EQUIP_AXLES;
drop table AXLE_WEIGHT_LIMIT_LOOKUP;

-- Weight limit lookup
create table AXLE_WEIGHT_LIMIT_LOOKUP
(
    LIMIT_TYPE_ID NUMBER(9) NOT NULL,
    AXLE_GROUP    NUMBER(9) NOT NULL,
    WEIGHT_LIMIT  NUMBER(9),
    CONSTRAINT PK_AWL_LOOKUP
    PRIMARY KEY(LIMIT_TYPE_ID, AXLE_GROUP)
);

-- Equipment Axles
create table EQUIP_AXLES
(
    EQPT_ID            NUMBER(9) NOT NULL,
    AXLE_ID            NUMBER(9) NOT NULL,
    LIMIT_TYPE_ID      NUMBER(9),
    AXLE_GROUP         NUMBER(9),
    USER_WEIGHT_LIMIT  NUMBER(9),
    CONSTRAINT PK_EQPT_AXLE
    PRIMARY KEY(EQPT_ID, AXLE_ID),
    CONSTRAINT FK_EQPT_AXLE_EQPT_ID
    FOREIGN KEY(EQPT_ID) REFERENCES TRANSP_EQUIP(EQPT_ID),
    CONSTRAINT FK_EQPT_AXLE_LIMIT
    FOREIGN KEY(LIMIT_TYPE_ID,AXLE_GROUP) REFERENCES AXLE_WEIGHT_LIMIT_LOOKUP(LIMIT_TYPE_ID,AXLE_GROUP)
);

-- Spec Axles
create table SPECAXLES
(
    TRIP_NO            NUMBER(9) NOT NULL,
    SUPP               VARCHAR2(16) NOT NULL,
    AXLE_ID            NUMBER(9) NOT NULL,
    AXLE_WEIGH_IN      NUMBER(9),
    AXLE_WEIGH_OUT     NUMBER(9),
    TIME_WEIGH_IN      DATE,
    TIME_WEIGH_OUT     DATE,
    CONSTRAINT PK_SPECAXLES
    PRIMARY KEY(TRIP_NO, SUPP, AXLE_ID),
    CONSTRAINT FK_SPECAXLES
    FOREIGN KEY(TRIP_NO,SUPP) REFERENCES SCHEDULE(SHLS_TRIP_NO,SHLS_SUPP)
);

-- Lookup data
insert into AXLE_WEIGHT_LIMIT_LOOKUP (LIMIT_TYPE_ID, AXLE_GROUP, WEIGHT_LIMIT) values(1, 0, 0);
insert into AXLE_WEIGHT_LIMIT_LOOKUP (LIMIT_TYPE_ID, AXLE_GROUP, WEIGHT_LIMIT) values(1, 1, 9000);
insert into AXLE_WEIGHT_LIMIT_LOOKUP (LIMIT_TYPE_ID, AXLE_GROUP, WEIGHT_LIMIT) values(1, 2, 6000);
insert into AXLE_WEIGHT_LIMIT_LOOKUP (LIMIT_TYPE_ID, AXLE_GROUP, WEIGHT_LIMIT) values(1, 3, 16500);
insert into AXLE_WEIGHT_LIMIT_LOOKUP (LIMIT_TYPE_ID, AXLE_GROUP, WEIGHT_LIMIT) values(1, 4, 20000);
insert into AXLE_WEIGHT_LIMIT_LOOKUP (LIMIT_TYPE_ID, AXLE_GROUP, WEIGHT_LIMIT) values(1, 5, 10000);

insert into AXLE_WEIGHT_LIMIT_LOOKUP (LIMIT_TYPE_ID, AXLE_GROUP, WEIGHT_LIMIT) values(2, 0, 0);
insert into AXLE_WEIGHT_LIMIT_LOOKUP (LIMIT_TYPE_ID, AXLE_GROUP, WEIGHT_LIMIT) values(2, 1, NULL);
insert into AXLE_WEIGHT_LIMIT_LOOKUP (LIMIT_TYPE_ID, AXLE_GROUP, WEIGHT_LIMIT) values(2, 2, 6000);
insert into AXLE_WEIGHT_LIMIT_LOOKUP (LIMIT_TYPE_ID, AXLE_GROUP, WEIGHT_LIMIT) values(2, 3, 17000);
insert into AXLE_WEIGHT_LIMIT_LOOKUP (LIMIT_TYPE_ID, AXLE_GROUP, WEIGHT_LIMIT) values(2, 4, 22500);
insert into AXLE_WEIGHT_LIMIT_LOOKUP (LIMIT_TYPE_ID, AXLE_GROUP, WEIGHT_LIMIT) values(2, 5, 10000);

insert into AXLE_WEIGHT_LIMIT_LOOKUP (LIMIT_TYPE_ID, AXLE_GROUP, WEIGHT_LIMIT) values(3, 0, 0);
insert into AXLE_WEIGHT_LIMIT_LOOKUP (LIMIT_TYPE_ID, AXLE_GROUP, WEIGHT_LIMIT) values(3, 1, NULL);
insert into AXLE_WEIGHT_LIMIT_LOOKUP (LIMIT_TYPE_ID, AXLE_GROUP, WEIGHT_LIMIT) values(3, 2, 6600);
insert into AXLE_WEIGHT_LIMIT_LOOKUP (LIMIT_TYPE_ID, AXLE_GROUP, WEIGHT_LIMIT) values(3, 3, 17000);
insert into AXLE_WEIGHT_LIMIT_LOOKUP (LIMIT_TYPE_ID, AXLE_GROUP, WEIGHT_LIMIT) values(3, 4, 22500);
insert into AXLE_WEIGHT_LIMIT_LOOKUP (LIMIT_TYPE_ID, AXLE_GROUP, WEIGHT_LIMIT) values(3, 5, 10000);

delete from ENUMITEM where ENUMTYPENAME='AXLE_WEIGHT_LIMIT';
delete from ENUMITEM where ENUMTYPENAME='AXLE_GROUP';

-- Enumitem for AXLE_WEIGHT_LIMIT
insert into ENUMITEM (ENUMTYPENAME, ENUM_NO, ENUM_TMM, ENUM_CODE) values('AXLE_WEIGHT_LIMIT', 0, 3221, 'NA');
insert into ENUMITEM (ENUMTYPENAME, ENUM_NO, ENUM_TMM, ENUM_CODE) values('AXLE_WEIGHT_LIMIT', 1, 3222, 'GML');
insert into ENUMITEM (ENUMTYPENAME, ENUM_NO, ENUM_TMM, ENUM_CODE) values('AXLE_WEIGHT_LIMIT', 2, 3223, 'HML');
insert into ENUMITEM (ENUMTYPENAME, ENUM_NO, ENUM_TMM, ENUM_CODE) values('AXLE_WEIGHT_LIMIT', 3, 3224, 'XTRA');

-- Enumitem for AXLE_GROUP
insert into ENUMITEM (ENUMTYPENAME, ENUM_NO, ENUM_TMM, ENUM_CODE) values('AXLE_GROUP', 0, 3225, 'NA');
insert into ENUMITEM (ENUMTYPENAME, ENUM_NO, ENUM_TMM, ENUM_CODE) values('AXLE_GROUP', 1, 3226, 'AXLE1');
insert into ENUMITEM (ENUMTYPENAME, ENUM_NO, ENUM_TMM, ENUM_CODE) values('AXLE_GROUP', 2, 3227, 'STEER1');
insert into ENUMITEM (ENUMTYPENAME, ENUM_NO, ENUM_TMM, ENUM_CODE) values('AXLE_GROUP', 3, 3228, 'AXLE2');
insert into ENUMITEM (ENUMTYPENAME, ENUM_NO, ENUM_TMM, ENUM_CODE) values('AXLE_GROUP', 4, 3229, 'AXLE3');
insert into ENUMITEM (ENUMTYPENAME, ENUM_NO, ENUM_TMM, ENUM_CODE) values('AXLE_GROUP', 5, 3230, 'STEER2');

delete from MSG_LOOKUP where MSG_ID in(3221,3222,3223,3224,3225,3226,3227,3228,3229,3230);

-- Message lookup for AXLE_WEIGHT_LIMIT
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3221, 'CHN', 'N/A');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3221, 'ENG', 'N/A');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3222, 'CHN', 'GML: 常规重量限制');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3222, 'ENG', 'GML: General Mass Limits');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3223, 'CHN', 'HML: 高段重量限制');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3223, 'ENG', 'HML: Higher Mass Limits');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3224, 'CHN', 'XTRA: 特别重量限制');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3224, 'ENG', 'XTRA: Extra Mass Limits');

-- Message lookup for AXLE_GROUP
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3225, 'CHN', 'N/A');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3225, 'ENG', 'N/A');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3226, 'CHN', '单车轴');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3226, 'ENG', 'Single Axle');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3227, 'CHN', '单转向轴');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3227, 'ENG', 'Single Steer');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3228, 'CHN', '串联车轴');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3228, 'ENG', 'Tandem Axle');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3229, 'CHN', '三联车轴');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3229, 'ENG', 'Tri-Axle');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3230, 'CHN', '双转向');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3230, 'ENG', 'Twin Steer');


-- EQUIP_TYPES
--alter table EQUIP_TYPES add FRONT_WEIGH_LIMIT NUMBER(6);
--alter table EQUIP_TYPES add REAR_WEIGH_LIMIT NUMBER(6);
--alter table EQUIP_TYPES modify FRONT_WEIGH_LIMIT NUMBER(9);
--alter table EQUIP_TYPES modify REAR_WEIGH_LIMIT NUMBER(9);
-- alter table EQUIP_TYPES drop column FRONT_WEIGH_LIMIT;
-- alter table EQUIP_TYPES drop column REAR_WEIGH_LIMIT;

-- TRANSP_EQUIP
--alter table TRANSP_EQUIP add FRONT_WEIGH_LIMIT NUMBER(6);
--alter table TRANSP_EQUIP add REAR_WEIGH_LIMIT NUMBER(6);
--alter table TRANSP_EQUIP modify FRONT_WEIGH_LIMIT NUMBER(9);
--alter table TRANSP_EQUIP modify REAR_WEIGH_LIMIT NUMBER(9);
-- alter table TRANSP_EQUIP drop column FRONT_WEIGH_LIMIT;
-- alter table TRANSP_EQUIP drop column REAR_WEIGH_LIMIT;

-- TANKERS
--alter table TANKERS add AX1 NUMBER(6); --?
--alter table TANKERS add AX2 NUMBER(6); --?
--alter table TANKERS add AX3 NUMBER(6); --?
--alter table TANKERS modify AX1 NUMBER(9); --?
--alter table TANKERS modify AX2 NUMBER(9); --?
--alter table TANKERS modify AX3 NUMBER(9); --?
-- alter table TANKERS drop column AX1;
-- alter table TANKERS drop column AX2;
-- alter table TANKERS drop column AX3;



CREATE OR REPLACE VIEW AXLE_WEIGHT_LIMIT_VW
AS
SELECT
    EI.ENUM_NO AXLE_LIMIT_TYPE_ID, 
    EI.ENUM_CODE AXLE_LIMIT_TYPE_CODE, 
    ML.MESSAGE AXLE_LIMIT_TYPE_NAME
FROM
    ENUMITEM EI,
    MSG_GLBL ML
WHERE
    EI.ENUMTYPENAME='AXLE_WEIGHT_LIMIT'
    AND ML.MSG_ID=EI.ENUM_TMM
/

CREATE OR REPLACE VIEW AXLE_GROUP_VW
AS
SELECT
    EI.ENUM_NO AXLE_GROUP_ID, 
    EI.ENUM_CODE AXLE_GROUP_CODE, 
    ML.MESSAGE AXLE_GROUP_NAME
FROM
    ENUMITEM EI,
    MSG_GLBL ML
WHERE
    EI.ENUMTYPENAME='AXLE_GROUP'
    AND ML.MSG_ID=EI.ENUM_TMM
/

-- AXLE_WEIGHT_LIMIT_LOOKUP view
CREATE OR REPLACE VIEW AXLE_WEIGHT_LIMIT_LOOKUP_VW
AS
SELECT
    AWLL.LIMIT_TYPE_ID          AXLE_LIMIT_TYPE_ID,
    AWLV.AXLE_LIMIT_TYPE_CODE   AXLE_LIMIT_TYPE_CODE,
    AWLV.AXLE_LIMIT_TYPE_NAME   AXLE_LIMIT_TYPE_NAME,
	AWLL.AXLE_GROUP             AXLE_GROUP_ID,
    AGV.AXLE_GROUP_NAME         AXLE_GROUP_NAME,
    AWLL.WEIGHT_LIMIT           AXLE_WEIGHT_LIMIT
FROM
    AXLE_WEIGHT_LIMIT_LOOKUP    AWLL,
    AXLE_WEIGHT_LIMIT_VW        AWLV,
    AXLE_GROUP_VW               AGV
WHERE
    AWLL.LIMIT_TYPE_ID = AWLV.AXLE_LIMIT_TYPE_ID(+)
    AND AWLL.AXLE_GROUP = AGV.AXLE_GROUP_ID(+)
ORDER BY AWLL.LIMIT_TYPE_ID, AWLL.AXLE_GROUP
/

CREATE OR REPLACE VIEW CURR_AXLE_WEIGHT_LIMIT_VW
AS
SELECT 
    AXLE_LIMIT_TYPE_ID,
    AXLE_LIMIT_TYPE_CODE,
    AXLE_LIMIT_TYPE_NAME,
    AXLE_GROUP_ID,
    AXLE_GROUP_NAME,
    AXLE_WEIGHT_LIMIT, 
    LPAD(AXLE_WEIGHT_LIMIT, 6, ' ')||' ['||AXLE_GROUP_NAME||']'  AS AXLE_GROUP_DESC
FROM 
    AXLE_WEIGHT_LIMIT_LOOKUP_VW
WHERE 
    AXLE_LIMIT_TYPE_CODE = NVL((
            SELECT CONFIG_VALUE FROM SITE_CONFIG WHERE CONFIG_KEY='AXLE_WEIGHT_LIMIT_TYPE'
        ), 'GML')                    
ORDER BY AXLE_LIMIT_TYPE_ID, AXLE_GROUP_ID
/

/*
CREATE OR REPLACE VIEW EQUIP_TYPE_AXLES_VW
AS
SELECT 
    ETYPE.ETYP_ID, 
    ETYPE.FRONT_WEIGH_LIMIT, 
    ETYPE.REAR_WEIGH_LIMIT,
    FAXLE.AXLE_LIMIT_TYPE_ID,
    FAXLE.AXLE_LIMIT_TYPE_CODE,
    FAXLE.AXLE_LIMIT_TYPE_NAME,
    FAXLE.AXLE_GROUP_ID             AS FRONT_AXLE_GROUP_ID,
    FAXLE.AXLE_GROUP_NAME           AS FRONT_AXLE_GROUP_NAME,
    FAXLE.AXLE_WEIGHT_LIMIT         AS FRONT_AXLE_WEIGHT_LIMIT,
    FAXLE.AXLE_GROUP_DESC           AS FRONT_AXLE_GROUP_DESC,
    RAXLE.AXLE_GROUP_ID             AS REAR_AXLE_GROUP_ID,
    RAXLE.AXLE_GROUP_NAME           AS REAR_AXLE_GROUP_NAME,
    RAXLE.AXLE_WEIGHT_LIMIT         AS REAR_AXLE_WEIGHT_LIMIT,
    RAXLE.AXLE_GROUP_DESC           AS REAR_AXLE_GROUP_DESC
FROM 
    EQUIP_TYPES                 ETYPE, 
    CURR_AXLE_WEIGHT_LIMIT_VW   FAXLE,
    CURR_AXLE_WEIGHT_LIMIT_VW   RAXLE
WHERE
    ETYPE.FRONT_WEIGH_LIMIT = FAXLE.AXLE_GROUP_ID(+)
    AND ETYPE.REAR_WEIGH_LIMIT = RAXLE.AXLE_GROUP_ID(+)
/
*/

CREATE OR REPLACE VIEW EQPT_AXLES_VW
AS
SELECT 
    EQUIP.EQPT_ID, 
    EQUIP.AXLE_ID, 
    EQUIP.LIMIT_TYPE_ID, 
    EQUIP.AXLE_GROUP, 
    EQUIP.USER_WEIGHT_LIMIT, 
    AWLLV.AXLE_LIMIT_TYPE_CODE AS LIMIT_TYPE_CODE,
    AWLLV.AXLE_LIMIT_TYPE_NAME AS LIMIT_TYPE_NAME,
    AWLLV.AXLE_GROUP_NAME,
    AWLLV.AXLE_WEIGHT_LIMIT
FROM 
    EQUIP_AXLES                   EQUIP, 
    AXLE_WEIGHT_LIMIT_LOOKUP_VW   AWLLV
WHERE
    EQUIP.LIMIT_TYPE_ID = AWLLV.AXLE_LIMIT_TYPE_ID
    AND EQUIP.AXLE_GROUP = AWLLV.AXLE_GROUP_ID
/

CREATE OR REPLACE VIEW TNKR_AXLES_VW
AS
SELECT 
    ROW_NUMBER() OVER (PARTITION BY TAV.TNKR_CODE ORDER BY TAV.EQPT_SEQ, TAV.EQPT_AXLE_ID ASC ) AS TNKR_AXLE_ID,
    TAV.*
FROM (
SELECT 
    TK.TNKR_CODE,
    TE.TC_SEQNO                   AS EQPT_SEQ,
    TA.EQPT_ID, 
    TA.AXLE_ID                    AS EQPT_AXLE_ID,
    TA.LIMIT_TYPE_ID, 
    TA.AXLE_GROUP, 
    TA.USER_WEIGHT_LIMIT, 
    TA.LIMIT_TYPE_CODE,
    TA.LIMIT_TYPE_NAME,
    TA.AXLE_GROUP_NAME,
    TA.AXLE_WEIGHT_LIMIT
FROM 
    EQPT_AXLES_VW                 TA, 
    TANKERS                       TK,
    TNKR_EQUIP                    TE
WHERE
    TK.TNKR_CODE = TE.TC_TANKER
    AND TE.TC_EQPT = TA.EQPT_ID
ORDER BY TK.TNKR_CODE, TE.TC_SEQNO, TA.AXLE_ID
) TAV
/

/*
This SQL works in Sql Developer, but will cause the following error in sqlplus:
Error report -
SQL Error: ORA-01417: a table may be outer joined to at most one other table
01417. 00000 -  "a table may be outer joined to at most one other table"
*Cause:    a.b (+) = b.b and a.c (+) = c.c is not allowed
*Action:   Check that this is really what you want, then join b and c first
           in a view.

CREATE OR REPLACE VIEW TRIP_AXLES_VW
AS
SELECT
    SD.SHLS_TRIP_NO             AS TRIP_NO,
    SD.SHLS_SUPP                AS SUPP_CODE,
    CP.CMPY_NAME                AS SUPP_NAME,
    SA.AXLE_ID,
    SA.AXLE_WEIGH_IN,
    SA.AXLE_WEIGH_OUT,
    SA.TIME_WEIGH_IN,
    SA.TIME_WEIGH_OUT,
    AX.*
FROM
    SCHEDULE        SD,
    SPECAXLES       SA,
    COMPANYS        CP,
    (
        SELECT 
            TA.TNKR_CODE
            , TA.TNKR_AXLE_ID
            , TA.EQPT_SEQ
            , TA.EQPT_ID
            , TE.EQPT_CODE
            , TE.EQPT_CODE || '[' || NVL(TE.EQPT_TITLE, TE.EQPT_CODE) || ']'   AS EQPT_NAME
            , TA.EQPT_AXLE_ID
            , TA.LIMIT_TYPE_ID
            , TA.AXLE_GROUP
            , TA.USER_WEIGHT_LIMIT
            , TA.LIMIT_TYPE_CODE
            , TA.LIMIT_TYPE_NAME
            , TA.AXLE_GROUP_NAME
            , TA.AXLE_WEIGHT_LIMIT            
        FROM 
            TNKR_AXLES_VW TA, 
            TRANSP_EQUIP TE
        WHERE TA.EQPT_ID = TE.EQPT_ID
    ) AX
WHERE
    SD.SHL_TANKER = AX.TNKR_CODE
    AND SD.SHLS_SUPP = CP.CMPY_CODE
    AND SD.SHLS_TRIP_NO = SA.TRIP_NO(+)
    AND SD.SHLS_SUPP = SA.SUPP(+)
    AND AX.TNKR_AXLE_ID = SA.AXLE_ID(+)
/
*/

CREATE OR REPLACE VIEW TRIP_AXLES_VW
AS
SELECT
    SA.AXLE_ID,
    SA.AXLE_WEIGH_IN,
    SA.AXLE_WEIGH_OUT,
    SA.TIME_WEIGH_IN,
    SA.TIME_WEIGH_OUT,
    TX.*
FROM
    SPECAXLES       SA,
    (
        SELECT 
            SD.SHLS_TRIP_NO             AS TRIP_NO
            , SD.SHLS_SUPP                AS SUPP_CODE
            , CP.CMPY_NAME                AS SUPP_NAME
            , TA.TNKR_CODE
            , TA.TNKR_AXLE_ID
            , TA.EQPT_SEQ
            , TA.EQPT_ID
            , TE.EQPT_CODE
            , TE.EQPT_CODE || '[' || NVL(TE.EQPT_TITLE, TE.EQPT_CODE) || ']'   AS EQPT_NAME
            , TA.EQPT_AXLE_ID
            , TA.LIMIT_TYPE_ID
            , TA.AXLE_GROUP
            , TA.USER_WEIGHT_LIMIT
            , TA.LIMIT_TYPE_CODE
            , TA.LIMIT_TYPE_NAME
            , TA.AXLE_GROUP_NAME
            , TA.AXLE_WEIGHT_LIMIT    
        FROM 
            SCHEDULE        SD,
            COMPANYS        CP,
            TNKR_AXLES_VW TA, 
            TRANSP_EQUIP TE
        WHERE 
            TA.EQPT_ID = TE.EQPT_ID
            AND SD.SHL_TANKER = TA.TNKR_CODE
            AND SD.SHLS_SUPP = CP.CMPY_CODE
    ) TX
WHERE
    TX.TRIP_NO = SA.TRIP_NO(+)
    AND TX.SUPP_CODE = SA.SUPP(+)
    AND TX.TNKR_AXLE_ID = SA.AXLE_ID(+)
/
