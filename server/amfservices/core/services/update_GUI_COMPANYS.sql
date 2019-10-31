
  CREATE OR REPLACE FORCE VIEW "GUI_COMPANYS" ("CMPY_CODE", "CMPY_NAME", "CMPY_TYPE", "SITE_MANAGER", "SUPPLIER", "CARRIER", "CUSTOMER", "DRAWER", "ISSUER", "EMPLOYER", "HOST", "CMPY_ADD_PROMPT", "CMPY_AOI", "CMPY_AUTO_LD", "CMPY_AUTO_RECONC", "CMPY_BAY_LOOP_CH", "CMPY_BLTOL_FLAG", "CMPY_BOL_VP_NAME", "CMPY_CHECK_LICEN", "CMPY_COMMS_OK", "CMPY_COMPRESS_BL", "CMPY_DRV_INST_VP", "CMPY_ENABLE_EXPD", "CMPY_EXP_CODE", "CMPY_FLAG_1", "CMPY_FLAG_2", "CMPY_FLAG_3", "CMPY_HOST", "CMPY_HOST_DOCS", "CMPY_ISSU", "CMPY_LD_REP_VP", "CMPY_LDGO_DELTA", "CMPY_LDTOL_FLAG", "CMPY_LOG_LD_DEL", "CMPY_MOD_DRAWER", "CMPY_MSG", "CMPY_MUST_SEALNO", "CMPY_ORD_CARRIER", "CMPY_ORD_END", "CMPY_ORD_LAST", "CMPY_ORD_STRT", "CMPY_REQ_PIN_FLAG", "CMPY_RPT_T_UNIT", "CMPY_RPT_TEMP", "CMPY_RTN_PROMPT", "CMPY_SEAL_NUMBER", "CMPY_TKR_ACTIVAT", "CMPY_TKR_CFG", "CMPY_TRIP_END", "CMPY_TRIP_LAST", "CMPY_TRIP_STRT", "CMPY_VET", "CMPY_WGH_AUTO_FL", "CMPY_WGH_COMPLET", "CMPY_WIPE_ORDETS", "CMPY_PLANT", "CMPY_SCHD_REV_REPOST", "CMPY_SCHD_ARCHIVE", "CMPY_MOVEMENTS_REV", "CMPY_REPORT_RECEIVERS") AS 
  SELECT CMPY_CODE,
          CMPY_NAME,
          CMPY_TYPE,
          DECODE (
             CMPY_TYPE,
             999, 'F',
             (CASE
                 WHEN (BITAND (cmpy_type, POWER (2, 0)) = POWER (2, 0))
                 THEN
                    'Y'
                 ELSE
                    'F'
              END))
             AS SITE_MANAGER,
          DECODE (
             CMPY_TYPE,
             999, 'F',
             (CASE
                 WHEN (BITAND (cmpy_type, POWER (2, 1)) = POWER (2, 1))
                 THEN
                    'Y'
                 ELSE
                    'F'
              END))
             AS SUPPLIER,
          DECODE (
             CMPY_TYPE,
             999, 'F',
             (CASE
                 WHEN (BITAND (cmpy_type, POWER (2, 2)) = POWER (2, 2))
                 THEN
                    'Y'
                 ELSE
                    'F'
              END))
             AS CARRIER,
          DECODE (
             CMPY_TYPE,
             999, 'F',
             (CASE
                 WHEN (BITAND (cmpy_type, POWER (2, 3)) = POWER (2, 3))
                 THEN
                    'Y'
                 ELSE
                    'F'
              END))
             AS CUSTOMER,
          DECODE (
             CMPY_TYPE,
             999, 'F',
             (CASE
                 WHEN (BITAND (cmpy_type, POWER (2, 4)) = POWER (2, 4))
                 THEN
                    'Y'
                 ELSE
                    'F'
              END))
             AS DRAWER,
          DECODE (
             CMPY_TYPE,
             999, 'F',
             (CASE
                 WHEN (BITAND (cmpy_type, POWER (2, 5)) = POWER (2, 5))
                 THEN
                    'Y'
                 ELSE
                    'F'
              END))
             AS ISSUER,
          DECODE (
             CMPY_TYPE,
             999, 'F',
             (CASE
                 WHEN (BITAND (cmpy_type, POWER (2, 6)) = POWER (2, 6))
                 THEN
                    'Y'
                 ELSE
                    'F'
              END))
             AS EMPLOYER,
          DECODE (
             CMPY_TYPE,
             999, 'F',
             (CASE
                 WHEN (BITAND (cmpy_type, POWER (2, 7)) = POWER (2, 7))
                 THEN
                    'Y'
                 ELSE
                    'F'
              END))
             AS HOST,
          CMPY_ADD_PROMPT,
          CMPY_AOI,
          CMPY_AUTO_LD,
          CMPY_AUTO_RECONC,
          CMPY_BAY_LOOP_CH,
          CMPY_BLTOL_FLAG,
          CMPY_BOL_VP_NAME,
          CMPY_CHECK_LICEN,
          CMPY_COMMS_OK,
          CMPY_COMPRESS_BL,
          CMPY_DRV_INST_VP,
          CMPY_ENABLE_EXPD,
          CMPY_EXP_CODE,
          CMPY_FLAG_1,
          CMPY_FLAG_2,
          CMPY_FLAG_3,
          CMPY_HOST,
          CMPY_HOST_DOCS,
          CMPY_ISSU,
          CMPY_LD_REP_VP,
          CMPY_LDGO_DELTA,
          CMPY_LDTOL_FLAG,
          CMPY_LOG_LD_DEL,
          CMPY_MOD_DRAWER,
          CMPY_MSG,
          CMPY_MUST_SEALNO,
          CMPY_ORD_CARRIER,
          CMPY_ORD_END,
          CMPY_ORD_LAST,
          CMPY_ORD_STRT,
          CMPY_REQ_PIN_FLAG,
          CMPY_RPT_T_UNIT,
          CMPY_RPT_TEMP,
          CMPY_RTN_PROMPT,
          CMPY_SEAL_NUMBER,
          CMPY_TKR_ACTIVAT,
          CMPY_TKR_CFG,
          CMPY_TRIP_END,
          CMPY_TRIP_LAST,
          CMPY_TRIP_STRT,
          CMPY_VET,
          CMPY_WGH_AUTO_FL,
          CMPY_WGH_COMPLET,
          CMPY_WIPE_ORDETS,
          CMPY_PLANT,
          CMPY_SCHD_REV_REPOST,
          CMPY_SCHD_ARCHIVE,
          CMPY_MOVEMENTS_REV,
          CMPY_REPORT_RECEIVERS
     FROM COMPANYS
    WHERE 
		( 
-- 			( SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'N' AND COMPANYS.CMPY_CODE = SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE') )
			( SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'N' 
				AND ( COMPANYS.CMPY_CODE = SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE') 
					OR ( COMPANYS.CMPY_CODE in (select child_cmpy_code from company_relation where parent_cmpy_code=SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE') and parent_cmpy_role=1 and (child_cmpy_code not in (select cmpy_code from companys where bitand(cmpy_type,2)>0)) ) ) 
					OR ( COMPANYS.CMPY_CODE in (select CUST_CODE from CUSTOMER where CUST_SUPP=SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE') and (CUST_CODE not in (select cmpy_code from companys where bitand(cmpy_type,2)>0)) ) ) 
				) 
			)
			OR SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE') IS NULL
			OR SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'Y'
			OR SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') IS NULL
		)
		AND COMPANYS.CMPY_CODE <> 'ANY'
		AND COMPANYS.CMPY_CODE <> 'BaSePrOd';
