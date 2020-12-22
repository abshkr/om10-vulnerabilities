/*
    define the SITE_USE_SAFEFILL_ONLY for usage of safefill only in compartment volume limit
    Y: Use the safefill only and capacity will be always as same as safefill
    N: Use both the safefill and capacity
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_USE_SAFEFILL_ONLY';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_USE_SAFEFILL_ONLY', 'N', 'Use the safefill only and capacity will be always as same as safefill', NULL );

commit;
