<?php
require_once(dirname(__FILE__) . '/../bootstrap.php');
require_once(dirname(__FILE__) . '/../vo/Folio.vo.php');

class FolioClass {
    public function getAllFolios(){
        $mydb = DB::getInstance();
        $sql="SELECT
        CLOSEOUT_NR,
        CLOSEOUT_DATE,
        PREV_CLOSEOUT_DATE,
        STATUS 
				
        FROM
                CLOSEOUTS
               ORDER BY CLOSEOUT_DATE DESC";
        $res = $mydb->query($sql);
        //XarrayEncodingConversion($res);
        return (prepareForAMF($res, array(0 => 'Closeouts')));       
    }
    
   
    
    /**
    * Get All Folios By Staus. 
    * A Folios (Close out can have 1 of the Following States
    * @param $folioStatus:  0: CURRENT;
                            1: FROZEN;
                            2: CLOSED;
    * For Reporting we are only interested in Closed Folios                        
    */    
    public function getAllFoliosByStatus($folioStatus=0)
    {
        $mydb = DB::getInstance();
        $sql="SELECT
        CLOSEOUT_NR,
        CLOSEOUT_DATE,
        PREV_CLOSEOUT_DATE,
        STATUS	
        FROM
        CLOSEOUTS 
        WHERE STATUS='$folioStatus'
            ORDER BY CLOSEOUT_DATE DESC";
        $res = $mydb->query($sql);
        //XarrayEncodingConversion($res);
        return (prepareForAMF($res, array(0 => 'Closeouts')));       
    }
    
    /**
    * Get All Folios By Staus. 
    * A Folios (Close out can have 1 of the Following States
    * @param $folioStatus:  0: CURRENT;
                            1: FROZEN;
                            2: CLOSED;
    * For Reporting we are only interested in Closed Folios                        
    */    
    public function getAllFoliosByDateTime($dateTime="")
    {
        if (date_time_is_valid($dateTime, false))
        {
            $dateTime = substr($dateTime, 0, 10);
            $mydb = DB::getInstance();
            $sql="SELECT
            CLOSEOUT_NR,
            CLOSEOUT_DATE,
            PREV_CLOSEOUT_DATE,
            STATUS	
            FROM
            CLOSEOUTS 
            WHERE to_char(CLOSEOUT_DATE, 'YYYY-MM-DD')='$dateTime'
                ORDER BY CLOSEOUT_DATE DESC";
            $res = $mydb->query($sql);
            //XarrayEncodingConversion($res);
            return (prepareForAMF($res, array(0 => 'Closeouts')));     
            
        }
         
    }
    
    


        
    
 

}