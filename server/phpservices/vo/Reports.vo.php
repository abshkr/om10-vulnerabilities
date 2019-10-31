<?php

class ReportsLookup
{
    public $rpt_file;
    public $rpt_name;
    public $rpt_desc;
	public $rpt_freq;
    public $rpt_lang;
	public $jasp_file;
	public $rpt_additive;
	public $rpt_is_closeout;
	public $rpt_cmpy;
	public $rpt_enable;
	public $rpt_active;
}

class ReportsFilters
{
    public $jasp_file;
    public $filter_seq;
    public $filter_name;
    public $filter_type;
}

class ReportsCompanys
{
    public $rpt_cmpy_code;
    public $rpt_cmpy_name;
}

class CloseoutsFolios
{
	public $closeout_nr;
	public $closeout_date;
	public $prev_closeout_date;
	public $status;
	public $closeout_folio;
}