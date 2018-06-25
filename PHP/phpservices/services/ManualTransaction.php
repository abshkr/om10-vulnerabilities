<?php

/* Wei Cao 09/04/2013 initial

 Manual transaction. 
*/

require_once(dirname(__FILE__) . '/../bootstrap.php');
require_once(dirname(__FILE__) . '/../vo/ManualTransaction.vo.php');

/* define the module name for calling logMe() to output */
if(!defined('Manual_TRANSACTION')) define('Manual_TRANSACTION', 'Manual_trans.class');

main();

class XPD 
{
    public $is_base_product;
    public $drawer_code;
    public $product_code;
}

class XASM
{
    public $amb_vol;
    public $cor_vol;
    public $liq_kg;
}

class XPC 
{
    public $prod_class;
    public $dens;
    public $mass_fract;
    public $exp_coeff;
}

class XTEMPS 
{
    public $Temperature;
    public $Average_Temperature;
}

class XQTY 
{
    public $pd;
    public $prod_class;
    public $temps;
    public $asmx;
}

class XCMPT 
{
    public $eqp_cd;
    public $nr_in_eqp;
    public $nr_in_tkr;
    public $Volume_Safe_Fill_Limit;
    public $Mass_Limit;
    public $Volume_Capacity;

    public $prod_def;                   /* scheduled product */
    public $asmx;                      /* scheduled qty */

    public $Nr_of_Drums_Specified;         /* scheduled no of drums */

    public $prod_class1;                /* sched prop for unloading */
    public $hybrid_loading;         /* hybrid loading 11-05-2011*/

    /* Added for weighbridge loading, filled by RTC, non-weighbridge */
    /* loading might not fill it. */
    public $prod_def2;
	
    /* Also used for weighbridge loading using RTC.	*/
    /* When weighbridge, it is qty in compartment. It is returns */
    /* only at weigh-in. */
    public $asm2; 

    public $prod_class2;		/* preloaded ..	prod class	*/
    public $temps1;		/* ...		temperature	*/
    public $asm3;			/* ...		qty		*/
    public $NrBases1;		/* ...				*/
    public $qty1;			/* .. preloaded	base qtys	*/

    public $Nr_of_Preloaded_Drums;

    public $prod_class3;		/* loaded ...	prod class	*/
    public $temps2;		/* ...		temperature	*/
    public $asm4;			/* ...		qty		*/
    public $NrBases2;		/* ...				*/
    public $qty2;			/* ... loaded	base qtys	*/
	public $prod_class4;		/* loaded ...	prod class	*/
    public $temps3;		/* ...		temperature	*/
    public $asm5;			/* ...		qty		*/
    public $NrBases3;		/* ...				*/
	public $qty3;			/* ... loaded	base qtys	*/
	public $Nr_of_Loaded_Drums;
    public $Prompt_Flags;
}

class XPROD 
{
    public $is_base_product;
    public $drawer_code;
    public $product_code;
    
    public $prod_class;
    public $dens;
    public $mass_fract;
    public $exp_coeff;
    public $pub_tempe;    /* published temperature. 11-05-2011*/
    
    public $amb_vol;
    public $cor_vol;
    public $liq_kg;
}

class XMTR_DET 
{
    public $Injector_or_Meter;
    public $Meter_Injector_Code;

    public $pd;
    public $prod_class;

    public $temps;

    public $asmx;
    public $asm2;
    public $asm3;
	public $Start_Mass;
	public $End_Mass;
}

class XBASE 
{
    public $Tank_Code;

    public $pd;
    public $prod_class;

    public $temps;

    public $asmx;
}

class XTRF_DET  /* transfer details */
{                  
    public $Transfer_Number;
    public $Arm_Code;
    public $Device_Code;
    public $eqp_cd;
    public $nr_in_eqp;
    public $nr_in_tkr;

    public $pdx;
    public $pdy;
    public $asmx;

    public $Nr_of_Drums;

    public $prod_class;
    public $temps;
    public $asm2;
	public $prod_class1;
    public $temps2;
    public $asm3;
	public $Number_of_Meters;
    public $mtr_det;

    public $Number_of_Bases;
    public $base;

    public $Start_Mass;
    public $End_Mass;
	public $Was_Anything_Recycled;
}

class XREVERSE_REQ
{
    public $Message_Length;
    public $message_number;
    public $Source_system_device;
    public $Source_device_flags;
    public $Source_id_number;
    public $Dest_system_device;
    public $Dest_id_number;
    public $Message_Type;
    public $Message_Version;
    public $Number_of_Trsa;
    public $trsa_ids;
    
    public function to_string()
    {
        $msg_string = $this->message_number . $this->Source_system_device . $this->Source_device_flags . $this->Source_id_number .
            $this->Dest_system_device . $this->Dest_id_number . $this->Message_Type . $this->Message_Version . $this->Number_of_Trsa . 
            $this->trsa_ids . "|";
        
        $this->Message_Length = sprintf("%06d", strlen($msg_string) + 6);
        $msg_string = $this->Message_Length . $msg_string;
    
        return $msg_string;
    }
}

class XAUTH_REQ
{
    public $Message_Length;
    public $message_number;
    public $Source_system_device;
    public $Source_device_flags;
    public $Source_id_number;
    public $Dest_system_device;
    public $Dest_id_number;
    public $Message_Type;
    public $Message_Version;
    public $Transaction_num;
    public $Trip_number;
    public $Number_of_keys;
	public $Load_type;
    public $complete_pre_load;
    
    public function to_string()
    {
        $msg_string = $this->message_number . $this->Source_system_device . $this->Source_device_flags . $this->Source_id_number .
            $this->Dest_system_device . $this->Dest_id_number . $this->Message_Type . $this->Message_Version . $this->Transaction_num .
            $this->Trip_number . $this->Number_of_keys . $this->Load_type . $this->complete_pre_load . "|";
        
        $this->Message_Length = sprintf("%06d", strlen($msg_string) + 6);
        $msg_string = $this->Message_Length . $msg_string;
    
        return $msg_string;
    }
}

class XTRANSAC_DET 
{
    public $Message_Length;
    public $message_number;
    public $Source_system_device;
    public $Source_device_flags;
    public $Source_id_number;
    public $Dest_system_device;
    public $Dest_id_number;
    public $Message_Type;
    public $Message_Version;

    public $Bay_Code;
    public $Transaction_Number;
    public $Standalone_Mode;
    public $Load_Number;

    public $Number_of_keys;
    public $keys;
	public $load_unload;
	public $end_load_on_WB;
	public $prompt_eqp_on_WB;
	public $Load_Type;
    public $Reject_Reason;
    public $Transaction_State;
    public $Start_Time;
    public $Finish_Time;
    public $Release_Time;
    public $Operator_Code;
    public $Operator_Name;
    public $Drawer_Code;
    public $Drawer_Name;
    public $Tanker_Code;
    public $Safe_Tanker_Mass;
    public $Tare_Tanker_Mass;
    public $Tanker_Prompt;
    public $Drawer_Prompt_Flags;

    public $Number_of_Products;
    public $prod_det;

    public $Number_of_Compartments;
    public $cmpt_det;

    public $Number_of_Transfers;
    public $trf_det;

    public $Number_of_Meters;
    public $mtr_det;
    
	public $Number_of_Equipments;
	public $eqp_wb_det;
    public $start_weight;
	public $end_weight;
    public $complete_cur_load;
    
