/*
    Add the following new columns in table SCHEDULE:
    SHLS_CNVRT_TRACE: The indicator of whether the schedule type is changed
        NULL: No changes
        '32': A schedule is converted from Pre-Order to Pre-Schedule
        '23': A schedule is reverted from Pre-Schedule to Pre-Order
    SHLS_CNVRT_TIME: The time when the schedule type is changed.
*/

alter table SCHEDULE add SHLS_CNVRT_TRACE VARCHAR2(10);
alter table SCHEDULE add SHLS_CNVRT_TIME DATE;


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
