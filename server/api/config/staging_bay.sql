/*
    define the SITE_USE_STAGING_BAY to determine whether the Staging Bay is enabled for the site
    Y: enable the Staging Bay for the site
    N: disable the Staging Bay for the site
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_USE_STAGING_BAY';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_USE_STAGING_BAY', 'Y', 'Enable the Staging Bay for the site', NULL );

commit;


/*
    define the SITE_CMPY_LOAD_OPTIONS_DEFAULT to set the default value of the company load options:
    a. it is the STRING value contains 8 characters/bytes;
    b. each character/byte has the value 0, 1, 2, or 3
        0 - No check
        1 - To restrict loading at Loading bays to Normal loads only.
        2 - To restrict loading at Loading bays to Pickup loads only.
        3 - To enable loading at Loading bays to both Normal and Pickup loads.
    c. each character/byte represents the loading option of a company type:
        byte1: SITE MANAGER
        byte2: SUPPLIER
        byte3: CARRIER
        byte4: CUSTOMER
        byte5: DRAWER
        byte6: ISSUER
        byte7: EMPLOYER
        byte8: HOST
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_CMPY_LOAD_OPTIONS_DEFAULT';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_CMPY_LOAD_OPTIONS_DEFAULT', '00000000', 'The default value of the company load options when Staging Bay enabled', NULL );

commit;


/*
    define the SITE_CMPY_LOAD_OPTIONS_EDITABLE to set the editibility of company load options:
    a. it is the STRING value contains 8 characters/bytes;
    b. each character/byte has the value 0 or 1
        0 - not editable
        1 - editable
    c. each character/byte represents the editability of the loading option  of a company type:
        byte1: SITE MANAGER
        byte2: SUPPLIER
        byte3: CARRIER
        byte4: CUSTOMER
        byte5: DRAWER
        byte6: ISSUER
        byte7: EMPLOYER
        byte8: HOST
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_CMPY_LOAD_OPTIONS_EDITABLE';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_CMPY_LOAD_OPTIONS_EDITABLE', '01001000', 'Set the editibility of company load options when Staging Bay enabled', NULL );

commit;



/*
    add new column BA_LOAD_OPTION to table BAY_AREA, which will have the following values
    0: No check
    1: To restrict loading at Loading bays to Normal loads only.
    2: To restrict loading at Loading bays to Pickup loads only.
    3: To enable loading at Loading bays to both Normal and Pickup loads.
*/
alter table BAY_AREA add BA_LOAD_OPTION NUMBER(2) DEFAULT 0;



/*
	add contents for ENUM STAGING_LOAD_OPTION
*/

delete from MSG_LOOKUP where MSG_ID in (3350, 3353);

commit;

insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3350, 'ENG', 'No Check');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3351, 'ENG', 'Normal Loads only');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3352, 'ENG', 'Pickup Loads only');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3353, 'ENG', 'Both Normal and Pickup Loads');

insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3350, 'CHN', '不用检查');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3351, 'CHN', '只允许普通提单');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3352, 'CHN', '只允许组合提单');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3353, 'CHN', '允许普通提单与组合提单');

commit;

delete from ENUMITEM where ENUMTYPENAME='STAGING_LOAD_OPTION';

insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('STAGING_LOAD_OPTION', 0, 'NC', 3350);
insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('STAGING_LOAD_OPTION', 1, 'NL', 3351);
insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('STAGING_LOAD_OPTION', 2, 'PL', 3352);
insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('STAGING_LOAD_OPTION', 3, 'NP', 3353);

commit;


-- Add VIEW for Load Options in staging bay

CREATE OR REPLACE VIEW STAGING_LOAD_OPTIONS
(STAGING_LOAD_OPTION_ID, STAGING_LOAD_OPTION_CODE, STAGING_LOAD_OPTION_NAME)
AS 
SELECT 
	ENUMITEM.ENUM_NO STAGING_LOAD_OPTION_ID
	, ENUMITEM.ENUM_CODE STAGING_LOAD_OPTION_CODE
	, MSG_GLBL.MESSAGE STAGING_LOAD_OPTION_NAME
FROM ENUMITEM,MSG_GLBL
WHERE ENUMITEM.ENUM_TMM=MSG_GLBL.MSG_ID
AND ENUMTYPENAME='STAGING_LOAD_OPTION';

