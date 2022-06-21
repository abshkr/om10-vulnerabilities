/*
    Add the following new columns in table TRANSP_EQUIP for the feature of Cross Over Protection at a terminal:
    EQPT_GUARD_MASTER_USED: a flag at equipment level to indicate if the guard master has been installed and enabled for loading.
    EQPT_GUARD_MASTER_DESC: an optional column to describe the details of Guard Master.
*/

alter table TRANSP_EQUIP add EQPT_GUARD_MASTER_USED VARCHAR2(2) DEFAULT 'N';
alter table TRANSP_EQUIP add EQPT_GUARD_MASTER_DESC VARCHAR2(200);


-- update GUI_EQUIPMENT_LIST to add new columns

CREATE OR REPLACE FORCE VIEW GUI_EQUIPMENT_LIST
AS 
SELECT 
    te.EQPT_ID as EQPT_ID,
    te.EQPT_CODE as EQPT_CODE,
    te.EQPT_TITLE as EQPT_TITLE,
    tk.TC_TANKER as EQPT_TANKER,
    te.EQPT_OWNER as EQPT_OWNER,
    cp.CMPY_NAME as EQPT_OWNER_NAME,
    te.EQPT_ETP as EQPT_ETP,
    et.ETYP_TITLE as EQPT_ETP_TITLE,
    te.EQPT_EXP_D1_DMY as EQPT_EXP_D1_DMY,
    te.EQPT_EXP_D2_DMY as EQPT_EXP_D2_DMY,
    te.EQPT_EXP_D3_DMY as EQPT_EXP_D3_DMY,
    te.EQPT_LOCK as EQPT_LOCK,
    te.EQPT_EMPTY_KG as EQPT_EMPTY_KG,
    te.EQP_MUST_TARE_IN as EQP_MUST_TARE_IN,
    te.EQPT_MAX_GROSS as EQPT_MAX_GROSS,
    te.EQPT_COMMENTS as EQPT_COMMENTS,
    te.EQPT_AREA as EQPT_AREA,
    ar.AREA_NAME as EQPT_AREA_NAME,
    te.EQPT_LOAD_TYPE as EQPT_LOAD_TYPE,
    te.EQPT_LAST_MODIFIED as EQPT_LAST_MODIFIED,
    te.EQPT_LAST_USED as EQPT_LAST_USED,
    el.LD_TYPE_TEXT as EQPT_LOAD_TYPE_NAME,
    et.ETYP_CATEGORY as ETYP_CATEGORY,
    te.EQPT_GUARD_MASTER_USED,
    te.EQPT_GUARD_MASTER_DESC,
    te.SLP_ID,
    te.SLP_EXPIRY,
    te.VIN_NUMBER
FROM 
    TRANSP_EQUIP te
    , COMPANYS cp
    , EQUIP_TYPES et
    , (
        SELECT
            TC_TANKER, TNKR_ACTIVE, TC_EQPT
        FROM
            TANKERS
            , TNKR_EQUIP
        WHERE
            TANKERS.TNKR_CODE = TNKR_EQUIP.TC_TANKER
            AND TANKERS.TNKR_ACTIVE = 'Y'
    ) tk
    , AREA_RC ar
    , EQUIP_LIST_LD_TYPE_LOOKUP el
WHERE 
    ( 
--      ( SYS_CONTEXT('CONN_CONTEXT', 'ISMANAGER') = 'N' AND EQPT_OWNER = SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE') )
        ( SYS_CONTEXT('CONN_CONTEXT', 'ISMANAGER') = 'N' 
            AND ( te.EQPT_OWNER = SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE') 
                or ( te.EQPT_OWNER in (select child_cmpy_code from company_relation where parent_cmpy_code=SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE') and parent_cmpy_role=1 and child_cmpy_role=2 and status=1) ) 
            )
        )
        OR SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE') IS NULL
        OR SYS_CONTEXT('CONN_CONTEXT', 'ISMANAGER') = 'Y'
        OR SYS_CONTEXT('CONN_CONTEXT', 'ISMANAGER') IS NULL
    )
    AND te.EQPT_OWNER = cp.CMPY_CODE
    AND te.EQPT_ETP = et.ETYP_ID
    AND te.EQPT_AREA = ar.AREA_K(+)
    AND te.EQPT_LOAD_TYPE = el.LD_TYPE_CODE(+)
    AND te.EQPT_ID = tk.TC_EQPT(+)
/
