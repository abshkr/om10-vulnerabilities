/*
    define the SITE_FASTTRACK_URL to store the URL of FastTrack system
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_FASTTRACK_URL';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_FASTTRACK_URL', 'https://fasttrack.dki.cloud/login', 'The URL of FastTrack system', NULL );

commit;

