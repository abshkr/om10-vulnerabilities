/*
    define the WRI_ENABLE for whether WRI functionality is enabled on this site
*/
delete from SITE_CONFIG where CONFIG_KEY='WRI_ENABLE';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('WRI_ENABLE', 'N', 'WRI functionality is enabled on the site', 'W' );

commit;
