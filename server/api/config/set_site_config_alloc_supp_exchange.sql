/*
    define the SITE_SUPPLIER_EXCHANGE_ALLOCATION to control whether to allow the supplier exchange allocation
    Y: Allow supplier exchange allocation
    N: Do not allow supplier exchange allocation
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_SUPPLIER_EXCHANGE_ALLOCATION';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_SUPPLIER_EXCHANGE_ALLOCATION', 'N', 'Allow supplier exchange allocation.', NULL );

commit;
