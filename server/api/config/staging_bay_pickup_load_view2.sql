CREATE OR REPLACE FORCE VIEW GUI_PICKUP_TRANSFERS  AS 
SELECT * 
FROM (
        SELECT SPEC.SCHD_COMP_ID AS COMPARTMENT,
            PR.PROD_CODE AS PROD_CODE,
            PR.PROD_NAME AS PROD_NAME,
            PR.PROD_CMPY AS PROD_CMPY,
            SPEC.SCHD_UNITS AS UNIT_CODE,
            UV.DESCRIPTION AS UNIT_NAME,
            SPEC.SCHD_SPECQTY AS QTY_SCHEDULED,
            SPEC.SCHD_PRLDQTY QTY_PRELOAD,
            SPEC.SCHDSPEC_SHLSTRIP,
            SPEC.SCHDSPEC_SHLSSUPP,
            SPEC.SCHD_SOLD_TO_NUM,
            SPEC.SCHD_SHIP_TO_NUM,
            PLSS.PLSS_PICKUP_TRIP,
            PLSS.PLSS_PICKUP_SUPP,
            PLSS.PLSS_PICKUP_CMPT,
            PLSS.PLSS_STAGED_TRIP,
            PLSS.PLSS_STAGED_SUPP,
            PLSS.PLSS_STAGED_CMPT,
            PLSS.PLSS_STAGED_PRODCODE,
            PLSS.PLSS_STAGED_PRODCMPY,
            PLSS.PLSS_STAGED_UNITS,
            PLSS.PLSS_STAGED_SPECQTY,
            PLSS.PLSS_STAGED_PRLDQTY,
            PLSS.PLSS_STAGED_ORDER,
            PLSS.PLSS_STAGED_CUST,
            PLSS.PLSS_STAGED_DELVLOC,
            PLSS.PLSS_STAGED_LOADTYPE,
            DECODE(NVL(PLSS.PLSS_STAGED_ORDER, SPEC.SCHD_ORDER), NULL, TO_CHAR(PLSS.PLSS_STAGED_TRIP), PLSS.PLSS_STAGED_TRIP||'/'||CUST_ORDER.ORDER_CUST_ORDNO) AS TRIP_ORDER_NO,
            DECODE(PLSS.PLSS_STAGED_CUST, NULL, NULL, PLSS.PLSS_STAGED_CUST||' - '||COMPANYS.CMPY_NAME) AS TRIP_CUSTOMER,
            DECODE(PLSS.PLSS_STAGED_DELVLOC, NULL, NULL, PLSS.PLSS_STAGED_DELVLOC||' - '||DLOC.DLV_NAME) AS TRIP_DELVLOC,
            CUST_ORDER.ORDER_CUST_ORDNO,
            SPEC.SCHD_ORDER,
            SPEC.SCHD_DELIV_NUM,
            PR.PROD_CLASS
        FROM SPECDETS SPEC,
            PICKUP_SCHEDULE_SPECS PLSS,
            SCHEDULE SCHD,
            PRODUCTS PR,
            UNIT_SCALE_VW UV,
            CUST_ORDER,
            CUSTOMER,
            COMPANYS,
            DELV_LOCATION DLOC
        WHERE SPEC.SCHDPROD_PRODCMPY = PR.PROD_CMPY
            AND SPEC.SCHDPROD_PRODCODE = PR.PROD_CODE
            AND UV.UNIT_ID = SPEC.SCHD_UNITS
            AND SPEC.SCHDSPEC_SHLSTRIP = SCHD.SHLS_TRIP_NO
            AND SPEC.SCHDSPEC_SHLSSUPP = SCHD.SHLS_SUPP
            AND SCHD.SHLS_PICKUP_MODE = 1
            AND SPEC.SCHDSPEC_SHLSTRIP = PLSS.PLSS_PICKUP_TRIP
            AND SPEC.SCHDSPEC_SHLSSUPP = PLSS.PLSS_PICKUP_SUPP
            AND SPEC.SCHD_COMP_ID = PLSS.PLSS_PICKUP_CMPT
            AND SPEC.SCHDPROD_PRODCODE = PLSS.PLSS_STAGED_PRODCODE
            AND SPEC.SCHDPROD_PRODCMPY = PLSS.PLSS_STAGED_PRODCMPY
            AND NVL(PLSS.PLSS_STAGED_ORDER, SPEC.SCHD_ORDER) = CUST_ORDER.ORDER_NO(+)
            AND PLSS.PLSS_STAGED_CUST = CUSTOMER.CUST_ACCT(+)
            AND CUSTOMER.CUST_CODE = COMPANYS.CMPY_CODE(+)
            AND PLSS.PLSS_STAGED_DELVLOC = DLOC.DLV_CODE(+)
    ) PKLD, (
        SELECT SCHEDULE.SHLS_SUPP AS TRIP_SUPPLIER,
            PRODUCTS.PROD_CLASS AS TRIP_PROD_CLASS,
            SCHEDULE.SHLS_TRIP_NO AS TRIP_NO,
            TRANSFERS.TRSF_DES AS TRIP_COMPARTMENT,
            TRANSFERS.TRSFPROD_PRODCMPY AS TRIP_PRODCMPY,
            TRANSFERS.TRSFPROD_PRODCODE AS TRIP_PRODCODE,
            AVG(TRANSFERS.TRSF_TEMP)    AS TRIP_TEMP,
            AVG(TRANSFERS.TRSF_DENSITY) AS TRIP_DENSITY,
            SUM(TRANSFERS.TRSF_QTY_AMB) AS TRIP_QTY_AMB,
            SUM(TRANSFERS.TRSF_QTY_COR) AS TRIP_QTY_STD,
            SUM(TRANSFERS.TRSF_LOAD_KG) AS TRIP_QTY_KG,
            SUM(TRANSFERS.TRSF_RETURNS) AS TRIP_QTY_RTN,
            SUM(TRANSFERS.TRSF_PRELOAD_KG) AS TRIP_QTY_PKG,
            SUM(TRANSFERS.TRSF_DELIVERED) AS TRIP_QTY_DELIVERED
        FROM SCHEDULE, LOADS, TRANSACTIONS, TRANSFERS, PRODUCTS
        WHERE SCHEDULE.SHLSLOAD_LD_TRM = LOADS.LD_TERMINAL
            AND SCHEDULE.SHLSLOAD_LOAD_ID = LOADS.LOAD_ID
            AND SCHEDULE.SHLS_PICKUP_MODE = 2
            AND LOADS.LOAD_ID = TRANSACTIONS.TRSALDID_LOAD_ID
            AND LOADS.LD_TERMINAL = TRANSACTIONS.TRSALDID_LD_TRM
            AND TRANSACTIONS.TRSA_ID = TRANSFERS.TRSFTRID_TRSA_ID
            AND TRANSACTIONS.TRSA_TERMINAL = TRANSFERS.TRSFTRID_TRSA_TRM
            AND TRSFPROD_PRODCMPY = PRODUCTS.PROD_CMPY AND TRSFPROD_PRODCODE = PRODUCTS.PROD_CODE
        GROUP BY SCHEDULE.SHLS_SUPP, SCHEDULE.SHLS_TRIP_NO, TRANSFERS.TRSF_DES, 
            TRANSFERS.TRSFPROD_PRODCMPY, TRANSFERS.TRSFPROD_PRODCODE, PROD_CLASS
    ) TRSF
