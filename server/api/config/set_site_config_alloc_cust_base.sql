/*
    define the SITE_CUSTOMER_BASE_ALLOCATION to control whether to allow the customer type base allocation
    Y: Allow customer type base allocation
    N: Do not allow customer type base allocation
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_CUSTOMER_BASE_ALLOCATION';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_CUSTOMER_BASE_ALLOCATION', 'N', 'Allow customer type base allocation.', NULL );

commit;
