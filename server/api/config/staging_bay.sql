/*
    define the SITE_USE_STAGING_BAY to determine whether the Staging Bay is enabled for the site
    Y: enable the Staging Bay for the site
    N: disable the Staging Bay for the site
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_USE_STAGING_BAY';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_USE_STAGING_BAY', 'Y', 'Enable the Staging Bay for the site', NULL );

commit;


/*
    define the SITE_CMPY_LOAD_OPTIONS_DEFAULT to set the default value of the company load options:
    a. it is the STRING value contains 8 characters/bytes;
    b. each character/byte has the value 0, 1, 2, or 3
        0 - No check
        1 - To restrict loading at Loading bays to Normal loads only.
        2 - To restrict loading at Loading bays to Pickup loads only.
        3 - To enable loading at Loading bays to both Normal and Pickup loads.
    c. each character/byte represents the loading option of a company type:
        byte1: SITE MANAGER
        byte2: SUPPLIER
        byte3: CARRIER
        byte4: CUSTOMER
        byte5: DRAWER
        byte6: ISSUER
        byte7: EMPLOYER
        byte8: HOST
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_CMPY_LOAD_OPTIONS_DEFAULT';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_CMPY_LOAD_OPTIONS_DEFAULT', '00000000', 'The default value of the company load options when Staging Bay enabled', NULL );

commit;


/*
    define the SITE_CMPY_LOAD_OPTIONS_EDITABLE to set the editibility of company load options:
    a. it is the STRING value contains 8 characters/bytes;
    b. each character/byte has the value 0 or 1
        0 - not editable
        1 - editable
    c. each character/byte represents the editability of the loading option  of a company type:
        byte1: SITE MANAGER
        byte2: SUPPLIER
        byte3: CARRIER
        byte4: CUSTOMER
        byte5: DRAWER
        byte6: ISSUER
        byte7: EMPLOYER
        byte8: HOST
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_CMPY_LOAD_OPTIONS_EDITABLE';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_CMPY_LOAD_OPTIONS_EDITABLE', '01001000', 'Set the editibility of company load options when Staging Bay enabled', NULL );

commit;



/*
    add new column BA_LOAD_OPTION to table BAY_AREA, which will have the following values
    0: No check
    1: To restrict loading at Loading bays to Normal loads only.
    2: To restrict loading at Loading bays to Pickup loads only.
    3: To enable loading at Loading bays to both Normal and Pickup loads.
*/
alter table BAY_AREA add BA_LOAD_OPTION NUMBER(2) DEFAULT 0;



/*
	add contents for ENUM STAGING_LOAD_OPTION
*/

delete from MSG_LOOKUP where MSG_ID in (3350, 3353);

commit;

insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3350, 'ENG', 'No Check');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3351, 'ENG', 'Normal Loads only');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3352, 'ENG', 'Pickup Loads only');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3353, 'ENG', 'Both Normal and Pickup Loads');

insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3350, 'CHN', '不用检查');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3351, 'CHN', '只允许普通提单');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3352, 'CHN', '只允许组合提单');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3353, 'CHN', '允许普通提单与组合提单');

commit;

delete from ENUMITEM where ENUMTYPENAME='STAGING_LOAD_OPTION';

insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('STAGING_LOAD_OPTION', 0, 'NC', 3350);
insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('STAGING_LOAD_OPTION', 1, 'NL', 3351);
insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('STAGING_LOAD_OPTION', 2, 'PL', 3352);
insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('STAGING_LOAD_OPTION', 3, 'NP', 3353);

commit;


-- Add VIEW for Load Options in staging bay

CREATE OR REPLACE VIEW STAGING_LOAD_OPTIONS
(STAGING_LOAD_OPTION_ID, STAGING_LOAD_OPTION_CODE, STAGING_LOAD_OPTION_NAME)
AS 
SELECT 
	ENUMITEM.ENUM_NO STAGING_LOAD_OPTION_ID
	, ENUMITEM.ENUM_CODE STAGING_LOAD_OPTION_CODE
	, MSG_GLBL.MESSAGE STAGING_LOAD_OPTION_NAME
