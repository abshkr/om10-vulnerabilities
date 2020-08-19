/**** Convert mass from kg to ton,imp_ton,pound ******/ 
function UntCnvMass(data, MassUnt)
{
	var data;
	var rate;
	var MassUnt;
	
	if(MassUnt=="kgram2kgram")
	{
		rate = 1;
		data = data*rate;
		
	}else if(MassUnt=="kgram2ton")
	{
		rate = 0.001;
		data = data*rate;
		
	}else if(MassUnt=="kgram2imp_ton")
	{
		rate = 0.0010160469;
		data = data*rate;
		
	}else if(MassUnt=="kgram2pound")
	{
		rate = 2.204623
		data = data*rate;
		
	}
	else
	{
			data = data*1;
			
	}return data;
		
}


/**** Convert Volume from Liter to cubic meter,imp_gal,us_gal... ******/ 
function UntCnvVol(data, VolUnt,Den)
{
	var data;
	var rate;
	var VolUnt;
	var Den;
	
	if(VolUnt=="litre2litre")
	{
		data = data*1;
		
		}
	else if(VolUnt=="litre2meter3")
	{
		rate = 0.001;
		data = data*rate;
	}else if(VolUnt=="litre2imp_gal")
	{
		rate = 0.2199692;
		data = data*rate;
		
	}else if(VolUnt=="litre2usgal")
	{
		rate = 0.2641721;
		data = data*rate;
		
	}else if(VolUnt=="litre2imbarrel")
	{
		rate = 5.237363*0.001;
		data = data*rate;
		
	}else if(VolUnt=="litre2usbarrel")
	{
		rate = 6.289811*0.001;
		data = data*rate;
		
	}else if(VolUnt=="litre2kg"&&Den!=0)
	{
		data = data*Den;
	}
	else{
	
		data = data*1;
	}return round_decimals(data, 2);
}

/**** Convert Temprature from C to F and from F to C******/ 
function UntConTemp(data,TempUnt)
{
	if(TempUnt=="C")
	{
		data = 1.8*data+32;
	}else if(TempUnt=="F")
	{
		data = (data - 32)/1.8; 
	}else
		{
			data = data;
		}
return round_decimals(data, 2);
}
function round_decimals(original_number, decimals) {

    var result1 = original_number * Math.pow(10, decimals)

    var result2 = Math.round(result1)

    var result3 = result2 / Math.pow(10, decimals)

    return pad_with_zeros(result3, decimals)

}
