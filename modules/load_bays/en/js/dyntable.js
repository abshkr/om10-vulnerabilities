/***************************************************
 * $Log: dyntable.js,v $
 * Revision 1.10  2009/09/03 07:05:54  bz
 * update for blending
 *
 * Revision 1.9  2006/08/11 04:52:39  yjf
 * Re-add this file
 *
 * Revision 1.7  2006/03/30 02:09:53  gp
 * Fixed checkMeter().
 * ,
 *
 * Revision 1.6  2006/03/07 03:40:37  gp
 * Fixed problem that only occur on IE which is related to document.form
 *
 * Revision 1.5  2006/03/06 06:55:27  yjf
 * first time translated
 *
 * Revision 1.4  2006/03/06 04:14:44  gp
 * Added checkMeter() function to check existing Inline meter has been assigned or not.
 *
 * Revision 1.3  2006/02/13 06:02:02  gp
 * Fixed display error message on Blend.
 * Added "l" var.
 *
 * Revision 1.2  2006/02/13 05:56:45  gp
 * Fixed error message to display correct Arm number.
 *
 *
 * $Id: dyntable.js,v 1.10 2009/09/03 07:05:54 bz Exp $
 ***************************************************/

var t__Same_Inline_Meter_exist = ["Same Inline Meter has been assigned to Arm no","相同注入流量计以被此发油鸿使用"];
var t__Inline_Meter = ["Inline Meter", "注入流量计"];
var t__Base_Tank = ["Base Tank", "基础油罐"];
var t__Arm = ["Arm", "发油鸿"];
var t__Please_Select_the_Inline_Meter_Arm = ["Please Select the Inline Meter Arm", "请选择注入流量计"];
var t__Select = ["Select", "请选择"];
var t__An_Inline_Meter =  ["In Inline Meter", "注入流量计"];
var t__Please_Select_the_Base_Tank_Arm = ["Please Select the Base Tank Arm","请选择基础油罐发油鸿"];
var t__A_Base_Tank = ["A Base Tank","基础油罐"];
var t__Please_Select_the_Inline_Meter_Blend = ["Please Select the Inline Meter Blend", "请选择注入流量计混合油"];
var t__Please_Select_the_Base_Tank_Blend = ["Please Select the Base Tank Blend","请选择基础油罐混合油"];
var t__Please_Enter_the_Number_of_Blends = ["Please enter the number (0-6) of blendings for arm ", "请输入混合油品数目(0-6)-鹤管"];
var t__Blends_Number = ["Number of blends", "混合油品数目"];



