/*
    define the SITE_PRELOAD_EDITABLE_NEW_TRIP to determine whether the preload quantity can be edited in a new schedule.  
    Y: The preload quantity can be edited in a new schedule.
    N: The preload quantity can not be edited in a new schedule.
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_PRELOAD_EDITABLE_NEW_TRIP';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_PRELOAD_EDITABLE_NEW_TRIP', 'Y', 'Whether the preload quantity can be edited in a new schedule', NULL );

commit;

/*
    define the SITE_PRELOAD_EDITABLE_END_TRIP to determine whether the preload quantity can be edited in an ended schedule.  
    Y: The preload quantity can be edited in an ended schedule.
    N: The preload quantity can not be edited in an ended schedule.
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_PRELOAD_EDITABLE_END_TRIP';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_PRELOAD_EDITABLE_END_TRIP', 'N', 'Whether the preload quantity can be edited in an ended schedule', NULL );

commit;


/*
    define the SITE_PRELOAD_DEDUCT_FROM_PRESET to determine whether the preload quantity should be deducted from the preset.  
    Y: RTC always deduct the returns from preset (Scheduled qty) [RULE: preload <= min(safeFill, preset)].
    N: Load the preset amount and do not deduct the returns [RULE: preloaded + scheduled (preset) <= safefill].
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_PRELOAD_DEDUCT_FROM_PRESET';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_PRELOAD_DEDUCT_FROM_PRESET', 'N', 'Whether the preload quantity should be deducted from the preset', NULL );

commit;