    public function to_string()
    {
        $msg_string = $this->message_number . $this->Source_system_device . $this->Source_device_flags . $this->Source_id_number .
            $this->Dest_system_device . $this->Dest_id_number . $this->Message_Type . $this->Message_Version . $this->Bay_Code . $this->Transaction_Number .
            $this->Standalone_Mode . $this->Load_Number . $this->Number_of_keys . $this->load_unload . $this->end_load_on_WB . $this->prompt_eqp_on_WB . 
            $this->Load_Type . $this->Reject_Reason . $this->Transaction_State . $this->Start_Time . $this->Finish_Time . $this->Release_Time . $this->Operator_Code .
            $this->Operator_Name . $this->Drawer_Code . $this->Drawer_Name . $this->Tanker_Code . $this->Safe_Tanker_Mass . $this->Tare_Tanker_Mass . 
            $this->Tanker_Prompt . $this->Drawer_Prompt_Flags;
        
        $msg_string = $msg_string. $this->Number_of_Products;
        for ($i = 0; $i < $this->Number_of_Products; ++ $i)
        {
            $msg_string = $msg_string . $this->prod_det[$i]->is_base_product . $this->prod_det[$i]->drawer_code . $this->prod_det[$i]->product_code .
                $this->prod_det[$i]->prod_class . $this->prod_det[$i]->dens . $this->prod_det[$i]->mass_fract . $this->prod_det[$i]->exp_coeff .
                $tihs->prod_det[$i]->pub_tempe = "      " . $this->prod_det[$i]->amb_vol . $this->prod_det[$i]->cor_vol . $this->prod_det[$i]->liq_kg;    
        }
            
        $msg_string = $msg_string . $this->Number_of_Compartments;
        for ($i = 0; $i < $this->Number_of_Compartments; ++ $i)
        {
            $msg_string = $msg_string . $this->cmpt_det[$i]->eqp_cd . $this->cmpt_det[$i]->nr_in_eqp . $this->cmpt_det[$i]->nr_in_tkr . $this->cmpt_det[$i]->Volume_Safe_Fill_Limit .
                $this->cmpt_det[$i]->Mass_Limit . $this->cmpt_det[$i]->Volume_Capacity . $this->cmpt_det[$i]->prod_def->is_base_product . $this->cmpt_det[$i]->prod_def->drawer_code . 
                $this->cmpt_det[$i]->prod_def->product_code . $this->cmpt_det[$i]->asmx->amb_vol . $this->cmpt_det[$i]->asmx->cor_vol . $this->cmpt_det[$i]->asmx->liq_kg .
                $this->cmpt_det[$i]->Nr_of_Drums_Specified . $this->cmpt_det[$i]->prod_class1->prod_class . $this->cmpt_det[$i]->prod_class1->dens .
                $this->cmpt_det[$i]->prod_class1->mass_fract . $this->cmpt_det[$i]->prod_class1->exp_coeff . $this->cmpt_det[$i]->hybrid_loading .
                $this->cmpt_det[$i]->prod_def2->is_base_product . $this->cmpt_det[$i]->prod_def2->drawer_code . $this->cmpt_det[$i]->prod_def2->product_code .
                $this->cmpt_det[$i]->asm2->amb_vol . $this->cmpt_det[$i]->asm2->cor_vol . $this->cmpt_det[$i]->asm2->liq_kg . $this->cmpt_det[$i]->prod_class2->prod_class .
                $this->cmpt_det[$i]->prod_class2->dens . $this->cmpt_det[$i]->prod_class2->mass_fract . $this->cmpt_det[$i]->prod_class2->exp_coeff .
                $this->cmpt_det[$i]->temps1->Temperature . $this->cmpt_det[$i]->temps1->Average_Temperature . $this->cmpt_det[$i]->asm3->amb_vol .
                $this->cmpt_det[$i]->asm3->cor_vol . $this->cmpt_det[$i]->asm3->liq_kg . $this->cmpt_det[$i]->NrBases1 . $this->cmpt_det[$i]->Nr_of_Preloaded_Drums .
                $this->cmpt_det[$i]->prod_class3->prod_class . $this->cmpt_det[$i]->prod_class3->dens . $this->cmpt_det[$i]->prod_class3->mass_fract . 
                $this->cmpt_det[$i]->prod_class3->exp_coeff . $this->cmpt_det[$i]->temps2->Temperature . $this->cmpt_det[$i]->temps2->Average_Temperature .
                $this->cmpt_det[$i]->asm4->amb_vol . $this->cmpt_det[$i]->asm4->cor_vol . $this->cmpt_det[$i]->asm4->liq_kg;
                
            $msg_string = $msg_string . $this->cmpt_det[$i]->NrBases2;
            for ($j = 0; $j < $this->cmpt_det[$i]->NrBases2; ++$j)
            {
                $msg_string = $msg_string . $this->cmpt_det[$i]->qty2[$j]->pd->is_base_product . $this->cmpt_det[$i]->qty2[$j]->pd->drawer_code . $this->cmpt_det[$i]->qty2[$j]->pd->product_code .
                    $this->cmpt_det[$i]->qty2[$j]->prod_class->prod_class . $this->cmpt_det[$i]->qty2[$j]->prod_class->dens . $this->cmpt_det[$i]->qty2[$j]->prod_class->mass_fract .
                    $this->cmpt_det[$i]->qty2[$j]->prod_class->exp_coeff . $this->cmpt_det[$i]->qty2[$j]->temps->Temperature . $this->cmpt_det[$i]->qty2[$j]->temps->Average_Temperature .
                    $this->cmpt_det[$i]->qty2[$j]->asmx->amb_vol . $this->cmpt_det[$i]->qty2[$j]->asmx->cor_vol . $this->cmpt_det[$i]->qty2[$j]->asmx->liq_kg;
            }
            
            $msg_string = $msg_string . $this->cmpt_det[$i]->prod_class4->prod_class . $this->cmpt_det[$i]->prod_class4->dens . $this->cmpt_det[$i]->prod_class4->mass_fract . 
                $this->cmpt_det[$i]->prod_class4->exp_coeff . $this->cmpt_det[$i]->temps3->Temperature . $this->cmpt_det[$i]->temps3->Average_Temperature . 
                $this->cmpt_det[$i]->asm5->amb_vol . $this->cmpt_det[$i]->asm5->cor_vol . $this->cmpt_det[$i]->asm5->liq_kg . $this->cmpt_det[$i]->NrBases3 .
                $this->cmpt_det[$i]->Nr_of_Loaded_Drums = "00000" . $this->cmpt_det[$i]->Prompt_Flags;
        }
        
        $msg_string = $msg_string . $this->Number_of_Transfers;
        for ($i = 0; $i < $this->Number_of_Transfers; ++$i)
        {
            $msg_string = $msg_string . $this->trf_det[$i]->Transfer_Number . $this->trf_det[$i]->Arm_Code . $this->trf_det[$i]->Device_Code . $this->trf_det[$i]->eqp_cd .
                $this->trf_det[$i]->nr_in_eqp . $this->trf_det[$i]->nr_in_tkr . $this->trf_det[$i]->pdx->is_base_product . $this->trf_det[$i]->pdx->drawer_code .
                $this->trf_det[$i]->pdx->product_code . $this->trf_det[$i]->pdy->is_base_product . $this->trf_det[$i]->pdy->drawer_code . $this->trf_det[$i]->pdy->product_code .
                $this->trf_det[$i]->asmx->amb_vol . $this->trf_det[$i]->asmx->cor_vol . $this->trf_det[$i]->asmx->liq_kg . $this->trf_det[$i]->Nr_of_Drums .
                $this->trf_det[$i]->prod_class->prod_class . $this->trf_det[$i]->prod_class->dens . $this->trf_det[$i]->prod_class->mass_fract . $this->trf_det[$i]->prod_class->exp_coeff .
                $this->trf_det[$i]->temps->Temperature . $this->trf_det[$i]->temps->Average_Temperature . $this->trf_det[$i]->asm2->amb_vol . $this->trf_det[$i]->asm2->cor_vol . 
                $this->trf_det[$i]->asm2->liq_kg . $this->trf_det[$i]->prod_class1->prod_class . $this->trf_det[$i]->prod_class1->dens . $this->trf_det[$i]->prod_class1->prod_class .
                $this->trf_det[$i]->prod_class1->prod_class . $this->trf_det[$i]->temps2->Temperature . $this->trf_det[$i]->temps2->Average_Temperature . $this->trf_det[$i]->asm3->amb_vol .
                $this->trf_det[$i]->asm3->cor_vol . $this->trf_det[$i]->asm3->liq_kg;
                
            $msg_string = $msg_string . $this->trf_det[$i]->Number_of_Meters;
            for ($j = 0; $j < $this->trf_det[$i]->Number_of_Meters; ++$j)
            {
                $msg_string = $msg_string . $this->trf_det[$i]->mtr_det[$j]->Injector_or_Meter . $this->trf_det[$i]->mtr_det[$j]->Meter_Injector_Code .
                    $this->trf_det[$i]->mtr_det[$j]->pd->is_base_product . $this->trf_det[$i]->mtr_det[$j]->pd->drawer_code . $this->trf_det[$i]->mtr_det[$j]->pd->product_code .
                    $this->trf_det[$i]->mtr_det[$j]->prod_class->prod_class . $this->trf_det[$i]->mtr_det[$j]->prod_class->dens . $this->trf_det[$i]->mtr_det[$j]->prod_class->mass_fract .
                    $this->trf_det[$i]->mtr_det[$j]->prod_class->exp_coeff . $this->trf_det[$i]->mtr_det[$j]->temps->Temperature . $this->trf_det[$i]->mtr_det[$j]->temps->Average_Temperature .
                    $this->trf_det[$i]->mtr_det[$j]->asmx->amb_vol . $this->trf_det[$i]->mtr_det[$j]->asmx->cor_vol . $this->trf_det[$i]->mtr_det[$j]->asmx->liq_kg .
                    $this->trf_det[$i]->mtr_det[$j]->asm2->amb_vol . $this->trf_det[$i]->mtr_det[$j]->asm2->cor_vol . $this->trf_det[$i]->mtr_det[$j]->asm2->liq_kg .
                    $this->trf_det[$i]->mtr_det[$j]->asm3->amb_vol . $this->trf_det[$i]->mtr_det[$j]->asm3->amb_vol . $this->trf_det[$i]->mtr_det[$j]->asm3->liq_kg .
                    $this->trf_det[$i]->mtr_det[$j]->Start_Mass . $this->trf_det[$i]->mtr_det[$j]->End_Mass;
            }
        
            $msg_string = $msg_string . $this->trf_det[$i]->Number_of_Bases;
            for ($j = 0; $j < $this->trf_det[$i]->Number_of_Bases; ++$j)
            {
                $msg_string = $msg_string . $this->trf_det[$i]->base[$j]->Tank_Code . $this->trf_det[$i]->base[$j]->pd->is_base_product . $this->trf_det[$i]->base[$j]->pd->drawer_code .
                    $this->trf_det[$i]->base[$j]->pd->product_code . $this->trf_det[$i]->base[$j]->prod_class->prod_class . $this->trf_det[$i]->base[$j]->prod_class->dens .
                    $this->trf_det[$i]->base[$j]->prod_class->mass_fract . $this->trf_det[$i]->base[$j]->prod_class->exp_coeff . $this->trf_det[$i]->base[$j]->temps->Temperature .
                    $this->trf_det[$i]->base[$j]->temps->Average_Temperature . $this->trf_det[$i]->base[$j]->asmx->amb_vol . $this->trf_det[$i]->base[$j]->asmx->cor_vol .
                    $this->trf_det[$i]->base[$j]->asmx->liq_kg;
            }
        
            $msg_string = $msg_string . $this->trf_det[$i]->Start_Mass . $this->trf_det[$i]->End_Mass . $this->trf_det[$i]->Was_Anything_Recycled;
        }
        
        $msg_string = $msg_string . $this->Number_of_Meters;
        for ($i = 0; $i < $this->Number_of_Meters; ++$i)
        {
            $msg_string = $msg_string . $this->mtr_det[$i]->Injector_or_Meter . $this->mtr_det[$i]->Meter_Injector_Code . $this->mtr_det[$i]->pd->is_base_product .
                $this->mtr_det[$i]->pd->drawer_code . $this->mtr_det[$i]->pd->product_code . $this->mtr_det[$i]->prod_class->prod_class . $this->mtr_det[$i]->prod_class->dens .
                $this->mtr_det[$i]->prod_class->mass_fract . $this->mtr_det[$i]->prod_class->exp_coeff . $this->mtr_det[$i]->temps->Temperature .
                $this->mtr_det[$i]->temps->Average_Temperature . $this->mtr_det[$i]->asmx->amb_vol . $this->mtr_det[$i]->asmx->cor_vol . $this->mtr_det[$i]->asmx->liq_kg .
                $this->mtr_det[$i]->asm2->amb_vol . $this->mtr_det[$i]->asm2->cor_vol . $this->mtr_det[$i]->asm2->liq_kg . $this->mtr_det[$i]->asm3->amb_vol . 
                $this->mtr_det[$i]->asm3->amb_vol . $this->mtr_det[$i]->asm3->liq_kg . $this->mtr_det[$i]->Start_Mass . $this->mtr_det[$i]->End_Mass;
        }
    
        $msg_string = $msg_string . $this->Number_of_Equipments . $this->start_weight . $this->end_weight . $this->complete_cur_load . "|";
        $this->Message_Length = sprintf("%06d", strlen($msg_string) + 6);
        $msg_string = $this->Message_Length . $msg_string;
    
        return $msg_string;
    }
}

