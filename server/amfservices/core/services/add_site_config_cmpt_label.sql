
/* 
In omega front end for Bitumen site a label change request is raised:
Safe Fill -> Schedule Limit
Capacity-> SFL

At the moment it looks like following screens are affected:
a. Equipment Type
b. Equipment List
c. Tanker List
d. Load schedule Screen
*/ 


delete from SITE_CONFIG where CONFIG_KEY='SITE_SAFEFILL_LABEL';
commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_SAFEFILL_LABEL', 'Schedule Limit', 'Display this value as SAFEFILL label if it is not blank.', NULL );
commit;

delete from SITE_CONFIG where CONFIG_KEY='SITE_CAPACITY_LABEL';
commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_CAPACITY_LABEL', 'SFL', 'Display this value as CAPACITY label if it is not blank.', NULL );
commit;
