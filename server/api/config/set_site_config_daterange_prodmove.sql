prompt set new configurations to determine the default date ranges in the screen of product movement

delete from SITE_CONFIG where CONFIG_KEY='SITE_DEFAULT_DATERANGE_PRODMOVE';
commit;
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_DEFAULT_DATERANGE_PRODMOVE', '21~~7', 'The default date ranges in product movement screen. X~~Y: X days before today, Y days after today. -1: blank ', NULL );
commit;



prompt set a new configuration to determine if product movement are filtered by opening, closing, or updated date

delete from SITE_CONFIG where CONFIG_KEY='SITE_PRODMOVE_FILTER_DATE_TYPE';
commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_PRODMOVE_FILTER_DATE_TYPE', 'START', 'determine if product movement are filtered by starting or ending date', NULL );

commit;

