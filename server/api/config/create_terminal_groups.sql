
drop table TERMINAL_GROUP_LINKS;
drop table TERMINAL_GROUPS;

-- Terminal Groups
create table TERMINAL_GROUPS
(
    TRMGRP_CODE              VARCHAR2(100)   NOT NULL,
    TRMGRP_NAME              VARCHAR2(200)   NOT NULL,
    TRMGRP_NOTE              VARCHAR2(1000),
    TRMGRP_ACTIVE            NUMBER(1)       DEFAULT 0,
    CONSTRAINT PK_TERMINAL_GROUPS PRIMARY KEY(TRMGRP_CODE)
);

-- Terminal Group Links
create table TERMINAL_GROUP_LINKS
(
    TGL_GROUP_CODE           VARCHAR2(100)   NOT NULL,
    TGL_TERM_CODE            VARCHAR2(16)    NOT NULL,
    TGL_LINK_ACTIVE          NUMBER(1)       DEFAULT 0,
    CONSTRAINT PK_TRMGRP_LINKS PRIMARY KEY(TGL_GROUP_CODE, TGL_TERM_CODE)
);

ALTER TABLE TERMINAL_GROUP_LINKS
  ADD CONSTRAINT FK_TRMGRP_LINKS_GROUP FOREIGN KEY (TGL_GROUP_CODE)
    REFERENCES TERMINAL_GROUPS (TRMGRP_CODE);

ALTER TABLE TERMINAL_GROUP_LINKS
  ADD CONSTRAINT FK_TRMGRP_LINKS_TERM FOREIGN KEY (TGL_TERM_CODE)
    REFERENCES TERMINAL (TERM_CODE);


CREATE OR REPLACE VIEW GUI_TERMINAL_GROUP_ITEMS
AS
SELECT
    TGR.TRMGRP_CODE     
    , TGR.TRMGRP_NAME     
    , TGR.TRMGRP_NOTE     
    , TGR.TRMGRP_ACTIVE
    , TRM.TERM_CODE
    , TRM.TERM_NAME
    , TRM.TERM_DESC
    , TRM.TERM_ADDR
    , TRM.TERM_CONTACT
    , TRM.TERM_PHONENO
    , TRM.TERM_REMSITE
    , TRM.TERM_COMMS_AVAIL
    , TGL.TGL_GROUP_CODE  
    , TGL.TGL_TERM_CODE   
    , TGL.TGL_LINK_ACTIVE 
    , (SELECT COUNT(*) FROM SITE WHERE SITE_CODE=TRM.TERM_CODE) as TERM_IS_SITE
FROM
    TERMINAL_GROUP_LINKS TGL
    , TERMINAL_GROUPS TGR
    , (
        SELECT 
            TERMINAL.*
            , TERMINAL.TERM_ADDR || ' [' || NVL(DL.DB_ADDR_TEXT, ' ') || ']'   AS ADDRESS_TEXT
            , TERM_CODE || ' - ' || TERM_NAME   AS TERM_DESC
        FROM 
            TERMINAL
            , (
                SELECT DB_ADDR_LINE_ID, 
                    NVL(LISTAGG(DB_ADDR_LINE, ', ') WITHIN GROUP (ORDER BY DB_ADDRLINE_NO), ' ') DB_ADDR_TEXT
                FROM DB_ADDRESS_LINE
                GROUP BY DB_ADDR_LINE_ID
            ) DL
        WHERE TERM_ADDR = DL.DB_ADDR_LINE_ID(+)
    ) TRM
WHERE
	( ( SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE') IS NULL )
	OR ( SYS_CONTEXT('CONN_CONTEXT', 'ISMANAGER') = 'Y' )
	OR ( SYS_CONTEXT('CONN_CONTEXT', 'ISMANAGER') IS NULL) )
    AND TGL.TGL_GROUP_CODE = TGR.TRMGRP_CODE
    AND TGL.TGL_TERM_CODE = TRM.TERM_CODE
/


CREATE OR REPLACE VIEW GUI_TERMINAL_GROUPS
AS
SELECT
    TGR.TRMGRP_CODE     
    , TGR.TRMGRP_NAME     
    , TGR.TRMGRP_NOTE     
    , TGR.TRMGRP_ACTIVE
    , COUNT(*)                                                                       AS TRMGRP_COUNT
    , LISTAGG(TGR.TERM_CODE, ', ') WITHIN GROUP (ORDER BY TGR.TGL_TERM_CODE)         AS TRMGRP_SITECODES
    , LISTAGG(TGR.TERM_DESC, ', ') WITHIN GROUP (ORDER BY TGR.TGL_TERM_CODE)         AS TRMGRP_SITES
    , LISTAGG(NVL(TGR.TGL_LINK_ACTIVE, 0), ', ') WITHIN GROUP (ORDER BY TGR.TGL_TERM_CODE)   AS TRMGRP_ACTIVE_FLAGS
    , LISTAGG(TGR.TERM_IS_SITE, ', ') WITHIN GROUP (ORDER BY TGR.TGL_TERM_CODE)      AS TRMGRP_SITE_FLAGS
FROM
    GUI_TERMINAL_GROUP_ITEMS TGR
WHERE
    ( ( SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE') IS NULL )
    OR ( SYS_CONTEXT('CONN_CONTEXT', 'ISMANAGER') = 'Y' )
    OR ( SYS_CONTEXT('CONN_CONTEXT', 'ISMANAGER') IS NULL) )
GROUP BY
    TGR.TRMGRP_CODE     
    , TGR.TRMGRP_NAME     
    , TGR.TRMGRP_NOTE     
    , TGR.TRMGRP_ACTIVE
/

