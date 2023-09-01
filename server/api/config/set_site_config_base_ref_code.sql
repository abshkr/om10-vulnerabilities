/*
    define the SITE_USE_BASE_REF_CODE for whether to show and edit base ref code in frontend
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_USE_BASE_REF_CODE';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_USE_BASE_REF_CODE', 'N', 'Show and edit the base ref code on Base Products screen', NULL );

commit;
