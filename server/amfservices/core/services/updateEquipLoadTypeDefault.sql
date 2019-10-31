
/*
The field of Load Type is not an optional field, so user will not be able to submit the change if he/she does not select a load type when he/she creates or updates an equipment in the screen of Equipment List. 

However, when user creates a new tanker in the screen of Tanker List, if he/she does not choose the existing equipment for the new tanker, the system will create new equipment automatically. The automatic creation uses CGI which does not handle Load Type, therefore the value of Load Type always NULL.

There are three options to solve this bug:
1. changes CGI to handle Load Type, which needs re-compile of CGI.
2. make this field optional so it won't give warnings when it is NULL, which needs re-compile of FLEX
3. add a default value definition for column TRANSP_EQUIP.EQPT_LOAD_TYPE, so DB will automatically assign 'A' (Any) to the column if no value from the outside-DB process. This option requires no change of source code.

The option 3 is used.
*/



ALTER TABLE TRANSP_EQUIP MODIFY EQPT_LOAD_TYPE DEFAULT 'A';
commit;


