/*
    define the SITE_USE_PRODUCT_LOCK determine whether the drawer product can be locked in Omega system
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_USE_PRODUCT_LOCK';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_USE_PRODUCT_LOCK', 'N', 'Enable the lock flag of the drawer product', NULL );

commit;
