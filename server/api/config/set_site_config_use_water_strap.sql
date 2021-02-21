/*
    define the SITE_USE_WATER_STRAPPING for usage of strapping data to calculate water volume from level
    Y: Calculate water volume from level by strapping data
    N: Don't consider the water volume
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_USE_WATER_STRAPPING';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_USE_WATER_STRAPPING', 'N', 'Calculate water volume from level by strapping data', NULL );

commit;
