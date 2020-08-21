<?php

include_once __DIR__ . '/../shared/log.php';

class BaseService
{
    public function __construct($db, $auto_commit = false)
    {
        $this->conn = $db;
        
        if ($auto_commit) {
            $this->commit_mode = OCI_COMMIT_ON_SUCCESS;
        } else {
            $this->commit_mode = OCI_NO_AUTO_COMMIT;
        }
    }

    public function read_brief()
    {
        $query = "
            SELECT 
                bp.BASE_CODE                    as BASE_CODE,
                bp.BASE_NAME                    as BASE_NAME,
                bp.BASE_CAT                     as BCLASS_NO,
                decode(bp.BASE_CAT, 6, 1, 0)	as BASE_ADTV,
                bp.BASE_LIMIT_PRESET_HT         as BASE_HOT_CHECK,
                bc.BCLASS_DESC                  as BCLASS_DESC,
                bc.BCLASS_DENS_LO               as BCLASS_DENS_LO,
                bc.BCLASS_DENS_HI               as BCLASS_DENS_HI,
                bc.BCLASS_VCF_ALG               as BCLASS_VCF_ALG,
                bc.BCLASS_TEMP_LO               as BCLASS_TEMP_LO,
                bc.BCLASS_TEMP_HI               as BCLASS_TEMP_HI,
                bp.BASE_CODE || ' - ' || bp.BASE_NAME || '(' || bc.BCLASS_DESC || ')'    as BASE_DETAIL
            FROM 
                BASE_PRODS bp
                , (
                    select 
                        bs.BCLASS_NO
                        , NVL(bm.BCLASS_NAME, bs.BCLASS_DESC) as BCLASS_DESC
                        , bs.BCLASS_DENS_LO
                        , bs.BCLASS_DENS_HI
                        , bs.BCLASS_VCF_ALG
                        , bs.BCLASS_TEMP_LO
                        , bs.BCLASS_TEMP_HI			
                    from 
                        BASECLASS       bs
                        , BCLASS_TYP    bm
                    where 
                        1=1	
                        and bs.BCLASS_NO = bm.BCLASS_ID(+)
                ) bc
            where 
                bp.BASE_CAT = bc.BCLASS_NO(+)
            ORDER BY bp.BASE_CODE";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
}
