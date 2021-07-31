/*
    Add the column TRSA_KEY and TRSA_NUMBER in table PRODOWNSHIP_TRANSACT to store the values entered by the user manually.
    The column TRSA_KEY is mandatory and unique in the type of varchar
    The column TRSA_NUMBER is optional and also in the type of varchar
*/
alter table PRODOWNSHIP_TRANSACT add TRSA_KEY VARCHAR2(100);
alter table PRODOWNSHIP_TRANSACT add TRSA_NUMBER VARCHAR2(100);

alter table PRODOWNSHIP_TRANSACT
  add constraint UK_PRODOWNSHIP_TRANSACT unique (TRSA_KEY);


/*
  -- if unique key does not allow multiple NULL values, then we may need to run this 
  update PRODOWNSHIP_TRANSACT set TRSA_KEY = 'BST'||LPAD(OWNSHIP_TRSA_NO, 9, '0');
  commit;
*/
