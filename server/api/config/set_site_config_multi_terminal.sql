/*
    define the SITE_ALLOW_MULTI_TERMINALS to control whether to allow the multiple terminals in Omega system
    Y: Allow the multiple terminals in Omega system
    N: Do not allow the multiple terminals in Omega system
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_ALLOW_MULTI_TERMINALS';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_ALLOW_MULTI_TERMINALS', 'N', 'Allow the multiple terminals', NULL );

commit;
