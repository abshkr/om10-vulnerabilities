/*
    define the SITE_USE_DOWNLOADER to determine wheter to load all data in one call or use downloader to load data in multi calls when pagination is off.  
    Y: Use downloader to load data in multi calls when pagination is off.
    N: Load all data in one call when pagination is off.
*/
UPDATE SITE_CONFIG SET CONFIG_VALUE='Y' WHERE CONFIG_KEY='SITE_USE_DOWNLOADER';

COMMIT;
