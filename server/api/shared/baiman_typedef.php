<?php

abstract class LD_TYPE
{
    const LD_PRESCHEDULE = 1;
    const LD_PREORDER = 2;
    const LD_ORDER = 3;
}

if (API_F == "YES") {
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

        public $pub_tempe; /* published temperature. 11-05-2011*/

        public $amb_vol;
        public $cor_vol;
        public $liq_kg;

        public function __construct()
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
} else {
    class XPROD
    {
        public $is_base_product;
        public $drawer_code;
        public $product_code;

        public $prod_class;
        public $dens;
        public $low_dens;
        public $high_dens;
        public $mass_fract;
        public $exp_coeff;
        public $pub_tempe; /* published temperature. 11-05-2011*/

        public $amb_vol;
        public $cor_vol;
        public $liq_kg;

        public function __construct()
        {
            $this->is_base_product = " ";
            $this->drawer_code = "        ";
            $this->product_code = "          ";

            $this->prod_class = "        ";

            $this->dens = "       ";
            $this->low_dens = "       ";
            $this->high_dens = "       ";
            $this->mass_fract = "        ";
            $this->exp_coeff = "        ";

            $this->pub_tempe = "      ";
            $this->amb_vol = "            ";
            $this->cor_vol = "            ";
            $this->liq_kg = "            ";
        }

        public function __toString()
        {
            if (DENS_RANGE == "YES") {
                return $this->is_base_product .
                    $this->drawer_code .
                    $this->product_code .
                    $this->prod_class .
                    $this->dens .
                    $this->low_dens .
                    $this->high_dens .
                    $this->mass_fract .
                    $this->exp_coeff .
                    $this->pub_tempe .
                    $this->amb_vol .
                    $this->cor_vol .
                    $this->liq_kg;
            }

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

if (API_F == "YES") {
    class XCMPT
    {
        public $eqp_cd;
        public $nr_in_eqp;
        public $nr_in_tkr;
        public $Volume_Safe_Fill_Limit;
        public $Mass_Limit;
        public $Volume_Capacity;

        public $prod_def; /* scheduled product */
        public $asmx; /* scheduled qty */

        public $Nr_of_Drums_Specified; /* scheduled no of drums */

        public $prod_class1; /* sched prop for unloading */
        public $hybrid_loading; /* hybrid loading 11-05-2011*/

        /* Added for weighbridge loading, filled by RTC, non-weighbridge */
        /* loading might not fill it. */
        public $prod_def2;

        /* Also used for weighbridge loading using RTC. */
        /* When weighbridge, it is qty in compartment. It is returns */
        /* only at weigh-in. */
        public $asm2;

        public $prod_class2; /* preloaded .. prod class  */
        public $vcf1;
        public $temps1; /* ...      temperature */
        public $pressure1;
        public $asm3; /* ...      qty     */
        public $NrBases1; /* ...              */
        public $qty1; /* .. preloaded base qtys   */

        public $Nr_of_Preloaded_Drums;

        public $prod_class3; /* loaded ...   prod class  */
        public $vcf2;
        public $temps2; /* ...      temperature */
        public $pressure2;
        public $asm4; /* ...      qty     */
        public $NrBases2; /* ...              */
        public $qty2; /* ... loaded   base qtys   */
        public $prod_class4; /* loaded ...   prod class  */
        public $vcf3;
        public $temps3; /* ...      temperature */
        public $pressure3;
        public $asm5; /* ...      qty     */
        public $NrBases3; /* ...              */
        public $qty3; /* ... loaded   base qtys   */
        public $Nr_of_Loaded_Drums;
        public $Prompt_Flags;

        public function __construct()
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
            $this->temps1 . /* ...      temperature */
            $this->pressure1 .
            $this->asm3 . /* ...      qty     */
            $this->NrBases1 . /* ...              */
            $this->qty1 . /* .. preloaded base qtys   */
            $this->Nr_of_Preloaded_Drums .
            $this->prod_class3 . /* loaded ...   prod class  */
            $this->vcf2 .
            $this->temps2 . /* ...      temperature */
            $this->pressure2 .
            $this->asm4 . /* ...      qty     */
            $this->NrBases2 . /* ...              */
            $this->qty2 . /* ... loaded   base qtys   */
            $this->prod_class4 . /* loaded ...   prod class  */
            $this->vcf3 .
            $this->temps3 . /* ...      temperature */
            $this->pressure3 .
            $this->asm5 . /* ...      qty     */
            $this->NrBases3 . /* ...              */
            $this->qty3 . /* ... loaded   base qtys   */
            $this->Nr_of_Loaded_Drums .
            $this->Prompt_Flags;
        }
    }
} else {
    class XCMPT
    {
        public $eqp_cd;
        public $nr_in_eqp;
        public $nr_in_tkr;
        public $Volume_Safe_Fill_Limit;
        public $Mass_Limit;
        public $Volume_Capacity;

        public $prod_def; /* scheduled product */
        public $asmx; /* scheduled qty */

        public $Nr_of_Drums_Specified; /* scheduled no of drums */

        public $prod_class1; /* sched prop for unloading */
        public $hybrid_loading; /* hybrid loading 11-05-2011*/

        /* Added for weighbridge loading, filled by RTC, non-weighbridge */
        /* loading might not fill it. */
        public $prod_def2;

        /* Also used for weighbridge loading using RTC. */
        /* When weighbridge, it is qty in compartment. It is returns */
        /* only at weigh-in. */
        public $asm2;

        public $prod_class2; /* preloaded .. prod class  */
        public $temps1; /* ...      temperature */
        public $asm3; /* ...      qty     */
        public $NrBases1; /* ...              */
        public $qty1; /* .. preloaded base qtys   */

        public $Nr_of_Preloaded_Drums;

        public $prod_class3; /* loaded ...   prod class  */
        public $temps2; /* ...      temperature */
        public $asm4; /* ...      qty     */
        public $NrBases2; /* ...              */
        public $qty2; /* ... loaded   base qtys   */
        public $prod_class4; /* loaded ...   prod class  */
        public $temps3; /* ...      temperature */
        public $asm5; /* ...      qty     */
        public $NrBases3; /* ...              */
        public $qty3; /* ... loaded   base qtys   */
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
        $msg_string = $this->message_number . $this->Source_system_device . $this->Source_device_flags . $this->Source_id_number .
        $this->Dest_system_device . $this->Dest_id_number . $this->Message_Type . $this->Message_Version . $this->trip_no .
        $this->supplier . "|";

        $this->Message_Length = sprintf("%06d", strlen($msg_string) + 6);
        $msg_string = $this->Message_Length . $msg_string;

        return $msg_string;
    }
}

class XPD
{
    public $is_base_product;
    public $drawer_code;
    public $product_code;

    public function __construct()
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

    public function __construct()
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

if (API_F == "YES") {
    class XPC
    {
        public $prod_class;
        public $compensation_method;
        public $ref_temp_spec;
        public $dens;
        public $mass_fract;
        public $exp_coeff;
        public $api_at_60F;

        public function __construct()
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
} else {
    class XPC
    {
        public $prod_class;
        public $dens;
        public $low_dens;
        public $high_dens;
        public $mass_fract;
        public $exp_coeff;

        public function __construct()
        {
            $this->prod_class = "        ";
            $this->dens = "       ";
            $this->low_dens = "       ";
            $this->high_dens = "       ";
            $this->mass_fract = "        ";
            $this->exp_coeff = "        ";
        }

        public function __toString()
        {
            if (DENS_RANGE == "YES") {
                return $this->prod_class .
                $this->dens .
                $this->low_dens .
                $this->high_dens .
                $this->mass_fract .
                $this->exp_coeff;
            }

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

    public function __construct()
    {
        $this->Temperature = "      ";
        $this->Average_Temperature = "      ";
    }

    public function __toString()
    {
        return $this->Temperature . $this->Average_Temperature;
    }
}

if (API_F == "YES") {
    class XQTY
    {
        public $pd;
        public $prod_class;
        public $vcf;
        public $temps;
        public $pressure;
        public $asmx;

        public function __construct()
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
} else {
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

class MessageHeader 
{
    //public $Transaction_Number; 
    public $Load_Number;            /* Trip number */
    public $Supplier;               /* Supplier */
    //public $load_unload;

    //public $Load_Type;

    public $Start_Time;             /* */
    public $Finish_Time;

    public $Operator_Code;          

    //public $Drawer_Code;          /* Readonly */
    //public $Drawer_Name;          /* Readonly */
    public $Tanker_Code;            /* Readonly */
}

if (API_F == "YES") {
    class XTRF_DET/* transfer details */
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

        public function __construct()
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

            for ($i = 0; $i < $this->Number_of_Meters; ++$i) {
                $msg_string = $msg_string . $this->mtr_det[$i];
            }

            $msg_string = $msg_string . $this->Number_of_Bases;

            for ($i = 0; $i < $this->Number_of_Bases; ++$i) {
                $msg_string = $msg_string . $this->base[$i];
            }

            $msg_string = $msg_string .
            $this->Start_Mass .
            $this->End_Mass .
            $this->Was_Anything_Recycled;

            return $msg_string;
        }
    }
} else {
    class XTRF_DET/* transfer details */
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
        public $is_trf_finished;
        public $is_closeout_trf;
        public $Was_Anything_Recycled;

        public function __construct()
        {
            $this->is_trf_finished = " ";
            $this->is_closeout_trf = " ";
        }

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

            for ($i = 0; $i < $this->Number_of_Meters; ++$i) {
                $msg_string = $msg_string . $this->mtr_det[$i];
            }

            $msg_string = $msg_string . $this->Number_of_Bases;

            for ($i = 0; $i < $this->Number_of_Bases; ++$i) {
                $msg_string = $msg_string . $this->base[$i];
            }

            if (CLOSEOUT_TEMP_TRANS_FEATURE == 'YES') {
                $msg_string = $msg_string .
                    $this->Start_Mass .
                    $this->End_Mass .
                    $this->is_trf_finished .
                    $this->is_closeout_trf .
                    $this->Was_Anything_Recycled;
            } else {
                $msg_string = $msg_string .
                    $this->Start_Mass .
                    $this->End_Mass .
                    $this->Was_Anything_Recycled;
            }

            return $msg_string;
        }
    }
}

if (API_F == "YES") {
    class XBASE
    {
        public $Tank_Code;

        public $pd;
        public $prod_class;

        public $vcf;

        public $temps;

        public $pressure;

        public $asmx;

        public function __construct()
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
} else {
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

if (API_F == "YES") {
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

        public function __construct()
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
} else {
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

class PRODUCT_MVMNT_REQ
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
    public $pmv_number;

    public function to_string()
    {
        $msg_string = $this->message_number . $this->Source_system_device . $this->Source_device_flags . $this->Source_id_number .
        $this->Dest_system_device . $this->Dest_id_number . $this->Message_Type . $this->Message_Version . $this->pmv_number . "|";

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
    public $mlitm_id;

    public function to_string()
    {
        $msg_string = $this->message_number . $this->Source_system_device . $this->Source_device_flags . $this->Source_id_number .
        $this->Dest_system_device . $this->Dest_id_number . $this->Message_Type . $this->Message_Version . $this->mlitm_id . "|";

        $this->Message_Length = sprintf("%06d", strlen($msg_string) + 6);
        $msg_string = $this->Message_Length . $msg_string;

        return $msg_string;
    }
}

class Manual_Transfer
{
    public $Arm_Code;           /* The arm where the transfer happens, sample: "A00101" */
    //public $Device_Code;        /* Basically it's the bay code, sample: "BAY01" */
    public $nr_in_tkr;          /* Compartment number */
    
    public $drawer_code;        /* Drawer */
    public $product_code;       /* Drawer product code */
    
    public $dens;               /* Density of this product */
    
    public $Temperature;        /* Temperature of this product */
    
    public $amb_vol;            /* Ambient liter of this product */
    public $cor_vol;            /* corrected liter of this product */
    public $liq_kg;             /* mass of this product */
    
	public $Equipment_ID;       /* Equipment ID    */
    public $Planned_Qty;        /* Planned Quality */
	public $Additional_UOM;     /* Additional UOM  */
	public $Alter_Qty;          /* Alternate Quantity */
	
    public $num_of_meter;       
    public $meters;             /* array points to Transfer_Meter objects */
    
    public $Number_of_Bases;
    public $bases;              /* array points to Transfer_Base objects */
}

class Transfer_Base
{
    public $Tank_Code;              /* Tank code */
    
    public $product_code;           /* Base product code */
    public $prod_class;             /* If it's addtive, set this as "ADDITIVE" */
    public $dens;                   /* Density */
    public $Temperature;            /* Temperature */
    
    public $amb_vol;                
    public $cor_vol;
    public $liq_kg;
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
        for ($i = 0; $i < $this->Number_of_Products; ++$i) {
            $msg_string = $msg_string . $this->prod_det[$i];
        }

        $msg_string = $msg_string . $this->Number_of_Compartments;
        for ($i = 0; $i < $this->Number_of_Compartments; ++$i) {
            $msg_string = $msg_string . $this->cmpt_det[$i];
        }

        $msg_string = $msg_string . $this->Number_of_Transfers;
        for ($i = 0; $i < $this->Number_of_Transfers; ++$i) {
            $msg_string = $msg_string . $this->trf_det[$i];
        }

        $msg_string = $msg_string . $this->Number_of_Meters;
        for ($i = 0; $i < (int) $this->Number_of_Meters; ++$i) {
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