/

commit;


/*
The following is the specification of the new table PICKUP_SCHEDULE_SPECS
    PLSS_PICKUP_TRIP	    NUMBER(15,0)	        No	The trip number of a Pickup Load
    PLSS_PICKUP_SUPP	    VARCHAR2(16 BYTE)	    No	The supplier company code of a Pickup Load
    PLSS_PICKUP_CMPT	    NUMBER(4,0)	            No	The compartment number of a Pickup Load
    PLSS_STAGED_TRIP	    NUMBER(15,0)	        No	The trip number of a Staged Trip
    PLSS_STAGED_SUPP	    VARCHAR2(16 BYTE)	    No	The supplier company code of a Staged Trip
    PLSS_STAGED_CMPT	    NUMBER(4,0)	            Yes	The compartment number of a Staged Trip (can be different from that of Pickup Load)
    PLSS_STAGED_PRODCODE	VARCHAR2(36 BYTE)	    Yes	The drawer product code of a Staged Trip (at either product or compartment level)
    PLSS_STAGED_PRODCMPY	VARCHAR2(16 BYTE)	    Yes	The drawer company code of a Staged Trip (at either product or compartment level)
    PLSS_STAGED_UNITS	    NUMBER(4,0)	            Yes	The product unit of a Staged Trip (at either product or compartment level)
    PLSS_STAGED_SPECQTY	    FLOAT	                Yes	The planned quantity of a Staged Trip (at either product or compartment level)
    PLSS_STAGED_PRLDQTY	    FLOAT	                Yes	The preloaded/returns quantity of a Staged Trip (at either product or compartment level)
    PLSS_STAGED_ORDER	    NUMBER(9,0)	            Yes	The order number linked to a Staged Trip (at either product or compartment level)
    PLSS_STAGED_CUST	    VARCHAR2(40 BYTE)	    Yes	The customer account of a Staged Trip (at either product or compartment level)
    PLSS_STAGED_DELVLOC	    VARCHAR2(16 BYTE)	    Yes	The delivery location of a Staged Trip (at either product or compartment level)
    PLSS_STAGED_LOADTYPE	NUMBER(2,0)	            Yes	The load type of a Staged Trip: 2 - Pre-Schedule; 3 - Pre-Order; 4 - Open Order
*/

CREATE TABLE PICKUP_SCHEDULE_SPECS
(
    PLSS_PICKUP_TRIP	    NUMBER(15,0)	        NOT NULL,
    PLSS_PICKUP_SUPP	    VARCHAR2(16 BYTE)	    NOT NULL,
    PLSS_PICKUP_CMPT	    NUMBER(4,0)	            NOT NULL,
    PLSS_STAGED_TRIP	    NUMBER(15,0)	        NOT NULL,
    PLSS_STAGED_SUPP	    VARCHAR2(16 BYTE)	    NOT NULL,
    PLSS_STAGED_CMPT	    NUMBER(4,0)	            ,
    PLSS_STAGED_PRODCODE	VARCHAR2(36 BYTE)	    ,
    PLSS_STAGED_PRODCMPY	VARCHAR2(16 BYTE)	    ,
    PLSS_STAGED_UNITS	    NUMBER(4,0)	            ,
    PLSS_STAGED_SPECQTY	    FLOAT	                ,
    PLSS_STAGED_PRLDQTY	    FLOAT	                ,
    PLSS_STAGED_ORDER	    NUMBER(9,0)	            ,
    PLSS_STAGED_CUST	    VARCHAR2(40 BYTE)	    ,
    PLSS_STAGED_DELVLOC	    VARCHAR2(16 BYTE)	    ,
    PLSS_STAGED_LOADTYPE	NUMBER(2,0)	            
);


ALTER TABLE PICKUP_SCHEDULE_SPECS
ADD CONSTRAINT UK_PICKUP_SCHEDULE_SPECS UNIQUE (
    PLSS_PICKUP_TRIP, PLSS_PICKUP_SUPP, PLSS_PICKUP_CMPT, PLSS_STAGED_TRIP, PLSS_STAGED_SUPP, PLSS_STAGED_CMPT, PLSS_STAGED_PRODCODE, PLSS_STAGED_PRODCMPY, PLSS_STAGED_ORDER
);

