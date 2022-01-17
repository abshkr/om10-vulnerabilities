/*
    define the SITE_PAGINATION_SCHD_LIST to determine wheter pagination is required for schedule list
    Y: enable the pagination for schedule list.
    N: disable the pagination for schedule list.
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_PAGINATION_SCHD_LIST';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_PAGINATION_SCHD_LIST', 'Y', 'Enable the pagination for schedule list', NULL );

commit;

