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
        exportData:'/exportData.php'
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
    //     exportData:'/exportData.php'
    // },
    //overview界面不同发油台类型的背景颜色
    bgc:{
        truck:'#e8eddc',
        train:'#d8e5f0',
        ship:'#f9e1cf'
    },
    //实时数据刷新频率
    refreshFrequency:2000
}