/*
    define the SITE_UNIQUE_TRIP_OO_NUM to control whether the trip number and open order number should be unique regardless the supplier
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_UNIQUE_TRIP_OO_NUM';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_UNIQUE_TRIP_OO_NUM', 'N', 'Whether the trip number and open order number should be unique regardless the supplier', NULL );

commit;