class TRSAN_REPLY 
{
    public $Message_Length;
    public $message_number;
    public $Source_system_device;
    public $Source_device_flags;
    public $Source_id_number;
    public $Dest_system_device;
    public $Dest_id_number;
    public $Message_Type;
    public $Message_Version;
    public $Result_Code;
    public $Transaction_Number;
    public $Transfer_Number;      /* only for transfer rel */
}

class Transfer_Product
{
    public $drawer_code;
    public $product_code;
}

class Transfer_Compartment
{
    public $eqp_cd;
    public $nr_in_eqp;
    public $nr_in_tkr;
    
    public $sched_is_base;
    public $sched_drawer_code;
    public $sched_prod_code;
    
    public $preload_amb_vol;
    public $preload_cor_vol;
    public $preload_liq_kg;
}
    
class socket_client
{
    private $fp;
    private $respond;
    
    function __construct($bay = "BAY999" /*By default, use BAY999 as the manual transaction server bay */)
    {
        $this->open_socket_client($bay);
    }
    
    function __destruct()
    {
        $this->close_socket_client();
    }
    
    private function open_socket_client($bay)
    {
        $db_conn = DB::getInstance();
        $sql = "SELECT BA_INSTANCE, BA_CHANNEL FROM BAY_AREA WHERE BA_CODE = '" . $bay . "'";
        $result = $db_conn->query($sql);
        $service = sprintf("BAY_%02d_%02d", $result[0]->BA_INSTANCE, $result[0]->BA_CHANNEL);
        
        $host = gethostname();
        $port = getservbyname($service, 'tcp');
        
        $timeout = 30;
        $this->fp = fsockopen($host, $port, $errnum, $errstr, $timeout);
        logMe("Try to connect to server. host:" . $host . ", port:" . $port, Manual_TRANSACTION);
        if (!$this->fp)
        {
            logMe("Failed to connect to server. errnum:" . $errnum . ", errstr:" . $errstr, Manual_TRANSACTION);
        } 
    }
    
    private function close_socket_client()
    {
        if ($this->fp)
            fclose($this->fp);
    }
    
    function send($str)
    {
        if (!$this->fp)
            return;
        
        fwrite($this->fp, $str);
        
        $this->respond = "";
        $BUF_SIZE = 4096;
        while (!feof($this->fp))
        {   
            $reads = fread($this->fp, $BUF_SIZE);
            $this->respond = $this->respond . $reads;
            if (strlen($reads) < $BUF_SIZE)
                break;
        }
    }
    
    function get_repond()
    {
        return $this->respond;
    }
}

class ManualTransaction
{
    private $db_conn;
    private $bay_code;      //Which bay this client connects to
    private $trns_id;       //Transaction ID
    
    function __construct($BAY = "BAY02")
    {
        $this->bay_code = $BAY;
        $this->db_conn = DB::getInstance();
        
        $sql = "SELECT BA_LAST_TRNO FROM BAY_AREA WHERE BA_CODE = '" . $this->bay_code . "'";
        $result = $this->db_conn->query($sql);
        $this->trns_id = $result[0]->BA_LAST_TRNO + 1;
    }
    
    function __destruct()
    {
        
    }
    
    private function populate_personkey_info($operator)
    {
        $sql = "SELECT KYA_TXT FROM ACCESS_KEYS WHERE KYA_PSN = '" . $operator . "'";
        $result = $this->db_conn->query($sql);
        $result[0]->KYA_TXT;
        
        $auth_key = sprintf("%-'-40s", $result[0]->KYA_TXT);
        return $auth_key . "PERSONNEL ACC TYPE   TOUCH_BUTTON_DEV";
    }
    
    private function populate_tankerkey_info($tanker_code)
    {
        $sql = "SELECT KYA_TXT FROM ACCESS_KEYS WHERE KYA_TANKER = '" . $tanker_code . "'";
        $result = $this->db_conn->query($sql);
        $result[0]->KYA_TXT;
        
        $auth_key = sprintf("%-'-40s", $result[0]->KYA_TXT);
        return $auth_key . "EQUIP ACC ACC TYPE   TOUCH_BUTTON_DEV";
    }
    
    private function get_operator_name($operator_code)
    {
        $sql = "SELECT USER_USERNAME FROM URBAC_USERS WHERE USER_CODE = '" . $operator_code . "'";
        $result = $this->db_conn->query($sql);
        return $result[0]->USER_USERNAME;
    }
    
    private function get_equpment_info($tanker, $nr_in_tkr, &$eqp_code, &$nr_in_eqp)
    {
        $sql = "SELECT TC_EQPT FROM TNKR_EQUIP WHERE TC_TANKER = '" . $tanker . "' ORDER BY TC_SEQNO";
        $result = $this->db_conn->query($sql);
        $eqp_count = count($result);
        $tank_compartment = 0;
        for ($i = 0; $i < $eqp_count; ++ $i)
        {
            $temp = $result[$i]->TC_EQPT;
            $sql = "SELECT ETYP_N_ITEMS FROM EQUIP_TYPES WHERE ETYP_ID = (SELECT EQPT_ETP FROM TRANSP_EQUIP WHERE EQPT_ID = " . $temp . ")";
            $result2 = $this->db_conn->query($sql);
            $eqp_compartment = $result2[0]->ETYP_N_ITEMS;
            
            if ($nr_in_tkr > $tank_compartment && $nr_in_tkr <= $tank_compartment + $eqp_compartment)
            {
                $sql = "SELECT EQPT_CODE FROM TRANSP_EQUIP WHERE EQPT_ID = '" . $temp . "'";
                $result3 = $this->db_conn->query($sql);
                $eqp_code = $result3[0]->EQPT_CODE;
                $nr_in_eqp =  $nr_in_tkr - $tank_compartment;
            }
            $tank_compartment += $eqp_compartment;
        }
    }
    
    /* As this funciton is called during transaction detail message handling, at that timepoint, 
    schedule table should have been prepared */
    private function get_trip_by_order($order_number)
    {
        $sql = "SELECT SHLS_TRIP_NO FROM SCHEDULE, ORD_SCHEDULE, CUST_ORDER WHERE STATS = 'L' 
            AND SHLS_TRIP_NO = OS_SHL_SHLSTRIP AND SHLS_SUPP = OS_SHL_SHLSSUPP AND OS_ORDER_NO = ORDER_NO AND ORDER_CUST_ORDNO = " . $order_number;
        $result = $this->db_conn->query($sql);
        return $result[0]->SHLS_TRIP_NO;
    }
    
    /* Get all the info about trip. Because manual trasaction only run on existent trip, so we dont need caller to prepare all the info, we can retrieve
    the info we need */
    private function init_trip($trip_number, $supplier, $num_of_transfers, $transfers, &$drawer_Code, &$drawer_name, &$tanker_code, &$num_of_Prod, &$prods, &$num_of_comp, &$compartments)
    {
        $sql = "SELECT SHLS_DRAWER, SHL_TANKER FROM SCHEDULE WHERE SHLS_SUPP = '" . $supplier . "' AND SHLS_TRIP_NO = " . $trip_number;
        $result = $this->db_conn->query($sql);
        $drawer_Code = $result[0]->SHLS_DRAWER;
        $tanker_code = $result[0]->SHL_TANKER;
        
        $sql = "SELECT CMPY_NAME FROM COMPANYS WHERE CMPY_CODE = '" . $drawer_Code . "'";
        $result = $this->db_conn->query($sql);
        $drawer_name = $result[0]->CMPY_NAME;
        
        $sql = "SELECT SCHPPROD_PRODCODE, SCHPPROD_PRODCMPY FROM SPECPROD WHERE SCHPSPID_SHLSSUPP = '" . $supplier . "' AND SCHPSPID_SHLSTRIP = " . $trip_number;
        $result = $this->db_conn->query($sql);
        $num_of_Prod = count($result);
        for ($i = 0; $i < $num_of_Prod; ++ $i)
        {
            $prods[$i] = new Transfer_Product();
            $prods[$i]->drawer_code = $result[$i]->SCHPPROD_PRODCMPY;
            $prods[$i]->product_code = $result[$i]->SCHPPROD_PRODCODE;
        }
        
        $sql = "SELECT SUM(ETYP_N_ITEMS) EQUIP_COUNT FROM EQUIP_TYPES WHERE ETYP_ID IN (SELECT EQPT_ETP FROM TRANSP_EQUIP WHERE EQPT_ID IN (SELECT TC_EQPT FROM TNKR_EQUIP WHERE TC_TANKER = '" . $tanker_code . "'))";
        $result = $this->db_conn->query($sql);
        $num_of_comp = $result[0]->EQUIP_COUNT;
        for ($i = 0; $i < $num_of_comp; ++ $i)
        {
            $compartments[$i] = new Transfer_Compartment();
            $this->get_equpment_info($tanker_code, $i, $eqp_code, $nr_in_eqp);
            $compartments[$i]->eqp_cd = $eqp_code;
            $compartments[$i]->nr_in_eqp = $nr_in_eqp;
            $compartments[$i]->nr_in_tkr = $i + 1;
            
            //$compartments[$i]->sched_drawer_code = $result[$i]->SCHDPROD_PRODCMPY;
            //$compartments[$i]->sched_prod_code = $result[$i]->SCHDPROD_PRODCODE;
            /* $msg->trf_det[$i]->pdx already invloves product info. Calculate here to make the caller easier */
            for ($j = 0; $j < $num_of_transfers; ++ $j)
            {
                if ($transfers[$j]->nr_in_tkr == $i + 1)
                {
                    $compartments[$i]->sched_drawer_code = $transfers[$j]->drawer_code;
                    $compartments[$i]->sched_prod_code = $transfers[$j]->product_code;
                    break;
                }
            }
            
            $compartments[$i]->preload_amb_vol = "000000000000";
            $compartments[$i]->preload_cor_vol = "000000000000";
            $compartments[$i]->preload_liq_kg = "000000000000";
        }
    }
   
    /* Reverse a transaction is to create a new transaction whose transfers and tranbases are negative to the current one; 
    we can reuse auth request message with a new message type */
    private function populate_reverse_det($num_of_trans, $trns_ids)
    {
        $msg = new XREVERSE_REQ(); 
        $msg->Message_Length = "000000";                        /* Auto-calculate at the end of population */
        $msg->message_number = "0000";                          /* Fixed */
        $msg->Source_system_device = "MANUAL_SYS    ";          /* Fixed */
        $msg->Source_device_flags = "0000";                     /* Fixed */
        $msg->Source_id_number = "   ";                         /* Fixed */
        $msg->Dest_system_device = "BAI_999       ";            /* Fixed */
        $msg->Dest_id_number = "   ";                           /* Fixed */
        $msg->Message_Type = "MANUAL_REVERSE_TRNS";             /* Fixed */
        $msg->Message_Version = "01.00.00";                     /* Fixed */
        $msg->Number_of_Trsa = sprintf("%03d", $num_of_trans);
        for ($i = 0; $i < $num_of_trans; ++ $i)
        {
            $msg->trsa_ids = $msg->trsa_ids . sprintf("%07d", $trns_ids[$i]);
        }
        
        return $msg->to_string();
    }
    