WHERE 
    PKLD.PLSS_STAGED_TRIP = TRSF.TRIP_NO
    AND PKLD.PLSS_STAGED_SUPP = TRSF.TRIP_SUPPLIER
    AND PKLD.PLSS_PICKUP_CMPT = TRSF.TRIP_COMPARTMENT
    AND PKLD.PROD_CMPY = TRSF.TRIP_PRODCMPY
    AND PKLD.PROD_CODE = TRSF.TRIP_PRODCODE
;


/

commit;

/*
-- testing with specific trip number
SELECT * 
FROM (
        SELECT SPEC.SCHD_COMP_ID AS COMPARTMENT,
            PR.PROD_CODE AS PROD_CODE,
            PR.PROD_NAME AS PROD_NAME,
            PR.PROD_CMPY AS PROD_CMPY,
            SPEC.SCHD_UNITS AS UNIT_CODE,
            UV.DESCRIPTION AS UNIT_NAME,
            SPEC.SCHD_SPECQTY AS QTY_SCHEDULED,
            SPEC.SCHD_PRLDQTY QTY_PRELOAD,
            SPEC.SCHDSPEC_SHLSTRIP,
            SPEC.SCHDSPEC_SHLSSUPP,
            SPEC.SCHD_SOLD_TO_NUM,
            SPEC.SCHD_SHIP_TO_NUM,
            PLSS.PLSS_PICKUP_TRIP,
            PLSS.PLSS_PICKUP_SUPP,
            PLSS.PLSS_PICKUP_CMPT,
            PLSS.PLSS_STAGED_TRIP,
            PLSS.PLSS_STAGED_SUPP,
            PLSS.PLSS_STAGED_CMPT,
            PLSS.PLSS_STAGED_PRODCODE,
            PLSS.PLSS_STAGED_PRODCMPY,
            PLSS.PLSS_STAGED_UNITS,
            PLSS.PLSS_STAGED_SPECQTY,
            PLSS.PLSS_STAGED_PRLDQTY,
            PLSS.PLSS_STAGED_ORDER,
            PLSS.PLSS_STAGED_CUST,
            PLSS.PLSS_STAGED_DELVLOC,
            PLSS.PLSS_STAGED_LOADTYPE,
            DECODE(NVL(PLSS.PLSS_STAGED_ORDER, SPEC.SCHD_ORDER), NULL, TO_CHAR(PLSS.PLSS_STAGED_TRIP), PLSS.PLSS_STAGED_TRIP||'/'||CUST_ORDER.ORDER_CUST_ORDNO) AS TRIP_ORDER_NO,
            DECODE(PLSS.PLSS_STAGED_CUST, NULL, NULL, PLSS.PLSS_STAGED_CUST||' - '||COMPANYS.CMPY_NAME) AS TRIP_CUSTOMER,
            DECODE(PLSS.PLSS_STAGED_DELVLOC, NULL, NULL, PLSS.PLSS_STAGED_DELVLOC||' - '||DLOC.DLV_NAME) AS TRIP_DELVLOC,
            CUST_ORDER.ORDER_CUST_ORDNO,
            SPEC.SCHD_ORDER,
            SPEC.SCHD_DELIV_NUM,
            PR.PROD_CLASS
        FROM SPECDETS SPEC,
            PICKUP_SCHEDULE_SPECS PLSS,
            SCHEDULE SCHD,
            PRODUCTS PR,
            UNIT_SCALE_VW UV,
            CUST_ORDER,
            CUSTOMER,
            COMPANYS,
            DELV_LOCATION DLOC
        WHERE SPEC.SCHDPROD_PRODCMPY = PR.PROD_CMPY
            AND SPEC.SCHDPROD_PRODCODE = PR.PROD_CODE
            AND UV.UNIT_ID = SPEC.SCHD_UNITS
            AND SPEC.SCHDSPEC_SHLSTRIP = :shls_trip_no
            AND SPEC.SCHDSPEC_SHLSSUPP = :shls_supp
            AND SPEC.SCHDSPEC_SHLSTRIP = SCHD.SHLS_TRIP_NO
            AND SPEC.SCHDSPEC_SHLSSUPP = SCHD.SHLS_SUPP
            AND SCHD.SHLS_PICKUP_MODE = 1
            AND SPEC.SCHDSPEC_SHLSTRIP = PLSS.PLSS_PICKUP_TRIP
            AND SPEC.SCHDSPEC_SHLSSUPP = PLSS.PLSS_PICKUP_SUPP
            AND SPEC.SCHD_COMP_ID = PLSS.PLSS_PICKUP_CMPT
            AND SPEC.SCHDPROD_PRODCODE = PLSS.PLSS_STAGED_PRODCODE
            AND SPEC.SCHDPROD_PRODCMPY = PLSS.PLSS_STAGED_PRODCMPY
            AND NVL(PLSS.PLSS_STAGED_ORDER, SPEC.SCHD_ORDER) = CUST_ORDER.ORDER_NO(+)
            AND PLSS.PLSS_STAGED_CUST = CUSTOMER.CUST_ACCT(+)
            AND CUSTOMER.CUST_CODE = COMPANYS.CMPY_CODE(+)
            AND PLSS.PLSS_STAGED_DELVLOC = DLOC.DLV_CODE(+)
    ) PKLD, (
        SELECT SCHEDULE.SHLS_SUPP AS TRIP_SUPPLIER,
            PRODUCTS.PROD_CLASS AS TRIP_PROD_CLASS,
            SCHEDULE.SHLS_TRIP_NO AS TRIP_NO,
            TRANSFERS.TRSF_DES AS TRIP_COMPARTMENT,
            TRANSFERS.TRSFPROD_PRODCMPY AS TRIP_PRODCMPY,
            TRANSFERS.TRSFPROD_PRODCODE AS TRIP_PRODCODE,
            AVG(TRANSFERS.TRSF_TEMP)    AS TRIP_TEMP,
            AVG(TRANSFERS.TRSF_DENSITY) AS TRIP_DENSITY,
            SUM(TRANSFERS.TRSF_QTY_AMB) AS TRIP_QTY_AMB,
            SUM(TRANSFERS.TRSF_QTY_COR) AS TRIP_QTY_STD,
            SUM(TRANSFERS.TRSF_LOAD_KG) AS TRIP_QTY_KG,
            SUM(TRANSFERS.TRSF_RETURNS) AS TRIP_QTY_RTN,
            SUM(TRANSFERS.TRSF_PRELOAD_KG) AS TRIP_QTY_PKG,
            SUM(TRANSFERS.TRSF_DELIVERED) AS TRIP_QTY_DELIVERED
        FROM SCHEDULE, LOADS, TRANSACTIONS, TRANSFERS, PRODUCTS
        WHERE SCHEDULE.SHLSLOAD_LD_TRM = LOADS.LD_TERMINAL
            AND SCHEDULE.SHLSLOAD_LOAD_ID = LOADS.LOAD_ID
            AND SCHEDULE.SHLS_PICKUP_MODE = 2
            AND LOADS.LOAD_ID = TRANSACTIONS.TRSALDID_LOAD_ID
            AND LOADS.LD_TERMINAL = TRANSACTIONS.TRSALDID_LD_TRM
            AND TRANSACTIONS.TRSA_ID = TRANSFERS.TRSFTRID_TRSA_ID
            AND TRANSACTIONS.TRSA_TERMINAL = TRANSFERS.TRSFTRID_TRSA_TRM
            AND TRSFPROD_PRODCMPY = PRODUCTS.PROD_CMPY AND TRSFPROD_PRODCODE = PRODUCTS.PROD_CODE
        GROUP BY SCHEDULE.SHLS_SUPP, SCHEDULE.SHLS_TRIP_NO, TRANSFERS.TRSF_DES, 
            TRANSFERS.TRSFPROD_PRODCMPY, TRANSFERS.TRSFPROD_PRODCODE, PROD_CLASS
    ) TRSF
WHERE 
    PKLD.PLSS_STAGED_TRIP = TRSF.TRIP_NO
    AND PKLD.PLSS_STAGED_SUPP = TRSF.TRIP_SUPPLIER
    AND PKLD.PLSS_PICKUP_CMPT = TRSF.TRIP_COMPARTMENT
    AND PKLD.PROD_CMPY = TRSF.TRIP_PRODCMPY
    AND PKLD.PROD_CODE = TRSF.TRIP_PRODCODE
    AND PKLD.PLSS_PICKUP_TRIP = :shls_trip_no
    AND PKLD.PLSS_PICKUP_SUPP = :shls_supp
;
*/