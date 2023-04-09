/*
    define the SITE_DOWNLOADER_PRODMOVE_LIST to determine whether downloader bar is required for product movement list
    Y: enable the downloader bar for product movement list.
    N: disable the downloader bar for product movement list.
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_DOWNLOADER_PRODMOVE_LIST';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_DOWNLOADER_PRODMOVE_LIST', 'Y', 'Enable the downloader bar for product movement list', NULL );

commit;

/*
    define the SITE_DOWNLOADER_BATCHMAX to determine the maximum number of records can be retrieved per batch when downloader bar is not used if pagination is off
    Y: enable the downloader bar for product movement list.
    N: disable the downloader bar for product movement list.
*/
delete from SITE_CONFIG where CONFIG_KEY='SITE_DOWNLOADER_BATCHMAX';

commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_DOWNLOADER_BATCHMAX', '10000', 'Maximum number of records can be retrieved per batch when downloader bar is off', NULL );

commit;

