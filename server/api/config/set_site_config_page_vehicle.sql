/*
    define the SITE_PAGINATION_EQPT_LIST to determine wheter pagination is required for equipment list
    Y: enable the pagination for equipment list.
    N: disable the pagination for equipment list.
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_PAGINATION_EQPT_LIST';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_PAGINATION_EQPT_LIST', 'N', 'Enable the pagination for equipment list', NULL );

commit;

/*
    define the SITE_PAGINATION_TNKR_LIST to determine wheter pagination is required for tanker list
    Y: enable the pagination for tanker list.
    N: disable the pagination for tanker list.
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_PAGINATION_TNKR_LIST';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_PAGINATION_TNKR_LIST', 'N', 'Enable the pagination for tanker list', NULL );

commit;
