/*
    define the SITE_USE_SG for usage of Specific Gravity in tanks
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_USE_SG';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_USE_SG', 'Y', 'Enable the Tank Specific Gravity field', NULL );

commit;