    private function populate_auth_req($number_entered, $trans)
    {
        //Open order sample
        //0002500000OBP_SYS       0000   BAI_SYS          OBP_AUTH_REQ       01.05.000010021000008707002000000D0B533----------------------------PERSONNEL ACC TYPE   TOUCH_BUTTON_DEV000000D0AE5C----------------------------EQUIP ACC ACC TYPE   TOUCH_BUTTON_DEVT|
        $msg = new XAUTH_REQ(); 
        $msg->Message_Length = "000000";                        /* Auto-calculate at the end of population */
        $msg->message_number = "0000";                          /* Fixed */
        $msg->Source_system_device = "MANUAL_SYS    ";          /* Fixed */
        $msg->Source_device_flags = "0000";                     /* Fixed */
        $msg->Source_id_number = "   ";                         /* Fixed */
        $msg->Dest_system_device = "BAI_999       ";            /* Fixed */
        $msg->Dest_id_number = "   ";                           /* Fixed */
        $msg->Message_Type = "OBP_AUTH_REQ       ";             /* Fixed */
        $msg->Message_Version = "01.00.00";                     /* Fixed */
        $msg->Transaction_num = sprintf("%07d", $this->trns_id);      
        $msg->Trip_number = sprintf("%09d", $number_entered);   /* Fixed */
        /* Because in baiman, open order needs tanker card and person card in get_auth() info to create schedule */
        $msg->Number_of_keys = "002" . $this->populate_personkey_info($trans->Operator_Code) . $this->populate_tankerkey_info($trans->Tanker_Code);
        $msg->Load_type = "T";                                  /* Fixed */
        $msg->complete_pre_load = "F";                          /* Fixed */
        
        return $msg->to_string();
    }
    
