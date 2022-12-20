<?php

// include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/blowfish_service.php';

class CryptService
{
    public function __construct()
    {
        /*$this->conn = $db;
        
        if ($auto_commit) {
            $this->commit_mode = OCI_COMMIT_ON_SUCCESS;
        } else {
            $this->commit_mode = OCI_NO_AUTO_COMMIT;
        }*/
    }

/*  // C function
    static int hex_to_int(unsigned char c){
        if (65 <= c && c <= 70)   //A - F
            return c - 55;
        else if (97 <= c && c <= 102)   //a - f
            return c - 87;
        else if (48 <= c && c <= 57)    //0 - 9
            return c - 48;
        return 0;
    }
*/
    public function hex_to_int($character)
    {
        // ord — Convert the first byte of a string to a value between 0 and 255
        $c = ord($character); 
        if (65 <= $c && $c <= 70) {
            // A - F
            return $c - 55;
        } else if (97 <= $c && $c <= 102) {
            // a - f
            return $c - 87;
        } else if (48 <= $c && $c <= 57) {
            // 0 - 9
            return $c - 48;
        }
        return 0;
    }
    
/*  // C function
    static int hex_to_ascii(unsigned char c, unsigned char d){
        int high = hex_to_int(c) * 16;
        int low = hex_to_int(d);
        return high+low;
    }
*/    
    public function hex_to_ascii($c, $d)
    {
        $high = $this->hex_to_int($c) * 16;
        $low = $this->hex_to_int($d);
        // chr — Generate a single-byte string from a number
        $asc = chr($high + $low);
        return $asc;
    }
    
/*  // C function
    void hexstring_to_ascii(unsigned char* out, int out_len, const char* hexstr_in)
    {
        int length = strlen(hexstr_in);
        int i;
        unsigned char buf = 0;
        unsigned char result[256];
        memset(result, 0, sizeof(result));
        for(i = 0; i < length; i++)
        {
            if(i % 2 != 0)
            {
                unsigned char c = hex_to_ascii(buf, hexstr_in[i]);
                result[i / 2] = c;
            }
            else
            {
                buf = hexstr_in[i];
            }
        }
        snprintf(out, 256, "%s", result);
    }
*/
    /* Convert a hex string to a ascii string.*/
    public function hexstring_to_ascii($hexstr_in, $out_len=256)
    {
        $length = strlen($hexstr_in);
        $buf = chr(0);
        // array_fill(int $start_index, int $count, mixed $value): array
        // Fills an array with count entries of the value of the value parameter, keys starting at the start_index parameter. 
        $result = array_fill(0, 256, chr(0));
        for($i = 0; $i < $length; $i++) {
            $curr_str = substr($hexstr_in, $i, 1);
            if($i % 2 != 0) {
                $c = $this->hex_to_ascii($buf, $curr_str);
                $result[$i / 2] = $c;
            } else {
                $buf = $curr_str;
            }
        }
        $out = '';
        for($i = 0; $i < $length/2; $i++) {
            if ($i >= $out_len) {
                break;
            }
            $out .= $result[$i];
        }

        return $out;
    }
    

/*
    void pkcs5_padding(unsigned char* in, unsigned char* out, int out_len)
    {
        int str_len = strlen(in);
        memset(out, 0, out_len);
        snprintf(out, out_len, "%s", in);
        int i = 0;
        int padding = 0;
        int mod_by_8 = str_len % 8;
        switch (mod_by_8)
        {
            case 0:
                padding = 0x08;
                break;
            case 1:
                padding = 0x07;
                break;
            case 2:
                padding = 0x06;
                break;
            case 3:
                padding = 0x05;
                break;
            case 4:
                padding = 0x04;
                break;
            case 5:
                padding = 0x03;
                break;
            case 6:
                padding = 0x02;
                break;
            case 7:
                padding = 0x01;
                break;
            default:
                break;
        }
        for (i = 0; i < 8 - mod_by_8; i ++)
            out[str_len + i] = padding;
    }
*/    
    /*
        If numberOfBytes(clearText) mod 8 == 7, PM = M + 0x01
        If numberOfBytes(clearText) mod 8 == 6, PM = M + 0x0202
        If numberOfBytes(clearText) mod 8 == 5, PM = M + 0x030303
        ...
        If numberOfBytes(clearText) mod 8 == 0, PM = M + 0x0808080808080808
    */
    public function pkcs5_padding($in, $out_len)
    {
        $str_len = strlen($in);
        $out = array_fill(0, $out_len, chr(0));
        for($i = 0; $i < $str_len; $i++) {
            $out[$i] = substr($in, $i, 1);
        }
        $padding = 0;
        $mod_by_8 = $str_len % 8;
        switch ($mod_by_8) {
            case 0:
                $padding = 0x08;
                break;
            case 1:
                $padding = 0x07;
                break;
            case 2:
                $padding = 0x06;
                break;
            case 3:
                $padding = 0x05;
                break;
            case 4:
                $padding = 0x04;
                break;
            case 5:
                $padding = 0x03;
                break;
            case 6:
                $padding = 0x02;
                break;
            case 7:
                $padding = 0x01;
                break;
            default:
                break;
        }
        for ($i = 0; $i < 8 - $mod_by_8; $i ++) {
            $out[$str_len + $i] = chr($padding);
        }
        $out_str = '';
        for($i = 0; $i < 256; $i++) {
            if ($i >= $out_len) {
                break;
            }
            $out_str .= $out[$i];
        }
        return $out_str;
    }
    
/*
    void pkcs5_unpadding(unsigned char* in, unsigned char* out, int out_len)
    {
        int str_len = strlen(in);
        int last_digit = 0;
        switch (in[str_len - 1])
        {
            case 0x01:
                last_digit = str_len - 1;
                break;
            case 0x02:
                last_digit = str_len - 2;
                break;
           case 0x03:
                last_digit = str_len - 3;
                break;
            case 0x04:
                last_digit = str_len - 4;
                break;
            case 0x05:
                last_digit = str_len - 5;
                break;
            case 0x06:
                last_digit = str_len - 6;
                break;
            case 0x07:
                last_digit = str_len - 7;
                break;
            case 0x08:
                last_digit = str_len - 8;
                break;
        }
        memset(out, 0, out_len);
        snprintf(out, out_len, "%s", in);
        out[last_digit] = 0;
    }
*/
    public function pkcs5_unpadding($in, $out_len)
    {
        $str_len = strlen($in);
        $last_digit = 0;
        $last_char = substr($in, -1, 1);
        switch (ord($last_char)) {
            case 0x01:
                $last_digit = $str_len - 1;
                break;
            case 0x02:
                $last_digit = $str_len - 2;
                break;
           case 0x03:
                $last_digit = $str_len - 3;
                break;
            case 0x04:
                $last_digit = $str_len - 4;
                break;
            case 0x05:
                $last_digit = $str_len - 5;
                break;
            case 0x06:
                $last_digit = $str_len - 6;
                break;
            case 0x07:
                $last_digit = $str_len - 7;
                break;
            case 0x08:
                $last_digit = $str_len - 8;
                break;
        }
        $out = array_fill(0, $out_len, chr(0));
        for($i = 0; $i < $str_len; $i++) {
            $out[$i] = substr($in, $i, 1);
        }
        $out[$last_digit] = chr(0);
        $out_str = '';
        for($i = 0; $i < 256; $i++) {
            if ($i >= $out_len) {
                break;
            }
            if ($out[$i] == chr(0)) {
                break;
            }
            $out_str .= $out[$i];
        }
        return $out_str;
    }
    
/*
    void get_blowfish_key(const char* per_code, unsigned char* blowfish_key, int key_len)
    {
        MD5_CTX context;
        unsigned char digest[16];
        unsigned int len = strlen (per_code);
    
        MD5_Init(&context);
        MD5_Update (&context, per_code, len);
        MD5_Final(digest, &context);
    
        int i = 0, pivot = sizeof(digest) / 2;
        for (; i < pivot; i++)
        {
            char tmp = digest[i];
            digest[i] = digest[i + pivot];
            digest[i + pivot] = tmp;
        }
    
        char digest_hexstr[256], tmp[16];
        memset(digest_hexstr, 0, 256);
        for (i = 0; i < sizeof(digest); i ++)
        {
            snprintf(tmp, sizeof(tmp), "%02x", digest[i]);
            strcat(digest_hexstr, tmp);
        }
        
        unsigned char hash[SHA256_DIGEST_LENGTH];
        memset(hash, 0, sizeof(hash));
        SHA256_CTX sha256;
        SHA256_Init(&sha256);
        SHA256_Update(&sha256, digest_hexstr, strlen(digest_hexstr));
        SHA256_Final(hash, &sha256);
        //snprintf(blowfish_key, SHA256_DIGEST_LENGTH + 1, "%s", hash);
        memcpy(blowfish_key, hash, 32);    //sha256 result is 32 bytes
    }
*/
    /*
    Get blowfish key from per code. The algorithm is:
    1. Get MD5 from person cod
    2. Switch first and second half, make it a hex string
    3. Calculate sha256
    */
    public function get_blowfish_key($per_code, $key_len)
    {
        // md5(string $string, bool $binary = false): string
        // If the optional binary is set to true, then the md5 digest is instead returned in raw binary format with a length of 16.
        $digest_str = md5($per_code, true);
		// printf('$digest_str = md5($per_code, true): %s (length %d)%s', $digest_str, strlen($digest_str), PHP_EOL);

        // Switch first and second half
        $digest = array_fill(0, 16, chr(0));
        $i = 0;
        $pivot = count($digest) / 2;
        for (; $i < $pivot; $i++) {
            $digest[$i] = substr($digest_str, $pivot+$i, 1);
            $digest[$i + $pivot] = substr($digest_str, $i, 1);
        }
    
        // make it a hex string
        $digest_hexarr = array_fill(0, 256, chr(0));
        for ($i = 0; $i < count($digest); $i ++) {
            $tmp = sprintf("%02x", ord($digest[$i]));
            $digest_hexarr[$i*2] = substr($tmp, 0, 1);
            $digest_hexarr[$i*2+1] = substr($tmp, 1, 1);
        }
        $digest_hexstr = "";
        // memset(digest_hexstr, 0, 256);
        //for ($i = 0; $i < count($digest_hexarr); $i ++)
        for ($i = 0; $i < 32; $i ++)
        {
            $digest_hexstr .= $digest_hexarr[$i];
        }
		// printf('$digest_hexstr : %s (length %d)%s', $digest_hexstr, strlen($digest_hexstr), PHP_EOL);
        
        $hash_str = hash("sha256", $digest_hexstr, TRUE);
		// printf('$hash_str : %s (length %d)%s', $hash_str, strlen($hash_str), PHP_EOL);
		return $hash_str;
		/*
        $hash_hexstr = hash("sha256", $digest_hexstr);
		// printf('$hash_hexstr : %s (length %d)%s', $hash_hexstr, strlen($hash_hexstr), PHP_EOL);
        $hash_arr = array_fill(0, $key_len, chr(0));
        for($i = 0; $i < 32; $i++) {
            $hash_arr[$i] = substr($hash_hexstr, $i, 1);
        }
        $blowfish_key = "";
        for ($i = 0; $i < count($hash_arr); $i ++)
        {
            $blowfish_key .= $hash_arr[$i];
        }
        return $blowfish_key;
		*/
    }
    
