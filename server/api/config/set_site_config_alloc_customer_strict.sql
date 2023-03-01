/*
    define the SITE_ALLOC_CUSTOMER_STRICT to control whether the customer company must own an account to have an allocation
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_ALLOC_CUSTOMER_STRICT';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_ALLOC_CUSTOMER_STRICT', 'N', 'The customer company must own an account to have an allocation', NULL );

commit;
