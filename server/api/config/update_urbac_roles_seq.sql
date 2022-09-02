-- use the following SQL to find the LAST_NUMBER, see if it is < 100000
select SEQUENCE_NAME, LAST_NUMBER from user_sequences where SEQUENCE_NAME='URBAC_ROLES_SEQ';

-- if the LAST_NUMBER < 100000, run the following two lines; otherwise DO NOTHING
DROP SEQUENCE URBAC_ROLES_SEQ;
CREATE SEQUENCE URBAC_ROLES_SEQ START WITH 100000 INCREMENT BY 1;

-- if the above two lines are executed, use the following SQL to check the LAST_NUMBER again, see if it is >= 100000
select SEQUENCE_NAME, LAST_NUMBER from user_sequences where SEQUENCE_NAME='URBAC_ROLES_SEQ';
