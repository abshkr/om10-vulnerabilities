/*
    define the SITE_PAGINATION_FOLIO_SUMMARY to determine wheter pagination is required for folio summary list
    Y: enable the pagination for folio summary list.
    N: disable the pagination for folio summary list.
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_PAGINATION_FOLIO_SUMMARY';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_PAGINATION_FOLIO_SUMMARY', 'Y', 'Enable the pagination for folio summary list', NULL );

commit;

