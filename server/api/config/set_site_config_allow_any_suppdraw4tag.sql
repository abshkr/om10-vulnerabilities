/*
    define the SITE_ALLOW_ANY_SUPPDRAW_TAG to allow the personnel or combination ID/TAG to have ANY/ALL drawers and suppliers
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_ALLOW_ANY_SUPPDRAW_TAG';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_ALLOW_ANY_SUPPDRAW_TAG', 'N', 'Allow the personnel or combination ID/TAG to have ANY/ALL drawers and suppliers', NULL );

commit;
