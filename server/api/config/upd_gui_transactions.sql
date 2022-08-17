CREATE OR REPLACE FORCE VIEW GUI_TRANSACTIONS
AS
SELECT 
    trsa.TRSA_TERMINAL                                         AS TRSA_TERMINAL,
    term.TERM_NAME                                             AS TRSA_SITENAME,
    term.TERM_CODE || ' - ' || term.TERM_NAME                  AS TRSA_SITEDESC,
    trsa.TRSA_BAY_CD                                           AS TRSA_BAY_CD,
    trsa.TRSA_ID                                               AS TRSA_ID,
    schd.SHLS_TRIP_NO                                          AS TRSA_TRIP,
    load.LOAD_ID                                               AS LOAD_ID,
    load.LOAD_TANKER                                           AS TRSA_TANKER,
    trsa.TRSA_OPER                                             AS TRSA_OPER,
    oper.PER_NAME                                              AS TRSA_PER_NAME,
    DECODE(trsa.TRSA_OPER, NULL, '', oper.PER_CODE || ' - ' || oper.PER_NAME)                    AS TRSA_OPERDESC,
    TO_CHAR (trsa.TRSA_ST_DMY, 'yyyy-mm-dd hh24:mi:ss')        AS TRSA_ST_DMY,
    TO_CHAR (trsa.TRSA_ED_DMY, 'yyyy-mm-dd hh24:mi:ss')        AS TRSA_ED_DMY,
    schd.SHLS_SUPP                                             AS TRSA_SUPPLIER,
    scmp.CMPY_NAME                                             AS TRSA_SUPPNAME,
    scmp.CMPY_CODE || ' - ' || scmp.CMPY_NAME                  AS TRSA_SUPPDESC,
    tnkr.TNKR_CARRIER                                          AS TRSA_CARRIER,
    ccmp.CMPY_NAME                                             AS TRSA_CARRNAME,
    ccmp.CMPY_CODE || ' - ' || ccmp.CMPY_NAME                  AS TRSA_CARRDESC,
    schd.SHLS_DRAWER                                           AS TRSA_DRAWER,
    trsa.TRSA_REVERSE_FLAG                                     AS TRSA_REVERSE_FLAG,
    trsa.TRSA_REVERSE                                          AS TRSA_REVERSE,
    trsa.TRSA_CRT_DMY                                          AS TRSA_CRT_DMY,
    trsa.TRSA_PSN                                              AS TRSA_USER,
    gusr.PER_NAME                                              AS TRSA_PSN,
    DECODE(trsa.TRSA_PSN, NULL, '', gusr.PER_CODE || ' - ' || gusr.PER_NAME)                    AS TRSA_USERDESC
FROM 
    TERMINAL                 term,
    TANKERS                  tnkr,
    LOADS                    load,
    SCHEDULE                 schd,
    TRANSACTIONS             trsa,
    COMPANYS                 scmp,
    COMPANYS                 ccmp,
    PERSONNEL                oper,
    PERSONNEL                gusr
WHERE 
    (   ( (SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'N') AND (schd.SHLS_SUPP = SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE')) )
        OR (SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE') IS NULL)
        OR (SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'Y')
        OR (SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') IS NULL)   )
    AND trsa.TRSA_TERMINAL = term.TERM_CODE
    AND tnkr.TNKR_CODE = schd.SHL_TANKER
    AND tnkr.TNKR_CODE = load.LOAD_TANKER
    AND load.LD_TERMINAL = schd.SHLSLOAD_LD_TRM
    AND load.LOAD_ID = schd.SHLSLOAD_LOAD_ID
    AND load.LD_TERMINAL = trsa.TRSA_TERMINAL
    AND load.LOAD_ID = trsa.TRSALDID_LOAD_ID
    AND trsa.TRSA_OPER = oper.PER_CODE(+)
    AND trsa.TRSA_PSN = gusr.PER_CODE(+)
    AND schd.SHLS_SUPP = scmp.CMPY_CODE(+)
    AND tnkr.TNKR_CARRIER = ccmp.CMPY_CODE(+)
-- ORDER BY TRSA_ID
/
