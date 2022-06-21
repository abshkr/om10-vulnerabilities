/*
    define the SITE_COPS_ENABLED for the feature of Cross Over Protection at a terminal 
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_COPS_ENABLED';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_COPS_ENABLED', 'N', 'Enable the Cross Over Protection (COPS) at a terminal', NULL );

commit;
