-- DROP TABLE TANK_ATG_FIELDS;
-- DROP TABLE ATG_FIELDS;

/*
A new table to store the configurable fields for ALL tanks - table ATG_FIELDS
it should have the following columns:
    ATG_FIELD_CODE - the code must be the subset of column names of the table TANKS
    ATG_FIELD_NAME - the description of the field in English
    ATG_FIELD_LABEL - the label code of the multilingual description of the field
    ATG_FIELD_TYPE - data type of the field
    ATG_FIELD_ACTIVE - Y: available for particular tank; N: not available for particular tank, in table TANK_ATG_FIELDS
    ATG_FIELD_CREATED - time created
    ATG_FIELD_UPDATED - time updated
    ATG_FIELD_USER - user who does the modification
only the field with ATG_FIELD_ACTIVE=Y can be used to switch the ATG reading status for a particular tank in table TANK_ATG_FIELDS.
user can add, modify the record. the column not in TANK table (and not number type?) is not allowed to add
when deleting a record, it will give warning if the field is used by a particular tank, if confirmed, system will delete the child records and parent record.
this table is available in GUI when site setting is on and the user is 9999. It will be accessed by a button "ATG Reading Fields" in main Tank Status screen
*/

CREATE TABLE ATG_FIELDS
(
    ATG_FIELD_CODE      VARCHAR2(100)   NOT NULL,
    ATG_FIELD_NAME      VARCHAR2(200),
    ATG_FIELD_LABEL     VARCHAR2(200),
    ATG_FIELD_TYPE      VARCHAR2(100),
    ATG_FIELD_ACTIVE    VARCHAR2(2),
    ATG_FIELD_CREATED   DATE            DEFAULT SYSDATE NOT NULL,
    ATG_FIELD_UPDATED   DATE            DEFAULT SYSDATE NOT NULL,
    ATG_FIELD_USER      VARCHAR2(12),
    CONSTRAINT PK_ATG_FIELDS
    PRIMARY KEY(ATG_FIELD_CODE)
);

-- Initialization SQL
INSERT INTO ATG_FIELDS (
    ATG_FIELD_CODE    
    , ATG_FIELD_NAME    
    , ATG_FIELD_LABEL   
    , ATG_FIELD_TYPE    
    , ATG_FIELD_ACTIVE  
    , ATG_FIELD_CREATED 
    , ATG_FIELD_UPDATED 
    , ATG_FIELD_USER    
)
SELECT
    TC.COLUMN_NAME           AS ATG_FIELD_CODE    
    , INITCAP(REPLACE(TC.COLUMN_NAME, '_', ' '))    AS ATG_FIELD_NAME    
    , TC.COLUMN_NAME         AS ATG_FIELD_LABEL   
    , TC.DATA_TYPE           AS ATG_FIELD_TYPE    
    , DECODE(TC.DATA_TYPE, 'FLOAT', 'Y', 'NUMBER', 'Y', 'N')  AS ATG_FIELD_ACTIVE  
    , SYSDATE                AS ATG_FIELD_CREATED 
    , SYSDATE                AS ATG_FIELD_UPDATED 
    , '9999'                 AS ATG_FIELD_USER    
FROM
	(
		SELECT * FROM USER_TAB_COLUMNS WHERE TABLE_NAME='TANKS' -- AND DATA_TYPE IN ('FLOAT', 'NUMBER')
	) TC
ORDER BY TC.COLUMN_ID
;
COMMIT;


/*
A new table to store the configurable fields for each tank, because same fields might act differently for ATG in different tank - table TANK_ATG_FIELDS
it should have the following columns:
    ATG_FIELD_TANK - tank code
    ATG_FIELD_TERMINAL - tank terminal
    ATG_FIELD_CODE - the code must exist in ATG_FIELDS
    ATG_FIELD_AUTO - Y: auto; N: manual
    ATG_FIELD_CREATED - time created
    ATG_FIELD_UPDATED - time updated
    ATG_FIELD_USER - user who does the modification
this table is available in GUI when site setting is on . It will be accessed in a Tab "Tank ATG Fields" in Tank Status screen
user can add, modify, delete the record. the column not in ATG_FIELDS table is not allowed to add
*/