function addTable(list1, value1, list2, value2, list3)
{
	var rows = 0;
	var cols = 2; /* or whatever */

	var blendNums = new Array();

	rows = document.getElementById('nbr_arm').value;
	for (i=0; i<rows; i++)
	{
		if ( (document.getElementById('nbr_bln'+i) == null) || (document.getElementById('nbr_bln'+i) == undefined) )
		{
			blendNums[i] = 0;
		}
		else
		{
			blendNums[i] = document.getElementById('nbr_bln'+i).value;
		}
	}
	
	if (isNaN(rows) || rows == "" || rows == 0) /* check only a number has been entered */
	{
		//alert('Please enter a valid number!');
		document.getElementById('arms').innerHTML = "";
	}
	else if(rows>0)
	{
		
		newTable = '<table>';
		newTable += '<tr><td><td><td class=\"infotextheading\">&nbsp; '+ ml(t__Blends_Number)+ '</td><td class=\"infotextheading\">&nbsp; '+ ml(t__Inline_Meter)+ '</td><td class=\"infotextheading\">&nbsp; '+ ml(t__Base_Tank)+' </td></td></td></tr>';

		for (i=0; i<rows; i++)
		{
			var col = "";
			var k=i+1;

			col+= '<tr><td class=\"infotextheading\" width=\"80\">'+ ml(t__Arm)+': </td>';
			col+= '<td class=\"infotext\" width=\"50\">' + k + '<input type=\"hidden\" name=\"arm_cde' + i + '\" value=\"' + k + '\" /></td>';

			col+= '<td class=\"infotext\" width=\"200\"><span class=\"mandatory1\">*</span><input type=\"text\" id=\"nbr_bln'+i+'\" name=\"nbr_bln'+i+'\" maxlength=\"1\" onChange=\"createArm();\" dataType=\"Range\" min=\"0\" max=\"6\" value=\"'+ blendNums[i] +'\" size=\"20\" msg=\"'+ ml(t__Please_Enter_the_Number_of_Blends)+' '+ k + '\">';
			col+= '</td>';

			var prev_mtr='';
			var prev_tnk='';
			if ( (document.getElementById('mtr_cde'+i) == null) || (document.getElementById('mtr_cde'+i) == undefined) )
			{
				prev_mtr = '';
			}
			else
			{
				prev_mtr = document.getElementById('mtr_cde'+i).value;
			}
			if ( (document.getElementById('tnk_cde'+i) == null) || (document.getElementById('tnk_cde'+i) == undefined) )
			{
				prev_tnk = '';
			}
			else
			{
				prev_tnk = document.getElementById('tnk_cde'+i).value;
			}

			col+= '<td class=\"infotext\" width=\"200\"><span class=\"mandatory1\">*</span><select class=\"compulsory\" id=\"mtr_cde'+i+'\" name=\"mtr_cde'+i+'\" dataType=\"Require\" onChange=\"checkMeter(this, '+rows+');\" msg=\"'+ ml(t__Please_Select_the_Inline_Meter_Arm)+' '+ k + '\">';
//			col+= createSelect(list1, value1, ml(t__An_Inline_Meter));
			col+= createSelect(list1, prev_mtr, ml(t__An_Inline_Meter));

			col+= '<td class=\"infotext\" width=\"300\"><span class=\"mandatory1\">*</span><select class=\"compulsory\" id=\"tnk_cde'+i+'\" name=\"tnk_cde'+i+'\" dataType=\"Require\" msg=\"'+ ml(t__Please_Select_the_Base_Tank_Arm)+' '+ k + '\">';
//			col+= createSelect(list2, value2, ml(t__A_Base_Tank));
			col+= createSelectDet(list2, prev_tnk, ml(t__A_Base_Tank), list3);
			col+= '</select></td></tr>';

			newTable+= col;

			if(blendNums[i] > 0)
			{
				var meter_values = new Array();
				var tank_values = new Array();
				// get the current options of meters and tanks
				for (j=0; j<blendNums[i]; j++)
				{ 
					if ( (document.getElementById('bln_mtr'+i+j) == null) || (document.getElementById('bln_mtr'+i+j) == undefined) )
					{
						meter_values[j] = '';
					}
					else
					{
						meter_values[j] = document.getElementById('bln_mtr'+i+j).value;
					}
					if ( (document.getElementById('bln_tnk'+i+j) == null) || (document.getElementById('bln_tnk'+i+j) == undefined) )
					{
						tank_values[j] = '';
					}
					else
					{
						tank_values[j] = document.getElementById('bln_tnk'+i+j).value;
					}
				}

				for (j=0; j<blendNums[i]; j++)
				{ 
					var col = "";
					var l = j+1;

					col+= '<tr><td colspan=\"3\">&nbsp;</td>';
					col+= '<td class=\"infotext\" width=\"200\"><span class=\"mandatory1\">*</span><select class=\"compulsory\" id=\"bln_mtr'+i+j+'\" name=\"bln_mtr'+i+j+'\" dataType=\"Require\" msg=\"'+ml(t__Please_Select_the_Inline_Meter_Blend)+' '+ l +' '+ml(t__Arm)+' '+ k +'\">';

//					col+= createSelect(list1, value1, ml(t__An_Inline_Meter));
					col+= createSelect(list1, meter_values[j], ml(t__An_Inline_Meter));
					col+= '<td class=\"infotext\" width=\"300\"><span class=\"mandatory1\">*</span><select class=\"compulsory\" id=\"bln_tnk'+i+j+'\" name=\"bln_tnk'+i+j+'\" dataType=\"Require\" msg=\"'+ml(t__Please_Select_the_Base_Tank_Blend)+' '+ l +' '+ml(t__Arm)+' '+ k + '\">';

//					col+= createSelect(list2, value2, ml(t__A_Base_Tank));
					col+= createSelectDet(list2, tank_values[j], ml(t__A_Base_Tank), list3);
					col+= '</select></td></tr>';

					newTable+= col;
				}
			}


		}

		newTable+= '</table>';

		document.getElementById('arms').innerHTML = newTable;
	}
}


