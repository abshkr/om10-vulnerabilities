/*
    define the SITE_USE_LONG_VEHICLE for whether to show and edit long vehicle flag in frontend
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_USE_LONG_VEHICLE';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_USE_LONG_VEHICLE', 'N', 'Show and edit the flag of long vehicles on Tanker List screen', NULL );

commit;
