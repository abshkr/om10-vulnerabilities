/*
    define the SITE_MT_LIMIT_PERCENT for the upper limit check of loading quantitiy in Manual Transaction
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_MT_LIMIT_PERCENT';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_MT_LIMIT_PERCENT', '0.3', 'The upper limit of loading quantitiy in Manual Transaction (%)', NULL );

commit;
