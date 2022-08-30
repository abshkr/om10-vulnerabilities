/*
    define the SITE_PAGINATION_TRSA_LIST to determine whether pagination is required for transaction list
    Y: enable the pagination for transaction list.
    N: disable the pagination for transaction list.
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_PAGINATION_TRSA_LIST';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_PAGINATION_TRSA_LIST', 'Y', 'Enable the pagination for transaction list', NULL );

commit;

