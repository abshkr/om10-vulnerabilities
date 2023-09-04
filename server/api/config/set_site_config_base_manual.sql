/*
    define the SITE_USE_BASE_MANUAL_FLAG for whether to show and edit base manual flag in frontend
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_USE_BASE_MANUAL_FLAG';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_USE_BASE_MANUAL_FLAG', 'N', 'Show and edit the base manual flag on Base Products screen', NULL );

commit;
