
  CREATE OR REPLACE FORCE VIEW "GUI_PIPENODE" ("STREAM_INDEX", "STREAM_BAYCODE", "STREAM_BAYNAME", "STREAM_ARMCODE", "STREAM_ARMNAME", "STREAM_MTRCODE", "STREAM_MTRNAME", "STREAM_INJCODE", "STREAM_INJNAME", "STREAM_TANKCODE", "STREAM_TANKSITE", "STREAM_TANKNAME", "STREAM_TANKDEN", "STREAM_TANKTEMP", "STREAM_BASECODE", "STREAM_BASENAME", "STREAM_BCLASS_CODE", "STREAM_BCLASS_NMAE", "STREAM_BCLASS_LODENS", "STREAM_BCLASS_HIDENS", "STREAM_BCLASS_VCFALG", "STREAM_SEQ") AS 
  SELECT DISTINCT pna.PN_STREAM AS STREAM_INDEX,
                   bd.BAD_PHYSCODE AS STREAM_BAYCODE,
                   bd.BAD_NAME AS STREAM_BAYNAME,
                   ba.BAA_CODE AS STREAM_ARMCODE,
                   ba.BAA_CODE AS STREAM_ARMNAME,
                   bm.BAM_CODE AS STREAM_MTRCODE,
                   bm.BAM_NAME AS STREAM_MTRNAME,
                   --bi.BAI_CODE AS STREAM_INJCODE,
                   --bi.BAI_CODE AS STREAM_INJNAME,
                   NULL AS STREAM_INJCODE,
                   NULL AS STREAM_INJNAME,
                   tk.TANK_CODE AS STREAM_TANKCODE,
                   tk.TANK_TERMINAL AS STREAM_TANKSITE,
                   tk.TANK_NAME AS STREAM_TANKNAME,
                   tk.TANK_DENSITY AS STREAM_TANKDEN,
                   tk.TANK_TEMP AS STREAM_TANKTEMP,
                   bs.BASE_CODE AS STREAM_BASECODE,
                   bs.BASE_NAME AS STREAM_BASENAME,
                   bs.BASE_CAT AS STREAM_BCLASS_CODE,
                   bc.BCLASS_DESC AS STREAM_BCLASS_NMAE,
                   bc.BCLASS_DENS_LO AS STREAM_BCLASS_LODENS,
                   bc.BCLASS_DENS_HI AS STREAM_BCLASS_HIDENS,
                   bc.BCLASS_VCF_ALG AS STREAM_BCLASS_VCFALG,
                   pnm.PN_STREAM_SEQ AS STREAM_SEQ
     FROM BA_DEVICE bd,
          BA_ARMS ba,
          BA_METERS bm,
          BA_INJECTORS bi,
          TANKS tk,
          BASE_PRODS bs,
			(
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
			) 					bc,
          PIPENODE pna,
          PIPENODE pnm,
          PIPENODE pni,
          PIPENODE pnt,
          STREAM str,
          STREAM_LINKS sla,
          STREAM_LINKS slm,
          STREAM_LINKS sli
    WHERE     ba.BAA_BAD_LNK = bd.BAD_PHYSCODE
          AND pna.PN_STREAM = str.PS_ID
          AND str.PS_ACTIVE = 'Y'
          AND ( (    ba.BAA_CODE = pna.PN_ARM
                 AND pna.PN_STREAM = pnm.PN_STREAM
                 AND pnm.PN_MTR = bm.BAM_CODE))
          AND ( (    ba.BAA_CODE = pna.PN_ARM
                 AND pna.PN_STREAM = pnt.PN_STREAM
                 AND pnt.PN_TANK_TANKCODE = tk.TANK_CODE
                 AND pnt.PN_TANK_TANKDEPO = tk.TANK_TERMINAL
                 AND tk.TANK_BASE = bs.BASE_CODE
                 AND bs.BASE_CAT = bc.BCLASS_NO))
          AND ( (    ba.BAA_CODE = pna.PN_ARM
                 AND pna.PN_STREAM = pni.PN_STREAM
                 AND pni.PN_INJ = bi.BAI_CODE))
          AND (    pna.PN_ID = sla.STREAM_LINK_DOWN
               AND sla.STREAM_LINK_UP = pnm.PN_ID
               AND pnm.PN_ID = slm.STREAM_LINK_DOWN
               AND slm.STREAM_LINK_UP = pnt.PN_ID
               AND pnm.PN_ID = sli.STREAM_LINK_DOWN
               AND sli.STREAM_LINK_UP = pni.PN_ID)
   UNION
   SELECT pna.PN_STREAM AS STREAM_INDEX,
          bd.BAD_PHYSCODE AS STREAM_BAYCODE,
          bd.BAD_NAME AS STREAM_BAYNAME,
          ba.BAA_CODE AS STREAM_ARMCODE,
          ba.BAA_CODE AS STREAM_ARMNAME,
          bm.BAM_CODE AS STREAM_MTRCODE,
          bm.BAM_NAME AS STREAM_MTRNAME,
          NULL AS STREAM_INJCODE,
          NULL AS STREAM_INJNAME,
          tk.TANK_CODE AS STREAM_TANKCODE,
          tk.TANK_TERMINAL AS STREAM_TANKSITE,
          tk.TANK_NAME AS STREAM_TANKNAME,
          tk.TANK_DENSITY AS STREAM_TANKDEN,
          tk.TANK_TEMP AS STREAM_TANKTEMP,
          bs.BASE_CODE AS STREAM_BASECODE,
          bs.BASE_NAME AS STREAM_BASENAME,
          bs.BASE_CAT AS STREAM_BCLASS_CODE,
          bc.BCLASS_DESC AS STREAM_BCLASS_NMAE,
          bc.BCLASS_DENS_LO AS STREAM_BCLASS_LODENS,
          bc.BCLASS_DENS_HI AS STREAM_BCLASS_HIDENS,
          bc.BCLASS_VCF_ALG AS STREAM_BCLASS_VCFALG,
          pnm.PN_STREAM_SEQ AS STREAM_SEQ
     FROM BA_DEVICE bd,
          BA_ARMS ba,
          BA_METERS bm,
          TANKS tk,
          BASE_PRODS bs,