    private function populate_transa_det($order_number, $para_trans, $num_of_transfers, $transfers)
    {
        //Sample:
        //0039700000OBP_SYS       0000   BAI_SYS          OBP_TRNSCTN_DETS   01.05.00BAY01           0010007OMEGA 437317501002000000D0B533----------------------------PERSONNEL ACC TYPE   TOUCH_BUTTON_DEV000000D0AE5C----------------------------EQUIP ACC ACC TYPE   TOUCH_BUTTON_DEVTFFLD_CUST_ORDER   AUTHORISE             DONE    01.03.201312:28:4301.03.201312:32:02                  LEOMCA          McAuliffe Leon                                    1001            SHELLSAP                                          H80303FG                                                        0125001F1001    200001735 GASOLINE                             000001000000                        005KS037               0101000007750000            000009000000F1001    200001735 00000100000000000100000000000073530000000                               F                   000000000000000000000000000000000000                                           00000000000000000000000000000000000000000000GASOLINE0735300                +01450+01450000001010000000001011000000000743000001T        200001735 GASOLINE0735300                +01450+01450000001010000000001011000000000743000                                           000000000000000000000000000000000000000000000194KS037               0202000007700000            000009000000                   99999999900099999999900099999999900000000                               F                                                                                                  00000000000000000000000000000000000000000000                                           000000000000000000000000000000000000000                                           000000000000000000000000000000000000000000000194KS037               0303000007700000            000009000000                   99999999900099999999900099999999900000000                               F                                                                                                  00000000000000000000000000000000000000000000                                           000000000000000000000000000000000000000                                           000000000000000000000000000000000000000000000194KS037               0404000007700000            000009000000                   99999999900099999999900099999999900000000                               F                                                                                                  00000000000000000000000000000000000000000000                                           000000000000000000000000000000000000000                                           000000000000000000000000000000000000000000000194KS037               0505000007700000            000009000000                   99999999900099999999900099999999900000000                               F                                                                                                  00000000000000000000000000000000000000000000                                           000000000000000000000000000000000000000                                           000000000000000000000000000000000000000000000194001000001A00101BAY01                                 01F1001    200001735 F1001    200001735 000000000000000000000000000000000000     GASOLINE0735300                +01450+01450000001010000000001011000000000743000                                                                               001F101                                GASOLINE0735300                +01450+01450000001010000000001011000000000743000001916174000001920110000001450833000001917184000001921120000001451576000                        001T003            T        200001735 GASOLINE0735300                +01450+01450000001010000000001011000000000743000                        F001F101                                GASOLINE0735300                +01450+01450000001010000000001011000000000743000001916174000001920110000001450833000001917184000001921120000001451576000000                        |
        //0039700000OBP_SYS       0000   BAI_SYS          OBP_TRNSCTN_DETS   01.05.00BAY01           0010007OMEGA 437317501002TFFLD_CUST_ORDER   AUTHORISE             DONE    01.03.201312:28:4301.03.201312:32:02                  LEOMCA          McAuliffe Leon                                    1001            SHELLSAP                                          H80303FG                                                        0125001F1001    200001735 GASOLINE                             000001000000                        005KS037               0101000007750000            000009000000F1001    200001735 00000100000000000100000000000073530000000                               F                   000000000000000000000000000000000000                                           00000000000000000000000000000000000000000000GASOLINE0735300                +01450+01450000001010000000001011000000000743000001T        200001735 GASOLINE0735300                +01450+01450000001010000000001011000000000743000                                           000000000000000000000000000000000000000000000194001000001A00101BAY01                                 01F1001    200001735 F1001    200001735 000000000000000000000000000000000000     GASOLINE0735300                +01450+01450000001010000000001011000000000743000                                                                               001F101                                GASOLINE0735300                +01450+01450000001010000000001011000000000743000001916174000001920110000001450833000001917184000001921120000001451576000                        001T003            T        200001735 GASOLINE0735300                +01450+01450000001010000000001011000000000743000                        F001F101                                GASOLINE0735300                +01450+01450000001010000000001011000000000743000001916174000001920110000001450833000001917184000001921120000001451576000000                        |
        $msg = new XTRANSAC_DET();
        $msg->Message_Length = "000000";                        /* Auto-calculate at the end of population */
        $msg->message_number = "0000";                          /* Fixed */
        $msg->Source_system_device = "MANUAL_SYS    ";          /* Fixed */
        $msg->Source_device_flags = "0000";                     /* Fixed */
        $msg->Source_id_number = "   ";                         /* Fixed */
        $msg->Dest_system_device = "BAI_999       ";            /* Fixed */
        $msg->Dest_id_number = "   ";                           /* Fixed */
        //$msg->Message_Type = "MAN_TRNSCTN_DETS   ";             /* Fixed */
        $msg->Message_Type = "OBP_TRNSCTN_DETS   ";             /* Fixed */
        $msg->Message_Version = "01.05.00";                     /* Fixed */
        $msg->Bay_Code = "BAY999          ";                    /* Fixed */
        $msg->Transaction_Number = sprintf("%07d", $this->trns_id);   /* Get it from parameter, sample: "0010007" */
        //$msg->Standalone_Mode = "OBP   ";                       /* Fixed, stand-alone */
        $msg->Standalone_Mode = "OMEGA ";                       /* Fixed, still use operator mode */
        $msg->Load_Number = sprintf("%09d", $para_trans->Load_Number);       /* Get it from parameter, sample: "437317501" */
        $msg->Number_of_keys = "000";                           /* Fixed, always set it 0 */
        //$msg->Number_of_keys = "002000000D0B533----------------------------PERSONNEL ACC TYPE   TOUCH_BUTTON_DEV000000D0AE5C----------------------------EQUIP ACC ACC TYPE   TOUCH_BUTTON_DEV";
        $msg->load_unload = "T";                                /* TODO: load/unload ? */
        $msg->end_load_on_WB = "F";                             /* Fixed */
        $msg->prompt_eqp_on_WB = "F";                           /* Fixed */
        $msg->Load_Type = "LD_CUST_ORDER   ";                   /* TODO: load type */
        $msg->Reject_Reason = "                      ";         /* Fixed */
        $msg->Transaction_State = "        ";                   /* Fixed */
        $msg->Start_Time = $para_trans->Start_Time;             /* Get it from parameter, start time, sample: "01.03.201312:28:43" */
        $msg->Finish_Time = $para_trans->Finish_Time;           /* Get it from parameter, end time, sample: "01.03.201312:32:02" */
        $msg->Release_Time = "                  ";              /* Fixed */
        $msg->Operator_Code = sprintf("%-16s", $para_trans->Operator_Code); /* Get it from parameter, sample: "LEOMCA          " */
        $msg->Operator_Name = sprintf("%-50s", $this->get_operator_name($para_trans->Operator_Code));
        
        $schedule_id = 0;
        if ($order_number == 0)
            $schedule_id = $para_trans->Load_Number;
        else
            $schedule_id = $this->get_trip_by_order($order_number);
        $this->init_trip($schedule_id, $para_trans->Supplier, $num_of_transfers, $transfers, $drawer_code, $drawer_name, $tanker_Code, $num_of_product, $para_prod, $num_of_compartment, $compartments);
        
        $msg->Drawer_Code = sprintf("%-16s", $drawer_code);     /* Get it from parameter, sample: "1001            " */
        $msg->Drawer_Name = sprintf("%-50s", $drawer_name);     /* Get it from parameter, sample: "SHELLSAP                                          " */
        $msg->Tanker_Code = sprintf("%-20s", $tanker_Code);     /* Get it from parameter, sample: "H80303FG            " */
        $msg->Safe_Tanker_Mass = "            ";                /* Fixed */
        $msg->Tare_Tanker_Mass = "            ";                /* Fixed */
        $msg->Tanker_Prompt = "                    ";           /* Fixed */
        $msg->Drawer_Prompt_Flags = "0125";                     /* Fixed */
        
        /* Baiman uses product info to call mk_specprod, and it only needs product_code */
        $msg->Number_of_Products = sprintf("%03d", $num_of_product);    /* Get it from parameter, sample: "001" */
        for ($i = 0; $i < $num_of_product; ++ $i)
        {
            $msg->prod_det[$i] = new XPROD();
            $msg->prod_det[$i]->is_base_product = "F";          /* Fixed */
            $msg->prod_det[$i]->drawer_code = sprintf("%-8s", $para_prod[$i]->drawer_code);       /* Get it from parameter, sample: "1001    " */
            $msg->prod_det[$i]->product_code = sprintf("%-10s", $para_prod[$i]->product_code);    /* Get it from parameter, sample: "200001735 " */
            $msg->prod_det[$i]->prod_class = "        ";        /* Fixed */
            $msg->prod_det[$i]->dens = "       ";               /* Fixed */
            $msg->prod_det[$i]->mass_fract = "        ";        /* Fixed */
            $msg->prod_det[$i]->exp_coeff = "        ";         /* Fixed */
            $msg->prod_det[$i]->pub_tempe = "      ";           /* Fixed */
            $msg->prod_det[$i]->amb_vol = "            ";       /* Fixed */
            $msg->prod_det[$i]->cor_vol = "            ";       /* Fixed */
            $msg->prod_det[$i]->liq_kg = "            ";        /* Fixed */
        }
        
        $msg->Number_of_Compartments = sprintf("%03d", $num_of_compartment);    /* Get it from parameter, sample: "001" */
        for ($i = 0; $i < $num_of_compartment; ++ $i)
        {
            $msg->cmpt_det[$i] = new XCMPT();
            $msg->cmpt_det[$i]->eqp_cd = sprintf("%-20s", $compartments[$i]->eqp_cd);        /* Get it from parameter, sample: "KS037               " */
            $msg->cmpt_det[$i]->nr_in_eqp = sprintf("%02d", $compartments[$i]->nr_in_eqp);   /* Get it from parameter, sample: "01" */
            $msg->cmpt_det[$i]->nr_in_tkr = sprintf("%02d", $compartments[$i]->nr_in_tkr);   /* Get it from parameter, sample: "01" */
            $msg->cmpt_det[$i]->Volume_Safe_Fill_Limit = "000077500000";    /* Fixed, set it a big number */
            $msg->cmpt_det[$i]->Mass_Limit = "            ";                /* Fixed */
            $msg->cmpt_det[$i]->Volume_Capacity = "000090000000";           /* Fixed, set it a big number */
            
            /* This product info will be used in mk_specdets() in baiman */
            $msg->cmpt_det[$i]->prod_def = new XPD();
            $msg->cmpt_det[$i]->prod_def->is_base_product = "F";        /* TODO: Fixed */
            $msg->cmpt_det[$i]->prod_def->drawer_code = sprintf("%-8s", $compartments[$i]->sched_drawer_code);      /* Get it from parameter, sample: "1001    " */
            $msg->cmpt_det[$i]->prod_def->product_code = sprintf("%-10s", $compartments[$i]->sched_prod_code);   /* Get it from parameter, sample: "200001735 " */
            
            /* preload quantity */
            $msg->cmpt_det[$i]->asmx = new XASM();
            $msg->cmpt_det[$i]->asmx->amb_vol = sprintf("%012d", $compartments[$i]->preload_amb_vol);  /* Get it from parameter, sample: "000001000000" */
            $msg->cmpt_det[$i]->asmx->cor_vol = sprintf("%012d", $compartments[$i]->preload_cor_vol);  /* Get it from parameter, sample: "000001000000" */
            $msg->cmpt_det[$i]->asmx->liq_kg = sprintf("%012d", $compartments[$i]->preload_liq_kg);    /* Get it from parameter, sample: "000000735300" */
            
            $msg->cmpt_det[$i]->Nr_of_Drums_Specified = "00000";            /* Fixed */
            
            $msg->cmpt_det[$i]->prod_class1 = new XPC();                    /* Unloading */
            $msg->cmpt_det[$i]->prod_class1->prod_class = "        ";       /* Fixed */
            $msg->cmpt_det[$i]->prod_class1->dens = "       ";              /* Fixed */
            $msg->cmpt_det[$i]->prod_class1->mass_fract = "        ";       /* Fixed */
            $msg->cmpt_det[$i]->prod_class1->exp_coeff = "        ";        /* Fixed */
            
            $msg->cmpt_det[$i]->hybrid_loading = "F";                       /* Fixed, weight-bridge only */
         
            $msg->cmpt_det[$i]->prod_def2 = new XPD();
            $msg->cmpt_det[$i]->prod_def2->is_base_product = " ";           /* Fixed */
            $msg->cmpt_det[$i]->prod_def2->drawer_code = "        ";        /* Fixed */
            $msg->cmpt_det[$i]->prod_def2->product_code = "          ";     /* Fixed */
            
            $msg->cmpt_det[$i]->asm2 = new XASM();                          /* Fixed, weight-bridge only */
            $msg->cmpt_det[$i]->asm2->amb_vol = "000000000000";             /* Fixed */
            $msg->cmpt_det[$i]->asm2->cor_vol = "000000000000";             /* Fixed */
            $msg->cmpt_det[$i]->asm2->liq_kg = "000000000000";              /* Fixed */
            
            $msg->cmpt_det[$i]->prod_class2 = new XPC();                    /* Fixed, preloaded */
            $msg->cmpt_det[$i]->prod_class2->prod_class = "        ";       /* Fixed */
            $msg->cmpt_det[$i]->prod_class2->dens = "       ";              /* Fixed */
            $msg->cmpt_det[$i]->prod_class2->mass_fract = "        ";       /* Fixed */
            $msg->cmpt_det[$i]->prod_class2->exp_coeff = "        ";        /* Fixed */
            
            $msg->cmpt_det[$i]->temps1 = new XTEMPS();                      /* Fixed, preloaded */
            $msg->cmpt_det[$i]->temps1->Temperature = "      ";             /* Fixed */
            $msg->cmpt_det[$i]->temps1->Average_Temperature = "      ";     /* Fixed */
            
            $msg->cmpt_det[$i]->asm3 = new XASM();                          /* Fixed, preloaded */
            $msg->cmpt_det[$i]->asm3->amb_vol = "000000000000";             /* Fixed */
            $msg->cmpt_det[$i]->asm3->cor_vol = "000000000000";             /* Fixed */
            $msg->cmpt_det[$i]->asm3->liq_kg = "000000000000";              /* Fixed */
            
            $msg->cmpt_det[$i]->NrBases1 = "000";                           /* Fixed, preloaded base qtys */
            
            /* Baiman never uses the info below, so do not need to set them. */
            $msg->cmpt_det[$i]->Nr_of_Preloaded_Drums = "00000";            /* Fixed */
            
            $msg->cmpt_det[$i]->prod_class3 = new XPC();                    /* loaded product */
            $msg->cmpt_det[$i]->prod_class3->prod_class = "GASOLINE";       /* TODO: product class */
            $msg->cmpt_det[$i]->prod_class3->dens = "0735300";              /* TODO: dens */
            $msg->cmpt_det[$i]->prod_class3->mass_fract = "        ";       /* Fixed */
            $msg->cmpt_det[$i]->prod_class3->exp_coeff = "        ";        /* Fixed */
            
            $msg->cmpt_det[$i]->temps2 = new XTEMPS();                      /* loaded product temperature */
            $msg->cmpt_det[$i]->temps2->Temperature = "+01450";             /* TODO: temp */
            $msg->cmpt_det[$i]->temps2->Average_Temperature = "+01450";     /* TODO: average temp */
            
            $msg->cmpt_det[$i]->asm4 = new XASM();                          /* loaded proudct quantity */
            $msg->cmpt_det[$i]->asm4->amb_vol = "000000000000";             /* TODO: amb */
            $msg->cmpt_det[$i]->asm4->cor_vol = "000000000000";             /* TODO: cor */
            $msg->cmpt_det[$i]->asm4->liq_kg = "000000000000";              /* TODO: kg */
            
            $msg->cmpt_det[$i]->NrBases2 = "000";                           /* TODO: loaded base product, set it to 000, cause it is not used in baiman */
            for ($j = 0; $j < $msg->cmpt_det[$i]->NrBases2; ++$j)
            {
                $msg->cmpt_det[$i]->qty2[$j] = new XQTY();
                $msg->cmpt_det[$i]->qty2[$j]->pd = new XPD();
                $msg->cmpt_det[$i]->qty2[$j]->pd->is_base_product = "T";            /* TODO */
                $msg->cmpt_det[$i]->qty2[$j]->pd->drawer_code = "        ";      
                $msg->cmpt_det[$i]->qty2[$j]->pd->product_code = "200001735 ";      /* TODO */    
                $msg->cmpt_det[$i]->qty2[$j]->prod_class = new XPC();
                $msg->cmpt_det[$i]->qty2[$j]->prod_class->prod_class = "GASOLINE";  /* TODO */
                $msg->cmpt_det[$i]->qty2[$j]->prod_class->dens = "0735300";         /* TODO */
                $msg->cmpt_det[$i]->qty2[$j]->prod_class->mass_fract = "        ";  
                $msg->cmpt_det[$i]->qty2[$j]->prod_class->exp_coeff = "        ";  
                $msg->cmpt_det[$i]->qty2[$j]->temps = new XTEMPS();
                $msg->cmpt_det[$i]->qty2[$j]->temps->Temperature = "+01450";        /* TODO */
                $msg->cmpt_det[$i]->qty2[$j]->temps->Average_Temperature = "+01450";/* TODO */
                $msg->cmpt_det[$i]->qty2[$j]->asmx = new XASM();
                $msg->cmpt_det[$i]->qty2[$j]->asmx->amb_vol = "000001010000";       /* TODO */
                $msg->cmpt_det[$i]->qty2[$j]->asmx->cor_vol = "000001011000";       /* TODO */
                $msg->cmpt_det[$i]->qty2[$j]->asmx->liq_kg = "000000743000";        /* TODO */
            }
            
            $msg->cmpt_det[$i]->prod_class4 = new XPC();                    /* Always blank */
            $msg->cmpt_det[$i]->prod_class4->prod_class = "        ";
            $msg->cmpt_det[$i]->prod_class4->dens = "       ";
            $msg->cmpt_det[$i]->prod_class4->mass_fract = "        ";
            $msg->cmpt_det[$i]->prod_class4->exp_coeff = "        ";
            
            $msg->cmpt_det[$i]->temps3 = new XTEMPS();                      /* Always blank */
            $msg->cmpt_det[$i]->temps3->Temperature = "      ";
            $msg->cmpt_det[$i]->temps3->Average_Temperature = "      ";
            
            $msg->cmpt_det[$i]->asm5 = new XASM();                          /* Always zero */
            $msg->cmpt_det[$i]->asm5->amb_vol = "000000000000";
            $msg->cmpt_det[$i]->asm5->cor_vol = "000000000000";
            $msg->cmpt_det[$i]->asm5->liq_kg = "000000000000";
            
            $msg->cmpt_det[$i]->NrBases3 = "000";                           /* Always zero */
            $msg->cmpt_det[$i]->Nr_of_Loaded_Drums = "00000";
            $msg->cmpt_det[$i]->Prompt_Flags = "0194";                      /* TODO */
        }
        
        $total_meters = 0;
        $meter_array = array();
        $msg->Number_of_Transfers = sprintf("%03d", $num_of_transfers);    /* Get it from parameter, sample: "001" */
        for ($i = 0; $i < $num_of_transfers; ++$i)
        {
            $msg->trf_det[$i] = new XTRF_DET();
            $msg->trf_det[$i]->Transfer_Number = sprintf("%06d", $i + 1);                       /* Sample: "000001"*/
            $msg->trf_det[$i]->Arm_Code = sprintf("%-6s", $transfers[$i]->Arm_Code);            /* Sample: "A00101" */
            //$msg->trf_det[$i]->Device_Code = sprintf("%-16s", $transfers[$i]->Device_Code);     /* Sample: "BAY01           " */
            $msg->trf_det[$i]->Device_Code = "                ";     /* Sample: "BAY01           " */
            $msg->trf_det[$i]->eqp_cd = "                    ";     /* Fixed */
            $msg->trf_det[$i]->nr_in_eqp = "  ";                    /* Blank */
            $msg->trf_det[$i]->nr_in_tkr = sprintf("%02d", $transfers[$i]->nr_in_tkr);           /* Sample: "01" */
            
            $msg->trf_det[$i]->pdx = new XPD();                     /* tranfers product */
            $msg->trf_det[$i]->pdx->is_base_product = "F";              /* Always "F" */
            $msg->trf_det[$i]->pdx->drawer_code = sprintf("%-8s", $transfers[$i]->drawer_code);     /* Sample: "1001    " */
            $msg->trf_det[$i]->pdx->product_code = sprintf("%-10s", $transfers[$i]->product_code);  /* Sample: "200001735 " */
            
            $msg->trf_det[$i]->pdy = new XPD();                     /* Seems repeat pdx */
            $msg->trf_det[$i]->pdy->is_base_product = $msg->trf_det[$i]->pdx->is_base_product;
            $msg->trf_det[$i]->pdy->drawer_code = $msg->trf_det[$i]->pdx->drawer_code;
            $msg->trf_det[$i]->pdy->product_code = $msg->trf_det[$i]->pdx->product_code;
            
            $msg->trf_det[$i]->asmx = new XASM();                   /* Baiman does not use this part */
            $msg->trf_det[$i]->asmx->amb_vol = "000000000000";      
            $msg->trf_det[$i]->asmx->cor_vol = "000000000000";
            $msg->trf_det[$i]->asmx->liq_kg = "000000000000";
            
            $msg->trf_det[$i]->Nr_of_Drums = "     ";               /* Always blank */
            $msg->trf_det[$i]->prod_class = new XPC();              
            //$msg->trf_det[$i]->prod_class->prod_class = sprintf("%-8s", $transfers[$i]->prod_class);    /* Sample: "GASOLINE"*/
            $msg->trf_det[$i]->prod_class->prod_class = "        ";    /* Sample: "GASOLINE"*/
            $msg->trf_det[$i]->prod_class->dens = sprintf("%07d", $transfers[$i]->dens);                /* Sample: "0735300"*/
            $msg->trf_det[$i]->prod_class->mass_fract = "        "; /* Always blank */
            $msg->trf_det[$i]->prod_class->exp_coeff = "        ";  /* Always blank */
            
            $msg->trf_det[$i]->temps = new XTEMPS();
            $msg->trf_det[$i]->temps->Temperature = sprintf("%+06d", $transfers[$i]->Temperature);                       /* Sample: "+01450"*/
            //$msg->trf_det[$i]->temps->Average_Temperature = sprintf("%+06d", $transfers[$i]->Average_Temperature);       /* Sample: "+01450"*/
            $msg->trf_det[$i]->temps->Average_Temperature = "      ";       /* Sample: "+01450"*/
            
            $msg->trf_det[$i]->asm2 = new XASM();
            $msg->trf_det[$i]->asm2->amb_vol = sprintf("%012d", $transfers[$i]->amb_vol);    /* Sample: "000001010000"*/
            $msg->trf_det[$i]->asm2->cor_vol = sprintf("%012d", $transfers[$i]->cor_vol);    /* Sample: "000001011000"*/
            $msg->trf_det[$i]->asm2->liq_kg = sprintf("%012d", $transfers[$i]->liq_kg);      /* Sample: "000000743000"*/
            
            $msg->trf_det[$i]->prod_class1 = new XPC();                                 /* Always blank */
            $msg->trf_det[$i]->prod_class1->prod_class = "        ";
            $msg->trf_det[$i]->prod_class1->dens = "       ";
            $msg->trf_det[$i]->prod_class1->prod_class = "        ";
            $msg->trf_det[$i]->prod_class1->prod_class = "        ";
            
            $msg->trf_det[$i]->temps2 = new XTEMPS();                                   /* Always blank */
            $msg->trf_det[$i]->temps2->Temperature = "      ";
            $msg->trf_det[$i]->temps2->Average_Temperature = "      ";
            
            $msg->trf_det[$i]->asm3 = new XASM();                                       /* Always blank */
            $msg->trf_det[$i]->asm3->amb_vol = "            ";
            $msg->trf_det[$i]->asm3->cor_vol = "            ";
            $msg->trf_det[$i]->asm3->liq_kg = "            ";
            
            $msg->trf_det[$i]->Number_of_Meters = sprintf("%03d", $transfers[$i]->num_of_meter);
            for ($j = 0; $j < $transfers[$i]->num_of_meter; ++$j)
            {
                $msg->trf_det[$i]->mtr_det[$j] = new XMTR_DET();
                $msg->trf_det[$i]->mtr_det[$j]->Injector_or_Meter = $transfers[$i]->meters[$j]->Injector_or_Meter;     
                $msg->trf_det[$i]->mtr_det[$j]->Meter_Injector_Code = sprintf("%-16s", $transfers[$i]->meters[$j]->Meter_Injector_Code);   /* Sample: "101             " */
                
                $msg->trf_det[$i]->mtr_det[$j]->pd = new XPD();                 /* Always blank */
                $msg->trf_det[$i]->mtr_det[$j]->pd->is_base_product = " ";
                $msg->trf_det[$i]->mtr_det[$j]->pd->drawer_code = "        ";
                $msg->trf_det[$i]->mtr_det[$j]->pd->product_code = "          ";
                
                $msg->trf_det[$i]->mtr_det[$j]->prod_class = new XPC();
                //$msg->trf_det[$i]->mtr_det[$j]->prod_class->prod_class = sprintf("%-8s", $transfers[$i]->meters[$j]->prod_class);    /* Sample: "GASOLINE"*/
                $msg->trf_det[$i]->mtr_det[$j]->prod_class->prod_class = "        ";    /* Sample: "GASOLINE"*/
                //$msg->trf_det[$i]->mtr_det[$j]->prod_class->dens = sprintf("%07d", $transfers[$i]->meters[$j]->dens);                /* Sample: "0735300"*/
                $msg->trf_det[$i]->mtr_det[$j]->prod_class->dens = "       ";                /* Sample: "0735300"*/
                $msg->trf_det[$i]->mtr_det[$j]->prod_class->mass_fract = "        ";    /* Always blank */
                $msg->trf_det[$i]->mtr_det[$j]->prod_class->exp_coeff = "        ";     /* Always blank */
                
                $msg->trf_det[$i]->mtr_det[$j]->temps = new XTEMPS();
                //$msg->trf_det[$i]->mtr_det[$j]->temps->Temperature = sprintf("%+06d",  $transfers[$i]->meters[$j]->Temperature);                       /* Sample: "+01450"*/
                $msg->trf_det[$i]->mtr_det[$j]->temps->Temperature = "      ";                       /* Sample: "+01450"*/
                //$msg->trf_det[$i]->mtr_det[$j]->temps->Average_Temperature = sprintf("%+06d", $transfers[$i]->meters[$j]->Average_Temperature);        /* Sample: "+01450"*/
                $msg->trf_det[$i]->mtr_det[$j]->temps->Average_Temperature = "      ";        /* Sample: "+01450"*/
                
                $msg->trf_det[$i]->mtr_det[$j]->asmx = new XASM();                      /* Baiman never uses this part */
                $msg->trf_det[$i]->mtr_det[$j]->asmx->amb_vol = "000001010000";         /* Fixed, set it as the sample gives */
                $msg->trf_det[$i]->mtr_det[$j]->asmx->cor_vol = "000001011000";         /* Fixed, set it as the sample gives */
                $msg->trf_det[$i]->mtr_det[$j]->asmx->liq_kg = "000000743000";          /* Fixed, set it as the sample gives */
                
                $msg->trf_det[$i]->mtr_det[$j]->asm2 = new XASM();
                $msg->trf_det[$i]->mtr_det[$j]->asm2->amb_vol = sprintf("%012d", $transfers[$i]->meters[$j]->open_amb);         /* Sample: "001916174000" */
                $msg->trf_det[$i]->mtr_det[$j]->asm2->cor_vol = sprintf("%012d", $transfers[$i]->meters[$j]->open_cor);         /* Sample: "001920110000" */
                $msg->trf_det[$i]->mtr_det[$j]->asm2->liq_kg = sprintf("%012d", $transfers[$i]->meters[$j]->open_kg);         /* Sample: "001450833000" */
                
                $msg->trf_det[$i]->mtr_det[$j]->asm3 = new XASM();
                $msg->trf_det[$i]->mtr_det[$j]->asm3->amb_vol = sprintf("%012d", $transfers[$i]->meters[$j]->close_amb);         /* Sample: "001917184000" */
                $msg->trf_det[$i]->mtr_det[$j]->asm3->cor_vol = sprintf("%012d", $transfers[$i]->meters[$j]->close_cor);         /* Sample: "001921120000" */
                $msg->trf_det[$i]->mtr_det[$j]->asm3->liq_kg = sprintf("%012d", $transfers[$i]->meters[$j]->close_kg);         /* Sample: "001451576000" */
                
                $msg->trf_det[$i]->mtr_det[$j]->Start_Mass = "            ";            /* Always blank */
                $msg->trf_det[$i]->mtr_det[$j]->End_Mass = "            ";              /* Always blank */
                
                /* copy the meter info into a structre to use later */
                $meter_array[$total_meters] = $msg->trf_det[$i]->mtr_det[$j];
                $total_meters ++;
            }
            
            $msg->trf_det[$i]->Number_of_Bases = sprintf("%03d", $transfers[$i]->Number_of_Bases);       
            for ($j = 0; $j < $transfers[$i]->Number_of_Bases; ++$j)
            {
                $msg->trf_det[$i]->base[$j] = new XBASE();
                $msg->trf_det[$i]->base[$j]->Tank_Code = sprintf("%-16s", $transfers[$i]->bases[$j]->Tank_Code);    /* Sample: "T003            "*/
                
                $msg->trf_det[$i]->base[$j]->pd = new XPD();
                $msg->trf_det[$i]->base[$j]->pd->is_base_product = "T";         /* Fixed */
                $msg->trf_det[$i]->base[$j]->pd->drawer_code = "        ";      /* Always blank */
                $msg->trf_det[$i]->base[$j]->pd->product_code = sprintf("%-10s", $transfers[$i]->bases[$j]->product_code);   /* Sample: "200001735" */
        
                $msg->trf_det[$i]->base[$j]->prod_class = new XPC();
                $msg->trf_det[$i]->base[$j]->prod_class->prod_class = sprintf("%-8s", $transfers[$i]->bases[$j]->prod_class);    /* Sample: "GASOLINE"*/
                $msg->trf_det[$i]->base[$j]->prod_class->dens = sprintf("%07d", $transfers[$i]->bases[$j]->dens);                /* Sample: "0735300"*/
                $msg->trf_det[$i]->base[$j]->prod_class->mass_fract = "        ";   /* TODO */
                $msg->trf_det[$i]->base[$j]->prod_class->exp_coeff = "        ";    /* TODO */

                $msg->trf_det[$i]->base[$j]->temps = new XTEMPS();
                $msg->trf_det[$i]->base[$j]->temps->Temperature = sprintf("%+06d",  $transfers[$i]->bases[$j]->Temperature);                       /* Sample: "+01450"*/
                //$msg->trf_det[$i]->base[$j]->temps->Average_Temperature = sprintf("%+06d", $transfers[$i]->bases[$j]->Average_Temperature);        /* Sample: "+01450"*/
                $msg->trf_det[$i]->base[$j]->temps->Average_Temperature = "      ";        /* Sample: "+01450"*/
                
                $msg->trf_det[$i]->base[$j]->asmx = new XASM();
                $msg->trf_det[$i]->base[$j]->asmx->amb_vol = sprintf("%012d", $transfers[$i]->bases[$j]->amb_vol);         /* Sample: "000001010000" */
                $msg->trf_det[$i]->base[$j]->asmx->cor_vol = sprintf("%012d", $transfers[$i]->bases[$j]->cor_vol);         /* Sample: "000001011000" */
                $msg->trf_det[$i]->base[$j]->asmx->liq_kg = sprintf("%012d", $transfers[$i]->bases[$j]->liq_kg);           /* Sample: "000000743000" */
            }
            
            $msg->trf_det[$i]->Start_Mass = "            ";         /* Always blank */
            $msg->trf_det[$i]->End_Mass = "            ";           /* Always blank */
            $msg->trf_det[$i]->Was_Anything_Recycled = "F";         /* TODO */
        }
        
        /* because $msg->mtr_det is the duplicate of $msg->trf_det[$i]->Number_of_Meters, use it here so 
        that caller does not need to prepare an extra parameter */
        $msg->Number_of_Meters = sprintf("%03d", $total_meters);;
        for ($i = 0; $i < $total_meters; ++$i)
        {
            $msg->mtr_det[$i] = new XMTR_DET();
            $msg->mtr_det[$i]->Injector_or_Meter = $meter_array[$i]->Injector_or_Meter; 
            $msg->mtr_det[$i]->Meter_Injector_Code = $meter_array[$i]->Meter_Injector_Code;
            
            $msg->mtr_det[$i]->pd = new XPD();                 /* Always blank */
            $msg->mtr_det[$i]->pd->is_base_product = " ";
            $msg->mtr_det[$i]->pd->drawer_code = "        ";
            $msg->mtr_det[$i]->pd->product_code = "          ";
            
            $msg->mtr_det[$i]->prod_class = new XPC();
            $msg->mtr_det[$i]->prod_class->prod_class = "        ";    /* Sample: "GASOLINE"*/
            $msg->mtr_det[$i]->prod_class->dens = "       ";           /* Sample: "0735300"*/ 
            $msg->mtr_det[$i]->prod_class->mass_fract = "        ";    /* Always blank */
            $msg->mtr_det[$i]->prod_class->exp_coeff = "        ";     /* Always blank */
            
            $msg->mtr_det[$i]->temps = new XTEMPS();
            //$msg->mtr_det[$i]->temps->Temperature = $meter_array[$i]->Temperature;
            $msg->mtr_det[$i]->temps->Temperature = "      ";        /* Sample: "+01450"*/
            //$msg->mtr_det[$i]->temps->Average_Temperature = sprintf("%+06d", $meters[$i]->Average_Temperature);      /* Sample: "+01450"*/
            $msg->mtr_det[$i]->temps->Average_Temperature = "      ";        /* Sample: "+01450"*/
            
            $msg->mtr_det[$i]->asmx = new XASM();                      /* Baiman never uses this part */
            $msg->mtr_det[$i]->asmx->amb_vol = "000001010000";         /* Fixed */
            $msg->mtr_det[$i]->asmx->cor_vol = "000001011000";         /* Fixed */
            $msg->mtr_det[$i]->asmx->liq_kg = "000000743000";          /* Fixed */
            
            $msg->mtr_det[$i]->asm2 = new XASM();
            $msg->mtr_det[$i]->asm2->amb_vol = $meter_array[$i]->asm2->amb_vol;
            $msg->mtr_det[$i]->asm2->cor_vol = $meter_array[$i]->asm2->cor_vol;
            $msg->mtr_det[$i]->asm2->liq_kg = $meter_array[$i]->asm2->liq_kg;
            
            $msg->mtr_det[$i]->asm3 = new XASM();
            $msg->mtr_det[$i]->asm3->amb_vol = $meter_array[$i]->asm3->amb_vol;
            $msg->mtr_det[$i]->asm3->amb_vol = $meter_array[$i]->asm3->amb_vol;
            $msg->mtr_det[$i]->asm3->liq_kg = $meter_array[$i]->asm3->liq_kg;
            
            /* In the message definition, the meter structure inside transfer has start and end mass, but the meter structure 
            inside XTRANSAC_DET level does not have these 2 fields, so they are both set "" */
            $msg->mtr_det[$i]->Start_Mass = "";                         
            $msg->mtr_det[$i]->End_Mass = ""; 
        }
        
        $msg->Number_of_Equipments = "000";             /* Fixed, this is only for weight-bridge */
        $msg->start_weight = "            ";            /* Fixed */
        $msg->end_weight = "            ";              /* Fixed */
        $msg->complete_cur_load = "F";                  /* Fixed */
        
        return $msg->to_string();
    }

