/*
    define the SITE_PAGINATION_ORDER_LIST to determine wheter pagination is required for open order list
    Y: enable the pagination for open order list.
    N: disable the pagination for open order list.
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_PAGINATION_ORDER_LIST';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_PAGINATION_ORDER_LIST', 'Y', 'Enable the pagination for open order list', NULL );

commit;