--           BASECLASS bc,
			(
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
			) 					bc,
          STREAM str,
          PIPENODE pna,
          PIPENODE pnm,
          PIPENODE pnt,
          STREAM_LINKS sla,
          STREAM_LINKS slm
    WHERE     ba.BAA_BAD_LNK = bd.BAD_PHYSCODE
          AND pna.PN_STREAM = str.PS_ID
          AND str.PS_ACTIVE = 'Y'
          AND ( (    ba.BAA_CODE = pna.PN_ARM
                 AND pna.PN_STREAM = pnm.PN_STREAM
                 AND pnm.PN_MTR = bm.BAM_CODE))
          AND ( (    ba.BAA_CODE = pna.PN_ARM
                 AND pna.PN_STREAM = pnt.PN_STREAM
                 AND pnt.PN_TANK_TANKCODE = tk.TANK_CODE
                 AND pnt.PN_TANK_TANKDEPO = tk.TANK_TERMINAL
                 AND tk.TANK_BASE = bs.BASE_CODE
                 AND bs.BASE_CAT = bc.BCLASS_NO))
          AND (    pna.PN_ID = sla.STREAM_LINK_DOWN
               AND sla.STREAM_LINK_UP = pnm.PN_ID
               AND pnm.PN_ID = slm.STREAM_LINK_DOWN
               AND slm.STREAM_LINK_UP = pnt.PN_ID
               AND 1 = (SELECT COUNT (*)
                          FROM STREAM_LINKS slnk
                         WHERE slnk.STREAM_LINK_DOWN = pnm.PN_ID))
   UNION  -- union injects
   SELECT pna.PN_STREAM AS STREAM_INDEX,
          bd.BAD_PHYSCODE AS STREAM_BAYCODE,
          bd.BAD_NAME AS STREAM_BAYNAME,
          ba.BAA_CODE AS STREAM_ARMCODE,
          ba.BAA_CODE AS STREAM_ARMNAME,
          --bm.BAM_CODE AS STREAM_MTRCODE,
          --bm.BAM_NAME AS STREAM_MTRNAME,
          bi.BAI_CODE AS STREAM_MTRCODE,
          bi.BAI_CODE AS STREAM_MTRNAME,
          bi.BAI_CODE AS STREAM_INJCODE,
          bi.BAI_CODE AS STREAM_INJNAME,
          tk.TANK_CODE AS STREAM_TANKCODE,
          tk.TANK_TERMINAL AS STREAM_TANKSITE,
          tk.TANK_NAME AS STREAM_TANKNAME,
          tk.TANK_DENSITY AS STREAM_TANKDEN,
          tk.TANK_TEMP AS STREAM_TANKTEMP,
          bs.BASE_CODE AS STREAM_BASECODE,
          bs.BASE_NAME AS STREAM_BASENAME,
          bs.BASE_CAT AS STREAM_BCLASS_CODE,
          bc.BCLASS_DESC AS STREAM_BCLASS_NMAE,
          bc.BCLASS_DENS_LO AS STREAM_BCLASS_LODENS,
          bc.BCLASS_DENS_HI AS STREAM_BCLASS_HIDENS,
          bc.BCLASS_VCF_ALG AS STREAM_BCLASS_VCFALG,
          pnm.PN_STREAM_SEQ AS STREAM_SEQ
     FROM BA_DEVICE bd,
          BA_ARMS ba,
          BA_METERS bm,
          BA_INJECTORS bi,
          TANKS tk,
          BASE_PRODS bs,
