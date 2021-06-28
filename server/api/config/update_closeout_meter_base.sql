/*
-- this sql may fail if tank base product was changed durong the period of a closeout
UPDATE CLOSEOUT_METER cmt SET (cmt.METER_BASECODE, cmt.METER_BASENAME ) = (
  SELECT bmt.TRSB_BS, bmt.BASE_NAME
  FROM
    (
        select distinct
            clos.CLOSEOUT_NR
            , clom.METER_CODE
            , trld.TRSB_BS
            , bprd.BASE_NAME
        from
            CLOSEOUTS clos
            , CLOSEOUT_METER clom
            , BASE_PRODS bprd
            , (
                select 
                    ld.LD_TERMINAL
                    , ld.LOAD_ID
                    , trsa.TRSA_ID
                    , trsa.TRSA_TERMINAL
                    , trsf.TRSF_ID
                    , trsf.TRSF_TERMINAL
                    , trsb.TRSB_BS
                    , trsb.TRSB_ID_TRSF_ID
                    , trsb.TRSB_ID_TRSF_TRM
                    , ld.LD_STRT_DATE
                    , ld.LOAD_DMY
                    , trsa.TRSA_ST_DMY
                    , trsa.TRSA_ED_DMY
                    , trsf.TRSF_BAA_CODE
                    , trsb.TRSB_TK_TANKCODE
                    , trsb.TRSB_TK_TANKDEPO
                    , trsb.TRSB_METER
                from
                    LOADS ld
                    , TRANSACTIONS trsa
                    , TRANSFERS trsf
                    , TRANBASE trsb
                where
                    trsb.TRSB_ID_TRSF_ID = trsf.TRSF_ID
                    and trsb.TRSB_ID_TRSF_TRM = trsf.TRSF_TERMINAL
                    and trsf.TRSFTRID_TRSA_ID = trsa.TRSA_ID
                    and trsf.TRSFTRID_TRSA_TRM = trsa.TRSA_TERMINAL
                    and trsa.TRSALDID_LD_TRM = ld.LD_TERMINAL
                    and trsa.TRSALDID_LOAD_ID = ld.LOAD_ID
            ) trld
            , GUI_PIPENODE gpnd
        where 
            clos.CLOSEOUT_NR = clom.CLOSEOUT_NR
            and gpnd.STREAM_TANKSITE = trld.TRSB_TK_TANKDEPO
            and gpnd.STREAM_TANKCODE = trld.TRSB_TK_TANKCODE
            and clom.METER_CODE = gpnd.STREAM_MTRCODE
            and gpnd.STREAM_INJCODE is NULL
            and (trld.TRSA_ST_DMY between clos.PREV_CLOSEOUT_DATE and clos.CLOSEOUT_DATE)
            and (trld.TRSA_ED_DMY between clos.PREV_CLOSEOUT_DATE and clos.CLOSEOUT_DATE)
            and trld.TRSB_BS = bprd.BASE_CODE
        order by clom.METER_CODE
    ) bmt
  WHERE
    cmt.CLOSEOUT_NR = bmt.CLOSEOUT_NR
    AND cmt.METER_CODE = bmt.METER_CODE
)
;
*/

CREATE OR REPLACE PROCEDURE update_closeout_meter_base (
  v_meter_code IN VARCHAR2  
) 
IS
  TYPE ClmnCurTyp  IS REF CURSOR;
  l_clmn_cur ClmnCurTyp;
  l_clmn_str VARCHAR2(4000);
  l_stmt_str VARCHAR2(4000);
  l_closeout_nr NUMBER;
  l_meter VARCHAR2(20);
  l_base_code VARCHAR2(20);
  l_base_name VARCHAR2(40);
BEGIN
  l_stmt_str := '
        select distinct
            clos.CLOSEOUT_NR
            , clom.METER_CODE
            , trld.TRSB_BS
            , bprd.BASE_NAME
        from
            CLOSEOUTS clos
            , CLOSEOUT_METER clom
            , BASE_PRODS bprd
            , (
                select 
                    ld.LD_TERMINAL
                    , ld.LOAD_ID
                    , trsa.TRSA_ID
                    , trsa.TRSA_TERMINAL
                    , trsf.TRSF_ID
                    , trsf.TRSF_TERMINAL
                    , trsb.TRSB_BS
                    , trsb.TRSB_ID_TRSF_ID
                    , trsb.TRSB_ID_TRSF_TRM
                    , ld.LD_STRT_DATE
                    , ld.LOAD_DMY
                    , trsa.TRSA_ST_DMY
                    , trsa.TRSA_ED_DMY
                    , trsf.TRSF_BAA_CODE
                    , trsb.TRSB_TK_TANKCODE
                    , trsb.TRSB_TK_TANKDEPO
                    , trsb.TRSB_METER
                from
                    LOADS ld
                    , TRANSACTIONS trsa
                    , TRANSFERS trsf
                    , TRANBASE trsb
                where
                    trsb.TRSB_ID_TRSF_ID = trsf.TRSF_ID
                    and trsb.TRSB_ID_TRSF_TRM = trsf.TRSF_TERMINAL
                    and trsf.TRSFTRID_TRSA_ID = trsa.TRSA_ID
                    and trsf.TRSFTRID_TRSA_TRM = trsa.TRSA_TERMINAL
                    and trsa.TRSALDID_LD_TRM = ld.LD_TERMINAL
                    and trsa.TRSALDID_LOAD_ID = ld.LOAD_ID
            ) trld
            , GUI_PIPENODE gpnd
        where 
            clos.CLOSEOUT_NR = clom.CLOSEOUT_NR
            and gpnd.STREAM_TANKSITE = trld.TRSB_TK_TANKDEPO
            and gpnd.STREAM_TANKCODE = trld.TRSB_TK_TANKCODE
            and clom.METER_CODE = gpnd.STREAM_MTRCODE
            and gpnd.STREAM_INJCODE is NULL
            and (trld.TRSA_ST_DMY between clos.PREV_CLOSEOUT_DATE and clos.CLOSEOUT_DATE)
            and (trld.TRSA_ED_DMY between clos.PREV_CLOSEOUT_DATE and clos.CLOSEOUT_DATE)
            and trld.TRSB_BS = bprd.BASE_CODE
        order by clos.CLOSEOUT_NR, clom.METER_CODE
  ';
  OPEN l_clmn_cur FOR l_stmt_str;

  LOOP
    FETCH l_clmn_cur INTO l_closeout_nr, l_meter, l_base_code, l_base_name;
    EXIT WHEN l_clmn_cur%NOTFOUND;
    dbms_output.put_line('CLOSEOUT_METER Key - ' || l_closeout_nr || '::' || l_meter || ' -> updating...');
    update CLOSEOUT_METER set
        METER_BASECODE         = l_base_code,
        METER_BASENAME         = l_base_name
    where
        CLOSEOUT_NR = l_closeout_nr
        and METER_CODE = l_meter
    ;
  END LOOP;
  
  CLOSE l_clmn_cur;

  <<NORMAL_EXIT>>
    commit;
  exception
    when others then
    dbms_output.put_line('Error occurred when creating/updating CLOSEOUT_METER Key - ' || l_closeout_nr || '::' || l_meter || '. ERRCODE:' || SQLCODE);
    rollback;
END update_closeout_meter_base;
/


DECLARE
  V_METER_CODE VARCHAR2(200);
BEGIN
  V_METER_CODE := NULL;

  UPDATE_CLOSEOUT_METER_BASE(
    V_METER_CODE => V_METER_CODE
  );
--rollback; 
END;
