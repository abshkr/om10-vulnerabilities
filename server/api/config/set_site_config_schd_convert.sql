/*
    define the SITE_SCHD_TYPE_CONVERTIBLE for whether to allow the conversion between Pre-Order and Pre-Schedule types
    Y: Enable the conversion between Pre-Order and Pre-Schedule types
    N: Disable the conversion between Pre-Order and Pre-Schedule types
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_SCHD_TYPE_CONVERTIBLE';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_SCHD_TYPE_CONVERTIBLE', 'N', 'Enable the conversion between Pre-Order and Pre-Schedule types', NULL );

commit;



/*
    define the SITE_SCHD_PRELOAD_EDITABLE for whether to allow the change of preloaded quantity in scheduled compartments
    Y: Enable the change of preloaded quantity in scheduled compartments
    N: Disable the change of preloaded quantity in scheduled compartments
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_SCHD_PRELOAD_EDITABLE';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_SCHD_PRELOAD_EDITABLE', 'N', 'Enable the change of preloaded quantity in scheduled compartments', NULL );

commit;