function addTable2(list1, value1, list2, value2)
{
	var rows = 0;
	var blends = 0;
	var cols = 2; /* or whatever */



	
	rows = document.getElementById('nbr_arm').value;
	blends = document.getElementById('nbr_bln').value;
	
	if (isNaN(rows) || rows == "" || rows == 0) /* check only a number has been entered */
	{
		//alert('Please enter a valid number!');
		document.getElementById('arms').innerHTML = "";
	}
	else if(rows>0)
	{
		
		newTable = '<table>';
		newTable += '<tr><td><td><td class=\"infotextheading\">&nbsp; '+ ml(t__Blends_Number)+ '</td><td class=\"infotextheading\">&nbsp; '+ ml(t__Inline_Meter)+ '</td><td class=\"infotextheading\">&nbsp; '+ ml(t__Base_Tank)+' </td></td></td></tr>';

		for (i=0; i<rows; i++)
		{
			var col = "";
			var k=i+1;		
			col+= '<tr><td class=\"infotextheading\" width=\"80\">'+ ml(t__Arm)+': </td>';
			col+= '<td class=\"infotext\" width=\"50\">' + k + '<input type=\"hidden\" name=\"arm_cde' + i + '\" value=\"' + k + '\" /></td>';

			col+= '<td class=\"infotext\" width=\"200\"><span class=\"mandatory1\">*</span><input type=\"text\" id=\"nbr_bln'+i+'\" name=\"nbr_bln'+i+'\" maxlength=\"1\" onChange=\"createArm();\" dataType=\"Range\" min=\"0\" max=\"6\" value=\"0\" size=\"20\" msg=\"'+ ml(t__Please_Enter_the_Number_of_Blends)+' '+ k + '\">';
			col+= '</td>';

			col+= '<td class=\"infotext\" width=\"200\"><span class=\"mandatory1\">*</span><select class=\"compulsory\" id=\"mtr_cde'+i+'\" name=\"mtr_cde'+i+'\" dataType=\"Require\" onChange=\"checkMeter(this, '+rows+');\" msg=\"'+ ml(t__Please_Select_the_Inline_Meter_Arm)+' '+ k + '\">';
			col+= createSelect(list1, value1, ml(t__An_Inline_Meter));

			col+= '<td class=\"infotext\" width=\"200\"><span class=\"mandatory1\">*</span><select class=\"compulsory\" id=\"tnk_cde'+i+'\" name=\"tnk_cde'+i+'\" dataType=\"Require\" msg=\"'+ ml(t__Please_Select_the_Base_Tank_Arm)+' '+ k + '\">';
			col+= createSelect(list2, value2, ml(t__A_Base_Tank));
			col+= '</select></td></tr>';

			newTable+= col;

			if(blends > 0)
			{
				for (j=0; j<blends; j++)
				{ 
					var col = "";
					var l = j+1;

					col+= '<tr><td colspan=\"2\">&nbsp;</td>';
					col+= '<td class=\"infotext\" width=\"200\"><span class=\"mandatory1\">*</span><select class=\"compulsory\" id=\"bln_mtr'+i+j+'\" name=\"bln_mtr'+i+j+'\" dataType=\"Require\" msg=\"'+ml(t__Please_Select_the_Inline_Meter_Blend)+' '+ l +' '+ml(t__Arm)+' '+ k +'\">';

					col+= createSelect(list1, value1, ml(t__An_Inline_Meter));
					col+= '<td class=\"infotext\" width=\"200\"><span class=\"mandatory1\">*</span><select class=\"compulsory\" id=\"bln_tnk'+i+j+'\" name=\"bln_tnk'+i+j+'\" dataType=\"Require\" msg=\"'+ml(t__Please_Select_the_Base_Tank_Blend)+' '+ l +' '+ml(t__Arm)+' '+ k + '\">';

					col+= createSelect(list2, value2, ml(t__A_Base_Tank));
					col+= '</select></td></tr>';

					newTable+= col;
				}
			}


		}

		newTable+= '</table>';

		document.getElementById('arms').innerHTML = newTable;
	}
};



function createSelect(list, value, name)
{
	var combo ="";
	if (value == "")
	{
		combo+= '<option value =\"\" selected>'+ml(t__Select)+' '+ name + '</option>';
	}
	else
	{
		combo+= '<option value =\"\" >'+ml(t__Select)+' '+ name + '</option>';
	}
	if(list.length > 0)
	{
		for(var i=0;i<list.length; i++)
		{
			combo += '<option value=\"'+list[i]+'\" ';
			if(value == list[i])
			{
				combo += ' selected ';
			}
			combo+= '>' + list[i] + '</option>';
		
		}
		
	}
	
	return combo;
}



function createSelectDet(list, value, name, note)
{
	var combo ="";
	if (value == "")
	{
		combo+= '<option value =\"\" selected>'+ml(t__Select)+' '+ name + '</option>';
	}
	else
	{
		combo+= '<option value =\"\" >'+ml(t__Select)+' '+ name + '</option>';
	}
	if(list.length > 0)
	{
		for(var i=0;i<list.length; i++)
		{
			combo += '<option value=\"'+list[i]+'\" ';
			if(value == list[i])
			{
				combo += ' selected ';
			}
			combo+= '>' + list[i] + '-' + note[i] + '</option>';
		
		}
		
	}
	
	return combo;
}


function checkMeter(aa, bb)
{

    var mtrcde = aa.name;
    var mtrval = aa.value;

    for (var i = 0; i < bb ; i++ ) {
        //var mtrval_i = eval("document.add_bay.mtr_cde"+i+".value");
        var mtrval_i = eval("document.getElementById('mtr_cde"+i+"').value");
        //var mtrcde_i = eval("document.add_bay.mtr_cde"+i+".name");
        var mtrcde_i = eval("document.getElementById('mtr_cde"+i+"').name");

		if ( mtrcde != mtrcde_i && mtrval == mtrval_i && mtrval_i != '' )  {
             var j = i+1;
			 alert( ml(t__Same_Inline_Meter_exist)+' '+j );
             aa.value = '';
		}

    }


}
