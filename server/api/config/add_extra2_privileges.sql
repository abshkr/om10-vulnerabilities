insert into URBAC_ACTIONS (ACTION_ID,ACTION_CODE,ACTION_TEXT,ACTION_NOTE,ACTION_TYPE,RECORD_SWITCH,RECORD_ORDER) 
values (7,'A000007','EXTRA2','Default action',0,1,6);

insert into URBAC_PRIVILEGES (PRIVILEGE_ID,PRIVILEGE_CODE,PRIVILEGE_TEXT,PRIVILEGE_NOTE,RECORD_SWITCH,RECORD_ORDER,IS_SINGULAR) 
values (7,'P000007','PRIV_EXTRA2','Default privilege',1,0,1);

insert into URBAC_PRIVILEGE_ACTIONS (PRIVILEGE_ACTION_ID,PRIVILEGE_ID,ACTION_ID,PRIVILEGE_ACTION_ACTIVE) 
values (7,7,7,1);

commit;