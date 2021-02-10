CREATE OR REPLACE PACKAGE LOADER_PKG
AS 
TYPE numType IS TABLE OF NUMBER INDEX BY BINARY_INTEGER;
TYPE fltType IS TABLE OF FLOAT INDEX BY BINARY_INTEGER;
TYPE strType IS TABLE OF VARCHAR2(100) INDEX BY BINARY_INTEGER;

PROCEDURE LOAD_STRAPS_DATA
(
    i_strap_height    in numType,
    i_strap_vol       in flttype,
    i_str_tk_tankcode in strtype,
    i_str_tk_tankdepo in strtype
);

PROCEDURE LOAD_STRAPS_DATA_BY_TYPE
(
    i_strap_height    in numType,
    i_strap_vol       in flttype,
    i_strap_type      in numType,
    i_str_tk_tankcode in strtype,
    i_str_tk_tankdepo in strtype
);
END;
/

CREATE OR REPLACE PACKAGE BODY LOADER_PKG
AS
PROCEDURE LOAD_STRAPS_DATA
/*******************************************************************************
    <NAME>
        LOAD_STRAPS_DATA

    <PURPOSE>
        Save the TANK straps data into STRAPS table.

    <PARAMETERS>
        i_strap_height     [IN]  : Tank Height array.
        i_strap_vol        [IN]  : Tank Volumn array.
        i_str_tk_tankcode  [IN]  : Tank Code array.
        i_str_tk_tankdepo  [IN]  : Company Code array.

    <REVISIONS>
    Ver        Date        Author           Descriptions
    ---------  ----------  ---------------  ----------------------------------
    1.0        13/03/2018  Jack Zhu         Created.
*******************************************************************************/
(
    i_strap_height    in numtype,
    i_strap_vol       in flttype,
    i_str_tk_tankcode in strtype,
    i_str_tk_tankdepo in strtype
)
IS
    duplicate_info EXCEPTION;
    PRAGMA EXCEPTION_INIT (duplicate_info, -00001);
    v_stmt_str     VARCHAR2(2000);
    v_tablename    VARCHAR2(30);
BEGIN
    v_tablename := 'STRAPS';
    v_stmt_str := 'INSERT INTO ' || v_tablename || '(STRAP_HEIGHT, STRAP_VOL, STR_TK_TANKCODE, STR_TK_TANKDEPO) VALUES (:STRAP_HEIGHT, :STRAP_VOL, :STR_TK_TANKCODE, :STR_TK_TANKDEPO)';

    FOR i IN 1..i_strap_height.count LOOP
        EXECUTE IMMEDIATE v_stmt_str USING i_strap_height(i), i_strap_vol(i), i_str_tk_tankcode(i), i_str_tk_tankdepo(i);
    END LOOP;

    EXCEPTION
        WHEN duplicate_info THEN
          RAISE_APPLICATION_ERROR(
            num=> -20107,
           msg=> 'Duplicate audit entry');
END;

PROCEDURE LOAD_STRAPS_DATA_BY_TYPE
/*******************************************************************************
    <NAME>
        LOAD_STRAPS_DATA_BY_TYPE

    <PURPOSE>
        Save the TANK straps data into STRAPS table according to its type (product or water level).

    <PARAMETERS>
        i_strap_height     [IN]  : Tank Height array.
        i_strap_vol        [IN]  : Tank Volumn array.
        i_strap_type       [IN]  : Strap Type array.
        i_str_tk_tankcode  [IN]  : Tank Code array.
        i_str_tk_tankdepo  [IN]  : Company Code array.

    <REVISIONS>
    Ver        Date        Author           Descriptions
    ---------  ----------  ---------------  ----------------------------------
    1.0        10/02/2021  Bin Zhou         Created.
*******************************************************************************/
(
    i_strap_height    in numtype,
    i_strap_vol       in flttype,
    i_strap_type      in numtype,
    i_str_tk_tankcode in strtype,
    i_str_tk_tankdepo in strtype
)
IS
    duplicate_info EXCEPTION;
    PRAGMA EXCEPTION_INIT (duplicate_info, -00001);
    v_stmt_str     VARCHAR2(2000);
    v_tablename    VARCHAR2(30);
BEGIN
    v_tablename := 'STRAPS';
    v_stmt_str := 'INSERT INTO ' || v_tablename || '(STRAP_HEIGHT, STRAP_VOL, STRAP_TYPE, STR_TK_TANKCODE, STR_TK_TANKDEPO) VALUES (:STRAP_HEIGHT, :STRAP_VOL, :STRAP_TYPE, :STR_TK_TANKCODE, :STR_TK_TANKDEPO)';

    FOR i IN 1..i_strap_height.count LOOP
        EXECUTE IMMEDIATE v_stmt_str USING i_strap_height(i), i_strap_vol(i), i_strap_type(i), i_str_tk_tankcode(i), i_str_tk_tankdepo(i);
    END LOOP;

    EXCEPTION
        WHEN duplicate_info THEN
          RAISE_APPLICATION_ERROR(
            num=> -20107,
           msg=> 'Duplicate audit entry');
END;

END LOADER_PKG;
/