

prompt set a new configuration to determine if auto filtering is allowed when screen opens

delete from SITE_CONFIG where CONFIG_KEY='SITE_AUTO_FILTER_WHEN_OPEN_SCREEN';
commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_AUTO_FILTER_WHEN_OPEN_SCREEN', 'Y', 'determine if auto filtering is allowed when screen opens', NULL );

commit;



prompt set a new configuration to determine if the date range will be cleared to blank or reset to default value

delete from SITE_CONFIG where CONFIG_KEY='SITE_CLEAR_FILTER_BLANK';
commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_CLEAR_FILTER_BLANK', 'N', 'determine if the date range will be cleared or reset to default value', NULL );

commit;



prompt set new configurations to determine the default date ranges in the screen of load schedules, open orders, transactions, live journals, allocations, auditing data

delete from SITE_CONFIG where CONFIG_KEY='SITE_DEFAULT_DATERANGE_SCHEDULE';
commit;
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_DEFAULT_DATERANGE_SCHEDULE', '7~~0', 'The default date ranges in load schedules screen. X~~Y: X days before today, Y days after today. -1: blank ', NULL );
commit;

delete from SITE_CONFIG where CONFIG_KEY='SITE_DEFAULT_DATERANGE_CUSTORDER';
commit;
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_DEFAULT_DATERANGE_CUSTORDER', '7~~0', 'The default date ranges in open orders. X~~Y: X days before today, Y days after today. -1: blank ', NULL );
commit;

delete from SITE_CONFIG where CONFIG_KEY='SITE_DEFAULT_DATERANGE_TRANSACTION';
commit;
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_DEFAULT_DATERANGE_TRANSACTION', '7~~0', 'The default date ranges in transactions. X~~Y: X days before today, Y days after today. -1: blank ', NULL );
commit;

delete from SITE_CONFIG where CONFIG_KEY='SITE_DEFAULT_DATERANGE_JOURNAL';
commit;
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_DEFAULT_DATERANGE_JOURNAL', '0.125~~0', 'The default date ranges in live journals. X~~Y: X days before today, Y days after today. -1: blank ', NULL );
commit;

delete from SITE_CONFIG where CONFIG_KEY='SITE_DEFAULT_DATERANGE_ALLOCATION';
commit;
insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_DEFAULT_DATERANGE_ALLOCATION', '-1~~-1', 'The default date ranges in allocation. X~~Y: X days before today, Y days after today. -1: blank ', NULL );
commit;

-- Define the default date range in Audit screen
delete from SITE_CONFIG where CONFIG_KEY='SITE_DEFAULT_DATERANGE_AUDIT';
commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_DEFAULT_DATERANGE_AUDIT', '0.125~~0', 'The default date ranges in audit reporting. X~~Y: X days before today, Y days after today. -1: blank ', NULL );
commit;



prompt set a new configuration to determine if open order is filtered by expiry date or ordered date

delete from SITE_CONFIG where CONFIG_KEY='SITE_OO_FILTER_BY_EXPIRY';
commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_OO_FILTER_BY_EXPIRY', 'N', 'determine if open order is filtered by expiry date or ordered date', NULL );

commit;

