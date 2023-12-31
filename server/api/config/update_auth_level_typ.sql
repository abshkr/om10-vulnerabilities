CREATE OR REPLACE FORCE  VIEW AUTH_LEVEL_TYP 
(AUTH_LEVEL_ID, AUTH_LEVEL_NAME) AS 
SELECT ROLE_ID, ROLE_NAME
FROM 
(
    SELECT urol.ROLE_ID, mesg.ROLE_NAME, urol.ROLE_CODE
    FROM 
        URBAC_ROLES urol,
        (
            SELECT ENUMITEM.ENUM_NO AS ROLE_ID, MSG_GLBL.MESSAGE AS ROLE_NAME
            FROM ENUMITEM, MSG_GLBL
            WHERE ENUMITEM.ENUM_TMM = MSG_GLBL.MSG_ID AND ENUMTYPENAME = 'AUTH_LEVEL'
        ) mesg
    WHERE urol.ROLE_ID = mesg.ROLE_ID
    UNION ALL
    SELECT ROLE_ID, ROLE_TEXT, ROLE_CODE
    FROM URBAC_ROLES
    WHERE ( ROLE_ID >= 100000 OR ROLE_ID NOT IN (SELECT ENUM_NO AS ROLE_ID FROM ENUMITEM WHERE ENUMTYPENAME = 'AUTH_LEVEL') )
    ORDER BY ROLE_CODE
);

/
