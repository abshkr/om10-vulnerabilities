
  CREATE OR REPLACE FORCE VIEW "GUI_PERSONNEL" ("PER_EXP_D1_DMY", "PER_EXP_D2_DMY", "PER_EXP_D3_DMY", "PER_CODE", "PER_NAME", "PER_CMPY", "PER_AUTH", "PER_LOCK", "PER_LAST_DMY", "PER_DEPARTMENT", "PER_PASSWD", "PER_LICENCE_NO", "PER_NEXT_MSG", "PER_PASSWD_2", "PER_LEVEL_NUM", "PER_TERMINAL", "PER_COMMENTS", "CMPY_CODE", "CMPY_NAME", "CMPY_TYPE", "CMPY_COMPRESS_BL", "CMPY_CHECK_LICEN", "CMPY_LDGO_DELTA", "CMPY_MSG", "CMPY_VET", "CMPY_TKR_CFG", "CMPY_ENABLE_EXPD", "CMPY_SEAL_NUMBER", "CMPY_EXP_CODE", "CMPY_ISSU", "CMPY_HOST", "CMPY_AOI", "CMPY_AUTO_LD", "CMPY_RTN_PROMPT", "CMPY_ADD_PROMPT", "CMPY_LOG_LD_DEL", "CMPY_HOST_DOCS", "CMPY_COMMS_OK", "CMPY_TKR_ACTIVAT", "CMPY_BOL_VP_NAME", "CMPY_LD_REP_VP", "CMPY_DRV_INST_VP", "CMPY_WGH_COMPLET", "CMPY_WGH_AUTO_FL", "CMPY_TRIP_STRT", "CMPY_TRIP_END", "CMPY_TRIP_LAST", "CMPY_ORD_CARRIER", "CMPY_WIPE_ORDETS", "CMPY_FLAG_1", "CMPY_FLAG_2", "CMPY_FLAG_3", "CMPY_RPT_T_UNIT", "CMPY_RPT_TEMP", "CMPY_AUTO_RECONC", "CMPY_BAY_LOOP_CH", "CMPY_ORD_STRT", "CMPY_ORD_END", "CMPY_ORD_LAST", "CMPY_MOD_DRAWER", "CMPY_MUST_SEALNO", "CMPY_BLTOL_FLAG", "CMPY_LDTOL_FLAG", "CMPY_REQ_PIN_FLAG", "PT_PSNCODE", "PT_TIMECD", "PERL_PSN", "PERL_ARA", "PERL_ENTER_TIME", "USER_ID", "USER_CODE", "USER_USERNAME", "USER_PASSWORD", "USER_TYPE", "USER_STATUS_FLAG", "USER_LOGIN_COUNT", "USER_LAST_REASON", "VALID_TIME", "EXPIRE_TIME", "RECORD_SWITCH", "RECORD_ORDER") AS 
  SELECT "PER_EXP_D1_DMY",
            "PER_EXP_D2_DMY",
            "PER_EXP_D3_DMY",
            "PER_CODE",
            "PER_NAME",
            "PER_CMPY",
            "PER_AUTH",
            "PER_LOCK",
            "PER_LAST_DMY",
            "PER_DEPARTMENT",
            "PER_PASSWD",
            "PER_LICENCE_NO",
            "PER_NEXT_MSG",
            "PER_PASSWD_2",
            "PER_LEVEL_NUM",
            "PER_TERMINAL",
            "PER_COMMENTS",
            "CMPY_CODE",
            "CMPY_NAME",
            "CMPY_TYPE",
            "CMPY_COMPRESS_BL",
            "CMPY_CHECK_LICEN",
            "CMPY_LDGO_DELTA",
            "CMPY_MSG",
            "CMPY_VET",
            "CMPY_TKR_CFG",
            "CMPY_ENABLE_EXPD",
            "CMPY_SEAL_NUMBER",
            "CMPY_EXP_CODE",
            "CMPY_ISSU",
            "CMPY_HOST",
            "CMPY_AOI",
            "CMPY_AUTO_LD",
            "CMPY_RTN_PROMPT",
            "CMPY_ADD_PROMPT",
            "CMPY_LOG_LD_DEL",
            "CMPY_HOST_DOCS",
            "CMPY_COMMS_OK",
            "CMPY_TKR_ACTIVAT",
            "CMPY_BOL_VP_NAME",
            "CMPY_LD_REP_VP",
            "CMPY_DRV_INST_VP",
            "CMPY_WGH_COMPLET",
            "CMPY_WGH_AUTO_FL",
            "CMPY_TRIP_STRT",
            "CMPY_TRIP_END",
            "CMPY_TRIP_LAST",
            "CMPY_ORD_CARRIER",
            "CMPY_WIPE_ORDETS",
            "CMPY_FLAG_1",
            "CMPY_FLAG_2",
            "CMPY_FLAG_3",
            "CMPY_RPT_T_UNIT",
            "CMPY_RPT_TEMP",
            "CMPY_AUTO_RECONC",
            "CMPY_BAY_LOOP_CH",
            "CMPY_ORD_STRT",
            "CMPY_ORD_END",
            "CMPY_ORD_LAST",
            "CMPY_MOD_DRAWER",
            "CMPY_MUST_SEALNO",
            "CMPY_BLTOL_FLAG",
            "CMPY_LDTOL_FLAG",
            "CMPY_REQ_PIN_FLAG",
            "PT_PSNCODE",
            "PT_TIMECD",
            "PERL_PSN",
            "PERL_ARA",
            "PERL_ENTER_TIME",
            "USER_ID",
            "USER_CODE",
            "USER_USERNAME",
            "USER_PASSWORD",
            "USER_TYPE",
            "USER_STATUS_FLAG",
            "USER_LOGIN_COUNT",
            "USER_LAST_REASON",
            "VALID_TIME",
            "EXPIRE_TIME",
            "RECORD_SWITCH",
            "RECORD_ORDER"
       FROM PERSONNEL,
            COMPANYS,
            PER_TIMECODE,
            PERS_IN_AREA,
            URBAC_USERS
      WHERE     PERSONNEL.PER_CMPY = COMPANYS.CMPY_CODE(+)
            AND PERSONNEL.PER_CODE = PER_TIMECODE.PT_PSNCODE(+)
            AND PERSONNEL.PER_CODE = PERS_IN_AREA.PERL_PSN(+)
            AND PERSONNEL.PER_CODE = URBAC_USERS.USER_CODE(+)
            AND ( 
-- 					(SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'N' AND COMPANYS.CMPY_CODE = SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE'))
					( SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'N' 
						AND ( COMPANYS.CMPY_CODE = SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE')
							or ( COMPANYS.CMPY_CODE in (select child_cmpy_code from company_relation where parent_cmpy_code=SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE') and parent_cmpy_role=1 and child_cmpy_role=6) ) 
						)
					)
                OR SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE') IS NULL
                OR SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'Y'
                OR SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') IS NULL)
            AND (URBAC_USERS.USER_CODE <> '9999'
                 AND URBAC_USERS.USER_CODE <> '8888')
            AND URBAC_USERS.USER_STATUS_FLAG <> 3
   ORDER BY PER_NAME;
