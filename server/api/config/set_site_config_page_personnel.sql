/*
    define the SITE_PAGINATION_PSNL_LIST to determine wheter pagination is required for personnel list
    Y: enable the pagination for personnel list.
    N: disable the pagination for personnel list.
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_PAGINATION_PSNL_LIST';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_PAGINATION_PSNL_LIST', 'N', 'Enable the pagination for personnel list', NULL );

commit;

