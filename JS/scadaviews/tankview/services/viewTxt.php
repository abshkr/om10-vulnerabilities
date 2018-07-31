<?php
    class ViewTxt {
        /**
        * Overview 界面
        */
        public $overview;
        /**
        * Tanker Details 界面
        */
        public $tankerDetails;
        /**
        * Bay Details 界面
        */
        public $bayDetails;

        function __construct() {
            $this->overview = new Overview();
            $this->tankerDetails = new TankerDetails();
            $this->bayDetails = new BayDetails();
        }
    }

    /**
    * Overview 界面标签文本类
    */
    class Overview {
        public $title;

        public $select_bayType;
        public $select_bayCode;
        public $select_baseProd;
        
        public $btn_expData;
        public $btn_prtScn;
        
        public $lbl_esd;
        public $lbl_tnkrID;
        public $lbl_loadID;
    }

    /**
    * Tanker Details 界面标签文本类
    */
    class TankerDetails {
        public $title;
        
        public $btn_prtScn;
        public $btn_bayDetails;
        public $btn_overview;
        
        public $lbl_siteESD;
        public $lbl_bayESD;
        public $lbl_earth_overfill;
        public $lbl_vapour;
        public $lbl_loadStat;
        
        public $lbl_loadDetails;
        public $lbl_cmpyCode;
        public $lbl_loadNo;
        public $lbl_operName;
        public $lbl_tnkrCode;
        
        public $lbl_cmptNo;
        public $lbl_preset;
        public $lbl_qty_obs;
        public $lbl_prodName;
        
        public $lbl_armNo;
        public $lbl_temp;
    }

    /**
    * Bay Details 界面标签文本类
    */
    class BayDetails {
        public $title;
        
        public $btn_prtScn;
        public $btn_tnkrDetails;
        public $btn_overview;
        
        public $lbl_siteESD;
        public $lbl_bayESD;
        public $lbl_earth_overfill;
        public $lbl_vapour;
        public $lbl_loadStat;
        
        public $lbl_loadDetails;
        public $lbl_cmpyCode;
        public $lbl_loadNo;
        public $lbl_operName;
        public $lbl_tnkrCode;
        
        public $lbl_tnkrDetails;
        public $lbl_armNo;
        public $lbl_cmptNo;
        public $lbl_prodName;
    }
?>