    private function unlink_serialized($trns_id)
    {
        unlink($trns_id);
        
        $i = 0;
        for(;;)
        {
            $file = $trns_id * 100 + $i + 1;
            if (file_exists($file) == FALSE)
                break;
            unlink($file);
            
            ++ $i;
        }
        
        return "OK";
    }
    
    function do_create($order_number, $para_trans, $num_of_transfers, $transfers)
    {
        if ($order_number != 0)
        {   /* Open order loading */
            /* 1. auth */
            $auth_req = $this->populate_auth_req($order_number, $para_trans);
            echo($auth_req);
            echo("\n");
            
            $client = new socket_client($this->bay_code);
            $client->send($auth_req);
            $response = $client->get_repond();
            
            //echo($response);
            if (substr_compare($response, "OBP_AUTH_SPEC", 48, 13) != 0)
                return "Fail";
                
            /* 2. Trasaction dets*/
            $tran_det = $this->populate_transa_det($order_number, $para_trans, $num_of_transfers, $transfers);
            $client->send($tran_det);
            $response = $client->get_repond();
            echo($response);
        }
        else
        {
            $tran_det = $this->populate_transa_det(0, $para_trans, $num_of_transfers, $transfers);
            //echo($tran_det);
            //return;
            $client = new socket_client($this->bay_code);
            $client->send($tran_det);
            $response = $client->get_repond();
            echo($response);
            
            $reply = new TRSAN_REPLY();
            $reply->Result_Code = substr($response, 75, 10);
            if (substr_compare($reply->Result_Code, "OK", 0, 2) == 0)   //Once it's created, the stored file can be deleted (if do_save() has once been called)
                $this->unlink_serialized($para_trans->Transaction_Number);
            return $reply->Result_Code;
        }
    }
    
