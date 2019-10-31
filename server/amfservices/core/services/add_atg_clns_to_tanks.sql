
/*
Add this new field in TANKS table so ATG status can be determined.

0 means Error
1 means Normal
Null (show blank)
*/

alter table TANKS add TANK_ATG_STATUS NUMBER(2) default NULL;

/*
show current date/time for last ATG update date time
*/

alter table TANKS add TANK_ATG_MANCHG DATE default NULL;


commit;
