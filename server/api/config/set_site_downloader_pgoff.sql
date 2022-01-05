/*
    define the SITE_USE_DOWNLOADER to determine wheter to load all data in one call or use downloader to load data in multi calls when pagination is off.  
    Y: Use downloader to load data in multi calls when pagination is off.
    N: Load all data in one call when pagination is off.
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_USE_DOWNLOADER';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_USE_DOWNLOADER', 'N', 'Use downloader to load data in multi calls when pagination is off', NULL );

commit;

