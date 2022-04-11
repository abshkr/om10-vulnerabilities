/*
    trim the spaces in the role names		
*/

update URBAC_ROLES set ROLE_TEXT=TRIM(ROLE_TEXT) where SUBSTR(ROLE_TEXT, -1, 1)=' ';

update URBAC_ROLES set ROLE_TEXT=TRIM(ROLE_TEXT) where SUBSTR(ROLE_TEXT, 1, 1)=' ';

commit;

