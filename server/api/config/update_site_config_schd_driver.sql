/*
    update to turn on this setting		
*/

update SITE_CONFIG set CONFIG_VALUE='Y' where CONFIG_KEY='SCHD_RESET_DRIVER';

commit;