CREATE TABLE TANK_ATG_FIELDS
(
    ATG_FIELD_TANK      VARCHAR2(24)    NOT NULL,
    ATG_FIELD_TERMINAL  VARCHAR2(16)    NOT NULL,
    ATG_FIELD_CODE      VARCHAR2(100)   NOT NULL,
    ATG_FIELD_AUTO      VARCHAR2(2),
    ATG_FIELD_CREATED   DATE            DEFAULT SYSDATE NOT NULL,
    ATG_FIELD_UPDATED   DATE            DEFAULT SYSDATE NOT NULL,
    ATG_FIELD_USER      VARCHAR2(12),
    CONSTRAINT PK_TANK_ATG_FIELDS
    PRIMARY KEY(ATG_FIELD_TANK, ATG_FIELD_TERMINAL, ATG_FIELD_CODE)
);

ALTER TABLE TANK_ATG_FIELDS
  ADD CONSTRAINT FK_TANK_ATG_FIELDS_TANK FOREIGN KEY (ATG_FIELD_TANK, ATG_FIELD_TERMINAL)
    REFERENCES TANKS (TANK_CODE, TANK_TERMINAL);

ALTER TABLE TANK_ATG_FIELDS
  ADD CONSTRAINT FK_TANK_ATG_FIELDS_FIELD FOREIGN KEY (ATG_FIELD_CODE)
    REFERENCES ATG_FIELDS (ATG_FIELD_CODE);

-- Initialization SQL
INSERT INTO TANK_ATG_FIELDS (
    ATG_FIELD_TANK
    , ATG_FIELD_TERMINAL
    , ATG_FIELD_CODE    
    , ATG_FIELD_AUTO    
    , ATG_FIELD_CREATED 
    , ATG_FIELD_UPDATED 
    , ATG_FIELD_USER    
)
SELECT
    TK.TANK_CODE             AS ATG_FIELD_TANK    
    , TK.TANK_TERMINAL       AS ATG_FIELD_TERMINAL
    , AF.ATG_FIELD_CODE      AS ATG_FIELD_CODE    
    , 'Y'                    AS ATG_FIELD_AUTO    
    , SYSDATE                AS ATG_FIELD_CREATED 
    , SYSDATE                AS ATG_FIELD_UPDATED 
    , '9999'                 AS ATG_FIELD_USER    
FROM
	TANKS  TK
	, ATG_FIELDS AF
WHERE ATG_FIELD_ACTIVE='Y' AND ATG_FIELD_CODE IN ('TANK_TEMP', 'TANK_DENSITY', 'TANK_PROD_LVL')
ORDER BY TK.TANK_TERMINAL, TK.TANK_CODE, AF.ATG_FIELD_CODE
;
COMMIT;



CREATE OR REPLACE VIEW TANK_ATG_FIELDS_VW
AS
SELECT
    taf.ATG_FIELD_TANK     
    , taf.ATG_FIELD_TERMINAL 
    , taf.ATG_FIELD_CODE     
    , afd.ATG_FIELD_NAME     
    , afd.ATG_FIELD_LABEL    
    , afd.ATG_FIELD_TYPE     
    , taf.ATG_FIELD_AUTO     
    , afd.ATG_FIELD_ACTIVE   
    , taf.ATG_FIELD_CREATED  
    , taf.ATG_FIELD_UPDATED  
    , taf.ATG_FIELD_USER     
    , per.PER_NAME                                         as ATG_FIELD_USERNAME
    , per.PER_CODE || ' - ' || per.PER_NAME                as ATG_FIELD_USERDESC
    , tnk.TANK_NAME                                        as ATG_FIELD_TANKNAME
    , tnk.TANK_CODE || ' - ' || NVL(tnk.TANK_NAME, tnk.TANK_CODE)              as ATG_FIELD_TANKDESC
    , trm.TERM_NAME                                        as ATG_FIELD_TERMNAME
    , trm.TERM_CODE || ' - ' || trm.TERM_NAME              as ATG_FIELD_TERMDESC
FROM
    TANK_ATG_FIELDS                        taf
    , ATG_FIELDS                           afd
    , TANKS                                tnk
    , TERMINAL                             trm
    , PERSONNEL                            per
WHERE
    ( ( SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE') IS NULL )
    or ( SYS_CONTEXT('CONN_CONTEXT', 'ISMANAGER') = 'Y' )
    or ( SYS_CONTEXT('CONN_CONTEXT', 'ISMANAGER') IS NULL) )
    and taf.ATG_FIELD_TERMINAL = tnk.TANK_TERMINAL
    and taf.ATG_FIELD_TANK = tnk.TANK_CODE
    and taf.ATG_FIELD_CODE = afd.ATG_FIELD_CODE
    and taf.ATG_FIELD_TERMINAL = trm.TERM_CODE
    and taf.ATG_FIELD_USER = per.PER_CODE
/