ALTER TABLE PICKUP_SCHEDULE_SPECS
ADD CONSTRAINT FK_PICKUP_CMPT FOREIGN KEY (PLSS_PICKUP_TRIP, PLSS_PICKUP_SUPP, PLSS_PICKUP_CMPT)
REFERENCES SPECDETS (SCHDSPEC_SHLSTRIP, SCHDSPEC_SHLSSUPP, SCHD_COMP_ID);

ALTER TABLE PICKUP_SCHEDULE_SPECS
ADD CONSTRAINT FK_STAGED_TRIP FOREIGN KEY (PLSS_STAGED_TRIP, PLSS_STAGED_SUPP)
REFERENCES SCHEDULE (SHLS_TRIP_NO, SHLS_SUPP);

ALTER TABLE PICKUP_SCHEDULE_SPECS
ADD CONSTRAINT FK_STAGED_PROD FOREIGN KEY (PLSS_STAGED_PRODCODE, PLSS_STAGED_PRODCMPY)
REFERENCES PRODUCTS (PROD_CODE, PROD_CMPY);

ALTER TABLE PICKUP_SCHEDULE_SPECS
ADD CONSTRAINT FK_STAGED_ORDER FOREIGN KEY (PLSS_STAGED_ORDER)
REFERENCES CUST_ORDER (ORDER_NO);

ALTER TABLE PICKUP_SCHEDULE_SPECS
ADD CONSTRAINT FK_STAGED_CUST FOREIGN KEY (PLSS_STAGED_CUST)
REFERENCES CUSTOMER (CUST_ACCT);

ALTER TABLE PICKUP_SCHEDULE_SPECS
ADD CONSTRAINT FK_STAGED_DELVLOC FOREIGN KEY (PLSS_STAGED_DELVLOC)
REFERENCES DELV_LOCATION (DLV_CODE);


/*
    add new column SHLS_PICKUP_MODE to table SCHEDULE, which will have the following values
    0: Normal Load.
    1: Pickup load.
    2: Staged Load.
*/
alter table SCHEDULE add SHLS_PICKUP_MODE NUMBER(2) DEFAULT 0;



/*
	add contents for ENUM STAGING_LOAD_MODE
*/

delete from MSG_LOOKUP where MSG_ID in (3354, 3356);

commit;

insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3354, 'ENG', 'Normal Load');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3355, 'ENG', 'Pickup Load');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3356, 'ENG', 'Staged Load');

insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3354, 'CHN', '普通提单');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3355, 'CHN', '组合提单');
insert into MSG_LOOKUP (MSG_ID, LANG_ID, MESSAGE) values (3356, 'CHN', '被组合提单');

commit;

delete from ENUMITEM where ENUMTYPENAME='STAGING_LOAD_MODE';

insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('STAGING_LOAD_MODE', 0, 'NL', 3354);
insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('STAGING_LOAD_MODE', 1, 'PL', 3355);
insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('STAGING_LOAD_MODE', 2, 'SL', 3356);

commit;


-- Add VIEW for Load Options in staging bay

CREATE OR REPLACE VIEW STAGING_LOAD_MODES
(STAGING_LOAD_MODE_ID, STAGING_LOAD_MODE_CODE, STAGING_LOAD_MODE_NAME)
AS 
SELECT 
	ENUMITEM.ENUM_NO STAGING_LOAD_MODE_ID
	, ENUMITEM.ENUM_CODE STAGING_LOAD_MODE_CODE
	, MSG_GLBL.MESSAGE STAGING_LOAD_MODE_NAME
FROM ENUMITEM,MSG_GLBL
WHERE ENUMITEM.ENUM_TMM=MSG_GLBL.MSG_ID
AND ENUMTYPENAME='STAGING_LOAD_MODE';

/

commit;


/*
    add new column LOAD_PICKUP_MODE to table LOADS, which will have the following values
    0: Normal Load.
    1: Pickup load.
    2: Staged Load.
*/
alter table LOADS add LOAD_PICKUP_MODE NUMBER(2) DEFAULT 0;


/*
    Further changes on some VIEWs might be required later
*/