    function do_reverse($trip_id, $supplier)
    {
        $sql = "SELECT STATS FROM SCHEDULE WHERE SHLS_TRIP_NO = " . $trip_id . " AND SHLS_SUPP = '" . $supplier . "'";
        $result = $this->db_conn->query($sql);
        $result_detail = new Result_detail();
        if ($result[0]->STATS != "D" && $result[0]->STATS != "E" )
        {
            $result_detail->result_code = -1;
            $result_detail->result_string = "Load not complete, cannot do reverse";
            return $result_detail;
        }
        
        $sql = "SELECT TRSA_ID FROM TRANSACTIONS, LOADS, SCHEDULE WHERE TRSALDID_LOAD_ID = LOAD_ID AND TRSALDID_LD_TRM = LD_TERMINAL AND SHLSLOAD_LOAD_ID = LOAD_ID
            AND SHLSLOAD_LD_TRM = LD_TERMINAL AND SHLS_TRIP_NO = " . $trip_id . " AND SHLS_SUPP = '" . $supplier . "'";
        $result = $this->db_conn->query($sql);
        $count = count($result);
        $trns_ids = array();
        for ($i = 0; $i < $count; ++ $i)
        {
            $trns_ids[$i] = $result[$i]->TRSA_ID;
        }
        
        $tran_det = $this->populate_reverse_det($count, $trns_ids);
        echo($tran_det);
        //return;
        $client = new socket_client($this->bay_code);
        $client->send($tran_det);
        $response = $client->get_repond();
        echo($response);
        
        if (substr_compare($response, "OK", 12, 2) == 0)
        {
            $result_detail->result_code = 0;
        }
        else
        {
            $result_detail->result_code = -1;
            $result_detail->result_string = $response;
        }
        
        return $result_detail;
    }
    
    function do_save($para_trans, $num_of_transfers, $transfers)
    {
        $str = serialize($para_trans);
        $trns_id = $para_trans->Transaction_Number;
        if (file_put_contents($trns_id, $str) == FALSE)
            return "FAIL";
        for ($i = 0; $i < $num_of_transfers; ++ $i)
        {
            $str = serialize($transfers[$i]);
            if (file_put_contents($trns_id * 100 + $i + 1, $str) == FALSE)
                return "FAIL";
        }
        return "OK";
    }
    