    /*
    Decrypt a encrypted array to plain text. 
    Param:
        keydata: blow fish key
        in: encrypted 
        out: plain text to be returned
        out_len: array length. Make sure it is big enough
    Return: 
        0 : OK; -1: error
    */
    /* public function decrypt_blowfish(
        unsigned char *keydata, 
        unsigned char* in, 
        unsigned char* out, 
        int out_len) 
    {
        BF_KEY key;
        BF_set_key(&key, SHA256_DIGEST_LENGTH, keydata);
    
        unsigned char tmp[256];
        memset(tmp, 0, sizeof(tmp));
        memset(out, 0, out_len);
        
        const int EIGHT_DIGITS = 8;  // BF_ecb_encrypt only use first 8 letters of a string 
        int loops = ((strlen((char*)in) - 1) / EIGHT_DIGITS) + 1;     
        int i = 0, j = 0, len_accum = 0;
        unsigned char tmp_str[9];
        for (i = 0; i < loops; i ++)
        {
            for (j = 0; j < EIGHT_DIGITS; j ++)
                tmp_str[j] = in[i * EIGHT_DIGITS + j];
    
            tmp_str[EIGHT_DIGITS] = '\0';
            BF_ecb_encrypt(tmp_str, tmp, &key, BF_DECRYPT);
            //strncat(out, tmp, out_len);
            if (i * EIGHT_DIGITS > out_len)
            {
                return -1;
            }
            memcpy(out + i * EIGHT_DIGITS, tmp, EIGHT_DIGITS);
        }
    
        return 0;
    } */
    
