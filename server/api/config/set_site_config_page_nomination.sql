/*
    define the SITE_PAGINATION_MOVENOM_LIST to determine wheter pagination is required for nomination list
    Y: enable the pagination for nomination list.
    N: disable the pagination for nomination list.
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_PAGINATION_MOVENOM_LIST';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_PAGINATION_MOVENOM_LIST', 'Y', 'Enable the pagination for nomination list', NULL );

commit;

