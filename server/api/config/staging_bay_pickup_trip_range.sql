/*
    define the SITE_PICKUP_TRIP_START to determine default start trip number for pickup load at site level
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_PICKUP_TRIP_START';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_PICKUP_TRIP_START', '800000000', 'Default start trip number for pickup load at site level', NULL );

commit;

/*
    define the SITE_PICKUP_TRIP_END to determine default end trip number for pickup load at site level
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_PICKUP_TRIP_END';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_PICKUP_TRIP_END', '999999999', 'Default end trip number for pickup load at site level', NULL );

commit;



/*
    define the CMPY_PICKUP_TRIP_START to determine the start trip number for pickup load at company level
*/
INSERT INTO COMPANY_CONFIG (
    CMPY_CODE,
    CONFIG_KEY,
    CONFIG_VALUE, 
    CONFIG_COMMENT
)
SELECT
   CMPY_CODE,
   'CMPY_PICKUP_TRIP_START'                                AS CONFIG_KEY,
   '800000000'                                             AS CONFIG_VALUE,
   'Start trip number for pickup load at company level'    AS CONFIG_COMMENT
FROM
   COMPANYS
WHERE
    BITAND(CMPY_TYPE, POWER(2, 1)) != 0 
    AND ((CMPY_CODE, 'CMPY_PICKUP_TRIP_START') NOT IN (SELECT CMPY_CODE, CONFIG_KEY FROM COMPANY_CONFIG))
;

COMMIT;

/*
    define the CMPY_PICKUP_TRIP_END to determine the end trip number for pickup load at company level
*/
INSERT INTO COMPANY_CONFIG (
    CMPY_CODE,
    CONFIG_KEY,
    CONFIG_VALUE, 
    CONFIG_COMMENT
)
SELECT
   CMPY_CODE,
   'CMPY_PICKUP_TRIP_END'                                  AS CONFIG_KEY,
   '999999999'                                             AS CONFIG_VALUE,
   'End trip number for pickup load at company level'    AS CONFIG_COMMENT
FROM
   COMPANYS
WHERE
    BITAND(CMPY_TYPE, POWER(2, 1)) != 0 
    AND ((CMPY_CODE, 'CMPY_PICKUP_TRIP_END') NOT IN (SELECT CMPY_CODE, CONFIG_KEY FROM COMPANY_CONFIG))
;

COMMIT;

/*
    define the CMPY_PICKUP_TRIP_LAST to determine the last used trip number for pickup load at company level
*/
INSERT INTO COMPANY_CONFIG (
    CMPY_CODE,
    CONFIG_KEY,
    CONFIG_VALUE, 
    CONFIG_COMMENT
)
SELECT
   CMP.CMPY_CODE,
   'CMPY_PICKUP_TRIP_LAST'                                AS CONFIG_KEY,
   CFG.CONFIG_VALUE                                       AS CONFIG_VALUE,
   'Last used trip number for pickup load at company level'    AS CONFIG_COMMENT
FROM
   COMPANYS             CMP
   , COMPANY_CONFIG     CFG
WHERE
    BITAND(CMP.CMPY_TYPE, POWER(2, 1)) != 0
    AND CFG.CMPY_CODE = CMP.CMPY_CODE
    AND CFG.CONFIG_KEY = 'CMPY_PICKUP_TRIP_START'
    AND ((CMP.CMPY_CODE, 'CMPY_PICKUP_TRIP_LAST') NOT IN (SELECT CMPY_CODE, CONFIG_KEY FROM COMPANY_CONFIG))
;

COMMIT;

