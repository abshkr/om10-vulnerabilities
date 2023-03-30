/*
    define the SITE_PAGINATION_PRODMOVE_LIST to determine whether pagination is required for product movement list
    Y: enable the pagination for product movement list.
    N: disable the pagination for product movement list.
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_PAGINATION_PRODMOVE_LIST';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_PAGINATION_PRODMOVE_LIST', 'Y', 'Enable the pagination for product movement list', NULL );

commit;