--           BASECLASS bc,
			(
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
			) 					bc,
          PIPENODE pna,
          PIPENODE pnm,
          PIPENODE pni,
          PIPENODE pnt,
          STREAM str,
          STREAM_LINKS sla,
          STREAM_LINKS slm,
          STREAM_LINKS sli
    WHERE     ba.BAA_BAD_LNK = bd.BAD_PHYSCODE
          AND pna.PN_STREAM = str.PS_ID
          AND str.PS_ACTIVE = 'Y'
          AND ( (    ba.BAA_CODE = pna.PN_ARM
                 AND pna.PN_STREAM = pnm.PN_STREAM
                 AND pnm.PN_MTR = bm.BAM_CODE))
          AND ( (    ba.BAA_CODE = pna.PN_ARM
                 AND pna.PN_STREAM = pnt.PN_STREAM
                 AND pnt.PN_TANK_TANKCODE = tk.TANK_CODE
                 AND pnt.PN_TANK_TANKDEPO = tk.TANK_TERMINAL
                 AND tk.TANK_BASE = bs.BASE_CODE
                 AND bs.BASE_CAT = bc.BCLASS_NO
				 AND bc.BCLASS_NO = 6   -- only ADDITIVE can be used in inject
				 ))
          AND ( (    ba.BAA_CODE = pna.PN_ARM
                 AND pna.PN_STREAM = pni.PN_STREAM
                 AND pni.PN_INJ = bi.BAI_CODE))
          AND (    pna.PN_ID = sla.STREAM_LINK_DOWN
               AND sla.STREAM_LINK_UP = pnm.PN_ID
               AND pnm.PN_ID = slm.STREAM_LINK_DOWN
               AND slm.STREAM_LINK_UP = pni.PN_ID
               AND pni.PN_ID = sli.STREAM_LINK_DOWN
               AND sli.STREAM_LINK_UP = pnt.PN_ID);
