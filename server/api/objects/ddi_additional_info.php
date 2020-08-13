<?php

include_once 'common_class.php';

class DdiAdditionalInfo extends CommonClass
{
    protected $TABLE_NAME = 'DELV_DETAILS_ITEM_ADDL_INFO';
    protected $VIEW_NAME = 'DELV_DETAILS_ITEM_ADDL_INFO';

    public function read()
    {
        $query = "
			select 
				addl.DDI_DD_NUMBER
				, addl.DDI_DD_SUPP_CODE
				, sc.CMPY_NAME					as DDI_DD_SUPP_NAME
				, addl.DDI_DD_TRIPORD_NO
				, addl.DDI_DD_LD_TYPE
				, dlt.SHL_TYPE_NAME				as DDI_DD_LOAD_TYPENAME
				, addl.DDI_LINE_ITEM_NUM
				, addl.ADDI_FLD_LINE_NO	
				, addl.ADDI_FLD_INFO
			from 
				DELV_DETAILS_ITEM_ADDL_INFO		addl
				, COMPANYS						sc
				, SHL_TYPE_TYP					dlt
			where 
				1 = 1
				and addl.DDI_DD_SUPP_CODE = sc.CMPY_CODE
				and addl.DDI_DD_LD_TYPE = dlt.SHL_TYPE_ID(+)
                and addl.DDI_DD_NUMBER=:ddi_dd_number 
                and addl.DDI_DD_SUPP_CODE=:ddi_dd_supp_code 
                and addl.DDI_DD_TRIPORD_NO=:ddi_dd_tripord_no 
                and addl.DDI_DD_LD_TYPE=:ddi_dd_ld_type 
                and addl.DDI_LINE_ITEM_NUM=:ddi_line_item_num 
            order by addl.ADDI_FLD_LINE_NO
        ";
        $stmt = oci_parse($this->conn, $query);

        oci_bind_by_name($stmt, ':ddi_dd_number', $this->dd_number);
        oci_bind_by_name($stmt, ':ddi_dd_supp_code', $this->dd_supp_code);
        oci_bind_by_name($stmt, ':ddi_dd_tripord_no', $this->dd_tripord_no);
        oci_bind_by_name($stmt, ':ddi_dd_ld_type', $this->dd_ld_type);
        oci_bind_by_name($stmt, ':ddi_line_item_num', $this->ddi_line_item_num);
        
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
            from DELV_DETAILS_ITEM_ADDL_INFO 
			where 
				DDI_DD_NUMBER=:ddi_dd_number 
				and DDI_DD_SUPP_CODE=:ddi_dd_supp_code 
				and DDI_DD_TRIPORD_NO=:ddi_dd_tripord_no 
				and DDI_DD_LD_TYPE=:ddi_dd_ld_type 
				and DDI_LINE_ITEM_NUM=:ddi_line_item_num 
        ";
        $stmt = oci_parse($this->conn, $query);

        oci_bind_by_name($stmt, ':ddi_dd_number', $this->dd_number);
        oci_bind_by_name($stmt, ':ddi_dd_supp_code', $this->dd_supp_code);
        oci_bind_by_name($stmt, ':ddi_dd_tripord_no', $this->dd_tripord_no);
        oci_bind_by_name($stmt, ':ddi_dd_ld_type', $this->dd_ld_type);
        oci_bind_by_name($stmt, ':ddi_line_item_num', $this->ddi_line_item_num);
        
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
            from DELV_DETAILS_ITEM_ADDL_INFO 
			where 
				DDI_DD_NUMBER=:ddi_dd_number 
				and DDI_DD_SUPP_CODE=:ddi_dd_supp_code 
				and DDI_DD_TRIPORD_NO=:ddi_dd_tripord_no 
				and DDI_DD_LD_TYPE=:ddi_dd_ld_type 
				and DDI_LINE_ITEM_NUM=:ddi_line_item_num 
				and ADDI_FLD_LINE_NO=:addi_fld_line_no 
        ";
        $stmt = oci_parse($this->conn, $query);

        oci_bind_by_name($stmt, ':ddi_dd_number', $this->dd_number);
        oci_bind_by_name($stmt, ':ddi_dd_supp_code', $this->dd_supp_code);
        oci_bind_by_name($stmt, ':ddi_dd_tripord_no', $this->dd_tripord_no);
        oci_bind_by_name($stmt, ':ddi_dd_ld_type', $this->dd_ld_type);
        oci_bind_by_name($stmt, ':ddi_line_item_num', $this->ddi_line_item_num);
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