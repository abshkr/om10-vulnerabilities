
delete from SITE_CONFIG where CONFIG_KEY='SITE_OO_FILTER_BY_EXPIRY';
commit;

insert into SITE_CONFIG (CONFIG_KEY, CONFIG_VALUE, CONFIG_COMMENT, CONFIG_REQUIRED_BY_GUI) 
values ('SITE_OO_FILTER_BY_EXPIRY', 'N', 'determine if open order is filtered by expiry date or ordered date', NULL );

commit;
