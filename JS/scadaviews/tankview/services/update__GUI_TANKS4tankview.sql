  CREATE OR REPLACE FORCE VIEW GUI_TANKS AS 
  select
    tnk.TANK_CODE
    , tnk.TANK_NAME
    , tnk.TANK_TERMINAL
    , trm.TERM_NAME                        as TANK_SITENAME
    , tnk.TANK_BASE
    , bsp.BASE_NAME                        as TANK_BASE_NAME
    , bsp.BASE_PROD_GROUP                  as TANK_BASE_GROUP
    , bsp.BASE_CAT                         as TANK_BASE_CLASS
    , cls.BCLASS_DESC                      as TANK_BCLASS_NAME
    , bsp.BASE_RPT_TUNT                    as TANK_BASE_TUNIT
    , bsp.BASE_RPT_TEMP                    as TANK_BASE_RPTTEMP
    , cls.BCLASS_DENS_LO                   as TANK_BCLASS_DENS_LO
    , cls.BCLASS_DENS_HI                   as TANK_BCLASS_DENS_HI
    , cls.BCLASS_VCF_ALG                   as TANK_BCLASS_VCF_ALG
    , cls.BCLASS_TEMP_LO                   as TANK_BCLASS_TEMP_LO
    , cls.BCLASS_TEMP_HI                   as TANK_BCLASS_TEMP_HI
    , tnk.TANK_DRV_TYPE
    , tnk.TANK_DRV_AUX
    , tnk.TANK_IDENTIFIER
    , tnk.TANK_LOCATION
    , tnk.TANK_OUTFLOW_OPE
    , tnk.TANK_INFLOW_OPEN
    , tnk.TANK_ADHOC_IVRQ
    , tnk.TANK_INV_NEEDED
    , tnk.TANK_DIPPING_ON
    , tnk.TANK_LEAKDTCT_ON
    , tnk.TANK_ALARMED
    , tnk.TANK_POLL_GAP
    , tnk.TANK_PROD_LVL
    , tnk.TANK_ADDRESS
    , tnk.TANK_RCPTS
    , tnk.TANK_TRFS
    , tnk.TANK_NO_SBT
    , tnk.TANK_VERSNO
    , tnk.TANK_PAKSCAN_ACT
    , tnk.TANK_ALARM_STATE
    , tnk.TANK_LVL_ALARM
    , lat.LEVEL_ALARMS_NAME                as TANK_LVLALARM_DESC
    , tnk.TANK_GAUGINGMTHD
    , gmt.GAUGE_METHOD_NAME                as TANK_GAUGINGMTHD_DESC
    , tnk.TANK_INSTANCE
    , tnk.TANK_CHANNEL
    , tnk.TANK_SBT_TY
    , tnk.TANK_ETH_CONTENT
    , tnk.TANK_LTR_CLOSE
    , tnk.TANK_KG_CLOSE
    , tnk.TANK_CLOSE_DENS
    , tnk.TANK_RPTVCFCLOSE
    , tnk.TANK_INFLOW_RATE
    , tnk.TANK_SPARE_FLD1
    , tnk.TANK_SPARE_FLD2
    , tnk.TANK_RCPT_VOL
    , tnk.TANK_TRF_VOL
    , tnk.TANK_RCPT_KG
    , tnk.TANK_TRF_KG
    , tnk.TANK_PUMP_VOL
    , tnk.TANK_RES
    , tnk.TANK_AMB_VOL
    , tnk.TANK_COR_VOL
    , tnk.TANK_VAPOUR_KG
    , tnk.TANK_LIQUID_KG
    , tnk.TANK_WATER
    , tnk.TANK_WATER_LVL
    , tnk.TANK_ULLAGE
    , tnk.TANK_API
    , tnk.TANK_PROD_C_OF_E
    , tnk.TANK_60_86_VCF
    , tnk.TANK_DENSITY
    , tnk.TANK_TEMP
    , tnk.TANK_RPTVCF
    , tnk.TANK_AMB_DENSITY
    , tnk.TANK_DAILY_TOL_VOL               as TANK_DTOL_VOLUME
    , tnk.TANK_DAILY_TOL_PERCENT           as TANK_DTOL_PERCENT
    , tnk.TANK_MONTHLY_TOL_VOL             as TANK_MTOL_VOLUME
    , tnk.TANK_MONTHLY_TOL_PERCENT         as TANK_MTOL_PERCENT
    , tnk.TANK_DATE
    , tgr.TGR_GRLK                         as TANK_GROUP
	, tnk.TANK_15_DENSITY
	, bsp.BASE_REF_TEMP                    as TANK_BASE_REF_TEMP
	, bsp.BASE_REF_TUNT                    as TANK_BASE_REF_TUNT
	, bsp.BASE_CORR_MTHD                   as TANK_BASE_CORR_MTHD
	, bsp.BASE_REF_TEMP_SPEC               as TANK_BASE_REF_TEMP_SPEC
	, bsp.BASE_LIMIT_PRESET_HT             as TANK_BASE_LIMIT_PRESET_HT
	, bsp.BASE_DENS_LO                     as TANK_BASE_DENS_LO
	, bsp.BASE_DENS_HI                     as TANK_BASE_DENS_HI
	, bsp.BASE_COLOR                       as TANK_BASE_COLOR
	, tp.TANK_ACTIVE
	, tnk.TANK_ATG_MANCHG
	, tnk.TANK_ATG_STATUS
	, tnk.TANK_SULPHUR
	, tnk.TANK_FLASHPOINT
	, tnk.TANK_STATUS
	, tst.TANK_STATUS_NAME
	, tnk.TANK_HH_LEVEL
	, tnk.TANK_H_LEVEL
	, tnk.TANK_L_LEVEL
	, tnk.TANK_LL_LEVEL
	, tnk.TANK_UH_LEVEL
	, tnk.TANK_UL_LEVEL
	, (case when tnk.TANK_PROD_LVL>=tnk.TANK_HH_LEVEL then 1 else 0 end )       as TANK_HH_STATE
	, (case when tnk.TANK_PROD_LVL>=tnk.TANK_H_LEVEL then 1 else 0 end )        as TANK_H_STATE
	, (case when tnk.TANK_PROD_LVL<=tnk.TANK_L_LEVEL then 1 else 0 end )        as TANK_L_STATE
	, (case when tnk.TANK_PROD_LVL<=tnk.TANK_LL_LEVEL then 1 else 0 end )       as TANK_LL_STATE
	, (case when tnk.TANK_PROD_LVL>=tnk.TANK_UH_LEVEL then 1 else 0 end )       as TANK_UH_STATE
	, (case when tnk.TANK_PROD_LVL<=tnk.TANK_UL_LEVEL then 1 else 0 end )       as TANK_UL_STATE