    function do_load($trns_id, &$para_trans, &$num_of_transfers, &$transfers)
    {
        $str = file_get_contents($trns_id);
        if ($str == FALSE)
            return "FAIL";
        $para_trans = unserialize($str);
        if ($para_trans == FALSE)
            return "FAIL";
        
        $i = 0;
        for(;;)
        {
            $file = $trns_id * 100 + $i + 1;
            if (file_exists($file) == FALSE)
                break;
            $str = file_get_contents($file);
            $transfers[$i] = unserialize($str);
            if ($transfers[$i] == FALSE)
                return "FAIL";
            
            ++ $i;
        }
        
        return "OK";
    }
}

function test_create()
{
    $Manual_tran = new ManualTransaction();
    
    $trans = new Manual_Transa();
    //$trans->Transaction_Number = "0020029";       //"0010007" is the sample value
    $trans->Load_Number = "4373248";              //"4373229"
    $trans->Supplier = "1001";
    $trans->Operator_Code = "LEOMCA";
    $trans->Start_Time = "01.04.201312:28:43";
    $trans->Finish_Time = "01.03.201312:32:02";
    $trans->Drawer_Code = "1001";
    $trans->Drawer_Name = "SHELLSAP";
    $trans->Tanker_Code = "H80303FG";
    
    $num_of_transfers = 1;
    for ($i = 0; $i < $num_of_transfers; ++ $i)
    {
        $transfer[$i] = new Manual_Transfer();
        $transfer[$i]->Arm_Code = "A00101";
        //$transfer[$i]->Device_Code = "BAY01";       //Not important, baiman does not use it
        $transfer[$i]->nr_in_tkr = 1;
        
        $transfer[$i]->drawer_code = "1001";       
        $transfer[$i]->product_code = "200001735 ";

        $transfer[$i]->dens = 735300;
        
        $transfer[$i]->Temperature = 1450;
        $transfer[$i]->amb_vol = 3010000;               
        $transfer[$i]->cor_vol = 3011000;
        $transfer[$i]->liq_kg = 343000;
        
        $transfer[$i]->num_of_meter = 1;
        for ($j = 0; $j < $transfer[$i]->num_of_meter; ++ $j)
        {
            $transfer[$i]->meters[$j] = new Transfer_Meter();
            $transfer[$i]->meters[$j]->Injector_or_Meter = "F";
            $transfer[$i]->meters[$j]->Meter_Injector_Code = "101";
            
            $transfer[$i]->meters[$j]->open_amb = 1116174000;
            $transfer[$i]->meters[$j]->open_cor = 1920110000;
            $transfer[$i]->meters[$j]->open_kg = 1450833000;
            $transfer[$i]->meters[$j]->close_amb = 1917184000;
            $transfer[$i]->meters[$j]->close_cor = 1921120000;
            $transfer[$i]->meters[$j]->close_kg = 1451576000;
        }
        
        $transfer[$i]->Number_of_Bases = 1;
        for ($j = 0; $j < $transfer[$i]->Number_of_Bases; ++ $j)
        {
            $transfer[$i]->bases[$j] = new Transfer_Base();
            $transfer[$i]->bases[$j]->Tank_Code = "T003";
            $transfer[$i]->bases[$j]->product_code = "200001735";
            
            $transfer[$i]->bases[$j]->prod_class = "GASOLINE";
            $transfer[$i]->bases[$j]->dens = 735300;
            $transfer[$i]->bases[$j]->Temperature = 1450;
            
            $transfer[$i]->bases[$j]->amb_vol = 1010000;
            $transfer[$i]->bases[$j]->cor_vol = 1011000;
            $transfer[$i]->bases[$j]->liq_kg = 743000;
        }
    }
    
    $Manual_tran->do_create(0, $trans, $num_of_transfers, $transfer);
}

function test_openorder()
{
    $Manual_tran = new ManualTransaction();
    $trans = new Manual_Transa();
    //$trans->Transaction_Number = "0020029";       //"0010007" is the sample value
    $trans->Load_Number = 9707;              //"4373229"
    $trans->Supplier = "1001";
    $trans->Operator_Code = "LEOMCA";
    $trans->Start_Time = "01.04.201312:28:43";
    $trans->Finish_Time = "01.03.201312:32:02";
    $trans->Drawer_Code = "1001";
    $trans->Drawer_Name = "SHELLSAP";
    $trans->Tanker_Code = "H80303FG";
    
    $num_of_transfers = 1;
    for ($i = 0; $i < $num_of_transfers; ++ $i)
    {
        $transfer[$i] = new Manual_Transfer();
        $transfer[$i]->Arm_Code = "A00101";
        //$transfer[$i]->Device_Code = "BAY01";       //Not important, baiman does not use it
        $transfer[$i]->nr_in_tkr = 1;
        
        $transfer[$i]->drawer_code = "1001";       
        $transfer[$i]->product_code = "200001735 ";

        $transfer[$i]->dens = 735300;
        
        $transfer[$i]->Temperature = 1450;
        $transfer[$i]->amb_vol = 3010000;               
        $transfer[$i]->cor_vol = 3011000;
        $transfer[$i]->liq_kg = 343000;
        
        $transfer[$i]->num_of_meter = 1;
        for ($j = 0; $j < $transfer[$i]->num_of_meter; ++ $j)
        {
            $transfer[$i]->meters[$j] = new Transfer_Meter();
            $transfer[$i]->meters[$j]->Injector_or_Meter = "F";
            $transfer[$i]->meters[$j]->Meter_Injector_Code = "101";
            
            $transfer[$i]->meters[$j]->open_amb = 1116174000;
            $transfer[$i]->meters[$j]->open_cor = 1920110000;
            $transfer[$i]->meters[$j]->open_kg = 1450833000;
            $transfer[$i]->meters[$j]->close_amb = 1917184000;
            $transfer[$i]->meters[$j]->close_cor = 1921120000;
            $transfer[$i]->meters[$j]->close_kg = 1451576000;
        }
        
        $transfer[$i]->Number_of_Bases = 1;
        for ($j = 0; $j < $transfer[$i]->Number_of_Bases; ++ $j)
        {
            $transfer[$i]->bases[$j] = new Transfer_Base();
            $transfer[$i]->bases[$j]->Tank_Code = "T003";
            $transfer[$i]->bases[$j]->product_code = "200001735";
            
            $transfer[$i]->bases[$j]->prod_class = "GASOLINE";
            $transfer[$i]->bases[$j]->dens = 735300;
            $transfer[$i]->bases[$j]->Temperature = 1450;
            
            $transfer[$i]->bases[$j]->amb_vol = 1010000;
            $transfer[$i]->bases[$j]->cor_vol = 1011000;
            $transfer[$i]->bases[$j]->liq_kg = 743000;
        }
    }
    
    $Manual_tran->do_create(8707, $trans, $num_of_transfers, $transfer);
}

function test_reverse()
{
    $Manual_tran = new ManualTransaction();
    $Manual_tran->do_reverse(4373176, '1001');
}

function test_save()
{
    $Manual_tran = new ManualTransaction();
    
    $trans = new Manual_Transa();
    $trans->Transaction_Number = 20029;         //"0010007" is the sample value
    $trans->Load_Number = 4373248;              //"4373229"
    $trans->Supplier = "1001";
    $trans->Operator_Code = "LEOMCA";
    $trans->Start_Time = "01.04.201312:28:43";
    $trans->Finish_Time = "01.03.201312:32:02";
    $trans->Drawer_Code = "1001";
    $trans->Drawer_Name = "SHELLSAP";
    $trans->Tanker_Code = "H80303FG";
    
    $num_of_transfers = 1;
    for ($i = 0; $i < $num_of_transfers; ++ $i)
    {
        $transfer[$i] = new Manual_Transfer();
        $transfer[$i]->Arm_Code = "A00101";
        //$transfer[$i]->Device_Code = "BAY01";       //Not important, baiman does not use it
        $transfer[$i]->nr_in_tkr = 1;
        
        $transfer[$i]->drawer_code = "1001";       
        $transfer[$i]->product_code = "200001735 ";
        
        $transfer[$i]->dens = 735300;
        
        $transfer[$i]->Temperature = 1450;
        $transfer[$i]->amb_vol = 3010000;               
        $transfer[$i]->cor_vol = 3011000;
        $transfer[$i]->liq_kg = 343000;
        
        $transfer[$i]->num_of_meter = 1;
        for ($j = 0; $j < $transfer[$i]->num_of_meter; ++ $j)
        {
            $transfer[$i]->meters[$j] = new Transfer_Meter();
            $transfer[$i]->meters[$j]->Injector_or_Meter = "F";
            $transfer[$i]->meters[$j]->Meter_Injector_Code = "101";
            
            $transfer[$i]->meters[$j]->open_amb = 1116174000;
            $transfer[$i]->meters[$j]->open_cor = 1920110000;
            $transfer[$i]->meters[$j]->open_kg = 1450833000;
            $transfer[$i]->meters[$j]->close_amb = 1917184000;
            $transfer[$i]->meters[$j]->close_cor = 1921120000;
            $transfer[$i]->meters[$j]->close_kg = 1451576000;
        }
        
        $transfer[$i]->Number_of_Bases = 1;
        for ($j = 0; $j < $transfer[$i]->Number_of_Bases; ++ $j)
        {
            $transfer[$i]->bases[$j] = new Transfer_Base();
            $transfer[$i]->bases[$j]->Tank_Code = "T003";
            $transfer[$i]->bases[$j]->product_code = "200001735";
            
            $transfer[$i]->bases[$j]->prod_class = "GASOLINE";
            $transfer[$i]->bases[$j]->dens = 735300;
            $transfer[$i]->bases[$j]->Temperature = 1450;
            
            $transfer[$i]->bases[$j]->amb_vol = 1010000;
            $transfer[$i]->bases[$j]->cor_vol = 1011000;
            $transfer[$i]->bases[$j]->liq_kg = 743000;
        }
    }
    
    echo ($Manual_tran->do_save($trans, $num_of_transfers, $transfer));
}

function test_load()
{
    $Manual_tran = new ManualTransaction();
    //$trans = new Manual_Transa();
    $Manual_tran->do_load(20029, $trans, $num_of_transfers, $transfer);
    print_r($trans);
    print_r($transfer);
}

/* For internal testing only */
function main()
{
    //test_create();
    test_reverse();
    //test_save();
    //test_load();
    //test_openorder();
}

?>

