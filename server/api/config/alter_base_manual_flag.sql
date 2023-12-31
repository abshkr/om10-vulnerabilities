/*
    Add the following new columns in table BASE_PRODS for base product reference code:

    BASE_MANUAL:    2 Alphanumeric long
*/

alter table BASE_PRODS add BASE_MANUAL VARCHAR2(2);


-- add new column to GUI_PRODUCT_ITEMS
CREATE OR REPLACE FORCE VIEW GUI_PRODUCT_ITEMS AS 
select
	pitem.RAT_PROD_PRODCODE			as PITEM_PROD_CODE
	, dprod.PROD_NAME				as PITEM_PROD_NAME
	, pitem.RAT_PROD_PRODCMPY		as PITEM_CMPY_CODE
	, dcmpy.CMPY_NAME				as PITEM_CMPY_NAME
	, dprod.PROD_PROD_GROUP			as PITEM_PROD_GROUP
	, dprod.PROD_CLASS				as PITEM_PROD_CLASS
	, dprod.PROD_LDTOL_FLAG			as PITEM_LDTOL_FLAG
	, dprod.PROD_LDTOL_PTOL			as PITEM_LDTOL_PTOL
	, dprod.PROD_LDTOL_NTOL			as PITEM_LDTOL_NTOL
	, hzlnk.HZ_LINK_ID				as PITEM_PROD_HAZID
	, pitem.RATIO_BASE				as PITEM_BASE_CODE
	, bprod.BASE_NAME				as PITEM_BASE_NAME
    , bprod.BASE_PIDX_CODE          as PITEM_PIDX_CODE
    , bprod.BASE_REF_CODE           as PITEM_BASE_REF_CODE
    , bprod.BASE_MANUAL             as PITEM_BASE_MANUAL
	, pitem.RATIO_VALUE				as PITEM_RATIO_VALUE
	, pitem.RATIO_PERCENT_PPM       as PITEM_RATIO_PERCENT_PPM
	, pitem.RAT_BLTOL_FLAG			as PITEM_BLTOL_FLAG
	, pitem.RAT_BLTOL_PTOL			as PITEM_BLTOL_PTOL
	, pitem.RAT_BLTOL_NTOL			as PITEM_BLTOL_NTOL
	, pitem.RAT_HOT_MAIN			as PITEM_HOT_MAIN
	, pitem.ADTV_FLAG				as PITEM_ADTV_FLAG
	, pitem.RAT_SUB_SEQ				as PITEM_RATIO_SUBSEQ
	, pitem.RAT_SEQ					as PITEM_RATIO_SEQ
	, pitem.RAT_SUB_COUNT			as PITEM_RATIO_SUBCOUNT
	, pitem.RAT_COUNT				as PITEM_RATIO_COUNT
	, pitem.RAT_TOTAL				as PITEM_RATIO_TOTAL
	, bprod.BASE_PROD_GROUP			as PITEM_BASE_GROUP
	, bpgrp.PGR_DESCRIPTION			as PITEM_BASE_GRPNAME
	, bprod.BASE_CAT				as PITEM_BASE_CLASS
	, bpcls.BCLASS_DESC				as PITEM_BCLASS_NAME
	, bprod.BASE_LIMIT_PRESET_HT	as PITEM_HOT_CHECK
	, bprod.BASE_RPT_TUNT			as PITEM_BASE_TUNIT
	, bunit.DESCRIPTION				as PITEM_BASE_TUNITNAME
	, bprod.BASE_RPT_TEMP			as PITEM_BASE_RPTTEMP
	, bpcls.BCLASS_DENS_LO			as PITEM_BCLASS_DENS_LO
	, bpcls.BCLASS_DENS_HI			as PITEM_BCLASS_DENS_HI
	, bpcls.BCLASS_VCF_ALG			as PITEM_BCLASS_VCF_ALG
	, bpcls.BCLASS_TEMP_LO			as PITEM_BCLASS_TEMP_LO
	, bpcls.BCLASS_TEMP_HI			as PITEM_BCLASS_TEMP_HI
