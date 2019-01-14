

-- Need a global flag to turn on or off the Audit screen
delete from SITE_CONFIG where CONFIG_KEY='SITE_AUDIT_SCREEN_ENABLED';
commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_AUDIT_SCREEN_ENABLED', 'Y', 'Determine whether the Audit screen is enabled.', NULL );
commit;

-- Define the default date range in Audit screen
delete from SITE_CONFIG where CONFIG_KEY='SITE_DEFAULT_DATERANGE_AUDIT';
commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_DEFAULT_DATERANGE_AUDIT', '0.125~~0', 'The default date ranges in audit reporting. X~~Y: X days before today, Y days after today. -1: blank ', NULL );
commit;
