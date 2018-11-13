<?php
/* Wei Cao 09/04/2013 initial
   Wei Cao 14/05/2018 API changes
 Manual transaction. 
*/

require_once(dirname(__FILE__) . '/../bootstrap.php');
require_once(dirname(__FILE__) . '/../vo/ManualTransactions.vo.php');

/* define the module name for calling logMe() to output */
if(!defined('MANUAL_TRANSACTION')) define('MANUAL_TRANSACTION', 'Manual_trans.class');

//main();

/* If API_F == "YES", use API_F message definition, otherwise use the old style */
define("API_F", "NO");

abstract class LD_TYPE
{
    const LD_PRESCHEDULE = 1;
    const LD_PREORDER = 2;
    const LD_ORDER = 3;
}

class XPD 
{
    public $is_base_product;
    public $drawer_code;
    public $product_code;

    function __construct() 
    {
        $this->is_base_product = " ";
        $this->drawer_code = "        ";
        $this->product_code = "          ";
    }

    public function __toString()
    {
        return $this->is_base_product .
            $this->drawer_code .
            $this->product_code;
    }
}

class XASM
{
    public $amb_vol;
    public $cor_vol;
    public $liq_kg;

    function __construct()
    {
        $this->amb_vol = "000000000000";      
        $this->cor_vol = "000000000000";
        $this->liq_kg = "000000000000";
    }

    public function __toString()
    {
        return $this->amb_vol .
            $this->cor_vol .
            $this->liq_kg;
    }
}

if (API_F == "YES")
{
    class XPC 
    {
        public $prod_class;
        public $compensation_method;   
        public $ref_temp_spec;
        public $dens;
        public $mass_fract;
        public $exp_coeff;
        public $api_at_60F;

        function __construct()
        {
            $this->prod_class = "        ";
            $this->dens = "       ";
            $this->mass_fract = "        ";
            $this->exp_coeff = "        ";

            $this->compensation_method = "            "; 
            $this->ref_temp_spec = "            ";
            $this->api_at_60F = "      ";
        }

        public function __toString()
        {
            return $this->prod_class .
                $this->compensation_method .
                $this->ref_temp_spec .
                $this->dens .
                $this->mass_fract .
                $this->exp_coeff .
                $this->api_at_60F;
        }
    }
} 
else
{
    class XPC 
    {
        public $prod_class;
        public $dens;
        public $mass_fract;
        public $exp_coeff;

        function __construct()
        {
            $this->prod_class = "        ";
            $this->dens = "       ";
            $this->mass_fract = "        ";
            $this->exp_coeff = "        ";
        }

        public function __toString()
        {
            return $this->prod_class .
                $this->dens .
                $this->mass_fract .
                $this->exp_coeff;
        }
    }
}

class XTEMPS 
{
    public $Temperature;
    public $Average_Temperature;

    function __construct()
    {
        $this->Temperature = "      ";
        $this->Average_Temperature = "      ";
    }

    public function __toString()
    {
        return $this->Temperature . $this->Average_Temperature;
    }
}

if (API_F == "YES")
{
    class XQTY
    {
        public $pd;
        public $prod_class;
        public $vcf;
        public $temps;
        public $pressure;
        public $asmx;

        function __construct()
        {
            $this->vcf = "       ";
            $this->pressure = "      ";
        }

        public function __toString()
        {
            return $this->pd .
                $this->prod_class .
                $this->vcf .
                $this->temps .
                $this->pressure .
                $this->asmx;
        }
    }
}
else
{
    class XQTY 
    {
        public $pd;
        public $prod_class;
        public $temps;
        public $asmx;

        public function __toString()
        {
            return $this->pd .
                $this->prod_class .
                $this->temps .
                $this->asmx;
        }
    }
}

if (API_F == "YES")
{
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
        
        /* Also used for weighbridge loading using RTC. */
        /* When weighbridge, it is qty in compartment. It is returns */
        /* only at weigh-in. */
        public $asm2; 

        public $prod_class2;        /* preloaded .. prod class  */
        public $vcf1;
        public $temps1;     /* ...      temperature */
        public $pressure1;
        public $asm3;           /* ...      qty     */
        public $NrBases1;       /* ...              */
        public $qty1;           /* .. preloaded base qtys   */

        public $Nr_of_Preloaded_Drums;

        public $prod_class3;        /* loaded ...   prod class  */
        public $vcf2;
        public $temps2;     /* ...      temperature */
        public $pressure2;
        public $asm4;           /* ...      qty     */
        public $NrBases2;       /* ...              */
        public $qty2;           /* ... loaded   base qtys   */
        public $prod_class4;        /* loaded ...   prod class  */
        public $vcf3;
        public $temps3;     /* ...      temperature */
        public $pressure3;
        public $asm5;           /* ...      qty     */
        public $NrBases3;       /* ...              */
        public $qty3;           /* ... loaded   base qtys   */
        public $Nr_of_Loaded_Drums;
        public $Prompt_Flags;

        function __construct()
        {
            $this->vcf1 = "       ";
            // $this->vcf1 = "7654321";
            $this->pressure1 = "      ";
            $this->vcf2 = "       ";
            // $this->vcf2 = "3214567";
            $this->pressure2 = "      ";
            $this->vcf3 = "       ";
            // $this->vcf3 = "1234567";
            $this->pressure3 = "      ";
        }

        public function __toString()
        {
            return $this->eqp_cd .
                $this->nr_in_eqp .
                $this->nr_in_tkr .
                $this->Volume_Safe_Fill_Limit .
                $this->Mass_Limit .
                $this->Volume_Capacity .
                $this->prod_def .
                $this->asmx .
                $this->Nr_of_Drums_Specified . 
                $this->prod_class1 .  
                $this->hybrid_loading .  
                $this->prod_def2 .
                $this->asm2 . 
                $this->prod_class2 .
                $this->vcf1 .
                $this->temps1 .     /* ...      temperature */
                $this->pressure1 .
                $this->asm3 .           /* ...      qty     */
                $this->NrBases1 .       /* ...              */
                $this->qty1 .           /* .. preloaded base qtys   */
                $this->Nr_of_Preloaded_Drums .
                $this->prod_class3 .        /* loaded ...   prod class  */
                $this->vcf2 .
                $this->temps2 .     /* ...      temperature */
                $this->pressure2 .
                $this->asm4 .           /* ...      qty     */
                $this->NrBases2 .       /* ...              */
                $this->qty2 .           /* ... loaded   base qtys   */
                $this->prod_class4 .        /* loaded ...   prod class  */
                $this->vcf3 .
                $this->temps3 .     /* ...      temperature */
                $this->pressure3 .
                $this->asm5 .           /* ...      qty     */
                $this->NrBases3 .       /* ...              */
                $this->qty3 .           /* ... loaded   base qtys   */
                $this->Nr_of_Loaded_Drums .
                $this->Prompt_Flags;
        }
    }
}
else
{
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
        
        /* Also used for weighbridge loading using RTC. */
        /* When weighbridge, it is qty in compartment. It is returns */
        /* only at weigh-in. */
        public $asm2; 

        public $prod_class2;        /* preloaded .. prod class  */
        public $temps1;     /* ...      temperature */
        public $asm3;           /* ...      qty     */
        public $NrBases1;       /* ...              */
        public $qty1;           /* .. preloaded base qtys   */

        public $Nr_of_Preloaded_Drums;

        public $prod_class3;        /* loaded ...   prod class  */
        public $temps2;     /* ...      temperature */
        public $asm4;           /* ...      qty     */
        public $NrBases2;       /* ...              */
        public $qty2;           /* ... loaded   base qtys   */
        public $prod_class4;        /* loaded ...   prod class  */
        public $temps3;     /* ...      temperature */
        public $asm5;           /* ...      qty     */
        public $NrBases3;       /* ...              */
        public $qty3;           /* ... loaded   base qtys   */
        public $Nr_of_Loaded_Drums;
        public $Prompt_Flags;

        public function __toString()
        {
            return $this->eqp_cd . 
                $this->nr_in_eqp .
                $this->nr_in_tkr .
                $this->Volume_Safe_Fill_Limit .
                $this->Mass_Limit .
                $this->Volume_Capacity .
                $this->prod_def . 
                $this->asmx .
                $this->Nr_of_Drums_Specified .    
                $this->prod_class1 .    
                $this->hybrid_loading . 
                $this->prod_def2 .
                $this->asm2 . 
                $this->prod_class2 .   
                $this->temps1 .     
                $this->asm3 .           
                $this->NrBases1 .      
                $this->qty1 .           
                $this->Nr_of_Preloaded_Drums .
                $this->prod_class3 .        
                $this->temps2 .    
                $this->asm4 .      
                $this->NrBases2 .  
                $this->qty2 .        
                $this->prod_class4 . 
                $this->temps3 .   
                $this->asm5 .      
                $this->NrBases3 .  
                $this->qty3 .    
                $this->Nr_of_Loaded_Drums .
                $this->Prompt_Flags;
        }
    }
}

if (API_F == "YES")
{
    class XPROD 
    {
        public $is_base_product;
        public $drawer_code;
        public $product_code;
        
        public $prod_class;
        public $Compensation_Method;
        public $ref_temp_spec;

        public $dens;
        public $mass_fract;
        public $exp_coeff;
        public $api_at_60F;

        public $pub_tempe;    /* published temperature. 11-05-2011*/
        
        public $amb_vol;
        public $cor_vol;
        public $liq_kg;

        function __construct()
        {
            $this->is_base_product = " ";
            $this->drawer_code = "        ";
            $this->product_code = "          ";

            $this->prod_class = "        ";
            $this->Compensation_Method = "            ";
            $this->ref_temp_spec = "            ";

            $this->dens = "       "; 
            $this->mass_fract = "        "; 
            $this->exp_coeff = "        "; 
            $this->api_at_60F = "      ";

            $this->pub_tempe = "      "; 
            $this->amb_vol = "            ";
            $this->cor_vol = "            ";
            $this->liq_kg = "            ";
        }

        public function __toString()
        {
            return $this->is_base_product . 
                $this->drawer_code . 
                $this->product_code .
                $this->prod_class . 
                $this->Compensation_Method .
                $this->ref_temp_spec .
                $this->dens . 
                $this->mass_fract . 
                $this->exp_coeff .
                $this->api_at_60F .
                $this->pub_tempe . 
                $this->amb_vol . 
                $this->cor_vol . 
                $this->liq_kg;    
        }
    }
}
else
{
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

        function __construct()
        {
            $this->is_base_product = " ";
            $this->drawer_code = "        ";
            $this->product_code = "          ";

            $this->prod_class = "        ";
            
            $this->dens = "       "; 
            $this->mass_fract = "        "; 
            $this->exp_coeff = "        "; 
            
            $this->pub_tempe = "      "; 
            $this->amb_vol = "            ";
            $this->cor_vol = "            ";
            $this->liq_kg = "            ";
        }

        public function __toString()
        {
            return $this->is_base_product . 
                $this->drawer_code . 
                $this->product_code .
                $this->prod_class . 
                $this->dens . 
                $this->mass_fract . 
                $this->exp_coeff .
                $this->pub_tempe . 
                $this->amb_vol . 
                $this->cor_vol . 
                $this->liq_kg;    
        }
    }
}

if (API_F == "YES")
{
    class XMTR_DET 
    {
        public $Injector_or_Meter;
        public $Meter_Injector_Code;

        public $pd;
        public $prod_class;

        public $vcf;

        public $temps;

        public $pressure;

        public $asmx;
        public $asm2;
        public $asm3;
        public $Start_Mass;
        public $End_Mass;

        function __construct()
        {
            $this->vcf = "       ";
            $this->pressure = "      ";
        }

        public function __toString()
        {
            return $this->Injector_or_Meter .
                $this->Meter_Injector_Code .
                $this->pd .
                $this->prod_class .
                $this->vcf .
                $this->temps .
                $this->pressure .
                $this->asmx .
                $this->asm2 .
                $this->asm3 .
                $this->Start_Mass .
                $this->End_Mass;
        }
    }
}
else
{
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

        public function __toString()
        {
            return $this->Injector_or_Meter .
                $this->Meter_Injector_Code .
                $this->pd .
                $this->prod_class .
                $this->temps .
                $this->asmx .
                $this->asm2 .
                $this->asm3 .
                $this->Start_Mass .
                $this->End_Mass;
        }
    }
}

if (API_F == "YES")
{
    class XBASE 
    {
        public $Tank_Code;

        public $pd;
        public $prod_class;
        
        public $vcf;

        public $temps;

        public $pressure;

        public $asmx;

        function __construct()
        {
            $this->vcf = "       ";
            $this->pressure = "      ";
        }

        public function __toString()
        {
            return $this->Tank_Code .
                $this->pd .
                $this->prod_class .
                $this->vcf .
                $this->temps .
                $this->pressure .
                $this->asmx;
        }
    }
}
else
{
    class XBASE 
    {
        public $Tank_Code;

        public $pd;
        public $prod_class;

        public $temps;

        public $asmx;

        public function __toString()
        {
            return $this->Tank_Code .
                $this->pd .
                $this->prod_class .
                $this->temps .
                $this->asmx;
        }
    }
}

if (API_F == "YES")
{
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
        public $vcf1;
        public $temps;
        public $pressure1;
        public $asm2;
        public $prod_class1;
        public $vcf2;
        public $temps2;
        public $pressure2;
        public $asm3;
        public $Number_of_Meters;
        public $mtr_det;

        public $Number_of_Bases;
        public $base;

        public $Start_Mass;
        public $End_Mass;
        public $Was_Anything_Recycled;

        function __construct()
        {
            $this->vcf1 = "       ";
            $this->pressure1 = "      ";
            $this->vcf2 = "       ";
            $this->pressure2 = "      ";
        }

        public function __toString()
        {
            // logMe($this->mtr_det, 'INTRANSFER');
            $msg_string = $this->Transfer_Number .
                $this->Arm_Code .
                $this->Device_Code .
                $this->eqp_cd .
                $this->nr_in_eqp .
                $this->nr_in_tkr .
                $this->pdx .
                $this->pdy .
                $this->asmx .
                $this->Nr_of_Drums .
                $this->prod_class .
                $this->vcf1 .
                $this->temps .
                $this->pressure1 .
                $this->asm2 .
                $this->prod_class1 .
                $this->vcf2 .
                $this->temps2 .
                $this->pressure2 .
                $this->asm3 .
                $this->Number_of_Meters;

            for ($i = 0; $i < $this->Number_of_Meters; ++ $i)
            {
                $msg_string = $msg_string . $this->mtr_det[$i];
            }

            $msg_string = $msg_string . $this->Number_of_Bases;

            for ($i = 0; $i < $this->Number_of_Bases; ++ $i)
            {
                $msg_string = $msg_string . $this->base[$i];
            }

            $msg_string = $msg_string . 
                $this->Start_Mass .
                $this->End_Mass .
                $this->Was_Anything_Recycled;

            return $msg_string;
        }
    }
}
else
{
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

        public function __toString()
        {
            $msg_string = $this->Transfer_Number .
                $this->Arm_Code .
                $this->Device_Code .
                $this->eqp_cd .
                $this->nr_in_eqp .
                $this->nr_in_tkr .
                $this->pdx .
                $this->pdy .
                $this->asmx .
                $this->Nr_of_Drums .
                $this->prod_class .
                $this->temps .
                $this->asm2 .
                $this->prod_class1 .
                $this->temps2 .
                $this->asm3 .
                $this->Number_of_Meters;
                
            for ($i = 0; $i < $this->Number_of_Meters; ++ $i)
            {
                $msg_string = $msg_string . $this->mtr_det[$i];
            }

            $msg_string = $msg_string . $this->Number_of_Bases;

            for ($i = 0; $i < $this->Number_of_Bases; ++ $i)
            {
                $msg_string = $msg_string . $this->base[$i];
            }

            $msg_string = $msg_string . 
                $this->Start_Mass .
                $this->End_Mass .
                $this->Was_Anything_Recycled;

            return $msg_string;
        }
    }
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
    public $trip_no;
    public $supplier;
    
    public function to_string()
    {
        $msg_string = $this->message_number . 
            $this->Source_system_device . 
            $this->Source_device_flags . 
            $this->Source_id_number .
            $this->Dest_system_device . 
            $this->Dest_id_number . 
            $this->Message_Type . 
            $this->Message_Version . 
            $this->trip_no . 
            $this->supplier . "|";
        
        $this->Message_Length = sprintf("%06d", strlen($msg_string) + 6);
        $msg_string = $this->Message_Length . $msg_string;
    
        return $msg_string;
    }
}

class SPEC_MOVE_REQ
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
    public $trip_no;
    public $supplier;
    
    public function to_string()
    {
        $msg_string = $this->message_number . $this->Source_system_device . $this->Source_device_flags . $this->Source_id_number .
            $this->Dest_system_device . $this->Dest_id_number . $this->Message_Type . $this->Message_Version . $this->mlitm_id . "|";
        
        $this->Message_Length = sprintf("%06d", strlen($msg_string) + 6);
        $msg_string = $this->Message_Length . $msg_string;
    
        return $msg_string;
    }
}

