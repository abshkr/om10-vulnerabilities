
/*
    Add the column OWNSHIP_TERMINAL in table BASE_PROD_OWNSHIP to store which terminal the ownership belongs to
*/
alter table BASE_PROD_OWNSHIP add OWNSHIP_TERMINAL VARCHAR2(16);

/*
    Add the column TRSA_TERMINAL in table PRODOWNSHIP_TRANSACT to store which terminal the source ownership belongs to.
*/
alter table PRODOWNSHIP_TRANSACT add TRSA_TERMINAL VARCHAR2(16);

/*
    Add the column TRSA_TERMINAL_TO in table PRODOWNSHIP_TRANSACT to store which terminal the target ownership belongs to.
*/
alter table PRODOWNSHIP_TRANSACT add TRSA_TERMINAL_TO VARCHAR2(16);

/*
    Add the column OWNSHIP_TERMINAL in table PRODOWNSHIP_TRANSACT to store which terminal the transaction happens in.
*/
alter table PRODOWNSHIP_TRANSACT add OWNSHIP_TERMINAL VARCHAR2(16);

/*
    Initialize the terminal with site code
*/
update BASE_PROD_OWNSHIP set OWNSHIP_TERMINAL = (select SITE_CODE from SITE where ROWNUM=1);
update PRODOWNSHIP_TRANSACT set TRSA_TERMINAL = (select SITE_CODE from SITE where ROWNUM=1);
update PRODOWNSHIP_TRANSACT set TRSA_TERMINAL_TO = (select SITE_CODE from SITE where ROWNUM=1);
update PRODOWNSHIP_TRANSACT set OWNSHIP_TERMINAL = (select SITE_CODE from SITE where ROWNUM=1);
