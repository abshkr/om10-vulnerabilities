/*
    define the SITE_ALLOW_MULTI_ALLOCATIONS to control whether to allow multiple allocations
    Y: Allow multiple allocations
    N: Do not allow multiple allocations
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_ALLOW_MULTI_ALLOCATIONS';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_ALLOW_MULTI_ALLOCATIONS', 'N', 'Allow multiple allocations.', NULL );

commit;