class XMOV_SCHD_REQ
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
    public $mvitm_id;
    public $Operator_Code;
    public $Tanker_Code;
    public $schd_qty;
    public $drawer1;
    public $product_code1;
    public $drawer2;
    public $product_code2;
    
    public function to_string()
    {
        $msg_string = $this->message_number . $this->Source_system_device . $this->Source_device_flags . $this->Source_id_number .
            $this->Dest_system_device . $this->Dest_id_number . $this->Message_Type . $this->Message_Version . $this->mlitm_id . 
            $this->Operator_Code . $this->Tanker_Code . $this->schd_qty . $this->drawer1 . $this->product_code1 . $this->drawer2 . $this->product_code2 . "|";
        
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
        $msg_string = $this->message_number . 
            $this->Source_system_device . 
            $this->Source_device_flags . 
            $this->Source_id_number .
            $this->Dest_system_device . 
            $this->Dest_id_number . 
            $this->Message_Type . 
            $this->Message_Version . 
            $this->Bay_Code . 
            $this->Transaction_Number .
            $this->Standalone_Mode . 
            $this->Load_Number . 
            $this->Number_of_keys . 
            $this->load_unload . 
            $this->end_load_on_WB . 
            $this->prompt_eqp_on_WB . 
            $this->Load_Type . 
            $this->Reject_Reason . 
            $this->Transaction_State . 
            $this->Start_Time . 
            $this->Finish_Time . 
            $this->Release_Time . 
            $this->Operator_Code .
            $this->Operator_Name . 
            $this->Drawer_Code . 
            $this->Drawer_Name . 
            $this->Tanker_Code . 
            $this->Safe_Tanker_Mass . 
            $this->Tare_Tanker_Mass . 
            $this->Tanker_Prompt . 
            $this->Drawer_Prompt_Flags;
        
        $msg_string = $msg_string . $this->Number_of_Products;
        for ($i = 0; $i < $this->Number_of_Products; ++ $i)
        {
            $msg_string = $msg_string . $this->prod_det[$i];  
        }
            
        $msg_string = $msg_string . $this->Number_of_Compartments;
        for ($i = 0; $i < $this->Number_of_Compartments; ++ $i)
        {
            $msg_string = $msg_string . $this->cmpt_det[$i];
        }
        
        $msg_string = $msg_string . $this->Number_of_Transfers;
        for ($i = 0; $i < $this->Number_of_Transfers; ++$i)
        {
            $msg_string = $msg_string . $this->trf_det[$i];
        }
        
        $msg_string = $msg_string . $this->Number_of_Meters;
        for ($i = 0; $i < (int)$this->Number_of_Meters; ++$i)
        {
            $msg_string = $msg_string . $this->mtr_det[$i];
        }
        
        $msg_string = $msg_string . 
            $this->Number_of_Equipments . 
            $this->start_weight . 
            $this->end_weight . 
            $this->complete_cur_load . "|";
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
        logMe("Try to connect to server. host:" . $host . ", port:" . $port, MANUAL_TRANSACTION);
        if (!$this->fp)
        {
            logMe("Failed to connect to server. errnum:" . $errnum . ", errstr:" . $errstr, MANUAL_TRANSACTION);
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
        $BUF_SIZE = 8192;
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

/* This is the interface */
class ManualTransactions
{
    private $db_conn;
    private $bay_code;      //Which bay this client connects to
    
    function __construct($BAY = "BAY999")
    {
        $this->bay_code = $BAY;
        $this->db_conn = DB::getInstance();
    }

    private function get_trnsid()
    {
        $sql = "SELECT BA_LAST_TRNO FROM BAY_AREA WHERE BA_CODE = '" . $this->bay_code . "'";
        $result = $this->db_conn->query($sql);
        
        return $result[0]->BA_LAST_TRNO + 1;
    }
    
    function __destruct()
    {
        
    }
    
    private function update_alternate_obj($trsa_id, $alternate)
    {
        if ($alternate == null)
            return RETURN_OK;
            
        if ($trsa_id == 0)
            return RETURN_OK;
        $sql = "UPDATE TRANSACTIONS SET TRSA_ALT_QTY = " . $alternate->qty . ", TRSA_ALT_UNT = '" . $alternate->unit . "' WHERE TRSA_ID = " . $trsa_id;
        return $this->db_conn->update($sql);
    }
    
    private function has_other_active_trip($tanker, $current_trip)
    {
        $generic_tanker_pattern = "Generic ";
        if (strncmp($tanker, $generic_tanker_pattern, strlen($generic_tanker_pattern)) == 0)
            return false;
        
        $sql = "SELECT COUNT(*) CNT FROM SCHEDULE, LOADS WHERE SHL_TANKER = '" . $tanker . "' AND SHLSLOAD_LOAD_ID = LOAD_ID
            AND LD_TERMINAL = SHLSLOAD_LD_TRM AND LOAD_DMY IS NULL";
        $result = $this->db_conn->query($sql);
        
        if ((int)$result[0]->CNT <= 0)
            return false;
        else if ((int)$result[0]->CNT > 1)
            return true;
        else
        {
            $sql = "SELECT SHLS_TRIP_NO FROM SCHEDULE, LOADS WHERE SHL_TANKER = '" . $tanker . "' AND SHLSLOAD_LOAD_ID = LOAD_ID
                AND LD_TERMINAL = SHLSLOAD_LD_TRM AND LOAD_DMY IS NULL";
            $result = $this->db_conn->query($sql);
            if ($result[0]->SHLS_TRIP_NO == $current_trip)
                return false;
            return true;
        }
        
    }
    
    private function get_trip_type($trip, $supplier)
    {
        $sql = "SELECT COUNT(SCHD_COMP_ID) CNT FROM SPECDETS WHERE SCHD_SPECQTY > 0 AND SCHDSPEC_SHLSTRIP = " . $trip 
            . " AND SCHDSPEC_SHLSSUPP = '" . $supplier . "'";
        $result = $this->db_conn->query($sql);
        if ((int)$result[0]->CNT > 0)
            return LD_TYPE::LD_PRESCHEDULE;
        
        $sql = "SELECT COUNT(*) CNT FROM SPECPROD WHERE SCHP_ORDER IS NOT NULL AND SCHPSPID_SHLSTRIP = " . $trip 
            . " AND SCHPSPID_SHLSSUPP = '" . $supplier . "'";
        $result = $this->db_conn->query($sql);
        if ((int)$result[0]->CNT > 0)
            return LD_TYPE::LD_ORDER;
            
        return LD_TYPE::LD_PREORDER;
    }
    
    /* update SCHEDULE table, set carrier and tanker with the real one.
    -1: fails
    0: no need to switch tanker
    1: successfully switched */
    private function switch_tanker($trip, $supplier, $actual_tanker, &$error_msg)
    {
        logMe("switch_tanker START. trip:" . $trip . " supplier:" . $supplier, 
            MANUAL_TRANSACTION);
        $sql = "SELECT SHL_TANKER, NVL(STATS, 'N') STATS FROM SCHEDULE WHERE SHLS_TRIP_NO = " 
            . $trip 
            . " AND SHLS_SUPP = '" 
            . $supplier . "'";
        $result = $this->db_conn->query($sql);
        
        if ($result[0]->SHL_TANKER == $actual_tanker)   /* Same tanker */
            return 0;
        else
        {
            if ($result[0]->STATS != "N")
            {
                $error_msg = "DIFFERENT TANKER FROM SCHEDULED";
                return -1;
            }
            
            $load_type = $this->get_trip_type($trip, $supplier);
            if ($load_type == LD_TYPE::LD_PRESCHEDULE)
            {
                $error_msg = "PRESCHEDULE TRIP DOES NOT SWITCH TANKER";
                return -1;
            }
            
            $sql = "UPDATE SCHEDULE SET SHLS_ORIG_TKR = SHL_TANKER, SHL_TANKER = '" . $actual_tanker . "' WHERE SHLS_TRIP_NO = " . 
                $trip . " AND SHLS_SUPP = '" . $supplier . "'";
            if ($this->db_conn->update($sql) != RETURN_OK)
            {
                $error_msg = "FAILED TO SWITCH TANKER";
                return -1;
            }
            else
                return 1;
        }
    }
    
    private function populate_openorder_personkey_info($operator, $order_no)
    {
        $sql = "SELECT ORDER_DRAWER FROM CUST_ORDER WHERE ORDER_CUST_ORDNO = " . $order_no;
        $result = $this->db_conn->query($sql);
        return sprintf("%-'-40s", $operator) . "PERSONNEL ACC TYPE   " . sprintf("%-'-16s", $result[0]->ORDER_DRAWER);
    }
    
    private function populate_personkey_info($operator, $use_accesskey = 1)
    {
        if ($use_accesskey == 1)
        {
            $sql = "SELECT KYA_TXT FROM ACCESS_KEYS WHERE KYA_PSN = '" . $operator . "'";
            $result = $this->db_conn->query($sql);
        
            $auth_key = sprintf("%-'-40s", $result[0]->KYA_TXT);
        }
        else
        {
            $auth_key = sprintf("%-'-40s", $operator);
        }
        
        return $auth_key . "PERSONNEL ACC TYPE   TOUCH_BUTTON_DEV";
    }
    
    private function populate_tankerkey_info($tanker_code, $use_accesskey = 1)
    {
        if ($use_accesskey == 1)
        {
            $sql = "SELECT KYA_TXT FROM ACCESS_KEYS WHERE KYA_TANKER = '" . $tanker_code . "'";
            $result = $this->db_conn->query($sql);
            $result[0]->KYA_TXT;
        
            $auth_key = sprintf("%-'-40s", $result[0]->KYA_TXT);
        }
        else
        {
            $auth_key = sprintf("%-'-40s", $tanker_code);
        }
        
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
    
    private function get_mvitem_type($item_Id)
    {
        $sql = "SELECT MVITM_TYPE FROM MOVEMENT_ITEMS WHERE MVITM_ITEM_ID = " . $item_Id;
        $result = $this->db_conn->query($sql);
        return $result[0]->MVITM_TYPE;
    }
    
    private function get_trip_by_nomination($item_Id)
    {
        $sql = "SELECT SHLS_TRIP_NO FROM SCHEDULE, MOV_SCHEDULES, MOVEMENT_ITEMS " . 
            "WHERE STATS = 'L' " . 
            "AND SHLS_TRIP_NO = MS_SHLSTRIP AND SHLS_SUPP = MS_SHLSSUPP " .
            "AND MS_MOVEID = MVITM_MOVE_ID AND MVITM_ITEM_ID = " 
            . $item_Id . " ORDER BY SHLS_TRIP_NO";
        $result = $this->db_conn->query($sql);
        return $result[0]->SHLS_TRIP_NO;
    }
    
    private function get_pair_trip_by_nomination($item_Id)
    {
        $sql = "SELECT SHLS_TRIP_NO, SHLS_CALDATE FROM SCHEDULE, MOV_SCHEDULES, MOVEMENT_ITEMS WHERE SHLS_CALDATE IS NOT NULL AND STATS IS NULL " . 
            "AND SHLS_TRIP_NO = MS_SHLSTRIP AND SHLS_SUPP = MS_SHLSSUPP AND MS_MOVEID = MVITM_MOVE_ID AND MVITM_ITEM_ID = " 
            . $item_Id . " ORDER BY SHLS_CALDATE DESC";
        $result = $this->db_conn->query($sql);
        return $result[0]->SHLS_TRIP_NO;
    }
    
    /* Get all the info about trip. Because manual trasaction only run on existent trip, 
    so we dont need caller to prepare all the info, we can retrieve
    the info we need */
    private function init_trip(
        $trip_number, $supplier, 
        $num_of_transfers, 
        $transfers, 
        &$drawer_Code, 
        &$drawer_name, 
        &$tanker_code, 
        &$num_of_Prod, 
        &$prods, 
        &$num_of_comp, 
        &$compartments)
    {
        logMe("init_trip START. supplier:" . 
            $supplier . ", trip_number:" . $trip_number, MANUAL_TRANSACTION);

        $sql = "SELECT SHLS_DRAWER, SHL_TANKER FROM SCHEDULE WHERE SHLS_SUPP = '" . 
            $supplier . "' AND SHLS_TRIP_NO = " . 
            $trip_number;
        $result = $this->db_conn->query($sql);
        $drawer_Code = $result[0]->SHLS_DRAWER;
        $tanker_code = $result[0]->SHL_TANKER;
        $sql = "SELECT CMPY_NAME FROM COMPANYS WHERE CMPY_CODE = '" . $drawer_Code . "'";
        $result = $this->db_conn->query($sql);
        $drawer_name = $result[0]->CMPY_NAME;
        
        $sql = "SELECT SCHPPROD_PRODCODE, SCHPPROD_PRODCMPY FROM SPECPROD WHERE SCHPSPID_SHLSSUPP = '" .
            $supplier . "' AND SCHPSPID_SHLSTRIP = " . $trip_number;
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
            $this->get_equpment_info($tanker_code, $i + 1, $eqp_code, $nr_in_eqp);
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
    private function populate_reverse_det($trip_no, $supplier)
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
        $msg->trip_no = sprintf("%09d", $trip_no);
        $msg->supplier = sprintf("%-20.20s", $supplier);
        
        return $msg->to_string();
    }
    
    private function populate_specmove_det($mlitm_id)
    {
        $msg = new SPEC_MOVE_REQ(); 
        $msg->Message_Length = "000000";                        /* Auto-calculate at the end of population */
        $msg->message_number = "0000";                          /* Fixed */
        $msg->Source_system_device = "MANUAL_SYS    ";          /* Fixed */
        $msg->Source_device_flags = "0000";                     /* Fixed */
        $msg->Source_id_number = "   ";                         /* Fixed */
        $msg->Dest_system_device = "BAI_999       ";            /* Fixed */
        $msg->Dest_id_number = "   ";                           /* Fixed */
        $msg->Message_Type = "SPEC_MOVE_REQ      ";             /* Fixed */
        $msg->Message_Version = "01.00.00";                     /* Fixed */
        $msg->mlitm_id = sprintf("%09d", $mlitm_id);
        
        return $msg->to_string();
    }
    
    private function populate_mv_schd_det($mlitm_id, $per_code, $tank_code, $schd_qty, $drawer1, $prod1, $drawer2, $prod2)
    {
        $msg = new XMOV_SCHD_REQ(); 
        $msg->Message_Length = "000000";                        /* Auto-calculate at the end of population */
        $msg->message_number = "0000";                          /* Fixed */
        $msg->Source_system_device = "MANUAL_SYS    ";          /* Fixed */
        $msg->Source_device_flags = "0000";                     /* Fixed */
        $msg->Source_id_number = "   ";                         /* Fixed */
        $msg->Dest_system_device = "BAI_999       ";            /* Fixed */
        $msg->Dest_id_number = "   ";                           /* Fixed */
        $msg->Message_Type = "MOV_SCHD_REQ       ";             /* Fixed */
        $msg->Message_Version = "01.00.00";                     /* Fixed */
        $msg->mlitm_id = sprintf("%09d", $mlitm_id);
        $msg->Operator_Code = sprintf("%-16.16s", $per_code);
        $msg->Tanker_Code = sprintf("%-20.20s", $tank_code);
        $msg->schd_qty = sprintf("%12d", $schd_qty);
        $msg->drawer1 = sprintf("%-20.20s", $drawer1);
        $msg->product_code1 = sprintf("%-16.16s", $prod1);
        $msg->drawer2 = sprintf("%-20.20s", $drawer2);
        $msg->product_code2 = sprintf("%-20.20s", $prod2);
        
        return $msg->to_string();
    }
    
    private function populate_auth_req($number_entered, $trans, $is_nomination = 0, $trans_id = 0)
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
        if ($trans_id == 0)
            $trans_id = $this->get_trnsid();
        $msg->Transaction_num = sprintf("%07d", $trans_id);
        $msg->Trip_number = sprintf("%09d", $number_entered);       /* Fixed */
        
        if ($is_nomination == 0)
        {   /* For open order, use populate_openorder_personkey_info which */
            $msg->Number_of_keys = "002" . $this->populate_openorder_personkey_info($trans->Operator_Code, $number_entered) . $this->populate_tankerkey_info($trans->Tanker_Code, 0);
            $msg->Message_Version = "91.00.00";                     /* For open order, use 91.00.00 so that baiman can recognize */
        }
        else
        {   
            $msg->Number_of_keys = "002" . $this->populate_personkey_info($trans->Operator_Code, 0) . $this->populate_tankerkey_info($trans->Tanker_Code, 0);
            $msg->Message_Version = "90.00.00";                     /* use different msg version so that baiman use a different way to handle key info */
        }
        
        $msg->Load_type = "T";                                  /* Fixed */
        $msg->complete_pre_load = "F";                          /* Fixed */
        
        return $msg->to_string();
    }
    
    private function isPreOrderSchedule ($supp, $trip_no)
    {        
        $sql = "SELECT LD_TYPE FROM GUI_SCHEDULES WHERE SUPPLIER_CODE='$supp' AND SHLS_TRIP_NO='$trip_no' UNION SELECT LD_TYPE FROM GUI_NOM_SCHEDULES WHERE SUPPLIER_CODE='$supp' AND SHLS_TRIP_NO='$trip_no'";
        $rows_schd_type = $this->db_conn->query($sql);
        $rtn = "NO";
        if(strtoupper($rows_schd_type[0]->LD_TYPE) == "PREORDER")
        {
            $rtn = "YES";
        }
        else
        {
            $rtn = "NO";
        }
        return $rtn;
    }
    
    private function populate_transa_det(
        $order_number, 
        $para_trans, 
        $num_of_transfers, 
        $transfers, 
        $is_nomination = 0, 
        $auto_complete = "F", 
        &$trans_id = 0)
    {
        logMe("populate_transa_det START. order_number:" . $order_number, MANUAL_TRANSACTION);
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
        if ($trans_id == 0)
            $trans_id = $this->get_trnsid();
        $msg->Transaction_Number = sprintf("%07d", $trans_id);   /* Get it from parameter*/
        //$msg->Standalone_Mode = "OBP   ";                       /* Fixed, stand-alone */
        $msg->Standalone_Mode = "OMEGA ";                       /* Fixed, still use operator mode */
        $msg->Load_Number = sprintf("%09d", $para_trans->Load_Number);       /* Get it from parameter */
        $msg->Number_of_keys = "000";                           /* Fixed, always set it 0 */
        $msg->load_unload = "T";                                /* TODO: load/unload ? */
        $msg->end_load_on_WB = "F";                             /* Fixed */
        $msg->prompt_eqp_on_WB = "F";                           /* Fixed */
        $msg->Load_Type = "LD_CUST_ORDER   ";                   /* TODO: load type */
        $msg->Reject_Reason = "                      ";         /* Fixed */
        $msg->Transaction_State = "        ";                   /* Fixed */
        $msg->Start_Time = $para_trans->Start_Time; /* Get it from parameter, start time, sample: "01.03.201312:28:43" */
        $msg->Finish_Time = $para_trans->Finish_Time; /* Get it from parameter, end time, sample: "01.03.201312:32:02" */
        $msg->Release_Time = "                  ";              /* Fixed */
        $msg->Operator_Code = sprintf("%-16.16s", $para_trans->Operator_Code); /* Get it from parameter, sample: "LEOMCA          " */
        $msg->Operator_Name = sprintf("%-50.50s", $this->get_operator_name($para_trans->Operator_Code));
        
        $schedule_id = 0;
        if ($order_number == 0)
            $schedule_id = $para_trans->Load_Number;
        else if ($is_nomination == 0)
            $schedule_id = $this->get_trip_by_order($order_number);
        else
            $schedule_id = $this->get_trip_by_nomination($order_number);
        $this->init_trip($schedule_id, $para_trans->Supplier, $num_of_transfers, $transfers, $drawer_code, $drawer_name, $tanker_Code, $num_of_product, $para_prod, $num_of_compartment, $compartments);
        
        $msg->Drawer_Code = sprintf("%-16.16s", $drawer_code);     /* Get it from parameter */
        $msg->Drawer_Name = sprintf("%-50.50s", $drawer_name);     /* Get it from parameter */
        $msg->Tanker_Code = sprintf("%-20.20s", $tanker_Code);     /* Get it from parameter */
        if ($this->isPreOrderSchedule($para_trans->Supplier, $schedule_id) == "YES")
        {
            $sql_vet = "SELECT C.CMPY_VET FROM COMPANYS C WHERE C.CMPY_CODE='" . 
                $para_trans->Supplier. "'";
            $rows_vet = $this->db_conn->query($sql_vet);
            if ($rows_vet[0]->CMPY_VET != 1 && 
                $rows_vet[0]->CMPY_VET != 2 && 
                $rows_vet[0]->CMPY_VET != 3) 
            {
                $msg->Tanker_Code = sprintf("%-20.20s", $para_trans->Tanker_Code);
            }
        }
        
        $msg->Safe_Tanker_Mass = "            ";                /* Fixed */
        $msg->Tare_Tanker_Mass = "            ";                /* Fixed */
        $msg->Tanker_Prompt = "                    ";           /* Fixed */
        $msg->Drawer_Prompt_Flags = "0125";                     /* Fixed */
        
        /* Baiman uses product info to call mk_specprod, and it only needs product_code */
        $msg->Number_of_Products = sprintf("%03d", $num_of_product);    
        for ($i = 0; $i < $num_of_product; ++ $i)
        {
            $msg->prod_det[$i] = new XPROD();
            $msg->prod_det[$i]->is_base_product = "F";          /* Fixed */
            $msg->prod_det[$i]->drawer_code = 
                sprintf("%-8.8s", $para_prod[$i]->drawer_code); 
            $msg->prod_det[$i]->product_code = 
                sprintf("%-10.10s", $para_prod[$i]->product_code);
        }
        
        $msg->Number_of_Compartments = sprintf("%03d", $num_of_compartment);
        for ($i = 0; $i < $num_of_compartment; ++ $i)
        {
            $msg->cmpt_det[$i] = new XCMPT();
            $msg->cmpt_det[$i]->eqp_cd = 
                sprintf("%-20.20s", $compartments[$i]->eqp_cd); /* Get it from parameter */
            $msg->cmpt_det[$i]->nr_in_eqp = 
                sprintf("%02d", $compartments[$i]->nr_in_eqp);   /* Get it from parameter, sample: "01" */
            $msg->cmpt_det[$i]->nr_in_tkr = 
                sprintf("%02d", $compartments[$i]->nr_in_tkr);   /* Get it from parameter, sample: "01" */
            $msg->cmpt_det[$i]->Volume_Safe_Fill_Limit = 
                "000077500000";    /* Fixed, set it a big number */
            $msg->cmpt_det[$i]->Mass_Limit = "            ";                /* Fixed */
            $msg->cmpt_det[$i]->Volume_Capacity = "000090000000"; /* Fixed, set it a big number */
            
            /* This product info will be used in mk_specdets() in baiman */
            $msg->cmpt_det[$i]->prod_def = new XPD();
            $msg->cmpt_det[$i]->prod_def->is_base_product = "F";        /* TODO: Fixed */
            $msg->cmpt_det[$i]->prod_def->drawer_code = sprintf("%-8.8s", $compartments[$i]->sched_drawer_code);      /* Get it from parameter, sample: "1001    " */
            $msg->cmpt_det[$i]->prod_def->product_code = sprintf("%-10.10s", $compartments[$i]->sched_prod_code);   /* Get it from parameter, sample: "200001735 " */
            
            /* preload quantity */
            $msg->cmpt_det[$i]->asmx = new XASM();
            $msg->cmpt_det[$i]->asmx->amb_vol = 
                sprintf("%012d", $compartments[$i]->preload_amb_vol);
            $msg->cmpt_det[$i]->asmx->cor_vol = 
                sprintf("%012d", $compartments[$i]->preload_cor_vol);
            $msg->cmpt_det[$i]->asmx->liq_kg = 
                sprintf("%012d", $compartments[$i]->preload_liq_kg);
            
            $msg->cmpt_det[$i]->Nr_of_Drums_Specified = "00000";            /* Fixed */
            
            $msg->cmpt_det[$i]->prod_class1 = new XPC();                    /* Unloading */
            
            $msg->cmpt_det[$i]->hybrid_loading = "F";   /* Fixed, weight-bridge only */
         
            $msg->cmpt_det[$i]->prod_def2 = new XPD();
            
            $msg->cmpt_det[$i]->asm2 = new XASM(); /* Fixed, weight-bridge only */
            
            $msg->cmpt_det[$i]->prod_class2 = new XPC();                    /* Fixed, preloaded */
            
            $msg->cmpt_det[$i]->temps1 = new XTEMPS();                      /* Fixed, preloaded */
            
            $msg->cmpt_det[$i]->asm3 = new XASM();                          /* Fixed, preloaded */
            
            $msg->cmpt_det[$i]->NrBases1 = "000";                           /* Fixed, preloaded base qtys */
            
            /* Baiman never uses the info below, so do not need to set them. */
            $msg->cmpt_det[$i]->Nr_of_Preloaded_Drums = "00000";            /* Fixed */
            
            $msg->cmpt_det[$i]->prod_class3 = new XPC();    /* loaded product */
            
            $msg->cmpt_det[$i]->temps2 = new XTEMPS();  /* loaded product temperature */
            $msg->cmpt_det[$i]->temps2->Temperature = "+01450"; /* TODO: temp */
            $msg->cmpt_det[$i]->temps2->Average_Temperature = "+01450"; /* TODO: average temp */
            
            $msg->cmpt_det[$i]->asm4 = new XASM(); /* loaded proudct quantity */
            
            for ($j = 0; $j < $num_of_transfers; ++ $j) /* Find right data to fill in */
            {
                if ($transfers[$j]->nr_in_tkr == $i + 1)
                {
                    $msg->cmpt_det[$i]->asm4->amb_vol = sprintf("%012d", $transfers[$i]->amb_vol);;
                    $msg->cmpt_det[$i]->asm4->cor_vol = sprintf("%012d", $transfers[$i]->cor_vol);;
                    $msg->cmpt_det[$i]->asm4->liq_kg = sprintf("%012d", $transfers[$i]->liq_kg);;
                    break;
                }
            }
            
            $msg->cmpt_det[$i]->NrBases2 = "000";   /* TODO: loaded base product, set it to 000, cause it is not used in baiman */
            for ($j = 0; $j < $msg->cmpt_det[$i]->NrBases2; ++$j)
            {
                $msg->cmpt_det[$i]->qty2[$j] = new XQTY();
                $msg->cmpt_det[$i]->qty2[$j]->pd = new XPD();
                $msg->cmpt_det[$i]->qty2[$j]->pd->is_base_product = "T";            /* TODO */
                $msg->cmpt_det[$i]->qty2[$j]->pd->product_code = "200001735 ";      /* TODO */    
                $msg->cmpt_det[$i]->qty2[$j]->prod_class = new XPC();
                
                $msg->cmpt_det[$i]->qty2[$j]->temps = new XTEMPS();
                $msg->cmpt_det[$i]->qty2[$j]->temps->Temperature = "+01450";        /* TODO */
                $msg->cmpt_det[$i]->qty2[$j]->temps->Average_Temperature = "+01450";/* TODO */

                $msg->cmpt_det[$i]->qty2[$j]->asmx = new XASM();
            }
            
            $msg->cmpt_det[$i]->prod_class4 = new XPC();                    /* Always blank */
            
            $msg->cmpt_det[$i]->temps3 = new XTEMPS();                      /* Always blank */
            
            $msg->cmpt_det[$i]->asm5 = new XASM();                          /* Always zero */
            
            $msg->cmpt_det[$i]->NrBases3 = "000";                           /* Always zero */
            $msg->cmpt_det[$i]->Nr_of_Loaded_Drums = "00000";
            $msg->cmpt_det[$i]->Prompt_Flags = "0194";                      /* TODO */
        }
        
        $total_meters = 0;
        $meter_array = array();
        $msg->Number_of_Transfers = sprintf("%03d", $num_of_transfers);    
        for ($i = 0; $i < $num_of_transfers; ++$i)
        {
            $msg->trf_det[$i] = new XTRF_DET();
            $msg->trf_det[$i]->Transfer_Number = sprintf("%06d", $i + 1); 
            $msg->trf_det[$i]->Arm_Code = sprintf("%-6.6s", $transfers[$i]->Arm_Code); 
            $msg->trf_det[$i]->Device_Code = "                ";     /* Sample: "BAY01           " */
            $msg->trf_det[$i]->eqp_cd = "                    ";     /* Fixed */
            $msg->trf_det[$i]->nr_in_eqp = "  ";                    /* Blank */
            $msg->trf_det[$i]->nr_in_tkr = sprintf("%02d", $transfers[$i]->nr_in_tkr);    
            
            $msg->trf_det[$i]->pdx = new XPD();                     /* tranfers product */
            $msg->trf_det[$i]->pdx->is_base_product = "F";              /* Always "F" */
            $msg->trf_det[$i]->pdx->drawer_code = 
                sprintf("%-8.8s", $transfers[$i]->drawer_code);     /* Sample: "1001    " */
            $msg->trf_det[$i]->pdx->product_code = 
                sprintf("%-10.10s", $transfers[$i]->product_code);  /* Sample: "200001735 " */
            
            $msg->trf_det[$i]->pdy = new XPD();                     /* Seems repeat pdx */
            $msg->trf_det[$i]->pdy->is_base_product = $msg->trf_det[$i]->pdx->is_base_product;
            $msg->trf_det[$i]->pdy->drawer_code = $msg->trf_det[$i]->pdx->drawer_code;
            $msg->trf_det[$i]->pdy->product_code = $msg->trf_det[$i]->pdx->product_code;
            
            $msg->trf_det[$i]->asmx = new XASM();                   /* Baiman does not use this part */
            
            $msg->trf_det[$i]->Nr_of_Drums = "     ";               /* Always blank */
            $msg->trf_det[$i]->prod_class = new XPC();       
            
            /* Sample: "GASOLINE"*/
            $msg->trf_det[$i]->prod_class->prod_class = "        "; 
            $msg->trf_det[$i]->prod_class->dens = 
                sprintf("%07d", $transfers[$i]->dens); /* Sample: "0735300"*/
            
            $msg->trf_det[$i]->temps = new XTEMPS();
            $msg->trf_det[$i]->temps->Temperature = sprintf("%+06d", $transfers[$i]->Temperature);
            
            $msg->trf_det[$i]->asm2 = new XASM();
            $msg->trf_det[$i]->asm2->amb_vol = 
                sprintf("%012d", $transfers[$i]->amb_vol);    /* Sample: "000001010000"*/
            $msg->trf_det[$i]->asm2->cor_vol = 
                sprintf("%012d", $transfers[$i]->cor_vol);    /* Sample: "000001011000"*/
            $msg->trf_det[$i]->asm2->liq_kg = 
                sprintf("%012d", $transfers[$i]->liq_kg);      /* Sample: "000000743000"*/
            
            $msg->trf_det[$i]->prod_class1 = new XPC();     /* Always blank */
            
            $msg->trf_det[$i]->temps2 = new XTEMPS();   /* Always blank */
            
            $msg->trf_det[$i]->asm3 = new XASM();   /* Always blank */
            $msg->trf_det[$i]->asm3->amb_vol = "            ";
            $msg->trf_det[$i]->asm3->cor_vol = "            ";
            $msg->trf_det[$i]->asm3->liq_kg = "            ";
            
            $msg->trf_det[$i]->Number_of_Meters = sprintf("%03d", $transfers[$i]->num_of_meter);
            for ($j = 0; $j < $transfers[$i]->num_of_meter; ++$j)
            {
                $msg->trf_det[$i]->mtr_det[$j] = new XMTR_DET();
                // logMe($transfers[$i]->meters[$j]->Injector_or_Meter, 'WHATISTHIS');
                $msg->trf_det[$i]->mtr_det[$j]->Injector_or_Meter = 
                    $transfers[$i]->meters[$j]->Injector_or_Meter;     
                $msg->trf_det[$i]->mtr_det[$j]->Meter_Injector_Code =
                    sprintf("%-16.16s", $transfers[$i]->meters[$j]->Meter_Injector_Code); 
                
                $msg->trf_det[$i]->mtr_det[$j]->pd = new XPD();                 /* Always blank */
                
                $msg->trf_det[$i]->mtr_det[$j]->prod_class = new XPC();
                
                $msg->trf_det[$i]->mtr_det[$j]->temps = new XTEMPS();
                
                $msg->trf_det[$i]->mtr_det[$j]->asmx = new XASM(); /* Baiman never uses this part */
                $msg->trf_det[$i]->mtr_det[$j]->asmx->amb_vol = 
                    "000001010000"; /* Fixed, set it as the sample gives */
                $msg->trf_det[$i]->mtr_det[$j]->asmx->cor_vol = 
                    "000001011000"; /* Fixed, set it as the sample gives */
                $msg->trf_det[$i]->mtr_det[$j]->asmx->liq_kg = 
                    "000000743000"; /* Fixed, set it as the sample gives */
                
                $msg->trf_det[$i]->mtr_det[$j]->asm2 = new XASM();
                $msg->trf_det[$i]->mtr_det[$j]->asm2->amb_vol = 
                    sprintf("%012d", $transfers[$i]->meters[$j]->open_amb); /* Sample: "001916174000" */
                $msg->trf_det[$i]->mtr_det[$j]->asm2->cor_vol = 
                    sprintf("%012d", $transfers[$i]->meters[$j]->open_cor); /* Sample: "001920110000" */
                $msg->trf_det[$i]->mtr_det[$j]->asm2->liq_kg = 
                    sprintf("%012d", $transfers[$i]->meters[$j]->open_kg); /* Sample: "001450833000" */
                
                $msg->trf_det[$i]->mtr_det[$j]->asm3 = new XASM();
                $msg->trf_det[$i]->mtr_det[$j]->asm3->amb_vol = 
                    sprintf("%012d", $transfers[$i]->meters[$j]->close_amb); /* Sample: "001917184000" */
                $msg->trf_det[$i]->mtr_det[$j]->asm3->cor_vol = 
                    sprintf("%012d", $transfers[$i]->meters[$j]->close_cor); /* Sample: "001921120000" */
                $msg->trf_det[$i]->mtr_det[$j]->asm3->liq_kg = 
                    sprintf("%012d", $transfers[$i]->meters[$j]->close_kg); /* Sample: "001451576000" */
                
                $msg->trf_det[$i]->mtr_det[$j]->Start_Mass = "            ";            /* Always blank */
                $msg->trf_det[$i]->mtr_det[$j]->End_Mass = "            ";              /* Always blank */
                
                /* copy the meter info into a structre to use later */
                $existed = false;
                for ($k = 0; $k < $total_meters; ++ $k)
                {
                    if ($meter_array[$k]['Meter_Injector_Code'] == $msg->trf_det[$i]->mtr_det[$j]->Meter_Injector_Code)
                    {
                        $meter_array[$k]['open_amb'] = ((int)$meter_array[$k]['open_amb'] < (int)$msg->trf_det[$i]->mtr_det[$j]->asm2->amb_vol) ? 
                            $meter_array[$k]['open_amb'] : $msg->trf_det[$i]->mtr_det[$j]->asm2->amb_vol;
                        $meter_array[$k]['open_cor'] = ((int)$meter_array[$k]['open_cor'] < (int)$msg->trf_det[$i]->mtr_det[$j]->asm2->cor_vol) ? 
                            $meter_array[$k]['open_cor'] : $msg->trf_det[$i]->mtr_det[$j]->asm2->cor_vol;
                        $meter_array[$k]['open_kg'] = ((int)$meter_array[$k]['open_kg'] < (int)$msg->trf_det[$i]->mtr_det[$j]->asm2->liq_kg) ? 
                            $meter_array[$k]['open_kg'] : $msg->trf_det[$i]->mtr_det[$j]->asm2->liq_kg;
                        $meter_array[$k]['close_amb'] = ((int)$meter_array[$k]['close_amb'] > (int)$msg->trf_det[$i]->mtr_det[$j]->asm3->amb_vol) ? 
                            $meter_array[$k]['close_amb'] : $msg->trf_det[$i]->mtr_det[$j]->asm3->amb_vol;
                        $meter_array[$k]['close_cor'] = ((int)$meter_array[$k]['close_cor'] > (int)$msg->trf_det[$i]->mtr_det[$j]->asm3->cor_vol) ? 
                            $meter_array[$k]['close_cor'] : $msg->trf_det[$i]->mtr_det[$j]->asm3->cor_vol;
                        $meter_array[$k]['close_kg'] = ((int)$meter_array[$k]['close_kg'] > (int)$msg->trf_det[$i]->mtr_det[$j]->asm3->liq_kg) ? 
                            $meter_array[$k]['close_kg'] : $msg->trf_det[$i]->mtr_det[$j]->asm3->liq_kg;
                        $existed = true;
                    }
                }
                
                if ($existed == false)
                {
                    
                    $meter_array[$total_meters]['Injector_or_Meter'] = $msg->trf_det[$i]->mtr_det[$j]->Injector_or_Meter;
                    $meter_array[$total_meters]['Meter_Injector_Code'] = $msg->trf_det[$i]->mtr_det[$j]->Meter_Injector_Code;
                    $meter_array[$total_meters]['open_amb'] = $msg->trf_det[$i]->mtr_det[$j]->asm2->amb_vol;
                    $meter_array[$total_meters]['open_cor'] = $msg->trf_det[$i]->mtr_det[$j]->asm2->cor_vol;
                    $meter_array[$total_meters]['open_kg'] = $msg->trf_det[$i]->mtr_det[$j]->asm2->liq_kg;
                    $meter_array[$total_meters]['close_amb'] = $msg->trf_det[$i]->mtr_det[$j]->asm3->amb_vol;
                    $meter_array[$total_meters]['close_cor'] = $msg->trf_det[$i]->mtr_det[$j]->asm3->cor_vol;
                    $meter_array[$total_meters]['close_kg'] = $msg->trf_det[$i]->mtr_det[$j]->asm3->liq_kg;
                    $total_meters ++;
                }
            }
            
            $msg->trf_det[$i]->Number_of_Bases = sprintf("%03d", $transfers[$i]->Number_of_Bases);       
            for ($j = 0; $j < $transfers[$i]->Number_of_Bases; ++$j)
            {
                $msg->trf_det[$i]->base[$j] = new XBASE();
                $msg->trf_det[$i]->base[$j]->Tank_Code = 
                    sprintf("%-16.16s", $transfers[$i]->bases[$j]->Tank_Code); 

                $msg->trf_det[$i]->base[$j]->pd = new XPD();
                $msg->trf_det[$i]->base[$j]->pd->is_base_product = "T";         /* Fixed */
                $msg->trf_det[$i]->base[$j]->pd->product_code = 
                    sprintf("%-10.10s", $transfers[$i]->bases[$j]->product_code); 
        
                $msg->trf_det[$i]->base[$j]->prod_class = new XPC();
                $msg->trf_det[$i]->base[$j]->prod_class->prod_class = 
                    sprintf("%-8.8s", $transfers[$i]->bases[$j]->prod_class); /* Sample: "GASOLINE"*/
                $msg->trf_det[$i]->base[$j]->prod_class->dens = 
                    sprintf("%07d", $transfers[$i]->bases[$j]->dens); /* Sample: "0735300"*/

                $msg->trf_det[$i]->base[$j]->temps = new XTEMPS();
                $msg->trf_det[$i]->base[$j]->temps->Temperature = 
                    sprintf("%+06d",  $transfers[$i]->bases[$j]->Temperature); /* Sample: "+01450"*/
                
                $msg->trf_det[$i]->base[$j]->asmx = new XASM();
                $msg->trf_det[$i]->base[$j]->asmx->amb_vol = 
                    sprintf("%012d", $transfers[$i]->bases[$j]->amb_vol); /* Sample: "000001010000" */
                $msg->trf_det[$i]->base[$j]->asmx->cor_vol = 
                    sprintf("%012d", $transfers[$i]->bases[$j]->cor_vol); /* Sample: "000001011000" */
                $msg->trf_det[$i]->base[$j]->asmx->liq_kg = 
                    sprintf("%012d", $transfers[$i]->bases[$j]->liq_kg); /* Sample: "000000743000" */
            }
            
            $msg->trf_det[$i]->Start_Mass = "            ";         /* Always blank */
            $msg->trf_det[$i]->End_Mass = "            ";           /* Always blank */
            $msg->trf_det[$i]->Was_Anything_Recycled = "F";         /* TODO */
        }
        
        /* because $msg->mtr_det is the duplicate of $msg->trf_det[$i]->Number_of_Meters, use it here so 
        that caller does not need to prepare an extra parameter */
        $msg->Number_of_Meters = sprintf("%03d", $total_meters);
        for ($i = 0; $i < $total_meters; ++$i)
        {
            $msg->mtr_det[$i] = new XMTR_DET();
            $msg->mtr_det[$i]->Injector_or_Meter = $meter_array[$i]['Injector_or_Meter']; 
            $msg->mtr_det[$i]->Meter_Injector_Code = $meter_array[$i]['Meter_Injector_Code'];
            
            $msg->mtr_det[$i]->pd = new XPD();                 /* Always blank */
            
            $msg->mtr_det[$i]->prod_class = new XPC();
            
            $msg->mtr_det[$i]->temps = new XTEMPS();
            
            $msg->mtr_det[$i]->asmx = new XASM();                      /* Baiman never uses this part */
            $msg->mtr_det[$i]->asmx->amb_vol = "000001010000";         /* Fixed */
            $msg->mtr_det[$i]->asmx->cor_vol = "000001011000";         /* Fixed */
            $msg->mtr_det[$i]->asmx->liq_kg = "000000743000";          /* Fixed */
            
            $msg->mtr_det[$i]->asm2 = new XASM();
            $msg->mtr_det[$i]->asm2->amb_vol = $meter_array[$i]['open_amb'];
            $msg->mtr_det[$i]->asm2->cor_vol = $meter_array[$i]['open_cor'];
            $msg->mtr_det[$i]->asm2->liq_kg = $meter_array[$i]['open_kg'];
            
            $msg->mtr_det[$i]->asm3 = new XASM();
            $msg->mtr_det[$i]->asm3->amb_vol = $meter_array[$i]['close_amb'];
            $msg->mtr_det[$i]->asm3->cor_vol = $meter_array[$i]['close_cor'];
            $msg->mtr_det[$i]->asm3->liq_kg = $meter_array[$i]['close_kg'];
            
            /* In the message definition, the meter structure inside transfer 
            has start and end mass, but the meter structure 
            inside XTRANSAC_DET level does not have these 2 fields, so they are both set "" */
            $msg->mtr_det[$i]->Start_Mass = "";                         
            $msg->mtr_det[$i]->End_Mass = ""; 
        }
        
        $msg->Number_of_Equipments = "000";             /* Fixed, this is only for weight-bridge */
        $msg->start_weight = "            ";            /* Fixed */
        $msg->end_weight = "            ";              /* Fixed */
        $msg->complete_cur_load = $auto_complete;
        
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
    
    /* Entrance of nomination manual transaction */
    function do_nomination($mv_item_id, 
        $para_trans, 
        $num_of_transfers, 
        $transfers, 
        $from = null, 
        $to = null, 
        $alt_obj = null)
    {
        logMe("do_nomination START. mv_item_id:" . $mv_item_id, MANUAL_TRANSACTION);
        $result_detail = new stdClass();

        $trans_id = $this->get_trnsid();
        $auth_req = $this->populate_auth_req($mv_item_id, $para_trans, 1, $trans_id);
        $client = new socket_client($this->bay_code);
        $client->send($auth_req);
        $response = $client->get_repond();
        
        // logMe("Auth response:" . $response, MANUAL_TRANSACTION);
        if ($response == "")
        {
            $result_detail->result_code = -1;
            $result_detail->result_string = "Failed to connect to virtual bay";
            return $result_detail;
        }
        else if (strpos($response, "AUTH FAILED") !== false)
        {
            $result_detail->result_code = -1;
            $result_detail->result_string = substr($response, 12);
            return $result_detail;
        }
        else if (substr_compare($response, "OBP_AUTH_SPEC", 48, 13) != 0)
        {
            $result_detail->result_code = -1;
            $result_detail->result_string = substr($response, 82, 22);
            return $result_detail;
        }
        
        define('MV_RECEIPT', 0);
        define('MV_DISPOSAL', 1);
        define('MV_TRANSFER', 2);

        $para_trans->Load_Number = $this->get_trip_by_nomination($mv_item_id);
        
        $mvitem_type = $this->get_mvitem_type($mv_item_id);
        logMe("Nomination type is:" . $mvitem_type, MANUAL_TRANSACTION);
        if ($mvitem_type == MV_DISPOSAL)
        {
            if ($from)
            {
                if ($from->tank)
                    $transfers[0]->bases[0]->Tank_Code = $from->tank;
                $para_trans->Supplier = $from->supplier;
                $para_trans->Drawer_Code = $from->supplier;
                $transfers[0]->drawer_code = $from->supplier;
                $transfers[0]->product_code = $from->prod;
            }
        }
        else if ($mvitem_type == MV_RECEIPT)
        {
            if ($to)
            {
                $transfers[0]->bases[0]->Tank_Code = $to->tank;
                $para_trans->Supplier = $to->supplier;
                $para_trans->Drawer_Code = $to->supplier;
                $transfers[0]->drawer_code = $to->supplier;
                $transfers[0]->product_code = $to->prod;
            }
        }
        else if ($mvitem_type == MV_TRANSFER)
        {   
            if ($to)    
            {
                /* If it is transfer, handle unloading first. 
                This is consistent with baiman, because for transfer, 
                baiman handles unloading first */
                $transfers[0]->bases[0]->Tank_Code = $to->tank;
                $para_trans->Supplier = $to->supplier;
                $para_trans->Drawer_Code = $to->supplier;
                $transfers[0]->drawer_code = $to->supplier;
                $transfers[0]->product_code = $to->prod;
            }
        }
        
        $tran_det = $this->populate_transa_det(0, 
            $para_trans, 
            $num_of_transfers, 
            $transfers, 
            $is_nomination, 
            "T", 
            $trans_id);
        $client->send($tran_det);
        $response = $client->get_repond();
        logMe("Response:" . $response, MANUAL_TRANSACTION);
        if ($response == "" || substr_compare($response, "OK", 75, 2) != 0) 
        {
            $result_detail->result_code = -1;
            $result_detail->result_string = "DATABASE STORAGE ERROR";
            return $result_detail;
        }
        
        /* For transfer, there are 2 active trips, so do an extra populate_transa_det */
        $trans_id2 = 0;
        if ($this->get_mvitem_type($mv_item_id) == MV_TRANSFER)
        {
            $para_trans->Load_Number = $this->get_pair_trip_by_nomination($mv_item_id);
            if ($from)
            {
                if ($from->tank)
                    $transfers[0]->bases[0]->Tank_Code = $from->tank;
                $para_trans->Supplier = $from->supplier;
                $para_trans->Drawer_Code = $from->supplier;
                $transfers[0]->drawer_code = $from->supplier;
                $transfers[0]->product_code = $from->prod;
            }
            $tran_det = $this->populate_transa_det(0, $para_trans, $num_of_transfers, $transfers, $is_nomination, "T", $trans_id2);
            $client->send($tran_det);
            $response = $client->get_repond();
        }

        if (substr_compare($response, "OK", 75, 2) == 0)   //Once it's created, the stored file can be deleted (if do_save() has once been called)
        {
            // commented out for testing $this->unlink_serialized($para_trans->Transaction_Number);
            $result_detail->result_code = 0;
            $result_detail->result_string = "Manual Transaction successfully submitted";
            
            /* Update alternate quantity */
            if ($this->update_alternate_obj($trans_id, $alt_obj) == RETURN_OK &&
                $this->update_alternate_obj($trans_id2, $alt_obj) == RETURN_OK)
            {
                if ($para_trans->Login_User)
                {
                    $sql = "UPDATE SCHEDULE SET OPERATOR = '" . $para_trans->Login_User . "' , LAST_CHG_TIME = SYSDATE WHERE SHLSLOAD_LOAD_ID = (SELECT TRSALDID_LOAD_ID FROM TRANSACTIONS WHERE TRSA_ID=" . $trans_id . ")";
                    if ($this->db_conn->update($sql) == RETURN_OK)
                    {
                        $sql = "UPDATE TRANSACTIONS SET TRSA_PSN = '" . $para_trans->Login_User . "' WHERE TRSA_ID = " . $trans_id;
                        if ($this->db_conn->update($sql) != RETURN_OK)
                        {   
                            logMe("Failed to execute: " . $sql, MANUAL_TRANSACTION);
                            $this->db_conn->rollback();
                        }
                            
                        if ($trans_id2 != 0)
                        {
                            $sql = "UPDATE TRANSACTIONS SET TRSA_PSN = '" . $para_trans->Login_User . "' WHERE TRSA_ID = " . $trans_id2;
                            if ($this->db_conn->update($sql) != RETURN_OK)
                            {
                                logMe("Failed to execute: " . $sql, MANUAL_TRANSACTION);
                                $this->db_conn->rollback();
                            }
                            else
                                $this->db_conn->commit();
                        }
                    }
                    else
                    {
                        logMe("Failed to execute: " . $sql, MANUAL_TRANSACTION);
                        $this->db_conn->rollback();
                    }
                }
            }
            else
                $this->db_conn->rollback();
        }
        else
        {
            $result_detail->result_code = -1;
            $result_detail->result_string = "DATABASE STORAGE ERROR";
        }
        return $result_detail;
    }
    
    function do_monination_item($nomi_id, $para_trans, $num_of_transfers, $transfers)
    {
        $nomi_type = $this->get_nomi_type($nomi_id);
        define('MV_RECEIPT', 0);
        define('MV_DISPOSAL', 1);
        define('MV_TRANSFER', 2);
        $split_type = (($special_type == MV_TRANSFER || $special_type == MV_DISPOSAL) ? MV_DISPOSAL : MV_RECEIPT);
        
        if ($this->initial_speicalmovement($split_type, $mlitm_id, $amb, $cor, $kg, $temp, $dens, $drawer, $prod, $tank, $start, $end) != 0)
        {
            $result_detail->result_code = -1;
            $result_detail->result_string = "WRONG SCHEDULE";
            return $result_detail;
        }
    }
    
    function do_create($order_number, 
        $para_trans, 
        $num_of_transfers, 
        $transfers, 
        $is_nomination = 0, 
        $auto_complete = "F", 
        $trans_id = 0)
    {
        logMe("do_create START. Load_Number:" . 
            $para_trans->Load_Number . "Supplier:" .
            $para_trans->Supplier, MANUAL_TRANSACTION);

        $result_detail = new stdClass();
        if ($order_number != 0)
        {   /* Open order loading */
            $trans_id = $this->get_trnsid();
            /* 1. auth */
            $auth_req = $this->populate_auth_req($order_number, $para_trans, $is_nomination, $trans_id);
            $client = new socket_client($this->bay_code);
            $client->send($auth_req);
            $response = $client->get_repond();
            
            if ($response == "" || 
                strpos($response, "AUTH FAILED") !== false ||
                substr_compare($response, "OBP_AUTH_SPEC", 48, 13) != 0)
            {
                $result_detail->result_code = -1;
                $result_detail->result_string = $response;
                return $result_detail;
            }    
            /* 2. Trasaction dets*/
            $tran_det = $this->populate_transa_det(
                $order_number, 
                $para_trans, 
                $num_of_transfers, 
                $transfers, 
                $is_nomination, 
                $auto_complete, $trans_id);
            $client->send($tran_det);
            $response = $client->get_repond();
            
            if (substr_compare($response, "OK", 75, 2) == 0)   
            {   
                //Once it's created, the stored file can be deleted (if do_save() has once been called)
                // commented out for testing $this->unlink_serialized($para_trans->Transaction_Number);
                logMe("populate_transa_det returns OK", MANUAL_TRANSACTION);
                $result_detail->result_code = 0;
                $result_detail->result_string = "Manual Transaction successfully submitted";
                
                if ($para_trans->Login_User)
                {
                    $sql = "UPDATE SCHEDULE SET OPERATOR = '" . $para_trans->Login_User . "' , LAST_CHG_TIME = SYSDATE WHERE SHLSLOAD_LOAD_ID = (SELECT TRSALDID_LOAD_ID FROM TRANSACTIONS WHERE TRSA_ID=" . $trans_id . ")";
                    if ($this->db_conn->update($sql) == RETURN_OK)
                    {
                        $sql = "UPDATE TRANSACTIONS SET TRSA_PSN = '" . $para_trans->Login_User . "' WHERE TRSA_ID = " . $trans_id;
                        if ($this->db_conn->update($sql) == RETURN_OK)
                        {
                            $sql = "UPDATE LOADS SET LD_SEAL_NO = '" . $para_trans->Seal_Range .
                                "' WHERE LOAD_ID = (SELECT TRSALDID_LOAD_ID FROM
                                 TRANSACTIONS WHERE TRSA_ID = " . $trans_id . ")";

                            if ($this->db_conn->update($sql) != RETURN_OK)
                            {
                                logMe("SQL fails:" . $sql, MANUAL_TRANSACTION);
                            }

                            $sql = "SELECT SHLS_TRIP_NO, SHLS_SUPP " .  
                                "FROM  TRANSACTIONS, SCHEDULE " .
                                "WHERE SHLSLOAD_LOAD_ID = TRSALDID_LOAD_ID AND TRSA_ID = $trans_id";
                            // logMe($sql, MANUAL_TRANSACTION);
                            $rows = $this->db_conn->query($sql);
                            
                            $trip = $rows[0]->SHLS_TRIP_NO;
                            $supplier = $rows[0]->SHLS_SUPP;

                            $sql = "UPDATE SCHEDULE SET SHLS_SEAL_NO = '" .
                                $para_trans->Seal_Range . "' WHERE SHLS_TRIP_NO = " .
                                $trip . " AND SHLS_SUPP = '" . $supplier . "'";
                            if ($this->db_conn->update($sql) != RETURN_OK)
                            {
                                logMe("SQL fails:" . $sql, MANUAL_TRANSACTION);
                            }

                            $sql = "DELETE FROM SEAL " . 
                                "WHERE SEALSPEC_SHLSTRIP = $trip " .
                                "AND SEALSPEC_SHLSSUPP = '$supplier'";
                            logMe($sql, MANUAL_TRANSACTION);
                            if ($this->db_conn->delete($sql) != RETURN_OK)
                            {
                                logMe("SQL fails:" . $sql, MANUAL_TRANSACTION);
                            }

                            for ($i = 0; $i < count($para_trans->Seal_List); ++ $i)
                            {
                                $sql = "INSERT INTO SEAL " .
                                    "(SEAL_NR, SEALSPEC_SHLSTRIP, SEALSPEC_SHLSSUPP, " .
                                    "SEAL_CMPT_NR, SEAL_PREFIX, SEAL_SUFFIX) " .
                                    "VALUES ('" .
                                    $para_trans->Seal_List[$i]->seal_nr . "', " .
                                    $trip . ", '" . $supplier . "', " . 
                                    $para_trans->Seal_List[$i]->seal_cmpt_nr . ", '" .
                                    $para_trans->Seal_List[$i]->seal_prefix . "', '" .
                                    $para_trans->Seal_List[$i]->seal_suffix . "')";
                                logMe($sql, MANUAL_TRANSACTION);
                                if ($this->db_conn->insert($sql) != RETURN_OK)
                                {
                                    logMe("SQL fails:" . $sql, MANUAL_TRANSACTION);
                                }
                            }

                            $this->db_conn->commit();                            
                        }
                        else
                        {
                            logMe("SQL fails:" . $sql, MANUAL_TRANSACTION);
                            $this->db_conn->rollback();
                        }
                    }
                    else
                    {
                        logMe("SQL fails:" . $sql, MANUAL_TRANSACTION);
                        $this->db_conn->rollback();
                    }
                }
            }
            else
            {
                $result_detail->result_code = -1;
                $result_detail->result_string = "DATABASE STORAGE ERROR";
            }
            return $result_detail;
        }
        else
        {
            $reply = new TRSAN_REPLY();
            
            if ($this->has_other_active_trip($para_trans->Tanker_Code, $para_trans->Load_Number))
            {
                logMe("Tanker has other active trips", MANUAL_TRANSACTION);
                $result_detail->result_code = -1;
                $result_detail->result_string = "TANKER HAS OTHER ACTIVE TRIPS";
                return $result_detail;
            }
            
            $php_commit = false;
            $vet = $this->switch_tanker(
                $para_trans->Load_Number, 
                $para_trans->Supplier, 
                $para_trans->Tanker_Code, 
                $result_detail->result_string);
            if ($vet < 0)
            {
                logMe("Failed to swith tanker. Err:" . $result_detail->result_string, 
                    MANUAL_TRANSACTION);
                $result_detail->result_code = -1;
                return $result_detail;
            }
            else if ($vet == 0)
                $php_commit = true;
            
            $trans_id= 0;
            $tran_det = $this->populate_transa_det(
                0, 
                $para_trans, 
                $num_of_transfers, 
                $transfers, 
                0, 
                $auto_complete, 
                $trans_id);
            $client = new socket_client($this->bay_code);
            $client->send($tran_det);
            $response = $client->get_repond();
            
            $reply->Result_Code = substr($response, 75, 10);
            if ($reply->Result_Code != null && substr_compare($reply->Result_Code, "OK", 0, 2) == 0)   
            {
                // Added $reply->Result_Code != null check to avoid Front-end channel disconnect error.
                // If error occurred in baiman, Result_Code coulde be null
                // which will cause substr_compare failed.
                // 31/Oct/2013
                
                // commented out for testing $this->unlink_serialized($para_trans->Transaction_Number);
                $result_detail->result_code = 0;
                $result_detail->result_string = "Manual Transaction successfully submitted";
                if ($para_trans->Login_User)
                {
                    $sql = "UPDATE SCHEDULE SET OPERATOR = '" . 
                        $para_trans->Login_User . 
                        "' , LAST_CHG_TIME = SYSDATE WHERE SHLS_TRIP_NO = " . 
                        $para_trans->Load_Number . 
                        " AND SHLS_SUPP = '" . 
                        $para_trans->Supplier . "'";
                    if ($this->db_conn->update($sql) == RETURN_OK)
                    {
                        $php_commit = true;
                        $sql = "UPDATE TRANSACTIONS SET TRSA_PSN = '" . 
                            $para_trans->Login_User . 
                            "' WHERE TRSA_ID = " . $trans_id;
                        if ($this->db_conn->update($sql) == RETURN_OK)
                        {
                            $sql = "UPDATE LOADS SET LD_SEAL_NO = '" . $para_trans->Seal_Range .
                                "' WHERE LOAD_ID = (SELECT TRSALDID_LOAD_ID FROM
                                 TRANSACTIONS WHERE TRSA_ID = " . $trans_id . ")";
                            if ($this->db_conn->update($sql) != RETURN_OK)
                            {     
                                logMe("SQL fails:" . $sql, MANUAL_TRANSACTION);
                            }
                            $php_commit = true;                            
                        }
                        else
                        {
                            logMe("SQL fails:" . $sql, MANUAL_TRANSACTION);
                            $php_commit = false;
                        }
                    }   
                    else
                    {
                        logMe("SQL fails:" . $sql, MANUAL_TRANSACTION);
                        $php_commit = false;
                    }
                }
            }
            else
            {
                $result_detail->result_code = -1;
                $result_detail->result_string = "DATABASE STORAGE ERROR";
            }
            
            if ($result_detail->result_code == 0 && $php_commit)
                $this->db_conn->commit();
            else
                $this->db_conn->rollback();
                
            logMe("====> reply->Result_Code is >". $reply->Result_Code . "<", MANUAL_TRANSACTION);
            return $result_detail;
        }
    }
    
    private function get_specialmovment_type($mlitm_id)
    {
        $sql = "SELECT NVL(MLITM_TYPE, 0) TYPE FROM MOV_LOAD_ITEMS WHERE MLITM_ID = " . $mlitm_id;
        $result = $this->db_conn->query($sql);
        return $result[0]->TYPE;
    }
    
    private function initial_speicalmovement(
        $type, 
        $mlitm_id, 
        &$amb, 
        &$cor, 
        &$kg, 
        &$temp, 
        &$dens, 
        &$drawer, 
        &$prod, 
        &$tank, 
        &$start, 
        &$end)
    {
        $sql = "SELECT TO_CHAR(NVL(MLITM_DTIM_START, SYSDATE), 'DD.MM.RRRRHH24:MI:SS') START_DATE, " .
            "TO_CHAR(NVL(MLITM_DTIM_END, SYSDATE), 'DD.MM.RRRRHH24:MI:SS') END_DATE FROM MOV_LOAD_ITEMS WHERE MLITM_ID = " . $mlitm_id;
        $result = $this->db_conn->query($sql);
        $start = $result[0]->START_DATE;
        $end = $result[0]->END_DATE;
        if ($type == -1)
            return -1;
        else if ($type == 0)
            $sql = "SELECT NVL(MLITM_QTY_AMB, 0) AMB, NVL(MLITM_QTY_COR, 0) COR, NVL(MLITM_QTY_KG, 0) KG, NVL(MLITM_TEMP_AMB, 0) TEMP, NVL(MLITM_DENS_COR, 0) DENS, " .
                "MLITM_PRODCMPY_TO DRAWER, MLITM_PRODCODE_TO PROD, MLITM_TANKCODE_TO TANK FROM MOV_LOAD_ITEMS WHERE MLITM_ID = " . $mlitm_id;
        else 
            $sql = "SELECT NVL(MLITM_QTY_AMB, 0) AMB, NVL(MLITM_QTY_COR, 0) COR, NVL(MLITM_QTY_KG, 0) KG, NVL(MLITM_TEMP_AMB, 0) TEMP, NVL(MLITM_DENS_COR, 0) DENS, " .
                "MLITM_PRODCMPY DRAWER, MLITM_PRODCODE PROD, MLITM_TANKCODE TANK FROM MOV_LOAD_ITEMS WHERE MLITM_ID = " . $mlitm_id;
        $result = $this->db_conn->query($sql);
        $amb = $result[0]->AMB;
        $cor = $result[0]->COR;
        $kg = $result[0]->KG;
        $temp = $result[0]->TEMP;
        $dens = $result[0]->DENS;
        $drawer = $result[0]->DRAWER;
        $prod = $result[0]->PROD;
        $tank = $result[0]->TANK;
        
        return 0;
    }
    
    private function initial_baseprod($drawer, $prod, &$base, &$base_class)
    {
        $sql = "SELECT RATIO_BASE, BASE_CAT, BCLASS_DESC FROM RATIOS, BASE_PRODS, BASECLASS " .
            "WHERE RAT_PROD_PRODCMPY = '" . $drawer . "' AND RAT_PROD_PRODCODE = '" . $prod . "' AND BASE_CODE = RATIO_BASE AND BCLASS_NO = BASE_CAT";
        $result = $this->db_conn->query($sql);
        $base = $result[0]->RATIO_BASE;
        $base_class = $result[0]->BCLASS_DESC;
    }
    
    function do_mv_schd($mlitm_id, $per_code, $tank_code, $schd_qty, $drawer1, $prod1, $drawer2, $prod2)
    {
        $tran_det = $this->populate_mv_schd_det($mlitm_id, $per_code, $tank_code, $schd_qty, $drawer1, $prod1, $drawer2, $prod2);
        $client = new socket_client($this->bay_code);
        $client->send($tran_det);
        $response = $client->get_repond();
        
        if (substr_compare($response, "OK", 0, 2) == 0)
        {
            $result_detail->result_code = 0;
            $trip1 = substr($response, 32, 9);
            $trip2 = substr($response, 41, 9);
            if ($trip2[0] != ' ')
            {
                $result_detail->result_string = "Schedule " . trim($trip1) . " and " . trim($trip2) . " successfully created";
                $result_detail->trip1 = $trip1;
                $result_detail->trip2 = $trip2;
            }
            else
            {
                $result_detail->result_string = "Schedule " . trim($trip1) . " successfully created";
                $result_detail->trip1 = $trip1;
                $result_detail->trip2 = -1;
            }
        }
        else
        {
            $result_detail->result_code = -1;
            $result_detail->result_string = $response;
        }
        
        return $result_detail;
    }
    
    function do_special($mlitm_id)
    {
        logMe("do_special START, mlitm_id: " . $mlitm_id, MANUAL_TRANSACTION);
        
        $tran_det = $this->populate_specmove_det($mlitm_id);
        $client = new socket_client($this->bay_code);
        $client->send($tran_det);
        $response = $client->get_repond();
        
        if (substr($response, 0, 2) != "OK" && substr($response, 0, 11) != "OUTSTANDING")
        {
            $result_detail->result_code = -1;
            $result_detail->result_string = trim(substr($response, 0, 32));
            return $result_detail;
        }
        
        $special_type = $this->get_specialmovment_type($mlitm_id);
        logMe("special_type: " . $special_type, MANUAL_TRANSACTION);

        define('MV_RECEIPT', 0);
        define('MV_DISPOSAL', 1);
        define('MV_TRANSFER', 2);
        $split_type = (($special_type == MV_TRANSFER || $special_type == MV_DISPOSAL) ? 
            MV_DISPOSAL : MV_RECEIPT);
        
        if ($this->initial_speicalmovement(
            $split_type, 
            $mlitm_id, 
            $amb, 
            $cor, 
            $kg, 
            $temp, 
            $dens, 
            $drawer, 
            $prod, 
            $tank, 
            $start, 
            $end) != 0)
        {
            $result_detail->result_code = -1;
            $result_detail->result_string = "WRONG SCHEDULE";
            return $result_detail;
        }
        
        $trans = new Manual_Transa();
        //$trans->Transaction_Number = "0020029";       //"0010007" is the sample value
        $trans->Load_Number = trim(substr($response, 32, 9));              //"4373229"
        $trans->Supplier = trim(substr($response, 41, 20));
        
        //$trans->Operator_Code = "LEOMCA";
        $trans->Start_Time = $start;
        $trans->Finish_Time = $end;
        $trans->Drawer_Code = $trans->Supplier;
        $trans->Drawer_Name = "";
        $trans->Tanker_Code = "SPECIAL";
        
        $num_of_transfers = 1;
        for ($i = 0; $i < $num_of_transfers; ++ $i)
        {
            $transfer[$i] = new Manual_Transfer();
            $transfer[$i]->Arm_Code = "";
            //$transfer[$i]->Device_Code = "BAY01";       //Not important, baiman does not use it
            $transfer[$i]->nr_in_tkr = 1;
            
            $transfer[$i]->drawer_code = $drawer;       
            $transfer[$i]->product_code = $prod;
            
            $transfer[$i]->dens = $dens * 1000;
            
            $transfer[$i]->Temperature = $temp  * 100;
            $transfer[$i]->amb_vol = $amb * 1000;               
            $transfer[$i]->cor_vol = $cor * 1000;
            $transfer[$i]->liq_kg = $kg * 1000;
            
            $transfer[$i]->num_of_meter = 0;    //Special movement does not have meter info
            
            /* Assume the drawer product has only one base. For speical movement, its reasonable */
            $transfer[$i]->Number_of_Bases = 1;
            $this->initial_baseprod($drawer, $prod, $base, $base_class);
            for ($j = 0; $j < $transfer[$i]->Number_of_Bases; ++ $j)
            {
                $transfer[$i]->bases[$j] = new Transfer_Base();
                $transfer[$i]->bases[$j]->Tank_Code = $tank;
                $transfer[$i]->bases[$j]->product_code = $base;
                
                $transfer[$i]->bases[$j]->prod_class = $base_class;
                $transfer[$i]->bases[$j]->dens = $dens * 1000;
                $transfer[$i]->bases[$j]->Temperature = $temp * 100;
                
                $transfer[$i]->bases[$j]->amb_vol = $amb * 1000;
                $transfer[$i]->bases[$j]->cor_vol = $cor * 1000;
                $transfer[$i]->bases[$j]->liq_kg = $kg * 1000;
            }
        }
        
        $result_detail = $this->do_create(0, $trans, $num_of_transfers, $transfer, 0, "T");
        if ($special_type != MV_TRANSFER)
            return $result_detail;
        
        /* for transfer, this is the second schedule, which is an unloading */
        if ($this->initial_speicalmovement(
            MV_RECEIPT, 
            $mlitm_id, 
            $amb, 
            $cor, 
            $kg, 
            $temp, 
            $dens, 
            $drawer, 
            $prod, 
            $tank, 
            $start, 
            $end) != 0)
        {
            $result_detail->result_code = -1;
            $result_detail->result_string = "WRONG SCHEDULE";
            return $result_detail;
        }
        
        $trans = new Manual_Transa();
        //$trans->Transaction_Number = "0020029";       //"0010007" is the sample value
        $trans->Load_Number = trim(substr($response, 61, 9));              //"4373229"
        $trans->Supplier = trim(substr($response, 70, 20));
        
        //$trans->Operator_Code = "LEOMCA";
        $trans->Start_Time = $start;
        $trans->Finish_Time = $end;
        $trans->Drawer_Code = $trans->Supplier;
        $trans->Drawer_Name = "";
        $trans->Tanker_Code = "SPECIAL";
        
        $num_of_transfers = 1;
        for ($i = 0; $i < $num_of_transfers; ++ $i)
        {
            $transfer[$i] = new Manual_Transfer();
            $transfer[$i]->Arm_Code = "";
            //$transfer[$i]->Device_Code = "BAY01";       //Not important, baiman does not use it
            $transfer[$i]->nr_in_tkr = 1;
            
            $transfer[$i]->drawer_code = $drawer;       
            $transfer[$i]->product_code = $prod;
            
            $transfer[$i]->dens = $dens * 1000;
            
            $transfer[$i]->Temperature = $temp;
            $transfer[$i]->amb_vol = $amb * 1000;               
            $transfer[$i]->cor_vol = $cor * 1000;
            $transfer[$i]->liq_kg = $kg * 1000;
            
            $transfer[$i]->num_of_meter = 0;    //Special movement does not have meter info
            
            /* Assume the drawer product has only one base. For speical movement, its reasonable */
            $transfer[$i]->Number_of_Bases = 1;
            $this->initial_baseprod($drawer, $prod, $base, $base_class);
            for ($j = 0; $j < $transfer[$i]->Number_of_Bases; ++ $j)
            {
                $transfer[$i]->bases[$j] = new Transfer_Base();
                $transfer[$i]->bases[$j]->Tank_Code = $tank;
                $transfer[$i]->bases[$j]->product_code = $base;
                
                $transfer[$i]->bases[$j]->prod_class = $base_class;
                $transfer[$i]->bases[$j]->dens = $dens * 1000;
                $transfer[$i]->bases[$j]->Temperature = $temp;
                
                $transfer[$i]->bases[$j]->amb_vol = $amb * 1000;
                $transfer[$i]->bases[$j]->cor_vol = $cor * 1000;
                $transfer[$i]->bases[$j]->liq_kg = $kg * 1000;
            }
        }
        
        return $this->do_create(0, $trans, $num_of_transfers, $transfer, 0, "T");
    }
    
    function do_reverse($trip_id, $supplier)
    {
        logMe("do_reverse START, trip_id: " . $trip_id . "supplier: " . $supplier, MANUAL_TRANSACTION);

        $tran_det = $this->populate_reverse_det($trip_id, $supplier);
        $client = new socket_client($this->bay_code);
        $client->send($tran_det);
        $response = $client->get_repond();
        
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

    /**************************************************************************/
    /* Functions used by Omega 5000 R2.2 Flex GUI    [START]                  */
    /* Added by JZ                                                            */
    /* 09/2013                                                                */
    /**************************************************************************/

    /**
    * Get Base Products.
    *
    * @param string $drawer
    * @param string $drawerprod
    * @param string $arm
    * @return base products list 
    */
    public function getBaseDetails($drawer, $drawerprod, $arm)
    {
        $db = DB::getInstance();
        //$sql = "SELECT RATIOS.RATIO_VALUE, BASE_PRODS.BASE_CODE 
        //     FROM RATIOS, BASE_PRODS 
        //     WHERE  RATIOS.RATIO_BASE = BASE_PRODS.BASE_CODE AND RAT_PROD_PRODCMPY = '$drawer' AND RAT_PROD_PRODCODE = '$drawerprod'";
        $sql = "
        select R.RAT_PROD_PRODCMPY, R.RAT_PROD_PRODCODE, B.STREAM_ARMCODE, B.STREAM_MTRCODE, B.STREAM_INJCODE, B.STREAM_BASECODE, B.STREAM_BASENAME, B.STREAM_BCLASS_CODE, 
        decode(B.STREAM_BCLASS_CODE, 6, 'T', 11,'T','F') METER_TYPE_CODE, decode(B.STREAM_BCLASS_CODE, 6, 'Inject', 11,'Inject','Meter') METER_TYPE_DESC, B.STREAM_BCLASS_NMAE,
        B.STREAM_TANKCODE, B.STREAM_TANKDEN, STREAM_TANKTEMP as BASE_RPT_TEMP, BP.BASE_RPT_TEMP as BASE_RPT_TEMP2, R.RATIO_VALUE
        from 
        RATIOS R,
        GUI_PIPENODE B,
        BASE_PRODS BP
        where
             B.STREAM_BASECODE = R.RATIO_BASE(+)
         and B.STREAM_BASECODE = BP.BASE_CODE(+) and RAT_PROD_PRODCMPY = '$drawer' and RAT_PROD_PRODCODE = '$drawerprod' and STREAM_ARMCODE='$arm'
        order by R.RAT_PROD_PRODCMPY, METER_TYPE_CODE, B.STREAM_ARMCODE, B.STREAM_BASECODE
        ";
             
        //logMe("getBaseDetails ==> SQL -->". $sql, MANUAL_TRANSACTIONS);
        return $db->query($sql);
    }
    
    /**
    * Get schedule type.
    *
    * @param string $supp
    * @param string $trip_no
    * @return schedule type 
    */
    public function getSchdTypeBySuppTrip($supp, $trip_no)
    {
        $db = DB::getInstance();
        //$sql = "
        //SELECT count(*) REC_CNT
        //   FROM specprod
        //   WHERE SCHPSPID_SHLSTRIP IN (SELECT SCHDSPEC_SHLSTRIP FROM specdets WHERE SCHDSPEC_SHLSSUPP='$supp' AND SCHDSPEC_SHLSTRIP='$trip_no')
        //    ";
        // Ver2.9 Added DRAWER_CODE.
        $sql = "
         SELECT LD_TYPE,STATUS,DRAWER_CODE
            FROM GUI_SCHEDULES
            WHERE SUPPLIER_CODE='$supp' AND SHLS_TRIP_NO='$trip_no'
         UNION
         SELECT LD_TYPE,STATUS,DRAWER_CODE
            FROM GUI_NOM_SCHEDULES
            WHERE SUPPLIER_CODE='$supp'AND SHLS_TRIP_NO='$trip_no'
        ";
        
         $sql_chk = "
         SELECT LD_TYPE,CARRIER,TNKR_CODE,STATUS,DRAWER_CODE
            FROM GUI_SCHEDULES
            WHERE SUPPLIER_CODE='$supp' AND SHLS_TRIP_NO='$trip_no'
         UNION
         SELECT LD_TYPE,CARRIER,TNKR_CODE,STATUS,DRAWER_CODE
            FROM GUI_NOM_SCHEDULES
            WHERE SUPPLIER_CODE='$supp'AND SHLS_TRIP_NO='$trip_no'
        ";
        $rows_ld_type = $db->query($sql_chk);
        logMe("rows_ld_type[0]->LD_TYPE     ===>".strtoupper($rows_ld_type[0]->LD_TYPE), MANUAL_TRANSACTION);
        logMe("rows_ld_type[0]->CARRIER     ===>".strtoupper($rows_ld_type[0]->CARRIER), MANUAL_TRANSACTION);
        logMe("rows_ld_type[0]->TNKR_CODE   ===>".strtoupper($rows_ld_type[0]->TNKR_CODE), MANUAL_TRANSACTION);
        logMe("rows_ld_type[0]->STATUS      ===>".strtoupper($rows_ld_type[0]->STATUS), MANUAL_TRANSACTION);
        logMe("rows_ld_type[0]->DRAWER_CODE ===>".strtoupper($rows_ld_type[0]->DRAWER_CODE), MANUAL_TRANSACTION);
        if(strtoupper($rows_ld_type[0]->LD_TYPE) == "PREORDER" && (strtoupper($rows_ld_type[0]->CARRIER) == "GENERIC CARRIER" || strtoupper($rows_ld_type[0]->TNKR_CODE) == "GENERIC TANKER"))
        {
            // Ver2.5 Added TNKR_CODE is Generic Tanker check.
            // As long as there is a Gerneric XXX(Carrier or Tanker), should classify the schedule type as SUB1, which will allow user to select a new Tanker.
            // In the Flex side, if SUB1 type detected, will not pre-populate comapartment info, as needs user's operation(to select Carrier and/or Tanker).

            // Check Vetting flag
            $sql_vet="SELECT C.CMPY_VET FROM COMPANYS C WHERE C.CMPY_CODE='$supp'";
            $rows_vet = $db->query($sql_vet);
            logMe("rows_vet[0]->CMPY_VET ===>".$rows_vet[0]->CMPY_VET, MANUAL_TRANSACTION);
            if ($rows_vet[0]->CMPY_VET == 1 || $rows_vet[0]->CMPY_VET == 2 || $rows_vet[0]->CMPY_VET == 3) // Vet PrimeMover(1) or Vet Trailer(2) or Vet all(3)
            {
                // no change
            }
            else // Vet None(-1) or Vet Carrier(0). Including CMPY_VET is NULL.
            {
                // Change the schedule type to PREORDER_SUB1(has GENERIC CARRIER or GENERIC TANKER specified).
                // Ver2.5 Added STATUS.
                // As status is needed to determine whether user can change Carrier and/or Tanker in Flex.
                // Ver2.9 Added DRAWER_CODE.
                // DRAWER_CODE should be a transaction level identifier once trip no or order no changed in Flex Front-end.(for populating Base & Meter total usage)
                $sql="SELECT 'PREORDER_SUB1' as LD_TYPE,
                         (SELECT STATUS
                            FROM GUI_SCHEDULES
                            WHERE SUPPLIER_CODE='$supp' AND SHLS_TRIP_NO='$trip_no'
                         UNION
                         SELECT STATUS
                            FROM GUI_NOM_SCHEDULES
                            WHERE SUPPLIER_CODE='$supp'AND SHLS_TRIP_NO='$trip_no') as STATUS,
                         (SELECT DRAWER_CODE
                            FROM GUI_SCHEDULES
                            WHERE SUPPLIER_CODE='$supp' AND SHLS_TRIP_NO='$trip_no'
                         UNION
                         SELECT DRAWER_CODE
                            FROM GUI_NOM_SCHEDULES
                            WHERE SUPPLIER_CODE='$supp'AND SHLS_TRIP_NO='$trip_no') as DRAWER_CODE
                        FROM DUAL";
            }
        }

        //$db_conn->query($sql);
        /*$schd_type = "";
        
        if($chk->data[0][REC_CNT] > 0)  
        {
            // Schedule by compartment
            $schd_type = "BY_COMPARTMENT";
        }
        else
        {
            // Schedule by product
            $schd_type = "BY_PRODUCT";
        }*/
        return $db->query($sql);
    }

    /**
    * Get Reverse Transfers data.
    *
    * @param string $supp
    * @param string $trip_no
    * @return Reverse Transfers data
    */
    public function getRevTrsfBySuppTrip($supp, $trip_no)
    {
        $db = DB::getInstance();
        
        $sql = "Select Max(Trsa_Version) MAX_VER From  Transactions where TRSALDID_LOAD_ID = (select SHLSLOAD_LOAD_ID from schedule where SHLS_TRIP_NO = '$trip_no' AND SHLS_SUPP = '$supp')";
        $result = $db->query($sql);
        $max_version = $result[0]->MAX_VER;
        
        $sql = "
SELECT 
  TRSF_ID, TRSALDID_LOAD_ID, V_TECD.EQPT_CODE AS EQUIPMENT_ID, TRSA_VERSION, TRSF_DES NR_IN_TKR, TRSFPROD_PRODCODE, TRSFPROD_PRODCMPY, TRSF_BAA_CODE,
  (TRSF_DENSITY) AS AVG_DEN, (TRSF_TEMP) AS AVG_TEMP,
  (TRSF_LOAD_KG) AS SUM_KG, (TRSF_QTY_COR) AS SUM_COR, (TRSF_QTY_AMB) AS SUM_AMB,
  SPD.SCHD_SPECQTY as ALLOWED_QTY
FROM 
  TRANSFERS, TRANSACTIONS, TNKR_EQUIP_CMPT_DET_VW V_TECD, SPECDETS SPD
WHERE 
      TRSFTRID_TRSA_ID = TRSA_ID 
  AND TRSA_VERSION = $max_version
  AND TRSF_BAA_CODE IS NOT NULL
  AND TRSALDID_LOAD_ID = (SELECT SHLSLOAD_LOAD_ID FROM SCHEDULE WHERE SHLS_TRIP_NO = '$trip_no' AND SHLS_SUPP = '$supp')
  AND V_TECD.TNKR_CODE= (SELECT SHL_TANKER FROM SCHEDULE WHERE SHLS_TRIP_NO = '$trip_no' AND SHLS_SUPP = '$supp') AND V_TECD.TNKR_CMPT=TRSF_DES
  AND SPD.SCHDSPEC_SHLSTRIP= '$trip_no' AND SCHDSPEC_SHLSSUPP='$supp' AND SCHD_COMP_ID=V_TECD.TNKR_CMPT
ORDER BY 
  NR_IN_TKR, TRSF_ID";
  
        return $db->query($sql);
    }
    

    /**
    * Get Reverse Bases data per transfer.
    */
    public function getRevBasesBySuppProd($trsfer_id, $trsa_ver)
    {
        $db = DB::getInstance();
       $sql = "
SELECT 
  TRSB_BS, BASE_CAT, BCLASS_DESC,
  DECODE(TRSB_INJECTOR, NULL, TRSB_METER, TRSB_INJECTOR) TRSB_METER,
  DECODE(TRSB_INJECTOR, NULL, 'F', 'T') INJ_OR_METER, 
--NOTE: Here use CLOSE as open, OPEN as close meter.
  TRSB_CLS_AMB AS OPN_AMB, TRSB_CLS_COR AS OPN_COR, TRSB_CLS_KG AS OPN_KG,
  TRSB_OPN_AMB AS CLS_AMB, TRSB_OPN_COR AS CLS_COR, TRSB_OPN_KG AS CLS_KG,
  RATIO_VALUE / (SELECT SUM(RATIO_VALUE) FROM RATIOS WHERE RAT_PROD_PRODCODE = TRSFPROD_PRODCODE AND RAT_PROD_PRODCMPY = TRSFPROD_PRODCMPY) BASE_RATIO,
  TRSB_TK_TANKCODE,
  DECODE(TRSB_INJECTOR, NULL, TRSB_CVL, TRSB_CVL/1000) AS SUM_COR, DECODE(TRSB_INJECTOR, NULL, TRSB_AVL, TRSB_AVL/1000) AS SUM_AMB, TRSB_KG AS SUM_KG, TRSB_TMP AS AVG_TEMP, TRSB_DNS AS AVG_DEN
FROM
  TRANSACTIONS, TRANSFERS, TRANBASE, BASE_PRODS, BASECLASS, RATIOS
WHERE
      TRSFTRID_TRSA_ID = TRSA_ID
  AND TRSA_VERSION = $trsa_ver
  AND TRSB_ID_TRSF_ID = $trsfer_id
  AND TRSB_ID_TRSF_ID = TRSF_ID
  AND TRSB_BS = BASE_CODE
  AND BCLASS_NO = BASE_CAT
  AND RAT_PROD_PRODCODE = TRSFPROD_PRODCODE
  AND RAT_PROD_PRODCMPY = TRSFPROD_PRODCMPY
  AND TRSB_BS = RATIO_BASE";

        return $db->query($sql);
    }

    /**
    * Get Reverse Base Totals data per transaction.
    *
    * @param string $load_id
    * @param string $trsa_ver
    * @return Reverse Base Totals data per transaction
    */
    public function getRevBasesTolByLoadID($load_id, $trsa_ver)
    {
        $db = DB::getInstance();
/*        $sql = "SELECT TRSB_BS, BASE_CAT, BCLASS_DESC, TRSB_TK_TANKCODE, SUM(TRSB_CVL) AS SUM_COR, SUM(TRSB_AVL)  AS SUM_AMB, 
SUM(TRSB_KG) AS SUM_KG, SUM(TRSB_KG*TRSB_TMP)/SUM(TRSB_KG) AS AVG_TEMP,
ROUND(SUM(TRSB_KG) *1000/SUM(DECODE(TRSB_UNT, 34, TRSB_CVL/1000, TRSB_CVL)), 2) AS AVG_DEN,
DECODE(TRSB_INJECTOR, NULL, TRSB_METER, TRSB_INJECTOR) TRSB_METER, DECODE(TRSB_INJECTOR, NULL, 'F', 'T') INJ_OR_METER,
MIN(TRSB_OPN_AMB) OPN_AMB, MIN(TRSB_OPN_COR) OPN_COR, MIN(TRSB_OPN_KG) OPN_KG, MAX(TRSB_CLS_AMB) CLS_AMB, MAX(TRSB_CLS_COR)CLS_COR , MAX(TRSB_CLS_KG) CLS_KG
FROM TRANBASE, TRANSFERS, TRANSACTIONS, BASE_PRODS, BASECLASS
WHERE TRSB_ID_TRSF_ID = TRSF_ID AND TRSB_ID_TRSF_TRM = TRSF_TERMINAL AND
  TRSFTRID_TRSA_ID = TRSA_ID AND TRSFTRID_TRSA_TRM = TRSALDID_LD_TRM AND TRSALDID_LOAD_ID = $load_id AND TRSA_VERSION = $trsa_ver
  AND TRSB_BS = BASE_CODE AND BCLASS_NO = BASE_CAT
GROUP BY TRSB_BS, BASE_CAT, BCLASS_DESC, TRSB_TK_TANKCODE, TRSB_METER, TRSB_INJECTOR"
*/
        $sql = "
SELECT 
  TRSB_BS,
  BASE_CAT, BCLASS_DESC,
  --TRSB_TK_TANKCODE,
  LISTAGG(TRSB_TK_TANKCODE, '|') WITHIN GROUP (ORDER BY TRSB_TK_TANKCODE) AS TANKCODE_LIST,
  SUM(TRSB_CVL) AS SUM_COR,
  SUM(TRSB_AVL) AS SUM_AMB,
  SUM(TRSB_KG) AS SUM_KG,
  ROUND(SUM(TRSB_KG * TRSB_TMP) / SUM(TRSB_KG),2) AS AVG_TEMP,
  ROUND(SUM(TRSB_KG) * 1000 / SUM(DECODE(TRSB_UNT, 34, TRSB_CVL/1000, TRSB_CVL)), 1) AS AVG_DEN,
  --DECODE(TRSB_INJECTOR, NULL, TRSB_METER, TRSB_INJECTOR) TRSB_METER,
  --DECODE(TRSB_INJECTOR, NULL, 'F', 'T') INJ_OR_METER,
  MIN(TRSB_OPN_AMB) OPN_AMB, MIN(TRSB_OPN_COR) OPN_COR, MIN(TRSB_OPN_KG) OPN_KG,
  MAX(TRSB_CLS_AMB) CLS_AMB, MAX(TRSB_CLS_COR) CLS_COR, MAX(TRSB_CLS_KG) CLS_KG
FROM 
   TRANBASE, TRANSFERS, TRANSACTIONS, BASE_PRODS, BASECLASS
WHERE 
      TRSB_ID_TRSF_ID = TRSF_ID
  AND TRSB_ID_TRSF_TRM = TRSF_TERMINAL
  AND TRSFTRID_TRSA_ID = TRSA_ID
  AND TRSFTRID_TRSA_TRM = TRSALDID_LD_TRM
  AND TRSALDID_LOAD_ID = $load_id
  AND TRSA_VERSION = $trsa_ver
  AND TRSB_BS = BASE_CODE
  AND BCLASS_NO = BASE_CAT
GROUP BY
  TRSB_BS, BASE_CAT, BCLASS_DESC
 --,TRSB_TK_TANKCODE
ORDER BY
  TRSB_BS";

        return $db->query($sql);
    }

    /**
    * Get Reverse Meter Totals data per transaction.
    *
    * @param string $load_id
    * @param string $trsa_ver
    * @return Reverse Meter Totals data per transaction
    */
    public function getRevMetersTolByLoadID($load_id, $trsa_ver)
    {
        $db = DB::getInstance();

        $sql = "
SELECT 
  TRSB_BS, BASE_CAT, BCLASS_DESC, TRSB_TK_TANKCODE, SUM(TRSB_CVL) AS SUM_COR, SUM(TRSB_AVL) AS SUM_AMB,
  SUM(TRSB_KG) AS SUM_KG, SUM(TRSB_KG*TRSB_TMP)/SUM(TRSB_KG) AS AVG_TEMP,
  ROUND(SUM(TRSB_KG) * 1000 / SUM(DECODE(TRSB_UNT, 34, TRSB_CVL/1000, TRSB_CVL)), 2) AS AVG_DEN,
  DECODE(TRSB_INJECTOR, NULL, TRSB_METER, TRSB_INJECTOR) TRSB_METER, DECODE(TRSB_INJECTOR, NULL, 'F', 'T') INJ_OR_METER,
--NOTE: Here use CLOSE as open, OPEN as close meter.
  MIN(TRSB_CLS_AMB) OPN_AMB, MIN(TRSB_CLS_COR) OPN_COR, MIN(TRSB_CLS_KG) OPN_KG,
  MAX(TRSB_OPN_AMB) CLS_AMB, MAX(TRSB_OPN_COR) CLS_COR, MAX(TRSB_OPN_KG) CLS_KG
FROM
   TRANBASE, TRANSFERS, TRANSACTIONS, BASE_PRODS, BASECLASS
WHERE
      TRSB_ID_TRSF_ID = TRSF_ID
  AND TRSB_ID_TRSF_TRM = TRSF_TERMINAL
  AND TRSFTRID_TRSA_ID = TRSA_ID
  AND TRSFTRID_TRSA_TRM = TRSALDID_LD_TRM
  AND TRSALDID_LOAD_ID = $load_id
  AND TRSA_VERSION = $trsa_ver
  AND TRSB_BS = BASE_CODE
  AND BCLASS_NO = BASE_CAT
GROUP BY
  TRSB_BS, BASE_CAT, BCLASS_DESC, TRSB_TK_TANKCODE, TRSB_METER, TRSB_INJECTOR";

        return $db->query($sql);
    }

    /**
    * Get Drawer Products.
    *
    * @param string $supp
    * @param string $trip_no
    * @return drawer products list 
    */
    public function getDrawerProdSchdByProd($supp, $trip_no)
    {
        $db = DB::getInstance();
        //$sql = "
        //select PROD_CODE,PROD_NAME,PROD_CMPY, SCHP_SPECQTY, decode(SCHP_UNITS,'5','l(amb)','11','l(cor)','17','kg','unknown') UNIT_NAME
        //from PRODUCTS P,
        //SCHEDULE S,
        //SPECPROD SP
        //where
        //P.PROD_CODE = SP.SCHPPROD_PRODCODE
        //and SP.SCHPSPID_SHLSTRIP = S.SHLS_TRIP_NO(+)
        //and SP.SCHPSPID_SHLSSUPP  = S.SHLS_SUPP(+)
        //and S.SHLS_TRIP_NO = '$trip_no' and S.SHLS_SUPP = '$supp'
        //order by PROD_CODE
        // ";
        $sql = "
        select 
            pr.PROD_CODE as PROD_CODE
            , pr.PROD_NAME as PROD_NAME
            , pr.PROD_CMPY as PROD_CMPY
            , spec.SCHP_UNITS as UNIT_CODE
            , uv.DESCRIPTION as UNIT_NAME
            , spec.SCHP_SPECQTY as SCHP_SPECQTY
            , NVL(DECODE(spec.SCHP_UNITS, 5, trsf.TRIP_QTY_AMB, 11, trsf.TRIP_QTY_STD, 17, trsf.TRIP_QTY_KG, trsf.TRIP_QTY_DELIVERED),0) as QTY_LOADED
            , cmpt.TRIP_QTY_PRELOAD QTY_PRELOADED 
            , trsf.TRIP_QTY_AMB QTY_AMB
            , trsf.TRIP_QTY_STD QTY_STD
            , trsf.TRIP_QTY_KG QTY_KG
        from 
            SPECPROD spec
            , PRODUCTS pr
            , UNIT_SCALE_VW uv
            , (
        select 
            SPECDETS.SCHDSPEC_SHLSSUPP as TRIP_SUPPLIER
            , SPECDETS.SCHDSPEC_SHLSTRIP as TRIP_NO
            , SPECDETS.SCHDPROD_PRODCMPY as TRIP_PRODCMPY
            , SPECDETS.SCHDPROD_PRODCODE as TRIP_PRODCODE
            , SUM(SPECDETS.SCHD_PRESETQTY) as TRIP_QTY_PRESET
            , SUM(SPECDETS.SCHD_PRLDQTY) as TRIP_QTY_PRELOAD
            , SUM(SPECDETS.SCHD_SPECQTY) as TRIP_QTY_SCHED
            , SUM(SPECDETS.SCHD_DELIVERED) as TRIP_QTY_LOADED
        from SPECDETS
        group by SPECDETS.SCHDSPEC_SHLSSUPP, SPECDETS.SCHDSPEC_SHLSTRIP, SPECDETS.SCHDPROD_PRODCMPY, SPECDETS.SCHDPROD_PRODCODE
            ) cmpt
            , (
        select 
            SCHEDULE.SHLS_SUPP as TRIP_SUPPLIER
            , SCHEDULE.SHLS_TRIP_NO as TRIP_NO
            , TRANSFERS.TRSFPROD_PRODCMPY as TRIP_PRODCMPY
            , TRANSFERS.TRSFPROD_PRODCODE as TRIP_PRODCODE
            , SUM(TRANSFERS.TRSF_QTY_AMB) as TRIP_QTY_AMB
            , SUM(TRANSFERS.TRSF_QTY_COR) as TRIP_QTY_STD
            , SUM(TRANSFERS.TRSF_LOAD_KG) as TRIP_QTY_KG
          , SUM(TRANSFERS.TRSF_RETURNS) as TRIP_QTY_RTN
          , SUM(TRANSFERS.TRSF_PRELOAD_KG) as TRIP_QTY_PKG
          , SUM(TRANSFERS.TRSF_DELIVERED) as TRIP_QTY_DELIVERED
        from 
          SCHEDULE 
          , LOADS 
          , TRANSACTIONS 
          , TRANSFERS 
        where
            SCHEDULE.SHLSLOAD_LD_TRM = LOADS.LD_TERMINAL
        and SCHEDULE.SHLSLOAD_LOAD_ID = LOADS.LOAD_ID
        and LOADS.LOAD_ID = TRANSACTIONS.TRSALDID_LOAD_ID
        and LOADS.LD_TERMINAL = TRANSACTIONS.TRSALDID_LD_TRM
        and TRANSACTIONS.TRSA_ID = TRANSFERS.TRSFTRID_TRSA_ID
        and TRANSACTIONS.TRSA_TERMINAL = TRANSFERS.TRSFTRID_TRSA_TRM
        group by SCHEDULE.SHLS_SUPP, SCHEDULE.SHLS_TRIP_NO, TRANSFERS.TRSFPROD_PRODCMPY, TRANSFERS.TRSFPROD_PRODCODE
            ) trsf
        where 
            spec.SCHPSPID_SHLSSUPP = cmpt.TRIP_SUPPLIER (+)
            and spec.SCHPSPID_SHLSTRIP = cmpt.TRIP_NO (+)
            and spec.SCHPPROD_PRODCMPY = cmpt.TRIP_PRODCMPY (+)
            and spec.SCHPPROD_PRODCODE = cmpt.TRIP_PRODCODE (+)
            and cmpt.TRIP_SUPPLIER = trsf.TRIP_SUPPLIER (+)
            and cmpt.TRIP_NO = trsf.TRIP_NO (+)
            and cmpt.TRIP_PRODCMPY = trsf.TRIP_PRODCMPY (+)
            and cmpt.TRIP_PRODCODE = trsf.TRIP_PRODCODE (+)
            and spec.SCHPPROD_PRODCMPY = pr.PROD_CMPY
            and spec.SCHPPROD_PRODCODE = pr.PROD_CODE
            and uv.UNIT_ID = spec.SCHP_UNITS
            and spec.SCHPSPID_SHLSTRIP = '$trip_no' 
            and spec.SCHPSPID_SHLSSUPP = '$supp'
        order by spec.SCHPSPID_SHLSSUPP, spec.SCHPSPID_SHLSTRIP, pr.PROD_NAME
         ";
        return $db->query($sql);
    }

    /**
    * Check the trip status for the manual transaction.
    *
    * @param string $supp
    * @param string $trip_no
    * @return trip status 
    */
    public function finalCheck_Submit($supp, $trip_no)
    {
        $db = DB::getInstance();
        $sql = "SELECT STATS FROM SCHEDULE WHERE SHLS_SUPP = '$supp' AND SHLS_TRIP_NO='$trip_no'"; //(STATS IN ('F','A') OR STATS IS NULL)
     
        return $db->query($sql);
    }

    /**
    * Check the trip status for REPOST transaction.
    *
    * @param string $supp
    * @param string $trip_no
    * @return trip status
    */
    public function preCheck_StartupMT($supp, $trip_no)
    {
        $db = DB::getInstance();
        $sql = "SELECT STATUS,LOAD_REVERSE_FLAG FROM GUI_SCHEDULES WHERE SUPPLIER_CODE = '$supp' AND SHLS_TRIP_NO='$trip_no'";
     
        return $db->query($sql);
    }

    /* replace amf async call [START] */
    /////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////
    public function getCustomersBySupplier($cmpy_code)
    {
        $db = DB::getInstance();
        $sql="
            select 
                cust.CUST_ACCT as CUST_ACNT 
                , cust.CUST_SUPP as CUST_SUPP_CODE
                , scmp.CMPY_NAME as CUST_SUPP_NAME
                , cust.CUST_CODE as CUST_CMPY_CODE
                , ccmp.CMPY_NAME as CUST_CMPY_NAME
            from 
                CUSTOMER cust
                , COMPANYS scmp
                , COMPANYS ccmp
            where 
                cust.CUST_SUPP = scmp.CMPY_CODE 
                and cust.CUST_CODE = ccmp.CMPY_CODE
                and (cust.CUST_SUPP='$cmpy_code') 
            order by cust.CUST_SUPP, cust.CUST_CODE 
                    ";
        
        return $db->query($sql);
    }

    public function getOpenOrderNumberByCustomer($order_cust)
    {
        $db = DB::getInstance();
        /*$sql="
            select CO.ORDER_NO
            from CUSTOMER C,
            CUST_ORDER CO
            where C.CUST_ACCT = CO.ORDER_CUST
              and C.CUST_SUPP = '$cmpy_code'
            order by CO.ORDER_NO desc
        ";*/
        $sql="
            select CO.ORDER_CUST_ORDNO
            from 
            CUST_ORDER CO
            where CO.ORDER_CUST = '$order_cust'
            order by CO.ORDER_NO desc
        ";

        return $db->query($sql);
    }

    public function getCarriersBySuppTrip($supp, $trip_no)
    {
        $db = DB::getInstance();
        
        $sql="SELECT C.CMPY_CODE, C.CMPY_NAME FROM SCHEDULE S,COMPANYS C,TANKERS T WHERE S.SHL_TANKER = T.TNKR_CODE AND T.TNKR_CARRIER = C.CMPY_CODE AND S.SHLS_SUPP='$supp' AND S.SHLS_TRIP_NO='$trip_no'";
        
        $rows_carrier = $db->query($sql);
        $obj_cnt = count($rows_carrier);
        logMe("carrier count ===>".$obj_cnt, MANUAL_TRANSACTION);
        logMe("rows_carrier[0]->CMPY_NAME ===>".strtoupper($rows_carrier[0]->CMPY_NAME), MANUAL_TRANSACTION);
        if($obj_cnt == 1 && strtoupper($rows_carrier[0]->CMPY_NAME) == "GENERIC CARRIER")
        {
            // Check Vetting flag
            $sql="SELECT C.CMPY_VET FROM COMPANYS C WHERE C.CMPY_CODE='$supp'";
            $rows_vet = $db->query($sql);
            logMe("rows_vet[0]->CMPY_VET ===>".$rows_vet[0]->CMPY_VET, MANUAL_TRANSACTION);
            if ($rows_vet[0]->CMPY_VET == 1 || $rows_vet[0]->CMPY_VET == 2 || $rows_vet[0]->CMPY_VET == 3) // Vet PrimeMover(1) or Vet Trailer(2) or Vet all(3)
            {
                $sql="SELECT C.CMPY_CODE, C.CMPY_NAME FROM SCHEDULE S,COMPANYS C,TANKERS T WHERE S.SHL_TANKER = T.TNKR_CODE AND T.TNKR_CARRIER = C.CMPY_CODE AND S.SHLS_SUPP='$supp' AND S.SHLS_TRIP_NO='$trip_no'";
            }
            else // Vet None(-1) or Vet Carrier(0). Including CMPY_VET is NULL.
            {
                // If only 1 carrier found and it's 'Generic Carrier', populate all carriers for user to select.
                $sql="SELECT CMPY_CODE, CMPY_NAME FROM GUI_COMPANYS WHERE BITAND(CMPY_TYPE,4)<>0 ORDER BY CMPY_CODE ASC";
            }
        }
        
        return $db->query($sql);
    }
    
    public function getTankersBySuppTrip($supp, $trip_no)
    {
        $db = DB::getInstance();
        
        //$sql="SELECT T.TNKR_CODE FROM SCHEDULE S,TANKERS T WHERE S.SHL_TANKER = T.TNKR_CODE AND SHLS_SUPP='$supp' AND SHLS_TRIP_NO='$trip_no'";
        $sql="SELECT T.TNKR_CODE FROM SCHEDULE S,TANKERS T WHERE S.SHL_TANKER = T.TNKR_CODE AND SHLS_SUPP='$supp' AND SHLS_TRIP_NO='$trip_no' AND upper(T.TNKR_CODE) not in ('GENERIC TANKER','GENERIC NOM VOL','SPECIAL')";
        
        return $db->query($sql);
    }

    public function getEquipmentsByTanker($tanker_code)
    {
        $db = DB::getInstance();
        
        $sql="SELECT DISTINCT EQPT_CODE FROM TNKR_EQUIP_CMPT_DET_VW WHERE TNKR_CODE = '$tanker_code' ORDER BY EQPT_CODE ASC";
        
        return $db->query($sql);
    }

    public function getCompartmentsByTanker($tanker_code)
    {
        $db = DB::getInstance();
        
        $sql="SELECT TNKR_CODE, TNKR_CMPT FROM TNKR_EQUIP_CMPT_DET_VW WHERE TNKR_CODE = '$tanker_code' ORDER BY TNKR_CODE, TNKR_CMPT ASC";
        
        return $db->query($sql);
    }

    /* Get PreOrder(schedule by product) details according to trip_no and tanker */
    public function getPreOrderDetailsByTanker($supp, $trip_no, $tanker_code)
    {
        $db = DB::getInstance();
        
        $sql = "
SELECT
        'BY_PRODUCT' as SCHD_TYPE
        , 
        (
            SELECT (CASE WHEN '$supp' <> (SELECT SHLS_SUPP FROM SCHEDULE WHERE SHLS_TRIP_NO = '$trip_no') 
                    THEN (SELECT SHLS_SUPP FROM SCHEDULE WHERE SHLS_TRIP_NO = '$trip_no') 
                    ELSE  '$supp' 
                    END) 
            FROM DUAL
        ) as SHLS_SUPP
        ,tc.TNKR_CMPT_NO
        ,tc.TRAILERCOMP
        ,NVL(sf.ADJ_AMNT,0) + tc.CMPT_CAPACIT CMPT_CAPACIT
        ,tc.CMPT_UNITS
        ,tc.UNIT
        ,tc.EQPT_CODE
        ,tc.TC_EQPT
        ,null as PROD_CODE
        ,null as ALLOWED_QTY
FROM
        (
        SELECT
                 ROWNUM TNKR_CMPT_NO
    , tc_tmp.*
  FROM
    (
    SELECT
         c.TRAILERCOMP
        ,c.CMPT_CAPACIT
        ,c.CMPT_UNITS
        ,un.DESCRIPTION UNIT
        ,te.TC_SEQNO
        ,trs.EQPT_CODE
        ,te.TC_EQPT
        ,c.ETYP_ID_RT
        ,te.TC_TANKER
    FROM
        TNKR_EQUIP te
        ,TRANSP_EQUIP trs
        ,UNIT_SCALE_VW un
        ,CMPT_VW c
    WHERE
        te.TC_EQPT = trs.EQPT_ID
        AND trs.EQPT_ETP = C.ETYP_ID_RT
        AND un.UNIT_ID = c.CMPT_UNITS
        AND te.TC_TANKER = '$tanker_code'
    ORDER BY te.TC_SEQNO,c.TRAILERCOMP
    ) tc_tmp
        ) tc,
        SFILL_ADJUST sf
WHERE
        tc.TC_EQPT = sf.ADJ_EQP(+)
        AND tc.TRAILERCOMP = sf.ADJ_CMPT(+)
ORDER BY TO_NUMBER(tc.TNKR_CMPT_NO)
        ";
        
        return $db->query($sql);
    }

    /* Open Order is similar to schedule by product */
    public function getOrderDetailsByTanker($supp, $openorder_no, $tanker_code)
    {
        $db = DB::getInstance();
        
        $sql = "
SELECT
        'BY_PRODUCT' as SCHD_TYPE
        , 
        (
            SELECT (CASE WHEN '$supp' <> (SELECT ORDER_DRAWER FROM CUST_ORDER WHERE ORDER_CUST_ORDNO = '$openorder_no') 
                    THEN (SELECT ORDER_DRAWER FROM CUST_ORDER WHERE ORDER_CUST_ORDNO = '$openorder_no') 
                    ELSE  '$supp' 
                    END) 
            FROM DUAL
        ) as SHLS_SUPP
        ,tc.TNKR_CMPT_NO
        ,tc.TRAILERCOMP
        ,NVL(sf.ADJ_AMNT,0) + tc.CMPT_CAPACIT CMPT_CAPACIT
        ,tc.CMPT_UNITS
        ,tc.UNIT
        ,tc.EQPT_CODE
        ,tc.TC_EQPT
        ,null as PROD_CODE
        ,null as ALLOWED_QTY
FROM
        (
        SELECT
                 ROWNUM TNKR_CMPT_NO
    , tc_tmp.*
  FROM
    (
    SELECT
         c.TRAILERCOMP
        ,c.CMPT_CAPACIT
        ,c.CMPT_UNITS
        ,un.DESCRIPTION UNIT
        ,te.TC_SEQNO
        ,trs.EQPT_CODE
        ,te.TC_EQPT
        ,c.ETYP_ID_RT
        ,te.TC_TANKER
    FROM
        TNKR_EQUIP te
        ,TRANSP_EQUIP trs
        ,UNIT_SCALE_VW un
        ,CMPT_VW c
    WHERE
        te.TC_EQPT = trs.EQPT_ID
        AND trs.EQPT_ETP = C.ETYP_ID_RT
        AND un.UNIT_ID = c.CMPT_UNITS
        AND te.TC_TANKER = '$tanker_code'
    ORDER BY te.TC_SEQNO,c.TRAILERCOMP
    ) tc_tmp
        ) tc,
        SFILL_ADJUST sf
WHERE
        tc.TC_EQPT = sf.ADJ_EQP(+)
        AND tc.TRAILERCOMP = sf.ADJ_CMPT(+)
ORDER BY TO_NUMBER(tc.TNKR_CMPT_NO)
        ";
        
        return $db->query($sql);
    }
    
    public function getScheduleDetailsBySuppTrip ($supp, $trip_no)
    {
        $db = DB::getInstance();
        $sql = "
            SELECT LD_TYPE
            FROM GUI_SCHEDULES
            WHERE SUPPLIER_CODE='$supp' AND SHLS_TRIP_NO='$trip_no'
            UNION
            SELECT LD_TYPE
            FROM GUI_NOM_SCHEDULES
            WHERE SUPPLIER_CODE='$supp' AND SHLS_TRIP_NO='$trip_no'
        ";
        // logMe("SCHE TPYE SQL=".$sql, MANUAL_TRANSACTION);
        $schd_type = "";
        $rows_schd_type = $db->query($sql);
        logMe("rows_schd_type[0]->LD_TYPE:" . strtoupper($rows_schd_type[0]->LD_TYPE), 
            MANUAL_TRANSACTION);
        if(strtoupper($rows_schd_type[0]->LD_TYPE) == "PRESCHEDULE")
        {
            // Schedule by compartment
            $schd_type = "BY_COMPARTMENT";
        }
        else if(strtoupper($rows_schd_type[0]->LD_TYPE) == "PREORDER" ||
            strtoupper($rows_schd_type[0]->LD_TYPE) == "CUSTOMERORDER")
        {
            // Schedule by product
            $schd_type = "BY_PRODUCT";
        }
        else
        {
            $schd_type = "UNKNOWN";
        }
        
        $mymsg = "getScheduleDetailsBySuppTrip -> schedule type ===>" . $schd_type;
        logMe($mymsg, MANUAL_TRANSACTION);
        
        // Get schedule details.
        $sql="
            SELECT
            SCHEDULE.SHL_TANKER
            ,TANKERS.TNKR_ETP
            FROM
            SCHEDULE
            ,TANKERS
            WHERE
            TANKERS.TNKR_CODE = SCHEDULE.SHL_TANKER
            AND SCHEDULE.SHLS_TRIP_NO = '$trip_no'
            AND SCHEDULE.SHLS_SUPP = '$supp'
        ";
        $rows_tanker = $db->query($sql);

        $tanker = $rows_tanker[0]->SHL_TANKER;
        $mymsg = "getScheduleDetailsBySuppTrip -> tanker ===>" . $tanker;
        logMe($mymsg, MANUAL_TRANSACTION);

        if($schd_type == "BY_COMPARTMENT")
        {
        $sql="
        SELECT
        'BY_COMPARTMENT' as SCHD_TYPE
        ,et.EQPT_CODE
        ,et.TNKR_CMPT_NO
        ,sd.UNIT UNIT
        ,et.TRAILERCOMP   TLR_CMPT
        ,sd.SHLS_SUPP
        ,sd.PROD_CODE
        ,sd.PROD_NAME
        ,sd.SCHD_UNITS CMPT_UNITS
        ,sd.SCHD_SPECQTY ALLOWED_QTY
        ,0 LOAD_QTY
        ,0 PRELD_QTY
        ,pr.PROD_NAME PREV_PROD
        ,DECODE(sd.ORDER_CUST_ORDNO,0,NULL,sd.ORDER_CUST_ORDNO) ORDER_CUST_ORDNO
        ,et.CMPT_CAPACIT
        ,'' ORDER_REF_CODE
        ,0.0 SCHORDER_QTY
        ,DECODE(pr.PROD_CODE,'-1',NULL,pr.PROD_CODE) PREV_PRODCODE
        ,et.TC_EQPT
        ,sd.SHLSLOAD_LOAD_ID
        ,sd.ARM_NAME
        ,sd.ARMCODE
        
        , NVL(DECODE(sd.SCHD_UNITS, 5, trsf.TRIP_QTY_AMB, 11, trsf.TRIP_QTY_STD, 17, trsf.TRIP_QTY_KG, trsf.TRIP_QTY_DELIVERED),0) as QTY_LOADED
        , sd.SCHD_PRLDQTY QTY_PRELOAD
        , trsf.TRIP_QTY_AMB QTY_AMB
        , trsf.TRIP_QTY_STD QTY_STD
        , trsf.TRIP_QTY_KG QTY_KG

        ,sd.CUSTOMER_CODE
        ,sd.DELIVERY_LOCATION
        ,sd.DELIVERY_NUMBER
    FROM
        (
            SELECT
                    tc.TNKR_CMPT_NO
                    ,tc.TRAILERCOMP
                    ,NVL(sf.ADJ_AMNT,0) + tc.CMPT_CAPACIT CMPT_CAPACIT
                    ,tc.CMPT_UNITS
                    ,tc.UNIT
                    ,tc.EQPT_CODE
                    ,tc.TC_EQPT
            FROM
                    (
                    SELECT
                             ROWNUM TNKR_CMPT_NO
                , tc_tmp.*
              FROM
                (
                SELECT
                     c.TRAILERCOMP
                    ,c.CMPT_CAPACIT
                    ,c.CMPT_UNITS
                    ,un.DESCRIPTION UNIT
                    ,te.TC_SEQNO
                    ,trs.EQPT_CODE
                    ,te.TC_EQPT
                    ,c.ETYP_ID_RT
                    ,te.TC_TANKER
                FROM
                    TNKR_EQUIP te
                    ,TRANSP_EQUIP trs
                    ,UNIT_SCALE_VW un
                    ,CMPT_VW c
                WHERE
                    te.TC_EQPT = trs.EQPT_ID
                    AND trs.EQPT_ETP = C.ETYP_ID_RT
                    AND un.UNIT_ID = c.CMPT_UNITS
                    AND te.TC_TANKER = '$tanker'
                ORDER BY te.TC_SEQNO,c.TRAILERCOMP
                ) tc_tmp
                    ) tc,
                    SFILL_ADJUST sf
            WHERE
                    tc.TC_EQPT = sf.ADJ_EQP(+)
                    AND tc.TRAILERCOMP = sf.ADJ_CMPT(+)
        ORDER BY TO_NUMBER(tc.TNKR_CMPT_NO)
        ) et,
        (
        SELECT
            PRODUCTS.PROD_NAME
            ,SPECDETS.SCHDPROD_PRODCODE PROD_CODE
            ,SPECDETS.SCHD_TRAILER
            ,SPECDETS.SCHD_TRAILERCOMP
            ,SPECDETS.SCHD_COMP_ID
            ,SPECDETS.SCHD_SPECQTY
            ,SPECDETS.SCHD_UNITS
            ,CUST_ORDER.ORDER_CUST_ORDNO
            ,un.DESCRIPTION UNIT
            ,SCHEDULE.SHLSLOAD_LOAD_ID
            ,BA_ARMS.ARM_NAME
            ,SPECDETS.ARMCODE
            ,SCHEDULE.SHLS_SUPP
            
            ,SPECDETS.SCHDSPEC_SHLSSUPP
            ,SPECDETS.SCHDSPEC_SHLSTRIP
            ,SPECDETS.SCHDPROD_PRODCMPY
            ,SPECDETS.SCHDPROD_PRODCODE
            ,SPECDETS.SCHD_PRLDQTY

            ,(SPECDETS.SCHD_SOLD_TO_NUM || NVL2(COMPANYS.CMPY_NAME,' - ','') || COMPANYS.CMPY_NAME) CUSTOMER_CODE
            ,(SPECDETS.SCHD_SHIP_TO_NUM || NVL2(DELV_LOCATION.DLV_NAME,' - ','') || DELV_LOCATION.DLV_NAME) DELIVERY_LOCATION
            ,SPECDETS.SCHD_DELIV_NUM DELIVERY_NUMBER
        FROM
            SPECDETS
            ,SCHEDULE
            ,PRODUCTS
            ,CUST_ORDER
            ,unit_scale_vw un
            ,BA_ARMS
            ,CUSTOMER
            ,COMPANYS
            ,DELV_LOCATION
        WHERE
            SPECDETS.SCHD_UNITS = un.UNIT_ID
            AND PRODUCTS.PROD_CODE = SPECDETS.SCHDPROD_PRODCODE
            AND PRODUCTS.PROD_CMPY = SPECDETS.SCHDPROD_PRODCMPY
            AND SCHEDULE.SHLS_TRIP_NO = SPECDETS.SCHDSPEC_SHLSTRIP
            AND SCHEDULE.SHLS_SUPP = SPECDETS.SCHDSPEC_SHLSSUPP
            AND CUST_ORDER.ORDER_NO(+) = SPECDETS.SCHD_ORDER
            AND SCHEDULE.SHLS_SUPP = '$supp'
            AND SCHEDULE.SHLS_TRIP_NO = '$trip_no'
            AND SPECDETS.ARMCODE = BA_ARMS.BAA_CODE(+)
            AND (SPECDETS.SCHD_SOLD_TO_NUM = CUSTOMER.CUST_ACCT(+) AND CUSTOMER.CUST_CODE = COMPANYS.CMPY_CODE(+))
            AND (SPECDETS.SCHD_SHIP_TO_NUM = DELV_LOCATION.DLV_CODE(+))
        ) sd,
        (
        SELECT
            PRODUCTS.PROD_NAME
            ,SPECDETS.SCHD_TRAILER
            ,SPECDETS.SCHD_TRAILERCOMP
            ,SPECDETS.SCHD_COMP_ID
            ,SPECDETS.SCHD_UNITS
            ,PRODUCTS.PROD_CODE
        FROM
            SPECDETS
            ,SCHEDULE
            ,PRODUCTS
        WHERE
            PRODUCTS.PROD_CODE = SPECDETS.SCHDPROD_PRODCODE
            AND PRODUCTS.PROD_CMPY = SPECDETS.SCHDPROD_PRODCMPY
            AND SCHEDULE.SHLS_TRIP_NO = SPECDETS.SCHDSPEC_SHLSTRIP
            AND SCHEDULE.SHLS_SUPP = SPECDETS.SCHDSPEC_SHLSSUPP
            AND (SCHEDULE.SHLS_TRIP_NO ,SCHEDULE.SHLS_SUPP) =
                (
                SELECT * FROM
                    (
                    SELECT
                        SCHEDULE.SHLS_TRIP_NO
                        ,SCHEDULE.SHLS_SUPP
                    FROM
                        LOADS
                        ,SCHEDULE
                    WHERE
                        LOADS.LD_TERMINAL = SCHEDULE.SHLSLOAD_LD_TRM
                        AND LOADS.LOAD_ID = SCHEDULE.SHLSLOAD_LOAD_ID
                        AND LOADS.LOAD_DMY < NVL(
                            (
                            SELECT
                                LOADS.LOAD_DMY
                            FROM
                                LOADS
                                ,SCHEDULE
                            WHERE
                                LOADS.LD_TERMINAL = SCHEDULE.SHLSLOAD_LD_TRM
                                AND LOADS.LOAD_ID = SCHEDULE.SHLSLOAD_LOAD_ID
                                AND LOADS.LOAD_DMY IS NOT NULL
                                AND SCHEDULE.SHLS_SUPP = '$supp'
                                AND SCHEDULE.SHL_TANKER = '$tanker'
                                AND SCHEDULE.SHLS_SUPP = '$supp'
                                AND SCHEDULE.SHLS_TRIP_NO = '$trip_no'
                            )
                            ,SYSDATE)
                        AND LOADS.LOAD_DMY IS NOT NULL
                        AND SCHEDULE.SHLS_SUPP = '$supp'
                        AND SCHEDULE.SHL_TANKER = '$tanker'
                    ORDER BY LOADS.LOAD_DMY DESC
                    )
                WHERE ROWNUM = 1
                )
        )pr,
        (
            SELECT 
                SCHEDULE.SHLS_SUPP as TRIP_SUPPLIER
                , SCHEDULE.SHLS_TRIP_NO AS TRIP_NO
              , TRANSFERS.TRSF_DES AS TRIP_COMPARTMENT
                , TRANSFERS.TRSFPROD_PRODCMPY AS TRIP_PRODCMPY
                , TRANSFERS.TRSFPROD_PRODCODE AS TRIP_PRODCODE
                , SUM(TRANSFERS.TRSF_QTY_AMB) AS TRIP_QTY_AMB
                , SUM(TRANSFERS.TRSF_QTY_COR) AS TRIP_QTY_STD
                , SUM(TRANSFERS.TRSF_LOAD_KG) AS TRIP_QTY_KG
              , SUM(TRANSFERS.TRSF_RETURNS) AS TRIP_QTY_RTN
              , SUM(TRANSFERS.TRSF_PRELOAD_KG) AS TRIP_QTY_PKG
              , SUM(TRANSFERS.TRSF_DELIVERED) AS TRIP_QTY_DELIVERED
            FROM 
              SCHEDULE
              , LOADS
              , TRANSACTIONS
              , TRANSFERS
            WHERE
                SCHEDULE.SHLSLOAD_LD_TRM = LOADS.LD_TERMINAL
            AND SCHEDULE.SHLSLOAD_LOAD_ID = LOADS.LOAD_ID
            AND LOADS.LOAD_ID = TRANSACTIONS.TRSALDID_LOAD_ID
            AND LOADS.LD_TERMINAL = TRANSACTIONS.TRSALDID_LD_TRM
            AND TRANSACTIONS.TRSA_ID = TRANSFERS.TRSFTRID_TRSA_ID
            AND TRANSACTIONS.TRSA_TERMINAL = TRANSFERS.TRSFTRID_TRSA_TRM
            GROUP BY SCHEDULE.SHLS_SUPP, SCHEDULE.SHLS_TRIP_NO, TRANSFERS.TRSF_DES, TRANSFERS.TRSFPROD_PRODCMPY, TRANSFERS.TRSFPROD_PRODCODE
        )trsf
    WHERE
            et.TNKR_CMPT_NO = sd.SCHD_COMP_ID(+)
        AND et.TNKR_CMPT_NO = pr.SCHD_COMP_ID(+)
        AND sd.SCHDSPEC_SHLSSUPP = trsf.TRIP_SUPPLIER(+)
        AND sd.SCHDSPEC_SHLSTRIP = trsf.TRIP_NO(+)
        AND sd.SCHDPROD_PRODCMPY = trsf.TRIP_PRODCMPY(+)
        AND sd.SCHDPROD_PRODCODE = trsf.TRIP_PRODCODE(+)
        AND sd.SCHD_COMP_ID      = trsf.TRIP_COMPARTMENT(+)
    ORDER BY TO_NUMBER(et.TNKR_CMPT_NO)
        ";
        }
        else
        {
/*        $sql="
    SELECT
        'BY_PRODUCT' as SCHD_TYPE
        ,et.EQPT_CODE
        ,et.TNKR_CMPT_NO
        ,null as UNIT
        ,et.TRAILERCOMP   TLR_CMPT
        ,sd.SHLS_SUPP
        ,null as PROD_CODE
        ,null as PROD_NAME
        ,null as CMPT_UNITS
        ,null as ALLOWED_QTY
        ,0 LOAD_QTY
        ,0 PRELD_QTY
        ,pr.PROD_NAME PREV_PROD
        ,null as ORDER_CUST_ORDNO
        ,et.CMPT_CAPACIT
        ,'' ORDER_REF_CODE
        ,0.0 SCHORDER_QTY
        ,DECODE(pr.PROD_CODE,'-1',NULL,pr.PROD_CODE) PREV_PRODCODE
        ,et.TC_EQPT
        ,null as SHLSLOAD_LOAD_ID
        ,null as ARM_NAME
        ,null as ARMCODE
        
        ,null as QTY_LOADED
        ,null as QTY_PRELOAD 
        ,null as QTY_AMB
        ,null as QTY_STD
        ,null as QTY_KG    
    FROM
        (
            SELECT
                    tc.TNKR_CMPT_NO
                    ,tc.TRAILERCOMP
                    ,NVL(sf.ADJ_AMNT,0) + tc.CMPT_CAPACIT CMPT_CAPACIT
                    ,tc.CMPT_UNITS
                    ,tc.UNIT
                    ,tc.EQPT_CODE
                    ,tc.TC_EQPT
            FROM
                    (
                    SELECT
                             ROWNUM TNKR_CMPT_NO
                , tc_tmp.*
              FROM
                (
                SELECT
                     c.TRAILERCOMP
                    ,c.CMPT_CAPACIT
                    ,c.CMPT_UNITS
                    ,un.DESCRIPTION UNIT
                    ,te.TC_SEQNO
                    ,trs.EQPT_CODE
                    ,te.TC_EQPT
                    ,c.ETYP_ID_RT
                    ,te.TC_TANKER
                FROM
                    TNKR_EQUIP te
                    ,TRANSP_EQUIP trs
                    ,UNIT_SCALE_VW un
                    ,CMPT_VW c
                WHERE
                    te.TC_EQPT = trs.EQPT_ID
                    AND trs.EQPT_ETP = C.ETYP_ID_RT
                    AND un.UNIT_ID = c.CMPT_UNITS
                    AND te.TC_TANKER = '$tanker'
                ORDER BY te.TC_SEQNO,c.TRAILERCOMP
                ) tc_tmp
                    ) tc,
                    SFILL_ADJUST sf
            WHERE
                    tc.TC_EQPT = sf.ADJ_EQP(+)
                    AND tc.TRAILERCOMP = sf.ADJ_CMPT(+)
        ORDER BY TO_NUMBER(tc.TNKR_CMPT_NO)
        ) et,
        (
        SELECT 
           SHLS_SUPP 
        FROM SCHEDULE
        WHERE 
            SCHEDULE.SHLS_SUPP = '$supp'
        AND SCHEDULE.SHLS_TRIP_NO = '$trip_no'
        ) sd,
        (
        SELECT
            PRODUCTS.PROD_NAME
            ,SPECDETS.SCHD_TRAILER
            ,SPECDETS.SCHD_TRAILERCOMP
            ,SPECDETS.SCHD_COMP_ID
            ,SPECDETS.SCHD_UNITS
            ,PRODUCTS.PROD_CODE
        FROM
            SPECDETS
            ,SCHEDULE
            ,PRODUCTS
        WHERE
            PRODUCTS.PROD_CODE = SPECDETS.SCHDPROD_PRODCODE
            AND PRODUCTS.PROD_CMPY = SPECDETS.SCHDPROD_PRODCMPY
            AND SCHEDULE.SHLS_TRIP_NO = SPECDETS.SCHDSPEC_SHLSTRIP
            AND SCHEDULE.SHLS_SUPP = SPECDETS.SCHDSPEC_SHLSSUPP
            AND (SCHEDULE.SHLS_TRIP_NO ,SCHEDULE.SHLS_SUPP) =
                (
                SELECT * FROM
                    (
                    SELECT
                        SCHEDULE.SHLS_TRIP_NO
                        ,SCHEDULE.SHLS_SUPP
                    FROM
                        LOADS
                        ,SCHEDULE
                    WHERE
                        LOADS.LD_TERMINAL = SCHEDULE.SHLSLOAD_LD_TRM
                        AND LOADS.LOAD_ID = SCHEDULE.SHLSLOAD_LOAD_ID
                        AND LOADS.LOAD_DMY < NVL(
                            (
                            SELECT
                                LOADS.LOAD_DMY
                            FROM
                                LOADS
                                ,SCHEDULE
                            WHERE
                                LOADS.LD_TERMINAL = SCHEDULE.SHLSLOAD_LD_TRM
                                AND LOADS.LOAD_ID = SCHEDULE.SHLSLOAD_LOAD_ID
                                AND LOADS.LOAD_DMY IS NOT NULL
                                AND SCHEDULE.SHLS_SUPP = '$supp'
                                AND SCHEDULE.SHL_TANKER = '$tanker'
                                AND SCHEDULE.SHLS_SUPP = '$supp'
                                AND SCHEDULE.SHLS_TRIP_NO = '$trip_no'
                            )
                            ,SYSDATE)
                        AND LOADS.LOAD_DMY IS NOT NULL
                        AND SCHEDULE.SHLS_SUPP = '$supp'
                        AND SCHEDULE.SHL_TANKER = '$tanker'
                    ORDER BY LOADS.LOAD_DMY DESC
                    )
                WHERE ROWNUM = 1
                )
        )pr
    WHERE
    --        et.TNKR_CMPT_NO = sd.SCHD_COMP_ID(+)
    --    AND et.TNKR_CMPT_NO = pr.SCHD_COMP_ID(+)
        et.TNKR_CMPT_NO = pr.SCHD_COMP_ID(+)
    --    AND et.TNKR_CMPT_NO = ord.SCHO_DAD_SCHDCMPT(+)
    ORDER BY TO_NUMBER(et.TNKR_CMPT_NO )
        ";
*/
        $sql="
    SELECT
        'BY_PRODUCT' as SCHD_TYPE
        ,et.EQPT_CODE
        ,et.TNKR_CMPT_NO
        ,null as UNIT
        ,et.TRAILERCOMP   TLR_CMPT
        ,sd2.SHLS_SUPP
        ,null as PROD_CODE
        ,null as PROD_NAME
        ,null as CMPT_UNITS
        ,null as ALLOWED_QTY
        ,0 LOAD_QTY
        ,0 PRELD_QTY
        ,pr.PROD_NAME PREV_PROD
        ,null as ORDER_CUST_ORDNO
        ,et.CMPT_CAPACIT
        ,'' ORDER_REF_CODE
        ,0.0 SCHORDER_QTY
        ,DECODE(pr.PROD_CODE,'-1',NULL,pr.PROD_CODE) PREV_PRODCODE
        ,et.TC_EQPT
        ,null as SHLSLOAD_LOAD_ID
        ,null as ARM_NAME
        ,null as ARMCODE
        
        , NVL(DECODE(sd.SCHD_UNITS, 5, trsf.TRIP_QTY_AMB, 11, trsf.TRIP_QTY_STD, 17, trsf.TRIP_QTY_KG, trsf.TRIP_QTY_DELIVERED),0) as QTY_LOADED
        , sd.SCHD_PRLDQTY QTY_PRELOAD 
        , trsf.TRIP_QTY_AMB QTY_AMB
        , trsf.TRIP_QTY_STD QTY_STD
        , trsf.TRIP_QTY_KG QTY_KG

        ,sd2.CUSTOMER_CODE
        ,sd2.DELIVERY_LOCATION
        ,sd2.DELIVERY_NUMBER
    FROM
        (
            SELECT
                    tc.TNKR_CMPT_NO
                    ,tc.TRAILERCOMP
                    ,NVL(sf.ADJ_AMNT,0) + tc.CMPT_CAPACIT CMPT_CAPACIT
                    ,tc.CMPT_UNITS
                    ,tc.UNIT
                    ,tc.EQPT_CODE
                    ,tc.TC_EQPT
            FROM
                    (
                    SELECT
                             ROWNUM TNKR_CMPT_NO
                , tc_tmp.*
              FROM
                (
                SELECT
                     c.TRAILERCOMP
                    ,c.CMPT_CAPACIT
                    ,c.CMPT_UNITS
                    ,un.DESCRIPTION UNIT
                    ,te.TC_SEQNO
                    ,trs.EQPT_CODE
                    ,te.TC_EQPT
                    ,c.ETYP_ID_RT
                    ,te.TC_TANKER
                FROM
                    TNKR_EQUIP te
                    ,TRANSP_EQUIP trs
                    ,UNIT_SCALE_VW un
                    ,CMPT_VW c
                WHERE
                    te.TC_EQPT = trs.EQPT_ID
                    AND trs.EQPT_ETP = C.ETYP_ID_RT
                    AND un.UNIT_ID = c.CMPT_UNITS
                    AND te.TC_TANKER = '$tanker'
                ORDER BY te.TC_SEQNO,c.TRAILERCOMP
                ) tc_tmp
                    ) tc,
                    SFILL_ADJUST sf
            WHERE
                    tc.TC_EQPT = sf.ADJ_EQP(+)
                    AND tc.TRAILERCOMP = sf.ADJ_CMPT(+)
        ORDER BY TO_NUMBER(tc.TNKR_CMPT_NO)
        ) et,
        (
        SELECT
            PRODUCTS.PROD_NAME
            ,SPECDETS.SCHDPROD_PRODCODE PROD_CODE
            ,SPECDETS.SCHD_TRAILER
            ,SPECDETS.SCHD_TRAILERCOMP
            ,SPECDETS.SCHD_COMP_ID
            ,SPECDETS.SCHD_SPECQTY
            ,SPECDETS.SCHD_UNITS
            ,CUST_ORDER.ORDER_CUST_ORDNO
            ,un.DESCRIPTION UNIT
            ,SCHEDULE.SHLSLOAD_LOAD_ID
            ,BA_ARMS.ARM_NAME
            ,SPECDETS.ARMCODE
            ,SCHEDULE.SHLS_SUPP
            
            ,SPECDETS.SCHDSPEC_SHLSSUPP
            ,SPECDETS.SCHDSPEC_SHLSTRIP
            ,SPECDETS.SCHDPROD_PRODCMPY
            ,SPECDETS.SCHDPROD_PRODCODE
            ,SPECDETS.SCHD_PRLDQTY
        FROM
            SPECDETS
            ,SCHEDULE
            ,PRODUCTS
            ,CUST_ORDER
            ,unit_scale_vw un
            ,BA_ARMS
        WHERE
            SPECDETS.SCHD_UNITS = un.UNIT_ID
            AND PRODUCTS.PROD_CODE = SPECDETS.SCHDPROD_PRODCODE
            AND PRODUCTS.PROD_CMPY = SPECDETS.SCHDPROD_PRODCMPY
            AND SCHEDULE.SHLS_TRIP_NO = SPECDETS.SCHDSPEC_SHLSTRIP
            AND SCHEDULE.SHLS_SUPP = SPECDETS.SCHDSPEC_SHLSSUPP
            AND CUST_ORDER.ORDER_NO(+) = SPECDETS.SCHD_ORDER
            AND SCHEDULE.SHLS_SUPP = '$supp'
            AND SCHEDULE.SHLS_TRIP_NO = '$trip_no'
            AND SPECDETS.ARMCODE = BA_ARMS.BAA_CODE(+)
        ) sd,
        (
        SELECT
           SHLS_SUPP
           ,(SCHEDULE.SHLS_SOLD_TO_NUM || NVL2(COMPANYS.CMPY_NAME,' - ','') || COMPANYS.CMPY_NAME) CUSTOMER_CODE
           ,(SCHEDULE.SHLS_SHIP_TO_NUM || NVL2(DELV_LOCATION.DLV_NAME,' - ','') || DELV_LOCATION.DLV_NAME) DELIVERY_LOCATION
           ,SCHEDULE.SHL_FLEET_DATA DELIVERY_NUMBER
        FROM SCHEDULE
            ,CUSTOMER
            ,COMPANYS
            ,DELV_LOCATION
        WHERE 
            SCHEDULE.SHLS_SUPP = '$supp'
        AND SCHEDULE.SHLS_TRIP_NO = '$trip_no'
        AND (SCHEDULE.SHLS_SOLD_TO_NUM = CUSTOMER.CUST_CODE(+) AND CUSTOMER.CUST_CODE = COMPANYS.CMPY_CODE(+))
        AND (SCHEDULE.SHLS_SHIP_TO_NUM = DELV_LOCATION.DLV_CODE(+))
        ) sd2,
        (
        SELECT
            PRODUCTS.PROD_NAME
            ,SPECDETS.SCHD_TRAILER
            ,SPECDETS.SCHD_TRAILERCOMP
            ,SPECDETS.SCHD_COMP_ID
            ,SPECDETS.SCHD_UNITS
            ,PRODUCTS.PROD_CODE
        FROM
            SPECDETS
            ,SCHEDULE
            ,PRODUCTS
        WHERE
            PRODUCTS.PROD_CODE = SPECDETS.SCHDPROD_PRODCODE
            AND PRODUCTS.PROD_CMPY = SPECDETS.SCHDPROD_PRODCMPY
            AND SCHEDULE.SHLS_TRIP_NO = SPECDETS.SCHDSPEC_SHLSTRIP
            AND SCHEDULE.SHLS_SUPP = SPECDETS.SCHDSPEC_SHLSSUPP
            AND (SCHEDULE.SHLS_TRIP_NO ,SCHEDULE.SHLS_SUPP) =
                (
                SELECT * FROM
                    (
                    SELECT
                        SCHEDULE.SHLS_TRIP_NO
                        ,SCHEDULE.SHLS_SUPP
                    FROM
                        LOADS
                        ,SCHEDULE
                    WHERE
                        LOADS.LD_TERMINAL = SCHEDULE.SHLSLOAD_LD_TRM
                        AND LOADS.LOAD_ID = SCHEDULE.SHLSLOAD_LOAD_ID
                        AND LOADS.LOAD_DMY < NVL(
                            (
                            SELECT
                                LOADS.LOAD_DMY
                            FROM
                                LOADS
                                ,SCHEDULE
                            WHERE
                                LOADS.LD_TERMINAL = SCHEDULE.SHLSLOAD_LD_TRM
                                AND LOADS.LOAD_ID = SCHEDULE.SHLSLOAD_LOAD_ID
                                AND LOADS.LOAD_DMY IS NOT NULL
                                AND SCHEDULE.SHLS_SUPP = '$supp'
                                AND SCHEDULE.SHL_TANKER = '$tanker'
                                AND SCHEDULE.SHLS_SUPP = '$supp'
                                AND SCHEDULE.SHLS_TRIP_NO = '$trip_no'
                            )
                            ,SYSDATE)
                        AND LOADS.LOAD_DMY IS NOT NULL
                        AND SCHEDULE.SHLS_SUPP = '$supp'
                        AND SCHEDULE.SHL_TANKER = '$tanker'
                    ORDER BY LOADS.LOAD_DMY DESC
                    )
                WHERE ROWNUM = 1
                )
        )pr,
        (
            SELECT
                SCHEDULE.SHLS_SUPP as TRIP_SUPPLIER
                , SCHEDULE.SHLS_TRIP_NO AS TRIP_NO
              , TRANSFERS.TRSF_DES AS TRIP_COMPARTMENT
                , TRANSFERS.TRSFPROD_PRODCMPY AS TRIP_PRODCMPY
                , TRANSFERS.TRSFPROD_PRODCODE AS TRIP_PRODCODE
                , SUM(TRANSFERS.TRSF_QTY_AMB) AS TRIP_QTY_AMB
                , SUM(TRANSFERS.TRSF_QTY_COR) AS TRIP_QTY_STD
                , SUM(TRANSFERS.TRSF_LOAD_KG) AS TRIP_QTY_KG
              , SUM(TRANSFERS.TRSF_RETURNS) AS TRIP_QTY_RTN
              , SUM(TRANSFERS.TRSF_PRELOAD_KG) AS TRIP_QTY_PKG
              , SUM(TRANSFERS.TRSF_DELIVERED) AS TRIP_QTY_DELIVERED
            FROM 
              SCHEDULE
              , LOADS
              , TRANSACTIONS
              , TRANSFERS
            WHERE
                SCHEDULE.SHLSLOAD_LD_TRM = LOADS.LD_TERMINAL
            AND SCHEDULE.SHLSLOAD_LOAD_ID = LOADS.LOAD_ID
            AND LOADS.LOAD_ID = TRANSACTIONS.TRSALDID_LOAD_ID
            AND LOADS.LD_TERMINAL = TRANSACTIONS.TRSALDID_LD_TRM
            AND TRANSACTIONS.TRSA_ID = TRANSFERS.TRSFTRID_TRSA_ID
            AND TRANSACTIONS.TRSA_TERMINAL = TRANSFERS.TRSFTRID_TRSA_TRM
            GROUP BY SCHEDULE.SHLS_SUPP, SCHEDULE.SHLS_TRIP_NO, TRANSFERS.TRSF_DES, TRANSFERS.TRSFPROD_PRODCMPY, TRANSFERS.TRSFPROD_PRODCODE
        )trsf
    WHERE
            et.TNKR_CMPT_NO = sd.SCHD_COMP_ID(+)
        AND et.TNKR_CMPT_NO = pr.SCHD_COMP_ID(+)
        AND sd.SCHDSPEC_SHLSSUPP = trsf.TRIP_SUPPLIER(+)
        AND sd.SCHDSPEC_SHLSTRIP = trsf.TRIP_NO(+) 
        AND sd.SCHDPROD_PRODCMPY = trsf.TRIP_PRODCMPY(+)
        AND sd.SCHDPROD_PRODCODE = trsf.TRIP_PRODCODE(+)
        AND sd.SCHD_COMP_ID      = trsf.TRIP_COMPARTMENT(+)
    ORDER BY TO_NUMBER(et.TNKR_CMPT_NO)
        ";
        }

        return $db->query($sql);
    }
    
    /**
    * Get the schedule details only for PreOrder and Carrier is 'Generic Carrier'.
    *
    * @param string $supp
    * @param string $trip_no
    * @param string $tanker_cd
    * @return trip details
    */
    public function getScheduleDetailsBySuppTrip_sub1 ($supp, $trip_no, $tanker_cd)
    {
        $db = DB::getInstance();
        //$sql="SELECT S.SHLS_DRAWER, SD.SCHD_COMP_ID, SD.SCHDPROD_PRODCODE, SD.SCHD_SPECQTY, SD.SCHD_UNITS FROM SCHEDULE S, SPECDETS SD WHERE S.SHLS_SUPP=SD.SCHDSPEC_SHLSSUPP AND S.SHLS_TRIP_NO=SD.SCHDSPEC_SHLSTRIP AND S.SHLS_SUPP='$supp' AND S.SHLS_TRIP_NO='$trip_no' ORDER BY SD.SCHD_COMP_ID ASC";
        // Check schedule type.
        $sql = "
 SELECT LD_TYPE
    FROM GUI_SCHEDULES
    WHERE SUPPLIER_CODE='$supp' AND SHLS_TRIP_NO='$trip_no'
 UNION
 SELECT LD_TYPE
    FROM GUI_NOM_SCHEDULES
    WHERE SUPPLIER_CODE='$supp' AND SHLS_TRIP_NO='$trip_no'
        ";
        // logMe("SCHE TPYE SQL=".$sql, MANUAL_TRANSACTION);
        $schd_type = "";
        $rows_schd_type = $db->query($sql);
        logMe("rows_schd_type[0]->LD_TYPE ===>".strtoupper($rows_schd_type[0]->LD_TYPE), MANUAL_TRANSACTION);
        if(strtoupper($rows_schd_type[0]->LD_TYPE) == "PRESCHEDULE")
        {
            // Schedule by compartment
            $schd_type = "BY_COMPARTMENT";
        }
        else if(strtoupper($rows_schd_type[0]->LD_TYPE) == "PREORDER" || strtoupper($rows_schd_type[0]->LD_TYPE) == "CUSTOMERORDER")
        {
            // Schedule by product
            $schd_type = "BY_PRODUCT";
        }
        else
        {
            $schd_type = "UNKNOWN";
        }
        
        $mymsg = "getScheduleDetailsBySuppTrip -> schedule type ===>" . $schd_type;
        logMe($mymsg, MANUAL_TRANSACTION);
        
        // Get schedule details.
        $sql="
SELECT
    SCHEDULE.SHL_TANKER
    ,TANKERS.TNKR_ETP
FROM
    SCHEDULE
    ,TANKERS
WHERE
    TANKERS.TNKR_CODE = SCHEDULE.SHL_TANKER
    AND SCHEDULE.SHLS_TRIP_NO = '$trip_no'
    AND SCHEDULE.SHLS_SUPP = '$supp'
        ";
        $rows_tanker = $db->query($sql);

        $tanker = $rows_tanker[0]->SHL_TANKER;
        $mymsg = "getScheduleDetailsBySuppTrip -> tanker ===>" . $tanker;
        //////////////////////////////////////////////////////////////////////////////////////
        // Use the tanker code passed. The only difference to getScheduleDetailsBySuppTrip().
        $tanker = $tanker_cd;
        $mymsg = "force tanker ===>" . $tanker;
        //////////////////////////////////////////////////////////////////////////////////////
        logMe($mymsg, MANUAL_TRANSACTION);

        if($schd_type == "BY_COMPARTMENT")
        {
        $sql="
    SELECT
        'BY_COMPARTMENT' as SCHD_TYPE
        ,et.EQPT_CODE
        ,et.TNKR_CMPT_NO
        ,sd.UNIT UNIT
        ,et.TRAILERCOMP   TLR_CMPT
        ,sd.SHLS_SUPP
        ,sd.PROD_CODE
        ,sd.PROD_NAME
        ,sd.SCHD_UNITS CMPT_UNITS
        ,sd.SCHD_SPECQTY ALLOWED_QTY
        ,0 LOAD_QTY
        ,0 PRELD_QTY
        ,pr.PROD_NAME PREV_PROD
        ,DECODE(sd.ORDER_CUST_ORDNO,0,NULL,sd.ORDER_CUST_ORDNO) ORDER_CUST_ORDNO
        ,et.CMPT_CAPACIT
        ,'' ORDER_REF_CODE
        ,0.0 SCHORDER_QTY
        ,DECODE(pr.PROD_CODE,'-1',NULL,pr.PROD_CODE) PREV_PRODCODE
        ,et.TC_EQPT
        ,sd.SHLSLOAD_LOAD_ID
        ,sd.ARM_NAME
        ,sd.ARMCODE
        
        , NVL(DECODE(sd.SCHD_UNITS, 5, trsf.TRIP_QTY_AMB, 11, trsf.TRIP_QTY_STD, 17, trsf.TRIP_QTY_KG, trsf.TRIP_QTY_DELIVERED),0) as QTY_LOADED
        , sd.SCHD_PRLDQTY QTY_PRELOAD
        , trsf.TRIP_QTY_AMB QTY_AMB
        , trsf.TRIP_QTY_STD QTY_STD
        , trsf.TRIP_QTY_KG QTY_KG

        ,sd.CUSTOMER_CODE
        ,sd.DELIVERY_LOCATION
        ,sd.DELIVERY_NUMBER
    FROM
        (
            SELECT
                    tc.TNKR_CMPT_NO
                    ,tc.TRAILERCOMP
                    ,NVL(sf.ADJ_AMNT,0) + tc.CMPT_CAPACIT CMPT_CAPACIT
                    ,tc.CMPT_UNITS
                    ,tc.UNIT
                    ,tc.EQPT_CODE
                    ,tc.TC_EQPT
            FROM
                    (
                    SELECT
                             ROWNUM TNKR_CMPT_NO
                , tc_tmp.*
              FROM
                (
                SELECT
                     c.TRAILERCOMP
                    ,c.CMPT_CAPACIT
                    ,c.CMPT_UNITS
                    ,un.DESCRIPTION UNIT
                    ,te.TC_SEQNO
                    ,trs.EQPT_CODE
                    ,te.TC_EQPT
                    ,c.ETYP_ID_RT
                    ,te.TC_TANKER
                FROM
                    TNKR_EQUIP te
                    ,TRANSP_EQUIP trs
                    ,UNIT_SCALE_VW un
                    ,CMPT_VW c
                WHERE
                    te.TC_EQPT = trs.EQPT_ID
                    AND trs.EQPT_ETP = C.ETYP_ID_RT
                    AND un.UNIT_ID = c.CMPT_UNITS
                    AND te.TC_TANKER = '$tanker'
                ORDER BY te.TC_SEQNO,c.TRAILERCOMP
                ) tc_tmp
                    ) tc,
                    SFILL_ADJUST sf
            WHERE
                    tc.TC_EQPT = sf.ADJ_EQP(+)
                    AND tc.TRAILERCOMP = sf.ADJ_CMPT(+)
        ORDER BY TO_NUMBER(tc.TNKR_CMPT_NO)
        ) et,
        (
        SELECT
            PRODUCTS.PROD_NAME
            ,SPECDETS.SCHDPROD_PRODCODE PROD_CODE
            ,SPECDETS.SCHD_TRAILER
            ,SPECDETS.SCHD_TRAILERCOMP
            ,SPECDETS.SCHD_COMP_ID
            ,SPECDETS.SCHD_SPECQTY
            ,SPECDETS.SCHD_UNITS
            ,CUST_ORDER.ORDER_CUST_ORDNO
            ,un.DESCRIPTION UNIT
            ,SCHEDULE.SHLSLOAD_LOAD_ID
            ,BA_ARMS.ARM_NAME
            ,SPECDETS.ARMCODE
            ,SCHEDULE.SHLS_SUPP
            
            ,SPECDETS.SCHDSPEC_SHLSSUPP
            ,SPECDETS.SCHDSPEC_SHLSTRIP
            ,SPECDETS.SCHDPROD_PRODCMPY
            ,SPECDETS.SCHDPROD_PRODCODE
            ,SPECDETS.SCHD_PRLDQTY

            ,(SPECDETS.SCHD_SOLD_TO_NUM || NVL2(COMPANYS.CMPY_NAME,' - ','') || COMPANYS.CMPY_NAME) CUSTOMER_CODE
            ,(SPECDETS.SCHD_SHIP_TO_NUM || NVL2(DELV_LOCATION.DLV_NAME,' - ','') || DELV_LOCATION.DLV_NAME) DELIVERY_LOCATION
            ,SPECDETS.SCHD_DELIV_NUM DELIVERY_NUMBER
        FROM
            SPECDETS
            ,SCHEDULE
            ,PRODUCTS
            ,CUST_ORDER
            ,unit_scale_vw un
            ,BA_ARMS
            ,CUSTOMER
            ,COMPANYS
            ,DELV_LOCATION
        WHERE
            SPECDETS.SCHD_UNITS = un.UNIT_ID
            AND PRODUCTS.PROD_CODE = SPECDETS.SCHDPROD_PRODCODE
            AND PRODUCTS.PROD_CMPY = SPECDETS.SCHDPROD_PRODCMPY
            AND SCHEDULE.SHLS_TRIP_NO = SPECDETS.SCHDSPEC_SHLSTRIP
            AND SCHEDULE.SHLS_SUPP = SPECDETS.SCHDSPEC_SHLSSUPP
            AND CUST_ORDER.ORDER_NO(+) = SPECDETS.SCHD_ORDER
            AND SCHEDULE.SHLS_SUPP = '$supp'
            AND SCHEDULE.SHLS_TRIP_NO = '$trip_no'
            AND SPECDETS.ARMCODE = BA_ARMS.BAA_CODE(+)
            AND (SPECDETS.SCHD_SOLD_TO_NUM = CUSTOMER.CUST_ACCT(+) AND CUSTOMER.CUST_CODE = COMPANYS.CMPY_CODE(+))
            AND (SPECDETS.SCHD_SHIP_TO_NUM = DELV_LOCATION.DLV_CODE(+))
        ) sd,
        (
        SELECT
            PRODUCTS.PROD_NAME
            ,SPECDETS.SCHD_TRAILER
            ,SPECDETS.SCHD_TRAILERCOMP
            ,SPECDETS.SCHD_COMP_ID
            ,SPECDETS.SCHD_UNITS
            ,PRODUCTS.PROD_CODE
        FROM
            SPECDETS
            ,SCHEDULE
            ,PRODUCTS
        WHERE
            PRODUCTS.PROD_CODE = SPECDETS.SCHDPROD_PRODCODE
            AND PRODUCTS.PROD_CMPY = SPECDETS.SCHDPROD_PRODCMPY
            AND SCHEDULE.SHLS_TRIP_NO = SPECDETS.SCHDSPEC_SHLSTRIP
            AND SCHEDULE.SHLS_SUPP = SPECDETS.SCHDSPEC_SHLSSUPP
            AND (SCHEDULE.SHLS_TRIP_NO ,SCHEDULE.SHLS_SUPP) =
                (
                SELECT * FROM
                    (
                    SELECT
                        SCHEDULE.SHLS_TRIP_NO
                        ,SCHEDULE.SHLS_SUPP
                    FROM
                        LOADS
                        ,SCHEDULE
                    WHERE
                        LOADS.LD_TERMINAL = SCHEDULE.SHLSLOAD_LD_TRM
                        AND LOADS.LOAD_ID = SCHEDULE.SHLSLOAD_LOAD_ID
                        AND LOADS.LOAD_DMY < NVL(
                            (
                            SELECT
                                LOADS.LOAD_DMY
                            FROM
                                LOADS
                                ,SCHEDULE
                            WHERE
                                LOADS.LD_TERMINAL = SCHEDULE.SHLSLOAD_LD_TRM
                                AND LOADS.LOAD_ID = SCHEDULE.SHLSLOAD_LOAD_ID
                                AND LOADS.LOAD_DMY IS NOT NULL
                                AND SCHEDULE.SHLS_SUPP = '$supp'
                                AND SCHEDULE.SHL_TANKER = '$tanker'
                                AND SCHEDULE.SHLS_SUPP = '$supp'
                                AND SCHEDULE.SHLS_TRIP_NO = '$trip_no'
                            )
                            ,SYSDATE)
                        AND LOADS.LOAD_DMY IS NOT NULL
                        AND SCHEDULE.SHLS_SUPP = '$supp'
                        AND SCHEDULE.SHL_TANKER = '$tanker'
                    ORDER BY LOADS.LOAD_DMY DESC
                    )
                WHERE ROWNUM = 1
                )
        )pr,
        (
            SELECT 
                SCHEDULE.SHLS_SUPP as TRIP_SUPPLIER
                , SCHEDULE.SHLS_TRIP_NO AS TRIP_NO
              , TRANSFERS.TRSF_DES AS TRIP_COMPARTMENT
                , TRANSFERS.TRSFPROD_PRODCMPY AS TRIP_PRODCMPY
                , TRANSFERS.TRSFPROD_PRODCODE AS TRIP_PRODCODE
                , SUM(TRANSFERS.TRSF_QTY_AMB) AS TRIP_QTY_AMB
                , SUM(TRANSFERS.TRSF_QTY_COR) AS TRIP_QTY_STD
                , SUM(TRANSFERS.TRSF_LOAD_KG) AS TRIP_QTY_KG
              , SUM(TRANSFERS.TRSF_RETURNS) AS TRIP_QTY_RTN
              , SUM(TRANSFERS.TRSF_PRELOAD_KG) AS TRIP_QTY_PKG
              , SUM(TRANSFERS.TRSF_DELIVERED) AS TRIP_QTY_DELIVERED
            FROM 
              SCHEDULE
              , LOADS
              , TRANSACTIONS
              , TRANSFERS
            WHERE
                SCHEDULE.SHLSLOAD_LD_TRM = LOADS.LD_TERMINAL
            AND SCHEDULE.SHLSLOAD_LOAD_ID = LOADS.LOAD_ID
            AND LOADS.LOAD_ID = TRANSACTIONS.TRSALDID_LOAD_ID
            AND LOADS.LD_TERMINAL = TRANSACTIONS.TRSALDID_LD_TRM
            AND TRANSACTIONS.TRSA_ID = TRANSFERS.TRSFTRID_TRSA_ID
            AND TRANSACTIONS.TRSA_TERMINAL = TRANSFERS.TRSFTRID_TRSA_TRM
            GROUP BY SCHEDULE.SHLS_SUPP, SCHEDULE.SHLS_TRIP_NO, TRANSFERS.TRSF_DES, TRANSFERS.TRSFPROD_PRODCMPY, TRANSFERS.TRSFPROD_PRODCODE
        )trsf
    WHERE
            et.TNKR_CMPT_NO = sd.SCHD_COMP_ID(+)
        AND et.TNKR_CMPT_NO = pr.SCHD_COMP_ID(+)
        AND sd.SCHDSPEC_SHLSSUPP = trsf.TRIP_SUPPLIER(+)
        AND sd.SCHDSPEC_SHLSTRIP = trsf.TRIP_NO(+)
        AND sd.SCHDPROD_PRODCMPY = trsf.TRIP_PRODCMPY(+)
        AND sd.SCHDPROD_PRODCODE = trsf.TRIP_PRODCODE(+)
        AND sd.SCHD_COMP_ID      = trsf.TRIP_COMPARTMENT(+)
    ORDER BY TO_NUMBER(et.TNKR_CMPT_NO)
        ";
        }
        else
        {
/*        $sql="
    SELECT
        'BY_PRODUCT' as SCHD_TYPE
        ,et.EQPT_CODE
        ,et.TNKR_CMPT_NO
        ,null as UNIT
        ,et.TRAILERCOMP   TLR_CMPT
        ,sd.SHLS_SUPP
        ,null as PROD_CODE
        ,null as PROD_NAME
        ,null as CMPT_UNITS
        ,null as ALLOWED_QTY
        ,0 LOAD_QTY
        ,0 PRELD_QTY
        ,pr.PROD_NAME PREV_PROD
        ,null as ORDER_CUST_ORDNO
        ,et.CMPT_CAPACIT
        ,'' ORDER_REF_CODE
        ,0.0 SCHORDER_QTY
        ,DECODE(pr.PROD_CODE,'-1',NULL,pr.PROD_CODE) PREV_PRODCODE
        ,et.TC_EQPT
        ,null as SHLSLOAD_LOAD_ID
        ,null as ARM_NAME
        ,null as ARMCODE
        
        ,null as QTY_LOADED
        ,null as QTY_PRELOAD 
        ,null as QTY_AMB
        ,null as QTY_STD
        ,null as QTY_KG    
    FROM
        (
            SELECT
                    tc.TNKR_CMPT_NO
                    ,tc.TRAILERCOMP
                    ,NVL(sf.ADJ_AMNT,0) + tc.CMPT_CAPACIT CMPT_CAPACIT
                    ,tc.CMPT_UNITS
                    ,tc.UNIT
                    ,tc.EQPT_CODE
                    ,tc.TC_EQPT
            FROM
                    (
                    SELECT
                             ROWNUM TNKR_CMPT_NO
                , tc_tmp.*
              FROM
                (
                SELECT
                     c.TRAILERCOMP
                    ,c.CMPT_CAPACIT
                    ,c.CMPT_UNITS
                    ,un.DESCRIPTION UNIT
                    ,te.TC_SEQNO
                    ,trs.EQPT_CODE
                    ,te.TC_EQPT
                    ,c.ETYP_ID_RT
                    ,te.TC_TANKER
                FROM
                    TNKR_EQUIP te
                    ,TRANSP_EQUIP trs
                    ,UNIT_SCALE_VW un
                    ,CMPT_VW c
                WHERE
                    te.TC_EQPT = trs.EQPT_ID
                    AND trs.EQPT_ETP = C.ETYP_ID_RT
                    AND un.UNIT_ID = c.CMPT_UNITS
                    AND te.TC_TANKER = '$tanker'
                ORDER BY te.TC_SEQNO,c.TRAILERCOMP
                ) tc_tmp
                    ) tc,
                    SFILL_ADJUST sf
            WHERE
                    tc.TC_EQPT = sf.ADJ_EQP(+)
                    AND tc.TRAILERCOMP = sf.ADJ_CMPT(+)
        ORDER BY TO_NUMBER(tc.TNKR_CMPT_NO)
        ) et,
        (
        SELECT 
           SHLS_SUPP 
        FROM SCHEDULE
        WHERE 
            SCHEDULE.SHLS_SUPP = '$supp'
        AND SCHEDULE.SHLS_TRIP_NO = '$trip_no'
        ) sd,
        (
        SELECT
            PRODUCTS.PROD_NAME
            ,SPECDETS.SCHD_TRAILER
            ,SPECDETS.SCHD_TRAILERCOMP
            ,SPECDETS.SCHD_COMP_ID
            ,SPECDETS.SCHD_UNITS
            ,PRODUCTS.PROD_CODE
        FROM
            SPECDETS
            ,SCHEDULE
            ,PRODUCTS
        WHERE
            PRODUCTS.PROD_CODE = SPECDETS.SCHDPROD_PRODCODE
            AND PRODUCTS.PROD_CMPY = SPECDETS.SCHDPROD_PRODCMPY
            AND SCHEDULE.SHLS_TRIP_NO = SPECDETS.SCHDSPEC_SHLSTRIP
            AND SCHEDULE.SHLS_SUPP = SPECDETS.SCHDSPEC_SHLSSUPP
            AND (SCHEDULE.SHLS_TRIP_NO ,SCHEDULE.SHLS_SUPP) =
                (
                SELECT * FROM
                    (
                    SELECT
                        SCHEDULE.SHLS_TRIP_NO
                        ,SCHEDULE.SHLS_SUPP
                    FROM
                        LOADS
                        ,SCHEDULE
                    WHERE
                        LOADS.LD_TERMINAL = SCHEDULE.SHLSLOAD_LD_TRM
                        AND LOADS.LOAD_ID = SCHEDULE.SHLSLOAD_LOAD_ID
                        AND LOADS.LOAD_DMY < NVL(
                            (
                            SELECT
                                LOADS.LOAD_DMY
                            FROM
                                LOADS
                                ,SCHEDULE
                            WHERE
                                LOADS.LD_TERMINAL = SCHEDULE.SHLSLOAD_LD_TRM
                                AND LOADS.LOAD_ID = SCHEDULE.SHLSLOAD_LOAD_ID
                                AND LOADS.LOAD_DMY IS NOT NULL
                                AND SCHEDULE.SHLS_SUPP = '$supp'
                                AND SCHEDULE.SHL_TANKER = '$tanker'
                                AND SCHEDULE.SHLS_SUPP = '$supp'
                                AND SCHEDULE.SHLS_TRIP_NO = '$trip_no'
                            )
                            ,SYSDATE)
                        AND LOADS.LOAD_DMY IS NOT NULL
                        AND SCHEDULE.SHLS_SUPP = '$supp'
                        AND SCHEDULE.SHL_TANKER = '$tanker'
                    ORDER BY LOADS.LOAD_DMY DESC
                    )
                WHERE ROWNUM = 1
                )
        )pr
    WHERE
    --        et.TNKR_CMPT_NO = sd.SCHD_COMP_ID(+)
    --    AND et.TNKR_CMPT_NO = pr.SCHD_COMP_ID(+)
        et.TNKR_CMPT_NO = pr.SCHD_COMP_ID(+)
    --    AND et.TNKR_CMPT_NO = ord.SCHO_DAD_SCHDCMPT(+)
    ORDER BY TO_NUMBER(et.TNKR_CMPT_NO )
        ";
*/
        $sql="
    SELECT
        'BY_PRODUCT' as SCHD_TYPE
        ,et.EQPT_CODE
        ,et.TNKR_CMPT_NO
        ,null as UNIT
        ,et.TRAILERCOMP   TLR_CMPT
        ,sd2.SHLS_SUPP
        ,null as PROD_CODE
        ,null as PROD_NAME
        ,null as CMPT_UNITS
        ,null as ALLOWED_QTY
        ,0 LOAD_QTY
        ,0 PRELD_QTY
        ,pr.PROD_NAME PREV_PROD
        ,null as ORDER_CUST_ORDNO
        ,et.CMPT_CAPACIT
        ,'' ORDER_REF_CODE
        ,0.0 SCHORDER_QTY
        ,DECODE(pr.PROD_CODE,'-1',NULL,pr.PROD_CODE) PREV_PRODCODE
        ,et.TC_EQPT
        ,null as SHLSLOAD_LOAD_ID
        ,null as ARM_NAME
        ,null as ARMCODE
        
        , NVL(DECODE(sd.SCHD_UNITS, 5, trsf.TRIP_QTY_AMB, 11, trsf.TRIP_QTY_STD, 17, trsf.TRIP_QTY_KG, trsf.TRIP_QTY_DELIVERED),0) as QTY_LOADED
        , sd.SCHD_PRLDQTY QTY_PRELOAD 
        , trsf.TRIP_QTY_AMB QTY_AMB
        , trsf.TRIP_QTY_STD QTY_STD
        , trsf.TRIP_QTY_KG QTY_KG

        ,sd2.CUSTOMER_CODE
        ,sd2.DELIVERY_LOCATION
        ,sd2.DELIVERY_NUMBER
    FROM
        (
            SELECT
                    tc.TNKR_CMPT_NO
                    ,tc.TRAILERCOMP
                    ,NVL(sf.ADJ_AMNT,0) + tc.CMPT_CAPACIT CMPT_CAPACIT
                    ,tc.CMPT_UNITS
                    ,tc.UNIT
                    ,tc.EQPT_CODE
                    ,tc.TC_EQPT
            FROM
                    (
                    SELECT
                             ROWNUM TNKR_CMPT_NO
                , tc_tmp.*
              FROM
                (
                SELECT
                     c.TRAILERCOMP
                    ,c.CMPT_CAPACIT
                    ,c.CMPT_UNITS
                    ,un.DESCRIPTION UNIT
                    ,te.TC_SEQNO
                    ,trs.EQPT_CODE
                    ,te.TC_EQPT
                    ,c.ETYP_ID_RT
                    ,te.TC_TANKER
                FROM
                    TNKR_EQUIP te
                    ,TRANSP_EQUIP trs
                    ,UNIT_SCALE_VW un
                    ,CMPT_VW c
                WHERE
                    te.TC_EQPT = trs.EQPT_ID
                    AND trs.EQPT_ETP = C.ETYP_ID_RT
                    AND un.UNIT_ID = c.CMPT_UNITS
                    AND te.TC_TANKER = '$tanker'
                ORDER BY te.TC_SEQNO,c.TRAILERCOMP
                ) tc_tmp
                    ) tc,
                    SFILL_ADJUST sf
            WHERE
                    tc.TC_EQPT = sf.ADJ_EQP(+)
                    AND tc.TRAILERCOMP = sf.ADJ_CMPT(+)
        ORDER BY TO_NUMBER(tc.TNKR_CMPT_NO)
        ) et,
        (
        SELECT
            PRODUCTS.PROD_NAME
            ,SPECDETS.SCHDPROD_PRODCODE PROD_CODE
            ,SPECDETS.SCHD_TRAILER
            ,SPECDETS.SCHD_TRAILERCOMP
            ,SPECDETS.SCHD_COMP_ID
            ,SPECDETS.SCHD_SPECQTY
            ,SPECDETS.SCHD_UNITS
            ,CUST_ORDER.ORDER_CUST_ORDNO
            ,un.DESCRIPTION UNIT
            ,SCHEDULE.SHLSLOAD_LOAD_ID
            ,BA_ARMS.ARM_NAME
            ,SPECDETS.ARMCODE
            ,SCHEDULE.SHLS_SUPP
            
            ,SPECDETS.SCHDSPEC_SHLSSUPP
            ,SPECDETS.SCHDSPEC_SHLSTRIP
            ,SPECDETS.SCHDPROD_PRODCMPY
            ,SPECDETS.SCHDPROD_PRODCODE
            ,SPECDETS.SCHD_PRLDQTY
        FROM
            SPECDETS
            ,SCHEDULE
            ,PRODUCTS
            ,CUST_ORDER
            ,unit_scale_vw un
            ,BA_ARMS
        WHERE
            SPECDETS.SCHD_UNITS = un.UNIT_ID
            AND PRODUCTS.PROD_CODE = SPECDETS.SCHDPROD_PRODCODE
            AND PRODUCTS.PROD_CMPY = SPECDETS.SCHDPROD_PRODCMPY
            AND SCHEDULE.SHLS_TRIP_NO = SPECDETS.SCHDSPEC_SHLSTRIP
            AND SCHEDULE.SHLS_SUPP = SPECDETS.SCHDSPEC_SHLSSUPP
            AND CUST_ORDER.ORDER_NO(+) = SPECDETS.SCHD_ORDER
            AND SCHEDULE.SHLS_SUPP = '$supp'
            AND SCHEDULE.SHLS_TRIP_NO = '$trip_no'
            AND SPECDETS.ARMCODE = BA_ARMS.BAA_CODE(+)
        ) sd,
        (
        SELECT
           SHLS_SUPP
           ,(SCHEDULE.SHLS_SOLD_TO_NUM || NVL2(COMPANYS.CMPY_NAME,' - ','') || COMPANYS.CMPY_NAME) CUSTOMER_CODE
           ,(SCHEDULE.SHLS_SHIP_TO_NUM || NVL2(DELV_LOCATION.DLV_NAME,' - ','') || DELV_LOCATION.DLV_NAME) DELIVERY_LOCATION
           ,SCHEDULE.SHL_FLEET_DATA DELIVERY_NUMBER
        FROM SCHEDULE
            ,CUSTOMER
            ,COMPANYS
            ,DELV_LOCATION
        WHERE 
            SCHEDULE.SHLS_SUPP = '$supp'
        AND SCHEDULE.SHLS_TRIP_NO = '$trip_no'
        AND (SCHEDULE.SHLS_SOLD_TO_NUM = CUSTOMER.CUST_CODE(+) AND CUSTOMER.CUST_CODE = COMPANYS.CMPY_CODE(+))
        AND (SCHEDULE.SHLS_SHIP_TO_NUM = DELV_LOCATION.DLV_CODE(+))
        ) sd2,
        (
        SELECT
            PRODUCTS.PROD_NAME
            ,SPECDETS.SCHD_TRAILER
            ,SPECDETS.SCHD_TRAILERCOMP
            ,SPECDETS.SCHD_COMP_ID
            ,SPECDETS.SCHD_UNITS
            ,PRODUCTS.PROD_CODE
        FROM
            SPECDETS
            ,SCHEDULE
            ,PRODUCTS
        WHERE
            PRODUCTS.PROD_CODE = SPECDETS.SCHDPROD_PRODCODE
            AND PRODUCTS.PROD_CMPY = SPECDETS.SCHDPROD_PRODCMPY
            AND SCHEDULE.SHLS_TRIP_NO = SPECDETS.SCHDSPEC_SHLSTRIP
            AND SCHEDULE.SHLS_SUPP = SPECDETS.SCHDSPEC_SHLSSUPP
            AND (SCHEDULE.SHLS_TRIP_NO ,SCHEDULE.SHLS_SUPP) =
                (
                SELECT * FROM
                    (
                    SELECT
                        SCHEDULE.SHLS_TRIP_NO
                        ,SCHEDULE.SHLS_SUPP
                    FROM
                        LOADS
                        ,SCHEDULE
                    WHERE
                        LOADS.LD_TERMINAL = SCHEDULE.SHLSLOAD_LD_TRM
                        AND LOADS.LOAD_ID = SCHEDULE.SHLSLOAD_LOAD_ID
                        AND LOADS.LOAD_DMY < NVL(
                            (
                            SELECT
                                LOADS.LOAD_DMY
                            FROM
                                LOADS
                                ,SCHEDULE
                            WHERE
                                LOADS.LD_TERMINAL = SCHEDULE.SHLSLOAD_LD_TRM
                                AND LOADS.LOAD_ID = SCHEDULE.SHLSLOAD_LOAD_ID
                                AND LOADS.LOAD_DMY IS NOT NULL
                                AND SCHEDULE.SHLS_SUPP = '$supp'
                                AND SCHEDULE.SHL_TANKER = '$tanker'
                                AND SCHEDULE.SHLS_SUPP = '$supp'
                                AND SCHEDULE.SHLS_TRIP_NO = '$trip_no'
                            )
                            ,SYSDATE)
                        AND LOADS.LOAD_DMY IS NOT NULL
                        AND SCHEDULE.SHLS_SUPP = '$supp'
                        AND SCHEDULE.SHL_TANKER = '$tanker'
                    ORDER BY LOADS.LOAD_DMY DESC
                    )
                WHERE ROWNUM = 1
                )
        )pr,
        (
            SELECT
                SCHEDULE.SHLS_SUPP as TRIP_SUPPLIER
                , SCHEDULE.SHLS_TRIP_NO AS TRIP_NO
              , TRANSFERS.TRSF_DES AS TRIP_COMPARTMENT
                , TRANSFERS.TRSFPROD_PRODCMPY AS TRIP_PRODCMPY
                , TRANSFERS.TRSFPROD_PRODCODE AS TRIP_PRODCODE
                , SUM(TRANSFERS.TRSF_QTY_AMB) AS TRIP_QTY_AMB
                , SUM(TRANSFERS.TRSF_QTY_COR) AS TRIP_QTY_STD
                , SUM(TRANSFERS.TRSF_LOAD_KG) AS TRIP_QTY_KG
              , SUM(TRANSFERS.TRSF_RETURNS) AS TRIP_QTY_RTN
              , SUM(TRANSFERS.TRSF_PRELOAD_KG) AS TRIP_QTY_PKG
              , SUM(TRANSFERS.TRSF_DELIVERED) AS TRIP_QTY_DELIVERED
            FROM 
              SCHEDULE
              , LOADS
              , TRANSACTIONS
              , TRANSFERS
            WHERE
                SCHEDULE.SHLSLOAD_LD_TRM = LOADS.LD_TERMINAL
            AND SCHEDULE.SHLSLOAD_LOAD_ID = LOADS.LOAD_ID
            AND LOADS.LOAD_ID = TRANSACTIONS.TRSALDID_LOAD_ID
            AND LOADS.LD_TERMINAL = TRANSACTIONS.TRSALDID_LD_TRM
            AND TRANSACTIONS.TRSA_ID = TRANSFERS.TRSFTRID_TRSA_ID
            AND TRANSACTIONS.TRSA_TERMINAL = TRANSFERS.TRSFTRID_TRSA_TRM
            GROUP BY SCHEDULE.SHLS_SUPP, SCHEDULE.SHLS_TRIP_NO, TRANSFERS.TRSF_DES, TRANSFERS.TRSFPROD_PRODCMPY, TRANSFERS.TRSFPROD_PRODCODE
        )trsf
    WHERE
            et.TNKR_CMPT_NO = sd.SCHD_COMP_ID(+)
        AND et.TNKR_CMPT_NO = pr.SCHD_COMP_ID(+)
        AND sd.SCHDSPEC_SHLSSUPP = trsf.TRIP_SUPPLIER(+)
        AND sd.SCHDSPEC_SHLSTRIP = trsf.TRIP_NO(+) 
        AND sd.SCHDPROD_PRODCMPY = trsf.TRIP_PRODCMPY(+)
        AND sd.SCHDPROD_PRODCODE = trsf.TRIP_PRODCODE(+)
        AND sd.SCHD_COMP_ID      = trsf.TRIP_COMPARTMENT(+)
    ORDER BY TO_NUMBER(et.TNKR_CMPT_NO)
        ";
        }

        return $db->query($sql);
    }

    public function getTankerByCarrier_OO($carrier_code)
    {
        $db = DB::getInstance();
        
        $sql="
SELECT gui_tnkr2.TNKR_CODE as TNKR_CODE, gui_tnkr2.TNKR_EQPT_NAME as TNKR_EQPT_NAME, gui_tnkr2.TNKR_CARRIER_NAME as TNKR_CARRIER_NAME
FROM 
    (
    SELECT tnkr.TNKR_CODE               AS TNKR_CODE ,
        tnkr.TNKR_NAME                  AS TNKR_NAME ,
        tnkr.TNKR_CARRIER               AS TNKR_CARRIER ,
        carr.CMPY_NAME                  AS TNKR_CARRIER_NAME ,
        tnkr.TNKR_OWNER                 AS TNKR_OWNER ,
        mngr.CMPY_NAME                  AS TNKR_OWNER_NAME ,
        tnkr.TNKR_ETP                   AS TNKR_ETP ,
        etyp.ETYP_TITLE                 AS TNKR_EQPT_NAME ,
        tnkr.TNKR_BASE_SITE             AS TNKR_BASE_SITE ,
        base.TERM_NAME                  AS TNKR_BASE_SITE_NAME ,
        tnkr.TNKR_DEST_DEPOT            AS TNKR_DEST_DEPOT ,
        dest.TERM_NAME                  AS TNKR_DEST_DEPOT_NAME ,
        tnkr.TNKR_LAST_DEPOT            AS TNKR_LAST_DEPOT ,
        prev.TERM_NAME                  AS TNKR_LAST_DEPOT_NAME ,
        tnkr.TNKR_CUR_DEPOT             AS TNKR_CUR_DEPOT ,
        curr.TERM_NAME                  AS TNKR_CUR_DEPOT_NAME ,
        tnkr.TNKR_PIN                   AS TNKR_PIN ,
        NVL(tnkr.TNKR_LOCK, 'N')        AS TNKR_LOCK ,
        NVL(tnkr.TNKR_ACTIVE, 'N')      AS TNKR_ACTIVE ,
        NVL(tnkr.TNKR_BAY_LOOP_CH, 'N') AS TNKR_BAY_LOOP_CH ,
        NVL(tnkr.TNKR_ARCHIVE, 'N')     AS TNKR_ARCHIVE ,
        tnkr.TNKR_NTRIPS                AS TNKR_NTRIPS ,
        tnkr.TNKR_OWN_TXT               AS TNKR_OWN_TXT ,
        tnkr.TNKR_LIC_EXP               AS TNKR_LIC_EXP ,
        tnkr.TNKR_DGLIC_EXP             AS TNKR_DGLIC_EXP ,
        tnkr.TNKR_INS_EXP               AS TNKR_INS_EXP ,
        tnkr.STATS                      AS TNKR_STATS ,
        tnkr.LAST_TRIP                  AS TNKR_LAST_TRIP ,
        tnkr.TNKR_MAX_KG                AS TNKR_MAX_KG
      FROM TANKERS tnkr ,
        EQUIP_TYPES etyp ,
        COMPANYS carr ,
        COMPANYS mngr ,
        TERMINAL base ,
        TERMINAL dest ,
        TERMINAL prev ,
        TERMINAL curr
      WHERE tnkr.TNKR_ETP                                = etyp.ETYP_ID(+)
      AND tnkr.TNKR_CARRIER                              = carr.CMPY_CODE(+)
      AND tnkr.TNKR_OWNER                                = mngr.CMPY_CODE(+)
      AND tnkr.TNKR_BASE_SITE                            = base.TERM_CODE(+)
      AND tnkr.TNKR_DEST_DEPOT                           = dest.TERM_CODE(+)
      AND tnkr.TNKR_LAST_DEPOT                           = prev.TERM_CODE(+)
      AND tnkr.TNKR_CUR_DEPOT                            = curr.TERM_CODE(+)
      AND upper(tnkr.TNKR_CODE) not in ('GENERIC TANKER','GENERIC NOM VOL','SPECIAL')
    ) gui_tnkr2 
WHERE 
    ( '-1'='$carrier_code' or 'ANY'='$carrier_code' or gui_tnkr2.tnkr_carrier='$carrier_code' )
order by gui_tnkr2.tnkr_code
            ";
// May need this condition later.
//       gui_tnkr2.TNKR_CODE in (select KYA_TANKER from ACCESS_KEYS)            
        
        return $db->query($sql);
    }

    public function getCarriersByOpenOrder($open_order)
    {
        $db = DB::getInstance();
        
        $sql="
SELECT C.CMPY_CODE, C.CMPY_NAME
FROM 
COMPANYS C,
CUST_ORDER CO
WHERE CO.ORDER_CUST_ORDNO = '$open_order'
AND CO.ORDER_CARRIER = C.CMPY_CODE
ORDER BY C.CMPY_CODE
        ";
        
        return $db->query($sql);
    }
    
    public function getAllCarriers()
    {
        $db = DB::getInstance();
        
        $sql="SELECT CMPY_CODE, CMPY_NAME FROM GUI_COMPANYS WHERE BITAND(CMPY_TYPE,4)<>0 ORDER BY CMPY_CODE ASC";
        
        return $db->query($sql);
    }
    
    public function getOrderProductsByCustOrderNo($custorderno)
    {
        $db = DB::getInstance();
//        $sql = "
//SELECT CO.ORDER_CUST_ORDNO, OPD.OSPROD_PRODCODE PROD_CODE, P.PROD_NAME, OPD.OSPROD_PRODCMPY PROD_CMPY, OPD.ORDER_PROD_QTY SCHP_SPECQTY, decode(OPD.ORDER_PROD_UNIT,'5','l(amb)','11','l(cor)','17','kg','unknown') UNIT_NAME
//FROM 
//    CUST_ORDER CO
//    ,OPRODMTD OPD
//    ,PRODUCTS P
//WHERE
//    OPD.ORDER_PROD_KEY=CO.ORDER_NO
//AND OPD.OSPROD_PRODCODE = P.PROD_CODE
//AND OPD.OSPROD_PRODCMPY = P.PROD_CMPY 
//AND ORDER_CUST_ORDNO='$custorderno'
//ORDER BY OPD.OSPROD_PRODCODE
        $sql = "
SELECT CO.ORDER_CUST_ORDNO, OPD.OSPROD_PRODCODE as SUPP_PROD_CODE, P.PROD_NAME as SUPP_PROD_NAME, P.PROD_CLASS as SUPP_PROD_CLASS, OPD.OSPROD_PRODCMPY SUPP_PROD_CMPY, OPD.ORDER_PROD_QTY SCHP_SPECQTY, decode(OPD.ORDER_PROD_UNIT,'5','l(amb)','11','l(cor)','17','kg','unknown') UNIT_NAME, NVL(OO_QTY.QTY_LOADED,0) QTY_LOADED, NVL(OO_QTY.QTY_AMB,0) QTY_AMB, NVL(OO_QTY.QTY_STD,0) QTY_STD, NVL(OO_QTY.QTY_KG,0) QTY_KG,
DRAWER_P.PROD_CMPY as PROD_CMPY, DRAWER_P.PROD_CODE as PROD_CODE, DRAWER_P.PROD_NAME as PROD_NAME, DRAWER_P.PROD_CLASS as PROD_CLASS
FROM 
    CUST_ORDER CO,
    OPRODMTD OPD,
    PRODUCTS P,
    PRODUCTS DRAWER_P,
    (
        select TRIP_PROD.PROD_CODE
            ,sum(TRIP_PROD.QTY_LOADED) QTY_LOADED
            ,sum(TRIP_PROD.QTY_AMB) QTY_AMB
            ,sum(TRIP_PROD.QTY_STD) QTY_STD
            ,sum(TRIP_PROD.QTY_KG) QTY_KG
        from
        CUST_ORDER CO,
        ORD_SCHEDULE OS,
        (
        select 
            pr.PROD_CODE as PROD_CODE
            , pr.PROD_NAME as PROD_NAME
            , pr.PROD_CMPY as PROD_CMPY
            , spec.SCHP_UNITS as UNIT_CODE
            , uv.DESCRIPTION as UNIT_NAME
            , spec.SCHP_SPECQTY as SCHP_SPECQTY
            , NVL(DECODE(spec.SCHP_UNITS, 5, trsf.TRIP_QTY_AMB, 11, trsf.TRIP_QTY_STD, 17, trsf.TRIP_QTY_KG, trsf.TRIP_QTY_DELIVERED),0) as QTY_LOADED
            , cmpt.TRIP_QTY_PRELOAD QTY_PRELOADED 
            , trsf.TRIP_QTY_AMB QTY_AMB
            , trsf.TRIP_QTY_STD QTY_STD
            , trsf.TRIP_QTY_KG QTY_KG
            , spec.SCHPSPID_SHLSTRIP
            , spec.SCHPSPID_SHLSSUPP
        from 
            SPECPROD spec
            , PRODUCTS pr
            , UNIT_SCALE_VW uv
            , (
        select 
            SPECDETS.SCHDSPEC_SHLSSUPP as TRIP_SUPPLIER
            , SPECDETS.SCHDSPEC_SHLSTRIP as TRIP_NO
            , SPECDETS.SCHDPROD_PRODCMPY as TRIP_PRODCMPY
            , SPECDETS.SCHDPROD_PRODCODE as TRIP_PRODCODE
            , SUM(SPECDETS.SCHD_PRESETQTY) as TRIP_QTY_PRESET
            , SUM(SPECDETS.SCHD_PRLDQTY) as TRIP_QTY_PRELOAD
            , SUM(SPECDETS.SCHD_SPECQTY) as TRIP_QTY_SCHED
            , SUM(SPECDETS.SCHD_DELIVERED) as TRIP_QTY_LOADED
        from SPECDETS
        group by SPECDETS.SCHDSPEC_SHLSSUPP, SPECDETS.SCHDSPEC_SHLSTRIP, SPECDETS.SCHDPROD_PRODCMPY, SPECDETS.SCHDPROD_PRODCODE
            ) cmpt
            , (
        select 
            SCHEDULE.SHLS_SUPP as TRIP_SUPPLIER
            , SCHEDULE.SHLS_TRIP_NO as TRIP_NO
            , TRANSFERS.TRSFPROD_PRODCMPY as TRIP_PRODCMPY
            , TRANSFERS.TRSFPROD_PRODCODE as TRIP_PRODCODE
            , SUM(TRANSFERS.TRSF_QTY_AMB) as TRIP_QTY_AMB
            , SUM(TRANSFERS.TRSF_QTY_COR) as TRIP_QTY_STD
            , SUM(TRANSFERS.TRSF_LOAD_KG) as TRIP_QTY_KG
          , SUM(TRANSFERS.TRSF_RETURNS) as TRIP_QTY_RTN
          , SUM(TRANSFERS.TRSF_PRELOAD_KG) as TRIP_QTY_PKG
          , SUM(TRANSFERS.TRSF_DELIVERED) as TRIP_QTY_DELIVERED
        from 
          SCHEDULE
          , LOADS
          , TRANSACTIONS
          , TRANSFERS
        where
            SCHEDULE.SHLSLOAD_LD_TRM = LOADS.LD_TERMINAL
        and SCHEDULE.SHLSLOAD_LOAD_ID = LOADS.LOAD_ID
        and LOADS.LOAD_ID = TRANSACTIONS.TRSALDID_LOAD_ID
        and LOADS.LD_TERMINAL = TRANSACTIONS.TRSALDID_LD_TRM
        and TRANSACTIONS.TRSA_ID = TRANSFERS.TRSFTRID_TRSA_ID
        and TRANSACTIONS.TRSA_TERMINAL = TRANSFERS.TRSFTRID_TRSA_TRM
        group by SCHEDULE.SHLS_SUPP, SCHEDULE.SHLS_TRIP_NO, TRANSFERS.TRSFPROD_PRODCMPY, TRANSFERS.TRSFPROD_PRODCODE
            ) trsf
        where 
            spec.SCHPSPID_SHLSSUPP = cmpt.TRIP_SUPPLIER (+)
            and spec.SCHPSPID_SHLSTRIP = cmpt.TRIP_NO (+)
            and spec.SCHPPROD_PRODCMPY = cmpt.TRIP_PRODCMPY (+)
            and spec.SCHPPROD_PRODCODE = cmpt.TRIP_PRODCODE (+)
            and cmpt.TRIP_SUPPLIER = trsf.TRIP_SUPPLIER (+)
            and cmpt.TRIP_NO = trsf.TRIP_NO (+)
            and cmpt.TRIP_PRODCMPY = trsf.TRIP_PRODCMPY (+)
            and cmpt.TRIP_PRODCODE = trsf.TRIP_PRODCODE (+)
            and spec.SCHPPROD_PRODCMPY = pr.PROD_CMPY
            and spec.SCHPPROD_PRODCODE = pr.PROD_CODE
            and uv.UNIT_ID = spec.SCHP_UNITS
        order by spec.SCHPSPID_SHLSSUPP, spec.SCHPSPID_SHLSTRIP, pr.PROD_NAME
        ) trip_prod
        where
            CO.ORDER_NO = OS.OS_ORDER_NO
            and OS.OS_SHL_SHLSTRIP = trip_prod.SCHPSPID_SHLSTRIP
            and OS.OS_SHL_SHLSSUPP = trip_prod.SCHPSPID_SHLSSUPP
            and CO.ORDER_CUST_ORDNO = '$custorderno'
        group by trip_prod.PROD_CODE, CO.ORDER_CUST_ORDNO
    ) OO_QTY
WHERE
    OPD.ORDER_PROD_KEY=CO.ORDER_NO
AND OPD.OSPROD_PRODCODE = P.PROD_CODE
AND OPD.OSPROD_PRODCMPY = P.PROD_CMPY
AND DRAWER_P.PROD_CLASS = P.PROD_CLASS -- get comptiable drawer products
AND DRAWER_P.PROD_CMPY = CO.ORDER_DRAWER -- get comptiable drawer products
AND OPD.OSPROD_PRODCODE = OO_QTY.PROD_CODE(+)
AND ORDER_CUST_ORDNO='$custorderno'
ORDER BY OPD.OSPROD_PRODCODE
        ";
        
        return $db->query($sql);
    }
    
    public function getAdditionalInfoByOpenOrder($open_order)
    {
        $db = DB::getInstance();
        
        $sql="
SELECT (CO.ORD_SOLD_TO_NUM || NVL2(CMPY.CMPY_NAME,' - ','') || CMPY.CMPY_NAME) as CUSTOMER_CODE, (CO.ORD_SHIP_TO_NUM || NVL2(DL.DLV_NAME,' - ','') || DL.DLV_NAME) as DELIVERY_LOCATION
FROM
CUST_ORDER CO,
CUSTOMER CUST,
COMPANYS CMPY,
DELV_LOCATION DL
WHERE CO.ORDER_CUST_ORDNO = '$open_order'
AND (CO.ORD_SOLD_TO_NUM = CUST.CUST_CODE(+) AND CUST.CUST_CODE = CMPY.CMPY_CODE(+))
AND CO.ORD_SHIP_TO_NUM = DL.DLV_CODE(+)
        ";
        
        return $db->query($sql);
    }
    
    public function getTankerByCarrier($carrier_code)
    {
        $db = DB::getInstance();
        
        $sql="
SELECT gui_tnkr2.TNKR_CODE as TNKR_CODE, gui_tnkr2.TNKR_EQPT_NAME as TNKR_EQPT_NAME, gui_tnkr2.TNKR_CARRIER_NAME as TNKR_CARRIER_NAME
FROM
    (
    SELECT tnkr.TNKR_CODE               AS TNKR_CODE,
        tnkr.TNKR_NAME                  AS TNKR_NAME,
        tnkr.TNKR_CARRIER               AS TNKR_CARRIER ,
        carr.CMPY_NAME                  AS TNKR_CARRIER_NAME,
        tnkr.TNKR_OWNER                 AS TNKR_OWNER,
        mngr.CMPY_NAME                  AS TNKR_OWNER_NAME,
        tnkr.TNKR_ETP                   AS TNKR_ETP,
        etyp.ETYP_TITLE                 AS TNKR_EQPT_NAME,
        tnkr.TNKR_BASE_SITE             AS TNKR_BASE_SITE,
        base.TERM_NAME                  AS TNKR_BASE_SITE_NAME,
        tnkr.TNKR_DEST_DEPOT            AS TNKR_DEST_DEPOT,
        dest.TERM_NAME                  AS TNKR_DEST_DEPOT_NAME,
        tnkr.TNKR_LAST_DEPOT            AS TNKR_LAST_DEPOT,
        prev.TERM_NAME                  AS TNKR_LAST_DEPOT_NAME,
        tnkr.TNKR_CUR_DEPOT             AS TNKR_CUR_DEPOT,
        curr.TERM_NAME                  AS TNKR_CUR_DEPOT_NAME,
        tnkr.TNKR_PIN                   AS TNKR_PIN,
        NVL(tnkr.TNKR_LOCK, 'N')        AS TNKR_LOCK,
        NVL(tnkr.TNKR_ACTIVE, 'N')      AS TNKR_ACTIVE,
        NVL(tnkr.TNKR_BAY_LOOP_CH, 'N') AS TNKR_BAY_LOOP_CH,
        NVL(tnkr.TNKR_ARCHIVE, 'N')     AS TNKR_ARCHIVE,
        tnkr.TNKR_NTRIPS                AS TNKR_NTRIPS,
        tnkr.TNKR_OWN_TXT               AS TNKR_OWN_TXT,
        tnkr.TNKR_LIC_EXP               AS TNKR_LIC_EXP,
        tnkr.TNKR_DGLIC_EXP             AS TNKR_DGLIC_EXP,
        tnkr.TNKR_INS_EXP               AS TNKR_INS_EXP,
        tnkr.STATS                      AS TNKR_STATS,
        tnkr.LAST_TRIP                  AS TNKR_LAST_TRIP,
        tnkr.TNKR_MAX_KG                AS TNKR_MAX_KG
      FROM
        TANKERS tnkr,
        EQUIP_TYPES etyp,
        COMPANYS carr,
        COMPANYS mngr,
        TERMINAL base,
        TERMINAL dest,
        TERMINAL prev,
        TERMINAL curr
      WHERE
          tnkr.TNKR_ETP                                = etyp.ETYP_ID(+)
      AND tnkr.TNKR_CARRIER                              = carr.CMPY_CODE(+)
      AND tnkr.TNKR_OWNER                                = mngr.CMPY_CODE(+)
      AND tnkr.TNKR_BASE_SITE                            = base.TERM_CODE(+)
      AND tnkr.TNKR_DEST_DEPOT                           = dest.TERM_CODE(+)
      AND tnkr.TNKR_LAST_DEPOT                           = prev.TERM_CODE(+)
      AND tnkr.TNKR_CUR_DEPOT                            = curr.TERM_CODE(+)
      AND upper(tnkr.TNKR_CODE) not in ('GENERIC TANKER','GENERIC NOM VOL','SPECIAL')
    ) gui_tnkr2
WHERE
    ( '-1'='$carrier_code' or 'ANY'='$carrier_code' or gui_tnkr2.tnkr_carrier='$carrier_code' )
order by gui_tnkr2.tnkr_code
            ";
// May need this condition later.
//       gui_tnkr2.TNKR_CODE in (select KYA_TANKER from ACCESS_KEYS)
        
        return $db->query($sql);
    }

    public function getDriverCodeBySuppDrawer($supp, $drawer)
    {
        $db = DB::getInstance();
        
        //$sql="SELECT PER_CODE, PER_NAME FROM PERSONNEL WHERE upper(PER_CMPY) = '$supp' AND PER_AUTH IN (7,8,9) ORDER BY PER_CODE ASC";
        $sql="SELECT PER_CODE, PER_NAME FROM PERSONNEL WHERE PER_AUTH IN (7,8,9) ORDER BY PER_CODE ASC";
//        $sql="
//SELECT PER_CODE, PER_NAME FROM PERSONNEL
//WHERE 
//PER_AUTH IN (7,8,9) 
//AND PER_CODE IN (SELECT KYA_PSN FROM ACCESS_KEYS WHERE ('-1'='$param->supp' or KYA_SP_SUPPLIER='$param->supp') AND ('-1'='$param->drawer' or KYA_DRAWER='$param->drawer'))
//ORDER BY PER_CODE ASC
//        ";
        return $db->query($sql);
    }
    
    public function getTripNumberBySupplier($type, $cmpy_code)
    {
        $db = DB::getInstance();
        
        if($type == "S") // Shipment
            $sql="SELECT SHLS_TRIP_NO FROM SCHEDULE WHERE (STATS IN ('F','A') OR STATS IS NULL) AND SHLS_SUPP='$cmpy_code' AND SHLS_CLASS=0 ORDER BY SHLS_CALDATE DESC";
        elseif ($type == "N")  //  Nomination
            $sql="SELECT SHLS_TRIP_NO FROM SCHEDULE WHERE (STATS IN ('F','A') OR STATS IS NULL) AND SHLS_SUPP='$cmpy_code' AND SHLS_CLASS=1 ORDER BY SHLS_CALDATE DESC";
        else
            $sql="SELECT SHLS_TRIP_NO FROM SCHEDULE WHERE (STATS IN ('F','A') OR STATS IS NULL) AND SHLS_SUPP='$cmpy_code' ORDER BY SHLS_CALDATE DESC";
        
        return $db->query($sql);
    }
    
    public function getBasesVCFInfo()
    {
        $db = DB::getInstance();
        
        $sql="
SELECT TK.TANK_BASE,TK.TANK_CODE,BSCLS.BCLASS_NO,BSCLS.BCLASS_DESC,TK.TANK_PROD_C_OF_E 
FROM TANKS TK, BASE_PRODS BP, BASECLASS BSCLS
WHERE TK.TANK_BASE=BP.BASE_CODE(+)
  AND BP.BASE_CAT=BSCLS.BCLASS_NO(+)
";
        return $db->query($sql);
    }

    /////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////
    /* replace amf async call [END] */

    public function getTankInfoByProdArm ($drawer, $drawerprod, $arm)
    {
        $db = DB::getInstance();

        $sql="
select STREAM_ARMCODE, STREAM_MTRCODE, STREAM_INJCODE, STREAM_BASECODE, STREAM_TANKCODE, STREAM_TANKDEN, STREAM_TANKTEMP as BASE_RPT_TEMP, BP.BASE_RPT_TEMP as BASE_RPT_TEMP2, R.RATIO_VALUE, TK.TANK_GAUGINGMTHD, BP.BASE_CAT
from 
RATIOS R,
GUI_PIPENODE B,
BASE_PRODS BP,
TANKS TK
where
     B.STREAM_BASECODE = R.RATIO_BASE(+)
 and B.STREAM_BASECODE = BP.BASE_CODE(+)
 and B.STREAM_TANKCODE = TK.TANK_CODE(+)
 and RAT_PROD_PRODCMPY = '$drawer' and RAT_PROD_PRODCODE = '$drawerprod' and STREAM_ARMCODE='$arm'
order by B.STREAM_ARMCODE
     ";
        return $db->query($sql);
    }

    /**
    * Save manual transaction data.
    *
    * @param string $module_id
    * @param string $module_name
    * @param string $head_data
    * @param string $body_data
    * @param string $user
    * @param string $status    
    * @return exec status 
    */
    public function saveMTData($module_id, $module_name, $head_data, $body_data, $user, $status)
    {
        logMe("Info: ++++++Running into saveMTData()++++++", MANUAL_TRANSACTION);
        
        $ret = 0;
        
        $db = DB::getInstance();
        
        $sql = "INSERT INTO GUI_USER_DATA
        (
            GUD_MODULE_ID,
            GUD_MODULE_NAME,
            GUD_HEAD_DATA,
            GUD_BODY_DATA,
            GUD_USER,
            GUD_CREATE_DATE,
            GUD_UPDATE_DATE,
            GUD_STATUS
        ) 
        VALUES
        (
            '".$module_id."',
            '".$module_name."',
            EMPTY_CLOB(),
            EMPTY_CLOB(),
            '".$user."',
            sysdate,
            null,
            '".$status."'
        )
        RETURNING
        GUD_HEAD_DATA,GUD_BODY_DATA INTO :mylob_loc_head, :mylob_loc_body";
        logMe("SQL==> ".$sql, MANUAL_TRANSACTION);

        $stmt = oci_parse($db->connect, $sql);
        logMe("Info: oci_parse -> OK", MANUAL_TRANSACTION);

        // Creates an "empty" OCI-Lob object to bind to the locator
        $myLOB_hd = oci_new_descriptor($db->connect, OCI_D_LOB);
        $myLOB_by = oci_new_descriptor($db->connect, OCI_D_LOB);
        logMe("Info: oci_new_descriptor -> OK", MANUAL_TRANSACTION);

        // Bind the returned Oracle LOB locator to the PHP LOB object
        oci_bind_by_name($stmt, ":mylob_loc_head", $myLOB_hd, -1, OCI_B_CLOB);
        oci_bind_by_name($stmt, ":mylob_loc_body", $myLOB_by, -1, OCI_B_CLOB);
        logMe("Info: oci_bind_by_name -> OK", MANUAL_TRANSACTION);

        // Execute the statement using , OCI_DEFAULT - as a transaction
        $r = oci_execute($stmt, OCI_DEFAULT);
        ////or die ("Unable to execute query\n");
        if ($r == true)
            logMe("Info: oci_execute -> OK", MANUAL_TRANSACTION);
        else
            logMe("Info: oci_execute -> Failed", MANUAL_TRANSACTION);
            
        // Now save a value to the LOB
        if (!$myLOB_hd->save($head_data) || !$myLOB_by->save($body_data)) {
            // On error, rollback the transaction
            oci_rollback($db->connect);
            logMe("Info: oci_rollback -> OK", MANUAL_TRANSACTION);
            $ret = -1;
        } else {
            // On success, get the last seq id and commit the transaction
            $sql_t="select max(GUD_ID) MAX_SEQ from GUI_USER_DATA";
            $r_t = $db->query($sql_t, OCI_DEFAULT); // =>OCI_NO_AUTO_COMMIT
            oci_commit($db->connect);
            logMe("Info: max(GUD_ID) =".$r_t[0]->MAX_SEQ, MANUAL_TRANSACTION);
            logMe("Info: oci_commit -> OK", MANUAL_TRANSACTION);
            if($r_t[0]->MAX_SEQ > 0)
                $ret = $r_t[0]->MAX_SEQ;
            else
                $ret = -1;
        }
    
        // Free resources
        oci_free_statement($stmt);
        $myLOB_hd->free();
        $myLOB_by->free();

        return $ret;
    }

    /**
    * Read manual transaction data - head only
    *
    * @param string $seq_id
    * @return manual transaction dataset
    */
    public function readMTHeadData($seq_id)
    {
        logMe("Info: ++++++Running into readMTHeadData()++++++", MANUAL_TRANSACTION);
        
        $ret = array();
        
        $db = DB::getInstance();
        
        if ($seq_id == null) {
            $sql = "
            SELECT
                GUD_ID,
                GUD_MODULE_ID,
                GUD_MODULE_NAME,
                GUD_HEAD_DATA,
                GUD_USER,
                to_char(GUD_CREATE_DATE, 'dd/mm/yyyy hh24:mi:ss') GUD_CREATE_DATE,
                to_char(GUD_UPDATE_DATE, 'dd/mm/yyyy hh24:mi:ss') GUD_UPDATE_DATE,
                GUD_STATUS
            FROM
                GUI_USER_DATA
            WHERE
                GUD_MODULE_ID='MANUAL_TRANSACTIONS'
            ORDER BY 
                GUD_ID DESC";
        } else {
            $sql = "
            SELECT
                GUD_ID,
                GUD_MODULE_ID,
                GUD_MODULE_NAME,
                GUD_HEAD_DATA,
                GUD_USER,
                to_char(GUD_CREATE_DATE, 'dd/mm/yyyy hh24:mi:ss') GUD_CREATE_DATE,
                to_char(GUD_UPDATE_DATE, 'dd/mm/yyyy hh24:mi:ss') GUD_UPDATE_DATE,
                GUD_STATUS
            FROM
                GUI_USER_DATA
            WHERE
                GUD_MODULE_ID='MANUAL_TRANSACTIONS'
            AND GUD_ID=".$seq_id."
            ORDER BY 
                GUD_ID DESC";
        }
        logMe("SQL==> ".$sql, MANUAL_TRANSACTION);
        
        $stmt = oci_parse($db->connect, $sql);
        
        $r = oci_execute($stmt);
        ////or die ("Unable to execute query\n");
        if ($r == true)
            logMe("Info: oci_execute -> OK", MANUAL_TRANSACTION);
        else
            logMe("Info: oci_execute -> Failed", MANUAL_TRANSACTION);
        
        while ( $row = oci_fetch_assoc($stmt) ) {
            $data = new MT_GUI_Data();
            //print "ID: {$row['ID']}, ";

            // Call the load() method to get the contents of the LOB
            $data->gud_id = $row['GUD_ID'];
            logMe("Info: GUD_ID -> >".$data->gud_id."<", MANUAL_TRANSACTION);
            $data->gud_module_id = $row['GUD_MODULE_ID'];
            logMe("Info: GUD_MODULE_ID -> >".$data->gud_module_id."<", MANUAL_TRANSACTION);
            $data->gud_module_name = $row['GUD_MODULE_NAME'];
            logMe("Info: GUD_MODULE_NAME -> >".$data->gud_module_name."<", MANUAL_TRANSACTION);
            
            $data->gud_head_data = $row['GUD_HEAD_DATA']->load();
            logMe("Info: GUD_HEAD_DATA -> >".$data->gud_head_data."<", MANUAL_TRANSACTION);
            
            $data->gud_user = $row['GUD_USER'];
            logMe("Info: GUD_ID -> >".$data->gud_user."<", MANUAL_TRANSACTION);
            $data->gud_create_date = $row['GUD_CREATE_DATE'];
            logMe("Info: GUD_CREATE_DATE -> >".$data->gud_create_date."<", MANUAL_TRANSACTION);
            $data->gud_status = $row['GUD_STATUS'];
            logMe("Info: GUD_STATUS -> >".$data->gud_status."<", MANUAL_TRANSACTION);
            $ret[] = $data;
        }
        
        // Free resources
        oci_free_statement($stmt);

        return $ret;
    }
    
    /**
    * Read manual transaction data.
    *
    * @param string $seq_id
    * @return manual transaction dataset
    */
    public function readMTData($seq_id)
    {
        logMe("Info: ++++++Running into readMTData()++++++", MANUAL_TRANSACTION);
        
        $ret = array();
        
        $db = DB::getInstance();
        
        if ($seq_id == null) {
            $sql = "
            SELECT
                GUD_ID,
                GUD_MODULE_ID,
                GUD_MODULE_NAME,
                GUD_HEAD_DATA,
                GUD_BODY_DATA,
                GUD_USER,
                to_char(GUD_CREATE_DATE, 'dd/mm/yyyy hh24:mi:ss') GUD_CREATE_DATE,
                to_char(GUD_UPDATE_DATE, 'dd/mm/yyyy hh24:mi:ss') GUD_UPDATE_DATE,
                GUD_STATUS
            FROM
                GUI_USER_DATA
            WHERE
                GUD_MODULE_ID='MANUAL_TRANSACTIONS'
            ORDER BY
                GUD_ID DESC";
        } else {
            $sql = "
            SELECT
                GUD_ID,
                GUD_MODULE_ID,
                GUD_MODULE_NAME,
                GUD_HEAD_DATA,
                GUD_BODY_DATA,
                GUD_USER,
                to_char(GUD_CREATE_DATE, 'dd/mm/yyyy hh24:mi:ss') GUD_CREATE_DATE,
                to_char(GUD_UPDATE_DATE, 'dd/mm/yyyy hh24:mi:ss') GUD_UPDATE_DATE,
                GUD_STATUS
            FROM
                GUI_USER_DATA 
            WHERE
                GUD_MODULE_ID='MANUAL_TRANSACTIONS'
            AND GUD_ID=".$seq_id."
            ORDER BY 
                GUD_ID DESC";
        }
        logMe("SQL==> ".$sql, MANUAL_TRANSACTION);
        
        $stmt = oci_parse($db->connect, $sql);
        
        $r = oci_execute($stmt);
        ////or die ("Unable to execute query\n");
        if ($r == true)
            logMe("Info: oci_execute -> OK", MANUAL_TRANSACTION);
        else
            logMe("Info: oci_execute -> Failed", MANUAL_TRANSACTION);
        
        while ( $row = oci_fetch_assoc($stmt) ) {
            $data = new MT_GUI_Data();
            //print "ID: {$row['ID']}, ";

            // Call the load() method to get the contents of the LOB
            $data->gud_id = $row['GUD_ID'];
            logMe("Info: GUD_ID -> >".$data->gud_id."<", MANUAL_TRANSACTION);
            $data->gud_module_id = $row['GUD_MODULE_ID'];
            logMe("Info: GUD_MODULE_ID -> >".$data->gud_module_id."<", MANUAL_TRANSACTION);
            $data->gud_module_name = $row['GUD_MODULE_NAME'];
            logMe("Info: GUD_MODULE_NAME -> >".$data->gud_module_name."<", MANUAL_TRANSACTION);
            
            $data->gud_head_data = $row['GUD_HEAD_DATA']->load();
            logMe("Info: GUD_HEAD_DATA -> >".$data->gud_head_data."<", MANUAL_TRANSACTION);
            
            $data->gud_body_data = $row['GUD_BODY_DATA']->load();
            logMe("Info: GUD_BODY_DATA -> >".$data->gud_body_data."<", MANUAL_TRANSACTION);
            
            $data->gud_user = $row['GUD_USER'];
            logMe("Info: GUD_ID -> >".$data->gud_user."<", MANUAL_TRANSACTION);
            $data->gud_create_date = $row['GUD_CREATE_DATE'];
            logMe("Info: GUD_CREATE_DATE -> >".$data->gud_create_date."<", MANUAL_TRANSACTION);
            $data->gud_status = $row['GUD_STATUS'];
            logMe("Info: GUD_STATUS -> >".$data->gud_status."<", MANUAL_TRANSACTION);
            $ret[] = $data;
        }
        
        // Free resources
        oci_free_statement($stmt);

        return $ret;
    }
    
    /**
    * Delete manual transaction data.
    *
    * @param string $seq_id
    * @return manual transaction dataset
    */
    public function deleteMTData($seq_id)
    {
        logMe("Info: ++++++Running into deleteMTData()++++++", MANUAL_TRANSACTION);
        
        $ret = 0;
        
        $db = DB::getInstance();
        
        if ($seq_id == null) 
        {
            $ret = 1;
        } else {
            $sql = "
                DELETE
                FROM 
                    GUI_USER_DATA 
                WHERE 
                    GUD_ID=".$seq_id."";

            logMe("SQL==> ".$sql, MANUAL_TRANSACTION);
            
            $stmt = oci_parse($db->connect, $sql);
            
            $r = oci_execute($stmt);
            ////or die ("Unable to execute query\n");
            if ($r == true)
                logMe("Info: oci_execute -> OK", MANUAL_TRANSACTION);
            else
                logMe("Info: oci_execute -> Failed", MANUAL_TRANSACTION);

            // Free resources
            oci_free_statement($stmt);
        }

        return $ret;
    }
    
    /**************************************************************************/
    /* Functions used by Omega 5000 R2.2 Flex GUI    [END]                    */
    /**************************************************************************/

}

function test_nometer()
{
    $Manual_tran = new ManualTransactions("BAY999");
    
    $trans = new Manual_Transa();
    //$trans->Transaction_Number = "0020029";       //"0010007" is the sample value
    $trans->Load_Number = "4373474";              //"4373229"
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
        $transfer[$i]->product_code = "200004240";

        $transfer[$i]->dens = 735300;
        
        $transfer[$i]->Temperature = 1450;
        $transfer[$i]->amb_vol = 3010000;               
        $transfer[$i]->cor_vol = 3011000;
        $transfer[$i]->liq_kg = 343000;
        
        $transfer[$i]->num_of_meter = 0;
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
        /*$transfer[$i]->num_of_meter = 2;
        
        $transfer[$i]->meters[0] = new Transfer_Meter();
        $transfer[$i]->meters[0]->Injector_or_Meter = "F";
        $transfer[$i]->meters[0]->Meter_Injector_Code = "101";
        
        $transfer[$i]->meters[0]->open_amb = 1116174000;
        $transfer[$i]->meters[0]->open_cor = 1920110000;
        $transfer[$i]->meters[0]->open_kg = 1450833000;
        $transfer[$i]->meters[0]->close_amb = 1917184000;
        $transfer[$i]->meters[0]->close_cor = 1921120000;
        $transfer[$i]->meters[0]->close_kg = 1451576000;
        
        $transfer[$i]->meters[1] = new Transfer_Meter();
        $transfer[$i]->meters[1]->Injector_or_Meter = "T";
        $transfer[$i]->meters[1]->Meter_Injector_Code = "010101";
        
        $transfer[$i]->meters[1]->open_amb = 2116174000;
        $transfer[$i]->meters[1]->open_cor = 2920110000;
        $transfer[$i]->meters[1]->open_kg = 2450833000;
        $transfer[$i]->meters[1]->close_amb = 2917184000;
        $transfer[$i]->meters[1]->close_cor = 2921120000;
        $transfer[$i]->meters[1]->close_kg = 2451576000;*/
        
        
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
        /*
        $transfer[$i]->Number_of_Bases = 2;
        $transfer[$i]->bases[0] = new Transfer_Base();
        $transfer[$i]->bases[0]->Tank_Code = "T003";
        $transfer[$i]->bases[0]->product_code = "200001735";
        
        $transfer[$i]->bases[0]->prod_class = "GASOLINE";
        $transfer[$i]->bases[0]->dens = 735300;
        $transfer[$i]->bases[0]->Temperature = 1450;
        
        $transfer[$i]->bases[0]->amb_vol = 1010000;
        $transfer[$i]->bases[0]->cor_vol = 1011000;
        $transfer[$i]->bases[0]->liq_kg = 743000;
        
        $transfer[$i]->bases[1] = new Transfer_Base();
        $transfer[$i]->bases[1]->Tank_Code = "A001";
        $transfer[$i]->bases[1]->product_code = "200002770";
        
        $transfer[$i]->bases[1]->prod_class = "ADDITIVE";
        $transfer[$i]->bases[1]->dens = 35300;
        $transfer[$i]->bases[1]->Temperature = 450;
        
        $transfer[$i]->bases[1]->amb_vol = 2010000;
        $transfer[$i]->bases[1]->cor_vol = 2011000;
        $transfer[$i]->bases[1]->liq_kg = 243000;*/
        
    }
    
    $Manual_tran->do_create(0, $trans, $num_of_transfers, $transfer);
    return "test_create PHP done!";
}

function test_create()
{
    $Manual_tran = new ManualTransactions("BAY999");
    
    $trans = new Manual_Transa();
    //$trans->Transaction_Number = "0020029";       //"0010007" is the sample value
    $trans->Load_Number = "4373587";              //"4373229"
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
        $transfer[$i]->product_code = "200004240";

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
        /*$transfer[$i]->num_of_meter = 2;
        
        $transfer[$i]->meters[0] = new Transfer_Meter();
        $transfer[$i]->meters[0]->Injector_or_Meter = "F";
        $transfer[$i]->meters[0]->Meter_Injector_Code = "101";
        
        $transfer[$i]->meters[0]->open_amb = 1116174000;
        $transfer[$i]->meters[0]->open_cor = 1920110000;
        $transfer[$i]->meters[0]->open_kg = 1450833000;
        $transfer[$i]->meters[0]->close_amb = 1917184000;
        $transfer[$i]->meters[0]->close_cor = 1921120000;
        $transfer[$i]->meters[0]->close_kg = 1451576000;
        
        $transfer[$i]->meters[1] = new Transfer_Meter();
        $transfer[$i]->meters[1]->Injector_or_Meter = "T";
        $transfer[$i]->meters[1]->Meter_Injector_Code = "010101";
        
        $transfer[$i]->meters[1]->open_amb = 2116174000;
        $transfer[$i]->meters[1]->open_cor = 2920110000;
        $transfer[$i]->meters[1]->open_kg = 2450833000;
        $transfer[$i]->meters[1]->close_amb = 2917184000;
        $transfer[$i]->meters[1]->close_cor = 2921120000;
        $transfer[$i]->meters[1]->close_kg = 2451576000;*/
        
        
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
        /*
        $transfer[$i]->Number_of_Bases = 2;
        $transfer[$i]->bases[0] = new Transfer_Base();
        $transfer[$i]->bases[0]->Tank_Code = "T003";
        $transfer[$i]->bases[0]->product_code = "200001735";
        
        $transfer[$i]->bases[0]->prod_class = "GASOLINE";
        $transfer[$i]->bases[0]->dens = 735300;
        $transfer[$i]->bases[0]->Temperature = 1450;
        
        $transfer[$i]->bases[0]->amb_vol = 1010000;
        $transfer[$i]->bases[0]->cor_vol = 1011000;
        $transfer[$i]->bases[0]->liq_kg = 743000;
        
        $transfer[$i]->bases[1] = new Transfer_Base();
        $transfer[$i]->bases[1]->Tank_Code = "A001";
        $transfer[$i]->bases[1]->product_code = "200002770";
        
        $transfer[$i]->bases[1]->prod_class = "ADDITIVE";
        $transfer[$i]->bases[1]->dens = 35300;
        $transfer[$i]->bases[1]->Temperature = 450;
        
        $transfer[$i]->bases[1]->amb_vol = 2010000;
        $transfer[$i]->bases[1]->cor_vol = 2011000;
        $transfer[$i]->bases[1]->liq_kg = 243000;*/
        
    }
    
    $Manual_tran->do_create(0, $trans, $num_of_transfers, $transfer);
    return "test_create PHP done!";
}

