/*
    define the SITE_TRIP_NUM_DIGITS to control the length of trip number
    '9': The normal length of trip number used by non-Greenergy customers
    '15': The special length of trip number used by Greenergy customers
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_TRIP_NUM_DIGITS';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_TRIP_NUM_DIGITS', '9', 'The maximum length of trip number', NULL );

commit;



/*
    define the SITE_ORDER_NUM_DIGITS to control the length of customer order number
    '9': The normal length of customer order number used by non-Greenergy customers
    '15': The special length of customer order number used by Greenergy customers
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_ORDER_NUM_DIGITS';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_ORDER_NUM_DIGITS', '9', 'The maximum length of customer order number', NULL );

commit;
