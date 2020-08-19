/****************************************
 * $Id: header_end.js,v 1.2 2006/06/28 03:11:40 yjf Exp $
 *
##########**********##########**********##########**********##########**********##########**********##########**********/

/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
FUNCTION [ submitmyform] 
[PURPOSE]  		-> 	Always use this method to submit a form,
					gives me the flexbility of doing validation
					and addition if required before i submit the form
          
[Parameter]  	-> myobject FORM OBJECT Parameter is the form need to be submit
[AUTHOR]  		-> Abdul Shakoor (DKI) June 8, 2005
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
function submitmyform(myobject) {
	return Validator.Validate(myobject,1);
}
