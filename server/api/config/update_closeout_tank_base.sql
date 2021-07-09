/*
-- this sql may fail if tank base product was changed durong the period of a closeout
UPDATE CLOSEOUT_TANK ctk SET (ctk.TANK_BASECODE, ctk.TANK_BASENAME ) = (
  SELECT btk.TRSB_BS, btk.BASE_NAME
  FROM
    (
        select distinct
            clos.CLOSEOUT_NR
            , clot.TANK_CODE
            , clot.TANK_TERMINAL
            , trld.TRSB_BS
            , bprd.BASE_NAME
        from
            CLOSEOUTS clos
            , CLOSEOUT_TANK clot
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
        where 
            clos.CLOSEOUT_NR = clot.CLOSEOUT_NR
            and clot.TANK_TERMINAL = trld.TRSB_TK_TANKDEPO
            and clot.TANK_CODE = trld.TRSB_TK_TANKCODE
            and (trld.TRSA_ST_DMY between clos.PREV_CLOSEOUT_DATE and clos.CLOSEOUT_DATE)
            and (trld.TRSA_ED_DMY between clos.PREV_CLOSEOUT_DATE and clos.CLOSEOUT_DATE)
            and trld.TRSB_BS = bprd.BASE_CODE
        order by clot.TANK_TERMINAL, clot.TANK_CODE
    ) btk
  WHERE
    ctk.CLOSEOUT_NR = btk.CLOSEOUT_NR
    AND ctk.TANK_TERMINAL = btk.TANK_TERMINAL
    AND ctk.TANK_CODE = btk.TANK_CODE
)
;
*/

CREATE OR REPLACE PROCEDURE update_closeout_tank_base (
  v_tank_code IN VARCHAR2  
) 
IS
  TYPE ClmnCurTyp  IS REF CURSOR;
  l_clmn_cur ClmnCurTyp;
  l_clmn_str VARCHAR2(4000);
  l_stmt_str VARCHAR2(4000);
  l_closeout_nr NUMBER;
  l_tank VARCHAR2(24);
  l_terminal VARCHAR2(16);
  l_base_code VARCHAR2(20);
  l_base_name VARCHAR2(40);
BEGIN
  l_stmt_str := '
        select distinct
            clos.CLOSEOUT_NR
            , clot.TANK_CODE
            , clot.TANK_TERMINAL
            , trld.TRSB_BS
            , bprd.BASE_NAME
        from
            CLOSEOUTS clos
            , CLOSEOUT_TANK clot
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
        where 
            clos.CLOSEOUT_NR = clot.CLOSEOUT_NR
            and clot.TANK_TERMINAL = trld.TRSB_TK_TANKDEPO
            and clot.TANK_CODE = trld.TRSB_TK_TANKCODE
            and (trld.TRSA_ST_DMY between clos.PREV_CLOSEOUT_DATE and clos.CLOSEOUT_DATE)
            and (trld.TRSA_ED_DMY between clos.PREV_CLOSEOUT_DATE and clos.CLOSEOUT_DATE)
            and trld.TRSB_BS = bprd.BASE_CODE
        order by clos.CLOSEOUT_NR, clot.TANK_TERMINAL, clot.TANK_CODE
  ';
  OPEN l_clmn_cur FOR l_stmt_str;

  LOOP
    FETCH l_clmn_cur INTO l_closeout_nr, l_tank, l_terminal, l_base_code, l_base_name;
    EXIT WHEN l_clmn_cur%NOTFOUND;
    dbms_output.put_line('CLOSEOUT_TANK Key - ' || l_closeout_nr || '::' || l_tank || ' -> updating...');
    update CLOSEOUT_TANK set
        TANK_BASECODE         = l_base_code,
        TANK_BASENAME         = l_base_name
    where
        CLOSEOUT_NR = l_closeout_nr
        and TANK_CODE = l_tank
        and TANK_TERMINAL = l_terminal
    ;
  END LOOP;
  
  CLOSE l_clmn_cur;

  <<NORMAL_EXIT>>
    commit;
  exception
    when others then
    dbms_output.put_line('Error occurred when creating/updating CLOSEOUT_TANK Key - ' || l_closeout_nr || '::' || l_tank || '. ERRCODE:' || SQLCODE);
    rollback;
END update_closeout_tank_base;
/


DECLARE
  V_TANK_CODE VARCHAR2(200);
BEGIN
  V_TANK_CODE := NULL;

  UPDATE_CLOSEOUT_TANK_BASE(
    V_TANK_CODE => V_TANK_CODE
  );
--rollback; 
END;
