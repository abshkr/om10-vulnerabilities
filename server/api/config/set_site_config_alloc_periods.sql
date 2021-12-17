/*
    define the SITE_ALLOC_RESET_PERIOD_DATERANGES to control whether to allow periods for RESET and PERIOD allocations
    Y: Allow periods for RESET and PERIOD allocations
    N: Do not allow periods for RESET and PERIOD allocations
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_ALLOC_RESET_PERIOD_DATERANGES';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_ALLOC_RESET_PERIOD_DATERANGES', 'N', 'Allow periods for RESET and PERIOD allocations.', NULL );

commit;
