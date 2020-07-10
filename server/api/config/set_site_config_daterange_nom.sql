prompt set new configurations to determine the default date ranges in the screen of movement nominations

delete from SITE_CONFIG where CONFIG_KEY='SITE_DEFAULT_DATERANGE_NOMINATION';
commit;
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_DEFAULT_DATERANGE_NOMINATION', '21~~5', 'The default date ranges in movement nominations screen. X~~Y: X days before today, Y days after today. -1: blank ', NULL );
commit;



prompt set a new configuration to determine if nominations are filtered by expired after date or effective from date

delete from SITE_CONFIG where CONFIG_KEY='SITE_NOM_FILTER_BY_EXPIRY';
commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_NOM_FILTER_BY_EXPIRY', 'N', 'determine if nominations are filtered by expired after date or effective from date', NULL );

commit;

