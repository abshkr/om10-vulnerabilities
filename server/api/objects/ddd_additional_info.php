<?php

include_once 'common_class.php';

class DddAdditionalInfo extends CommonClass
{
    protected $TABLE_NAME = 'DELV_DETAILS_DN_ADDL_INFO';
    protected $VIEW_NAME = 'DELV_DETAILS_DN_ADDL_INFO';

    public function read()
    {
        $query = "
			select 
				addl.DDD_DD_NUMBER
				, addl.DDD_DD_SUPP_CODE
				, sc.CMPY_NAME					as DDD_DD_SUPP_NAME
				, addl.DDD_DD_TRIPORD_NO
				, addl.DDD_DD_LD_TYPE
				, dlt.SHL_TYPE_NAME				as DDD_DD_LOAD_TYPENAME
				, addl.DDD_TEMPL_ID
				, addl.ADDI_FLD_LINE_NO	
				, addl.ADDI_FLD_INFO
			from 
				DELV_DETAILS_DN_ADDL_INFO		addl
				, COMPANYS						sc
				, SHL_TYPE_TYP					dlt
			where 
				1 = 1
				and addl.DDD_DD_SUPP_CODE = sc.CMPY_CODE
				and addl.DDD_DD_LD_TYPE = dlt.SHL_TYPE_ID(+)
                and addl.DDD_DD_NUMBER=:ddd_dd_number 
                and addl.DDD_DD_SUPP_CODE=:ddd_dd_supp_code 
                and addl.DDD_DD_TRIPORD_NO=:ddd_dd_tripord_no 
                and addl.DDD_DD_LD_TYPE=:ddd_dd_ld_type 
				and addl.DDD_TEMPL_ID=:ddd_templ_id 
            order by addl.ADDI_FLD_LINE_NO
        ";
        $stmt = oci_parse($this->conn, $query);

        oci_bind_by_name($stmt, ':ddd_dd_number', $this->dd_number);
        oci_bind_by_name($stmt, ':ddd_dd_supp_code', $this->dd_supp_code);
        oci_bind_by_name($stmt, ':ddd_dd_tripord_no', $this->dd_tripord_no);
        oci_bind_by_name($stmt, ':ddd_dd_ld_type', $this->dd_ld_type);
        oci_bind_by_name($stmt, ':ddd_templ_id', $this->ddd_templ_id);
        
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function check_additional_info()
	{
        $query = "
            select COUNT(*) AS CNT 
            from DELV_DETAILS_DN_ADDL_INFO 
			where 
				DDD_DD_NUMBER=:ddd_dd_number 
				and DDD_DD_SUPP_CODE=:ddd_dd_supp_code 
				and DDD_DD_TRIPORD_NO=:ddd_dd_tripord_no 
				and DDD_DD_LD_TYPE=:ddd_dd_ld_type 
				and DDD_TEMPL_ID=:ddd_templ_id 
        ";
        $stmt = oci_parse($this->conn, $query);

        oci_bind_by_name($stmt, ':ddd_dd_number', $this->dd_number);
        oci_bind_by_name($stmt, ':ddd_dd_supp_code', $this->dd_supp_code);
        oci_bind_by_name($stmt, ':ddd_dd_tripord_no', $this->dd_tripord_no);
        oci_bind_by_name($stmt, ':ddd_dd_ld_type', $this->dd_ld_type);
        oci_bind_by_name($stmt, ':ddd_templ_id', $this->ddd_templ_id);
        
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function check_additional_line()
	{
        $query = "
            select COUNT(*) AS CNT 
            from DELV_DETAILS_DN_ADDL_INFO 
			where 
				DDD_DD_NUMBER=:ddd_dd_number 
				and DDD_DD_SUPP_CODE=:ddd_dd_supp_code 
				and DDD_DD_TRIPORD_NO=:ddd_dd_tripord_no 
				and DDD_DD_LD_TYPE=:ddd_dd_ld_type 
				and DDD_TEMPL_ID=:ddd_templ_id 
				and ADDI_FLD_LINE_NO=:addi_fld_line_no 
        ";
        $stmt = oci_parse($this->conn, $query);

        oci_bind_by_name($stmt, ':ddd_dd_number', $this->dd_number);
        oci_bind_by_name($stmt, ':ddd_dd_supp_code', $this->dd_supp_code);
        oci_bind_by_name($stmt, ':ddd_dd_tripord_no', $this->dd_tripord_no);
        oci_bind_by_name($stmt, ':ddd_dd_ld_type', $this->dd_ld_type);
        oci_bind_by_name($stmt, ':ddd_templ_id', $this->ddd_templ_id);
        oci_bind_by_name($stmt, ':addi_fld_line_no', $this->addi_fld_line_no);
        
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
}