FROM ENUMITEM,MSG_GLBL
WHERE ENUMITEM.ENUM_TMM=MSG_GLBL.MSG_ID
AND ENUMTYPENAME='STAGING_LOAD_OPTION';

/

commit;


/*
The following is the specification of the new table PICKUP_SCHEDULE_SPECS
    PLSS_PICKUP_TRIP	    NUMBER(15,0)	        No	The trip number of a Pickup Load
    PLSS_PICKUP_SUPP	    VARCHAR2(16 BYTE)	    No	The supplier company code of a Pickup Load
    PLSS_PICKUP_CMPT	    NUMBER(4,0)	            No	The compartment number of a Pickup Load
    PLSS_STAGED_TRIP	    NUMBER(15,0)	        No	The trip number of a Staged Trip
    PLSS_STAGED_SUPP	    VARCHAR2(16 BYTE)	    No	The supplier company code of a Staged Trip
    PLSS_STAGED_CMPT	    NUMBER(4,0)	            Yes	The compartment number of a Staged Trip (can be different from that of Pickup Load)
    PLSS_STAGED_PRODCODE	VARCHAR2(36 BYTE)	    Yes	The drawer product code of a Staged Trip (at either product or compartment level)
    PLSS_STAGED_PRODCMPY	VARCHAR2(16 BYTE)	    Yes	The drawer company code of a Staged Trip (at either product or compartment level)
    PLSS_STAGED_UNITS	    NUMBER(4,0)	            Yes	The product unit of a Staged Trip (at either product or compartment level)
    PLSS_STAGED_SPECQTY	    FLOAT	                Yes	The planned quantity of a Staged Trip (at either product or compartment level)
    PLSS_STAGED_PRLDQTY	    FLOAT	                Yes	The preloaded/returns quantity of a Staged Trip (at either product or compartment level)
    PLSS_STAGED_ORDER	    NUMBER(9,0)	            Yes	The order number linked to a Staged Trip (at either product or compartment level)
    PLSS_STAGED_CUST	    VARCHAR2(40 BYTE)	    Yes	The customer account of a Staged Trip (at either product or compartment level)
    PLSS_STAGED_DELVLOC	    VARCHAR2(16 BYTE)	    Yes	The delivery location of a Staged Trip (at either product or compartment level)
    PLSS_STAGED_LOADTYPE	NUMBER(2,0)	            Yes	The load type of a Staged Trip: 2 - Pre-Schedule; 3 - Pre-Order; 4 - Open Order
*/

CREATE TABLE PICKUP_SCHEDULE_SPECS
(
    PLSS_PICKUP_TRIP	    NUMBER(15,0)	        NOT NULL,
    PLSS_PICKUP_SUPP	    VARCHAR2(16 BYTE)	    NOT NULL,
    PLSS_PICKUP_CMPT	    NUMBER(4,0)	            NOT NULL,
    PLSS_STAGED_TRIP	    NUMBER(15,0)	        NOT NULL,
    PLSS_STAGED_SUPP	    VARCHAR2(16 BYTE)	    NOT NULL,
    PLSS_STAGED_CMPT	    NUMBER(4,0)	            ,
    PLSS_STAGED_PRODCODE	VARCHAR2(36 BYTE)	    ,
    PLSS_STAGED_PRODCMPY	VARCHAR2(16 BYTE)	    ,
    PLSS_STAGED_UNITS	    NUMBER(4,0)	            ,
    PLSS_STAGED_SPECQTY	    FLOAT	                ,
    PLSS_STAGED_PRLDQTY	    FLOAT	                ,
    PLSS_STAGED_ORDER	    NUMBER(9,0)	            ,
    PLSS_STAGED_CUST	    VARCHAR2(40 BYTE)	    ,
    PLSS_STAGED_DELVLOC	    VARCHAR2(16 BYTE)	    ,
    PLSS_STAGED_LOADTYPE	NUMBER(2,0)	            
);

