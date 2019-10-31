
  CREATE OR REPLACE FORCE VIEW GUI_TRANSACTION_DETAILS
  AS
  SELECT t.TRSFTRID_TRSA_ID,
          t.TRSF_ID,
          BA_ARMS.BAA_BAY_SEQ,
          TRANSP_EQUIP.EQPT_CODE,
          t.TRSF_TRAILERCOMP,
          PRODUCTS.PROD_NAME,
          t.TRSF_QTY_AMB,
          t.TRSF_QTY_COR,
          t.TRSF_LOAD_KG,
          t.TRSF_DENSITY,
          t.TRSF_BAA_CODE,
          t.TRSFPROD_PRODCODE,
          t.TRSF_TEMP,
		  t.TRSF_API,
		  t.TRSF_TEMP_F
     FROM PRODUCTS,
          BASE_PRODS,
          BA_ARMS,
          TRANSP_EQUIP,
          (SELECT TRANSFERS.TRSFTRID_TRSA_ID,
                  TRANSFERS.TRSF_BAA_CODE,
                  TRANSFERS.TRSF_ID,
                  TRANSFERS.TRSF_OPN_COR,
                  TRANSFERS.TRSF_CLS_COR,
                  TRANSFERS.TRSF_OPN_AMB,
                  TRANSFERS.TRSF_CLS_AMB,
                  TRANSFERS.TRSF_OPEN_KG,
                  TRANSFERS.TRSF_CLOSE_KG,
                  TRANSFERS.TRSF_TRAILER,
                  TRANSFERS.TRSFPROD_PRODCODE,
                  TRANSFERS.TRSFPROD_PRODCMPY,
                  TRANSFERS.TRSF_BASE_P,
                  TRANSFERS.TRSF_QTY_COR,
                  TRANSFERS.TRSF_QTY_AMB,
                  TRANSFERS.TRSF_TEMP,
                  TRANSFERS.TRSF_DENSITY,
                  TRANSFERS.TRSF_LOAD_KG,
                  TRANSFERS.TRSF_TRAILERCOMP,
				  TRANSFERS.TRSF_API,
				  TRANSFERS.TRSF_TEMP_F
             FROM TRANSFERS) t
    WHERE     t.TRSF_TRAILER = TRANSP_EQUIP.EQPT_ID(+)
          AND t.TRSF_BAA_CODE = BA_ARMS.BAA_CODE(+)
          AND t.TRSFPROD_PRODCODE = PRODUCTS.PROD_CODE(+)
          AND t.TRSFPROD_PRODCMPY = PRODUCTS.PROD_CMPY(+)
          AND t.TRSF_BASE_P = BASE_PRODS.BASE_CODE(+)
          AND t.TRSF_BAA_CODE = BA_ARMS.BAA_CODE(+);