    public function decrypt_blowfish($per_code, $hash_psw)
    {
        $reversible_hex = $hash_psw;
        
        $bkey = $this->get_blowfish_key($per_code, 256);
        $reversible = $this->hexstring_to_ascii($reversible_hex, 256);
        $deciphered = Blowfish::decrypt(
                        $reversible,
                        $bkey,
                        Blowfish::BLOWFISH_MODE_EBC, # Encryption Mode
                        Blowfish::BLOWFISH_PADDING_NONE, # Padding Style
                        NULL  # Initialisation Vector - required for CBC
        );
        // return $deciphered;
        // printf('BKEY text: %s (length %d)%s', $bkey, strlen($bkey), PHP_EOL);
        // printf('reversible text: %s (length %d)%s', $reversible, strlen($reversible), PHP_EOL);
        // printf('Deciphered text: ===%s=== (length %d)%s', $deciphered, strlen($deciphered), PHP_EOL);
        $unpadding = $this->pkcs5_unpadding($deciphered, 256);
        return $unpadding;
    }



    /* See decrypt_blowfish comment */
    /* public function encrypt_blowfish(
        unsigned char *keydata, 
        unsigned char* in, 
        unsigned char* out, 
        int out_len)
    {
        BF_KEY key;
        BF_set_key(&key, SHA256_DIGEST_LENGTH, keydata);
        unsigned char padded_in[256], tmp[256];
        memset(tmp, 0, sizeof(tmp));
        memset(out, 0, out_len);
        pkcs5_padding(in, padded_in, sizeof(padded_in));
    
        const int EIGHT_DIGITS = 8; // BF_ecb_encrypt only use first 8 letters of a string
        int loops = ((strlen((char*)padded_in) - 1) / EIGHT_DIGITS) + 1;     
        int i = 0, j = 0;
        unsigned char tmp_str[9];
        for (i = 0; i < loops; i ++)
        {
            for (j = 0; j < EIGHT_DIGITS; j ++)
                tmp_str[j] = padded_in[i * EIGHT_DIGITS + j];
    
            tmp_str[EIGHT_DIGITS] = '\0';
            BF_ecb_encrypt(tmp_str, tmp, &key, BF_ENCRYPT);
            if (i * EIGHT_DIGITS > out_len)
            {
                return -1;
            }
            memcpy(out + i * EIGHT_DIGITS, tmp, EIGHT_DIGITS);
        }
    } */
}