function test_openorder()
{
    $Manual_tran = new ManualTransaction("BAY02");
    $trans = new Manual_Transa();
    //$trans->Transaction_Number = "0020029";       //"0010007" is the sample value
    $trans->Load_Number = 8707;              //"4373229"
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

function test_nomination()
{
    $Manual_tran = new ManualTransactions("BAY999");
    $trans = new Manual_Transa();
    //$trans->Transaction_Number = "0020029";       //"0010007" is the sample value
    $trans->Load_Number = 8707;              //"4373229"
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
    
    $Manual_tran->do_nomination(2001, $trans, $num_of_transfers, $transfer); //Disposal
    //$Manual_tran->do_nomination(456, $trans, $num_of_transfers, $transfer); //Receipt
    //$Manual_tran->do_nomination(2001, $trans, $num_of_transfers, $transfer); //Transfer
}

function test_transfer()
{
    $Manual_tran = new ManualTransactions("BAY999");
    $trans = new Manual_Transa();
    //$trans->Transaction_Number = "0020029";       //"0010007" is the sample value
    $trans->Load_Number = 8707;              //"4373229"
    $trans->Supplier = "1001";
    $trans->Operator_Code = "LEOMCA";
    $trans->Start_Time = "01.04.201312:28:43";
    $trans->Finish_Time = "01.03.201312:32:02";
    $trans->Drawer_Code = "1001";
    $trans->Drawer_Name = "SHELLSAP";
    $trans->Tanker_Code = "H80303FG";
    
    $Manual_tran->do_transfer(2001, $trans);
}

function test_special()
{
    $Manual_tran = new ManualTransactions("BAY999");
    $Manual_tran->do_special(1);
}

function test_mv_schd()
{
    $Manual_tran = new ManualTransactions("BAY999");
    //$Manual_tran->do_mv_schd(2001, "LEOMCA", "H80303FG");
    $Manual_tran->do_mv_schd(2001, "", "H80303FG", 2001, "0002", "00691", "", "");
}

function test_reverse()
{
    $Manual_tran = new ManualTransactions("BAY999");
    $Manual_tran->do_reverse(4373400, '1001');
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
    test_create();
    //test_reverse();
    //test_save();
    //test_load();
    //test_openorder();
    //test_nomination();
    //test_transfer();
    //test_special();
    //test_mv_schd();
    //test_nometer();
}

?>