ALTER TABLE PICKUP_SCHEDULE_SPECS
ADD CONSTRAINT UK_PICKUP_SCHEDULE_SPECS UNIQUE (
    PLSS_PICKUP_TRIP, PLSS_PICKUP_SUPP, PLSS_PICKUP_CMPT, PLSS_STAGED_TRIP, PLSS_STAGED_SUPP, PLSS_STAGED_CMPT, PLSS_STAGED_PRODCODE, PLSS_STAGED_PRODCMPY, PLSS_STAGED_ORDER
);

ALTER TABLE PICKUP_SCHEDULE_SPECS
ADD CONSTRAINT FK_PICKUP_CMPT FOREIGN KEY (PLSS_PICKUP_TRIP, PLSS_PICKUP_SUPP, PLSS_PICKUP_CMPT)
REFERENCES SPECDETS (SCHDSPEC_SHLSTRIP, SCHDSPEC_SHLSSUPP, SCHD_COMP_ID);

ALTER TABLE PICKUP_SCHEDULE_SPECS
ADD CONSTRAINT FK_STAGED_TRIP FOREIGN KEY (PLSS_STAGED_TRIP, PLSS_STAGED_SUPP)
REFERENCES SCHEDULE (SHLS_TRIP_NO, SHLS_SUPP);

ALTER TABLE PICKUP_SCHEDULE_SPECS
ADD CONSTRAINT FK_STAGED_PROD FOREIGN KEY (PLSS_STAGED_PRODCODE, PLSS_STAGED_PRODCMPY)
REFERENCES PRODUCTS (PROD_CODE, PROD_CMPY);

ALTER TABLE PICKUP_SCHEDULE_SPECS
ADD CONSTRAINT FK_STAGED_ORDER FOREIGN KEY (PLSS_STAGED_ORDER)
REFERENCES CUST_ORDER (ORDER_NO);

ALTER TABLE PICKUP_SCHEDULE_SPECS
ADD CONSTRAINT FK_STAGED_CUST FOREIGN KEY (PLSS_STAGED_CUST)
REFERENCES CUSTOMER (CUST_ACCT);

ALTER TABLE PICKUP_SCHEDULE_SPECS
ADD CONSTRAINT FK_STAGED_DELVLOC FOREIGN KEY (PLSS_STAGED_DELVLOC)
REFERENCES DELV_LOCATION (DLV_CODE);


/*
    add new column SHLS_PICKUP_MODE to table SCHEDULE, which will have the following values
    0: Normal Load.
    1: Pickup load.
    2: Staged Load.
*/
alter table SCHEDULE add SHLS_PICKUP_MODE NUMBER(2) DEFAULT 0;


/*
	add contents for ENUM STAGING_LOAD_MODE
*/

delete from MSG_LOOKUP where MSG_ID in (3354, 3356);

commit;

insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3354, 'ENG', 'Normal Load');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3355, 'ENG', 'Pickup Load');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3356, 'ENG', 'Staged Load');

insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3354, 'CHN', '普通提单');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3355, 'CHN', '组合提单');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3356, 'CHN', '被组合提单');

commit;

delete from ENUMITEM where ENUMTYPENAME='STAGING_LOAD_MODE';

insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('STAGING_LOAD_MODE', 0, 'NL', 3354);
insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('STAGING_LOAD_MODE', 1, 'PL', 3355);
insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('STAGING_LOAD_MODE', 2, 'SL', 3356);

commit;


-- Add VIEW for Load Options in staging bay