from
	PRODUCTS						dprod
	, GUI_COMPANYS						dcmpy
	, HZ_LINK						hzlnk
	, PRODUCT_GROUP					bpgrp
	, UNIT_SCALE_VW					bunit
	, BASE_PRODS					bprod
	, (
				select
					bcls.BCLASS_NO
					, NVL(bctyp.BCLASS_NAME, bcls.BCLASS_DESC)			as BCLASS_DESC
					, bcls.BCLASS_DENS_LO
					, bcls.BCLASS_DENS_HI
					, bcls.BCLASS_VCF_ALG
					, bcls.BCLASS_TEMP_LO
					, bcls.BCLASS_TEMP_HI
				from
					BASECLASS 			bcls
					, BCLASS_TYP		bctyp
				where
					1=1
					and bcls.BCLASS_NO = bctyp.BCLASS_ID(+)
	) 								bpcls
	, (
		select
			r0.RATIO_BASE
			, r0.RAT_PROD_PRODCODE
			, r0.RAT_PROD_PRODCMPY
			, r0.RATIO_VALUE
			, r0.RATIO_PERCENT_PPM
			, r0.RAT_BLTOL_FLAG
			, r0.RAT_BLTOL_PTOL
			, r0.RAT_BLTOL_NTOL
			, r0.RAT_HOT_MAIN
			, b0.ADTV_FLAG
			, row_number() OVER (partition by r0.RAT_PROD_PRODCODE, r0.RAT_PROD_PRODCMPY, b0.ADTV_FLAG order by r0.RATIO_VALUE desc ) 	as RAT_SUB_SEQ
			, row_number() OVER (partition by r0.RAT_PROD_PRODCODE, r0.RAT_PROD_PRODCMPY order by r0.RATIO_VALUE desc ) 				as RAT_SEQ
			, count(r0.RATIO_BASE) OVER (partition by r0.RAT_PROD_PRODCODE, r0.RAT_PROD_PRODCMPY, b0.ADTV_FLAG ) 						as RAT_SUB_COUNT
			, count(r0.RATIO_BASE) OVER (partition by r0.RAT_PROD_PRODCODE, r0.RAT_PROD_PRODCMPY) 										as RAT_COUNT
			, sum(r0.RATIO_VALUE) OVER (partition by r0.RAT_PROD_PRODCODE, r0.RAT_PROD_PRODCMPY) 										as RAT_TOTAL
		from
			RATIOS r0
			, (select BASE_CODE, decode(BASE_CAT, 6, 1, 11, 1, 0) as ADTV_FLAG from BASE_PRODS) b0
		where
			r0.RATIO_BASE = b0.BASE_CODE
	) pitem
where
	( ( (SYS_CONTEXT('CONN_CONTEXT', 'ISMANAGER') = 'N') and (dcmpy.CMPY_CODE = SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE')) )
	or ( SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE') IS NULL )
	or ( SYS_CONTEXT('CONN_CONTEXT', 'ISMANAGER') = 'Y' )
	or ( SYS_CONTEXT('CONN_CONTEXT', 'ISMANAGER') IS NULL) )
	and dprod.PROD_CODE = pitem.RAT_PROD_PRODCODE
	and dprod.PROD_CMPY = pitem.RAT_PROD_PRODCMPY
	and pitem.RAT_PROD_PRODCMPY = dcmpy.CMPY_CODE
	and pitem.RATIO_BASE = bprod.BASE_CODE
	and bprod.BASE_CAT = bpcls.BCLASS_NO
	and bprod.BASE_PROD_GROUP = bpgrp.PGR_CODE(+)
	and bprod.BASE_RPT_TUNT = bunit.UNIT_ID(+)
	and dprod.PROD_CMPY = hzlnk.HZLNK_SP_PRODCMPY(+)
	and dprod.PROD_CODE = hzlnk.HZLNK_SP_PRODCODE(+);
/
