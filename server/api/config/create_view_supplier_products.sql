/*
    create a view to link the BaSePrOd products and the supplier's drawer products based on the data in table PRODUCTS and RATIOS.
    PRODUCTS:
    PROD_CODE                NOT NULL VARCHAR2(36)  *
    PROD_CMPY                NOT NULL VARCHAR2(16)  *
    PROD_NAME                         VARCHAR2(40)  *
    PROD_PROD_GROUP                   VARCHAR2(16)  
    PROD_PRICE                        FLOAT(126)    
    PROD_PRICE_UNIT                   NUMBER(2)     
    PROD_CLASS                        VARCHAR2(40)  
    PROD_TXT_COLOUR                   VARCHAR2(32)  
    PROD_BACK_COLOUR                  VARCHAR2(32)  
    PROD_RPT_UNIT                     NUMBER(2)     
    PROD_RPT_TEMP                     FLOAT(126)    
    PROD_NUMBER                       NUMBER(4)     
    PROD_IS_BLEND                     VARCHAR2(2)   
    PROD_LDTOL_FLAG                   NUMBER(2)     
    PROD_LDTOL_PTOL                   FLOAT(126)    
    PROD_LDTOL_NTOL                   FLOAT(126)    
    PROD_IS_COMPLIANT                 NUMBER(1)     
    PROD_CHECK_HOT_VOLUME             NUMBER(1)     
    PROD_15_DENSITY                   FLOAT(126)    
    PROD_HOT_TEMP                     FLOAT(126)    
    PROD_CHECK_2ND_DRAWER             NUMBER(1)     
    PROD_2ND_DRAWER                   VARCHAR2(16)  
    PROD_2ND_PRODUCT                  VARCHAR2(36)  
    PROD_DESC                         VARCHAR2(512) *
    PROD_IMAGE                        VARCHAR2(200) 
    PROD_IS_LOCKED                    NUMBER(1)     
    PROD_GUARDMASTER_CODE             VARCHAR2(4)   
    PROD_GUARDMASTER_QUALITY          NUMBER(3)     
    PROD_PIDX_CODE                    VARCHAR2(12)  


    RATIOS:
    RATIO_BASE        NOT NULL VARCHAR2(20) 
    RAT_PROD_PRODCODE NOT NULL VARCHAR2(36) 
    RAT_PROD_PRODCMPY NOT NULL VARCHAR2(16) 
    RATIO_VALUE                NUMBER(9)    
    RAT_BLTOL_FLAG             NUMBER(2)    
    RAT_BLTOL_PTOL             FLOAT(126)   
    RAT_BLTOL_NTOL             FLOAT(126)   
    RAT_HOT_MAIN               VARCHAR2(1)  
    RATIO_PERCENT_PPM          NUMBER(13,4) 
*/

CREATE OR REPLACE VIEW SUPPLIER_PRODUCTS_VW
AS
SELECT
    SP.PROD_CMPY              AS PROD_OWNER
    , SP.PROD_CODE
    , SP.PROD_CMPY
    , SP.PROD_NAME
    , SP.PROD_CLASS
    , SP.PROD_DESC
FROM
    PRODUCTS  SP
UNION
SELECT distinct
    PPRD.PROD_CMPY            AS PROD_OWNER
    , BRAT.RAT_PROD_PRODCODE  AS PROD_CODE
    , BRAT.RAT_PROD_PRODCMPY  AS PROD_CMPY
    , BPRD.PROD_NAME          AS PROD_NAME
    , BPRD.PROD_CLASS         AS PROD_CLASS
    , 'Base Product'          AS PROD_DESC
FROM
    PRODUCTS          PPRD
    , RATIOS          PRAT
    , RATIOS          BRAT
    , PRODUCTS        BPRD
WHERE
    PPRD.PROD_CODE = PRAT.RAT_PROD_PRODCODE
    AND PPRD.PROD_CMPY = PRAT.RAT_PROD_PRODCMPY
    AND PRAT.RATIO_BASE = BRAT.RATIO_BASE
    AND BRAT.RAT_PROD_PRODCMPY = 'BaSePrOd'
    AND BRAT.RAT_PROD_PRODCMPY = BPRD.PROD_CMPY
    AND BRAT.RAT_PROD_PRODCODE = BPRD.PROD_CODE
/



/*
SELECT distinct
    PROD.PROD_CMPY            AS PROD_OWNER
    , BRAT.RAT_PROD_PRODCODE  AS PROD_CODE
    , BRAT.RAT_PROD_PRODCMPY  AS PROD_CMPY
    , BASE.BASE_NAME          AS PROD_NAME
    , 'Base Product'          AS PROD_DESC
FROM
    PRODUCTS          PROD
    , RATIOS          PRAT
    , RATIOS          BRAT
    , BASE_PRODS      BASE
WHERE
    PROD.PROD_CODE = PRAT.RAT_PROD_PRODCODE
    AND PROD.PROD_CMPY = PRAT.RAT_PROD_PRODCMPY
    AND PRAT.RATIO_BASE = BRAT.RATIO_BASE
    AND BRAT.RAT_PROD_PRODCMPY = 'BaSePrOd'
    AND BRAT.RATIO_BASE = BASE.BASE_CODE
*/
