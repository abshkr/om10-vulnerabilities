
  CREATE OR REPLACE FORCE VIEW GUI_METER_DETAILS
  AS 
  SELECT BAA_BAY_SEQ,
          TRSB_METER, TRSB_INJECTOR, DECODE(TRSB_INJECTOR, NULL, 'N', 'Y') IS_INJECTOR,
          TRSF_OPN_AMB,
          TRSF_CLS_AMB,
          TRSF_OPN_COR,
          TRSF_CLS_COR,
          TRSF_OPEN_KG,
          TRSF_CLOSE_KG,
          TRSFTRID_TRSA_ID
     FROM PRODUCTS,
          BASE_PRODS,
          BA_ARMS,
          TRANSP_EQUIP,
          (SELECT TRANSFERS.TRSFTRID_TRSA_ID,
                  TRANSFERS.TRSF_ID,
                  TRANSFERS.TRSF_BAA_CODE,
                  TRANBASE.TRSB_METER,
				  (
					case 	when (TRANBASE.TRSB_OPN_COR is null or TRANBASE.TRSB_OPN_COR=0) and TRANBASE.TRSB_INJECTOR is NULL
							then TRANSFERS.TRSF_OPN_COR 		else TRANBASE.TRSB_OPN_COR			end
				  )						as TRSF_OPN_COR, 
				  (
					case 	when (TRANBASE.TRSB_CLS_COR is null or TRANBASE.TRSB_CLS_COR=0) and TRANBASE.TRSB_INJECTOR is NULL
							then TRANSFERS.TRSF_CLS_COR 		else TRANBASE.TRSB_CLS_COR			end
				  )						as TRSF_CLS_COR, 
				  (
					case 	when (TRANBASE.TRSB_OPN_AMB is null or TRANBASE.TRSB_OPN_AMB=0) and TRANBASE.TRSB_INJECTOR is NULL
							then TRANSFERS.TRSF_OPN_AMB 		else TRANBASE.TRSB_OPN_AMB			end
				  )						as TRSF_OPN_AMB, 
				  (
					case 	when (TRANBASE.TRSB_CLS_AMB is null or TRANBASE.TRSB_CLS_AMB=0) and TRANBASE.TRSB_INJECTOR is NULL
							then TRANSFERS.TRSF_CLS_AMB 		else TRANBASE.TRSB_CLS_AMB			end
				  )						as TRSF_CLS_AMB, 
				  (
					case 	when (TRANBASE.TRSB_OPN_KG is null or TRANBASE.TRSB_OPN_KG=0) and TRANBASE.TRSB_INJECTOR is NULL
							then TRANSFERS.TRSF_OPEN_KG 		else TRANBASE.TRSB_OPN_KG			end
				  )						as TRSF_OPEN_KG, 
				  (
					case 	when (TRANBASE.TRSB_CLS_KG is null or TRANBASE.TRSB_CLS_KG=0) and TRANBASE.TRSB_INJECTOR is NULL
							then TRANSFERS.TRSF_CLOSE_KG 		else TRANBASE.TRSB_CLS_KG			end
				  )						as TRSF_CLOSE_KG, 
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
                  TRANBASE.TRSB_INJECTOR,
                  TRANBASE.TRSB_BS,
                  TRANBASE.TRSB_CVL,
                  TRANBASE.TRSB_AVL,
                  TRANBASE.TRSB_TMP,
                  TRANBASE.TRSB_DNS,
                  TRANBASE.TRSB_UNT
             FROM TRANBASE, TRANSFERS
            WHERE     TRANSFERS.TRSF_ID = TRANBASE.TRSB_ID_TRSF_ID
                  AND TRANSFERS.TRSF_TERMINAL = TRANBASE.TRSB_ID_TRSF_TRM) t
    WHERE     t.TRSF_TRAILER = TRANSP_EQUIP.EQPT_ID
          AND t.TRSF_BAA_CODE = BA_ARMS.BAA_CODE
          AND t.TRSFPROD_PRODCODE = PRODUCTS.PROD_CODE
          AND t.TRSFPROD_PRODCMPY = PRODUCTS.PROD_CMPY
          AND t.TRSF_BASE_P = BASE_PRODS.BASE_CODE
          AND t.TRSF_BAA_CODE = BA_ARMS.BAA_CODE;
