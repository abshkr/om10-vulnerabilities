/*
    define the SITE_PIDX_ENABLED for the feature of Petroleum Industry Data eXchange standards at a terminal 
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_PIDX_ENABLED';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_PIDX_ENABLED', 'N', 'Enable the Petroleum Industry Data eXchange (PIDX) standards at a terminal', NULL );

commit;