from
    TANKS                                  tnk
    , TERMINAL                             trm
    , BASE_PRODS                           bsp
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
	) 								       cls
    , LEVEL_ALARMS_TYP                    lat
    , GAUGE_METHOD_TYP                    gmt
    , TGRLINK                            tgr
	, TANK_STATUS_TYP                    tst
    ,(
		select distinct
			p.PN_TANK_TANKCODE 		as TANK_CODE
			, p.PN_TANK_TANKDEPO 	as TANK_TERMINAL
			, 1 					as TANK_ACTIVE
		from
			PIPENODE  				p
			, STREAM_LINKS 			s
		where
		p.PN_TANK_TANKCODE is not null
		and p.PN_TANK_TANKDEPO is not null
		and (p.PN_ID = s.STREAM_LINK_DOWN or p.PN_ID = s.STREAM_LINK_UP)
	)  								tp
where
    ( ( SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE') IS NULL )
    or ( SYS_CONTEXT('CONN_CONTEXT', 'ISMANAGER') = 'Y' )
    or ( SYS_CONTEXT('CONN_CONTEXT', 'ISMANAGER') IS NULL) )
    and tnk.TANK_TERMINAL = trm.TERM_CODE
    and tnk.TANK_BASE = bsp.BASE_CODE
    and bsp.BASE_CAT = cls.BCLASS_NO
    and tnk.TANK_LVL_ALARM = lat.LEVEL_ALARMS_ID(+)
    and tnk.TANK_STATUS = tst.TANK_STATUS_ID(+)
    and tnk.TANK_GAUGINGMTHD = gmt.GAUGE_METHOD_ID(+)
    and tnk.TANK_TERMINAL = tgr.TGR_TKLK_TANKDEPO(+)
    and tnk.TANK_CODE = tgr.TGR_TKLK_TANKCODE(+)
    and tnk.TANK_CODE = tp.TANK_CODE(+)
    and tnk.TANK_TERMINAL = tp.TANK_TERMINAL(+);
