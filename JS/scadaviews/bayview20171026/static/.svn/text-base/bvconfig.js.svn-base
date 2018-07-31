var bayViewConfig = {
    //api接口
    apis: {
        baseProducts:'/bayview.php?func=lookupBaseProducts&category=-1&caseType=L&jsonFlag=1',
        bayTypes:'/bayview.php?func=lookupLoadingBayTypes&caseType=L&jsonFlag=1',
        bayCodes:'/bayview.php?func=lookupLoadingBayCodes&type=-1&caseType=L&jsonFlag=1',
        bayItem:'/bayview.php?func=lookupLoadingBayItemList&caseType=L&jsonFlag=1',
        bayItemRT:'/bayview.php?func=lookupLoadingBayItemList_RT&caseType=L&jsonFlag=1',
        bayList:'/bayview.php?func=lookupLoadingBayList&type=-1&caseType=L&jsonFlag=1',
        bayListRT:'/bayview.php?func=lookupLoadingBayList_RT&type=-1&caseType=L&jsonFlag=1',
        pipenodeList:'/bayview.php?func=lookupPipeNodeList&bay_code=-1&arm_code=-1&mtr_code=-1&bay_type=-1&arm_type=-1&blend_type=-1&caseType=L&jsonFlag=1',
        pipenodeListRT:'/bayview.php?func=lookupPipeNodeList_RT&bay_code=-1&arm_code=-1&mtr_code=-1&bay_type=-1&arm_type=-1&blend_type=-1&caseType=L&jsonFlag=1',
        viewtxt:'/getViewTxt.php',
        bayInterlockCfg:'/getInterlockConfig.php',
        exportData:'/exportData.php',
        userSession:'/bayviewUsers.php?func=getSessionStatus',
        userLogin:'/bayviewUsers.php?func=login'
    },
    // apis: {
    //     baseProducts:'/baseProducts?t=1',
    //     bayTypes:'/bayTypes?t=1',
    //     bayCodes:'/bayCodes?t=1',
    //     bayItem:'/bayItem?t=1',
    //     bayItemRT:'/bayItem?t=1',
    //     bayList:'/bayList?t=1',
    //     bayListRT:'/bayList?t=1',
    //     pipenodeList:'/pipenodeList?t=1',
    //     pipenodeListRT:'/pipenodeList?t=1',
    //     viewtxt:'/getViewTxt',
    //     exportData:'/exportData.php',
    //     userSession:'/getSessionStatus',
    //     userLogin:'/userLogin'
    // },
    //overview界面不同发油台类型的背景颜色
    bgc:{
        truck:'#e8eddc',
        train:'#d8e5f0',
        ship:'#f9e1cf'
    },
    //实时数据刷新频率
    refreshFrequency:2000,
    interlockCfg:[{
        "bay_code": 'BAY01',
        "bay_interlocks": [{
            'code': 'site_esd',
            'label': 'lbl_siteESD',             
            'value': 'site_esd', 
            'flag': true
        },  {
            'code': 'bay_esd',
            'label': 'lbl_bayESD',              
            'value': 'bay_esd', 
            'flag': true
        },  {
            'code': 'bay_earth_overfill_unpark',
            'label': 'lbl_earth_overfill,lbl_unparked,lbl_parked',              
            'value': 'bay_earth_overfill_unpark', 
            'flag': false
        }, {
            'code': 'bay_earth_overfill_connect',
            'label': 'lbl_earth_overfill,lbl_connected,lbl_not_connected',              
            'value': 'bay_earth_overfill_connect', 
            'flag': false
        }, {
            'code': 'bay_vapour_unpark',
            'label': 'lbl_vapour,lbl_unparked,lbl_parked',              
            'value': 'bay_vapour_unpark', 
            'flag': false
        },  {
            'code': 'bay_vapour_connect',
            'label': 'lbl_vapour,lbl_connected,lbl_not_connected',              
            'value': 'bay_vapour_connect', 
            'flag': false
        },  {
            'code': 'bay_overfill_unpark',
            'label': 'lbl_overfill,lbl_unparked,lbl_parked',                
            'value': 'bay_overfill_unpark', 
            'flag': false
        },  {
            'code': 'bay_overfill_connect',
            'label': 'lbl_overfill,lbl_connected,lbl_not_connected',                
            'value': 'bay_overfill_connect', 
            'flag': false
        },  {
            'code': 'bay_earth_unpark',
            'label': 'lbl_earth,lbl_unparked,lbl_parked',               
            'value': 'bay_earth_unpark', 
            'flag': true
        },  {
            'code': 'bay_earth_connect',
            'label': 'lbl_earth,lbl_connected,lbl_not_connected',               
            'value': 'bay_earth_connect', 
            'flag': false
        },  {
            'code': 'bay_trans_switch',
            'label': 'lbl_trans_switch',                
            'value': 'bay_trans_switch', 
            'flag': false
        },  {
            'code': 'bay_drum_in_position',
            'label': 'lbl_drum_in_position',                
            'value': 'bay_drum_in_position', 
            'flag': false
        },  {
            'code': 'bay_spear_down',
            'label': 'lbl_spear_down',              
            'value': 'bay_spear_down', 
            'flag': false
        },  {
            'code': 'bay_no_type',
            'label': 'lbl_no_type',             
            'value': 'bay_no_type', 
            'flag': false
        },  {
            'code': 'bay_deadman',
            'label': 'lbl_deadman',             
            'value': 'bay_deadman', 
            'flag': false
        },  {
            'code': 'bay_issteady',
            'label': 'lbl_issteady',                
            'value': 'bay_issteady', 
            'flag': false
        },  {
            'code': 'bay_overfill',
            'label': 'lbl_overfill,lbl_connected,lbl_not_connected',                
            'value': 'bay_overfill', 
            'flag': false
        },  {
            'code': 'bay_earth',
            'label': 'lbl_earth,lbl_connected,lbl_not_connected',               
            'value': 'bay_earth', 
            'flag': true
        },  {
            'code': 'bay_vapour',
            'label': 'lbl_vapour,lbl_connected,lbl_not_connected',              
            'value': 'bay_vapour', 
            'flag': true
        }]
    }, {
        "bay_code": 'BAY02',
        "bay_interlocks": [{
            'code': 'site_esd',
            'label': 'lbl_siteESD',             
            'value': 'site_esd', 
            'flag': true
        },  {
            'code': 'bay_esd',
            'label': 'lbl_bayESD',              
            'value': 'bay_esd', 
            'flag': true
        },  {
            'code': 'bay_earth_overfill_unpark',
            'label': 'lbl_earth_overfill,lbl_unparked,lbl_parked',              
            'value': 'bay_earth_overfill_unpark', 
            'flag': false
        }, {
            'code': 'bay_earth_overfill_connect',
            'label': 'lbl_earth_overfill,lbl_connected,lbl_not_connected',              
            'value': 'bay_earth_overfill_connect', 
            'flag': false
        }, {
            'code': 'bay_vapour_unpark',
            'label': 'lbl_vapour,lbl_unparked,lbl_parked',              
            'value': 'bay_vapour_unpark', 
            'flag': false
        },  {
            'code': 'bay_vapour_connect',
            'label': 'lbl_vapour,lbl_connected,lbl_not_connected',              
            'value': 'bay_vapour_connect', 
            'flag': false
        },  {
            'code': 'bay_overfill_unpark',
            'label': 'lbl_overfill,lbl_unparked,lbl_parked',                
            'value': 'bay_overfill_unpark', 
            'flag': false
        },  {
            'code': 'bay_overfill_connect',
            'label': 'lbl_overfill,lbl_connected,lbl_not_connected',                
            'value': 'bay_overfill_connect', 
            'flag': false
        },  {
            'code': 'bay_earth_unpark',
            'label': 'lbl_earth,lbl_unparked,lbl_parked',               
            'value': 'bay_earth_unpark', 
            'flag': true
        },  {
            'code': 'bay_earth_connect',
            'label': 'lbl_earth,lbl_connected,lbl_not_connected',               
            'value': 'bay_earth_connect', 
            'flag': false
        },  {
            'code': 'bay_trans_switch',
            'label': 'lbl_trans_switch',                
            'value': 'bay_trans_switch', 
            'flag': false
        },  {
            'code': 'bay_drum_in_position',
            'label': 'lbl_drum_in_position',                
            'value': 'bay_drum_in_position', 
            'flag': false
        },  {
            'code': 'bay_spear_down',
            'label': 'lbl_spear_down',              
            'value': 'bay_spear_down', 
            'flag': false
        },  {
            'code': 'bay_no_type',
            'label': 'lbl_no_type',             
            'value': 'bay_no_type', 
            'flag': false
        },  {
            'code': 'bay_deadman',
            'label': 'lbl_deadman',             
            'value': 'bay_deadman', 
            'flag': false
        },  {
            'code': 'bay_issteady',
            'label': 'lbl_issteady',                
            'value': 'bay_issteady', 
            'flag': false
        },  {
            'code': 'bay_overfill',
            'label': 'lbl_overfill,lbl_connected,lbl_not_connected',                
            'value': 'bay_overfill', 
            'flag': false
        },  {
            'code': 'bay_earth',
            'label': 'lbl_earth,lbl_connected,lbl_not_connected',               
            'value': 'bay_earth', 
            'flag': true
        },  {
            'code': 'bay_vapour',
            'label': 'lbl_vapour,lbl_connected,lbl_not_connected',              
            'value': 'bay_vapour', 
            'flag': true
        }]
    }]
}