CREATE OR REPLACE VIEW STAGING_LOAD_MODES
(STAGING_LOAD_MODE_ID, STAGING_LOAD_MODE_CODE, STAGING_LOAD_MODE_NAME)
AS 
SELECT 
	ENUMITEM.ENUM_NO STAGING_LOAD_MODE_ID
	, ENUMITEM.ENUM_CODE STAGING_LOAD_MODE_CODE
	, MSG_GLBL.MESSAGE STAGING_LOAD_MODE_NAME
FROM ENUMITEM,MSG_GLBL
WHERE ENUMITEM.ENUM_TMM=MSG_GLBL.MSG_ID
AND ENUMTYPENAME='STAGING_LOAD_MODE';

/

commit;



/*
    add new column LOAD_PICKUP_MODE to table LOADS, which will have the following values
    0: Normal Load.
    1: Pickup load.
    2: Staged Load.
*/
alter table LOADS add LOAD_PICKUP_MODE NUMBER(2) DEFAULT 0;






/*
    Further changes on some VIEWs might be required later
*/


/*
    add new column SHLS_PICKUP_MODE to view GUISCHEDULES, which will have the following values
    0: Normal Load.
    1: Pickup load.
    2: Staged Load.
*/
CREATE OR REPLACE FORCE VIEW GUI_SCHEDULES  AS 
SELECT s.SHLS_TERMINAL,
          sp.CMPY_CODE Supplier_Code,
          sp.CMPY_NAME Supplier,
          s.SHLS_TRIP_NO,
          s.SHLS_SOLD_TO_NUM,
          s.SHLS_SHIP_TO_NUM,
          s.SHL_FLEET_DATA,
          ca.CMPY_CODE Carrier_Code,
          ca.CMPY_NAME Carrier,
          t.TNKR_CODE,
          t.TNKR_NAME,
          TO_CHAR (s.SHLS_CALDATE, 'YYYY-MM-DD HH24:MI:SS') AS SHLS_CALDATE,
          s.SHLS_SHIFT,
          DECODE (S.shls_profile,  2, '-',  0, ' ',  1, '*')
             AS SHEDULE_PROFILE,
          s.SHLS_LD_TYPE,
          DECODE (SHL_RET_LOC, 'UNKNOWN', NULL, SHL_RET_LOC) AS SHL_RET_LOC,
          s.SHLS_PRIORITY,
          NVL (s.SHLSLOAD_LOAD_ID, 0) AS SHLSLOAD_LOAD_ID,
          o.ORDER_NO,
          o.ORDER_REF_CODE,
          o.ORDER_CUST,
          o.ORDER_CUST_CMPY_CODE,
          o.ORDER_CUST_CMPY_NAME,
          o.ORDER_CUST_ORDNO,
          NVL (s.STATS, 'F') AS status,
          --            s.STATS AS status,
          p.PER_NAME OPERATOR,
          TO_CHAR (s.SHLS_EXP, 'YYYY-MM-DD hh24:mi:ss') AS SHLS_EXP2,
          s.SHLS_DRIVER DRIVER,
          drvr.PER_NAME DRIVER_NAME,
          drvrcmpy.CMPY_CODE DRIVER_COMPANY,
          drvrcmpy.CMPY_NAME DRIVER_COMPANY_NAME,
          --            s_stat_ty.SHL_LD_STATE_NAME AS SHLS_STATUS,
          DECODE (schd_stat_lkp.STATUS_TEXT,
                  NULL, 'UNKNOWN',
                  schd_stat_lkp.STATUS_TEXT)
             AS SHLS_STATUS,
          s.LD_START AS SHLS_LD_START,
          s.LD_END AS SHLS_LD_END,
          s.LAST_CHG_TIME AS LAST_CHG_TIME,
          dws.CMPY_CODE drawer_Code,
          dws.CMPY_NAME drawer_Name,
          CASE
             WHEN s.SHLSLOAD_LOAD_ID IS NULL
                  AND EXISTS
                         (SELECT 1
                            FROM schedule s_sub, specdets d
                           WHERE     s_sub.shls_trip_no = d.schdspec_shlstrip
                                 AND s_sub.shls_supp = d.schdspec_shlssupp
                                 AND s_sub.shls_trip_no = s.shls_trip_no
                                 AND s_sub.shls_supp = s.shls_supp)
                  AND EXISTS
                         (SELECT 1
                            FROM schedule s_sub, specprod p
                           WHERE     s_sub.shls_trip_no = p.schpspid_shlstrip
                                 AND s_sub.shls_supp = p.schpspid_shlssupp
                                 AND s_sub.shls_trip_no = s.shls_trip_no
                                 AND s_sub.shls_supp = s.shls_supp)
             THEN
                'PreSchedule'
             WHEN s.SHLSLOAD_LOAD_ID IS NULL
                  AND NOT EXISTS
                             (SELECT 1
                                FROM schedule s_sub, specdets d
                               WHERE s_sub.shls_trip_no = d.schdspec_shlstrip
                                     AND s_sub.shls_supp =
                                            d.schdspec_shlssupp
                                     AND s_sub.shls_trip_no = s.shls_trip_no
                                     AND s_sub.shls_supp = s.shls_supp)
                  AND EXISTS
                         (SELECT 1
                            FROM schedule s_sub, specprod p
                           WHERE     s_sub.shls_trip_no = p.schpspid_shlstrip
                                 AND s_sub.shls_supp = p.schpspid_shlssupp
                                 AND s_sub.shls_trip_no = s.shls_trip_no
                                 AND s_sub.shls_supp = s.shls_supp)
             THEN
                'PreOrder'
             WHEN s.SHLSLOAD_LOAD_ID IS NULL
                  AND NOT EXISTS
                             (SELECT 1
                                FROM schedule s_sub, specdets d
                               WHERE s_sub.shls_trip_no = d.schdspec_shlstrip
                                     AND s_sub.shls_supp =
                                            d.schdspec_shlssupp
                                     AND s_sub.shls_trip_no = s.shls_trip_no
                                     AND s_sub.shls_supp = s.shls_supp)
                  AND NOT EXISTS
                             (SELECT 1
                                FROM schedule s_sub, specprod p
                               WHERE s_sub.shls_trip_no = p.schpspid_shlstrip
                                     AND s_sub.shls_supp =
                                            p.schpspid_shlssupp
                                     AND s_sub.shls_trip_no = s.shls_trip_no
                                     AND s_sub.shls_supp = s.shls_supp)
             THEN
                'InvalidType'
             WHEN s.SHLSLOAD_LOAD_ID IS NOT NULL
                  AND EXISTS
                         (SELECT 1
                            FROM loads l
                           WHERE s.SHLSLOAD_LOAD_ID = l.LOAD_ID
                                 AND s.SHLSLOAD_LD_TRM = l.LD_TERMINAL)
             THEN
                (SELECT DECODE (LOAD_TYPE,
                                0, 'InvalidType',
                                1, 'PreSchedule',
                                2, 'PreOrder',
                                3, 'Order',
                                4, 'Bridger',
                                5, 'Refueller',
                                6, 'CustomerOrder',
                                7, 'ProductAlloc',
                                8, 'HostDets',
                                9, 'WeighBridge')
                   FROM loads l
                  WHERE l.LOAD_ID = s.SHLSLOAD_LOAD_ID
                        AND l.LD_TERMINAL = s.SHLSLOAD_LD_TRM)
          END
             AS ld_type,
          l.LOAD_REVERSE_FLAG,
          s.SHLS_TRIP_NO_ORG,
          s.SHLS_SUPP_ORG,
          s.SHLS_ISOTAINER_NUM,
          DECODE(s.SHLS_SRCTYPE,NULL,0, s.SHLS_SRCTYPE) as SHLS_SRCTYPE,
          sp.CMPY_SCHD_REV_REPOST,
          sp.CMPY_SCHD_ARCHIVE,
          lw.SUM_LDW_START_KG,
          lw.SUM_LDW_END_KG,
          SPECVARS_TMP.SCHV_TEXT as "SHL_RSS_INFDEL", -- Temporarily used for SPEC_INSTRUCTIONS
          SPECVARS_TMP.SCHV_TEXT as "SHLS_SPEC_INS",
          s.SHLS_LOAD_SECURITY_INFO,
          NVL(s.SHLS_CNVRT_TRACE, 'NA') AS SHLS_CNVRT_TRACE,
          TO_CHAR(s.SHLS_CNVRT_TIME, 'YYYY-MM-DD HH24:MI:SS') AS SHLS_CNVRT_TIME,
          NVL(s.SHLS_PICKUP_MODE, 0)  as SHLS_PICKUP_MODE,
          slm.STAGING_LOAD_MODE_NAME  as SHLS_PICKUP_MODE_DESC,
          s.SHLS_CUST
     FROM SCHEDULE s,
          LOADS l,
  (Select LISTAGG(SCHV_TEXT, CHR(13)) WITHIN GROUP (ORDER BY SCHV_VAR_ID) SCHV_TEXT, SCHVSPID_SHLSTRIP, SCHVSPID_SHLSSUPP from SPECVARS
          GROUP BY SCHVSPID_SHLSTRIP, SCHVSPID_SHLSSUPP) SPECVARS_TMP, 
          PERSONNEL p,
          PERSONNEL drvr,
          TANKERS t,
          COMPANYS sp,
          COMPANYS dws,
          COMPANYS ca,
          COMPANYS drvrcmpy,
          STAGING_LOAD_MODES slm,
          SHL_LD_STATE_TYP s_stat_ty,
          SCHEDULE_STATUS_SHORT_LOOKUP schd_stat_lkp,
          (SELECT
             LDW_ID_LOAD_ID,
             LDW_ID_LD_TRM,
             SUM(LDW_STRT_KG) AS SUM_LDW_START_KG,
             SUM(LDW_END_KG) AS SUM_LDW_END_KG
             FROM LOADS,
                  LOAD_WEIGTHS
             WHERE LDW_ID_LOAD_ID(+) = LOAD_ID
               AND LDW_ID_LD_TRM(+) = LD_TERMINAL
             GROUP BY LDW_ID_LD_TRM, LDW_ID_LOAD_ID
          ) lw,
          (SELECT ORD_SCHEDULE.OS_SHL_SHLSTRIP,
                  ORD_SCHEDULE.OS_SHL_SHLSSUPP,
                  CUST_ORDER.ORDER_NO,
                  CUST_ORDER.ORDER_REF_CODE,
                  CUST_ORDER.ORDER_CUST,
                  CUSTOMER.CUST_CODE AS ORDER_CUST_CMPY_CODE,
                  COMPANYS.CMPY_NAME AS ORDER_CUST_CMPY_NAME,
                  CUST_ORDER.ORDER_CUST_ORDNO
             FROM ORD_SCHEDULE,
                  CUST_ORDER,
                  CUSTOMER,
                  COMPANYS
            WHERE     CUST_ORDER.ORDER_NO = ORD_SCHEDULE.OS_ORDER_NO
                  AND CUST_ORDER.ORDER_CUST = CUSTOMER.CUST_ACCT
                  AND CUSTOMER.CUST_CODE = COMPANYS.CMPY_CODE) o
    WHERE     s.SHL_TANKER = t.TNKR_CODE
          AND s.SHLS_SUPP = sp.CMPY_CODE
          AND s.SHLS_DRAWER = dws.CMPY_CODE
          AND (s.SHLS_CLASS IS NULL OR s.SHLS_CLASS != 1)
          AND s.SHLSLOAD_LOAD_ID = l.LOAD_ID(+)
          AND s.SHLSLOAD_LD_TRM = l.LD_TERMINAL(+)
          AND t.TNKR_CARRIER = ca.CMPY_CODE
          AND s.OPERATOR = p.PER_CODE(+)
          AND o.OS_SHL_SHLSTRIP(+) = s.SHLS_TRIP_NO
          AND o.OS_SHL_SHLSSUPP(+) = s.SHLS_SUPP
          AND NVL(s.SHLS_PICKUP_MODE, 0) =  slm.STAGING_LOAD_MODE_ID(+)
          AND s.SHLS_LD_TYPE = s_stat_ty.SHL_LD_STATE_ID(+)
          AND lw.LDW_ID_LOAD_ID(+) = l.LOAD_ID
          AND lw.LDW_ID_LD_TRM(+) = l.LD_TERMINAL
  AND s.SHLS_TRIP_NO = SPECVARS_TMP.SCHVSPID_SHLSTRIP (+) 
  AND s.SHLS_SUPP = SPECVARS_TMP.SCHVSPID_SHLSSUPP (+) 
          AND s.SHLS_DRIVER = drvr.PER_CODE(+)
          AND drvr.PER_CMPY = drvrcmpy.CMPY_CODE(+)
          AND NVL (s.STATS, 'F') = schd_stat_lkp.STATUS_CODE(+)
          AND ( (s.SHLS_EXP IS NULL)
               OR (TO_CHAR (s.SHLS_EXP, 'yyyy') != '1970'))
          AND ( (SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'N'
                 AND sp.CMPY_CODE = SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE'))
               OR SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE') IS NULL
               OR SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'Y'
               OR SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') IS NULL)
ORDER BY s.SHLS_TRIP_NO DESC
/

commit;


-- create a new company 9998 - Pickup Load Company for Staging Bay Pickup Loads
Insert into COMPANYS (CMPY_CODE,CMPY_NAME,CMPY_TYPE,CMPY_COMPRESS_BL,CMPY_CHECK_LICEN,CMPY_LDGO_DELTA,CMPY_MSG,CMPY_VET,CMPY_TKR_CFG,CMPY_ENABLE_EXPD,CMPY_SEAL_NUMBER,CMPY_EXP_CODE,CMPY_ISSU,CMPY_HOST,CMPY_AOI,CMPY_AUTO_LD,CMPY_RTN_PROMPT,CMPY_ADD_PROMPT,CMPY_LOG_LD_DEL,CMPY_HOST_DOCS,CMPY_COMMS_OK,CMPY_TKR_ACTIVAT,CMPY_BOL_VP_NAME,CMPY_LD_REP_VP,CMPY_DRV_INST_VP,CMPY_WGH_COMPLET,CMPY_WGH_AUTO_FL,CMPY_TRIP_STRT,CMPY_TRIP_END,CMPY_TRIP_LAST,CMPY_ORD_CARRIER,CMPY_WIPE_ORDETS,CMPY_FLAG_1,CMPY_FLAG_2,CMPY_FLAG_3,CMPY_RPT_T_UNIT,CMPY_RPT_TEMP,CMPY_AUTO_RECONC,CMPY_BAY_LOOP_CH,CMPY_ORD_STRT,CMPY_ORD_END,CMPY_ORD_LAST,CMPY_MOD_DRAWER,CMPY_MUST_SEALNO,CMPY_BLTOL_FLAG,CMPY_LDTOL_FLAG,CMPY_REQ_PIN_FLAG,CMPY_PLANT,CMPY_SCHD_REV_REPOST,CMPY_SCHD_ARCHIVE,CMPY_MOVEMENTS_REV,CMPY_ADDR,CMPY_REPORT_RECEIVERS,CMPY_PERMIT_NO,CMPY_NO_MSG_TO_SITEMGR,CMPY_LOGO,CMPY_PIDX_CARRIER,CMPY_PIDX_SUPPLIER,CMPY_PIDX_DRAWER,CMPY_PIDX_CUSTOMER,CMPY_PIDX_FEIN,CMPY_PIDX_SSN,CMPY_PIDX_CARRIER_FEIN) 
values ('9998','Pickup Load Company',18,'N','N',null,null,null,'N','N',null,null,null,null,null,'N',null,'N','N','N','N','N',null,null,null,'N','N',1,999999999,0,'N','N','N','N','N',null,null,'N','N',1,999999999,0,'N','N',0,0,0,null,'N','N','N',null,null,null,'N',null,null,null,null,null,null,null,null);

commit;

Insert into COMPANY_CONFIG (CMPY_CODE,CONFIG_KEY,CONFIG_VALUE,CONFIG_COMMENT) values ('9998','AUTH_AT_GATE','N',null);
Insert into COMPANY_CONFIG (CMPY_CODE,CONFIG_KEY,CONFIG_VALUE,CONFIG_COMMENT) values ('9998','AUTO_COMPLETE_NON_PRESCHD_LOADS','N',null);
Insert into COMPANY_CONFIG (CMPY_CODE,CONFIG_KEY,CONFIG_VALUE,CONFIG_COMMENT) values ('9998','AXLE_REQUIRED','N',null);
Insert into COMPANY_CONFIG (CMPY_CODE,CONFIG_KEY,CONFIG_VALUE,CONFIG_COMMENT) values ('9998','CMPY_2ND_DRAWER',null,null);
Insert into COMPANY_CONFIG (CMPY_CODE,CONFIG_KEY,CONFIG_VALUE,CONFIG_COMMENT) values ('9998','CMPY_2ND_DRAWER_FLAG','N',null);
Insert into COMPANY_CONFIG (CMPY_CODE,CONFIG_KEY,CONFIG_VALUE,CONFIG_COMMENT) values ('9998','CMPY_GUARDMASTER_PRODUCT_FLAG','N',null);
Insert into COMPANY_CONFIG (CMPY_CODE,CONFIG_KEY,CONFIG_VALUE,CONFIG_COMMENT) values ('9998','CMPY_LOAD_OPTIONS','02002000',null);
Insert into COMPANY_CONFIG (CMPY_CODE,CONFIG_KEY,CONFIG_VALUE,CONFIG_COMMENT) values ('9998','CMPY_RTL_AUTHORIZE_LOAD','N',null);
Insert into COMPANY_CONFIG (CMPY_CODE,CONFIG_KEY,CONFIG_VALUE,CONFIG_COMMENT) values ('9998','CMPY_RTL_BOL_SEND','N',null);
Insert into COMPANY_CONFIG (CMPY_CODE,CONFIG_KEY,CONFIG_VALUE,CONFIG_COMMENT) values ('9998','CMPY_TRIP_EXPIRY_HOURS',null,null);
Insert into COMPANY_CONFIG (CMPY_CODE,CONFIG_KEY,CONFIG_VALUE,CONFIG_COMMENT) values ('9998','LOAD_VEHICLE_WEIGHT_TOLERANCE',null,null);
Insert into COMPANY_CONFIG (CMPY_CODE,CONFIG_KEY,CONFIG_VALUE,CONFIG_COMMENT) values ('9998','NO_CUSTOMER_ALLOWED','Y',null);
Insert into COMPANY_CONFIG (CMPY_CODE,CONFIG_KEY,CONFIG_VALUE,CONFIG_COMMENT) values ('9998','SAFEFILL_TOLERANCE_CHECK','N',null);
Insert into COMPANY_CONFIG (CMPY_CODE,CONFIG_KEY,CONFIG_VALUE,CONFIG_COMMENT) values ('9998','VALIDATE_SCHEDULE_AVAILABITILTY','N',null);
Insert into COMPANY_CONFIG (CMPY_CODE,CONFIG_KEY,CONFIG_VALUE,CONFIG_COMMENT) values ('9998','VALIDATE_SCHEDULE_MAX_WEIGHT','N',null);

commit;
