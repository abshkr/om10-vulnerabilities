prompt set new configurations to determine the default date ranges in the screen of folio summary

delete from SITE_CONFIG where CONFIG_KEY='SITE_DEFAULT_DATERANGE_FOLIOSUM';
commit;
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_DEFAULT_DATERANGE_FOLIOSUM', '-1~~-1', 'The default date ranges in folio summary screen. X~~Y: X days before today, Y days after today. -1: blank ', NULL );
commit;



prompt set a new configuration to determine if folio summary are filtered by opening, closing, or updated date

delete from SITE_CONFIG where CONFIG_KEY='SITE_FOLIOSUM_FILTER_DATE_TYPE';
commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_FOLIOSUM_FILTER_DATE_TYPE', 'OPEN', 'determine if folio summary are filtered by opening, closing, or updated date', NULL );

commit;

