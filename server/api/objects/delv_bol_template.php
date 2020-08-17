<?php

include_once 'common_class.php';

class DelvBolTemplate extends CommonClass
{
    protected $TABLE_NAME = 'DELV_BOL';
    protected $VIEW_NAME = 'DELV_BOL';

    public function read()
    {
        $query = "
            select
                db.DB_SUPP_CODE
                , sc.CMPY_NAME					as DB_SUPP_NAME
                , db.DB_TRIPORD_NO
                , db.DB_LD_TYPE
                , dlt.SHL_TYPE_NAME				as DB_LOAD_TYPENAME
                , db.DB_TEMPL_ID
                , tmp.TEMPLATE_CODE
                , tmp.TEMPLATE_NAME
                , tmp.TEMPLATE_TYPE_ID
                , tmp.TEMPLATE_FILE
                , tmp.TEMPLATE_LOCALE
                , tmp.TEMPLATE_NOTE
                , tmp.TEMPLATE_CMPY_FLAG
                , tmp.TEMPLATE_CMPY_EMAIL
                , tmp.TEMPLATE_CMPY_COPIES
                , tmp.TEMPLATE_CMPY_FOOTERS
                , tmp.TEMPLATE_WARN_PERCENT
            from
                DELV_BOL 			db
                , (
                    select 
                        ct.CMPY_CODE				as TEMPLATE_CMPY_CODE
                        , ct.CMPY_NAME				as TEMPLATE_CMPY_NAME
                        , ct.CMPY_TYPE				as TEMPLATE_CMPY_TYPE
                        , ct.CMPY_REPORT_RECEIVERS	as TEMPLATE_CMPY_EMAIL_DEF
                        , ct.TEMPLATE_CODE			as TEMPLATE_CODE
                        , ct.TEMPLATE_NAME			as TEMPLATE_NAME
                        , ct.TEMPLATE_TYPE			as TEMPLATE_TYPE_ID
                        , ct.FILE_NAME				as TEMPLATE_FILE
                        , ct.LOCALE					as TEMPLATE_LOCALE
                        , ct.DESCRIPTION			as TEMPLATE_NOTE
                        , NVL(tc.TEMPLATE_IDENTIFIER, ct.TEMPLATE_CODE)					as TEMPLATE_IDENTIFIER
                        , NVL(tc.DEFAULT_FLAG, 'N')					as TEMPLATE_CMPY_FLAG
                        , NVL(tc.STATUS, 0)							as TEMPLATE_CMPY_STATUS
                        , NVL(tc.EMAIL, ct.CMPY_REPORT_RECEIVERS)	as TEMPLATE_CMPY_EMAIL
                        , NVL(tc.COPIES, 3)							as TEMPLATE_CMPY_COPIES
                        , NVL(tc.FOOTERS, decode(ct.TEMPLATE_TYPE, 1, 'Driver;Terminal;Customer', 'Processing;Driver Copy;Customer Copy') )				as TEMPLATE_CMPY_FOOTERS
                        , NVL(tc.WARNING_PERCENT, 0)				as TEMPLATE_WARN_PERCENT
                        , NVL(tc.WARNING_QTY, 0)					as TEMPLATE_WARN_QTY
                    from
                        TEMPLATE_N_CMPY tc
                        , (
                            select 
                                cmp.CMPY_CODE				
                                , cmp.CMPY_NAME				
                                , cmp.CMPY_TYPE				
                                , cmp.CMPY_REPORT_RECEIVERS	
                                , bdt.TEMPLATE_CODE			
                                , bdt.TEMPLATE_NAME			
                                , bdt.TEMPLATE_TYPE			
                                , bdt.FILE_NAME				
                                , bdt.LOCALE					
                                , bdt.DESCRIPTION			
                            from 
                                GUI_COMPANYS cmp
                                , BOL_DN_TEMPLATE bdt 
                            where 
                                cmp.SUPPLIER='Y' or cmp.DRAWER='Y'
                        ) ct 
                    where 
                        ct.CMPY_CODE = tc.CMPY_CODE(+) 
                        and ct.TEMPLATE_CODE = tc.TEMPLATE_CODE(+) 
                        and ct.TEMPLATE_TYPE = tc.TEMPLATE_TYPE(+) 
                        and ct.TEMPLATE_TYPE = 2
                ) tmp
                , COMPANYS					sc
                , SHL_TYPE_TYP				dlt
            where 
                1=1
                and db.DB_SUPP_CODE = :dd_supp_code
                and db.DB_TRIPORD_NO = :dd_tripord_no
                and db.DB_LD_TYPE = :dd_ld_type
                and db.DB_SUPP_CODE = sc.CMPY_CODE
                and db.DB_LD_TYPE = dlt.SHL_TYPE_ID(+)
                and db.DB_TEMPL_ID = tmp.TEMPLATE_IDENTIFIER(+)
                and db.DB_SUPP_CODE = tmp.TEMPLATE_CMPY_CODE(+)
            order by
                db.DB_SUPP_CODE, db.DB_TRIPORD_NO, db.DB_TEMPL_ID
        ";
        $stmt = oci_parse($this->conn, $query);
        
        if (!isset($this->dd_supp_code)) {
            $this->dd_supp_code = '-1';
        }
        oci_bind_by_name($stmt, ':dd_supp_code', $this->dd_supp_code);
        if (!isset($this->dd_tripord_no)) {
            $this->dd_tripord_no = -1;
        }
        oci_bind_by_name($stmt, ':dd_tripord_no', $this->dd_tripord_no);
        if (!isset($this->dd_ld_type)) {
            $this->dd_ld_type = -1;
        }
        oci_bind_by_name($stmt, ':dd_ld_type', $this->dd_ld_type);
        
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function check_delv_bol()
	{
        $query = "
            select COUNT(*) AS CNT 
            from DELV_BOL 
			where 
				DB_SUPP_CODE=:db_supp_code 
				and DB_TRIPORD_NO=:db_tripord_no 
				and DB_LD_TYPE=:db_ld_type 
                and DB_TEMPL_ID=:db_templ_id
        ";
        $stmt = oci_parse($this->conn, $query);

        oci_bind_by_name($stmt, ':db_supp_code', $this->dd_supp_code);
        oci_bind_by_name($stmt, ':db_tripord_no', $this->dd_tripord_no);
        oci_bind_by_name($stmt, ':db_ld_type', $this->dd_ld_type);
        oci_bind_by_name($stmt, ':db_templ_id', $this->db_templ_id);
        
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
}