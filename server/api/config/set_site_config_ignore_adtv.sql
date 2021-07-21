/*
    define the SITE_IGNORE_ADTV_DENSITY to control whether to ignore the additive when calculating product density
    Y: Ignore the additive when calculating product density
    N: Do not ignore the additive when calculating product density
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_IGNORE_ADTV_DENSITY';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_IGNORE_ADTV_DENSITY', 'N', 'Ignore the additive when calculating product density.', NULL );

commit;
