<?php
    header('Content-Type: application/json');
    header('Content-Type: text/html;charset=utf-8');

    include "viewTxt.php";
    
    $obj = new ViewTxt();

    // Overview 界面
    $obj->overview->title = 'Overview';

    $obj->overview->select_bayType = 'Loading Bay Type';
    $obj->overview->select_bayCode = 'Loading Bay Code';
    $obj->overview->select_baseProd = 'Base Product';

    $obj->overview->btn_expData = 'Export Data';
    $obj->overview->btn_prtScn = 'Print Screen';

    $obj->overview->lbl_esd = 'EMERGENCY SHUT DOWN';
    $obj->overview->lbl_tnkrID = 'TANKER ID';
    $obj->overview->lbl_loadID = 'LOAD ID';

    // Tanker Details 界面
    $obj->tankerDetails->title = 'Tanker Details';    

    $obj->tankerDetails->btn_prtScn = 'Print Screen';
    $obj->tankerDetails->btn_bayDetails = 'Bay Details';
    $obj->tankerDetails->btn_overview = 'BayView Overview';  

    $obj->tankerDetails->lbl_siteESD = 'SITE EMERGENCY STOP';
    $obj->tankerDetails->lbl_bayESD = 'BAY EMERGENCY STOP';
    $obj->tankerDetails->lbl_earth_overfill = 'EARTH / OVERFILL CONNECTED';
    $obj->tankerDetails->lbl_vapour = 'VAPOUR NOT CONNECTED';
    $obj->tankerDetails->lbl_loadStat = 'Load Status';  

    $obj->tankerDetails->lbl_loadDetails = 'LOAD DETAILS';
    $obj->tankerDetails->lbl_cmpyCode = 'Company Code';
    $obj->tankerDetails->lbl_loadNo = 'Load Number';
    $obj->tankerDetails->lbl_operName = 'Operator Name';
    $obj->tankerDetails->lbl_tnkrCode = 'Tanker Code';   

    $obj->tankerDetails->lbl_cmptNo = 'Cmpt No.';
    $obj->tankerDetails->lbl_preset = 'Preset';
    $obj->tankerDetails->lbl_qty_obs = 'Observed Qty';
    $obj->tankerDetails->lbl_prodName = 'Product Name';  

    $obj->tankerDetails->lbl_armNo = 'Arm Number';
    $obj->tankerDetails->lbl_temp = 'Temperature';

    // Bay Details 界面
    $obj->bayDetails->title = 'Bay Details';    

    $obj->bayDetails->btn_prtScn = 'Print Screen';
    $obj->bayDetails->btn_tnkrDetails = 'Tanker Details';
    $obj->bayDetails->btn_overview = 'BayView Overview';  

    $obj->bayDetails->lbl_siteESD = 'SITE EMERGENCY STOP';
    $obj->bayDetails->lbl_bayESD = 'BAY EMERGENCY STOP';
    $obj->bayDetails->lbl_earth_overfill = 'EARTH / OVERFILL CONNECTED';
    $obj->bayDetails->lbl_vapour = 'VAPOUR NOT CONNECTED';
    $obj->bayDetails->lbl_loadStat = 'Load Status';    

    $obj->bayDetails->lbl_loadDetails = 'LOAD DETAILS';
    $obj->bayDetails->lbl_cmpyCode = 'Company Code';
    $obj->bayDetails->lbl_loadNo = 'Load Number';
    $obj->bayDetails->lbl_operName = 'Operator Name';
    $obj->bayDetails->lbl_tnkrCode = 'Tanker Code';    

    $obj->bayDetails->lbl_tnkrDetails = 'TANKER DETAILS';
    $obj->bayDetails->lbl_armNo = 'Arm No.';
    $obj->bayDetails->lbl_cmptNo = 'Cmpt. No.';
    $obj->bayDetails->lbl_prodName = 'Product Name';

    echo json_encode($obj);
?>