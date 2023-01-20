/*
    define the SITE_CUSTOM_COLUMN_SCHEDULE to determine whether the customisable columns are enabled or disabled in Load Schedules
    Y: enable the customisable columns in the page Load Schedules.
    N: disable the customisable columns in the page Load Schedules.
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_CUSTOM_COLUMN_SCHEDULE';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_CUSTOM_COLUMN_SCHEDULE', 'N', 'Enable the customisable columns in the page Load Schedules', NULL );

commit;

