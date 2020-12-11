/*
    define the SITE_USE_SHLS_SPEC_INS for usage of special instruction in load schedules
    Y: The field of special instruction is visible and editable in Load Schedules screen
    N: The field of special instruction is not visible in Load Schedules screen
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_USE_SHLS_SPEC_INS';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_USE_SHLS_SPEC_INS', 'N', 'Use special instruction in load schedules', NULL );

commit;
