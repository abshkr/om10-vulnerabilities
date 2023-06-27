/*
    define the SITE_LIST_PICKUP_LOAD to determine whether the Pickup Schedules should be visible in the list of load schedules
    Y: Show Pickup Schedules in Load Schedule list
    N: Hide Pickup Schedules in Load Schedule list
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_LIST_PICKUP_LOAD';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_LIST_PICKUP_LOAD', 'Y', 'Show/Hide Pickup Schedules in Load Schedule list', NULL );

commit;

