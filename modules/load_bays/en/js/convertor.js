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
			
	}return round_decimals(data, 2);
		
}


/**** Convert Volume from Liter to cubic meter,imp_gal,us_gal... ******/ 
function UntCnvVol(data, VolUnt,Den)
{
	var calcData;
	var rate;
	var VolUnt;

	if(VolUnt=="litre2litre")
	{
		calcData = data*1;

	}
	else if(VolUnt=="litre2meter3")
	{
		rate = 0.001;
		calcData = data*rate;
	}else if(VolUnt=="litre2imp_gal")
	{
		rate = 0.2199692;
		calcData = data*rate;

	}else if(VolUnt=="litre2usgal")
	{
		rate = 0.2641721;
		calcData = data*rate;

	}else if(VolUnt=="litre2imbarrel")
	{
		rate = 5.237363*0.001;
		calcData = data*rate;

	}else if(VolUnt=="litre2usbarrel")
	{
		rate = 6.289811*0.001;
		calcData = data*rate;

	}else if(VolUnt=="litre2kg"&&Den!=0)
	{
		// density is in kg per cubic metre
		calcData = data*Den/1000.0;
	}
	else
	{

		calcData = data*1;
	}
	return round_decimals(calcData, 2);
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
 	var rnum = original_number;
	var rlength = decimals; // The number of decimal places to round to
	if (rnum > 8191 && rnum < 10485) // to deal with the JS Bug
  {
		// range modofication (?)
		rnum = rnum-5000;
		var newnumber = Math.round(rnum*Math.pow(10,rlength))/Math.pow(10,rlength);
		// reverse the range modofication (?)
		newnumber = newnumber+5000;
	} 
  else
  {
		var newnumber = Math.round(rnum*Math.pow(10,rlength))/Math.pow(10,rlength);
	}
	return newnumber;
	// old code did not serve the purpose
	// very well
  //var result1 = original_number * Math.pow(10, decimals)
  // var result2 = Math.round(result1)
  //var result2 = result1;
  //var result3 = result2 / Math.pow(10, decimals)
  //return pad_with_zeros(result3, decimals)

}
function pad_with_zeros(rounded_value, decimal_places) 
{



    // Convert the number to a string

    var value_string = rounded_value.toString()

    

    // Locate the decimal point

    var decimal_location = value_string.indexOf(".")



    // Is there a decimal point?

    if (decimal_location == -1) {

        

        // If no, then all decimal places will be padded with 0s

        decimal_part_length = 0

        

        // If decimal_places is greater than zero, tack on a decimal point

        value_string += decimal_places > 0 ? "." : ""

    }

    else {



        // If yes, then only the extra decimal places will be padded with 0s

        decimal_part_length = value_string.length - decimal_location - 1

    }

    

    // Calculate the number of decimal places that need to be padded with 0s

    var pad_total = decimal_places - decimal_part_length

    

    if (pad_total > 0) {

        

        // Pad the string with 0s

        for (var counter = 1; counter <= pad_total; counter++) 

            value_string += "0"

        }

    return value_string

}
